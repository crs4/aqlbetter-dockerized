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

import {Injectable} from '@angular/core';
import {StorageKey} from '../shared/models/app.model';
import {Tab} from '../aql-builder/editor/tab.model';
import {HistoryItem, SnippetItem} from '../shared/models/code-snippet-model';
import {EditorData} from '../aql-builder/editor/editor-data.model';
import {TablePresentation} from '../aql-builder/presentation/table-presentation/table-presentation.enum';
import {cloneDeep} from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private state: AqlBuilderState = new AqlBuilderState();

  constructor() {
    this.initialize();
  }

  initialize(): void {
    this.sanitizeState();
  }

  getState(sanitized = false): AqlBuilderState {
    if (sanitized) {
      this.sanitizeState();
    }
    return this.state;
  }

  updateHistoryItems(items: HistoryItem[]): void {
    this.state.historyItems = items;
    this.updateState();
  }

  updateSnippetItems(items: SnippetItem[]): void {
    this.state.snippetItems = items;
    this.updateState();
  }

  updateTabs(tabs: Tab[], activeTabId?: number): void {
    this.state.tabs = [];
    tabs?.forEach(tab => {
      const editorData = tab.editor;
      const serializableEditorData: EditorData = new EditorData();
      Object.keys(editorData).forEach(key => {
        if (editorData[key] instanceof Map) {
          serializableEditorData[key] = Array.from(editorData[key]);
        } else {
          serializableEditorData[key] = editorData[key];
        }
      });
      const serializableTab = cloneDeep(tab);
      serializableTab.editor = serializableEditorData;
      this.state.tabs.push(serializableTab);
    });
    this.state.activeTabId = activeTabId || 0;
    this.updateState();
  }

  updateTablePresentation(tablePresentation: TablePresentation): void {
    this.state.tablePresentation = tablePresentation;
    this.updateState();
  }

  updateState(): void {
    localStorage.setItem(StorageKey.AQL_BUILDER, JSON.stringify(this.getState()));
  }

  private sanitizeState(): void {
    const localStorageState: AqlBuilderState = JSON.parse(localStorage.getItem(StorageKey.AQL_BUILDER)) || new AqlBuilderState();
    this.state.tabs = this.getSanitizedTabs(localStorageState);
    this.state.snippetItems = localStorageState.snippetItems || [];
    this.state.historyItems = localStorageState.historyItems || [];
  }

  private getSanitizedTabs(localStorageState: AqlBuilderState): Tab[] {
    if (localStorageState.tabs && localStorageState.tabs.length) {
      const tabs = cloneDeep(localStorageState.tabs);
      tabs.forEach((tab, index) => {
        const localStorageTab = localStorageState.tabs[index];
        tab.editor = new EditorData();
        Object.keys(localStorageTab.editor).forEach(key => {
          if (localStorageTab.editor[key] instanceof Array) {
            tab.editor[key] = new Map(localStorageTab.editor[key]);
          } else {
            tab.editor[key] = localStorageTab.editor[key];
          }
        });
      });

      return tabs;
    }

    return [];
  }

  clear() {
    this.state = new AqlBuilderState();
    localStorage.removeItem(StorageKey.AQL_BUILDER);
  }
}


export class AqlBuilderState {
  historyItems?: HistoryItem[];
  snippetItems?: SnippetItem[];
  tablePresentation?: TablePresentation;
  tabs?: Tab[];
  activeTabId?: number;
}
