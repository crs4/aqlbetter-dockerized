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
import {EditorComponent} from './editor.component';
import {MonacoEditorModule} from 'ngx-monaco-editor';
import {PresentationModule} from '../presentation/presentation.module';
import {SaveComponent} from '../save/save.component';
import {TreeModule} from '../tree/tree.module';
import {SidebarContentPanelComponent} from './sidebar-content-panel/sidebar-content-panel.component';
import {EditorTabsComponent} from './editor-tabs/editor-tabs.component';
import {ViewParamsComponent} from './view-params/view-params.component';
import {SharedModule} from '../../shared/shared.module';
import {ResizableModule} from 'angular-resizable-element';
import { EditorMenuComponent } from './editor-menu/editor-menu.component';

@NgModule({
  imports: [
    SharedModule,
    MonacoEditorModule,
    PresentationModule,
    TreeModule,
    ResizableModule
  ],
  declarations: [
    EditorComponent,
    SaveComponent,
    SidebarContentPanelComponent,
    EditorTabsComponent,
    ViewParamsComponent,
    EditorMenuComponent
  ],
  exports: [
    EditorComponent,
    SidebarContentPanelComponent,
    ViewParamsComponent,
    EditorTabsComponent
  ]
})
export class EditorModule { }
