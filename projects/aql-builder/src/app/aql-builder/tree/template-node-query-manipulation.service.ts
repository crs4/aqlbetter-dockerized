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
import {QueryManipulatorUtil} from './query-manipulator.util';
import {AdditionalAqlAutocompleteKeyword, AqlLangKeyword} from '../monaco/monaco-aql.model';
import {MonacoAutocompleteHelper} from '../monaco/monaco-autocomplete.helper';
import {TreeNode} from '../../shared/models';
import {TabService} from '../../core/tab.service';
import {EditorData} from '../editor/editor-data.model';
import {InsertLimitationKeywords} from './insert-limitation-keywords.enum';
import {RmType} from '../../shared/models/rm-type.enum';

@Injectable({
  providedIn: 'root'
})
export class TemplateNodeQueryManipulationService {

  constructor(private tabService: TabService) { }

  manipulateQuery(currentCode: string, treeNodeModel: TreeNode, variableName: string): string {
    const editorState = this.tabService.getActiveEditorState();
    let code = currentCode;

    const firstArchetype = QueryManipulatorUtil.findFirstArchetype(treeNodeModel);

    variableName = this.resolveVariableName(variableName, editorState, firstArchetype);

    const variableAlreadyExists = editorState.additionalKeywordVariables.has(variableName);
    if (!variableAlreadyExists) {
      code = this.addNewKeyword(code, firstArchetype, treeNodeModel, variableName);
      editorState.archetypeNameAndIdMap.set(QueryManipulatorUtil.sanitizeName(firstArchetype), firstArchetype.nodeId);
      editorState.additionalKeywordVariables.set(variableName, AdditionalAqlAutocompleteKeyword[firstArchetype.rmType]);
    }

    let childName = QueryManipulatorUtil.sanitizeName(treeNodeModel);
    if (this.nameAlreadyExists(editorState, variableName, childName, treeNodeModel)) {
      childName = this.getChildNameWithParents(editorState, treeNodeModel, childName, variableName);
    }

    const newEntry = this.addToReplacementMap(firstArchetype, treeNodeModel, variableName, childName);
    if (!newEntry) {
      return code;
    }

    if (variableName) {
      const newSelectItem = editorState.archetypeNameAndIdMap.get(childName) ? variableName : `${variableName}/${childName}`;
      const fromRegex = new RegExp('\\b' + AqlLangKeyword.FROM + '\\b');
      const fromIndex = code.toUpperCase().search(fromRegex);
      const containsRegex = new RegExp('\\b' + AqlLangKeyword.CONTAINS + '\\b');
      const containsIndex = code.toUpperCase().search(containsRegex);
      const indexToUse = fromIndex > -1 ? fromIndex : containsIndex;

      return QueryManipulatorUtil.formatQuerySelections(code, indexToUse, newSelectItem);
    }
  }

  manipulatePredefinedQuery(query: string, treeNodeModel: TreeNode, variableName: string): string {
    const editorState = this.tabService.getActiveEditorState();
    const childName = QueryManipulatorUtil.sanitizeName(treeNodeModel);
    const compositionRegex = new RegExp('\\b' + AqlLangKeyword.COMPOSITION + '\\b');
    const indexOfComposition = query.search(compositionRegex);
    const endOfCompositionIndex = query.substring(indexOfComposition).indexOf('\n') + 1;
    const indexSum = indexOfComposition + endOfCompositionIndex;

    const firstArchetype = QueryManipulatorUtil.findFirstArchetype(treeNodeModel);
    const firstArchetypeSanitizedName = QueryManipulatorUtil.sanitizeName(firstArchetype);

    editorState.archetypeNameAndIdMap.set(firstArchetypeSanitizedName, firstArchetype.nodeId);
    editorState.variableToArchetypeNameMap.set(variableName, firstArchetypeSanitizedName);

    if (editorState.additionalKeywordVariables.has(variableName)) {
      const substring = `CONTAINS ${firstArchetype.rmType} ${variableName}`;
      query = query.replace(substring, `CONTAINS ${firstArchetype.rmType} ${variableName}#${firstArchetypeSanitizedName}`);
    } else if (firstArchetype.rmType === RmType.COMPOSITION
      && Array.from(editorState.additionalKeywordVariables.values()).includes(AdditionalAqlAutocompleteKeyword[AdditionalAqlAutocompleteKeyword.COMPOSITION])) {
      variableName = QueryManipulatorUtil.getVariableName(editorState, AqlLangKeyword.COMPOSITION, variableName);
      query = `${query.substring(0, indexOfComposition + AqlLangKeyword.COMPOSITION.length)} ${variableName}#${firstArchetypeSanitizedName} \n${query.substring(indexSum)}`;
    } else {
      query = `${query.substring(0, indexSum)}CONTAINS ${firstArchetype.rmType} ${variableName}#${firstArchetypeSanitizedName} \n${query.substring(indexSum)}`;
    }

    if (firstArchetype !== treeNodeModel) {
      const treeNodeModelAqlPath = treeNodeModel.aqlPath.replace(firstArchetype.aqlPath, '');
      editorState.addReplacementItem(`${variableName}/${childName}`, treeNodeModelAqlPath);
      query = query.replace('{placeholder}', `${variableName}/${childName}`);
    } else {
      query = query.replace('{placeholder}', `${variableName}`);
    }

    editorState.additionalKeywordVariables.set(variableName, AdditionalAqlAutocompleteKeyword[firstArchetype.rmType]);

    return query;
  }

  private resolveVariableName(variableName: string, editorState: EditorData, firstArchetype: TreeNode): string {
    const firstArchetypeSanitizedName = QueryManipulatorUtil.sanitizeName(firstArchetype);
    if (editorState.archetypeNameAndIdMap.has(firstArchetypeSanitizedName)) {
      editorState.variableToArchetypeNameMap.forEach((v, k) => {
        if (v === firstArchetypeSanitizedName) {
          variableName = k;
        }
      });
    } else {
      const currentVariableName = variableName;
      variableName = QueryManipulatorUtil.getVariableName(editorState, AqlLangKeyword[firstArchetype.rmType], variableName);
      const generalVariableAlreadyExists = currentVariableName !== variableName;

      if (!generalVariableAlreadyExists || editorState.variableToArchetypeNameMap.has(variableName)) {
        variableName = QueryManipulatorUtil.getVariableName(editorState);
      }
    }

    return variableName;
  }

  private addParentArchetype(parentArchetype: TreeNode, editorState: EditorData, codePart: string) {
    if (!parentArchetype) {
      return codePart;
    }

    const parentArchetypeSanitizedName = QueryManipulatorUtil.sanitizeName(parentArchetype);
    const parentArchetypeAlreadyExists = editorState.archetypeNameAndIdMap.has(parentArchetypeSanitizedName);
    if (!parentArchetypeAlreadyExists && parentArchetype.rmType !== RmType.COMPOSITION) {
      const partToExistingArchetypeContainsIndex = codePart.lastIndexOf(AqlLangKeyword.CONTAINS);
      const subsection = codePart.substring(0, partToExistingArchetypeContainsIndex);
      const subsectionPost = codePart.substring(partToExistingArchetypeContainsIndex);
      const parentVariable = QueryManipulatorUtil.getVariableName(editorState);
      editorState.archetypeNameAndIdMap.set(parentArchetypeSanitizedName, parentArchetype.nodeId);
      editorState.variableToArchetypeNameMap.set(parentVariable, parentArchetypeSanitizedName);
      editorState.additionalKeywordVariables.set(parentVariable, AdditionalAqlAutocompleteKeyword[parentArchetype.rmType]);
      editorState.archetypeNameAndIdMap.set(parentArchetypeSanitizedName, parentArchetype.nodeId);
      codePart = `${subsection}${AqlLangKeyword.CONTAINS} ${parentArchetype.rmType} ${parentVariable}#${parentArchetypeSanitizedName}\n${subsectionPost}`;
    }

    return codePart;
  }

  private addChildArchetype(childArchetype: TreeNode, editorState: EditorData, codePart: string, variableName: string) {
    if (!childArchetype) {
      return codePart;
    }

    const childArchetypeSanitizedName = QueryManipulatorUtil.sanitizeName(childArchetype);
    editorState.archetypeNameAndIdMap.set(childArchetypeSanitizedName, childArchetype.nodeId);
    editorState.variableToArchetypeNameMap.set(variableName, childArchetypeSanitizedName);
    editorState.additionalKeywordVariables.set(variableName, AdditionalAqlAutocompleteKeyword[childArchetype.rmType]);
    editorState.archetypeNameAndIdMap.set(childArchetypeSanitizedName, childArchetype.nodeId);
    codePart = `${codePart} ${AqlLangKeyword.CONTAINS} (${childArchetype.rmType} ${variableName}#${childArchetypeSanitizedName})`;

    return codePart;
  }

  private applyNewContainsAtTheEnd(code: string, variableName: string, insertIndex: number, archetype: TreeNode) {
    const firstArchetypeSanitizedName = QueryManipulatorUtil.sanitizeName(archetype);
    const prefix = code.substring(0, insertIndex);
    const sanitizedPrefix = prefix.endsWith('\n') ? prefix : `${prefix}\n`;

    return `${sanitizedPrefix}CONTAINS ${archetype.rmType} ${variableName}#${firstArchetypeSanitizedName} \n${code.substring(insertIndex)}`;
  }

  private findCodeInsertIndex(code: string): number | null {
    const sanitizedCode = code.toUpperCase();
    const indexOfContains = sanitizedCode.lastIndexOf(AqlLangKeyword.CONTAINS) > -1 ? sanitizedCode.lastIndexOf(AqlLangKeyword.CONTAINS) + AqlLangKeyword.CONTAINS.length : -1;

    if (indexOfContains > -1) {
      const substring = sanitizedCode.substring(indexOfContains);
      const words = substring.split(/\s|\n/g);
      let nextIndex = 0;

      for (const word of words) {
        if (InsertLimitationKeywords[word] !== undefined) {
          nextIndex = substring.indexOf(word);
          break;
        }
      }

      if (nextIndex) {
        return indexOfContains + nextIndex;
      } else {
        return indexOfContains + substring.length;
      }
    } else {
      const indexOfFrom = sanitizedCode.lastIndexOf(AqlLangKeyword.FROM) > -1 ? sanitizedCode.lastIndexOf(AqlLangKeyword.FROM) + AqlLangKeyword.FROM.length : -1;
      if (indexOfFrom > -1) {
        const substring = sanitizedCode.substring(indexOfFrom);
        const words = substring.split(/\s|\n/g);
        let nextIndex;

        for (const word of words) {
          if (InsertLimitationKeywords[word] !== undefined) {
            nextIndex = substring.indexOf(word);
          }
        }

        if (nextIndex) {
          return indexOfFrom + nextIndex;
        } else {
          return indexOfFrom + substring.length;
        }
      }
    }


    return null;
  }

  private getChildNameWithParents(editorState: EditorData, treeNodeModel: TreeNode, name: string, variableName: string) {
    const parent = treeNodeModel.parentModel;
    if (parent && (!parent.nodeId || parent.nodeId && !parent.nodeId.startsWith('openEHR'))) {
      if (this.nameAlreadyExists(editorState, variableName, name, treeNodeModel)) {
        return this.getChildNameWithParents(editorState, parent, `${QueryManipulatorUtil.sanitizeName(parent)}_${name}`, variableName);
      }
    }

    return name;
  }

  private nameAlreadyExists(editorState: EditorData, variableName: string, childName: string, treeNodeModel: TreeNode): boolean {
    const nameAlreadyExists = Array.from(editorState.replacementMap.keys())
      .some(k => k.split(MonacoAutocompleteHelper.nameAndPathDelimiter)[0] === `${variableName}${MonacoAutocompleteHelper.propertyAutocompleteCharacter}${childName}`);

    const firstArchetype = QueryManipulatorUtil.findFirstArchetype(treeNodeModel);
    const aqlPathAlreadyExists = Array.from(editorState.replacementMap.values())
      .some(v => v === treeNodeModel.aqlPath || `${firstArchetype.aqlPath}${v}` === treeNodeModel.aqlPath);
    return nameAlreadyExists && !aqlPathAlreadyExists;
  }

  private addNewKeyword(code: string, firstArchetype: TreeNode, treeNodeModel: TreeNode, variableName: string): string {
    const editorState = this.tabService.getActiveEditorState();
    const currentCode = code;
    const insertIndex = this.findCodeInsertIndex(code);
    const firstArchetypeSanitizedName = QueryManipulatorUtil.sanitizeName(firstArchetype);

    const parentArchetype = QueryManipulatorUtil.findFirstArchetype(firstArchetype.parentModel);

    const archetypeWithTheSameAncestor = QueryManipulatorUtil.findArchetypeWithTheSameAncestor(firstArchetype, editorState);
    const existingArchetype = QueryManipulatorUtil.findChild(archetypeWithTheSameAncestor, editorState);

    if (!existingArchetype) {
      code = this.applyNewContainsAtTheEnd(code, variableName, insertIndex, firstArchetype);
    } else {
      if (QueryManipulatorUtil.isAncestor(firstArchetype, existingArchetype)) {
        // vrstni red
        const archetypeIndexAndTextLength = this.getIndexAndTextLengthOfArchetype(currentCode, existingArchetype);
        const arcInsertIndex = archetypeIndexAndTextLength.index + archetypeIndexAndTextLength.textLength;
        const partToExistingArchetype = currentCode.substring(0, arcInsertIndex);
        const partToExistingArchetypeSanitized = partToExistingArchetype.toUpperCase();
        const potFromExistingArchetype = currentCode.substring(arcInsertIndex);
        const pre = partToExistingArchetype.substring(0, partToExistingArchetypeSanitized.lastIndexOf(AqlLangKeyword.CONTAINS));
        const post = partToExistingArchetype.substring(partToExistingArchetypeSanitized.lastIndexOf(AqlLangKeyword.CONTAINS)) + potFromExistingArchetype;

        code = `${pre}${AqlLangKeyword.CONTAINS} ${firstArchetype.rmType} ${variableName}#${firstArchetypeSanitizedName}\n${post}`;
      } else if (!QueryManipulatorUtil.isAncestor(existingArchetype, treeNodeModel)) {
        const archetypeIndexAndTextLength = this.getIndexAndTextLengthOfArchetype(currentCode, existingArchetype);
        let existingArchetypePrefix = currentCode.substring(0, archetypeIndexAndTextLength.index + archetypeIndexAndTextLength.textLength);
        existingArchetypePrefix = this.addParentArchetype(parentArchetype, editorState, existingArchetypePrefix);

        const existingArchetypePostfix = currentCode.substring(archetypeIndexAndTextLength.index + archetypeIndexAndTextLength.textLength);

        const prefixLastIndexOfContains = existingArchetypePrefix.toUpperCase().lastIndexOf(AqlLangKeyword.CONTAINS);

        const modifiedCurrentCode = existingArchetypePrefix + existingArchetypePostfix;
        let allContent = modifiedCurrentCode.substring(prefixLastIndexOfContains, this.findCodeInsertIndex(modifiedCurrentCode));
        allContent = allContent.substring(allContent.indexOf(AqlLangKeyword.CONTAINS) + AqlLangKeyword.CONTAINS.length).trim();

        let closingBrackets = '';
        if (allContent.startsWith('(')) {
          closingBrackets = this.getClosingStatementBrackets(allContent);

          allContent = allContent
            .replace(/\(/g, '')
            .replace(/\)/g, '');
        }

        const content = `${AqlLangKeyword.CONTAINS} (${allContent} and ${firstArchetype.rmType} ${variableName}#${firstArchetypeSanitizedName})${closingBrackets} \n${code.substring(insertIndex)}`;
        existingArchetypePrefix = existingArchetypePrefix.substring(0, prefixLastIndexOfContains);

        code = `${existingArchetypePrefix}${content}`;
      } else if (QueryManipulatorUtil.isAncestor(existingArchetype, firstArchetype)) {
        const archetypeIndexAndTextLength = this.getIndexAndTextLengthOfArchetype(currentCode, existingArchetype);
        let existingArchetypePrefix = currentCode.substring(0, archetypeIndexAndTextLength.index + archetypeIndexAndTextLength.textLength);
        existingArchetypePrefix = this.addChildArchetype(firstArchetype, editorState, existingArchetypePrefix, variableName);

        const existingArchetypePostfix = currentCode.substring(archetypeIndexAndTextLength.index + archetypeIndexAndTextLength.textLength);

        const modifiedCurrentCode = existingArchetypePrefix + existingArchetypePostfix;
        code = `${modifiedCurrentCode}`;
      } else {
        code = this.applyNewContainsAtTheEnd(code, variableName, insertIndex, firstArchetype);
      }
    }

    return code;
  }

  private addToReplacementMap(firstArchetype: TreeNode, treeNodeModel: TreeNode, variableName: string, childName: string): string | null {
    const editorState = this.tabService.getActiveEditorState();
    const value = firstArchetype !== treeNodeModel ? treeNodeModel.aqlPath.replace(firstArchetype.aqlPath, '') : treeNodeModel.aqlPath;
    if (variableName) {
      const replacementMapKey = `${variableName}/${childName}${MonacoAutocompleteHelper.nameAndPathDelimiter}${value}`;
      if (!editorState.replacementMap.has(replacementMapKey)) {
        editorState.addReplacementItem(`${variableName}/${childName}`, value);
        return `${variableName}/${childName}`;
      }
    } else {
      const replacementMapKey = `${childName}${MonacoAutocompleteHelper.nameAndPathDelimiter}${value}`;
      if (!editorState.replacementMap.has(replacementMapKey)) {
        editorState.addReplacementItem(`${childName}`, value);
        return `${variableName}/${childName}`;
      }
    }

    return null;
  }

  private getIndexAndTextLengthOfArchetype(code: string, archetype: TreeNode): {index: number, textLength: number} {
    const archetypeSanitizedName = QueryManipulatorUtil.sanitizeName(archetype);
    if (code.indexOf(`#${archetypeSanitizedName}`) > -1) {
      return {index: code.indexOf(`#${archetypeSanitizedName}`), textLength: `#${archetypeSanitizedName}`.length};
    } else if (code.indexOf(`[${archetype.nodeId}]`) > -1) {
      return {index: code.indexOf(`[${archetype.nodeId}]`), textLength: `[${archetype.nodeId}]`.length};
    }

    return {index: -1, textLength: 0};
  }

  private getClosingStatementBrackets(allContent: string): string {
    const bracketsInFront = allContent.match(new RegExp(/\(/, 'g')) || [];
    const closingBrackets = allContent.match(new RegExp(/\)/, 'g')) || [];

    bracketsInFront.forEach(_ => closingBrackets.splice(0, 1));
    return closingBrackets?.join('') || '';
  }
}
