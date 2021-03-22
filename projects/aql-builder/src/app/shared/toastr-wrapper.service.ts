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

import {Injectable} from '@angular/core';
import {IndividualConfig, ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {ToastContent} from './models/app.model';
import {CustomToastCopyComponent} from './custom-toast-copy/custom-toast-copy.component';

@Injectable({
  providedIn: 'root'
})
export class ToastrWrapperService {

  constructor(private toastrService: ToastrService,
              private translateService: TranslateService) {
  }

  dismissAll() {
    this.toastrService.clear();
  }

  dismissToast(id: number) {
    this.toastrService.remove(id);
  }

  handleToast(toastType: ToastType, toastContent: ToastContent, error?: any, override?: Partial<IndividualConfig>, interpolateParams?: Object): number {
    const translatedTitle = toastContent.title.length > 0 ? this.translateService.instant(toastContent.title, interpolateParams) : '';
    const translatedBody = this.translateService.instant(toastContent.body || 'ERRORS.ERROR_NOTICE', interpolateParams);
    if (toastType === ToastType.SUCCESS) {
      return this.handleSuccess(translatedBody, translatedTitle, override).toastId;
    } else if (toastType === ToastType.WARNING) {
      return this.handleWarning(translatedBody, translatedTitle, override).toastId;
    } else if (toastType === ToastType.ERROR) {
      return this.handleError(translatedBody, translatedTitle, error, { timeOut: 10000, ...override }).toastId;
    } else if (toastType === ToastType.CUSTOM) {
      return this.handleSpecial(translatedBody, translatedTitle, {
        toastComponent: CustomToastCopyComponent,
        ... override,
      }).toastId;
    } else {
      console.warn(`Toast type ${toastType} does not exist.`);
      return null;
    }
  }

  private handleSpecial(toastBody: string, toastTitle: string, override?: Partial<IndividualConfig>) {
    return this.toastrService.warning(toastBody, toastTitle, override);
  }

  private handleSuccess(toastBody: string, toastTitle?: string, override?: Partial<IndividualConfig>) {
    return this.toastrService.success(toastBody, toastTitle, override);
  }

  private handleWarning(toastBody: string, toastTitle?: string, override?: Partial<IndividualConfig>) {
    return this.toastrService.warning(toastBody, toastTitle, override);
  }

  private handleError(toastBody: string, toastTitle?: string, error?: any, override?: Partial<IndividualConfig>) {
    console.error(error ? error : toastBody);
    return this.toastrService.error(toastBody, toastTitle, override);
  }
}

export enum ToastType {
  ERROR,
  SUCCESS,
  WARNING,
  INFO,
  CUSTOM
}
