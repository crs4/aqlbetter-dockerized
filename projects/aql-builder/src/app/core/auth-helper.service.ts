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
import {AppContextService} from './app-context.service';
import {HttpBackend, HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {

  constructor(private appContextService: AppContextService, private httpBackend: HttpBackend) {
  }

  getRefreshPayload(): string {
    const grant_type = 'refresh_token';
    const {client_id} = environment.auth;
    const refresh_token = this.appContextService.getRefreshToken();
    return this.createUrlEncodedBody({grant_type, client_id, refresh_token});
  }

  createUrlEncodedBody(dataObj: Object): string {
    const keyValues = Object.entries(dataObj).map(([key, value]) => `${key}=${value}`);
    return `${keyValues.join('&')}`;
  }

  getUrlEncodedHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    return headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  getHttpClient(): HttpClient {
    return new HttpClient(this.httpBackend);
  }
}
