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
import { commentPattern } from '../../models/constants.model';
import { removeEscapedKeywordsFromSelections } from './remove-escaped-keywords-from-selections';

export function getFullSelections(code: string, escapeSelections = true): string[] {
  const sanitizedCode = code.toUpperCase();
  const selectIndex = sanitizedCode.indexOf(AqlKeyword.SELECT);
  const fromIndex = sanitizedCode.indexOf(AqlKeyword.FROM);
  const selections = code
    .slice(selectIndex + AqlKeyword.SELECT.length, fromIndex)
    .replace(AqlKeyword.DISTINCT, '');
  const startingKeywordVariables = selections
    .replace(/'.+?'/g, '')
    .replace(/\[.+?]/g, '')
    .split(',')
    .map(item => item.trim())
    .map(selection => `${selection.split('/')?.[0]}`)
    .map(v => {
      if (!escapeSelections) {
        return v;
      }

      return removeEscapedKeywordsFromSelections(v);
    });

  const commaSplit = new RegExp(`[,](?!')`, 'g');
  const splitedSelectionsByComma = selections.trim()
    .split('\n')
    .filter(v => !v.trim().startsWith(commentPattern))
    .map(v => v.trim()).join(' ')
    .split(commaSplit)
    .map(v => {
      if (!escapeSelections) {
        return v;
      }

      return removeEscapedKeywordsFromSelections(v);
    });

  // Gets the indexes of splited selections by comma which starts with keyword variable
  const selectionIndexes = splitedSelectionsByComma.map((v, i) => {
    if (startingKeywordVariables.some(starter => v.trim().startsWith(`${starter}/`) || v === starter)) {
      return i;
    }

    return null;
  }).filter(item => item != null);

  // join selections which do not contains keyword variables
  // (i.e. ["o/data[at0001]/items[at0043", "'On average, do the patient consume more than [3/2] glasses (unit) of alcohol a day?']/value"]
  // --> ["o/data[at0001]/items[at0043,'On average, do the patient consume more than [3/2] glasses (unit) of alcohol a day?']/value"])
  const resolvedSelections = selectionIndexes.map((indexVal, i) => {
    if (selectionIndexes[i + 1]) {
      return splitedSelectionsByComma.slice(indexVal, selectionIndexes[i + 1]).join(',');
    } else {
      return splitedSelectionsByComma.slice(indexVal).join(',');
    }
  });

  return resolvedSelections.map(v => v.trim());
}
