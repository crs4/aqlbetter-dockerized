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

import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';
import {AppLogo} from '../shared/shared.enums';
import {AppRoutes} from '../app-routes';
import {Router} from '@angular/router';
import {AppContextService} from '../core/app-context.service';
import {StorageService} from '../core/storage.service';

@Component({
  selector: 'bui-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbTooltipConfig],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  @Input() logo: AppLogo;
  AppRoutes = AppRoutes;

  constructor(private appContextService: AppContextService,
              private storageService: StorageService,
              private tooltipConfig: NgbTooltipConfig,
              private router: Router) {
    this.tooltipConfig.placement = 'right';
    this.tooltipConfig.container = 'body';
  }

  signOut() {
    this.appContextService.clear();
    this.storageService.clear();
    this.router.navigate([AppRoutes.DOMAIN_SELECT]);
  }
}
