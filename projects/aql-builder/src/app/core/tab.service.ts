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
import {EditorData} from '../aql-builder/editor/editor-data.model';
import {Tab, TabType} from '../aql-builder/editor/tab.model';
import {BehaviorSubject, Subject} from 'rxjs';
import {cloneDeep} from 'lodash';
import {AqlLangKeyword} from '../aql-builder/monaco/monaco-aql.model';
import {StorageService} from './storage.service';
import {AqlResultSet} from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class TabService {

  /**
   * Map of all opened tabs.
   * key: id of tab, value: Tab
   */
  tabs: Array<Tab> = [];

  /**
   * Propagates change when tab is updated
   */
  activeTabChange: Subject<Tab> = new Subject<Tab>();

  /**
   * Propagates change when tab is added or removed from the map
   */
  tabsUpdated: Subject<Array<Tab>> = new Subject<Array<Tab>>();

  /**
   * Notify editor.component to run given query
   */
  runQuery: Subject<{code: string}> = new Subject<{code: string}>();

  /**
   * Position of selected/active tab in this.tabs
   */
  activeTabId: number;

  /**
   * Last sorted field
   */
  sortedField: {name: string, sortOrder: AqlLangKeyword.DESC | AqlLangKeyword.ASC};

  DEFAULT_VIEW_TAB_NAME = 'New view';

  resultChanges = new BehaviorSubject<AqlResultSet>(new AqlResultSet());

  /**
   * Currently selected tab
   */
  private activeTab: Tab;

  constructor(private aqlBuilderStorageService: StorageService) {}

  initialize(): void {
    const aqlBuilderState = this.aqlBuilderStorageService.getState(true);
    if (aqlBuilderState.tabs && aqlBuilderState.tabs.length) {
      this.tabs = aqlBuilderState.tabs;
      this.dispatchTabListChange();
      this.setActiveTab(aqlBuilderState.activeTabId || 0);
    } else {
      this.createTab(new Tab(TabType.NEW_QUERY, new EditorData()));
    }
  }

  getActiveEditorState(): EditorData {
    return this.activeTab.editor;
  }

  setActiveTab(id: number): void {
    this.activeTab = cloneDeep(this.tabs[id]);
    this.activeTabId = id;

    const index = id ? id : this.tabs.findIndex(t => t.id === this.activeTab.id);
    this.tabs[index] = this.activeTab;
    this.activeTabChange.next(this.activeTab);
    this.resultChanges.next(this.activeTab.result);
    this.aqlBuilderStorageService.updateTabs(this.tabs, this.activeTabId);
  }

  getActiveTab(): Tab {
    return this.activeTab;
  }

  /**
   * Creates new tab instance, adds it to tabs map and update active tab properties
   */
  createTab(editorTab?: Tab): void {
    const tab: Tab = editorTab ? editorTab : new Tab(TabType.NEW_QUERY, new EditorData());
    const len = this.tabs.push(tab);
    this.setActiveTab(len - 1);
    this.dispatchTabListChange();
    this.aqlBuilderStorageService.updateTabs(this.tabs, this.activeTabId);
  }

  /**
   * Remove tab and re-select active tab according to new activeTabId
   */
  removeTab(id: number, dispatch = true): void {
    this.tabs.splice(id, 1);
    this.recalculateActiveTab(id);
    if (dispatch) {
      this.dispatchTabListChange();
    }
  }

  renameTab(id: number, newName: string): void {
    this.tabs[id].name = newName;
  }

  dispatchTabListChange(): void {
    this.tabsUpdated.next(cloneDeep(this.tabs));
  }

  clear(): void {
    this.tabs.length = 0;
    this.activeTab = null;
    this.activeTabId = null;
    this.sortedField = null;
  }

  /**
   * Checks if any of edge or currently active tab was removed and set new active tab based on the case
   */
  private recalculateActiveTab(id: number): void {
    const len = this.tabs.length;
    if (this.activeTabId === id) {
      id > len - 1 ? this.setActiveTab(len - 1) : this.setActiveTab(id);
    } else if (this.activeTabId > id) {
      this.setActiveTab(this.activeTabId - 1);
    }
  }


  setResult(aqlResult: AqlResultSet): void {
    const activeTab = this.getActiveTab();
    if (!activeTab) {
      return;
    }

    activeTab.result = aqlResult;
    this.resultChanges.next(aqlResult);
  }
}
