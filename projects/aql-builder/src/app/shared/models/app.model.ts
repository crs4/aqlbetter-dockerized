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

export interface AuthContext {
  type: AuthType;
  authorizationUrl?: string;
  client_id?: string;
  grant_type?: GrantType;
}

export enum GrantType {
  password = 'password',
  clientSecret = 'client_secret'
}

export enum AuthType {
  BASIC = 'BASIC',
  OAUTH = 'OAUTH'
}

export enum StorageKey {
  AQL_BUILDER = '_AQL_BUILDER',
  AQL_CONTEXT = '_AQL_BUILDER_CONTEXT',
}

export class ToastContent {
  constructor(public body: string,
              public title: string = '') {
  }
}
