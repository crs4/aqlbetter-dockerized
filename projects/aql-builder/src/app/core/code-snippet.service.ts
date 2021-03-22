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
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HistoryItem, SnippetItem} from '../shared/models/code-snippet-model';
import {AutocompleteObjectsStore} from './autocomplete-objects.store';
import {EhrView} from '../shared/models/ehr-view.model';
import {StorageService} from './storage.service';

@Injectable()
export class CodeSnippetService {

  /**
   * History list stream. Used for loading all snippets in view/component
   */
  history$: Observable<HistoryItem[]>;
  private history: BehaviorSubject<HistoryItem[]> = new BehaviorSubject([]);

  /**
   * Snippet list stream. Used for loading all snippets in view/component
   */
  snippets$: Observable<SnippetItem[]>;
  private snippets: BehaviorSubject<SnippetItem[]> = new BehaviorSubject([]);

  /**
   * Snippet list stream. Used for loading all snippets in view/component
   */
  views$: Observable<Map<string, EhrView>>;
  private views: BehaviorSubject<Map<string, EhrView>> = new BehaviorSubject(new Map());

  /**
   * Stream indicating if view list should be updated
   */
  updateViews: Subject<boolean> = new Subject<boolean>();

  /**
   * List of all executed queries
   */
  private historyItems: HistoryItem[] = [];

  /**
   * List of all saved code snippets
   */
  private snippetItems: SnippetItem[] = [];

  /**
   * List of all views saved in platform
   */
  private viewItems: Map<string, EhrView> = new Map();

  private HISTORY_ITEM_LIMIT = 50;

  constructor(private aqlBuilderStorageService: StorageService) {
    this.history$ = this.history.asObservable();
    this.snippets$ = this.snippets.asObservable();
    this.views$ = this.views.asObservable();
  }

  initialize(): void {
    const aqlBuilderStorage = this.aqlBuilderStorageService.getState();
    this.historyItems = aqlBuilderStorage.historyItems;
    this.snippetItems = aqlBuilderStorage.snippetItems;
    this.history.next(this.historyItems);
    this.snippets.next(this.snippetItems);

    this.snippetItems.forEach(snippet => AutocompleteObjectsStore.snippetMap.set(snippet.name, snippet.code));
  }

  addHistoryItem(code: string, params: Map<string, string | number>, name?: string): void {
    // Skip saving item if it is the same as last one
    if (this.historyItems.length === 0 || code !== this.historyItems[0].code) {
      const item = new HistoryItem(code, params, name);
      this.historyItems.unshift(item);
      if (this.historyItems.length > this.HISTORY_ITEM_LIMIT) {
        this.historyItems.pop();
      }
      this.aqlBuilderStorageService.updateHistoryItems(this.historyItems);
      this.history.next(this.historyItems);
    }
  }

  removeHistoryItem(index: number): void {
    if (index < this.historyItems.length) {
      this.historyItems.splice(index, 1);
      this.aqlBuilderStorageService.updateHistoryItems(this.historyItems);
      this.history.next(this.historyItems);
    }
  }

  removeSnippetItem(index: number): void {
    if (index < this.snippetItems.length) {
      AutocompleteObjectsStore.snippetMap.delete(this.snippetItems[index].name);
      this.snippetItems.splice(index, 1);
      this.aqlBuilderStorageService.updateSnippetItems(this.snippetItems);
      this.snippets.next(this.snippetItems);
    }
  }

  saveSnippet(name: string, code: string) {
    const snippet = new SnippetItem(code, name);
    this.snippetItems.push(snippet);
    this.aqlBuilderStorageService.updateSnippetItems(this.snippetItems);
    AutocompleteObjectsStore.snippetMap.set(name, code);
    this.snippets.next(this.snippetItems);
  }

  snippetNameExist(name: string): boolean {
    return !!this.snippetItems.find( item => item.name === name);
  }

  setViewItems(rawData: any[]): void {
    this.viewItems.clear();
    rawData.forEach( view => {
      let metaData = view.metaData;
      if (metaData) {
        try {
          metaData = JSON.parse(view.metaData);
        } catch {
          console.error(`Can not parse metadata for view ${view.name}`);
          metaData = undefined;
        }
      }
      this.viewItems.set(view.name, new EhrView(view.name, view.description, view.steps, metaData));
    });
    this.views.next(this.viewItems);
  }

}
