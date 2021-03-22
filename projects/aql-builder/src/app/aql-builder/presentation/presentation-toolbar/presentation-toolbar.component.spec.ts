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

import {PresentationToolbarComponent} from './presentation-toolbar.component';
import {SharedModule} from '../../../shared/shared.module';
import {ToastrModule} from 'ngx-toastr';
import {TranslateModule} from '@ngx-translate/core';
import {ExportService} from '../table-presentation/export.service';
import {TablePresentationService} from '../table-presentation/table-presentation.service';
import {TablePresentationFacadeService} from '../table-presentation/table-presentation-facade.service';
import {CompactTablePresentationService} from '../table-presentation/compact-table-presentation.service';
import {DetailedTablePresentationService} from '../table-presentation/detailed-table-presentation.service';

describe('PresentationToolbarComponent', () => {
  let component: PresentationToolbarComponent;
  let fixture: ComponentFixture<PresentationToolbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        ToastrModule.forRoot(),
        TranslateModule.forRoot()
      ],
      declarations: [ PresentationToolbarComponent ],
      providers: [
        ExportService,
        TablePresentationFacadeService,
        CompactTablePresentationService,
        DetailedTablePresentationService,
        TablePresentationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
