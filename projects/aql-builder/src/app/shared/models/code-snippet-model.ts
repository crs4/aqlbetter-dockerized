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

/**
 * Code Snippet Models
 */

export class SnippetItem {
  code: string;
  name?: string;

  constructor(code: string, name?: string) {
    this.code = code;
    this.name = name || 'untitled' + Math.floor(Math.random() * 10) + 1  ;
  }
}

export class HistoryItem extends SnippetItem {
  /**
   * Map is not serializable and therefore we store array and convert it to Map later
   */
  params: Array<[string, string | number]>;
  timeStamp: Date;

  constructor(code: string, params: Map<string, string | number>, name?: string) {
    super(code, name);
    this.params = Array.from(params);
    this.timeStamp = new Date();
  }
}
