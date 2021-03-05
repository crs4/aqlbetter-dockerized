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

import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MenuService} from './menu.service';
import {MenuItem} from './menu-item.interface';
import {MenuPanel} from './menu.enum';

@Component({
  selector: 'bui-menu',
  templateUrl: './menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {
  @Input() menuItems: MenuItem[];
  @Input() lastSelectedItem: number;
  selectedItem$: Observable<string>;

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.selectedItem$ = this.menuService.selectedMenuItem$;
  }

  selectPanel(panel: MenuPanel) {
    this.menuService.selectMenuItem(panel);
  }

}
