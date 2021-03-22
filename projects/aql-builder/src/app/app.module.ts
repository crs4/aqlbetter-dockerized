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
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {ToastrModule} from 'ngx-toastr';
import {CommonModule, PlatformLocation} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavbarModule} from './navbar/navbar.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MonacoEditorModule, NgxMonacoEditorConfig} from 'ngx-monaco-editor';
import {MonacoRegisterUtil} from './core/monaco/monaco-register.util';
import {TokenInterceptor} from './core/token.interceptor';
import {AqlBuilderModule} from './aql-builder/aql-builder.module';
import {MultiTranslationLoader, TranslationResource} from './shared/multi-translation-loader';
import {RouterModule} from '@angular/router';
import {CommonUtil} from './shared';
import {DomainSelectModule} from './domain-select/domain-select.module';
import {AppRoutingModule} from './app-routing.module';
import {PlatformGuard} from './core/platform.guard';

export function registerLanguageProperties() {
  const registered = MonacoRegisterUtil.registerLanguage();
  if (registered) {
    MonacoRegisterUtil.registerTheme();
    MonacoRegisterUtil.notifyLoaded();
  }
}

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: `${CommonUtil.getBaseHrefFromDOM()}assets`,
  defaultOptions: {
    scrollBeyondLastLine: true,
    overviewRulerLanes: 0,
    overviewRulerBorder: false,
    hideCursorInOverviewRuler: true,
    wordWrap: true
  },
  onMonacoLoad: registerLanguageProperties
};

export function HttpLoaderFactory(http: HttpClient, platformLocation: PlatformLocation) {
  const resources: TranslationResource[] = [
    {prefix: `${platformLocation.getBaseHrefFromDOM()}assets/i18n/aql-builder/`},
    {prefix: `${platformLocation.getBaseHrefFromDOM()}assets/i18n/`}
  ];
  return new MultiTranslationLoader(http, resources);
}


@NgModule({
  imports: [
      CommonModule,
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot({
      disableTimeOut: false,
      closeButton: true,
      enableHtml: true,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
      maxOpened: 4,
      autoDismiss: true
    }),
      TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient, PlatformLocation]
      }
    }),
      NavbarModule,
      NgbModule,
      AqlBuilderModule,
      MonacoEditorModule.forRoot(monacoConfig),
      DomainSelectModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})


export class AppModule {
}
