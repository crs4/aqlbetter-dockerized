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

import { DateToTodayPipe } from './date-to-today.pipe';

const today = new Date().toString();
const notToday = new Date('2000/01/01').toString();

describe('DateToTodayPipe', () => {
  it('create an instance', () => {
    const pipe = new DateToTodayPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return "today"', () => {
    const pipe = new DateToTodayPipe();
    expect(pipe.transform(today)).toBe('today');
  });

  it('input should equal the output', () => {
    const pipe = new DateToTodayPipe();
    expect(pipe.transform(notToday)).toEqual(notToday);
  });
});
