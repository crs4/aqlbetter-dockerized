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

import { ArchetypesCompletionItemsService } from './archetypes-completion-items.service';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {MonacoEditorModule} from 'ngx-monaco-editor';
import {TranslateModule} from '@ngx-translate/core';
import {ToastrModule} from 'ngx-toastr';
import {SharedModule} from '../../shared/shared.module';

describe('ArchetypesCompletionItemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      CommonModule,
      SharedModule,
      HttpClientModule,
      MonacoEditorModule.forRoot(),
      TranslateModule.forRoot(),
      ToastrModule.forRoot()
    ],
    providers: []
  }));

  it('should be created', () => {
    const service: ArchetypesCompletionItemsService = TestBed.inject<ArchetypesCompletionItemsService>(ArchetypesCompletionItemsService);
    expect(service).toBeTruthy();
  });
});
