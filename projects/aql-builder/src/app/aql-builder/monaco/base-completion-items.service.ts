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
import {AdditionalAqlAutocompleteKeyword, AqlLangKeyword} from './monaco-aql.model';
import {MonacoAutocompleteHelper} from './monaco-autocomplete.helper';
import ITextModel = monaco.editor.ITextModel;
import CompletionItem = monaco.languages.CompletionItem;
import {TabService} from '../../core/tab.service';
import IPosition = monaco.IPosition;

@Injectable({
  providedIn: 'root'
})
export class BaseCompletionItemsService {

  constructor(private tabService: TabService) { }

  getCompletionItems(model: ITextModel, position, currentValue: string): CompletionItem[] {
    const lastKeyword = MonacoAutocompleteHelper.findLastKeyword(model, position);
    const proposals: CompletionItem[] = MonacoAutocompleteHelper.getTransitionMap().get(AqlLangKeyword[lastKeyword] || '');

    const lw = this.getLastWord(model, position);
    if (lw && !!AdditionalAqlAutocompleteKeyword[lw.toUpperCase()]) {
      return [];
    }

    if (this.tabService.getActiveEditorState().additionalKeywordVariables.size > 0 && ![AqlLangKeyword.CONTAINS, AqlLangKeyword.FROM].includes(AqlLangKeyword[lastKeyword])) {
      this.tabService.getActiveEditorState().additionalKeywordVariables.forEach((v, k) => {
        MonacoAutocompleteHelper.addCompletionItemWithAutocomplete(
          k,
          proposals,
          MonacoAutocompleteHelper.propertyAutocompleteCharacter,
          monaco.languages.CompletionItemKind.Keyword
        );
      });
    }

    const suggestions: CompletionItem[] = [];
    if (currentValue && currentValue !== ' ') {
      proposals.forEach(completionItem => {
        if (completionItem.label.includes(currentValue.toLowerCase()) || completionItem.label.includes(currentValue.toUpperCase())) {
          suggestions.push(completionItem);
        }
      });
    } else {
      suggestions.push(...proposals);
    }

    return suggestions;
  }

  private getLastWord(model: ITextModel, position: IPosition): string {
    const value = model.getValueInRange({
      startLineNumber: position.lineNumber,
      startColumn: position.column,
      endLineNumber: position.lineNumber,
      endColumn: -1
    });
    const words = value
      .split(' ')
      .map(w => w.trim())
      .filter(w => !!w && AqlLangKeyword[w.toUpperCase()]);
    return words[words.length - 1];
  }

}
