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

import {ChangeDetectionStrategy, Component, Input, OnChanges, ViewEncapsulation} from '@angular/core';
import {cloneDeep} from 'lodash';
import {TreeNode} from '../../shared/models';
import {AqlTemplateTreeService} from '../../core/aql-template-tree.service';
import {TemplatePresentation} from '../editor/sidebar-content-panel/template-presentation.enum';
import {Observable} from 'rxjs';

@Component({
  selector: 'aql-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TreeComponent implements OnChanges {
  @Input() tree: TreeNode;
  @Input() presentation: TemplatePresentation;
  @Input() treeSearchTerm: Observable<string>;
  @Input() language: string;

  constructor(private templateTreeService: AqlTemplateTreeService) { }

  ngOnChanges() {
    if (this.presentation === TemplatePresentation.ALL || this.presentation == null) {
      this.tree = cloneDeep(this.tree);
      this.templateTreeService.addAdditionalAttributesToTree(this.tree);
    }
  }

}
