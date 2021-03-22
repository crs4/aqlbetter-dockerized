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

import {MonacoAutocompleteHelper} from '../monaco/monaco-autocomplete.helper';
import {TreeNode} from '../../shared/models';
import {EditorData} from '../editor/editor-data.model';
import {AdditionalAqlAutocompleteKeyword, AqlLangKeyword} from '../monaco/monaco-aql.model';

export class QueryManipulatorUtil {

  static sanitizeName(archetype: TreeNode): string {
    const name = archetype.name || archetype.id;
    return name.replace(MonacoAutocompleteHelper.variableNameRegex, '_');
  }

  static sanitizeVariableValue(value: string): string {
    return value && value.replace(/\)/g, '').replace(MonacoAutocompleteHelper.variableNameRegex, '_');
  }

  static isAncestor(existingArchetype: TreeNode, child: TreeNode) {
    if (!existingArchetype || existingArchetype && !existingArchetype.children) {
      return false;
    }

    if (existingArchetype.children.some(ch => ch.aqlPath === child.aqlPath)) {
      return true;
    }

    let isAncestor = false;
    existingArchetype.children.forEach(ch => {
      if (ch.children) {
        isAncestor = isAncestor || this.isAncestor(ch, child);
      }
    });

    return isAncestor;
  }

  static findFirstArchetype(treeNodeModel: TreeNode): TreeNode {
    if (!treeNodeModel) {
      return;
    }

    if (treeNodeModel.nodeId && treeNodeModel.nodeId.startsWith('openEHR')) {
      return treeNodeModel;
    }

    if (treeNodeModel.parentModel) {
      return this.findFirstArchetype(treeNodeModel.parentModel);
    }

    return treeNodeModel;
  }

  static findArchetypeWithTheSameAncestor(treeNode: TreeNode, editorState: EditorData) {
    if (!treeNode) {
      return;
    }

    const child = this.findChild(treeNode, editorState);
    if (child) {
      return treeNode;
    } else {
      return this.findArchetypeWithTheSameAncestor(treeNode.parentModel, editorState);
    }
  }

  static findChild(parentNode: TreeNode, editorState: EditorData): TreeNode {
    if (!parentNode || parentNode && !parentNode.children) {
      return;
    }

    let child = null;
    child = parentNode.children && parentNode.children.find(ch => editorState.archetypeNameAndIdMap.has(QueryManipulatorUtil.sanitizeName(ch)));
    if (child || !parentNode.children || parentNode.children && !parentNode.children.length) {
      return child;
    } else {
      parentNode.children.forEach(ch => {
        child = this.findChild(ch, editorState) || child;
      });

      return child;
    }
  }

  static formatQuerySelections(code: string, fromIndex: number, newSelectItem: string): string {
    let selections = fromIndex > -1 ? code.substring(AqlLangKeyword.SELECT.length, fromIndex).replace('\n', '') : '';
    const lineStart = selections ? `${AqlLangKeyword.SELECT} ` : '';

    selections = selections ? selections : code;

    return lineStart
      + this.formatSelectedFields([...selections.split(/,(?! *'|")/g), newSelectItem])
      + (fromIndex > -1 ? code.substring(fromIndex) : '');
  }

  static getVariableName(editorState: EditorData, aqlLangKeyword?: AqlLangKeyword, currentVariableName = ''): string {
    let variableName = currentVariableName;

    for (const [key, val] of editorState.additionalKeywordVariables) {
      if (val === AdditionalAqlAutocompleteKeyword[aqlLangKeyword]) {
        return key;
      }
    }

    if (variableName && !this.variableNameExists(editorState, variableName)) {
      return variableName;
    }

    variableName = this.getRandomChar(editorState);
    if (!this.variableNameExists(editorState, variableName)) {
      return variableName;
    }

    Array.from(editorState.additionalKeywordVariables.keys())
      .forEach(variable => {
        const variablePostfix = variable.split('_')[0];
        if (!this.variableNameExists(editorState, `${variable}_${variablePostfix}`) && !variableName) {
          variableName = `${variable}_${variablePostfix}`;
        }
      });

    if (!variableName) {
      variableName = this.getRandomChar(editorState);
    }

    return variableName;
  }

  static getRandomChar(editorState: EditorData): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
    if (this.variableNameExists(editorState, randomChar)) {
      return this.getRandomChar(editorState);
    }

    return randomChar;
  }

  private static getSelectIdent() {
    let ident = ' ';
    [...AqlLangKeyword.SELECT].forEach(_ => ident += ' ');
    return ident;
  }

  private static formatSelectedFields(selections: string[]): string {
    return selections
      .filter(v => !!v.trim())
      .map(v => v.trim())
      .join(',\n' + this.getSelectIdent()) + '\n';
  }

  private static variableNameExists(editorState: EditorData, variableName: string): boolean {
    return variableName && editorState.additionalKeywordVariables.has(`${variableName}`);
  }

}
