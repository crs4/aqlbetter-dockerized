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

import { Component } from '@angular/core';
import { resultWithDataMock } from './mocks/result-with-data.mock';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AqlResultMetadata, TablePresentation } from '@bettercare/aql-result-table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo';
  aqlResultMetadata = resultWithDataMock;
  tablePresentation: TablePresentation = TablePresentation.COMPACT;
  TablePresentation = TablePresentation;

  serverConfig = {
    url: undefined, // 'https://MY-EHR-PLATFORM/rest/v1/query',
    username: undefined, // 'MY_USERNAME',
    pwd: undefined, // 'MY_PWD'
  };

  private aqlCode = '';

  constructor(private httpClient: HttpClient) {
  }

  togglePresentation(presentation: TablePresentation): void {
    this.tablePresentation = presentation;
  }

  runQuery(): void {
    if (!!this.aqlCode) {
      const basicAuthToken = btoa(`${this.serverConfig.username}:${this.serverConfig.pwd}`);
      let headers = new HttpHeaders();
      headers = headers.append('Authorization', `Basic ${basicAuthToken}`);
      this.httpClient.post<AqlResultMetadata>(this.serverConfig.url, {aql: this.aqlCode, aqlParameters: {}}, {headers})
        .subscribe(aqlResponse => this.aqlResultMetadata = aqlResponse);
    }
  }

  changeAqlCode(value: string): void {
    this.aqlCode = value;
  }
}
