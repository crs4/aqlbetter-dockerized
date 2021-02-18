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

export class TableContent {
  classes?: string[];
  attributes?: {
    rowspan: string,
    colspan: string,
    path: string,
    nowrap: string
  };
  value?: {text: string, class?: string};
  icons?: any[];

  constructor() {
    this.classes = [];
    this.attributes = {
      rowspan: '',
      colspan: '',
      path: '',
      nowrap: 'true'
    };
    this.value = {text: ''};
    this.icons = [];
  }
}

export class TableRow {
  content: TableContent[];
}

export class TableModel {
  headers: TableRow[];
  body: TableRow[];
  page: number;

  constructor() {
    this.headers = [];
    this.body = [];
    this.page = 1;
  }
}
