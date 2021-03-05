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

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {ToastrModule} from 'ngx-toastr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SpinnerComponent} from './spinner/spinner.component';
import {TruncatePipe} from './truncate.pipe';
import {UiSwitchModule} from 'ngx-ui-switch';
import {DropdownDirective} from './dropdown-input/dropdown.directive';
import {CustomToastCopyComponent} from './custom-toast-copy/custom-toast-copy.component';
import {CustomToastLinkComponent} from './custom-toast-link/custom-toast-link.component';
import {DateToTodayPipe} from './date-to-today.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [
    SpinnerComponent,
    TruncatePipe,
    DropdownDirective,
    CustomToastCopyComponent,
    CustomToastLinkComponent,
    DateToTodayPipe
  ],
  exports: [
    SpinnerComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    TranslateModule,
    ToastrModule,
    NgbModule,
    TruncatePipe,
    UiSwitchModule,
    DropdownDirective,
    DateToTodayPipe
  ],
  entryComponents: [CustomToastCopyComponent, CustomToastLinkComponent],
  providers: []
})
export class SharedModule {}
