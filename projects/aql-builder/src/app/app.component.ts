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

import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AqlBuilderStore, AVAILABLE_LANGS, DEFAULT_LANGUAGE} from './core/AqlBuilderStore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  error = null;

  constructor(protected translate: TranslateService) {
  }

  ngOnInit() {
    // Handle translations
    this.translate.addLangs(AVAILABLE_LANGS);
    this.getDefaultLanguage();
  }

  getDefaultLanguage(): void {
    this.translate.setDefaultLang(DEFAULT_LANGUAGE);
    this.translate.use(DEFAULT_LANGUAGE);
    AqlBuilderStore.APP_LANGUAGE = DEFAULT_LANGUAGE;
  }
}
