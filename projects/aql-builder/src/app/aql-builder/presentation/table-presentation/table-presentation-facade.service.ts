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
import {DetailedTablePresentationService} from './detailed-table-presentation.service';
import {CompactTablePresentationService} from './compact-table-presentation.service';
import {TablePresentation} from './table-presentation.enum';
import {TableNode} from './table-presentation.model';

@Injectable()
export class TablePresentationFacadeService {

  constructor(private detailedTablePresentationService: DetailedTablePresentationService,
              private compactTablePresentationService: CompactTablePresentationService) {

  }

  getTables(tablePresentation: TablePresentation): Map<string, any> {
    if (tablePresentation === TablePresentation.DETAILED) {
      return this.detailedTablePresentationService.tables;
    } else {
      return this.compactTablePresentationService.tables;
    }
  }

  getRootHeaderNames(tablePresentation: TablePresentation): string[] {
    if (tablePresentation === TablePresentation.DETAILED) {
      return this.detailedTablePresentationService.rootTableNames;
    } else {
      return this.compactTablePresentationService.rootTableNames;
    }
  }

  sanitizeResultSet(data: any, tablePresentation: TablePresentation): {tables: Map<string, any>, rootHeaderNames: string[]} {
    if (tablePresentation === TablePresentation.DETAILED) {
      return this.detailedTablePresentationService.sanitizeResultSet(data);
    } else {
      return this.compactTablePresentationService.sanitizeResultSet(data);
    }
  }

  getPresentationData(tableName: string, tablePresentation: TablePresentation): TableNode[] {
    if (tablePresentation === TablePresentation.DETAILED) {
      return this.detailedTablePresentationService.getPresentationData(tableName);
    } else {
      return this.compactTablePresentationService.getPresentationData(tableName);
    }
  }

  getHeaderPresentation(tableName: string, tablePresentation: TablePresentation): TableNode[] {
    if (tablePresentation === TablePresentation.DETAILED) {
      return this.detailedTablePresentationService.getHeaderPresentation(tableName);
    } else {
      return this.compactTablePresentationService.getHeaderPresentation(tableName);
    }
  }

  getTableNodeName(data: any, tablePresentation: TablePresentation): string {
    if (tablePresentation === TablePresentation.DETAILED) {
      return this.detailedTablePresentationService.getTableNodeName(data);
    } else {
      return this.compactTablePresentationService.getTableNodeName(data);
    }
  }

  includeValue(data: string, tablePresentation: TablePresentation): boolean {
    if (tablePresentation === TablePresentation.DETAILED) {
      return this.detailedTablePresentationService.includeValue();
    } else {
      return this.compactTablePresentationService.includeValue(data);
    }
  }


}
