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

import { AqlKeyword } from '../../enums/aql-keyword.enum';

export function removeEscapedKeywordsFromSelections(value: string): string {
  const escapedSelections = [
    AqlKeyword.TOP,
    AqlKeyword.COUNT,
    AqlKeyword.SQUASH,
    AqlKeyword.TAGS,
    AqlKeyword.CONCAT
  ];
  let valueResult = value;
  escapedSelections.forEach(keyword => {
    if (valueResult.toUpperCase().includes(keyword)) {
      // ie. SQUASH(c/context/start_time) => c/context/start_time
      const regex = new RegExp(`${keyword}\\s?\\((?\<selection\>.*\\b)\\)?`, 'i');
      const regexMatch = regex.exec(valueResult)?.groups?.selection;
      if (regexMatch) {
        valueResult = regexMatch;
      }
    }
  });

  return valueResult.trim();
}
