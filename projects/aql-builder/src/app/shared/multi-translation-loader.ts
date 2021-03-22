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

import {TranslateLoader} from '@ngx-translate/core';
import {forkJoin, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {merge} from 'lodash-es';

export class MultiTranslationLoader implements TranslateLoader {

  constructor(private http: HttpClient, private resources: TranslationResource[]) { }

  getTranslation(lang: string): Observable<any> {
    const requests = this.resources.map((resource: TranslationResource) => {
      if (!resource.suffix) {
        resource.suffix = '.json';
      }
      const path = resource.prefix + lang + resource.suffix;
      return this.http.get(path)
        .pipe(catchError(() => of({})));
    });

    return forkJoin(requests).pipe(map((response: Array<Record<string, string>>) => {
      const r = {};
      response.forEach( obj => merge(r, obj));
      return r;
    }));
  }
}

export interface TranslationResource {
  prefix: string;
  suffix?: string;
}
