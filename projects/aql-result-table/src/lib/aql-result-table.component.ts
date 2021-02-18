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

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { TableContent, TableModel, TableRow } from './models/table.model';
import { TableNode } from './models/table-presentation.model';
import { Subject } from 'rxjs';
import { TablePresentationFacadeService } from './table-presentation-facade.service';
import { TablePresentationService } from './table-presentation.service';
import { takeUntil } from 'rxjs/operators';
import { TablePresentation } from './enums/table-presentation.enum';
import { AqlResultMetadata } from './models/aql-metadata.model';

@Component({
  selector: 'bui-aql-result-table',
  templateUrl: 'aql-result-table.component.html',
  styleUrls: ['aql-result-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AqlResultTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() aqlResultMetadata: AqlResultMetadata | null;
  @Input() tablePresentation = TablePresentation.COMPACT;

  @ViewChild('tablesWrapper', { static: true }) tablesWrapper: ElementRef;
  noDataAvailable = false;
  TablePresentation = TablePresentation;
  tables: TableModel[];
  pageSize = 15;

  private paths = new Map<string, string>();

  /**
   * Keys that represents final values of fields
   */
  private valueLeafs = ['value', 'magnitude', 'numerator', 'denominator'];

  private presentationData: TableNode[];
  private renderedHeaderRows = new Map<number, TableNode>();
  private renderedBodyRows = new Map<number, boolean>();
  private tableHeaderDepth = new Map<string, number>();
  private maxHeaderDepth = 0;
  private unsubscribe: Subject<void> = new Subject<void>();


  constructor(private tablePresentationFacadeService: TablePresentationFacadeService,
              private renderer: Renderer2,
              private tablePresentationService: TablePresentationService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.tablePresentationService.selectedTablePresentation$
      .pipe(
        takeUntil(this.unsubscribe),
      ).subscribe((presentation: TablePresentation) => {
        if (this.tablePresentation === presentation) {
          return;
        }

        this.tablePresentation = presentation;
        if (this.aqlResultMetadata && this.aqlResultMetadata?.resultSet?.length) {
          this.toggleView();
          setTimeout(() => {
            this.stickyHeaders();
          }, 200);
        }
        this.cd.markForCheck();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.noDataAvailable = this.aqlResultMetadata && !this.aqlResultMetadata.resultSet.length;

    if (this.aqlResultMetadata && this.aqlResultMetadata.resultSet.length) {
      this.paths = new Map<string, string>();
      this.prepareAndRenderData();
      if (this.tablesWrapper) {
        this.tablesWrapper.nativeElement.scrollTo(0, 0);
      }

      setTimeout(() => {
        this.stickyHeaders();
      }, 200);
    } else {
      this.tables = [];
    }
  }

  toggleView(): void {
    this.paths = new Map<string, string>();
    this.prepareAndRenderData();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private prepareAndRenderData(): void {
    const {tables, rootHeaderNames} = this.tablePresentationFacadeService.sanitizeResultSet(this.aqlResultMetadata, this.tablePresentation);
    if (!tables) {
      // no data available - return
      this.noDataAvailable = true;
      return;
    }

    this.tables = [];
    tables.forEach((dataSet, tableName) => {
      const headerPresentation = this.tablePresentationFacadeService.getHeaderPresentation(tableName, this.tablePresentation);
      this.maxHeaderDepth = 0;
      this.setMaxHeaderDepth(headerPresentation);

      this.presentationData = this.tablePresentationFacadeService.getPresentationData(tableName, this.tablePresentation);

      const tableModel = new TableModel();

      this.renderTable(dataSet, rootHeaderNames, tableName, tableModel);
      this.tables.push(tableModel);
    });
  }

  private renderTable(data: any, rootHeaderNames: string[], tableName: string, tableModel: TableModel): void {
    this.renderedHeaderRows = new Map<number, TableNode>();
    this.renderedBodyRows = new Map<number, boolean>();

    this.renderTableHeaders(rootHeaderNames, tableName, tableModel);
    this.renderTableBody(data, tableModel);
  }

  private renderTableHeaders(rootHeaderNames: string[], tableName: string, tableModel: TableModel): void {
    const tableRowModel = new TableRow();
    tableModel.headers = [tableRowModel];

    const tableHeadersPresentation = this.tablePresentationFacadeService.getHeaderPresentation(tableName, this.tablePresentation);

    tableHeadersPresentation.forEach((tree, index) => {
      const allColsSum = tree.children ? tree.children.reduce((accumulator, child) => {
        if (child.numOfLeafs === 0) {
          return accumulator + 1;
        }

        return accumulator + child.numOfLeafs;
      }, 0) : 0;
      const tableContentModel = new TableContent();
      tableContentModel.value = {text: rootHeaderNames[index], class: 'sticky'};
      tableContentModel.classes.push('text-left');
      tableContentModel.attributes.colspan = `${allColsSum}`;
      tableContentModel.attributes.path = this.getKeyForPath(tree);

      if (!tree.children || (tree.children && !tree.children.length)) {
        tableContentModel.attributes.rowspan = `${this.maxHeaderDepth}`;
      }

      if (index === 0) {
        const tableContentModelNum = new TableContent();
        tableContentModelNum.value = {text: '#'};
        tableContentModelNum.classes.push('text-center');
        tableContentModelNum.attributes.rowspan = `${this.maxHeaderDepth}`;
        if (tableRowModel.content) {
          tableRowModel.content.push(tableContentModelNum);
        } else {
          tableRowModel.content = [tableContentModelNum];
        }
      }

      if (tableRowModel.content) {
        tableRowModel.content.push(tableContentModel);
      } else {
        tableRowModel.content = [tableContentModel];
      }

      this.addHeader(tree.children, this.tableHeaderDepth.get(tree.name), 1, tableModel);
    });
  }

  private renderTableBody(data: any, tableModel: TableModel): void {
    let rowIndex = 1;
    Object.keys(data).forEach((k, i) => {
      data[k].forEach((result, index) => {
        let tableRow;
        if (!this.renderedBodyRows.has(index)) {
          tableRow = new TableRow();
          const rowContentModel = new TableContent();
          if (result && !result.empty || !result) {
            rowContentModel.value = {text: `${rowIndex}`};
            rowIndex++;
          }
          if (tableRow.content) {
            tableRow.content.push(rowContentModel);
          } else {
            tableRow.content = [rowContentModel];
          }
          tableModel.body.push(tableRow);
          this.renderedBodyRows.set(index, true);
        } else {
          tableRow = tableModel.body[index];
        }

        if (this.presentationData.length > 1) {
          const values = this.presentationData[i].children || [this.presentationData[i]];
          const resultData = result && JSON.parse(JSON.stringify(result));
          this.addValues(values, resultData, tableRow);
        } else {
          const values = this.presentationData[0].children ? this.presentationData[0].children : [this.presentationData[0]];
          this.addValues(values, JSON.parse(JSON.stringify(result)), tableRow);
        }
      });
    });
  }

  private addHeader(children: TableNode[], maxDepth: number, depth = 0, tableModel: TableModel): void {
    if (depth <= maxDepth) {
      this.addHeaderRow(children, depth, depth, tableModel);
      this.addHeader(children, maxDepth, depth + 1, tableModel);
    }
  }

  private addHeaderRow(children: TableNode[], depth: number = 0, initialDepth = depth, tableModel: TableModel): void {
    if (!children) {
      return;
    }

    for (const child of children) {
      if (depth === 1) {
        let tableRow: TableRow;
        if (this.shouldRenderNewRow(initialDepth, child)) {
          tableRow = new TableRow();
          tableModel.headers.push(tableRow);
        } else {
          tableRow = tableModel.headers[initialDepth];
        }

        const tableContentModel = new TableContent();
        tableContentModel.classes.push('text-left');

        if (child.parent) {
          tableContentModel.attributes.path = this.getKeyForPath(child);
        }

        if (this.tablePresentation === TablePresentation.DETAILED && child.parent) {
          this.paths.set(this.getKeyForPath(child), child.path);
        }

        const numOfLeafs = child.numOfLeafs || 1;
        tableContentModel.attributes.colspan = `${numOfLeafs}`;
        tableContentModel.attributes.nowrap = 'true';


        tableContentModel.value = {text: `${child.name}`, class: 'sticky'};

        if (!child.children) {
          tableContentModel.attributes.rowspan = `${this.maxHeaderDepth - numOfLeafs}`;
        }

        if (tableRow.content) {
          tableRow.content.push(tableContentModel);
        } else {
          tableRow.content = [tableContentModel];
        }
      } else {
        this.addHeaderRow(child.children, depth - 1, initialDepth, tableModel);
      }
    }
  }

  private addValues(values: TableNode[], data: any, tableRowModel: TableRow, lastHeader?: TableNode): void {

    if (!values) {
      const rowContentModel = new TableContent();
      let value = data && this.getValue(data.value, lastHeader);
      if (data && data.value != null) {
        const valuePropertyExists = Object.keys(data).includes('value');
        let val = data.value;
        if (!valuePropertyExists) {
          val = data.name;
        }
        value = data && this.getValue(val, lastHeader);
      } else if (this.isQuantity(data)) {
        value = this.getValue(data, lastHeader);
      }

      if (value != null) {
        rowContentModel.value = {text: value};
        rowContentModel.attributes.nowrap = 'true';
      }
      if (tableRowModel.content) {
        tableRowModel.content.push(rowContentModel);
      } else {
        tableRowModel.content = [rowContentModel];
      }
      return;
    }

    values.forEach(ch => {
      if (data == null) {
        if (!ch.children) {
          const rowContentModel = new TableContent();
          if (tableRowModel.content) {
            tableRowModel.content.push(rowContentModel);
          } else {
            tableRowModel.content = [rowContentModel];
          }
        } else {
          this.addValues(ch.children, undefined, tableRowModel, ch);
        }
        return;
      }

      /**
       * Names are hidden globally in compact table presentation, but here is an exception,
       * where names should be shown anyways (composer, other_participations,...)
       */
      const isCompactPresentation = this.tablePresentation === TablePresentation.COMPACT;
      const renderEmptyNameNode = ch.name === 'name' && data[ch.name] instanceof Object && isCompactPresentation;
      if (renderEmptyNameNode) {
        const rowContentModel = new TableContent();
        rowContentModel.value = {text: ''};
        rowContentModel.attributes.nowrap = 'true';
        if (tableRowModel.content) {
          tableRowModel.content.push(rowContentModel);
        } else {
          tableRowModel.content = [rowContentModel];
        }

        // if object key is used once to get the value, ensure it won't be used again
        if (this.getValue(data[ch.name], ch)) {
          delete data[ch.name];
        }
      } else if (data[ch.name] instanceof Object) {
        this.addValues(ch.children, data[ch.name], tableRowModel, ch);
      } else if (data instanceof Object && data[ch.name] == null) {
        if (Array.isArray(data)) {
          const relevantData = data.find(d => {
            const tableNodeName = d && this.tablePresentationFacadeService.getTableNodeName(d, this.tablePresentation);
            return tableNodeName && tableNodeName.includes(ch.name);
          });
          this.addValues(ch.children, relevantData, tableRowModel, ch);
        } else {
          this.addValues(ch.children, data, tableRowModel, ch);
        }
      } else {
        const rowContentModel = new TableContent();
        const text = data instanceof Object ? this.getValue(data[ch.name], ch) : data;

        rowContentModel.value = {text};
        rowContentModel.attributes.nowrap = 'true';
        if (tableRowModel.content) {
          tableRowModel.content.push(rowContentModel);
        } else {
          tableRowModel.content = [rowContentModel];
        }

        // if object key is used once to get the value, ensure it won't be used again
        if (this.getValue(data[ch.name], ch) && typeof data === 'object') {
          delete data[ch.name];
        }
      }
    });

  }

  private shouldRenderNewRow(depth: number, node: TableNode): boolean {
    if (this.renderedHeaderRows.has(depth)) {
      return false;
    } else {
      this.renderedHeaderRows.set(depth, node);
      return true;
    }
  }

  private getValue(value: any, lastHeader?: TableNode): string {
    if (value instanceof Object) {
      const kv = Object.keys(value)
        .filter(k => {
          const valueIncluded = this.tablePresentationFacadeService.includeValue(k, this.tablePresentation);
          return !k.startsWith('@') && valueIncluded;
        });
      let val = '';
      kv.forEach(k => {
        if (lastHeader && !lastHeader.children) {
          if (this.valueLeafs.some(vl => vl === k)) {
            this.paths.set(this.getKeyForPath(lastHeader), lastHeader.path + `/${k}`);
          } else if (!this.paths.has(this.getKeyForPath(lastHeader))) {
            this.paths.set(this.getKeyForPath(lastHeader), lastHeader.path);
          }
        } else if (k !== 'units' && lastHeader && !lastHeader.path.endsWith(k)
          && !lastHeader.path.endsWith('value') && this.tablePresentation === TablePresentation.COMPACT) {
          lastHeader.path += `/value/${k}`;
          this.paths.set(this.getKeyForPath(lastHeader), lastHeader.path);
        }
        val = val + ' ' + this.getValue(value[k], lastHeader);
      });
      return val;
    } else {
      if (lastHeader && !lastHeader.children) {
        if (!this.paths.has(this.getKeyForPath(lastHeader))) {
          if (this.shouldAddValueOnPath(lastHeader)) {
            this.paths.set(this.getKeyForPath(lastHeader), lastHeader.path + '/value');
          } else {
            this.paths.set(this.getKeyForPath(lastHeader), lastHeader.path);
          }
        }
      } else if (lastHeader && this.shouldAddValueOnPath(lastHeader)) {
        lastHeader.path += `/value`;
        this.paths.set(this.getKeyForPath(lastHeader), lastHeader.path);
      }
      return value;
    }
  }

  private depthExists(children: TableNode[], depth: number = 0): boolean {
    let depthExists = false;
    if (!children) {
      return false;
    }

    for (const child of children) {
      if (depth > 0) {
        depthExists = depthExists || this.depthExists(child.children, depth - 1);
        if (depthExists) {
          return true;
        }
      } else {
        return true;
      }
    }


    return false;
  }

  private getMaxDepth(children: TableNode[], depth: number = 0): number {
    const exists = this.depthExists(children, depth);
    if (exists) {
      return this.getMaxDepth(children, depth + 1);
    } else {
      return depth;
    }
  }

  private setMaxHeaderDepth(presentationData: TableNode[]): void {

    presentationData.forEach(tree => {
      const maxTreeDepth = this.getMaxDepth(tree.children, 0);
      this.tableHeaderDepth.set(tree.name, maxTreeDepth);
      if (this.maxHeaderDepth < maxTreeDepth) {
        this.maxHeaderDepth = maxTreeDepth + 1;
      }
    });

  }

  private isQuantity(data: any): boolean {
    return data instanceof Object && (Object.keys(data).includes('magnitude') || Object.keys(data).includes('unit'));
  }

  private getKeyForPath(node: TableNode): string {
    if (node.parent) {
      return node.name + '_' + this.getKeyForPath(node.parent);
    } else {
      return node.name;
    }
  }

  private shouldAddValueOnPath(lastHeader: TableNode): boolean {
    const isCompactPresentation = this.tablePresentation === TablePresentation.COMPACT;
    return !this.valueLeafs.some(l => lastHeader.path && lastHeader.path.endsWith(l)) && isCompactPresentation;
  }

  private stickyHeaders(): void {
    const tableHeaders = document.querySelectorAll('table thead');

    // tslint:disable-next-line:prefer-for-of
    for (let headerIndex = 0; headerIndex < tableHeaders.length; headerIndex++) {
      const trs = tableHeaders[headerIndex].querySelectorAll('tr');
      for (let rowIndex = 0; rowIndex < trs.length; rowIndex++) {
        const tr = trs[rowIndex];
        this.appendTopStyleOnRows(trs, tr, rowIndex);
      }
    }
  }

  private appendTopStyleOnRows(tableRows: NodeListOf<HTMLTableRowElement>, tableRow: HTMLTableRowElement, index: number): void {
    if (tableRows[index - 1]) {
      const ths = tableRow.querySelectorAll('th');
      ths.forEach(th => {
        const thHeight = 30;
        this.renderer.setStyle(th, 'top', (index * thHeight) + 'px');
      });
    }
  }

}
