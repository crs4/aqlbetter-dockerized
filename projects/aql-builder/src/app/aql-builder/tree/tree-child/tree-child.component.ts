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

import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {EhrViewType, TreeNode} from '../../../shared';
import {QueryManipulationService} from '../query-manipulation.service';
import {AqlLangKeyword} from '../../monaco/monaco-aql.model';
import {QueryManipulatorUtil} from '../query-manipulator.util';
import {TemplatePresentation} from '../../editor/sidebar-content-panel/template-presentation.enum';
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {TabService} from '../../../core/tab.service';
import {RmType} from '../../../shared/models/rm-type.enum';
import {InputType} from '../../../shared/shared.enums';

@Component({
  selector: 'aql-tree-child',
  templateUrl: './tree-child.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeChildComponent implements OnChanges {
  @Input() child: TreeNode;
  @Input() isRoot: boolean;
  @Input() presentation: TemplatePresentation;
  @Input() treeSearchTerm: Observable<string>;
  @Input() language: string;

  isCollapsed = false;
  RmType = RmType;
  title: string;

  constructor(private queryManipulationService: QueryManipulationService,
              private translateService: TranslateService,
              private tabService: TabService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isCollapsed = !this.child.nodeId && !!this.child.rmType;
  }

  addQuery(child: TreeNode) {
    if ([EhrViewType.JS, EhrViewType.JSON_FTL_AQL].includes(this.tabService.getActiveTab()?.view?.type)) {
      return;
    }

    let aqlLangKeyword = '';
    if (child.aqlPath) {
      aqlLangKeyword = child.rmType.toString();
    } else if ((!child.aqlPath && child.rmType && child.formId && child.formId.indexOf('/') === -1) || !child.formId) {
      // root
      this.queryManipulationService.applyRootQuery(child);
    } else {
      const langKeyword = child.formId.indexOf('/') > -1 ? child.formId.substring(0, child.formId.indexOf('/')) : child.formId;
      aqlLangKeyword = AqlLangKeyword[langKeyword.toUpperCase()];
    }

    if (!(AqlLangKeyword as any)[aqlLangKeyword]) {
      aqlLangKeyword = QueryManipulatorUtil.findFirstArchetype(child).rmType.toString();
    }

    this.queryManipulationService.applyChanges(child, (AqlLangKeyword as any)[aqlLangKeyword]);
  }

  displayField(child: TreeNode) {
    if (this.presentation === TemplatePresentation.ALL || this.presentation == null) {
      return true;
    } else {
      return child && !child.inContext && !child.detailed;
    }
  }

  hasChildren(child: TreeNode) {
    if (!child.children || child.children && !child.children.length) {
      return false;
    }

    return !!child.children.filter(ch => this.displayField(ch)).length;
  }

  openPopover(popover: NgbPopover, child: TreeNode) {
    const popovers = document.getElementsByTagName('ngb-popover-window');
    for (let i = 0; i < popovers.length; i++) {
      document.getElementsByTagName('body')[0].removeChild(popovers[i]);
    }

    if (popover.isOpen()) {
      popover.close();
    } else if (child.aqlPath) {
      const name = child.localizedNames ? child.localizedNames[this.translateService.currentLang] || child.localizedNames['en'] : '';
      let description = child.localizedDescriptions ? child.localizedDescriptions[this.translateService.currentLang] || child.localizedDescriptions['en'] : '';
      if (description === '*') {
        description = null;
      }
      const values = this.getValues(child);
      popover.open({child, name, description, values});
    }
  }

  getValues(node: TreeNode) {
    if (node.rmType === RmType.DV_CODED_TEXT || node.rmType === RmType.DV_ORDINAL || node.rmType === RmType.DV_TEXT) {
      return this.getInputValues(node);
    } else {
      return undefined;
    }
  }

  getInputValues(node: TreeNode) {
    let type = InputType.CODED_TEXT;
    let inputByType = this.getInputByType(node['inputs'], InputType.CODED_TEXT);

    if (!inputByType?.list) {
      type = InputType.TEXT;
      inputByType = this.getInputByType(node['inputs'], InputType.TEXT);
    }
    if (inputByType?.list) {
      return inputByType?.list?.map(value => {
        if (type === InputType.TEXT) {
          return value.label;
        } else if (type === InputType.CODED_TEXT) {
          return value.value + ' -  ' + (value.ordinal ? value.ordinal + ' - ' : '') + value.label;
        } else {
          return undefined;
        }
      });
    } else if (inputByType?.terminology) {
      return ['terminology: ' + inputByType?.terminology];
    }
  }

  getInputByType(inputs, type: string) {
    for (let i = 0; i < inputs?.length; i++) {
      if (inputs[i].type === type) {
        return inputs[i];
      }
    }
    return null;
  }

}
