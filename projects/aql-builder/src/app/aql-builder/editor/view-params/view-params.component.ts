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
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core';
import {Tab} from '../tab.model';
import {EditorData} from '../editor-data.model';
import {DropdownItem, DropdownOptions} from '../../../shared/dropdown-input/dropdown.model';

@Component({
  selector: 'aql-view-params',
  templateUrl: './view-params.component.html',
  styleUrls: ['./view-params.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewParamsComponent implements OnChanges {
  @Input() tab: Tab;
  @Output() paramsChanged: EventEmitter<void> = new EventEmitter<void>();
  editorData: EditorData;
  dropdownItems: DropdownItem<string>[] = [
    { value: 'string' },
    { value: 'number' },
    { value: 'integer' },
    { value: 'boolean' },
    { value: 'array', disabled: true}
  ];
  dropdownOptions: DropdownOptions = {
    uppercase: true,
    translatePrefix: 'VIEW.TYPES',
    menuPositionFixed: true
  };

  constructor() { }

  ngOnChanges(): void {
    this.editorData = this.tab.editor;

    this.parseViewMetadata();
  }

  changeViewExecutionParamValue(key: string, $event: string) {
    if (isNaN(+$event)) {
      this.editorData.viewExecutionParameters.set(key, $event);
    } else {
      this.editorData.viewExecutionParameters.set(key, +$event);
    }
  }

  addParam(value: string, paramName: HTMLInputElement) {
    if (!this.editorData.viewParameters) {
      this.editorData.viewParameters = new Map<string, any>();
    }

    if (value) {
      this.editorData.viewParameters.set(value, {name: value, type: 'string', description: ''});

      paramName.value = '';

      this.editorData.viewParameters.forEach((v, k) => {
        if (!this.editorData.viewExecutionParameters.has(k)) {
          this.editorData.viewExecutionParameters.set(k, '');
        }
      });
    }
    this.paramsChanged.emit();
  }

  changeViewParamValue(key: string, value: string, propertyName: string) {
    const valueObject = this.editorData.viewParameters.get(key);
    valueObject['name'] = key;
    valueObject[propertyName] = value;
  }

  private parseViewMetadata() {
    if (this.tab.view.metaData) {

      if (!this.tab.editor.viewParameters) {
        this.tab.editor.viewParameters = new Map<string, {name: string, description: string, type: string, format?: string}>();
      }

      if (this.tab.view.metaData['parameters']) {
        this.tab.view.metaData['parameters'].forEach(param => {
          this.tab.editor.viewParameters.set(param['name'], {name: param['name'], type: param['type'] || 'string', format: param['format'], description: param['description'] || ''});
        });
      }

      if (!this.tab.editor.viewExecutionParameters) {
        this.tab.editor.viewExecutionParameters = new Map<string, any>();
      }

      this.tab.editor.viewParameters.forEach((v, k) => {
        if (!this.tab.editor.viewExecutionParameters.has(k)) {
          this.tab.editor.viewExecutionParameters.set(k, '');
        }
      });
    }
    this.paramsChanged.emit();
  }

}
