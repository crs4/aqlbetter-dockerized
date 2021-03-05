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

import { Pipe, PipeTransform } from '@angular/core';
import {TreeNode} from '../../shared/models';
import {TranslateService} from '@ngx-translate/core';

@Pipe({
  name: 'aqlTreeItemTitle'
})
export class AqlTreeItemTitlePipe implements PipeTransform {

  constructor(private translateService: TranslateService) {
  }

  transform(node: TreeNode): string {
    let title = '';
    const field = this.translateService.instant('ITEM_TITLES.FIELD_TYPE');
    const cardinality = this.translateService.instant('ITEM_TITLES.CARDINALITY');

    if (typeof node.rmType === 'string') {
      title += `${field}: ${node.rmType}\n${cardinality}: ${node.min}...${node.max >= 0 ? node.max : '*'}`;
    } else {
      title += node.name || node.id;
    }
    return title;
  }
}
