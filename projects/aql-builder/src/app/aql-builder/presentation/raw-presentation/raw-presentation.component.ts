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

import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {TablePresentation} from '../table-presentation/table-presentation.enum';
import {CommonUtil} from '../../../shared';
import {ToastrWrapperService, ToastType} from '../../../shared/toastr-wrapper.service';
import {ToastContent} from '../../../shared/models/app.model';

@Component({
  selector: 'aql-raw-presentation',
  templateUrl: './raw-presentation.component.html',
  styleUrls: ['./raw-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RawPresentationComponent {
  @Input() rawData: string;
  @Input() showAsXml = false;
  @Output() toggleDataType: EventEmitter<void> = new EventEmitter<void>();
  TablePresentation = TablePresentation;

  constructor(private toastrWrapperService: ToastrWrapperService) { }

  copyToClipboard(code: string): void {
    CommonUtil.copyToClipboard(code);
    this.toastrWrapperService.handleToast(ToastType.SUCCESS, new ToastContent('COPIED_TO_CLIPBOARD'));
  }

  toggleXml() {
    this.toggleDataType.emit();
  }
}
