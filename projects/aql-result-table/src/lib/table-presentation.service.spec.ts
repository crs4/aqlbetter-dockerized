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

import { TestBed } from '@angular/core/testing';

import { TablePresentationService } from './table-presentation.service';
import {
  mockResultTablesForDuplicates,
  mockResultTablesWithoutDuplicates,
  resultSetMultipleTablesMock,
  resultSetWithDuplicatesMock,
  resultSetWithoutDuplicatesMock,
  squashResultSet
} from './test/test-mocks.model';

describe('TablePresentationService', () => {
  let service: TablePresentationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        TablePresentationService
      ]
    });

    service = TestBed.inject<TablePresentationService>(TablePresentationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sanitize result set with duplicates', async () => {


    const {tables, rootHeaderNames} = service.sanitizeResultSet(resultSetWithDuplicatesMock);

    const expectedTables = new Map<string, any>();
    expectedTables.set('Laboratory test report', {COMPOSITION: mockResultTablesForDuplicates});
    expect(tables).toEqual(expectedTables);
    expect(rootHeaderNames).toEqual(['c']);
  });

  it('should sanitize result set without duplicates', async () => {
    const {tables, rootHeaderNames} = service.sanitizeResultSet(resultSetWithoutDuplicatesMock);

    const expectedTables = new Map<string, any>();
    expectedTables.set('temperatura', mockResultTablesWithoutDuplicates);

    expect(tables).toEqual(expectedTables);
    expect(rootHeaderNames).toEqual(['temperatura', 'enota', 'time']);
  });

  it('should sanitize result set with multiple tables', async () => {
    const {tables, rootHeaderNames} = service.sanitizeResultSet(resultSetMultipleTablesMock);

    expect(Array.from(tables.keys())).toEqual(['Allergies', 'Vital Signs', 'MEDTRONIC VBHC CRC Clinical Outcomes Follow-up', 'a-vsi', 'luka3']);
    expect(rootHeaderNames).toEqual(['c']);
  });

  it('should sanitize result set with squash', async () => {
    const {tables, rootHeaderNames} = service.sanitizeResultSet(squashResultSet);

    const expectedTables = {
      cuid: ['0b96249b-9d55-436e-96ac-755f368adb21::default::1', '7fb9a2da-7445-4901-b505-014282f65b02::default::1', 'b5bbf8ff-49c8-402b-a181-a8c413ab2420::default::1', '148d0e37-c680-419a-bfb4-0fbf0c2daf7d::default::1'],
      completed: ['2020-09-11T10:37:00+01:00', '2020-09-08T09:23:00+01:00', '2020-08-19T15:06:00+02:00', '2020-08-19T13:17:00+02:00'],
      mrn: ['486943002', '20200213001', '897200', '1234564'],
      com_assessment_findings: [
        ['Uses hearing aid', 'Registered partially sighted', 'Hearing difficulty', 'Registered deaf', 'Registered Blind'],
        ['Registered deaf', 'Registered partially sighted', 'Registered Blind', 'Post-laryngectomy voice', 'Non-verbal communication', 'Confused', 'Dementia'],
        ['Uses hearing aid', 'Wears Glasses', 'Post-laryngectomy voice', 'Interpreter needed'],
        ['Normal']
      ]
    };

    expect(rootHeaderNames.every(name => ['cuid', 'completed', 'mrn', 'com_assessment_findings'].includes(name))).toBeTruthy();
    expect(tables.get('cuid')).toEqual(expectedTables);
  });
});
