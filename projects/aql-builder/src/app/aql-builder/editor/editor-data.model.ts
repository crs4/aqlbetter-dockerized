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

import {AdditionalAqlAutocompleteKeyword} from '../monaco/monaco-aql.model';
import {MonacoAutocompleteHelper} from '../monaco/monaco-autocomplete.helper';
import {CodePresentation} from './code-presentation.enum';

export class EditorData {

  /**
   * Default js view template
   */
  static jsViewTemplate = 'function compute(ctx, src) {\n' +
    '    var promises = {\n' +
    '        compositionName: Ehr.query({\n' +
    '            aql: \'SELECT c/name/value as compositionName \' +\n' +
    '                \'FROM EHR e \' +\n' +
    '                \'CONTAINS COMPOSITION c \' +\n' +
    '                \'WHERE e/ehr_id/value = :ehrId \' +\n' +
    '                \'FETCH 1\',\n' +
    '            params: ctx.vars,\n' +
    '            callback: function (out, compositionName) {\n' +
    '                return compositionName[\'compositionName\'];\n' +
    '            }\n' +
    '        })\n' +
    '    };\n' +
    '    var result = {};\n' +
    '    Ehr.allhash(promises, function (res) {\n' +
    '        result = {\n' +
    '            compositionName: res[\'compositionName\']\n' +
    '        };\n' +
    '    });\n' +
    '    return result;\n' +
    '}';

  /**
   * Code in editor
   */
  code = '';

  /**
   * AQL parameters extracted from code
   */
  aqlParameters: Map<string, string | number> = new Map<string, string | number>();

  /**
   * Defined view parameters
   */
  viewParameters: Map<string, {name: string, description: string, type: string, format?: string}>;

  /**
   * View parameters with values
   */
  viewExecutionParameters: Map<string, any>;

  /**
   * Additional keyword variables set by user:
   *
   * SELECT c
   * FROM COMPOSITION c
   *
   * In additionalKeywordVariables map there is mapping:
   * [c => COMPOSITION]
   *
   */
  additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>();

  /**
   * Mapping for archetype names and ids
   *
   * SELECT c
   * FROM ADMIN_ENTRY a#Terminology
   *
   * i.e: [Terminology => 'openEHR-EHR-ADMIN_ENTRY.terminology.v0']
   *
   */
  archetypeNameAndIdMap = new Map<string, string>();

  /**
   * Mapping variable to archetype name
   *
   * SELECT c
   * FROM COMPOSITION c#Temperature
   *
   * i.e: [c => 'Temperature']
   *
   */
  variableToArchetypeNameMap = new Map<string, string>();

  /**
   * Map of replacement when beautify/uglify code
   *
   * SELECT c
   * FROM COMPOSITION c
   * CONTAINS OBSERVATION o#Body_temperature
   * WHERE o/Temperature/magnitude > 10
   *
   * i.e => "Temperature/" => "/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value"
   */
  replacementMap = new Map<string, string>();

  codePresentation: CodePresentation = CodePresentation.BEAUTIFY;


  addReplacementItem(name: string, path: string) {
    if (!this.replacementMap.has(name) || this.replacementMap.get(name) !== path) {
      this.replacementMap.set(`${name}${MonacoAutocompleteHelper.nameAndPathDelimiter}${path}`, path);
    }
  }

}
