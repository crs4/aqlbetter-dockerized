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

import CompletionItem = monaco.languages.CompletionItem;
import Command = monaco.languages.Command;
import {AdditionalAqlAutocompleteKeyword, AqlLangKeyword} from './monaco-aql.model';
import ITextModel = monaco.editor.ITextModel;
import {AutocompleteObjectsStore} from '../../core/autocomplete-objects.store';

export class MonacoAutocompleteHelper {

  static readonly nameAutocompleteCharacter = '#';
  static readonly propertyAutocompleteCharacter = '/';
 // static readonly variableNameRegex = /\s|\'|\-|\+|\<|\>|\!|\"|\,|\.|\(|\)|\*|\?|:|\[|\]|\//g;
  static readonly variableNameRegex = /\$|\s|\'|\-|\+|\<|\>|\!|\"|\,|\.|\(|\)|\*|\?|:|\[|\]|\//g;
  static readonly nameAndPathDelimiter = '···';
  static readonly commentPattern = '--';
  static readonly escapedSelections = [
    AqlLangKeyword[AqlLangKeyword.TOP],
    AqlLangKeyword[AqlLangKeyword.COUNT],
    AqlLangKeyword[AqlLangKeyword.SQUASH],
    AqlLangKeyword[AqlLangKeyword.TAGS],
    AqlLangKeyword[AqlLangKeyword.CONCAT]
  ];

  static getTransitionMap(): Map<String, CompletionItem[]> {
    const transitionMap = new Map<String, CompletionItem[]>();
    transitionMap.set('', MonacoAutocompleteHelper.getInitialCompletionItem());
    transitionMap.set(AqlLangKeyword.SELECT, [...MonacoAutocompleteHelper.getProposalsForSelectKeyword(), ...this.getSnippetCompletionItems()]);
    transitionMap.set(AqlLangKeyword.FROM, [...MonacoAutocompleteHelper.getProposalsForFromKeyword(), ...this.getSnippetCompletionItems()]);
    transitionMap.set(AqlLangKeyword.CONTAINS, [...MonacoAutocompleteHelper.getProposalsForContainsKeyword(), ...this.getSnippetCompletionItems()]);
    transitionMap.set(AqlLangKeyword.WHERE, [...MonacoAutocompleteHelper.getProposalsForWhereKeyword(), ...this.getSnippetCompletionItems()]);
    transitionMap.set(AqlLangKeyword.ORDER, [...MonacoAutocompleteHelper.getProposalsForOrderKeyword(), ...this.getSnippetCompletionItems()]);

    return transitionMap;
  }

  /**
   * Resolve completion items for predefined objects like EHR, COMPOSITION,...
   *
   * @param {AdditionalAqlAutocompleteKeyword} type
   * @param {string} currentVal
   */
  static getCompletionItemsForPredefinedObjects(type: AdditionalAqlAutocompleteKeyword, currentVal: string): CompletionItem[] {
    const completionItems: CompletionItem[] = [];
    const predefinedObject = AutocompleteObjectsStore.predefinedObjects.get(type);

    if (predefinedObject) {
      const parsedMembers = currentVal.split(this.propertyAutocompleteCharacter);
      const members = parsedMembers.slice(1, parsedMembers.length).filter(v => !!v);
      const items = members && members.length ? MonacoAutocompleteHelper.getCompletionItemNames(members, predefinedObject) : predefinedObject;

      if (items && items instanceof Object) {
        Object.keys(items).filter(k => k !== 'rmType').forEach(key => {
          if (this.isObject(items[key]) && Object.keys(items[key]).filter(k => k !== 'rmType').length) {
            this.addCompletionItemWithAutocomplete(key, completionItems);
          } else {
            this.addCompletionItem(key, completionItems);
          }
        });

        return completionItems;
      }
    }

    return [];
  }

  static getCompletionItemNames(members: string[], model: any) {
    for (const member of members) {
      if (model[member]) {
        return this.getCompletionItemNames(members.filter(m => m !== member), model[member]);
      }
    }

    return Array.isArray(model) ? model[0] : model;
  }

  static getAutoTriggerSuggestCommand(): Command {
    return {
      id: 'editor.action.triggerSuggest',
      title: 'autoTrigger'
    };
  }

  static addCompletionItemWithAutocomplete(item: string, completionItems: CompletionItem[],
                                           autocompleteCharacter = this.propertyAutocompleteCharacter,
                                           kind = monaco.languages.CompletionItemKind.Field) {
    completionItems.push({
      label: item,
      kind,
      insertText: `${item}${autocompleteCharacter}`,
      detail: item,
      documentation: item,
      range: null,
      command: MonacoAutocompleteHelper.getAutoTriggerSuggestCommand()
    });

  }

  static addCompletionItem(key: string, completionItems: CompletionItem[], kind = monaco.languages.CompletionItemKind.Field) {
    completionItems.push({
      label: key,
      kind,
      insertText: key,
      detail: key,
      documentation: key,
      range: null
    });
  }

  static findLastKeyword(model: ITextModel, position, endLineNumber = position.lineNumber): string {
    const value = model.getValueInRange({
      startLineNumber: position.lineNumber,
      startColumn: 0,
      endLineNumber,
      endColumn: position.column
    });
    const keyWords = value.replace(/\n/g, ' ').split(' ')
      .filter(v => !!AqlLangKeyword[v.toUpperCase()])
      .filter(v => Array.from(MonacoAutocompleteHelper.getTransitionMap().keys()).includes(AqlLangKeyword[v.toUpperCase()]));

    if (keyWords && keyWords.length) {
      return keyWords[keyWords.length - 1].toUpperCase();
    }

    if (position.lineNumber !== 0) {
      return this.findLastKeyword(model, {lineNumber: position.lineNumber - 1, column: position.column}, position.lineNumber + 1);
    }

    return '';
  }

  static isObject(item: any): boolean {
    return Array.isArray(item) && item[0] instanceof Object || item instanceof Object;
  }

  private static getInitialCompletionItem(): CompletionItem[] {
    const select = {
      label: AqlLangKeyword.SELECT,
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: AqlLangKeyword.SELECT,
      range: null
    };

    return [select, ...this.getSnippetCompletionItems()];
  }

  private static getSnippetCompletionItems(): CompletionItem[] {
    const snippets = [];
    AutocompleteObjectsStore.snippetMap.forEach((value, key) => {
      snippets.push({
        label: key,
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: value
      });
    });

    return snippets;
  }

  private static getProposalsForOrderKeyword(): CompletionItem[] {
    return [
      {
        label: AqlLangKeyword.ASC,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.ASC,
        range: null
      },
      {
        label: AqlLangKeyword.DESC,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.DESC,
        range: null
      },
      {
        label: AqlLangKeyword.ASCENDING,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.ASCENDING,
        range: null
      },
      {
        label: AqlLangKeyword.DESCENDING,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.DESCENDING,
        range: null
      },
      {
        label: AqlLangKeyword.OFFSET,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.OFFSET,
        range: null
      },
      {
        label: AqlLangKeyword.LIMIT,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.LIMIT,
        range: null
      },
      {
        label: AqlLangKeyword.FETCH,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.FETCH,
        range: null
      },
      {
        label: AqlLangKeyword.BY,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.BY,
        range: null
      },
    ];
  }

  private static getProposalsForFromKeyword(): CompletionItem[] {
    return [
      {
        label: AqlLangKeyword.CONTAINS,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.CONTAINS,
        range: null
      },
      {
        label: AqlLangKeyword.EHR,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.EHR,
        range: null
      },
      {
        label: AqlLangKeyword.COMPOSITION,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.COMPOSITION,
        range: null
      },
      {
        label: AqlLangKeyword.OBSERVATION,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.OBSERVATION,
        range: null
      },
      {
        label: AqlLangKeyword.EVALUATION,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.EVALUATION,
        range: null
      },
      {
        label: AqlLangKeyword.INSTRUCTION,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.INSTRUCTION,
        range: null
      },
      {
        label: AqlLangKeyword.ACTION,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.ACTION,
        range: null
      },
      {
        label: AqlLangKeyword.ADMIN_ENTRY,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.ADMIN_ENTRY,
        range: null
      },
      {
        label: AqlLangKeyword.WHERE,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.WHERE,
        range: null
      },
      {
        label: AqlLangKeyword.OFFSET,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.OFFSET,
        range: null
      },
      {
        label: AqlLangKeyword.LIMIT,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.LIMIT,
        range: null
      },
      {
        label: AqlLangKeyword.FETCH,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.FETCH,
        range: null
      },
      {
        label: AqlLangKeyword.VERSION,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.VERSION,
        range: null
      },
      {
        label: AqlLangKeyword.VERSIONED_OBJECT,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.VERSIONED_OBJECT,
        range: null
      },
      {
        label: AqlLangKeyword.CLUSTER,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.CLUSTER,
        range: null
      },
      {
        label: AqlLangKeyword.SECTION,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.SECTION,
        range: null
      },
      {
        label: AqlLangKeyword.TASK_PLAN,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.TASK_PLAN,
        range: null
      },
      {
        label: AqlLangKeyword.WORK_PLAN,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.WORK_PLAN,
        range: null
      }];
  }

  private static getProposalsForSelectKeyword(): CompletionItem[] {
    return [
      {
        label: AqlLangKeyword.AS,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.AS,
        range: null
      },
      {
        label: AqlLangKeyword.TOP,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.TOP,
        range: null
      },
      {
        label: AqlLangKeyword.FROM,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.FROM,
        range: null
      },
      {
        label: AqlLangKeyword.COUNT,
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: AqlLangKeyword.COUNT,
        range: null
      },
      {
        label: AqlLangKeyword.MIN,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.MIN,
        range: null
      },
      {
        label: AqlLangKeyword.MAX,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.MAX,
        range: null
      },
      {
        label: AqlLangKeyword.AVG,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.AVG,
        range: null
      },
      {
        label: AqlLangKeyword.DISTINCT,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.DISTINCT,
        range: null
      },
      {
        label: AqlLangKeyword.SQUASH,
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: AqlLangKeyword.SQUASH  + '()',
        range: null
      },
      {
        label: AqlLangKeyword.TAGS,
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: AqlLangKeyword.TAGS  + '()',
        range: null
      },
      {
        label: AqlLangKeyword.CONCAT,
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: AqlLangKeyword.CONCAT  + '()',
        range: null
      },
    ];
  }

  private static getProposalsForWhereKeyword(): CompletionItem[] {
    return [
      {
        label: AqlLangKeyword.AND,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.AND,
        range: null
      },
      {
        label: AqlLangKeyword.OR,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.OR,
        range: null
      },
      {
        label: AqlLangKeyword.XOR,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.XOR,
        range: null
      },
      {
        label: AqlLangKeyword.NOT,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.NOT,
        range: null
      },
      {
        label: AqlLangKeyword.EXISTS,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.EXISTS,
        range: null
      },
      {
        label: AqlLangKeyword.MATCHES,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.MATCHES,
        range: null
      },
      {
        label: AqlLangKeyword.OFFSET,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.OFFSET,
        range: null
      },
      {
        label: AqlLangKeyword.LIMIT,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.LIMIT,
        range: null
      },
      {
        label: AqlLangKeyword.FETCH,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.FETCH,
        range: null
      },
      {
        label: AqlLangKeyword.ORDER_BY,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.ORDER_BY,
        range: null
      },
      {
        label: AqlLangKeyword.ORDER,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.ORDER,
        range: null
      },
      {
        label: AqlLangKeyword.TAGGED_BY,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.TAGGED_BY,
        range: null
      },
      {
        label: AqlLangKeyword.CURRENT_TIMESTAMP,
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: AqlLangKeyword.CURRENT_TIMESTAMP + '()',
        range: null
      },
      {
        label: AqlLangKeyword.UNION_ALL,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.UNION_ALL,
        range: null
      },
    ];
  }

  private static getProposalsForContainsKeyword(): CompletionItem[] {
    const completionItems = this.getProposalsForFromKeyword();
    const items = [
      {
        label: AqlLangKeyword.ORDER_BY,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.ORDER_BY,
        range: null
      },
      {
        label: AqlLangKeyword.TOP,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.TOP,
        range: null
      },
      {
        label: AqlLangKeyword.TAGGED_BY,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: AqlLangKeyword.TAGGED_BY,
        range: null
      }
    ];

    completionItems.push(...items);

    return completionItems;
  }

}
