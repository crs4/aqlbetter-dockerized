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

import { SidebarContentPanelComponent } from './sidebar-content-panel.component';
import {CoreModule} from '../../../core/core.module';
import {SharedModule} from '../../../shared/shared.module';
import {ToastrModule} from 'ngx-toastr';
import {TranslateModule} from '@ngx-translate/core';
import {TreeModule} from '../../tree/tree.module';
import {EhrApiService} from '../../../core/ehr-api.service';
import {of} from 'rxjs';
import {MenuModule} from '../../../menu/menu.module';
import {MenuService} from '../../../menu/menu.service';
import {CodeSnippetService} from '../../../core/code-snippet.service';
import {ExportService} from '../../presentation/table-presentation/export.service';

describe('SidebarContentPanelComponent', () => {
  let component: SidebarContentPanelComponent;
  let fixture: ComponentFixture<SidebarContentPanelComponent>;
  let ehrApiService: EhrApiService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        SharedModule,
        ToastrModule.forRoot(),
        TranslateModule.forRoot(),
        TreeModule,
        MenuModule
      ],
      declarations: [
        SidebarContentPanelComponent
      ],
      providers: [
        EhrApiService,
        MenuService,
        CodeSnippetService,
        ExportService
      ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarContentPanelComponent);
    component = fixture.componentInstance;

    ehrApiService = TestBed.inject<EhrApiService>(EhrApiService);

    spyOn(ehrApiService, 'getViews').and.callFake(() => {
      return of([]);
    });

    spyOn(ehrApiService, 'getTemplateIDs').and.callFake(() => {
      return of([]);
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
