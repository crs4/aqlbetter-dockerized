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

import { CustomToastCopyComponent } from './custom-toast-copy.component';
import {ToastPackage, ToastRef, ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const FakeToastPackage = {
  toastId: 1,
  config: {},
  message: null,
  title: undefined,
  toastType: 'toast-warning',
  toastRef: new ToastRef(null)
};

describe('CustomToastComponent', () => {
  let component: CustomToastCopyComponent;
  let fixture: ComponentFixture<CustomToastCopyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, ToastrModule.forRoot()],
      declarations: [ CustomToastCopyComponent ],
      providers: [{provide: ToastPackage, useValue: FakeToastPackage}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomToastCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
