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

import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output
} from '@angular/core';
import {DropdownItem, DropdownOptions, DropdownSelectedItem} from './dropdown.model';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'aql-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent implements OnChanges, ControlValueAccessor {
  @Input() dropdownId: string;
  @Input() items: DropdownItem<any>[];
  @Input() options: DropdownOptions;
  @Input() currentValue: any;
  @Output() selectItem: EventEmitter<DropdownSelectedItem<any>> = new EventEmitter<DropdownSelectedItem<any>>();

  selectedItem: DropdownItem<any>;
  classes: string;
  disabled = false;
  value: string;

  private onChanged: any;
  private onTouched: any;

  constructor(@Attribute('class') public customClass: string, @Attribute('formControlName') private control: string) { }

  ngOnChanges() {
    if (this.items && this.currentValue) {
      this.selectedItem = this.items.find((item: DropdownItem<any>) => item.value === this.currentValue);
      this.writeValue(this.selectedItem);
    }
  }

  onSelect(item: DropdownItem<any>, index: number) {
    this.writeValue(item);

    if (this.control) {
      this.onChanged(item.value);
      this.onTouched();
    }

    this.selectItem.emit({ item, index });
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: DropdownItem<any>): void {
    if (!obj) {
      return;
    }

    if (typeof obj === 'string') {
      this.selectedItem = this.items.find(item => item.value === obj);
    } else {
      this.selectedItem = obj;
      this.value = this.selectedItem.value;
    }
  }
}
