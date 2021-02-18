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

export enum AqlKeyword {
  SELECT = 'SELECT',
  FROM = 'FROM',
  AS = 'AS',
  COUNT = 'COUNT',
  MIN = 'MIN',
  MAX = 'MAX',
  AVG = 'AVG',
  EHR = 'EHR',
  BY = 'BY',
  ORDER = 'ORDER',
  COMPOSITION = 'COMPOSITION',
  EVALUATION = 'EVALUATION',
  OBSERVATION = 'OBSERVATION',
  INSTRUCTION = 'INSTRUCTION',
  ACTION = 'ACTION',
  SECTION = 'SECTION',
  VERSION = 'VERSION',
  VERSIONED_OBJECT = 'VERSIONED_OBJECT',
  CONTAINS = 'CONTAINS',
  MATCHES = 'MATCHES',
  AND = 'AND',
  OR = 'OR',
  XOR = 'XOR',
  NOT = 'NOT',
  EXISTS = 'EXISTS',
  OFFSET = 'OFFSET',
  LIMIT = 'LIMIT',
  FETCH = 'FETCH',
  ASC = 'ASC',
  DESC = 'DESC',
  ASCENDING = 'ASCENDING',
  DESCENDING = 'DESCENDING',
  WHERE = 'WHERE',
  ORDER_BY = 'ORDER BY',
  DISTINCT = 'DISTINCT',
  ADMIN_ENTRY = 'ADMIN_ENTRY',
  CLUSTER = 'CLUSTER',
  TASK_PLAN = 'TASK_PLAN',
  WORK_PLAN = 'WORK_PLAN',
  TOP = 'TOP',
  SQUASH = 'SQUASH',
  TAGS = 'TAGS',
  CONCAT = 'CONCAT',
  TAGGED_BY = 'TAGGED BY',
  CURRENT_TIMESTAMP = 'CURRENT_TIMESTAMP',
  TAGGED = 'TAGGED',
  UNION_ALL = 'UNION ALL',
}
