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

import {EditorComponent} from './editor.component';
import {MonacoEditorModule} from 'ngx-monaco-editor';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {PresentationModule} from '../presentation/presentation.module';
import {SaveComponent} from '../save/save.component';
import {TreeModule} from '../tree/tree.module';
import {SidebarContentPanelComponent} from './sidebar-content-panel/sidebar-content-panel.component';
import {of} from 'rxjs';
import {EhrApiService} from '../../core/ehr-api.service';
import {EditorTabsComponent} from './editor-tabs/editor-tabs.component';
import {ViewParamsComponent} from './view-params/view-params.component';
import {SharedModule} from '../../shared/shared.module';
import {MenuModule} from '../../menu/menu.module';
import {MenuService} from '../../menu/menu.service';
import {CoreModule} from '../../core/core.module';
import {ResizableModule} from 'angular-resizable-element';
import {EditorMenuComponent} from './editor-menu/editor-menu.component';
import {CodeSnippetService} from '../../core/code-snippet.service';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;
  let ehrApiService: EhrApiService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SharedModule,
        HttpClientModule,
        PresentationModule,
        MonacoEditorModule.forRoot(),
        TranslateModule.forRoot(),
        ToastrModule.forRoot(),
        TreeModule,
        MenuModule,
        CoreModule,
        ResizableModule
      ],
      declarations: [
        EditorComponent,
        EditorMenuComponent,
        SaveComponent,
        SidebarContentPanelComponent,
        EditorTabsComponent,
        ViewParamsComponent
      ],
      providers: [
        MenuService,
        EhrApiService,
        CodeSnippetService
      ]
    })
    .compileComponents();


    ehrApiService = TestBed.inject<EhrApiService>(EhrApiService);
    spyOn(ehrApiService, 'getViews').and.callFake(() => {
      return of([]);
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
