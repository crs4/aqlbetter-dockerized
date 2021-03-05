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
import {TablePresentationFacadeService} from './table-presentation-facade.service';
import {TablePresentation} from './table-presentation.enum';

@Injectable()
export class ExportService {

  /**
   * Flattened header names for table
   */
  tableHeaderNames = new Map<string, string>();

  /**
   * Table data for each row
   */
  tableValues = new Map<string, Map<number, string>>();

  private presentationStructure: TableNode[];

  constructor(private tablePresentationFacadeService: TablePresentationFacadeService) {

  }

  getExportTables(presentation: TablePresentation): string[] {
    const headerNames = this.getFlattenedHeaderNames(presentation);
    const tableValue = this.getValues(presentation);
    const exportTables = [];

    headerNames.forEach((v, k) => {
      let dataCsv = v + '\n';
      const tableData = tableValue.get(k);
      tableData.forEach((value) => {
        dataCsv = dataCsv + value + '\n';
      });

      exportTables.push(dataCsv);
    });

    return exportTables;
  }

  private getFlattenedHeaderNames(presentation: TablePresentation): Map<string, string> {
    const tables = this.tablePresentationFacadeService.getTables(presentation);
    const rootHeaderNames = this.tablePresentationFacadeService.getRootHeaderNames(presentation);
    this.tableHeaderNames = new Map<string, string>();
    let tableIndex = 0;

    tables.forEach((dataSet, tableName) => {
      const headerNames = new Set<string>();
      this.tablePresentationFacadeService.getHeaderPresentation(tableName, presentation).forEach((data, index) => {
        this.flattenHeaderNames(data.children, headerNames, rootHeaderNames[index]);
      });

      this.tableHeaderNames.set(tableName, `"${Array.from(headerNames.values()).join('\",\"')}"`);

      tableIndex += 1;
    });

    return this.tableHeaderNames;
  }

  private getValues(presentation: TablePresentation) {
    this.tableValues = new Map<string, Map<number, string>>();
    this.tablePresentationFacadeService.getTables(presentation).forEach((dataSet, tableName) => {
      this.tableValues.set(tableName, new Map<number, string>());
      this.presentationStructure = this.tablePresentationFacadeService.getPresentationData(tableName, presentation);
      Object.keys(dataSet).forEach(k => {
        dataSet[k].forEach((result, index) => {
          const exportValues = [];
          if (this.presentationStructure.length > 1) {
            this.presentationStructure
              .filter(tree => tree.name.split(':::').some(part => part === k) || tree.name === k || tree.name === result)
              .forEach((tree) => {
                this.addValues(tree.children || [tree], result, exportValues, presentation);
              });
          } else {
            const values = this.presentationStructure[0].children ? this.presentationStructure[0].children : [this.presentationStructure[0]];
            this.addValues(values, result, exportValues, presentation);
          }


          if (this.tableValues.has(tableName) && this.tableValues.get(tableName).has(index)) {
            this.tableValues.get(tableName).set(index, this.tableValues.get(tableName).get(index) + `,"${exportValues.join('\",\"')}"`);
          } else {
            this.tableValues.get(tableName).set(index, `"${exportValues.join('\",\"')}"`);
          }
        });
      });

    });

    return this.tableValues;
  }

  private flattenHeaderNames(headerStructure: TableNode[], headerNames: Set<string>, headerName = '') {
    if (!headerStructure || (headerStructure && !headerStructure.length)) {
      headerNames.add(headerName);
      return;
    }

    headerStructure.forEach(tn => {
      if (tn.children && tn.children.length) {
        this.flattenHeaderNames(tn.children, headerNames, headerName + '/' + tn.name);
      } else {
        headerNames.add(headerName + '/' + tn.name);
      }
    });
  }

  private addValues(values: TableNode[], data: any, exportValues: string[], presentation) {

    if (!values) {
      const value = data && this.getValue(data['value'], presentation);
      if (value) {
        exportValues.push(value);
      } else {
        exportValues.push('');
      }
      return;
    }

    values.forEach(ch => {
      if (!data) {
        if (ch.children) {
          this.addValues(ch.children, undefined, exportValues, presentation);
        } else {
          exportValues.push('');
        }
        return;
      }

      if (data[ch.name] instanceof Object) {
        this.addValues(ch.children, data[ch.name], exportValues, presentation);
      } else if (data instanceof Object && data[ch.name] == null) {
        if (Array.isArray(data)) {
          const relevantData = data.find(d => {
            return this.tablePresentationFacadeService.getTableNodeName(d, presentation) === ch.name;
          });
          this.addValues(ch.children, relevantData, exportValues, presentation);
        } else {
          this.addValues(ch.children, data, exportValues, presentation);
        }
      } else {
        const text = data instanceof Object ? this.getValue(data[ch.name], presentation) : data;
        exportValues.push(text);
      }
    });
  }

  private getValue(value: any, presentation: TablePresentation) {
    if (value instanceof Object) {
      const kv = Object.keys(value)
        .filter(k => !k.startsWith('@') && this.tablePresentationFacadeService.includeValue(k, presentation));
      let val = '';
      kv.forEach(k => {
        val = val + ' ' + this.getValue(value[k], presentation);
      });
      return val;
    } else {
      return value;
    }
  }
}
