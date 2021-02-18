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

import { TablePresentationFacadeService } from './table-presentation-facade.service';
import { DetailedTablePresentationService } from './detailed-table-presentation.service';
import { CompactTablePresentationService } from './compact-table-presentation.service';
import { TablePresentation } from './enums/table-presentation.enum';
import { compactTableSanitizedData, detailedTableDetailedData, mockData, nodeMock } from './test/test-mocks.model';

describe('TablePresentationFacadeService', () => {
  let service: TablePresentationFacadeService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        TablePresentationFacadeService,
        DetailedTablePresentationService,
        CompactTablePresentationService
      ]
    });

    service = TestBed.inject<TablePresentationFacadeService>(TablePresentationFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sanitize result set for compact table', async () => {
    const expectedResultTableNames = [
      'w/data[at0001]/items[at0009]',
      'w/data[at0001]/items[at0006]/value',
      'w/data[at0001]/items[at0002]/value'
    ];

    const expectedTables = new Map<string, any>()
      .set('#0', compactTableSanitizedData);

    const sanitizedData = service.sanitizeResultSet(mockData, TablePresentation.COMPACT);

    expect(sanitizedData).toEqual({rootHeaderNames: expectedResultTableNames, tables: expectedTables});
  });

  it('should sanitize result set for detailed table', async () => {
    const expectedResultTableNames = [
      'w/data[at0001]/items[at0009]',
      'w/data[at0001]/items[at0006]/value',
      'w/data[at0001]/items[at0002]/value'
    ];

    const expectedTables = new Map<string, any>()
      .set('#0', detailedTableDetailedData);

    const sanitizedData = service.sanitizeResultSet(mockData, TablePresentation.DETAILED);

    expect(sanitizedData).toEqual({rootHeaderNames: expectedResultTableNames, tables: expectedTables});
  });

  it('should return presentation data for compact table', async () => {
    service.sanitizeResultSet(mockData, TablePresentation.COMPACT);
    const presentationData = service.getPresentationData('#0', TablePresentation.COMPACT);

    expect(presentationData[0].path).toEqual('w/data[at0001]/items[at0009]');
    expect(presentationData[0].children[0].path).toEqual('w/data[at0001]/items[at0009]/items');
    expect(presentationData[0].children[0].children.length).toBe(2);
  });

  it('should return presentation data for detailed table', async () => {
    service.sanitizeResultSet(mockData, TablePresentation.DETAILED);
    const presentationData = service.getPresentationData('#0', TablePresentation.DETAILED);

    expect(presentationData[0].path).toEqual('w/data[at0001]/items[at0009]');
    expect(presentationData[0].children.length).toEqual(3);
    expect(presentationData[0].children[0].children[0].path).toEqual('w/data[at0001]/items[at0009]/name/value');
  });

  it('should return header presentation for compact table', async () => {
    service.sanitizeResultSet(mockData, TablePresentation.COMPACT);
    const presentationData = service.getHeaderPresentation('#0', TablePresentation.COMPACT);

    expect(presentationData[0].path).toBeUndefined();
    expect(presentationData[0].children[0].path).toEqual('w/data[at0001]/items[at0009]/items');
    expect(presentationData[0].children[0].children.length).toBe(2);
  });

  it('should return header presentation for detailed table', async () => {
    service.sanitizeResultSet(mockData, TablePresentation.DETAILED);
    const presentationData = service.getHeaderPresentation('#0', TablePresentation.DETAILED);

    expect(presentationData[0].path).toEqual('w/data[at0001]/items[at0009]');
    expect(presentationData[0].children.length).toEqual(3);
    expect(presentationData[0].children[0].children[0].path).toEqual('w/data[at0001]/items[at0009]/name/value');
  });

  it('should return table node name for compact table', async () => {
    service.sanitizeResultSet(mockData, TablePresentation.COMPACT);
    const nodeName = service.getTableNodeName(nodeMock, TablePresentation.COMPACT);

    expect(nodeName).toEqual('Clinical Impact');
  });

  it('should return table node name  for detailed table', async () => {
    service.sanitizeResultSet(mockData, TablePresentation.DETAILED);
    const nodeName = service.getTableNodeName(nodeMock, TablePresentation.DETAILED);

    expect(nodeName).toEqual('Clinical Impact');
  });


  it('should include value for compact table', async () => {
    service.sanitizeResultSet(mockData, TablePresentation.COMPACT);
    const include = service.includeValue('value', TablePresentation.COMPACT);

    expect(include).toBeTruthy();
  });

  it('should exclude value for compact table', async () => {
    service.sanitizeResultSet(mockData, TablePresentation.COMPACT);
    const include = service.includeValue('@class', TablePresentation.COMPACT);

    expect(include).toBeFalsy();
  });

  it('should return table node name  for detailed table', async () => {
    service.sanitizeResultSet(mockData, TablePresentation.DETAILED);
    const include = service.includeValue('value', TablePresentation.DETAILED);

    expect(include).toBeTruthy();
  });

});
