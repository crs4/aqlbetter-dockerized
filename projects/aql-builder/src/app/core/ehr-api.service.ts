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
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Template, TemplateID, TemplateIDList} from '../shared/models/template/template.model';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {EhrView, EhrViewType} from '../shared/models/ehr-view.model';
import {AqlResultSet} from '../shared/models/result-set.model';
import {AppContextService} from './app-context.service';

@Injectable({
  providedIn: 'root'
})
export class EhrApiService {

  constructor(private appContextService: AppContextService,
              private http: HttpClient) {
  }

  getTemplateIDs(): Observable<TemplateID[]> {
    return this.http.get<TemplateIDList>(`${this.getApiUrl()}/template`, {headers: this.getHeaders()})
      .pipe(
        map(item => item ? item.templates : []),
        catchError(() => {
          return of([]);
        })
      );
  }

  getTemplate(templateId: string): Observable<Template> {
    return this.http.get<Template>(`${this.getApiUrl()}/template/${encodeURIComponent(templateId)}`)
      .pipe(
        map(template => {
          this.addParents(template.webTemplate.tree);
          return template;
        })
      );
  }

  getWebTemplate(templateId: string): Observable<Template> {
    return this.http.get<Template>(`${this.getApiUrl()}/template/${encodeURIComponent(templateId)}`, {headers: this.getHeaders()});
  }

  deleteTemplate(templateId: string): Observable<any> {
    return this.http.delete(`${this.getAdminApiUrl()}/templates/${templateId}`, {headers: this.getHeaders()});
  }

  importTemplate(payload: File): Observable<Template> {
    return this.http.post<Template>(`${this.getApiUrl()}/template/`, payload, {headers: this.getHeaders()});
  }

  getViews(allowedFormats = [EhrViewType.JSON_AQL, EhrViewType.JS]): Observable<any[]> {

    return this.http.get<any[]>(`${this.getAdminApiUrl()}/views`).pipe(
      map(view => view && view.filter(v => allowedFormats.includes(v?.steps?.[0]?.processorName))),
      switchMap((data) => data ? of(data) : of([]))
    );
  }

  getView(name: string): Observable<any> {
    return this.http.get<any[]>(`${this.getAdminApiUrl()}/views/${name}`);
  }

  saveView(payload: EhrView): Observable<any> {
    const body: any = Object.assign({}, payload);
    // Convert steps from object to array -- Remove this once platform drops support for multiple steps in one view
    body.steps = [payload.steps];
    return this.http.post<any>(`${this.getAdminApiUrl()}/views`, body);
  }

  updateView(payload: EhrView): Observable<any> {
    const body: any = Object.assign({}, payload);
    // Convert steps from object to array -- Remove this once platform drops support for multiple steps in one view
    body.steps = [body.steps];
    return this.http.put<any>(`${this.getAdminApiUrl()}/views/${payload.name}`, body);
  }

  deleteView(viewName: string): Observable<any> {
    return this.http.delete(`${this.getAdminApiUrl()}/views/${viewName}`);
  }

  getAqlQueryResultWithParameters(aql: string, params?: Map<string, string | number>): Observable<AqlResultSet> {
    const aqlRequest = {
      aql,
      aqlParameters: params ? this.createAqlParamsObject(params) : {}
    };
    return this.http.post(`${this.getApiUrl()}/query`, aqlRequest)
      .pipe(
        map((resultSet: any) => {
          if (resultSet) {
            return {
              aql: resultSet?.aql || null,
              executedAql: resultSet?.executeAql || null,
              resultSet: resultSet?.resultSet || []
            };
          }

          return {aql: null, executedAql: null, resultSet: []};
        })
      );
  }

  getAqlCsv(aql: string, params?: Map<string, string |number>): Observable<any> {
    const aqlRequest = {
      aql,
      aqlParameters: params ? this.createAqlParamsObject(params) : {}
    };
    return this.http.post(`${this.getApiUrl()}/query/csv`, aqlRequest, {headers: this.getHeaders(), responseType: 'blob' as 'json'});
  }

  getAqlQueryResultWithParametersAsXml(aql: string, params?: Map<string, string |number>): Observable<string> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/xml');
    const aqlRequest = {
      aql,
      aqlParameters: params ? this.createAqlParamsObject(params) : {}
    };
    return this.http.post(`${this.getApiUrl()}/query`, aqlRequest, {headers, responseType: 'text'});
  }

  getArchetypes(archetypes: string[]): Promise<any> {
    return this.http.get<any>(`${this.getApiUrl()}/archetype/flat?type=${archetypes.join('&type=')}`).toPromise();
  }

  getArchetypeDescription(archetypeId: string): Promise<any> {
    return this.http.get<any>(`${this.getApiUrl()}/archetype/flat/${archetypeId}?includeTemplates=true`).toPromise();
  }

  private createAqlParamsObject(params: Map<string, string | number>): any {
    const paramsObj = {};
    Array.from(params.keys()).forEach(k => {
      paramsObj[k] = params.get(k);
    });

    return paramsObj;
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('Expires', 'Mon, 01 Jan 1990 00:00:00 GMT');
    headers = headers.append('Cache-Control', 'no-cache');
    headers = headers.append('Pragma', 'no-cache');
    return headers;
  }

  getApiUrl(): string {
    return this.appContextService.getRestUrl();
  }

  private getAdminApiUrl(): string {
    return this.appContextService.getAdminRestUrl();
  }

  private addParents(tree: any): any {
    tree.children.forEach(child => {
      child.parentModel = tree;
      if (child.children) {
        this.addParents(child);
      }
    });
  }
}
