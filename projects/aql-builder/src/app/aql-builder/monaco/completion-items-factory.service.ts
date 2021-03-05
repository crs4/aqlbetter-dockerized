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
import {MonacoAutocompleteHelper} from './monaco-autocomplete.helper';
import {ArchetypeCompletionItemsService} from './archetype-completion-items.service';
import {ArchetypesCompletionItemsService} from './archetypes-completion-items.service';
import {BaseCompletionItemsService} from './base-completion-items.service';
import {AqlLangKeyword} from './monaco-aql.model';
import {TabService} from '../../core/tab.service';
import CompletionItem = monaco.languages.CompletionItem;
import ITextModel = monaco.editor.ITextModel;
import IPosition = monaco.IPosition;
import {CompletionItemsCacheUtil} from '../../shared/completion-items-cache.util';

@Injectable({
  providedIn: 'root'
})
export class CompletionItemsFactoryService {

  private cachedResults = [];
  private lastUpdated: Date;

  constructor(private archetypeCompletionItemsService: ArchetypeCompletionItemsService,
              private archetypesCompletionItemsService: ArchetypesCompletionItemsService,
              private baseCompletionItemsService: BaseCompletionItemsService,
              private tabService: TabService) { }

  getCompletionItems(model: ITextModel, position: IPosition): Promise<{suggestions: CompletionItem[]}> {
    if (!CompletionItemsCacheUtil.isCacheExpired(this.lastUpdated)) {
      return Promise.resolve({suggestions: this.cachedResults});
    }
    const currentValue = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: position.column > 1 ? position.column - 1 : position.column,
        endLineNumber: position.lineNumber,
        endColumn: position.column
      }
    );

    return new Promise<{suggestions: CompletionItem[]}>(async (resolve) => {
      this.lastUpdated = new Date();
      const editorState = this.tabService.getActiveEditorState();
      let lastWord = this.getLastWord(model, position);
      const endsWithPropertyAutocompleteChar = currentValue.endsWith(MonacoAutocompleteHelper.propertyAutocompleteCharacter);
      const lastWordIncludesPropertyAutocompleteChar = lastWord.indexOf(MonacoAutocompleteHelper.propertyAutocompleteCharacter) > -1;
      if (endsWithPropertyAutocompleteChar || lastWordIncludesPropertyAutocompleteChar) {
        if (lastWordIncludesPropertyAutocompleteChar && !endsWithPropertyAutocompleteChar) {
          const characterSplit = lastWord.split(MonacoAutocompleteHelper.propertyAutocompleteCharacter);
          lastWord = characterSplit.slice(0, characterSplit.length - 1).join('/');
        }
        const variable = this.getVariableName(lastWord, MonacoAutocompleteHelper.propertyAutocompleteCharacter);

        if (editorState.additionalKeywordVariables.has(variable)) {
          const type = editorState.additionalKeywordVariables.get(variable);
          const result = await this.archetypesCompletionItemsService.getCompletionItemsFromType(type, lastWord);
          this.cachedResults = result;
          resolve({suggestions: result});
        }
      } else if (currentValue.endsWith(MonacoAutocompleteHelper.nameAutocompleteCharacter)) {
        const variable = this.getVariableName(lastWord, MonacoAutocompleteHelper.nameAutocompleteCharacter);
        const lastKeyWord = MonacoAutocompleteHelper.findLastKeyword(model, position);

        if (![AqlLangKeyword.FROM, AqlLangKeyword.CONTAINS].includes(AqlLangKeyword[lastKeyWord])) {
          return;
        }


        if (editorState.additionalKeywordVariables.has(variable) && lastWord.split(MonacoAutocompleteHelper.nameAutocompleteCharacter).length === 2) {
          const type = editorState.additionalKeywordVariables.get(variable);
          const result = await this.archetypeCompletionItemsService.getNameForType(type);
          this.cachedResults = result;
          resolve({suggestions: result});
        }
      } else {
        if (lastWord.startsWith(':')) {
          resolve({suggestions: []});
          return;
        } else {
          const suggestions = this.baseCompletionItemsService.getCompletionItems(model, position, currentValue);
          this.cachedResults = suggestions;
          resolve({suggestions});
        }
      }
    });
  }

  private getLastWord(model: ITextModel, position: IPosition): string {
    const value = model.getValueInRange({
      startLineNumber: position.lineNumber,
      startColumn: position.column,
      endLineNumber: position.lineNumber,
      endColumn: -1
    });
    const words = value.split(' ');
    return words[words.length - 1];
  }

  private getVariableName(lastWord: string, autocompleteCharacter: string): string {
    let variable = lastWord.split(autocompleteCharacter)[0];
    if (variable.indexOf('(') > -1) {
      variable = variable.split('(')[1];
    }

    return variable;
  }

}
