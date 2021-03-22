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

import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {Tab} from '../tab.model';
import {EhrViewType} from '../../../shared/models';
import {CodePresentation} from '../code-presentation.enum';
import {ToastrWrapperService, ToastType} from '../../../shared/toastr-wrapper.service';
import {ToastContent} from '../../../shared/models/app.model';
import {MonacoService} from '../../monaco/monaco.service';
import {TabService} from '../../../core/tab.service';
import {CodeSnippetService} from '../../../core/code-snippet.service';
import {EditorMenuAction} from './editor-menu-action.enum';
import {CommonUtil} from '../../../shared';

@Component({
  selector: 'aql-editor-menu',
  templateUrl: './editor-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorMenuComponent {
  @Input() tab: Tab;
  @Input() code: string;
  @Input() codePresentation: CodePresentation;
  @Input() debuggerEnabled: any;
  @Input() isSidebarPanelOpen: boolean;

  @Output() menuClick: EventEmitter<EditorMenuAction> = new EventEmitter<EditorMenuAction>();
  @Output() formatDocument: EventEmitter<any> = new EventEmitter<any>();

  EhrViewType = EhrViewType;
  ViewType = CodePresentation;
  EditorMenuAction = EditorMenuAction;

  /**
   * key-binding Copy to clipboard: ALT + X
   */
  @HostListener('document:keydown', ['$event']) onKeyDown(event) {
    if (event.keyCode === 88 && event.altKey) {
      this.copyToClipboard(this.code);
    }
  }

  constructor(private codeSnippetService: CodeSnippetService,
              private monacoService: MonacoService,
              private tabService: TabService,
              private toastrWrapperService: ToastrWrapperService) { }

  dispatchEvent(type: EditorMenuAction): void {
    this.menuClick.emit(type);
  }

  copyToClipboard(text: string): void {
    this.toastrWrapperService.handleToast(ToastType.SUCCESS, new ToastContent('COPIED_TO_CLIPBOARD'));
    const code = this.monacoService.replaceWithPaths(text);
    CommonUtil.copyToClipboard(code);
  }

  onViewUpdate() {
    this.tabService.dispatchTabListChange();
    this.codeSnippetService.updateViews.next(true);
  }

  onFormatDocumentClick(): void {
    this.formatDocument.emit();
  }
}
