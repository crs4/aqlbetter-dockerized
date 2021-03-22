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
import {EhrApiService} from '../../../core/ehr-api.service';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import beautify from 'xml-beautifier';
import {MonacoService} from '../../monaco/monaco.service';
import {Tab} from '../../editor/tab.model';

@Injectable()
export class AqlXmlPresentationService {
  private queryResults = new Map<string, string>();
  constructor(private ehrApiService: EhrApiService,
              private monacoService: MonacoService) { }


  getXmlData(tab: Tab): Observable<string> {
    const query = this.monacoService.replaceWithPaths(tab.editor.code);
    const params = tab.editor.aqlParameters;
    const hashKey = query + this.paramsToString(params);
    if (this.queryResults.has(hashKey)) {
      return of(this.queryResults.get(hashKey));
    }
    return this.ehrApiService.getAqlQueryResultWithParametersAsXml(query, params)
      .pipe(
        map(r => beautify(r)),
        tap(r => this.queryResults.set(hashKey, r)),
        catchError(_ => EMPTY)
      );
  }

  private paramsToString(param: Map<string, any>): string {
    return Array.from(param.keys()).reduce((a, b) => `${a}|${b}::${param.get(b)}`, '');
  }
}
