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
import {TablePresentationService} from './table-presentation.service';
import {TableNode} from './table-presentation.model';
import {AqlResultSet} from '../../../shared/models/result-set.model';
import {TabService} from '../../../core/tab.service';
import {MonacoService} from '../../monaco/monaco.service';
import {StorageService} from '../../../core/storage.service';

@Injectable()
export class CompactTablePresentationService extends TablePresentationService {

  compactHeaders: Map<string, TableNode[]>;

  globalExclusions = [
    '@class', 'name', 'uid',
    'rm_version', 'archetype_node_id',
    'language', 'territory',
    'category', 'composer', 'context',
    'value', 'subject', 'encoding',
    'precision', 'type', 'defining_code',
    'origin', 'lower_included', 'upper_included',
    'lower_unbounded', 'upper_unbounded',
    'terminology_id', 'normal_status',
    'action_archetype_id', 'links',
    'ism_transition', 'instruction_id',
    'narrative', 'external_ref', 'mode'
  ];


  constructor(public tabService: TabService,
              public monacoService: MonacoService,
              public aqlBuilderStorageService: StorageService) {
    super(tabService, monacoService, aqlBuilderStorageService);
  }

  sanitizeResultSet(resultSet: AqlResultSet): { tables: Map<string, any> | undefined; rootHeaderNames: string[] | undefined } {
    const {tables, rootHeaderNames} = super.sanitizeResultSet(resultSet);

    this.compactHeaders = new Map<string, TableNode[]>();

    if (tables) {
      tables.forEach((dataSet, tableName) => {
        this.compactViewPresentationData(dataSet, tableName, Object.keys(dataSet));
      });
    }


    return {tables, rootHeaderNames};

  }

  includeValue(data: any): boolean {
    return !this.globalExclusions.includes(data) || data === 'value';
  }

  getPresentationData(tableName: string): TableNode[] {
    return this.tablePresentationStructure.get(tableName);
  }

  getHeaderPresentation(tableName: string): TableNode[] {
    return this.compactHeaders.get(tableName);
  }

  private compactViewPresentationData(results: any, tableName: string, tableNames: string[]) {
    this.parseResultValues(results, tableName, tableNames, this.includePresentation);

    this.tablePresentationStructure.get(tableName).forEach(tablePresentation => {
      const tableTreeRootNode = this.prepareCompactHeaders(tablePresentation);

      this.setNumberOfLeafs(tableTreeRootNode);

      if (this.compactHeaders.has(tableName)) {
        this.compactHeaders.get(tableName).push(tableTreeRootNode);
      } else {
        this.compactHeaders.set(tableName, [tableTreeRootNode]);
      }
    });
  }

  private prepareCompactHeaders(data: TableNode) {
    const compactTables = [];
    const rootNode = new TableNode(data.name);
    rootNode.archetype_node_id = data.archetype_node_id;
    compactTables.push(rootNode);

    if (data.children) {
      rootNode.children = [];
      data.children.forEach(child => {
        this.prepareCompactHeaderChildren(child, rootNode);
      });
    }


    return rootNode;
  }

  private prepareCompactHeaderChildren(data: TableNode, previousNode = data): TableNode {
    if (data.children) {
      const depth = data.children.reduce((acc, ch) => {
        acc += ch.numOfLeafs;
        return acc;
      }, 0);
      const isValueWithoutValueObject = (depth === data.children.length && data.name !== 'value') && !data.class;
      if ((data.class || isValueWithoutValueObject) && data.name !== previousNode.name) {
        previousNode = this.addNewTableNode(data, previousNode);
      }
      data.children.forEach(child => {
        if (child.class && previousNode.name !== child.name) {
          const t = this.addNewTableNode(child, previousNode, data);
          this.prepareCompactHeaderChildren(child, t);
        } else {
          this.prepareCompactHeaderChildren(child, previousNode);
        }
      });
    } else {
      if (previousNode.name !== data.name) {
        this.addNewTableNode(data, previousNode);
      }
    }

    return previousNode;
  }

  private addNewTableNode(data: TableNode, previousNode: TableNode, parent = previousNode): TableNode {
    const tableNode = new TableNode(data.name);
    tableNode.parent = parent;
    tableNode['path'] = data['path'];
    tableNode.archetype_node_id = data.archetype_node_id;

    if (previousNode.children) {
      previousNode.children.push(tableNode);
    } else {
      previousNode.children = [tableNode];
    }

    return tableNode;
  }

  private includePresentation(key: string, result: any) {
    let excluded = this.globalExclusions.includes(key);

    /**
     * Names are hidden globally, but here is an exception,
     * where names should be shown anyways (composer, other_participations,...)
     */
    if (key === 'name' && result[key] && !(result[key] instanceof Object)) {
      excluded = false;
    }

    const isValueWithoutUnit = key === 'value' && result[key] instanceof Object && (!Object.keys(result[key]).includes('units'));
    const hasUnits = result[key] instanceof Object && Object.keys(result[key]).includes('units');

    // i.e. interval has object { magnitude: .., unit: .., normal_range:... } and should be included
    const isNotOnlyValueUnitObject = hasUnits && Object.keys(result[key]).filter(k => !this.globalExclusions.includes(k)).length - 2 > 0;

    const isQuantity = key !== 'value' && !(result[key] instanceof Object) && (key === 'units' || key === 'magnitude');

    return !isQuantity && (!excluded || ((isValueWithoutUnit || isNotOnlyValueUnitObject) && !Object.keys(result[key]).includes('value')));
  }
}
