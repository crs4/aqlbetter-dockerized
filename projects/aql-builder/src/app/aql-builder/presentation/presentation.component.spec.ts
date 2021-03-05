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

import { PresentationComponent } from './presentation.component';
import {TablePresentationComponent} from './table-presentation/table-presentation.component';
import {CommonModule} from '@angular/common';
import {CoreModule} from '../../core/core.module';
import {SharedModule} from '../../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {ToastrModule} from 'ngx-toastr';
import {RawPresentationComponent} from './raw-presentation/raw-presentation.component';
import {PresentationToolbarComponent} from './presentation-toolbar/presentation-toolbar.component';
import {NgInviewModule} from '@stockopedia/angular-inport';
import {TablePresentationService} from './table-presentation/table-presentation.service';
import {TablePresentationFacadeService} from './table-presentation/table-presentation-facade.service';
import {CompactTablePresentationService} from './table-presentation/compact-table-presentation.service';
import {DetailedTablePresentationService} from './table-presentation/detailed-table-presentation.service';
import {ToastrWrapperService} from '../../shared/toastr-wrapper.service';
import {CodeSnippetService} from '../../core/code-snippet.service';
import {ExportService} from './table-presentation/export.service';

describe('PresentationComponent', () => {
  let component: PresentationComponent;
  let fixture: ComponentFixture<PresentationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        CoreModule,
        SharedModule,
        TranslateModule.forRoot(),
        ToastrModule.forRoot(),
        NgInviewModule
      ],
      declarations: [
        PresentationComponent,
        TablePresentationComponent,
        RawPresentationComponent,
        PresentationToolbarComponent
      ],
      providers: [
        TablePresentationService,
        TablePresentationFacadeService,
        CompactTablePresentationService,
        DetailedTablePresentationService,
        ToastrWrapperService,
        CodeSnippetService,
        ExportService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
