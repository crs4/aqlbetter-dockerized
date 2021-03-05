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
import {CompletionItemsFactoryService} from './completion-items-factory.service';
import {EhrApiService} from '../../core/ehr-api.service';
import {TabService} from '../../core/tab.service';
import {CommonUtil} from '../../shared';
import {ArchetypesCompletionItemsService} from './archetypes-completion-items.service';
import {cloneDeep} from 'lodash';
import {CodePresentation} from '../editor/code-presentation.enum';
import {QueryManipulatorUtil} from '../tree/query-manipulator.util';
import ITextModel = monaco.editor.ITextModel;
import {CompletionItemsCacheUtil} from '../../shared/completion-items-cache.util';

@Injectable({
  providedIn: 'root'
})
export class MonacoService {

  private cachedArchetype = new Map<string, any>();
  private archetypeLastUpdated = new Map<string, Date>();

  constructor(private completionItemsFactoryService: CompletionItemsFactoryService,
              private archetypesCompletionItemService: ArchetypesCompletionItemsService,
              private ehrApiService: EhrApiService,
              private tabService: TabService) {
  }

  registerCompletionProvider(): void {
    const monaco = (window as any).monaco;

    monaco.languages.registerCompletionItemProvider('aql', {
      triggerCharacters: [MonacoAutocompleteHelper.propertyAutocompleteCharacter, MonacoAutocompleteHelper.nameAutocompleteCharacter],
      provideCompletionItems: (model: ITextModel, position, context, token) => {

        return new Promise(async (resolve) => {

          this.setAdditionalAqlKeywords(model.getValue());
          this.setVariableToArchetypeName(model.getValue());

          resolve(this.completionItemsFactoryService.getCompletionItems(model, position));
        });

      }
    });
  }

  replaceWithPaths(code: string): string {
    this.tabService.getActiveEditorState().replacementMap.forEach( (v, k) => {
      let variableAndName = k.split(MonacoAutocompleteHelper.nameAndPathDelimiter)[0];
      let index = code.indexOf(variableAndName);
      const variable = variableAndName.split('/')[0];
      if (index === -1) {
        const namePaths = variableAndName.split('/');
        variableAndName = `${variable}/${namePaths[namePaths.length - 1]}`;
        index = code.indexOf(variableAndName);
      }

      if (index > -1) {
        const replacementRegex = new RegExp(`\(${CommonUtil.escapeRegExp(variableAndName)}\)(?=\\s|,|\\n|\\)|\\/)`, 'g');
        code = code.replace(replacementRegex, v.startsWith(`${variable}/`) ? v : `${variable}${v}`);
      }
    });

    this.tabService.getActiveEditorState().archetypeNameAndIdMap.forEach((v, k) => {
      if (code.indexOf(`#${k} `) > -1 || code.indexOf(`#${k}\n`) > -1 || code.indexOf(`#${k}`) > -1) {
        const replacementRegex = new RegExp(`\(${CommonUtil.escapeRegExp(MonacoAutocompleteHelper.nameAutocompleteCharacter + k)}\)(?=\\s|,|\\n|\\)|\\/)`, 'g');
        code = code.replace(replacementRegex, `[${v}]`);
      }
    });

    return code;
  }

  beautifyCode(code: string): any {
    this.tabService.getActiveEditorState().replacementMap.forEach( (v, k) => {
      const valueIndex = !!v ? code.indexOf(v) : -1;

      if (valueIndex > -1) {
        let valueToBeReplaced = code.substring(valueIndex + 1, valueIndex + v.length);
        valueToBeReplaced = valueToBeReplaced.startsWith('/') ? valueToBeReplaced : `/${valueToBeReplaced}`;

        const replacementValue = k.split(MonacoAutocompleteHelper.nameAndPathDelimiter)[0].split('/').slice(1).join('/');
        // tslint:disable-next-line:max-line-length
        const value = replacementValue.endsWith(MonacoAutocompleteHelper.propertyAutocompleteCharacter) ? replacementValue.substring(0, replacementValue.length - 1) : replacementValue;
        const replaceRegex = new RegExp(`\(${CommonUtil.escapeRegExp(valueToBeReplaced)}\)`, 'g');
        code = code.replace(replaceRegex, value.startsWith('/') ? value : `/${value}`);
      }
    });

    this.tabService.getActiveEditorState().archetypeNameAndIdMap.forEach((v, k) => {
      const match = code.match(v);
      if (match) {
        const replaceRegex = new RegExp(`\\[${match[0]}\\]`, 'g');
        code = code.replace(replaceRegex, `${MonacoAutocompleteHelper.nameAutocompleteCharacter}${k}`);
      }
    });

    return code;
  }

  getCodePresentation(currentCodePresentation: CodePresentation) {
    const editorState = this.tabService.getActiveEditorState();
    const code = editorState.code;
    if (CommonUtil.isBlank(code)) {
      return currentCodePresentation;
    }

    let isBeautified = false;
    editorState.archetypeNameAndIdMap.forEach((_, k) => {
      const match = code.indexOf(`#${k} `) > -1 || code.indexOf(`#${k}\n`) > -1 || code.indexOf(`#${k}`) > -1;
      isBeautified = isBeautified || !!match;
    });

    if (!isBeautified) {
      editorState.variableToArchetypeNameMap.forEach((v, _) => {
        const match = code.indexOf(`#${v} `) > -1 || code.indexOf(`#${v}\n`) > -1 || code.indexOf(`#${v}`) > -1;
        isBeautified = isBeautified || !!match;
      });
    }

    return isBeautified ? CodePresentation.BEAUTIFY : CodePresentation.PLAIN;
  }

  setAdditionalAqlKeywords(monacoValue: string) {
    const allVals = monacoValue.replace(/\n/g, ' ')
      .split(' ')
      .map(v => v.replace(/[\(\)]/g, ''))
      .filter(v => !!v);
    const variables: {index: number, value: string}[] = [];
    allVals.forEach((val, index) => {
      if ((!!AdditionalAqlAutocompleteKeyword[val.toLowerCase()] || !!AdditionalAqlAutocompleteKeyword[val.toUpperCase()]) && allVals[index + 1]) {
        variables.push({index: index + 1, value: allVals[index + 1].trim()});
      }
    });


    variables.forEach(val => {
      const valIndex = val.index;
      const key = allVals[valIndex - 1].toUpperCase();
      let hasArchetype = false;

      let valKey = '';
      if (allVals[valIndex].indexOf(MonacoAutocompleteHelper.propertyAutocompleteCharacter) > -1) {
        valKey = allVals[valIndex].split(MonacoAutocompleteHelper.propertyAutocompleteCharacter)[0];
        if (valKey.indexOf('[') > -1) {
          valKey = allVals[valIndex].split('[')[0].trim();
        }
      } else {
        valKey = allVals[valIndex].split('[')[0].trim();
        hasArchetype = allVals[valIndex].indexOf('[') > -1 && allVals[valIndex].indexOf(']') > -1;
      }

      const activeEditorState = this.tabService.getActiveEditorState();
      if (valKey.indexOf(MonacoAutocompleteHelper.nameAutocompleteCharacter) > -1) {
        const [variableName, variableValue] = valKey.split(MonacoAutocompleteHelper.nameAutocompleteCharacter);
        if (!activeEditorState.archetypeNameAndIdMap.has(variableValue) && variableValue) {
          const lastUpdated = this.archetypeLastUpdated.get(valKey);
          const cachedArchetype = this.cachedArchetype.get(valKey);
          if (!CompletionItemsCacheUtil.isCacheExpired(lastUpdated) && cachedArchetype) {
            this.setArchetypeInEditorData(cachedArchetype, variableName, variableValue, monacoValue);
          } else {
            this.archetypeLastUpdated.set(valKey, new Date());
            this.cachedArchetype.set(valKey, null);
            this.ehrApiService.getArchetypes([allVals[valIndex - 1]])
              .then(data => {
                const archetype = data.find(d => d['names'][0].replace(MonacoAutocompleteHelper.variableNameRegex, '_') === variableValue);
                this.cachedArchetype.set(valKey, archetype);
                this.setArchetypeInEditorData(archetype, variableName, variableValue, monacoValue);
              });
          }
        }
        activeEditorState.additionalKeywordVariables.set(variableName, AdditionalAqlAutocompleteKeyword[key]);
      } else if (hasArchetype) {
        const archetypeExists = Array.from(activeEditorState.archetypeNameAndIdMap.values()).some(id => allVals.indexOf(id) > -1);
        if (!archetypeExists) {
          const lastUpdated = this.archetypeLastUpdated.get(valKey);
          const cachedArchetype = this.cachedArchetype.get(valKey);
          if (!CompletionItemsCacheUtil.isCacheExpired(lastUpdated) && cachedArchetype) {
            this.setArchetypeInEditorData(cachedArchetype, valKey, cachedArchetype.names[0], monacoValue);
          } else {
            this.archetypeLastUpdated.set(valKey, new Date());
            this.cachedArchetype.set(valKey, null);
            this.ehrApiService.getArchetypes([key])
              .then(data => {
                const archetypeMatch = allVals[valIndex].match(/\[.*\]/g)[0];
                const archetypeName = archetypeMatch.substring(1, archetypeMatch.length - 1);
                const matchingArchetype = data.filter(item => item.archetypeId === archetypeName)[0];
                if (matchingArchetype) {
                  this.cachedArchetype.set(valKey, matchingArchetype);
                  this.setArchetypeInEditorData(matchingArchetype, valKey, matchingArchetype.names[0], monacoValue);
                }
              });
          }
        }
        activeEditorState.additionalKeywordVariables.set(valKey, AdditionalAqlAutocompleteKeyword[key]);
      } else {
        activeEditorState.additionalKeywordVariables.set(valKey, AdditionalAqlAutocompleteKeyword[key]);
      }
    });
  }

  setVariableToArchetypeName(code: string) {
    const namedVariables = code.match(/([a-za-яA-ZA-Я_\-"'0-9]*#[a-za-яA-ZA-Я_\-"'0-9]*($|\S))(?=\s|,|\n|\)|\/)/g);

    if (namedVariables) {
      namedVariables.forEach(v => {
        const variableAndName = v.split(MonacoAutocompleteHelper.nameAutocompleteCharacter);
        if (variableAndName[1]) {
          const sanitizedVariableValue = QueryManipulatorUtil.sanitizeVariableValue(variableAndName[1]);
          this.tabService.getActiveEditorState().variableToArchetypeNameMap.set(variableAndName[0], sanitizedVariableValue);
        }
      });
    }
  }


  clearEditorDataStore(monacoValue: string) {
    const editorState = this.tabService.getActiveEditorState();
    editorState.additionalKeywordVariables.clear();
    editorState.variableToArchetypeNameMap.clear();

    const archetypeNameAndIdFiltered = new Map<string, string>();
    editorState.archetypeNameAndIdMap.forEach((v, k) => {
      if (monacoValue.indexOf(`#${k} `) > -1 || monacoValue.indexOf(`#${k}\n`) > -1 || monacoValue.indexOf(`#${k}`) > -1 || monacoValue.indexOf(`[${v}]`) > -1) {
        archetypeNameAndIdFiltered.set(k, v);
      }
    });

    editorState.archetypeNameAndIdMap = archetypeNameAndIdFiltered;

  }

  cleanReplacementMap(archetypeMap: Map<string, string>, monacoValue: string) {
    const editorState = this.tabService.getActiveEditorState();
    const archetypesAreEqual = Array.from(archetypeMap.keys())
      .every(key => editorState.variableToArchetypeNameMap.has(key) && editorState.variableToArchetypeNameMap.get(key) === archetypeMap.get(key));
    if (!archetypesAreEqual) {
      editorState.replacementMap = this.getCleanReplacementMap(editorState.replacementMap, monacoValue);
    }
  }

  getCleanReplacementMap(replacementMap: Map<string, string>, monacoValue: string): Map<string, string> {
    const cleanReplacementMap = cloneDeep(replacementMap);
    replacementMap.forEach((v, k) => {
      const regex = new RegExp(`\(${CommonUtil.escapeRegExp(k.split(MonacoAutocompleteHelper.nameAndPathDelimiter)[0])}\)(?=\\s|,|\\n|\\)|\\/|$)`, 'g');
      if (monacoValue.indexOf(v) === -1 && !monacoValue.match(regex)) {
        cleanReplacementMap.delete(k);
      }
    });

    return cleanReplacementMap;
  }

  isWordCommented(code: string, word: string): boolean {
    const lines = code.split('\n');
    let isWordCommented = false;
    lines.forEach(line => {
      const wordIndex = line.indexOf(word);
      const commentIndex = line.indexOf(MonacoAutocompleteHelper.commentPattern);

      if (commentIndex === -1 || isWordCommented) {
        return;
      }

      if (wordIndex > -1 && wordIndex > commentIndex) {
        isWordCommented = true;
      }
    });

    return isWordCommented;
  }

  private setReplacementMap(code: string) {
    const selectIndex = code.toUpperCase().indexOf(AqlLangKeyword.SELECT);
    const fromIndex = code.toUpperCase().indexOf(AqlLangKeyword.FROM);
    const substring = code.substring(selectIndex + AqlLangKeyword.SELECT.length, fromIndex);
    const variables = this.getSelections(substring);

    const activeEditorState = this.tabService.getActiveEditorState();

    activeEditorState.variableToArchetypeNameMap.forEach((v, k) => {
      variables.forEach(variable => {
        if (variable.split('/')[0] === k) {
          this.archetypesCompletionItemService.getCompletionItemsFromType(activeEditorState.additionalKeywordVariables.get(k), `${variable}/`)
            .then(_ => {
              this.tabService.getActiveEditorState().replacementMap.forEach((val, key) => {
                if (`${variable.split('/')[0]}${val}` === variable || `${val}` === variable ) {
                  const [name, path] = key.split(MonacoAutocompleteHelper.nameAndPathDelimiter);
                  activeEditorState.addReplacementItem(name, path);
                }
              });
          });
        }
      });
    });
  }


  private getSelections(substring: string) {
    return substring.trim()
      .split('\n')
      .filter(v => !v.trim().startsWith(MonacoAutocompleteHelper.commentPattern))
      .map(v => v.trim()).join(' ')
      .split(/[\,]/g)
      .map(v => {
        MonacoAutocompleteHelper.escapedSelections.forEach(keyword => {
          v = v.replace(`${keyword}`, '')
            .replace(` ${keyword}`, '')
            .replace('(', '')
            .replace(')', '');
        });
        return v.trim();
      }).map(v => {
        Array.from(this.tabService.getActiveEditorState().additionalKeywordVariables.keys())
          .forEach(key => {
            if (v.indexOf(` ${key}/`) > -1) {
              v = v.substring(v.indexOf(` ${key}/`));
            }
          });

        return v;
      });
  }

  private setArchetypeInEditorData(archetype: any, variableName: string, variableValue: string, monacoValue: any) {
    if (archetype) {
      const sanitizedVariableValue = QueryManipulatorUtil.sanitizeVariableValue(variableValue);
      this.tabService.getActiveEditorState().archetypeNameAndIdMap.set(sanitizedVariableValue, archetype['archetypeId']);
      this.tabService.getActiveEditorState().variableToArchetypeNameMap.set(variableName, sanitizedVariableValue);
      this.setReplacementMap(monacoValue);
    }
  }

}
