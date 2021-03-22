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

import { ApplyDropdownOptionsPipe } from './apply-dropdown-options.pipe';
import {DropdownItem} from './dropdown.model';
import { cloneDeep } from 'lodash';

describe('ApplyDropdownOptionsPipe', () => {
  it('create an instance', () => {
    const pipe = new ApplyDropdownOptionsPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return null', () => {
    const pipe = new ApplyDropdownOptionsPipe();
    const nullValue = pipe.transform(null, null);

    expect(nullValue).toBeNull();
  });

  it('should add label', () => {
    const pipe = new ApplyDropdownOptionsPipe();
    const items = pipe.transform(cloneDeep(dropdownItems), null);

    expect(items[0].label).toBeTruthy();
    expect(items[0].label).toEqual('s');
  });

  it ('should add translate prefix', () => {
    const pipe = new ApplyDropdownOptionsPipe();
    const items = pipe.transform(cloneDeep(dropdownItems), {translatePrefix: 'TEST1'});

    expect(items[2].label).toEqual('TEST1.l');
  });

  it('should return uppercase string', () => {
    const pipe = new ApplyDropdownOptionsPipe();
    const items = pipe.transform(cloneDeep(dropdownItems), {translatePrefix: 'TEST2', uppercase: true});

    expect(items[0].label).toEqual('TEST2.S');
    expect(items[1].label).toEqual('TEST2.M');
  });
});

const dropdownItems: DropdownItem<any>[] = [
  {value: 's'},
  {value: 'm'},
  {value: 'l'}
];
