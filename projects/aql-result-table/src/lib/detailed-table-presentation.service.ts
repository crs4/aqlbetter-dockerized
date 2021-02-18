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
import { TablePresentationService } from './table-presentation.service';
import { TableNode } from './models/table-presentation.model';
import { AqlResultMetadata } from './models/aql-metadata.model';
import { SanitizedResultSet } from './models/sanitized-result-set.model';

@Injectable({
  providedIn: 'root'
})
export class DetailedTablePresentationService extends TablePresentationService {

  sanitizeResultSet(resultSet: AqlResultMetadata): SanitizedResultSet {
    const {tables, rootHeaderNames} = super.sanitizeResultSet(resultSet);

    if (tables) {
      tables.forEach((dataSet, tableName) => {
        this.parseResultValues(resultSet.executedAql, dataSet, tableName, Object.keys(dataSet));
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
