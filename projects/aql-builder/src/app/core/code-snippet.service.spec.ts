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

import {TestBed} from '@angular/core/testing';

import {CodeSnippetService} from './code-snippet.service';
import {AutocompleteObjectsStore} from './autocomplete-objects.store';
import {AqlBuilderState} from './storage.service';
import {StorageKey} from '../shared/models/app.model';

describe('CodeSnippetService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [CodeSnippetService]
  }));

  it('should be created', () => {
    const service: CodeSnippetService = TestBed.inject<CodeSnippetService>(CodeSnippetService);
    expect(service).toBeTruthy();
  });

  it('should save history item', (done: DoneFn) => {
    const service: CodeSnippetService = TestBed.inject<CodeSnippetService>(CodeSnippetService);
    service.addHistoryItem('SELECT c from COMPOSITION c', new Map());
    const state = JSON.parse(localStorage.getItem(StorageKey.AQL_BUILDER)) || new AqlBuilderState();
    const localStorageHistory = state.historyItems;

    service.history$.subscribe((history) => {
      expect(history.length).toBe(1);
      expect(localStorageHistory.length).toBe(1);
      done();
    });
  });

  it('shouldn\'t save history item if previous is the same', (done: DoneFn) => {
    const service: CodeSnippetService = TestBed.inject<CodeSnippetService>(CodeSnippetService);
    service.addHistoryItem('SELECT c from COMPOSITION c', new Map());
    service.addHistoryItem('SELECT c from COMPOSITION c', new Map());
    const state = JSON.parse(localStorage.getItem(StorageKey.AQL_BUILDER)) || new AqlBuilderState();
    const localStorageHistory = state.historyItems;

    service.history$.subscribe((history) => {
      expect(history.length).toBe(1);
      expect(localStorageHistory.length).toBe(1);

      expect(history.length).toBe(1);
      expect(localStorageHistory.length).toBe(1);

      done();
    });
  });

  it('should remove history item', (done: DoneFn) => {
    const service: CodeSnippetService = TestBed.inject<CodeSnippetService>(CodeSnippetService);
    service.addHistoryItem('SELECT c0 from COMPOSITION c0', new Map());
    service.addHistoryItem('SELECT c1 from COMPOSITION c1', new Map());
    service.addHistoryItem('SELECT c2 from COMPOSITION c2', new Map());
    service.removeHistoryItem(1);
    const state = JSON.parse(localStorage.getItem(StorageKey.AQL_BUILDER)) || new AqlBuilderState();
    const localStorageHistory = state.historyItems;

    service.history$.subscribe((history) => {
      expect(history.length).toBe(2);
      expect(history[0].code).toBe('SELECT c2 from COMPOSITION c2');
      expect(history[1].code).toBe('SELECT c0 from COMPOSITION c0');
      expect(localStorageHistory.length).toBe(2);
      done();
    });
  });

  it('should save snippet item', (done: DoneFn) => {
    const service: CodeSnippetService = TestBed.inject<CodeSnippetService>(CodeSnippetService);
    service.saveSnippet('myFancySnippet', 'SELECT c from COMPOSITION c');
    const state = JSON.parse(localStorage.getItem(StorageKey.AQL_BUILDER)) || new AqlBuilderState();
    const localStorageSnippets = state.snippetItems;

    service.snippets$.subscribe((snippets) => {
      expect(snippets.length).toBe(1);
      expect(localStorageSnippets.length).toBe(1);
      expect(AutocompleteObjectsStore.snippetMap.get('myFancySnippet')).toBe('SELECT c from COMPOSITION c');
      done();
    });
  });

  it('should remove snippet item', (done: DoneFn) => {
    const service: CodeSnippetService = TestBed.inject<CodeSnippetService>(CodeSnippetService);
    service.saveSnippet('myFancySnippet', 'SELECT c from COMPOSITION c');
    service.saveSnippet('myFancySnippet2', 'SELECT c1 from COMPOSITION c1');
    service.removeSnippetItem(1);
    const state = JSON.parse(localStorage.getItem(StorageKey.AQL_BUILDER)) || new AqlBuilderState();
    const localStorageSnippets = state.snippetItems;

    service.snippets$.subscribe((snippets) => {
      expect(snippets.length).toBe(1);
      expect(localStorageSnippets.length).toBe(1);
      expect(AutocompleteObjectsStore.snippetMap.has('myFancySnippet2')).toBe(false);
      done();
    });
  });
});
