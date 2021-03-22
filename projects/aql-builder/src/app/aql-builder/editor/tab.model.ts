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

import {AqlResultSet} from '../../shared/models/result-set.model';
import {EditorData} from './editor-data.model';
import {EhrView} from '../../shared/models/ehr-view.model';
import {CommonUtil} from '../../shared/common.util';

export class Tab {
  id: string;
  name: string;
  type: TabType;
  result: AqlResultSet;
  editor: EditorData;
  unsaved: boolean;
  view?: EhrView;
  timestamp: Date;
  initialChange: boolean;
  executionDetails: ExecutionDetails;
  queryIsValid: boolean;
  errorMessage: string;

  constructor(type: TabType,
              editor?: EditorData,
              name?: string) {
    this.id = CommonUtil.getUUID();
    this.name = name;
    this.type = type;
    this.unsaved = false;
    this.editor = editor ? editor : new EditorData();
    this.initialChange = true;
    this.timestamp = new Date();
  }
}

export class ExecutionDetails {
  executionTime?: number;
  queryTime?: number;
  numOfRows?: number;
}


export enum TabType {
  VIEW,
  SNIPPET,
  NEW_QUERY
}
