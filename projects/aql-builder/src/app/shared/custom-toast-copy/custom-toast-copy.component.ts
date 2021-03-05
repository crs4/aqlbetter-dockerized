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

import { Component } from '@angular/core';
import {Toast, ToastPackage, ToastrService} from 'ngx-toastr';
import {trigger} from '@angular/animations';
import {CommonUtil} from '../common.util';

const animationSettings = [
    trigger('flyInOut', [])
];

@Component({
  selector: 'bui-custom-toast',
  templateUrl: './custom-toast-copy.component.html',
  animations: animationSettings
})
export class CustomToastCopyComponent extends Toast  {

  constructor(protected toastrService: ToastrService, public toastPackage: ToastPackage) {
    super(toastrService, toastPackage);
  }

  copyToClipboard(message: string) {
    CommonUtil.copyToClipboard(message);
  }

  dismiss($event: Event) {
    this.toastPackage.triggerAction(this.remove());
  }
}
