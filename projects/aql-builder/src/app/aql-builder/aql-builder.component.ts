/* Copyright 2021 Better Ltd (www.better.care)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Component, EventEmitter, HostListener, OnDestroy, OnInit, Output} from '@angular/core';
import {DEFAULT_LANGUAGE, AqlBuilderStore} from '../core/AqlBuilderStore';
import {TranslateService} from '@ngx-translate/core';
import {MonacoRegisterUtil} from '../core/monaco/monaco-register.util';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {MonacoService} from './monaco/monaco.service';
import {MenuPanel} from '../menu/menu.enum';
import {MenuItem} from '../menu/menu-item.interface';
import {TabService} from '../core/tab.service';
import {AppLogo, NavigationIcons} from '../shared/shared.enums';
import {StorageService} from '../core/storage.service';
import {EhrApiService} from '../core/ehr-api.service';

@Component({
  selector: 'aql-builder',
  templateUrl: './aql-builder.component.html',
  styleUrls: ['./aql-builder.component.scss']
})
export class AqlBuilderComponent implements OnInit, OnDestroy {
  @Output() switchDomain: EventEmitter<void> = new EventEmitter<void>();

  logo = AppLogo.AQL;
  menuItems: MenuItem[] = [
    {
      name: MenuPanel.HISTORY,
      icon: NavigationIcons.HISTORY
    },
    {
      name: MenuPanel.VIEWS,
      icon: NavigationIcons.VIEWS
    },
    {
      name: MenuPanel.SNIPPETS,
      icon: NavigationIcons.PUZZLE
    },
    {
      name: MenuPanel.PREDEFINED,
      icon: NavigationIcons.PREDEFINED
    },
    {
      name: MenuPanel.TEMPLATES,
      icon: NavigationIcons.TEMPLATES
    }
  ];
  showEditor = true;
  editorFlexHeight = 300;
  dragToResizeSettings = { bottom: true, left: false, right: false, top: false };
  wasEditorResized = false;
  isSidebarPanelOpen = true;

  private readonly MAX_EDITOR_HEIGHT = Math.floor(window.innerHeight * 0.8);
  private readonly MIN_EDITOR_HEIGHT = 200;
  private destroy$: Subject<void> = new Subject<void>();

  @HostListener('document:keydown', ['$event']) onKeyDown(event) {

    /**
     * ALT + E keybinding to toggle the editor
     */
    if (event.keyCode === 69 && event.altKey) {
      this.toggleEditor();
    }

    /**
     * ALT + Y keybinding to toggle the sidebar
     */
    if (event.keyCode === 89 && event.altKey) {
      this.toggleSideBarPanel();
    }
  }

  constructor(private translateService: TranslateService,
              private ehrApiService: EhrApiService,
              private monacoService: MonacoService,
              private aqlStorageService: StorageService,
              private tabService: TabService) {
  }

  ngOnInit() {
    this.aqlStorageService.initialize();
    MonacoRegisterUtil.monacoLoaded
      .pipe(takeUntil(this.destroy$))
      .subscribe((registered) => {
        if (registered) {
          this.monacoService.registerCompletionProvider();
        }
      });

    this.translateService.setDefaultLang(DEFAULT_LANGUAGE);
    this.translateService.use(AqlBuilderStore.APP_LANGUAGE);
  }

  preventDefaultIfResize($event: MouseEvent) {
    const boundigClientRect = ($event.target as HTMLElement).getBoundingClientRect();
    const elementBottom = boundigClientRect.bottom;
    if (elementBottom + 5 >= $event.clientX && elementBottom - 5 <= $event.clientX) {
      $event.preventDefault();
    }
  }

  resizeEnd($event) {
    let height = Math.floor($event.rectangle.height);

    if (height > this.MAX_EDITOR_HEIGHT) {
      height = this.MAX_EDITOR_HEIGHT;
    }

    if (height < this.MIN_EDITOR_HEIGHT) {
      height = this.MIN_EDITOR_HEIGHT;
    }
    this.wasEditorResized = true;
    this.editorFlexHeight = height;
  }


  ngOnDestroy(): void {
    this.tabService.clear();
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleEditor() {
    this.showEditor = !this.showEditor;
  }

  toggleSideBarPanel() {
    this.isSidebarPanelOpen = !this.isSidebarPanelOpen;
    this.wasEditorResized = true;
  }
}
