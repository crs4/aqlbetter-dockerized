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

import { getUUID } from '../utils/common.utils';

export class TreeNode {
  id: string;
  name: string;
  localizedName: string;
  localizedNames: {};
  localizedDescriptions: Map<string, string>;
  nodeId: string;
  formId: string;
  min: number;
  max: number;
  aqlPath: string;
  children?: TreeNode[];
  inContext: boolean;
  viewConfig: Record<string, any>;
  rmType?: unknown;
  dragDisabled?: boolean;
  availableTypes?: string[];
  anyFieldParent?: TreeNode;
  parentModel?: TreeNode;
  /* Beautified name - alias. Used in aql-builder editor */
  editorName?: string;
  detailed?: boolean;
  generic?: boolean;

  constructor() {
    this.id = getUUID();
  }
}
