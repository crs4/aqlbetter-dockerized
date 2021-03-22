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
import {AdditionalAqlAutocompleteKeyword} from './monaco-aql.model';
import {EhrApiService} from '../../core/ehr-api.service';
import {MonacoAutocompleteHelper} from './monaco-autocomplete.helper';
import {TabService} from '../../core/tab.service';
import CompletionItem = monaco.languages.CompletionItem;
import {CommonUtil} from '../../shared';
import {EditorData} from '../editor/editor-data.model';
import {AqlTemplateTreeService} from '../../core/aql-template-tree.service';
import {cloneDeep} from 'lodash';
import {TranslateService} from '@ngx-translate/core';
import {CompletionItemsCacheUtil} from '../../shared/completion-items-cache.util';

@Injectable({
  providedIn: 'root'
})
export class ArchetypesCompletionItemsService {

  private cachedResults: CompletionItem[] | Promise<CompletionItem[]> = [];
  private lastUpdated: Date;

  constructor(private ehrService: EhrApiService,
              private tabService: TabService,
              private translateService: TranslateService,
              private templateTreeService: AqlTemplateTreeService) {

  }

  getCompletionItemsFromType(type: AdditionalAqlAutocompleteKeyword, currentVal: string): Promise<any> {
    if (!CompletionItemsCacheUtil.isCacheExpired(this.lastUpdated)) {
      return Promise.resolve({suggestions: this.cachedResults});
    }

    if (AdditionalAqlAutocompleteKeyword[type]) {
      return new Promise(resolve => {
        const variable = currentVal.split(MonacoAutocompleteHelper.propertyAutocompleteCharacter)[0];
        const editorState = this.tabService.getActiveEditorState();
        const archetypeId = editorState.archetypeNameAndIdMap
          .get(editorState.variableToArchetypeNameMap.get(variable)) || this.getArchetypeIdFromPath(variable);

        this.lastUpdated = new Date();
        if (archetypeId) {
          this.ehrService.getArchetypeDescription(archetypeId).then(data => {
            let items = data;
            const completionItems = [];
            let inputCompletionItems;
            if (data.fields) {
              const names = [];
              const uniqueFieldAqls = new Set(data.fields.map(field => field.aql));
              items = Array.from(uniqueFieldAqls)
                .map(fieldAql => data.fields.find(field => field.aql === fieldAql))
                .map(field => this.getUniqueName(field, names));

              items.forEach((item, index) => {
                const sanitizedName = item.endsWith(MonacoAutocompleteHelper.propertyAutocompleteCharacter) ? `${item.substring(0, item.length - 1)}` : `${item}`;
                editorState.addReplacementItem(`${variable}/${sanitizedName}`, data.fields[index].aql);
              });

              inputCompletionItems = this.getCompletionItemsForFields(data, currentVal);

              const inputCompletionItemsExists = inputCompletionItems && inputCompletionItems.length;
              if (!inputCompletionItemsExists && currentVal === `${variable}${MonacoAutocompleteHelper.propertyAutocompleteCharacter}`) {
                items.forEach(item => {
                  if (!completionItems.some(ci => ci.label && ci.label === item || ci.label === item.substring(0, item.length - 1))) {
                    if (item.endsWith(MonacoAutocompleteHelper.propertyAutocompleteCharacter)) {
                      MonacoAutocompleteHelper.addCompletionItemWithAutocomplete(item.substring(0, item.length - 1), completionItems);
                    } else {
                      MonacoAutocompleteHelper.addCompletionItem(item, completionItems);
                    }
                  }
                });
              }
            }


            if (data['templateToArchetypes']) {
              const archetypes = this.findArchetypeContentArchetypes(data['templateToArchetypes'], archetypeId);
              this.getArchetypesDataAsync(archetypes, editorState, inputCompletionItems, currentVal, completionItems, variable)
                .then((autocompleteItems) => {
                  const resolvedItems = this.populateCompletionItems(type, currentVal, autocompleteItems, completionItems);
                  this.cachedResults = resolvedItems;
                  return resolve(resolvedItems);
                });
            } else {
              const resolvedItems = this.populateCompletionItems(type, currentVal, inputCompletionItems, completionItems);
              this.cachedResults = resolvedItems;
              return resolve(resolvedItems);
            }
          });
        } else {
          this.ehrService.getArchetypes([type]).then(data => {
            const parsedMembers = currentVal.split(MonacoAutocompleteHelper.propertyAutocompleteCharacter);
            const members = parsedMembers.slice(1, parsedMembers.length).filter(v => !!v);
            let items;
            if (data[0]) {
              items = members && members.length ? MonacoAutocompleteHelper.getCompletionItemNames(members, data[0]) : data[0];
            }
            if (items instanceof Object || !items) {
              const completionItems = MonacoAutocompleteHelper.getCompletionItemsForPredefinedObjects(type, currentVal);
              if (items && editorState.variableToArchetypeNameMap.size || !completionItems.length) {
                Object.keys(items).forEach(key => {
                  if (MonacoAutocompleteHelper.isObject(items[key])) {
                    MonacoAutocompleteHelper.addCompletionItemWithAutocomplete(key, completionItems);
                  } else {
                    MonacoAutocompleteHelper.addCompletionItem(key, completionItems);
                  }
                });
              }

              this.cachedResults = completionItems;
              return resolve(completionItems);
            }
          });
        }

      });
    }

    return Promise.resolve([]);
  }


  private getCompletionItemsForFields(data: any, currentVal: string): CompletionItem[] {

    const sanitizedCurrentVal = currentVal.endsWith(MonacoAutocompleteHelper.propertyAutocompleteCharacter) ? currentVal.substring(0, currentVal.length - 1) : currentVal;
    const replacementKeys = Array.from(this.tabService.getActiveEditorState().replacementMap.keys());
    const key = replacementKeys.find(k => {
      const keyParts = k.split(MonacoAutocompleteHelper.nameAndPathDelimiter);
      return keyParts[0] === sanitizedCurrentVal;
    });

    const aql = this.tabService.getActiveEditorState().replacementMap.get(key);

    const field = data.fields ? data.fields.filter(f => {
      return f.aql === aql || `/content[${data.archetypeId}]${f.aql}` === aql;
    })[0] : undefined;


    const completionItems: CompletionItem[] = [];
    if (this.templateTreeService.flatTreeNodeStore) {
      const treeNode = this.templateTreeService.flatTreeNodeStore.get(aql) || this.templateTreeService.flatTreeNodeStore.get(`/content[${data.archetypeId}]${aql}`);
      if (treeNode) {
        const elementWithDetails = this.templateTreeService.addAdditionalAttributesToTree(cloneDeep(treeNode));
        elementWithDetails.children.map(ch => ch.name)
          .forEach(name => {
            MonacoAutocompleteHelper.addCompletionItem(name, completionItems);
          });
      }
    }

    if (field && field.inputs && !completionItems.length) {
      if (field.inputs.flatMap(i => i).length > 0) {
        const keys = field.inputs.flatMap(i => i).filter(i => i.suffix).map(i => i.suffix);
        const keySet = new Set<string>(keys);
        keySet.forEach(k => {
          MonacoAutocompleteHelper.addCompletionItem(k, completionItems);
        });

        return completionItems;
      }
    }

    return completionItems;
  }

  private mapToInputName(field: any): string {
    let label = field['id'].startsWith('/') ? field['id'].substring(1, field['id'].length) : field['id'];
    const localizedNames = field['localizedNames'][0];
    if (localizedNames && Object.keys(localizedNames).length) {
      const name = localizedNames[this.translateService.currentLang] || localizedNames['en'] || localizedNames[Object.keys(localizedNames)[0]];
      label = name.replace(MonacoAutocompleteHelper.variableNameRegex, '_');
    } else if (field['names'] && field['names'][0]) {
      label = field['names'][0].replace(MonacoAutocompleteHelper.variableNameRegex, '_');
    }

    if (field.inputs && field.inputs.flatMap(i => i).length > 1) {
      label = label + MonacoAutocompleteHelper.propertyAutocompleteCharacter;
    }

    return label;
  }

  private findArchetypeContentArchetypes(templates: any, archetypeId: string, archetypesContent = []) {
    if (!templates) {
      return archetypesContent;
    }

    Object.keys(templates).forEach(key => {
      if (key === archetypeId) {
        archetypesContent.push(templates[key]);
      } else {
        return this.findArchetypeContentArchetypes(templates[key], archetypeId, archetypesContent);
      }
    });

    return archetypesContent;
  }

  private async getArchetypesDataAsync(archetypes: any[], editorState: EditorData,
                                       inputCompletionItems: monaco.languages.CompletionItem[], currentVal: any, completionItems: monaco.languages.CompletionItem[], variable: string) {
    for (const archetype of archetypes) {
      for (const childArchetype of Object.keys(archetype)) {
        const archData = await this.ehrService.getArchetypeDescription(childArchetype)
                                              .catch((err) => console.error(`Getting archetype data from server failed`, err));
        if (archData && archData.fields) {
          const itemsMap = new Map<string, string>();
          archData.fields.forEach((field, i, names) => {
            const inputName = this.getUniqueName(field, names);

            if (field.aql) {
              const sanitizedName = inputName.endsWith(MonacoAutocompleteHelper.propertyAutocompleteCharacter) ? inputName.substring(0, inputName.length - 1) : inputName;
              const fieldAqlValue = `/content[${archData.archetypeId}]${field.aql}`;
              if (itemsMap.has(sanitizedName) && itemsMap.get(sanitizedName) !== fieldAqlValue || completionItems.some(ci => ci.label === sanitizedName)) {
                itemsMap.set(`${sanitizedName}_(${field.aql})`, fieldAqlValue);
              } else {
                itemsMap.set(sanitizedName, fieldAqlValue);
              }
            }
          });

          itemsMap.forEach((value, key) => {
            const archetypeSanitizedName = archData.names[0] ? archData.names[0].replace(MonacoAutocompleteHelper.variableNameRegex, '_') : '';
            const replacementMap = editorState.replacementMap;
            const sanitizedName = `${variable}/${key}${MonacoAutocompleteHelper.nameAndPathDelimiter}${value}`;
            if (replacementMap.has(sanitizedName) && replacementMap.get(sanitizedName) !== value && !CommonUtil.isBlank(archetypeSanitizedName)) {
              editorState.addReplacementItem(`${variable}/${archetypeSanitizedName}/${key}`, value);
            } else {
              editorState.addReplacementItem(sanitizedName, value);
            }
          });

          inputCompletionItems = this.getCompletionItemsForFields(archData, currentVal);
          const inputCompletionItemsExists = inputCompletionItems && !!inputCompletionItems.length;
          if (!inputCompletionItemsExists && currentVal === `${variable}/`) {
            Array.from(itemsMap.keys()).forEach(item => {
              if (item.endsWith(MonacoAutocompleteHelper.propertyAutocompleteCharacter)) {
                MonacoAutocompleteHelper.addCompletionItemWithAutocomplete(item.substring(0, item.length - 1), completionItems);
              } else {
                MonacoAutocompleteHelper.addCompletionItem(item, completionItems);
              }
            });
          }
        }
      }
    }

    return inputCompletionItems;
  }

  private populateCompletionItems(type: AdditionalAqlAutocompleteKeyword, currentVal: string,
                                  inputCompletionItems: CompletionItem[], completionItems: CompletionItem[]): Promise<CompletionItem[]> {
    return new Promise(resolve => {
      const commonCompletionItems = MonacoAutocompleteHelper.getCompletionItemsForPredefinedObjects(type, currentVal);
      const variable = currentVal && currentVal.split('/')[0];
      if (inputCompletionItems && inputCompletionItems.length) {
        return resolve([...inputCompletionItems]);
      } else if (currentVal === `${variable}/`) {
        return resolve([...completionItems, ...commonCompletionItems]);
      }
    });
  }

  private getArchetypeIdFromPath(variable: string): string | undefined {
    const code = this.tabService.getActiveEditorState().code;
    const startIndex = code.indexOf(`${variable}[`);
    if (startIndex > -1) {
      const variableWithArchetype = code.substring(startIndex).substring(0, code.substring(startIndex).indexOf(']') + 1);
      return variableWithArchetype.substring(2, variableWithArchetype.length - 1);
    }

    return undefined;
  }

  private getUniqueName(field: any, names: any[]): string {
    let inputName = this.mapToInputName(field);
    if (names.some(n => n === inputName)) {
      inputName = field.id.replace(MonacoAutocompleteHelper.variableNameRegex, '_');
      names.push(`${field.id}`);
    } else {
      names.push(inputName);
    }

    return inputName;
  }
}
