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

import {TestBed} from '@angular/core/testing';

import {TablePresentationService} from './table-presentation.service';
import {HttpClientModule} from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';
import {ToastrModule} from 'ngx-toastr';
import {TabService} from '../../../core/tab.service';
import {Tab, TabType} from '../../editor/tab.model';
import {
  getMockedEditorStateForDuplicatesMock, getMockEditorStateForMultipleTables, getMockEditorStateForSquash,
  mockResultTablesForDuplicates, mockResultTablesWithoutDuplicates, resultSetMultipleTablesMock,
  resultSetWithDuplicatesMock, resultSetWithoutDuplicatesMock, squashResultSet
} from './test-mocks/test.mocks';
import {EditorData} from '../../editor/editor-data.model';
import {AdditionalAqlAutocompleteKeyword} from '../../monaco/monaco-aql.model';

describe('TablePresentationService', () => {
  let service: TablePresentationService;
  let tabService: TabService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        TranslateModule.forRoot(),
        ToastrModule.forRoot()
      ],
      providers: [
        TablePresentationService
      ]
    });

    service = TestBed.inject<TablePresentationService>(TablePresentationService);
    tabService = TestBed.inject<TabService>(TabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sanitize result set with duplicates', () => {
    const tab = new Tab(TabType.NEW_QUERY, getMockedEditorStateForDuplicatesMock());
    tabService.createTab(tab);
    tabService.setActiveTab(0);


    const {tables, rootHeaderNames} = service.sanitizeResultSet(resultSetWithDuplicatesMock);

    const expectedTables = new Map<string, any>();
    expectedTables.set('Laboratory test report', {'COMPOSITION': mockResultTablesForDuplicates});
    expect(tables).toEqual(expectedTables);
    expect(rootHeaderNames).toEqual(['c']);
  });

  it('should sanitize result set without duplicates', () => {
    const editorStateMock = new EditorData();
    editorStateMock.replacementMap = new Map<string, string>()
      .set('p/Temperature···/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value', '/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value')
      .set('p/Body_exposure···/data[at0002]/events[at0003]/state[at0029]/items[at0030]/value', '/data[at0002]/events[at0003]/state[at0029]/items[at0030]/value')
      .set('p/Description_of_thermal_stress···/data[at0002]/events[at0003]/state[at0029]/items[at0041]/value', '/data[at0002]/events[at0003]/state[at0029]/items[at0041]/value')
      .set('p/Time···/data[at0002]/events[at0003]/time', '/data[at0002]/events[at0003]/time')
      .set('p/Site_of_measurement···/protocol[at0020]/items[at0021]/value', '/protocol[at0020]/items[at0021]/value')
      .set('p/Subject···/subject', '/subject');

    editorStateMock.additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>()
      .set('e', AdditionalAqlAutocompleteKeyword.EHR)
      .set('c', AdditionalAqlAutocompleteKeyword.COMPOSITION)
      .set('p', AdditionalAqlAutocompleteKeyword.OBSERVATION);
    editorStateMock.archetypeNameAndIdMap = new Map<string, string>()
      .set('Body_temperature', 'openEHR-EHR-OBSERVATION.body_temperature.v1');

    editorStateMock.variableToArchetypeNameMap = new Map<string, string>()
      .set('p', 'Body_temperature');

    editorStateMock.code = 'SELECT p/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/magnitude as temperatura,\n' +
      '    p/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/units as enota,\n' +
      '      p/data[at0002]/events[at0003]/time as time\n' +
      '    FROM EHR e\n' +
      '    CONTAINS COMPOSITION c\n' +
      '    CONTAINS OBSERVATION p[openEHR-EHR-OBSERVATION.body_temperature.v1]\n' +
      '    OFFSET 0 LIMIT 10\';';

    const tab = new Tab(TabType.NEW_QUERY, editorStateMock);
    tabService.createTab(tab);
    tabService.setActiveTab(0);


    const {tables, rootHeaderNames} = service.sanitizeResultSet(resultSetWithoutDuplicatesMock);

    const expectedTables = new Map<string, any>();
    expectedTables.set('temperatura', mockResultTablesWithoutDuplicates);

    expect(tables).toEqual(expectedTables);
    expect(rootHeaderNames).toEqual(['temperatura', 'enota', 'time']);
  });

  it('should sanitize result set with multiple tables', () => {
    const tab = new Tab(TabType.NEW_QUERY, getMockEditorStateForMultipleTables());
    tabService.createTab(tab);
    tabService.setActiveTab(0);

    const {tables, rootHeaderNames} = service.sanitizeResultSet(resultSetMultipleTablesMock);

    expect(Array.from(tables.keys())).toEqual(['Allergies', 'Vital Signs', 'MEDTRONIC VBHC CRC Clinical Outcomes Follow-up', 'a-vsi', 'luka3']);
    expect(rootHeaderNames).toEqual(['c']);
  });

  it('should sanitize result set with squash', () => {
    const tab = new Tab(TabType.NEW_QUERY, getMockEditorStateForSquash());
    tabService.createTab(tab);
    tabService.setActiveTab(0);

    const {tables, rootHeaderNames} = service.sanitizeResultSet(squashResultSet);

    const expectedTables = {
      'cuid': ['0b96249b-9d55-436e-96ac-755f368adb21::default::1', '7fb9a2da-7445-4901-b505-014282f65b02::default::1', 'b5bbf8ff-49c8-402b-a181-a8c413ab2420::default::1', '148d0e37-c680-419a-bfb4-0fbf0c2daf7d::default::1'],
      'completed': ['2020-09-11T10:37:00+01:00', '2020-09-08T09:23:00+01:00', '2020-08-19T15:06:00+02:00', '2020-08-19T13:17:00+02:00'],
      'mrn': ['486943002', '20200213001', '897200', '1234564'],
      'com_assessment_findings': [
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
