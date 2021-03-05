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

export enum RmType {
  DV_QUANTITY = 'DV_QUANTITY',
  DV_CODED_TEXT = 'DV_CODED_TEXT',
  DV_TEXT = 'DV_TEXT',
  DV_PROPORTION = 'DV_PROPORTION',
  DV_BOOLEAN = 'DV_BOOLEAN',
  DV_DATE = 'DV_DATE',
  DV_TIME = 'DV_TIME',
  DV_DATE_TIME = 'DV_DATE_TIME',
  DV_ORDINAL = 'DV_ORDINAL',
  DV_COUNT = 'DV_COUNT',
  DV_INTEGER = 'DV_INTEGER',
  DV_DURATION = 'DV_DURATION',
  DV_URI = 'DV_URI',
  DV_EHR_URI = 'DV_EHR_URI',
  DV_IDENTIFIER = 'DV_IDENTIFIER',
  DV_MULTIMEDIA = 'DV_MULTIMEDIA',
  DV_PARSABLE = 'DV_PARSABLE',
  STRING = 'STRING',
  TERMINOLOGY_ID = 'TERMINOLOGY_ID',
  ISM_TRANSITION = 'ISM_TRANSITION',
  CODE_PHRASE = 'CODE_PHRASE',
  PARTY_PROXY = 'PARTY_PROXY',
  DV_STATE = 'DV_STATE',
  OBSERVATION = 'OBSERVATION',
  EVENT = 'EVENT',
  COMPOSITION = 'COMPOSITION',
  SECTION = 'SECTION',
  EVALUATION = 'EVALUATION',
  INSTRUCTION = 'INSTRUCTION',
  ACTION = 'ACTION',
  ELEMENT = 'ELEMENT',
  CLUSTER = 'CLUSTER',
  EVENT_CONTEXT = 'EVENT_CONTEXT',
  POINT_EVENT = 'POINT_EVENT',
  PARTICIPATION = 'PARTICIPATION',
  ACTIVITY = 'ACTIVITY',
  INTERVAL_EVENT = 'INTERVAL_EVENT',
  ADMIN_ENTRY = 'ADMIN_ENTRY',
  'DV_INTERVAL<DV_COUNT>' = 'DV_INTERVAL<DV_COUNT>',
  'DV_INTERVAL<DV_DATE>' = 'DV_INTERVAL<DV_DATE>',
  'DV_INTERVAL<DV_DATE_TIME>' = 'DV_INTERVAL<DV_DATE_TIME>',
  'DV_INTERVAL<DV_QUANTITY>' = 'DV_INTERVAL<DV_QUANTITY>',
}
