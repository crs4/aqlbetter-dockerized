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

import {ViewParamsComponent} from './view-params.component';
import {CoreModule} from '../../../core/core.module';
import {PresentationModule} from '../../presentation/presentation.module';
import {ToastrModule} from 'ngx-toastr';
import {TranslateModule} from '@ngx-translate/core';
import {Tab, TabType} from '../tab.model';
import {EditorData} from '../editor-data.model';
import {SharedModule} from '../../../shared/shared.module';

describe('ViewParamsComponent', () => {
  let component: ViewParamsComponent;
  let fixture: ComponentFixture<ViewParamsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        SharedModule,
        PresentationModule,
        ToastrModule.forRoot(),
        TranslateModule.forRoot(),
        SharedModule
      ],
      declarations: [ ViewParamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewParamsComponent);
    component = fixture.componentInstance;
    component.tab = new Tab(TabType.VIEW, new EditorData(), 'test');
    component.editorData = component.tab.editor;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
