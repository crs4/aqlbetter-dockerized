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
export class DetailedTablePresentationService extends TablePresentationService {

  constructor(public tabService: TabService,
              public monacoService: MonacoService,
              public aqlBuilderStorageService: StorageService) {
    super(tabService, monacoService, aqlBuilderStorageService);
  }

  sanitizeResultSet(resultSet: AqlResultSet): { tables: Map<string, any> | undefined; rootHeaderNames: string[] | undefined } {
    const {tables, rootHeaderNames} = super.sanitizeResultSet(resultSet);

    if (tables) {
      tables.forEach((dataSet, tableName) => {
        this.parseResultValues(dataSet, tableName, Object.keys(dataSet));
      });
    }


    return {tables, rootHeaderNames};
  }

  includeValue(): boolean {
   return true;
  }

  getPresentationData(tableName: string): TableNode[] {
    return this.tablePresentationStructure.get(tableName);
  }

  getHeaderPresentation(tableName: string): TableNode[] {
    return this.tablePresentationStructure.get(tableName);
  }

}
