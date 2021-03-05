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

import {NgModule} from '@angular/core';

import {EditorModule} from './editor/editor.module';
import {PlatformLocation} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '../shared/shared.module';
import {AqlBuilderComponent} from './aql-builder.component';
import {NavbarModule} from '../navbar/navbar.module';
import {MultiTranslationLoader, TranslationResource} from '../shared/multi-translation-loader';
import {ToastrWrapperService} from '../shared/toastr-wrapper.service';
import {MenuModule} from '../menu/menu.module';
import {PresentationModule} from './presentation/presentation.module';
import {ResizableModule} from 'angular-resizable-element';
import {CodeSnippetService} from '../core/code-snippet.service';
import {ExportService} from './presentation/table-presentation/export.service';

export function HttpLoaderFactory(http: HttpClient, platformLocation: PlatformLocation) {
  const resources: TranslationResource[] = [
    {prefix: `${platformLocation.getBaseHrefFromDOM()}assets/i18n/aql-builder/`},
    {prefix: `${platformLocation.getBaseHrefFromDOM()}assets/i18n/`}
  ];
  return new MultiTranslationLoader(http, resources);
}


@NgModule({
  imports: [
    SharedModule,
    EditorModule,
    NavbarModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient, PlatformLocation]
      },
      isolate: true
    }),
    MenuModule,
    PresentationModule,
    ResizableModule
  ],
  providers: [
    ToastrWrapperService,
    CodeSnippetService,
    ExportService
  ],
  exports: [
    AqlBuilderComponent
  ],
  declarations: [AqlBuilderComponent]
})
export class AqlBuilderModule { }
