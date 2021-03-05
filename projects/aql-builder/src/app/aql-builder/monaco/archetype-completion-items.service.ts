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

import { Injectable } from '@angular/core';
import {AdditionalAqlAutocompleteKeyword} from './monaco-aql.model';
import {EhrApiService} from '../../core/ehr-api.service';
import {MonacoAutocompleteHelper} from './monaco-autocomplete.helper';
import CompletionItem = monaco.languages.CompletionItem;
import {TabService} from '../../core/tab.service';
import {CompletionItemsCacheUtil} from '../../shared/completion-items-cache.util';

@Injectable({
  providedIn: 'root'
})
export class ArchetypeCompletionItemsService {

  private cachedResults = [];
  private lastUpdated: Date;

  constructor(private ehrService: EhrApiService, private tabService: TabService) { }

  getNameForType(type: AdditionalAqlAutocompleteKeyword): Promise<any> {
    if (!CompletionItemsCacheUtil.isCacheExpired(this.lastUpdated)) {
      return Promise.resolve({suggestions: this.cachedResults});
    }

    return new Promise(resolve => {
      this.lastUpdated = new Date();
      this.ehrService.getArchetypes([type]).then(archetypes => {
        const completionItems: CompletionItem[] = [];
        this.tabService.getActiveEditorState().archetypeNameAndIdMap.clear();
        archetypes.forEach(key => {
          let autocompleteKey = key['names'][0].replace(MonacoAutocompleteHelper.variableNameRegex, '_');
          const archetypeId = key['archetypeId'];
          if (!this.tabService.getActiveEditorState().archetypeNameAndIdMap.has(autocompleteKey)) {
            this.tabService.getActiveEditorState().archetypeNameAndIdMap.set(autocompleteKey, archetypeId);
          } else {
            autocompleteKey = `${autocompleteKey}__${archetypeId.replace(MonacoAutocompleteHelper.variableNameRegex, '_')}__`;
            this.tabService.getActiveEditorState().archetypeNameAndIdMap.set(autocompleteKey, archetypeId);
          }
          MonacoAutocompleteHelper.addCompletionItem(autocompleteKey, completionItems, monaco.languages.CompletionItemKind.Value);
        });

        this.cachedResults = completionItems;
        resolve(completionItems);
      });
    });
  }

}
