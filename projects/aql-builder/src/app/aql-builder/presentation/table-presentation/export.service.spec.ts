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

import {ExportService} from './export.service';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {TranslateModule} from '@ngx-translate/core';
import {TablePresentationFacadeService} from './table-presentation-facade.service';
import {DetailedTablePresentationService} from './detailed-table-presentation.service';
import {CompactTablePresentationService} from './compact-table-presentation.service';
import {TablePresentationService} from './table-presentation.service';
import {Tab, TabType} from '../../editor/tab.model';
import {TablePresentation} from './table-presentation.enum';
import {TabService} from '../../../core/tab.service';
import {getActiveEditorStateMock, mockData} from './test-mocks/test.mocks';

describe('ExportService', () => {
  let tabService: TabService;
  let service: ExportService;
  let tablePresentationService: TablePresentationFacadeService;

  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientModule,
          ToastrModule.forRoot(),
          TranslateModule.forRoot()
        ],
        providers: [
          TablePresentationFacadeService,
          DetailedTablePresentationService,
          CompactTablePresentationService,
          TablePresentationService,
          ExportService,
          TabService
        ]
      });


      tabService = TestBed.inject(TabService);
      service = TestBed.inject<ExportService>(ExportService);
      tablePresentationService = TestBed.inject<TablePresentationFacadeService>(TablePresentationFacadeService);
    }
  );

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shoud export compact table', () => {
    const tab = new Tab(TabType.NEW_QUERY, getActiveEditorStateMock());
    tabService.createTab(tab);
    tabService.setActiveTab(0);

    tablePresentationService.sanitizeResultSet(mockData, TablePresentation.COMPACT);

    const exportTables = service.getExportTables(TablePresentation.COMPACT);

    expect(exportTables).toEqual(exportCompactTableMock);
  });

  it('shoud export detailed table', () => {
    const tab = new Tab(TabType.NEW_QUERY, getActiveEditorStateMock());
    tabService.createTab(tab);
    tabService.setActiveTab(0);

    tablePresentationService.sanitizeResultSet(mockData, TablePresentation.DETAILED);
    const exportTables = service.getExportTables(TablePresentation.DETAILED);

    expect(exportTables).toEqual(exportDetailTableMock);
  });
});

const exportCompactTableMock = [
  '"w/data[at0001]/items[at0009]/items/Clinical Impact","w/data[at0001]/items[at0009]/items/Certainty","w/data[at0001]/items[at0006]/value",' +
  '"w/data[at0001]/items[at0002]/value"\n"","","test","test"\n" Significant"," Suspected","","Mites"\n" Insignificant"," Confirmed","",' +
  '"Dog fur/hair"\n" Insignificant"," Confirmed","","Dog fur/hair"\n" Significant"," Suspected","","Mites"\n" Insignificant"," Confirmed",' +
  '"","Dog fur/hair"\n" Insignificant"," Confirmed","","Dog fur/hair"\n" Insignificant","","preko add","test"\n" Insignificant","","","test"\n"","","","dsdasdsadsa"\n'
];


const exportDetailTableMock = [
  '"w/data[at0001]/items[at0009]/name/value","w/data[at0001]/items[at0009]/archetype_node_id",' +
  '"w/data[at0001]/items[at0009]/items/Clinical Impact/name/value","w/data[at0001]/items[at0009]/items/Clinical Impact/archetype_node_id",' +
  '"w/data[at0001]/items[at0009]/items/Clinical Impact/value/value","w/data[at0001]/items[at0009]/items/Clinical Impact/value/defining_code/terminology_id/value",' +
  '"w/data[at0001]/items[at0009]/items/Clinical Impact/value/defining_code/code_string","w/data[at0001]/items[at0009]/items/Certainty/name/value",' +
  '"w/data[at0001]/items[at0009]/items/Certainty/archetype_node_id","w/data[at0001]/items[at0009]/items/Certainty/value/value",' +
  '"w/data[at0001]/items[at0009]/items/Certainty/value/defining_code/terminology_id/value",' +
  '"w/data[at0001]/items[at0009]/items/Certainty/value/defining_code/code_string","w/data[at0001]/items[at0006]/value/value",' +
  '"w/data[at0001]/items[at0002]/value/value"\n"","","","","","","","","","","","","test","test"\n"Reaction event summary","at0009",' +
  '"Clinical Impact","at0017","Significant","local","at0037","Certainty","at0021","Suspected","local","at0022","",' +
  '"Mites"\n"Reaction event summary","at0009","Clinical Impact","at0017","Insignificant","local","at0036","Certainty","at0021",' +
  '"Confirmed","local","at0024","","Dog fur/hair"\n"Reaction event summary","at0009","Clinical Impact","at0017","Insignificant",' +
  '"local","at0036","Certainty","at0021","Confirmed","local","at0024","","Dog fur/hair"\n"Reaction event summary","at0009",' +
  '"Clinical Impact","at0017","Significant","local","at0037","Certainty","at0021","Suspected","local","at0022","",' +
  '"Mites"\n"Reaction event summary","at0009","Clinical Impact","at0017","Insignificant","local","at0036","Certainty",' +
  '"at0021","Confirmed","local","at0024","","Dog fur/hair"\n"Reaction event summary","at0009","Clinical Impact","at0017",' +
  '"Insignificant","local","at0036","Certainty","at0021","Confirmed","local","at0024","","Dog fur/hair"\n"Reaction event summary",' +
  '"at0009","Clinical Impact","at0017","Insignificant","local","at0036","","","","","","preko add","test"\n"Reaction event summary",' +
  '"at0009","Clinical Impact","at0017","Insignificant","local","at0036","","","","","","","test"\n"","","","","","","","","","","","","","dsdasdsadsa"\n'
];
