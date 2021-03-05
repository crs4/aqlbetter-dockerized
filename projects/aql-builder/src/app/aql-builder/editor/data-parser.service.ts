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
import {TreeNode} from '../../shared';
import {TemplatePresentation} from './sidebar-content-panel/template-presentation.enum';

@Injectable({
  providedIn: 'root'
})
export class DataParserService {

  readonly detailedViewKeys = [
    'normal_status',
    'magnitude_status',
    'accuracy',
    'feeder_audit',
    'subject',
    'queryable',
    'modifiable',
    'hyperlink',
    'formatting',
    'language',
    'encoding',
    'composer',
    'rm_version',
    'preceding_version_uid',
    'other_input_version_uids',
    'signature',
    'trunk_lifecycle_state'
  ];

  constructor() { }

  parseStaticObject(object: any, parent: TreeNode, presentation: TemplatePresentation) {
    parent.children = Object.keys(object)
      .filter(key => object[key] instanceof Object)
      .filter(key => {
        if (presentation === TemplatePresentation.MIN) {
          return !this.detailedViewKeys.includes(key);
        }

        return true;
      })
      .map(key => {
        const treeNodeChild = new TreeNode();
        treeNodeChild.name = key;
        treeNodeChild.rmType = object[key].rmType || undefined;

        return treeNodeChild;
      });
    parent.children.forEach(child => {
      child.formId = `${parent.formId || parent.name.toLowerCase()}/${child.name.toLowerCase()}`;
      this.parseStaticObject(object[child.name], child, presentation);
    });
  }
}
