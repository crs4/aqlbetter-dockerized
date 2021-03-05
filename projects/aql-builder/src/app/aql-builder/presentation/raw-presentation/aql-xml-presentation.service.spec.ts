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

import { AqlXmlPresentationService } from './aql-xml-presentation.service';
import {MonacoService} from '../../monaco/monaco.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {EhrApiService} from '../../../core/ehr-api.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';

describe('AqlXmlPresentationService', () => {
  let service: AqlXmlPresentationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        AqlXmlPresentationService,
        TranslateService,
        MonacoService,
        EhrApiService
      ]
    });
    service = TestBed.inject(AqlXmlPresentationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
