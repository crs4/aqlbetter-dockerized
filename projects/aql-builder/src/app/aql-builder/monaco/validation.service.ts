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
import {MonacoAutocompleteHelper} from './monaco-autocomplete.helper';
import {AdditionalAqlAutocompleteKeyword, AqlLangKeyword} from './monaco-aql.model';
import {HttpErrorResponse} from '@angular/common/http';
import {TabService} from '../../core/tab.service';
import {MonacoService} from './monaco.service';
import ITextModel = monaco.editor.ITextModel;
import IMarkerData = monaco.editor.IMarkerData;

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  private readonly markerOwner = 'aql';
  private sanitizedModelValue: string;
  private readonly selectKeywordVariablesWhitelist = [
    AqlLangKeyword.COUNT, AqlLangKeyword.TOP,
    AqlLangKeyword.MAX, AqlLangKeyword.MIN,
    AqlLangKeyword.AVG, AqlLangKeyword.DISTINCT,
    AqlLangKeyword.SQUASH, AqlLangKeyword.TAGS,
    AqlLangKeyword.CONCAT
  ];
  private readonly endKeywordsWhiteList = [
    AqlLangKeyword.DESC,
    AqlLangKeyword.DESCENDING,
    AqlLangKeyword.ASC,
    AqlLangKeyword.ASCENDING
  ];

  constructor(private tabService: TabService,
              private monacoService: MonacoService) {
  }

  validate() {
    const monaco = (window as any).monaco;
    const modelMarkers: IMarkerData[] = [];
    if (!monaco) {
      return;
    }
    const model: ITextModel = monaco.editor.getModels()[0];

    // always clear model markers
    monaco.editor.setModelMarkers(model, this.markerOwner, []);

    if (!model.getValue()) {
      return;
    }

    this.sanitizedModelValue = model.getValue().toUpperCase();


    this.validateTransitionItems(model, modelMarkers);
    this.validateCommas(model, modelMarkers);
    this.validateVariables(model, modelMarkers);
    this.eofValidate(model, modelMarkers);

    if (modelMarkers.length) {
      monaco.editor.setModelMarkers(model, this.markerOwner, [modelMarkers[0]]);
    }
  }

  clearModelMarkers() {
    const monaco = (window as any).monaco;
    const model: ITextModel = monaco.editor.getModels()[0];
    monaco.editor.setModelMarkers(model, this.markerOwner, []);
  }

  areAqlParamsValid(regExpMatchArray: RegExpMatchArray, providedParams: Map<string, string | number>): boolean {
    if (!regExpMatchArray || regExpMatchArray && !regExpMatchArray.length) {
      return true;
    }

    const code = this.tabService.getActiveEditorState().code;

    const paramArrayWithoutCommentedParams = [];
    regExpMatchArray.forEach(param => {
      const key = param.split(':')[1];
      const isCommented = this.monacoService.isWordCommented(code, key);
      if (!isCommented && !paramArrayWithoutCommentedParams.includes(param)) {
        paramArrayWithoutCommentedParams.push(param);
      }
    });

    return paramArrayWithoutCommentedParams.length <= providedParams.size && !Array.from(providedParams.values()).some(v => !!v === false && typeof v !== 'number');
  }

  createModelMarkerFromServerErrorResponse(error: HttpErrorResponse) {
    const monaco = (window as any).monaco;
    const model: ITextModel = monaco.editor.getModels()[0];

    // always clear model markers
    monaco.editor.setModelMarkers(model, this.markerOwner, []);

    const positionData: ModelMarkerPositionData = {
      startLineNumber: 1,
      startColumn: 1,
      endLineNumber: model.getLineCount(),
      endColumn: model.getLineContent(model.getLineCount()).length
    };

    const modelMarker = this.createModelMarker(positionData, `${error.error.exceptionMessage} \n(Error code: ${error.error['code']})`);
    monaco.editor.setModelMarkers(model, this.markerOwner, [modelMarker]);
  }

  private validateTransitionItems(model: ITextModel, modelMarkers: monaco.editor.IMarkerData[]) {
    const words = this.sanitizedModelValue.split(/\s+/g);
    const firstWord = words[0];

    if (!this.isFirstWordValid(firstWord)) {
      modelMarkers.push({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: 1,
        endColumn: firstWord.length + 1,
        message: `Aql query should start with keyword ${AqlLangKeyword.SELECT}`,
        severity: monaco.MarkerSeverity.Error
      });

      return;
    }

    const notEmptyWords = words
      .map(v => v.replace(/\(/g, ''))
      .map(w => w ? w.trim() : w)
      .filter(w => !!w);
    this.validateAqlLangKeywordTransitions(model, notEmptyWords, modelMarkers);

    notEmptyWords.forEach((word, index) => {
      if (AqlLangKeyword[word] === AqlLangKeyword.SELECT) {
        const onlyKeywords = notEmptyWords.filter(w => !!AqlLangKeyword[w]);
        const selectIndex = onlyKeywords.findIndex(w => w === AqlLangKeyword.SELECT);
        const proposalLabels = MonacoAutocompleteHelper.getTransitionMap().get(AqlLangKeyword[word]).map(p => p.label);

        if (proposalLabels.indexOf(AqlLangKeyword[onlyKeywords[selectIndex + 1]]) === -1) {
          const markerPosition = this.getModelMarkerPositionData(model, notEmptyWords, index, true);
          const message = `${onlyKeywords[selectIndex]} keyword must be followed by one of the following items ${proposalLabels}`;
          modelMarkers.push(this.createModelMarker(markerPosition, message));
        }
      }

      if (MonacoAutocompleteHelper.getTransitionMap().has(AqlLangKeyword[word]) && AqlLangKeyword[word] !== AqlLangKeyword.SELECT) {
        const proposalLabels = MonacoAutocompleteHelper.getTransitionMap().get(AqlLangKeyword[word]).map(p => p.label);
        const message = `${word} keyword must be followed by one of the following items ${proposalLabels}`;

        const indexOfFirstKeyword = this.getIndexOfFirstKeyword(index + 1, notEmptyWords);
        if (proposalLabels.indexOf(AqlLangKeyword[notEmptyWords[indexOfFirstKeyword]]) === -1) {
          let markerPositionData = this.getModelMarkerPositionData(model, notEmptyWords, index);

          const isFollowingKeywordRequired = this.requiredFollowingKeywords().get(word);
          if (isFollowingKeywordRequired) {
            modelMarkers.push(this.createModelMarker(markerPositionData, message));
          }

          const followingKeywords = notEmptyWords.slice(index + 1).filter(w => !!AqlLangKeyword[w]);
          if (followingKeywords) {
            for (let keyword of followingKeywords) {
              const i = followingKeywords.indexOf(AqlLangKeyword.BY);
              if (keyword === AqlLangKeyword.BY) {
                if ([AqlLangKeyword.ORDER, AqlLangKeyword.TAGGED].includes(AqlLangKeyword[followingKeywords[i - 1]])) {
                  keyword = `${followingKeywords[i - 1]} ${keyword}`;
                }
              } else if ([AqlLangKeyword.ORDER, AqlLangKeyword.TAGGED].includes(AqlLangKeyword[keyword])) {
                const keywordIndex = followingKeywords.indexOf(keyword);
                if (followingKeywords[keywordIndex + 1] === AqlLangKeyword.BY) {
                  keyword = `${keyword} ${followingKeywords[keywordIndex + 1]}`;
                }
              }

              if (proposalLabels.indexOf(keyword) === -1) {
                markerPositionData = this.getModelMarkerPositionData(model, followingKeywords, i);
                modelMarkers.push(this.createModelMarker(markerPositionData, message));
              } else {
                return;
              }
            }
          }

        }
      }

      const nextWord = notEmptyWords[index + 1] ? notEmptyWords[index + 1].trim() : undefined;
      if ([AqlLangKeyword.OFFSET, AqlLangKeyword.LIMIT].includes(AqlLangKeyword[word])
        && nextWord && (isNaN(+nextWord) && !nextWord.startsWith(':'))) {

        const message = `${word} keyword must be followed by numeric value`;
        const markerPositionData = this.getModelMarkerPositionData(model, notEmptyWords, index);
        modelMarkers.push(this.createModelMarker(markerPositionData, message));

      }
    });
  }

  private validateVariables(model: monaco.editor.ITextModel, modelMarkers: monaco.editor.IMarkerData[]) {
    const selectIndex = this.sanitizedModelValue.indexOf(AqlLangKeyword.SELECT);
    const fromIndex = this.sanitizedModelValue.indexOf(AqlLangKeyword.FROM);
    if (selectIndex === -1 || fromIndex === -1) {
      return;
    }
    const substring = model.getValue().substring(selectIndex + AqlLangKeyword.SELECT.length, fromIndex).trim();
    const variables = new Set(substring.trim()
      .split(/[,()]/g)
      .map(v => {
        MonacoAutocompleteHelper.escapedSelections.forEach(keyword => {
          v = v.replace(keyword, '')
            .replace(keyword.toLowerCase(), '')
            .replace(/\(/g, '')
            .replace(/\)/g, '');
        });
        return v.trim();
      })
      .map(v => v.trim())
      .filter(v => !!v)
      .map(v => v.split(/\s+[aASs]|[#]/g)[0].trim())
      .map(v => v.split(/\//g)[0])
      .filter(v => !v.startsWith('\'') && !v.startsWith('\"') && !v.endsWith('\"') && !v.endsWith('\'')
        && !v.startsWith(AqlLangKeyword[AqlLangKeyword.AS]) && !v.startsWith(AqlLangKeyword[AqlLangKeyword.AS].toLowerCase()))
    );

    variables.forEach(v => {
      v.split(/\s/g).forEach(value => {
        const isCommented = value.startsWith(MonacoAutocompleteHelper.commentPattern);
        if (!isNaN(+value) || this.selectKeywordVariablesWhitelist.includes(AqlLangKeyword[value.toUpperCase()]) || isCommented) {
          return;
        }

        if (!this.tabService.getActiveEditorState().additionalKeywordVariables.has(value)) {

          const newLines = substring.match(/\n/g) || [];
          newLines.forEach((nl, index) => {
            const lineContent = model.getLineContent(index + 1);
            const variablePosition = this.getVariablePositionInLine(value, lineContent);
            if (lineContent.indexOf(value) > -1) {
              modelMarkers.push({
                startLineNumber: index,
                startColumn: variablePosition + 2,
                endLineNumber: index,
                endColumn: variablePosition + 3,
                message: `Parameter ${value} is not defined`,
                severity: monaco.MarkerSeverity.Error
              });
            }
          });

          if (!newLines.length) {
            const lineContent = model.getLineContent(1);
            const variablePosition = this.getVariablePositionInLine(value, lineContent);
            modelMarkers.push({
              startLineNumber: 1,
              startColumn: variablePosition + 2,
              endLineNumber: 1,
              endColumn: variablePosition + 3,
              message: `Parameter ${value} is not defined`,
              severity: monaco.MarkerSeverity.Error
            });
          }
        }
      });
    });

  }

  private eofValidate(model: monaco.editor.ITextModel, modelMarkers: monaco.editor.IMarkerData[]) {
    const value = this.sanitizedModelValue.split(/\s+/g) ? this.sanitizedModelValue.split(/\s+/g).map(v => v.toUpperCase()) : [this.sanitizedModelValue];
    const words = value.filter(w => !!w);
    const newLines = this.sanitizedModelValue.match(/\n/g) ? this.sanitizedModelValue.match(/\n/g).length + 1 : 1;
    const startColumn = model.getLineContent(newLines).length;

    const modelMarker = {
      startLineNumber: newLines,
      startColumn,
      endLineNumber: newLines,
      endColumn: startColumn,
      message: `Missing parameter at EOF`,
      severity: monaco.MarkerSeverity.Error
    };

    const keywords = words.filter(w => !!w && !!AqlLangKeyword[w]);
    const lastKeyword = keywords[keywords.length - 1];

    if (this.endKeywordsWhiteList.indexOf(AqlLangKeyword[lastKeyword]) > -1) {
      return;
    }

    const validLastKeywordsInExpression = [AqlLangKeyword.WHERE, AqlLangKeyword.AND, AqlLangKeyword.OR];
    if (AdditionalAqlAutocompleteKeyword[lastKeyword] === undefined && words.indexOf(lastKeyword) === words.length - 1) {
      modelMarkers.push(modelMarker);
    } else if (AqlLangKeyword[words[words.length - 2]] === undefined && !validLastKeywordsInExpression.includes(AqlLangKeyword[lastKeyword])) {
      modelMarkers.push(modelMarker);
    }

    if (lastKeyword === AqlLangKeyword.WHERE) {
      const whereClause = this.sanitizedModelValue.substring(this.sanitizedModelValue.indexOf(lastKeyword), this.sanitizedModelValue.length);
      if (!whereClause) {
        modelMarkers.push(modelMarker);
      } else if (!this.isWhereClauseValid(whereClause)) {
        modelMarkers.push(modelMarker);
      }
    }

  }

  private getModelMarkerPositionData(model: ITextModel, words: string[], index: number, onlyKeywords?: boolean): ModelMarkerPositionData {
    let startLineNumber = 1;
    let nextWord = words[index + 1] ? words[index + 1] : words[index];
    let nextWordIndex = this.sanitizedModelValue.indexOf(nextWord);
    let newLines = this.sanitizedModelValue.substring(0, nextWordIndex).match(/\n/g);

    if (onlyKeywords) {
      const keywords = words.filter(w => !!AqlLangKeyword[w]);
      const selectIndex = keywords.findIndex(k => k === words[index]);
      nextWord = keywords[selectIndex + 1] ? keywords[selectIndex + 1] : keywords[selectIndex];
      nextWordIndex = this.sanitizedModelValue.indexOf(nextWord);
      newLines = this.sanitizedModelValue.substring(0, nextWordIndex).match(/\n/g);
    }

    if (newLines) {
      startLineNumber = newLines.length + 1;
    }

    const startColumn = model.getLineContent(startLineNumber).toUpperCase().indexOf(nextWord.toUpperCase()) + 1;
    const endColumn = nextWord ? startColumn + nextWord.length : startColumn;

    const endLineNumber = newLines ? newLines.length : 1;

    return {startLineNumber, startColumn, endLineNumber, endColumn};
  }

  private requiredFollowingKeywords(): Map<String, boolean> {
    const shouldBeFollowed = new Map<String, boolean>();
    shouldBeFollowed.set(AqlLangKeyword.SELECT, true);
    shouldBeFollowed.set(AqlLangKeyword.FROM, false);
    shouldBeFollowed.set(AqlLangKeyword.CONTAINS, true);
    shouldBeFollowed.set(AqlLangKeyword.WHERE, false);
    shouldBeFollowed.set(AqlLangKeyword.ORDER, true);

    return shouldBeFollowed;
  }

  private createModelMarker(positionData: ModelMarkerPositionData, message: string, severity = monaco.MarkerSeverity.Error): IMarkerData {
    return {
      startLineNumber: positionData.startLineNumber,
      startColumn: positionData.startColumn,
      endLineNumber: positionData.endLineNumber,
      endColumn: positionData.endColumn,
      message,
      severity
    };
  }

  private getIndexOfFirstKeyword(index: number, notEmptyWords: string[]) {
    if (!notEmptyWords[index]) {
      return -1;
    }

    if (!!AqlLangKeyword[notEmptyWords[index]]) {
      return index;
    }

    return this.getIndexOfFirstKeyword(index + 1, notEmptyWords);
  }

  private getVariablePositionInLine(variable: string, lineContent: string) {
    if (lineContent.indexOf(` ${variable}`) > -1) {
      return lineContent.indexOf(` ${variable}`);
    } else if (lineContent.indexOf(` ${variable} `) > -1) {
      return lineContent.indexOf(` ${variable} `);
    } else if (lineContent.indexOf(` ${variable}\n`) > -1) {
      return lineContent.indexOf(` ${variable}\n`);
    } else if (lineContent.indexOf(`(${variable})`) > -1) {
      return lineContent.indexOf(`(${variable})`);
    } else if (lineContent.indexOf(`(${variable}) `) > -1) {
      return lineContent.indexOf(`(${variable}) `);
    } else if (lineContent.indexOf(`(${variable})\n`) > -1) {
      return lineContent.indexOf(`(${variable})\n`);
    } else if (lineContent.indexOf(` ${variable}${MonacoAutocompleteHelper.propertyAutocompleteCharacter}`) > -1) {
      return lineContent.indexOf(` ${variable}${MonacoAutocompleteHelper.propertyAutocompleteCharacter}`);
    } else if (lineContent.indexOf(` ${variable}${MonacoAutocompleteHelper.propertyAutocompleteCharacter}`) > -1) {
      return lineContent.indexOf(` ${variable}${MonacoAutocompleteHelper.propertyAutocompleteCharacter}`);
    } else {
      return -1;
    }
  }

  private isWhereClauseValid(whereClause: string) {
    const whereClauseWords = whereClause && whereClause.trim()
      .split(' ')
      .map(v => v.trim())
      .filter(v => !!v);

    return whereClauseWords && whereClauseWords.length >= 2 && whereClauseWords.length <= 4;
  }

  private validateCommas(model: monaco.editor.ITextModel, modelMarkers: monaco.editor.IMarkerData[]) {
    const lineContents = this.sanitizedModelValue.split('\n');
    lineContents.forEach((v, index) => {
      if (v.indexOf(',') === -1) {
        return;
      }

      v.split(',')
        .map(word => word.trim())
        .forEach((value, i) => {
          const words = value.split(' ');
          const lineIndex = index + 1;
          let addMarker = false;
          if (i === 0) {
            const lastWord = words[words.length - 1];
            if (!!AqlLangKeyword[lastWord]) {
              addMarker = true;
            }
          } else if (!!AqlLangKeyword[words[0]] || (!words[0] && AqlLangKeyword[lineContents[lineIndex]] && !!AqlLangKeyword[lineContents[lineIndex].trim().split(' ')[0]])) {
            addMarker = true;
          }

          if (addMarker) {
            modelMarkers.push({
              startLineNumber: lineIndex,
              startColumn: model.getLineContent(lineIndex).indexOf(',') + 1,
              endLineNumber: lineIndex,
              endColumn: model.getLineContent(lineIndex).indexOf(',') + 2,
              message: `Comma is not allowed here`,
              severity: monaco.MarkerSeverity.Error
            });
          }
      });
    });
  }

  private validateAqlLangKeywordTransitions(model: ITextModel, notEmptyWords: string[], modelMarkers: IMarkerData[]) {
    notEmptyWords.forEach((w, i) => {
      if (i > 0) {
        const validPredecessorKeywords = [AqlLangKeyword.FROM, AqlLangKeyword.CONTAINS, AqlLangKeyword.AND, AqlLangKeyword.OR, AqlLangKeyword.AS, AqlLangKeyword.TOP];
        // if word is number, take it's predecessor (i.e. TOP 1 - use TOP for comparison)
        const keyword = isNaN(+notEmptyWords[i - 1]) ? notEmptyWords[i - 1] : notEmptyWords[i - 2];
        if (!!AdditionalAqlAutocompleteKeyword[w] && !validPredecessorKeywords.includes(AqlLangKeyword[keyword])) {
          const markerPositionData = this.getModelMarkerPositionData(model, notEmptyWords, i - 1);
          const message = `Aql keyword ${w} should follow ${AqlLangKeyword.FROM} or ${AqlLangKeyword.CONTAINS} keyword`;
          modelMarkers.push(this.createModelMarker(markerPositionData, message));
        }
      }
    });
  }

  private isFirstWordValid(firstWord: string): boolean {
    return !!firstWord && (
      firstWord === AqlLangKeyword.SELECT ||
      firstWord.includes('<#') ||
      firstWord.startsWith('--'));
  }
}


interface ModelMarkerPositionData {
  startLineNumber: number;
  startColumn: number;
  endLineNumber: number;
  endColumn: number;
}
