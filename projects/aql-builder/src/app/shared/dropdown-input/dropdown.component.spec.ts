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

import { DropdownComponent } from './dropdown.component';
import {DropdownDirective} from './dropdown.directive';
import {Pipe, PipeTransform} from '@angular/core';
import {DropdownItem} from './dropdown.model';
import {ApplyDropdownOptionsPipe} from './apply-dropdown-options.pipe';

// fake translate pipe
@Pipe({name: 'translate'})
class TranslatePipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

// fake @Input items:
const fakeItems: DropdownItem<string>[] = [{value: 'test', label: 'test'}];
const fakeOptions = { translatePrefix: 'TEST'};

describe('DropdownInputComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        DropdownComponent,
        DropdownDirective,
        TranslatePipe,
        ApplyDropdownOptionsPipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    component.items = fakeItems;
    component.currentValue = 'test';
    component.options = fakeOptions;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
