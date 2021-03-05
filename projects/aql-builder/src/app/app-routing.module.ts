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

import {RouterModule, Routes} from '@angular/router';
import {AppRoutes} from './app-routes';
import {PlatformGuard} from './core/platform.guard';
import {NgModule} from '@angular/core';
import {DomainSelectComponent} from './domain-select/domain-select.component';
import {AqlBuilderComponent} from './aql-builder/aql-builder.component';

const routes: Routes = [
  {
    path: AppRoutes.AQL_BUILDER,
    component: AqlBuilderComponent,
    canActivate: [PlatformGuard]
  },
  {
    path: AppRoutes.DOMAIN_SELECT,
    component: DomainSelectComponent
  },
  {
    path: '',
    redirectTo: AppRoutes.AQL_BUILDER,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: AppRoutes.AQL_BUILDER
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

