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

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, HostListener,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Tab, TabType} from '../tab.model';
import {TabService} from '../../../core/tab.service';
import {EhrView, EhrViewSteps, EhrViewType} from '../../../shared/models/ehr-view.model';
import {EditorData} from '../editor-data.model';
import {DomUtil} from '../../../shared/dom.util';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'aql-editor-tabs',
  templateUrl: './editor-tabs.component.html',
  styleUrls: ['./editor-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorTabsComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('tabGroup') tabContainer: ElementRef;
  tabs: Array<Tab>;
  activeTabId: number;

  EhrViewType = EhrViewType;
  renameInputId: number;
  destroy$: Subject<void> = new Subject<void>();


  @HostListener('document:keydown', ['$event']) onKeyDown(event) {
    /**
     * key-binding create new tab: ALT + T
     */
    if (event.keyCode === 84 && event.altKey && !event.shiftKey) {
      event.preventDefault();
      this.newTab();
    }
  }

    constructor(private tabService: TabService,
                private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.tabService.tabsUpdated
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe((tabs) => {
        this.tabs = tabs;
        this.cd.detectChanges();
      });
    this.tabService.activeTabChange
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(() => {
        this.activeTabId = this.tabService.activeTabId;
        this.cd.detectChanges();
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    setTimeout(() => {
      const el = document.querySelector('.editor-tab--item.active');
      el.scrollIntoView();
    });
  }

  newTab(viewType?: EhrViewType): void {
    let tab = new Tab(TabType.NEW_QUERY);

    if (viewType) {
      tab = new Tab(TabType.VIEW, null, this.tabService.DEFAULT_VIEW_TAB_NAME);

      if (viewType === EhrViewType.JS) {
        tab.name = `${this.tabService.DEFAULT_VIEW_TAB_NAME} (${viewType})`;
        tab.editor.code = EditorData.jsViewTemplate;
      }
      tab.view = new EhrView(null, null, viewType, null, new EhrViewSteps('', viewType));
    }

    this.tabService.createTab(tab);
  }

  selectTab(id: number): void {
    if (this.activeTabId !== id) {
      this.tabService.setActiveTab(id);
      this.activeTabId = id;
    }
  }

  removeTab(id: number): void {
    if (this.tabs.length > 1) {
      this.tabService.removeTab(id);
    }
  }

  renameTab(id: number, value: string) {
    if (value) {
      this.tabs[id].name = value;
      this.tabService.renameTab(id, value);
    }
    this.renameInputId = -1;
  }

  showRenameInput(id: number) {
    this.renameInputId = id;
    setTimeout(() => {
      DomUtil.getElementById('rename-tab-input-' + id).focus();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
