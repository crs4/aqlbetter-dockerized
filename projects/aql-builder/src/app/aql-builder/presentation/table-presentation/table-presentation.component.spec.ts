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

import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { TablePresentationComponent } from './table-presentation.component';
import {TranslateModule} from '@ngx-translate/core';
import {ToastrModule} from 'ngx-toastr';
import {SharedModule} from '../../../shared/shared.module';
import {NgInviewModule} from '@stockopedia/angular-inport';
import {TablePresentationService} from './table-presentation.service';
import {TablePresentationFacadeService} from './table-presentation-facade.service';
import {DetailedTablePresentationService} from './detailed-table-presentation.service';
import {CompactTablePresentationService} from './compact-table-presentation.service';
import {getActiveEditorStateMock, mockData} from './test-mocks/test.mocks';
import {TabService} from '../../../core/tab.service';
import {Tab, TabType} from '../../editor/tab.model';

describe('TablePresentationComponent', () => {
  let component: TablePresentationComponent;
  let fixture: ComponentFixture<TablePresentationComponent>;
  let tabService: TabService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ToastrModule.forRoot(),
        TranslateModule.forRoot(),
        SharedModule,
        NgInviewModule
      ],
      declarations: [ TablePresentationComponent ],
      providers: [
        TablePresentationService,
        TablePresentationFacadeService,
        DetailedTablePresentationService,
        CompactTablePresentationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    tabService = TestBed.inject(TabService);

    fixture = TestBed.createComponent(TablePresentationComponent);
    component = fixture.componentInstance;

    const tab = new Tab(TabType.NEW_QUERY, getActiveEditorStateMock());
    tabService.createTab(tab);
    tabService.setActiveTab(0);

    component.data = mockData;
    component.tab = tab;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create tables', () => {
    component.ngOnChanges({});

    expect(component.tables.length).toEqual(1);
    expect(component.tables[0].body.length).toEqual(10);
    expect(component.tables[0].headers.length).toEqual(3);
  });
});
