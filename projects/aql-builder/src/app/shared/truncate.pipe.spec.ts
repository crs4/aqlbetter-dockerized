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

import {TruncatePipe} from './truncate.pipe';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;
  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return original string', () => {
    expect(pipe.transform('This is short test string', 25)).toBe('This is short test string');
  });

  it('should return truncated string', () => {
    expect(pipe.transform('This is very long test string', 25)).toBe('This is very long test ...');
  });
});
