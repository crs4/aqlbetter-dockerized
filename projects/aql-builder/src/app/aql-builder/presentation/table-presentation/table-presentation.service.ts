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
import {TableNode} from './table-presentation.model';
import {AdditionalAqlAutocompleteKeyword, AqlLangKeyword} from '../../monaco/monaco-aql.model';
import {AqlResultSet} from '../../../shared';
import {cloneDeep} from 'lodash';
import {TabService} from '../../../core/tab.service';
import {MonacoService} from '../../monaco/monaco.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {TablePresentation} from './table-presentation.enum';
import {StorageService} from '../../../core/storage.service';
import {TreeNode} from '../../../shared';
import {getFullSelections} from '@better-ui';

@Injectable()
export class TablePresentationService {
  /**
   * Defines presentation structure for tablesrc/app/aql-builder/presentation/table-presentation/table-presentation.service.ts:46:32
   *
   * i.e: 'tableName': [COMPOSITION_TABLE_NODE, EHR_TABLE_NODE,..]
   */
  tablePresentationStructure = new Map<string, TableNode[]>();

  tables = new Map<string, any>();

  rootTableNames: string[];

  resultPaths = new Map<string, string>();
  selectedTablePresentation$: Observable<TablePresentation>;

  private selectedTablePresentation: BehaviorSubject<TablePresentation>;
  private readonly emptySetPropName = 'empty';
  private readonly tableEntryDelimiter = ':::';

  constructor(public tabService: TabService,
              public monacoService: MonacoService,
              public aqlBuilderStorageService: StorageService) {
    const userSettings = aqlBuilderStorageService.getState();
    this.selectedTablePresentation = new BehaviorSubject<TablePresentation>(userSettings.tablePresentation || TablePresentation.COMPACT);
    this.selectedTablePresentation$ = this.selectedTablePresentation.asObservable();
  }

  sanitizeResultSet(resultSet: AqlResultSet): {tables: Map<string, any> | undefined, rootHeaderNames: string [] | undefined} {
    if (!resultSet.resultSet || !resultSet.resultSet.length) {
      return {tables: undefined, rootHeaderNames: undefined};
    }

    this.tables = new Map<string, any>();
    const columns: Map<string, any[]> = this.getColumns(resultSet);
    const resultObject = {};

    Array.from(columns.keys()).forEach(k => {
      resultObject[k] = columns.get(k);
    });

    const compositionColumnKey = this.getCompositionColumnKey(columns, resultSet);
    if (compositionColumnKey) {
      const tableNames: Set<string> = this.getTableNamesFromComposition(columns, compositionColumnKey);
      this.tables = this.getTablesData(tableNames, resultObject, compositionColumnKey);
    } else {
      const tableName: string = Object.keys(resultObject)[0];
      const resultObjectWithDuplicates = this.getResultObjectWithDuplicates(resultObject);

      this.tables.set(tableName, resultObjectWithDuplicates);
    }

    this.rootTableNames = this.getHeaderNames(resultSet.aql);

    this.tablePresentationStructure = new Map<string, TableNode[]>();

    return {tables: this.tables, rootHeaderNames: this.rootTableNames};
  }

  getTableNodeName(object: any, key?: string): string {
    let nameObject = object;
    let name;
    if (key) {
      nameObject = nameObject[key];
    }

    if (nameObject['name']) {
      name = nameObject['name']['value'];
    } else if (nameObject['archetype_node_id']) {
      name = nameObject['archetype_node_id'];
    } else {
      name = nameObject['@class'];
    }

    return name;
  }

  switchPresentation(presentation: TablePresentation): void {
    this.selectedTablePresentation.next(presentation);
  }

  protected setTableNodeChildren(result: any, tableNode: TableNode, additionalFilter?: any) {
    if (!(result instanceof Object)) {
      return 1;
    }

    const relevantKeys = Object.keys(result)
      .filter(k => {
        let included = this.isKeyIncluded(k);
        if (additionalFilter) {
          included = included && additionalFilter.call(this, k, result);
        }

        return included;
      });
    const keysAreIndexes = Array.isArray(result);

    relevantKeys.forEach(rk => {
      if (result[rk] instanceof Object) {
        let name = rk;
        let nodeClass;
        if (keysAreIndexes) {
          name = this.getTableNodeName(result, rk);
          nodeClass = result[rk]['@class'] || name && result[name]['@class'];
        }
        const newTableNode = new TableNode(name);
        newTableNode.class = nodeClass;
        newTableNode.archetype_node_id = result[rk] && result[rk]['archetype_node_id'];
        newTableNode.parent = tableNode;
        if (tableNode.children && newTableNode.name) {
          tableNode.children.push(newTableNode);
        } else if (newTableNode.name) {
          tableNode.children = [newTableNode];
        }

        this.setTableNodeChildren(result[rk], newTableNode, additionalFilter);
      } else {
        let name = rk;
        let nodeClass;
        if (keysAreIndexes) {
          name = this.getTableNodeName(result, rk);
          nodeClass = result[rk]['@class'] || name && result[name]['@class'];
        }
        const newTableNode = new TableNode(name);
        newTableNode.class = nodeClass;
        newTableNode.archetype_node_id = result[rk] && result[rk]['archetype_node_id'];
        newTableNode.parent = tableNode;
        if (tableNode.children && newTableNode.name) {
          tableNode.children.push(newTableNode);
        } else if (newTableNode.name) {
          tableNode.children = [newTableNode];
        }
      }
    });
  }

  protected parseResultValues(results: any, tableName: string, tableNames: string[], additionalFilter?: any) {

    // Get all value structures for all table data, so that later results could be aggregated to
    // represent all the data for different results in the same table
    let tablePresentationStructures = [];
    let entryIndex = 0;
    Object.keys(results).forEach(key => {
      entryIndex = tableNames.findIndex(tn => tn === key);
      tablePresentationStructures = [];
      results[key].forEach((result, index) => {
        const name = result && result['@class'] && !key.includes(result['@class']) ? `${result['@class']}${this.tableEntryDelimiter}${key}` : key;
        const tn = new TableNode(name);
        tn.class = result && result['@class'];
        tn.archetype_node_id = result && result['archetype_node_id'];
        if (tn.name) {
          tablePresentationStructures.push(tn);
        }
        if (result instanceof Object) {
          Object.keys(result)
            .filter(k => {
              let included = !k.startsWith('@') && k !== this.emptySetPropName;

              if (additionalFilter) {
                included = included && additionalFilter.call(this, k, key);
              }

              return included;
            })
            .forEach(resultKey => {
              const tableNode = new TableNode(resultKey);
              tableNode.parent = tn;
              tableNode.class = result[resultKey] && result[resultKey]['@class'];
              tableNode.archetype_node_id = result[resultKey] && result[resultKey]['archetype_node_id'];
              if (tablePresentationStructures[index].children && tableNode.name) {
                tablePresentationStructures[index].children.push(tableNode);
              } else if (tableNode.name) {
                tablePresentationStructures[index].children = [tableNode];
              }

              this.setTableNodeChildren(result[resultKey], tableNode, additionalFilter);
            });
        }
      });


      this.addAdditionalContent(tablePresentationStructures);

      const relevantStructureIndex = tablePresentationStructures.findIndex(data => data && !!data['class']);
      const relevantStructure = relevantStructureIndex > -1 ? tablePresentationStructures[relevantStructureIndex] : this.getRelevantStructure(tablePresentationStructures);

      this.setNumberOfLeafs(relevantStructure);

      const rootPaths = this.getHeaderPaths();
      const rootName = this.getRootName(relevantStructure) || rootPaths[entryIndex];
      this.setPaths(relevantStructure, rootName);

      if (this.tablePresentationStructure.has(tableName)) {
        this.tablePresentationStructure.get(tableName).push(relevantStructure);
      } else {
        this.tablePresentationStructure.set(tableName, [relevantStructure]);
      }
    });
  }

  /**
   * Group data from each dataset in response to separate columns
   *
   */
  private getColumns(resultSet: AqlResultSet): Map<string, any> {
    const types = new Map<string, any>();
    resultSet.resultSet.forEach(result => {
      Object.keys(result).forEach(key => {
        const entry = result[key];
        const typeHasTableEntry = Array.from(types.keys()).filter(k => k.split(this.tableEntryDelimiter)[1] === key || k.split(this.tableEntryDelimiter)[0] === key);
        if (Object.keys(result).some(k => k === key)) {
          const name = entry && entry['@class'] ? `${entry['@class']}${this.tableEntryDelimiter}${key}` : key;
          if (!typeHasTableEntry.length) {
            types.set(name, []);
            types.get(name).push(entry);
          } else {
            types.get(typeHasTableEntry[0]).push(entry);
          }
        } else {
          const name = resultSet.resultSet.map(r => r[key] && r[key]['@class']).filter(rName => !!rName)[0];
          if (typeHasTableEntry.length) {
            types.get(typeHasTableEntry[0]).push(null);
          } else {
            types.set(`${name}${this.tableEntryDelimiter}${key}`, [null]);
          }
        }
      });
    });

    return types;
  }

  private getTableNamesFromComposition(columns: Map<string, any[]>, entryKey: string): Set<string> {
    return columns.get(entryKey)
      .reduce((accumulator, composition) => {
        const compositionTemplateId = this.getCompositionTemplateId(composition);
        if (!accumulator.has(compositionTemplateId)) {
          accumulator.add(compositionTemplateId);
        }

        return accumulator;
      }, new Set<string>());
  }

  private getTablesData(tableNames: Set<string>, resultObject: any, entryKey = AqlLangKeyword.COMPOSITION.toString()) {
    const tables = new Map<string, any>();
    tableNames.forEach(item => {
      const compositions = resultObject[entryKey];
      const filteredCompositions = compositions ? compositions.filter(composition => this.getCompositionTemplateId(composition) === item) : [];
      let tableData;

      let resultObjectClone = cloneDeep(resultObject);

      if (filteredCompositions.length) {
        const compositionIndex = Object.keys(resultObjectClone).findIndex(k => k.includes(AqlLangKeyword.COMPOSITION));
        // replace compositions with filtered compositions and preserve key order
        const obj = {};
        Object.keys(resultObjectClone).forEach((k, i) => {
          if (i === compositionIndex) {
            obj[AqlLangKeyword.COMPOSITION] = filteredCompositions;
          } else {
            obj[k] = resultObjectClone[k];
          }
        });

        resultObjectClone = obj;
      }
      tableData = this.getResultObjectWithDuplicates(resultObjectClone);

      tables.set(item, tableData);
    });

    return tables;
  }

  private getHeaderNames(aql: string): string[] {
    const variables = getFullSelections(aql);

    const rootHeaderNames = [];
    variables.forEach(variable => {
      const partial = variable.split(/\s+/g).filter(v => !!v);
      const asKeyword = [AqlLangKeyword.AS, AqlLangKeyword.AS.toLowerCase()];
      const asKeywordIndex = partial.findIndex(item => asKeyword.includes(item));
      if (partial.length > 1 && asKeywordIndex > -1) {
        rootHeaderNames.push(partial[asKeywordIndex + 1]);
      } else {
        rootHeaderNames.push(partial.join(' '));
      }
    });

    return rootHeaderNames;
  }

  private getCompositionTemplateId(composition: any): string {
    return composition.archetype_details.template_id.value;
  }


  /**
   * Get max content from all the compositions, so that all compositions within same template ID can be shown in the same table
   *
   */
  protected addAdditionalContent(tempPresentationTrees: TableNode[]) {
    let additionalContent = [];
    tempPresentationTrees.forEach(tree => {
      if (!!AdditionalAqlAutocompleteKeyword[tree.name]) {
        additionalContent = [];
        this.populateAdditionalData(tree.children, tempPresentationTrees[0].children);
      }
    });
  }

  private populateAdditionalData(tableNodes: TableNode[], presentationNodes: TableNode[]) {
    presentationNodes = presentationNodes ? presentationNodes : [];
    tableNodes.forEach(ch  => {
      let childIndex = presentationNodes.findIndex(child => ch.name && ch.name.includes(child.name));
      if (childIndex === -1) {
        presentationNodes.push(ch);
      }

      if (ch.children) {
        childIndex = presentationNodes.findIndex(child => ch.name && ch.name.includes(child.name));
        if (childIndex > -1) {
          this.populateAdditionalData(ch.children, presentationNodes[childIndex].children);
        }
      }
    });

  }

  protected setNumberOfLeafs(tableNode: TableNode, numberOfLeafs = 0): number {
    if (tableNode.children) {
      tableNode.children.forEach(child => {
        numberOfLeafs += this.setNumberOfLeafs(child, 0);
        if (child.children) {
          this.setNumberOfLeafs(child, 0);
        }
      });
    }

    tableNode.numOfLeafs = numberOfLeafs === 0 ? 1 : numberOfLeafs;
    return tableNode.numOfLeafs;
  }

  /**
   * Find column which includes COMPOSITION type
   *
   */
  private getCompositionColumnKey(columns: Map<string, any>, resultSet: any): string | undefined {
    let entryKey;
    Array.from(columns.keys()).forEach(key => {
      Object.keys(resultSet.resultSet[0]).forEach(rs => {
        if (key === `${AqlLangKeyword.COMPOSITION}${this.tableEntryDelimiter}${rs}`) {
          entryKey = key;
        }
      });
    });

    return entryKey;
  }

  private fillDuplicates(resultset: any, withDuplicates: any[], root?: any, previousResultSet?: any) {
    if (!resultset) {
      return;
    }

    Object.keys(resultset).forEach(key => {
      if (Array.isArray(resultset[key])) {
        this.foundDuplicates(resultset[key], withDuplicates, root, resultset, previousResultSet);
      } else if (resultset[key] instanceof Object) {
        this.fillDuplicates(resultset[key], withDuplicates, root, previousResultSet);
      }
    });
  }

  /**
   * Assign "duplicated" property on duplicated object and remove duplicates from current result
   *
   */
  private foundDuplicates(resultSetData: any[], withDuplicates: any[], root: any, resultSet?: any, previousResultSet?: any) {
    resultSetData.forEach((result, index) => {
      if (index > 0 && this.areCurrentAndPreviousArchetypeEquals(result, resultSetData[index - 1])) {
        const arrayKey = Object.keys(resultSet).find(k => Array.isArray(resultSet[k]));

        // store first row
        if (index === 1) {
          const firstItemClone = this.prepareDuplicate({
            duplicateItem: root,
            result: resultSetData[index - 1],
            isFirstItem: true,
            arrayKey
          });
          withDuplicates.splice(withDuplicates.length - 1, 1, firstItemClone);
        }

        const duplicatedItem = this.prepareDuplicate({
          duplicateItem: root,
          result,
          arrayKey
        });
        withDuplicates.push(duplicatedItem);
        if (previousResultSet) {
          previousResultSet.splice(withDuplicates.length - 1, 0, undefined);
        }
      } else if (Array.isArray(result)) {
        this.foundDuplicates(result, withDuplicates, root, resultSetData, previousResultSet);
      } else if (result instanceof Object) {
        this.fillDuplicates(result, withDuplicates, root, previousResultSet);
      }
    });
  }

  /**
   * Remove all data except "content", "items" and "data" keys from duplicated row
   *
   */
  private removeNonRelevantDataFromDuplicates(duplicatedItem: any) {
    const exclusionKeys = ['content', 'items', 'data'];
    Object.keys(duplicatedItem).forEach(key => {
      if (exclusionKeys.includes(key)) {
        return;
      }

      if (duplicatedItem[key] instanceof Object) {
        this.removeNonRelevantDataFromDuplicates(duplicatedItem[key]);
      } else if (Array.isArray(duplicatedItem[key])) {
        duplicatedItem[key].forEach(entry => {
          this.removeNonRelevantDataFromDuplicates(entry);
        });
      } else if (!key.startsWith('@')) {
        duplicatedItem[key] = null;
      }
    });
  }


  /**
   * Populate result object with duplicates
   *
   */
  private getResultObjectWithDuplicates(resultObject: any): any {
    const clonedResultObject = cloneDeep(resultObject);
    Object.keys(resultObject).forEach((k, index) => {
      const withDuplicates = [];
      let previousResultSet;
      if (index > 0) {
        previousResultSet = resultObject[Object.keys(resultObject)[index - 1]];
      }
      resultObject[k].forEach(entry => {
        const entryClone = cloneDeep(entry);
        withDuplicates.push(entry);
        this.fillDuplicates(entryClone, withDuplicates, entryClone, previousResultSet);
      });

      clonedResultObject[k] = withDuplicates;

      this.addDuplicatedEmptyRowsOnSiblings(index, withDuplicates, clonedResultObject, resultObject);
    });


    return clonedResultObject;
  }


  /**
   * Add missing rows on surrounded result sets if current result set has duplicates
   *
   * @param index - index of current key in resultSet
   * @param withDuplicates - array which contains all duplicates for current resultSet
   * @param clonedResultObject - clone of result object
   * @param resultObject - result object
   */
  private addDuplicatedEmptyRowsOnSiblings(index: number, withDuplicates: any[], clonedResultObject: any, resultObject: any) {
    while (index > 0) {
      const previousResultSet = clonedResultObject[Object.keys(resultObject)[index - 1]].length;
      // add rows on result which is before current result with duplicates
      if (withDuplicates.length > previousResultSet) {
        withDuplicates.forEach((entry, i) => {
          if (entry && entry[this.emptySetPropName]
            && clonedResultObject[Object.keys(resultObject)[index - 1]].length !== clonedResultObject[Object.keys(resultObject)[index]].length) {
            clonedResultObject[Object.keys(resultObject)[index - 1]].splice(i, 0, {[this.emptySetPropName]: true});
          }
        });
      }

      // add rows on result which is after current result with duplicates
      if (withDuplicates.length < previousResultSet) {
        clonedResultObject[Object.keys(resultObject)[index - 1]].forEach((entry, i) => {
          if (entry && entry[this.emptySetPropName]
            && clonedResultObject[Object.keys(resultObject)[index - 1]].length !== clonedResultObject[Object.keys(resultObject)[index]].length) {
            clonedResultObject[Object.keys(resultObject)[index]].splice(i, 0, {[this.emptySetPropName]: true});
          }
        });
      }

      index--;
    }
  }

  private areCurrentAndPreviousArchetypeEquals(currentResult: any, previousResultSetData: any) {
    return previousResultSetData && currentResult['archetype_node_id'] && previousResultSetData['archetype_node_id'] === currentResult['archetype_node_id'];
  }

  private isKeyIncluded(key: string): boolean {
    return !key.startsWith('@') && key !== this.emptySetPropName && key !== 'links';
  }

  private setPaths(child: TableNode, rootName?: string) {
    if (child.parent) {
      child.path = child.parent.path;
    } else {
      child.path = rootName;
    }

    if (child.path && !child.archetype_node_id && !rootName) {
      child.path += '/';
    } else if (!child.path) {
      if (child.archetype_node_id) {
        child.path = '';
      } else {
        child.path = '/';
      }
    }

    if (child.archetype_node_id && child.parent) {
      if (child.parent.archetype_node_id) {
        child.path += `/${child.name}[${child.archetype_node_id}]`;
      } else {
        child.path += `[${child.archetype_node_id}]`;
      }
    } else if (child.parent) {
      child.path += child.name;
    }

    if (child.parent) {
      this.resultPaths.set(`${child.name}_${child.parent.name}`, child.path);
    } else {
      this.resultPaths.set(`${child.name}`, child.path);
    }

    if (child.children) {
      child.children.forEach(ch => {
        ch.parent = child;
        this.setPaths(ch);
      });
    }

  }

  private getHeaderPaths(): string[] {
    const aql = this.tabService.getActiveEditorState().code;
    const variables = getFullSelections(aql);

    const rootHeaderPaths = [];
    variables.forEach(variable => {
      const partial = variable.split(/(as)|(AS)/g).map(v => v?.trim()).filter(v => !!v);
      rootHeaderPaths.push(this.monacoService.replaceWithPaths(partial[0]));
    });

    return rootHeaderPaths;
  }

  private getRootName(rootNode: TableNode) {
    const editorState = this.tabService.getActiveEditorState();
    let archetypeName = null;
    editorState.archetypeNameAndIdMap.forEach((v, k) => {
      if (v === rootNode.archetype_node_id) {
        archetypeName = k;
      }
    });

    if (!!archetypeName) {
      let variable = '';
      editorState.variableToArchetypeNameMap.forEach((v, k) => {
        if (v === archetypeName) {
          variable = k;
        }
      });

      return variable;
    } else {
      let variable = '';
      editorState.additionalKeywordVariables.forEach((v, k) => {
        if (rootNode.class === v) {
          variable = k;
        }
      });

      return variable;
    }

  }

  private prepareDuplicate(prop: {duplicateItem: any, result: any[], arrayKey: string, isFirstItem?: boolean}): any {
    const duplicateItemClone = cloneDeep(prop.duplicateItem);
    duplicateItemClone[prop.arrayKey] = [prop.result];
    if (!prop.isFirstItem) {
      this.removeNonRelevantDataFromDuplicates(duplicateItemClone);
      duplicateItemClone[this.emptySetPropName] = true;
    }

    return duplicateItemClone;
  }

  private getRelevantStructure(tablePresentationStructures: any[], resolvedStructure: TreeNode = new TreeNode()) {
    tablePresentationStructures.forEach(structure => {
      if (!resolvedStructure.children || resolvedStructure.children?.length < structure.children?.length) {
        resolvedStructure = {...resolvedStructure, ...structure};
      }

      if (structure?.children?.length) {
        structure.children.forEach((child, index) => this.getRelevantStructure([child], resolvedStructure.children[index]));
      }
    });

    return resolvedStructure;
  }
}
