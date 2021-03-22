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

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TablePresentationComponent} from './table-presentation/table-presentation.component';
import {PresentationComponent} from './presentation.component';
import {SharedModule} from '../../shared/shared.module';
import {PresentationToolbarComponent} from './presentation-toolbar/presentation-toolbar.component';
import {RawPresentationComponent} from './raw-presentation/raw-presentation.component';
import {NgInviewModule} from '@stockopedia/angular-inport';
import {TablePresentationService} from './table-presentation/table-presentation.service';
import {TablePresentationFacadeService} from './table-presentation/table-presentation-facade.service';
import {CompactTablePresentationService} from './table-presentation/compact-table-presentation.service';
import {DetailedTablePresentationService} from './table-presentation/detailed-table-presentation.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgInviewModule
  ],
  declarations: [
    TablePresentationComponent,
    PresentationComponent,
    PresentationToolbarComponent,
    RawPresentationComponent
  ],
  providers: [
    TablePresentationService,
    TablePresentationFacadeService,
    CompactTablePresentationService,
    DetailedTablePresentationService,
  ],
  exports: [
    PresentationComponent
  ]
})
export class PresentationModule { }
