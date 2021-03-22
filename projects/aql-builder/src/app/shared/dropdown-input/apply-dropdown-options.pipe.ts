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
import {DropdownItem, DropdownOptions} from './dropdown.model';

@Pipe({
  name: 'applyDropdownOptions'
})
export class ApplyDropdownOptionsPipe implements PipeTransform {

  transform(value: DropdownItem<any>|DropdownItem<any>[], options?: DropdownOptions) {
    if (!value) {
      return null;
    }

    if (Array.isArray(value)) {
      return value.map(item => this.applyOptions(item, options));
    }

    return this.applyOptions(value, options);
  }

  applyOptions(item: DropdownItem<any>, options?: DropdownOptions): DropdownItem<any> {
    if (!item.hasOwnProperty('label')) {
      item.label = item.value;
    }

    if (options && options.translatePrefix) {
      item.label = this.addPrefix(item.label, options.translatePrefix);
    }

    if (options && options.uppercase) {
      item.label = item.label.toUpperCase();
    }

    return item;
  }

  addPrefix(label: string, prefix: string): string {
    if (!label.match(prefix)) {
      return prefix + '.' + label;
    }
    return label;
  }
}
