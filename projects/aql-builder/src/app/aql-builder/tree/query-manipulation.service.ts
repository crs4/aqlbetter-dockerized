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

import {Injectable} from '@angular/core';
import {TreeNode} from '../../shared';
import {AdditionalAqlAutocompleteKeyword, AqlLangKeyword} from '../monaco/monaco-aql.model';
import {MonacoService} from '../monaco/monaco.service';
import {TabService} from '../../core/tab.service';
import {CodePresentation} from '../editor/code-presentation.enum';
import {QueryManipulatorUtil} from './query-manipulator.util';
import {TemplateNodeQueryManipulationService} from './template-node-query-manipulation.service';
import ITextModel = monaco.editor.ITextModel;

@Injectable({
  providedIn: 'root'
})
export class QueryManipulationService {

  private readonly predefinedQueryWithVersions =
    'SELECT {placeholder}\n' +
    'FROM EHR e \n' +
    'CONTAINS VERSIONED_OBJECT vo\n' +
    'CONTAINS VERSION v[all_versions]\n' +
    'CONTAINS COMPOSITION c\n' +
    'OFFSET 0 LIMIT 10';

  private readonly predefinedQueryWithCompositionAndEhr =
    'SELECT {placeholder}\n' +
    'FROM EHR e\n' +
    'CONTAINS COMPOSITION c\n' +
    'OFFSET 0 LIMIT 10';

  private readonly predefinedRootQueryForComposition =
    'SELECT c\n' +
    'FROM EHR e\n' +
    'CONTAINS COMPOSITION c#{compositionName}\n' +
    'WHERE c/name/value=\'{compositionNameOriginal}\'\n' +
    'OFFSET 0 LIMIT 10';

  constructor(private monacoService: MonacoService,
              private tabService: TabService,
              private templateNodeQueryManipulationService: TemplateNodeQueryManipulationService) {

  }

  applyRootQuery(child: TreeNode): string {
    const currentCode = this.getCurrentCode();
    let newCode = currentCode;

    const activeEditorState = this.tabService.getActiveEditorState();
    if (!currentCode) {
      const name = QueryManipulatorUtil.sanitizeName(child);
      newCode = this.predefinedRootQueryForComposition;
      newCode = newCode.replace(/\{compositionName\}/g, name);
      newCode = newCode.replace(/\{compositionNameOriginal\}/g, child.name || child.id);
      activeEditorState.archetypeNameAndIdMap.set(name, child.nodeId);

      this.setQuery(newCode);
    } else {
      const name = QueryManipulatorUtil.sanitizeName(child);
      const compositionMatches = currentCode.toUpperCase().match(AqlLangKeyword[AqlLangKeyword.COMPOSITION]);
      if (!compositionMatches || compositionMatches.length > 1 || !compositionMatches.length) {
        return newCode;
      }

      const compositionVariableName = QueryManipulatorUtil.getVariableName(activeEditorState, AqlLangKeyword.COMPOSITION);

      if (!activeEditorState.variableToArchetypeNameMap.has(compositionVariableName)) {
        const regex = new RegExp(`COMPOSITION\\s*${compositionVariableName}`, 'g');
        newCode = currentCode.replace(regex, `COMPOSITION ${compositionVariableName}#${name}`);
        activeEditorState.archetypeNameAndIdMap.set(name, child.nodeId);
        activeEditorState.variableToArchetypeNameMap.set(compositionVariableName, name);
        this.setQuery(newCode);
      }

    }

    return newCode;
  }

  applyChanges(treeNodeModel: TreeNode, aqlLangKeyword: AqlLangKeyword): string {
    const currentCode = this.getCurrentCode();
    const editorState = this.tabService.getActiveEditorState();
    editorState.replacementMap = this.monacoService.getCleanReplacementMap(editorState.replacementMap, currentCode);

    if (!currentCode) {
      return this.applyPredefinedQuery(treeNodeModel, aqlLangKeyword);
    } else {
      let variableName = QueryManipulatorUtil.getVariableName(editorState, aqlLangKeyword);

      const isPredefinedObject = !treeNodeModel.aqlPath;
      const variableAlreadyExists = editorState.additionalKeywordVariables.has(variableName);
      if (!isPredefinedObject) {
        const code = this.templateNodeQueryManipulationService.manipulateQuery(currentCode, treeNodeModel, variableName);
        return this.setQuery(code);
      } else if (variableName && !variableAlreadyExists) {
        const code = currentCode;
        const fromIndex = code.indexOf(AqlLangKeyword.FROM);
        if (aqlLangKeyword === AqlLangKeyword.EHR) {
          const newCode = this.addEhrStatement(fromIndex, code, aqlLangKeyword, treeNodeModel, variableName);
          editorState.additionalKeywordVariables.set(variableName, AdditionalAqlAutocompleteKeyword[aqlLangKeyword]);
          return this.setQuery(newCode);
        } else if (aqlLangKeyword === AqlLangKeyword.COMPOSITION) {
          const newCode = this.addCompositionStatement(currentCode, aqlLangKeyword, variableName);
          editorState.additionalKeywordVariables.set(variableName, AdditionalAqlAutocompleteKeyword[aqlLangKeyword]);

          const codeWithSelections = this.handleSelections(newCode, variableName, treeNodeModel);
          return this.setQuery(codeWithSelections);
        } else if ([AqlLangKeyword.VERSIONED_OBJECT, AqlLangKeyword.VERSION].includes(aqlLangKeyword)) {
          const predefinedVariableName = aqlLangKeyword === AqlLangKeyword.VERSION ? 'v' : 'vo';
          variableName = QueryManipulatorUtil.getVariableName(this.tabService.getActiveEditorState(), aqlLangKeyword, predefinedVariableName);
          const newCode = this.addVersionObjectStatement(code, aqlLangKeyword, variableName);
          editorState.additionalKeywordVariables.set(variableName, AdditionalAqlAutocompleteKeyword[aqlLangKeyword]);

          const codeWithSelections = this.handleSelections(newCode, variableName, treeNodeModel);
          return this.setQuery(codeWithSelections);
        }
      } else if (variableName && variableAlreadyExists) {
        // do not do anything if root from predefined object is selected
        if (!treeNodeModel.formId || treeNodeModel.formId.indexOf('/') === -1) {
          return currentCode;
        }

        const codeWithSelections = this.handleSelections(currentCode, variableName, treeNodeModel);
        return this.setQuery(codeWithSelections);
      }

    }

  }

  getCurrentCode(): string {
    const monaco = (window as any).monaco;
    const model: ITextModel = monaco.editor.getModels()[0];
    return model.getValue().trim();
  }

  setQuery(query: string): string {
    const monaco = (window as any).monaco;
    const model: ITextModel = monaco.editor.getModels()[0];
    const editorData = this.tabService.getActiveEditorState();
    if (editorData.codePresentation === CodePresentation.BEAUTIFY) {
      query = this.monacoService.beautifyCode(query);
    } else {
      query = this.monacoService.replaceWithPaths(query);
    }

    model.setValue(query);

    return query;
  }

  private applyPredefinedQuery(treeNodeModel: TreeNode, aqlLangKeyword: AqlLangKeyword): string {
    let query = this.getPredefinedQuery(aqlLangKeyword);
    this.monacoService.setAdditionalAqlKeywords(query);

    const editorState = this.tabService.getActiveEditorState();
    const variableName = QueryManipulatorUtil.getVariableName(editorState, aqlLangKeyword);

    const isPredefinedObject = !treeNodeModel.aqlPath;
    if (!isPredefinedObject) {
      query = this.templateNodeQueryManipulationService.manipulatePredefinedQuery(query, treeNodeModel, variableName);
    } else {
      const isRoot = treeNodeModel.formId.indexOf('/') === -1;
      if (isRoot) {
        query = query.replace('{placeholder}', variableName);
      } else {
        query = query.replace('{placeholder}', variableName + treeNodeModel.formId.substring(treeNodeModel.formId.indexOf('/')));
      }
    }

    return this.setQuery(query);
  }

  private getPredefinedQuery(aqlLangKeyword: AqlLangKeyword): string {
    if ([AqlLangKeyword.VERSION, AqlLangKeyword.VERSIONED_OBJECT].includes(aqlLangKeyword)) {
      return this.predefinedQueryWithVersions;
    }

    return this.predefinedQueryWithCompositionAndEhr;
  }

  private addCompositionStatement(code: string, aqlLangKeyword: AqlLangKeyword, variableName: string): string {
    const words = code.split(/\s|\n/g);
    const {keywordAfterFromIndex, fromWordIndex} = this.getKeywordAfterFrom(words);

    if (fromWordIndex > 0) {
      if (keywordAfterFromIndex > 0 && !!AqlLangKeyword[words[keywordAfterFromIndex]]) {
        const indexOfKAfterFromCode = code.indexOf(AqlLangKeyword[words[keywordAfterFromIndex]]);
        if (code.substring(0, indexOfKAfterFromCode).endsWith('\n')) {
          code = `${code.substring(0, indexOfKAfterFromCode)}CONTAINS ${aqlLangKeyword} ${variableName}\n${code.substring(indexOfKAfterFromCode)}`;
        } else {
          code = `${code.substring(0, indexOfKAfterFromCode)}\nCONTAINS ${aqlLangKeyword} ${variableName}\n${code.substring(indexOfKAfterFromCode)}`;
        }
      } else {
        if (code.endsWith('\n')) {
          code = `${code}CONTAINS ${aqlLangKeyword} ${variableName}`;
        } else {
          code = `${code}\nCONTAINS ${aqlLangKeyword} ${variableName}`;
        }
      }
    } else {
      if (code.endsWith('\n')) {
        code = `${code}FROM ${aqlLangKeyword} ${variableName}`;
      } else {
        code = `${code}\nFROM ${aqlLangKeyword} ${variableName}`;
      }
    }

    return code;
  }

  private getKeywordAfterFrom(words: string[]): { keywordAfterFromIndex: number, fromWordIndex: number } {
    let firstKeywordAfterFrom = 0;
    let fromWordIndex = 0;
    words.forEach((w, i) => {
      if (AqlLangKeyword[w] === AqlLangKeyword.FROM) {
        fromWordIndex = i;
      }
      if (!!AqlLangKeyword[w] && fromWordIndex > 0 && i > fromWordIndex && firstKeywordAfterFrom === 0 && !AdditionalAqlAutocompleteKeyword[w]) {
        firstKeywordAfterFrom = i;
      }
    });

    return {keywordAfterFromIndex: firstKeywordAfterFrom, fromWordIndex};
  }

  private addEhrStatement(fromIndex: number, code: string, aqlLangKeyword: AqlLangKeyword, treeNodeModel: TreeNode, variableName: string): string {
    const insertIndex = fromIndex + AqlLangKeyword.FROM.length;
    if (fromIndex > -1) {
      code = `${code.substring(0, insertIndex)} ${aqlLangKeyword} ${variableName} \nCONTAINS${code.substring(insertIndex)}`;

      if (!treeNodeModel.formId || treeNodeModel.formId.indexOf('/') === -1) {
        return;
      }

      const codeWithSelections = this.handleSelections(code, variableName, treeNodeModel);
      return this.setQuery(codeWithSelections);
    }

    return code;
  }

  private handleSelections(code: string, variableName: string, treeNodeModel: TreeNode): string {
    const fromIndex = code.toUpperCase().indexOf(AqlLangKeyword.FROM);
    const selectStatementContent = code.substring(0, fromIndex).split(/\s/g);
    const newSelectItem = variableName + treeNodeModel.formId.substring(treeNodeModel.formId.indexOf('/'));
    if (!selectStatementContent.some(v => v === newSelectItem)) {
      return QueryManipulatorUtil.formatQuerySelections(code, fromIndex, newSelectItem);
    }

    return code;
  }

  private addVersionObjectStatement(code: string, aqlLangKeyword: AqlLangKeyword, variableName: string) {
    const fromIndex = code.toUpperCase().indexOf(AqlLangKeyword.FROM);
    if (fromIndex > -1) {
      let fromContent = code.toUpperCase().substring(fromIndex);
      const firstKeywordIndexAfterFrom = code.toUpperCase().substring(fromIndex + AqlLangKeyword.FROM.length)
        .split(/\s|\n/g)
        .filter(w => !!AqlLangKeyword[w] && !AdditionalAqlAutocompleteKeyword[w])[0];
      if (firstKeywordIndexAfterFrom) {
        fromContent = code.toUpperCase().substring(fromIndex, code.toUpperCase().indexOf(firstKeywordIndexAfterFrom));
      }
      let newCode = code;

      if (fromContent.indexOf(` ${AqlLangKeyword.EHR} `) > -1) {
        const contentPrefix = code.substring(0, code.toUpperCase().indexOf(AqlLangKeyword.CONTAINS));
        const contentPostfix = code.substring(code.toUpperCase().indexOf(AqlLangKeyword.CONTAINS));
        newCode = `${contentPrefix}CONTAINS ${aqlLangKeyword} ${variableName}\n${contentPostfix}`;
      } else if (fromContent.indexOf(` ${AqlLangKeyword.COMPOSITION} `) > -1) {
        const contentPrefix = code.substring(0, fromIndex + AqlLangKeyword.FROM.length);
        const contentPostfix = code.substring(fromIndex + AqlLangKeyword.FROM.length);
        newCode = `${contentPrefix} ${aqlLangKeyword} ${variableName}\nCONTAINS ${contentPostfix.trim()}`;
      }

      return newCode;
    }

    return code;
  }

}
