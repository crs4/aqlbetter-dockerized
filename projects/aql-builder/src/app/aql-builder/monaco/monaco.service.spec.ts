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

import {TestBed} from '@angular/core/testing';
import {MonacoService} from './monaco.service';
import {SharedModule} from '../../shared/shared.module';
import {CompletionItemsFactoryService} from './completion-items-factory.service';
import {ArchetypesCompletionItemsService} from './archetypes-completion-items.service';
import {EhrApiService} from '../../core/ehr-api.service';
import {TabService} from '../../core/tab.service';
import {ToastrModule} from 'ngx-toastr';
import {TranslateModule} from '@ngx-translate/core';
import {EditorData} from '../editor/editor-data.model';
import {AdditionalAqlAutocompleteKeyword} from './monaco-aql.model';
import {Tab, TabType} from '../editor/tab.model';
import {CodePresentation} from '../editor/code-presentation.enum';


describe('MonacoService', () => {
  let monacoService: MonacoService;
  let tabService: TabService;
  let ehrApiService: EhrApiService;
  let archetypesCompletionItemsService: ArchetypesCompletionItemsService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      SharedModule,
      ToastrModule.forRoot(),
      TranslateModule.forRoot()
    ],
    providers: [
      CompletionItemsFactoryService,
      ArchetypesCompletionItemsService,
      EhrApiService,
      TabService,
    ]
  }));

  beforeEach(() => {
    monacoService = TestBed.inject<MonacoService>(MonacoService);
    tabService = TestBed.inject<TabService>(TabService);
    ehrApiService = TestBed.inject<EhrApiService>(EhrApiService);
    archetypesCompletionItemsService = TestBed.inject<ArchetypesCompletionItemsService>(ArchetypesCompletionItemsService);
  });

  it('should be created', () => {
    expect(monacoService).toBeTruthy();
  });

  describe('getCodePresentation', () => {
    it('should return beautified', () => {
      spyOn(tabService, 'getActiveEditorState').and.callFake(() => {
        const editorData = getMockedEditorState();
        editorData.code =
          'SELECT u/Substance_Agent,\n' +
          '       u/Comment,\n' +
          '       u/Certainty\n' +
          'FROM EHR e\n' +
          'CONTAINS COMPOSITION a\n' +
          'CONTAINS EVALUATION u#Adverse_Reaction___Allergy \n' +
          'OFFSET 0 LIMIT 100';

        return editorData;
      });

      const codePresentation = monacoService.getCodePresentation(CodePresentation.PLAIN);
      expect(codePresentation).toBe(CodePresentation.BEAUTIFY);
    });

    it('should return plain', () => {
      spyOn(tabService, 'getActiveEditorState').and.callFake(() => {
        const editorState = getMockedEditorState();
        editorState.code =
          'SELECT u/data[at0001]/items[at0002]/value,\n' +
          '       u/data[at0001]/items[at0006]/value,\n' +
          '       u/data[at0001]/items[at0009]/items[at0021]/value\n' +
          'FROM EHR e\n' +
          'CONTAINS COMPOSITION a\n' +
          'CONTAINS EVALUATION u[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1] \n' +
          'OFFSET 0 LIMIT 100';


        return editorState;
      });

      const codePresentation = monacoService.getCodePresentation(CodePresentation.BEAUTIFY);
      expect(codePresentation).toBe(CodePresentation.PLAIN);
    });
  });

  describe('translate code from beautify to plain', () => {
    beforeEach(() => {
      spyOn(tabService, 'getActiveEditorState').and.returnValue(getMockedEditorState());
    });

    it('without operators', () => {
      const beautified =
        'SELECT u/Substance_Agent,\n' +
        '       u/Comment,\n' +
        '       u/Certainty\n' +
        'FROM EHR e\n' +
        'CONTAINS COMPOSITION a\n' +
        'CONTAINS EVALUATION u#Adverse_Reaction___Allergy \n' +
        'OFFSET 0 LIMIT 100';

      const plain =
        'SELECT u/data[at0001]/items[at0002]/value,\n' +
        '       u/data[at0001]/items[at0006]/value,\n' +
        '       u/data[at0001]/items[at0009]/items[at0021]/value\n' +
        'FROM EHR e\n' +
        'CONTAINS COMPOSITION a\n' +
        'CONTAINS EVALUATION u[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1] \n' +
        'OFFSET 0 LIMIT 100';

      const plainCode = monacoService.replaceWithPaths(beautified);
      expect(plainCode).toBe(plain);
    });

    it('with TOP keyword', () => {
      const beautified =
        'SELECT TOP 5         \n' +
        '       u/Substance_Agent,\n' +
        '       u/Comment,\n' +
        '       u/Certainty\n' +
        'FROM EHR e\n' +
        'CONTAINS COMPOSITION a\n' +
        'CONTAINS EVALUATION u#Adverse_Reaction___Allergy\n' +
        'OFFSET 0 LIMIT 100';

      const plain =
        'SELECT TOP 5         \n' +
        '       u/data[at0001]/items[at0002]/value,\n' +
        '       u/data[at0001]/items[at0006]/value,\n' +
        '       u/data[at0001]/items[at0009]/items[at0021]/value\n' +
        'FROM EHR e\n' +
        'CONTAINS COMPOSITION a\n' +
        'CONTAINS EVALUATION u[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1]\n' +
        'OFFSET 0 LIMIT 100';

      const plainCode = monacoService.replaceWithPaths(beautified);
      expect(plainCode).toBe(plain);
    });

    it('with COUNT keyword', () => {
      const beautified =
        'SELECT COUNT(u/Comment)\n' +
        'FROM EHR e\n' +
        'CONTAINS COMPOSITION a\n' +
        'CONTAINS EVALUATION u#Adverse_Reaction___Allergy \n' +
        'OFFSET 0 LIMIT 100';

      const plain =
        'SELECT COUNT(u/data[at0001]/items[at0006]/value)\n' +
        'FROM EHR e\n' +
        'CONTAINS COMPOSITION a\n' +
        'CONTAINS EVALUATION u[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1] \n' +
        'OFFSET 0 LIMIT 100';

      const plainCode = monacoService.replaceWithPaths(beautified);
      expect(plainCode).toBe(plain);
    });

    it('with SQUASH keyword', () => {
      const beautified =
        'SELECT SQUASH(u/Substance_Agent),\n' +
        '       u/Comment\n' +
        'FROM EHR e\n' +
        'CONTAINS COMPOSITION a\n' +
        'CONTAINS EVALUATION u#Adverse_Reaction___Allergy \n' +
        'OFFSET 0 LIMIT 100';

      const plain =
        'SELECT SQUASH(u/data[at0001]/items[at0002]/value),\n' +
        '       u/data[at0001]/items[at0006]/value\n' +
        'FROM EHR e\n' +
        'CONTAINS COMPOSITION a\n' +
        'CONTAINS EVALUATION u[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1] \n' +
        'OFFSET 0 LIMIT 100';

      const plainCode = monacoService.replaceWithPaths(beautified);
      expect(plainCode).toBe(plain);
    });

    it('with multiple select keywords', () => {
      const beautified =
        'SELECT u/Comment,\n' +
        '       u/Substance_Agent,\n' +
        '       u/Certainty\n' +
        'FROM EHR e\n' +
        'CONTAINS COMPOSITION a\n' +
        'CONTAINS EVALUATION u#Adverse_Reaction___Allergy \n' +
        'OFFSET 0 LIMIT 100\n' +
        'UNION ALL\n' +
        'SELECT u/Comment,\n' +
        '       u/Substance_Agent,\n' +
        '       u/Certainty\n' +
        'FROM EHR e\n' +
        'CONTAINS COMPOSITION a\n' +
        'CONTAINS EVALUATION u#Adverse_Reaction___Allergy \n' +
        'OFFSET 0 LIMIT 100';

      const plain =
        'SELECT u/data[at0001]/items[at0006]/value,\n' +
        '       u/data[at0001]/items[at0002]/value,\n' +
        '       u/data[at0001]/items[at0009]/items[at0021]/value\n' +
        'FROM EHR e\n' +
        'CONTAINS COMPOSITION a\n' +
        'CONTAINS EVALUATION u[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1] \n' +
        'OFFSET 0 LIMIT 100\n' +
        'UNION ALL\n' +
        'SELECT u/data[at0001]/items[at0006]/value,\n' +
        '       u/data[at0001]/items[at0002]/value,\n' +
        '       u/data[at0001]/items[at0009]/items[at0021]/value\n' +
        'FROM EHR e\n' +
        'CONTAINS COMPOSITION a\n' +
        'CONTAINS EVALUATION u[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1] \n' +
        'OFFSET 0 LIMIT 100';

      const plainCode = monacoService.replaceWithPaths(beautified);
      expect(plainCode).toBe(plain);
    });
  });

  describe('translate code from plain to beautify', () => {

    beforeEach(() => {
      spyOn(tabService, 'getActiveEditorState').and.returnValue(getMockedEditorState());
    });

    it('without operators', () => {
      const beautified =
        'SELECT u/Substance_Agent,\n' +
        '       u/Comment,\n' +
        '       u/Certainty\n' +
        'FROM EHR e\n' +
        'CONTAINS COMPOSITION a\n' +
        'CONTAINS EVALUATION u#Adverse_Reaction___Allergy \n' +
        'OFFSET 0 LIMIT 100';

      const plain =
        'SELECT u/data[at0001]/items[at0002]/value,\n' +
        '       u/data[at0001]/items[at0006]/value,\n' +
        '       u/data[at0001]/items[at0009]/items[at0021]/value\n' +
        'FROM EHR e\n' +
        'CONTAINS COMPOSITION a\n' +
        'CONTAINS EVALUATION u[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1] \n' +
        'OFFSET 0 LIMIT 100';

      const beautifiedCode = monacoService.beautifyCode(plain);
      expect(beautifiedCode).toBe(beautified);
    });

    it('with TOP keyword', () => {
      const beautified =
        'SELECT TOP 5         \n' +
        '       u/Substance_Agent,\n' +
        '       u/Comment,\n' +
        '       u/Certainty\n' +
        'FROM EHR e\n' +
        'CONTAINS COMPOSITION a\n' +
        'CONTAINS EVALUATION u#Adverse_Reaction___Allergy\n' +
        'OFFSET 0 LIMIT 100';

      const plain =
        'SELECT TOP 5         \n' +
        '       u/data[at0001]/items[at0002]/value,\n' +
        '       u/data[at0001]/items[at0006]/value,\n' +
        '       u/data[at0001]/items[at0009]/items[at0021]/value\n' +
        'FROM EHR e\n' +
        'CONTAINS COMPOSITION a\n' +
        'CONTAINS EVALUATION u[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1]\n' +
        'OFFSET 0 LIMIT 100';

      const beautifiedCode = monacoService.beautifyCode(plain);
      expect(beautifiedCode).toBe(beautified);
    });

    it('with COUNT keyword', () => {
      const beautified =
        'SELECT COUNT(u/Comment)\n' +
        'FROM EHR e\n' +
        'CONTAINS COMPOSITION a\n' +
        'CONTAINS EVALUATION u#Adverse_Reaction___Allergy \n' +
        'OFFSET 0 LIMIT 100';

      const plain =
        'SELECT COUNT(u/data[at0001]/items[at0006]/value)\n' +
        'FROM EHR e\n' +
        'CONTAINS COMPOSITION a\n' +
        'CONTAINS EVALUATION u[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1] \n' +
        'OFFSET 0 LIMIT 100';

      const beautifiedCode = monacoService.beautifyCode(plain);
      expect(beautifiedCode).toBe(beautified);
    });

    it('with SQUASH keyword', () => {
      const beautified =
        'SELECT SQUASH(u/Substance_Agent),\n' +
        '       u/Comment\n' +
        'FROM EHR e\n' +
        'CONTAINS COMPOSITION a\n' +
        'CONTAINS EVALUATION u#Adverse_Reaction___Allergy \n' +
        'OFFSET 0 LIMIT 100';

      const plain =
        'SELECT SQUASH(u/data[at0001]/items[at0002]/value),\n' +
        '       u/data[at0001]/items[at0006]/value\n' +
        'FROM EHR e\n' +
        'CONTAINS COMPOSITION a\n' +
        'CONTAINS EVALUATION u[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1] \n' +
        'OFFSET 0 LIMIT 100';

      const beautifiedCode = monacoService.beautifyCode(plain);
      expect(beautifiedCode).toBe(beautified);
    });

    it('with multiple select keywords', () => {
      const beautified =
        'SELECT u/Comment,\n' +
        '       u/Substance_Agent,\n' +
        '       u/Certainty\n' +
        'FROM EHR e\n' +
        'CONTAINS COMPOSITION a\n' +
        'CONTAINS EVALUATION u#Adverse_Reaction___Allergy \n' +
        'OFFSET 0 LIMIT 100\n' +
        'UNION ALL\n' +
        'SELECT u/Comment,\n' +
        '       u/Substance_Agent,\n' +
        '       u/Certainty\n' +
        'FROM EHR e\n' +
        'CONTAINS COMPOSITION a\n' +
        'CONTAINS EVALUATION u#Adverse_Reaction___Allergy \n' +
        'OFFSET 0 LIMIT 100';

      const plain =
        'SELECT u/data[at0001]/items[at0006]/value,\n' +
        '       u/data[at0001]/items[at0002]/value,\n' +
        '       u/data[at0001]/items[at0009]/items[at0021]/value\n' +
        'FROM EHR e\n' +
        'CONTAINS COMPOSITION a\n' +
        'CONTAINS EVALUATION u[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1] \n' +
        'OFFSET 0 LIMIT 100\n' +
        'UNION ALL\n' +
        'SELECT u/data[at0001]/items[at0006]/value,\n' +
        '       u/data[at0001]/items[at0002]/value,\n' +
        '       u/data[at0001]/items[at0009]/items[at0021]/value\n' +
        'FROM EHR e\n' +
        'CONTAINS COMPOSITION a\n' +
        'CONTAINS EVALUATION u[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1] \n' +
        'OFFSET 0 LIMIT 100';

      const beautifiedCode = monacoService.beautifyCode(plain);
      expect(beautifiedCode).toBe(beautified);
    });
  });

  describe('set additional aql keywords', () => {
    beforeEach(() => {
      spyOn(ehrApiService, 'getArchetypes').and.returnValues(Promise.resolve(archetypesMock));
      spyOn(archetypesCompletionItemsService, 'getCompletionItemsFromType').and.returnValue(Promise.resolve({}));
    });

    it('plain query', async () => {

      const tab = new Tab(TabType.NEW_QUERY);
      tabService.createTab(tab);
      tabService.setActiveTab(0);

      const code = '' +
        'SELECT j/data[at0001]/items[at0006]/value\n' +
        'FROM EHR e\n' +
        'CONTAINS COMPOSITION a\n' +
        'CONTAINS EVALUATION j[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1] \n' +
        'OFFSET 0 LIMIT 100';

      await monacoService.setAdditionalAqlKeywords(code);

      const activeState = tabService.getActiveEditorState();

      const expectedAdditionalKeywordVariablesMap = new Map<string, AdditionalAqlAutocompleteKeyword>()
        .set('e', AdditionalAqlAutocompleteKeyword.EHR)
        .set('a', AdditionalAqlAutocompleteKeyword.COMPOSITION)
        .set('j', AdditionalAqlAutocompleteKeyword.EVALUATION);

      expect(activeState.additionalKeywordVariables).toEqual(expectedAdditionalKeywordVariablesMap);
    });

    it('beautified query', async () => {

      const tab = new Tab(TabType.NEW_QUERY);
      tabService.createTab(tab);
      tabService.setActiveTab(0);

      const code = '' +
        'SELECT j/Comment\n' +
        'FROM EHR e\n' +
        'CONTAINS COMPOSITION a\n' +
        'CONTAINS EVALUATION j#Adverse_Reaction___Allergy \n' +
        'OFFSET 0 LIMIT 100';

      await monacoService.setAdditionalAqlKeywords(code);

      const activeState = tabService.getActiveEditorState();

      const expectedAdditionalKeywordVariablesMap = new Map<string, AdditionalAqlAutocompleteKeyword>()
        .set('e', AdditionalAqlAutocompleteKeyword.EHR)
        .set('a', AdditionalAqlAutocompleteKeyword.COMPOSITION)
        .set('j', AdditionalAqlAutocompleteKeyword.EVALUATION);

      expect(activeState.additionalKeywordVariables).toEqual(expectedAdditionalKeywordVariablesMap);
    });

    it('with defined ehr id value EHR e[ehr_id/value=:ehrId]', async () => {
      const tab = new Tab(TabType.NEW_QUERY);
      tabService.createTab(tab);
      tabService.setActiveTab(0);

      const code = '' +
        'select e/ehr_id/value, a\n' +
        'from EHR e[ehr_id/value=:ehrId]\n' +
        'contains COMPOSITION a#Adverse_reaction_list\n' +
        'where a/name/value=\'Adverse reaction list\'\n' +
        'order by a/Start_time/value desc\n' +
        'offset :offset limit :limit';

      await monacoService.setAdditionalAqlKeywords(code);

      const activeState = tabService.getActiveEditorState();

      const expectedAdditionalKeywordVariablesMap = new Map<string, AdditionalAqlAutocompleteKeyword>()
        .set('e', AdditionalAqlAutocompleteKeyword.EHR)
        .set('a', AdditionalAqlAutocompleteKeyword.COMPOSITION);

      expect(activeState.additionalKeywordVariables).toEqual(expectedAdditionalKeywordVariablesMap);
    });

  });

  describe('set variable to archetype name', () => {
    it('plain query', () => {

      const tab = new Tab(TabType.NEW_QUERY);
      tabService.createTab(tab);
      tabService.setActiveTab(0);

      const code = '' +
        'SELECT j/data[at0001]/items[at0006]/value\n' +
        'FROM EHR e\n' +
        'CONTAINS COMPOSITION a\n' +
        'CONTAINS EVALUATION j[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1] \n' +
        'OFFSET 0 LIMIT 100';

      monacoService.setVariableToArchetypeName(code);

      const activeState = tabService.getActiveEditorState();

      const expectedVariableToArchetypeNameMap = new Map<string, string>();

      expect(activeState.variableToArchetypeNameMap).toEqual(expectedVariableToArchetypeNameMap);
    });

    it('beautified query', () => {

      const tab = new Tab(TabType.NEW_QUERY);
      tabService.createTab(tab);
      tabService.setActiveTab(0);

      const code = '' +
        'SELECT j/Comment\n' +
        'FROM EHR e\n' +
        'CONTAINS COMPOSITION a\n' +
        'CONTAINS EVALUATION j#Adverse_Reaction___Allergy \n' +
        'OFFSET 0 LIMIT 100';

      monacoService.setVariableToArchetypeName(code);

      const activeState = tabService.getActiveEditorState();

      const expectedVariableToArchetypeNameMap = new Map<string, string>()
        .set('j', 'Adverse_Reaction___Allergy');

      expect(activeState.variableToArchetypeNameMap).toEqual(expectedVariableToArchetypeNameMap);
    });

  });
});

function getMockedEditorState(): EditorData {
  const editorStateMock: EditorData = new EditorData();
  editorStateMock.replacementMap = new Map<string, string>()
    .set('u/Substance_Agent···/data[at0001]/items[at0002]/value', '/data[at0001]/items[at0002]/value')
    .set('u/Comment···/data[at0001]/items[at0006]/value', '/data[at0001]/items[at0006]/value')
    .set('u/Certainty···/data[at0001]/items[at0009]/items[at0021]/value', '/data[at0001]/items[at0009]/items[at0021]/value');

  editorStateMock.additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>()
    .set('e', AdditionalAqlAutocompleteKeyword.EHR)
    .set('a', AdditionalAqlAutocompleteKeyword.COMPOSITION)
    .set('u', AdditionalAqlAutocompleteKeyword.EVALUATION);
  editorStateMock.archetypeNameAndIdMap = new Map<string, string>()
    .set('Adverse_Reaction___Allergy', 'openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1');

  editorStateMock.variableToArchetypeNameMap = new Map<string, string>()
      .set('u', 'Adverse_Reaction___Allergy');

  return editorStateMock;
}


const archetypesMock = [
  {
    'type': 'EVALUATION',
    'archetypeId': 'openEHR-EHR-EVALUATION.clinical_synopsis-allergies_mnd.v1',
    'names': [
      'Clinical Synopses - allergies'
    ],
    'localizedNames': [
      {
        'en': 'Clinical Synopses - allergies'
      }
    ]
  },
  {
    'type': 'EVALUATION',
    'archetypeId': 'openEHR-EHR-EVALUATION.reason_for_encounter.v1',
    'names': [
      'Reason for encounter'
    ],
    'localizedNames': [
      {
        'en': 'Reason for encounter'
      }
    ]
  },
  {
    'type': 'EVALUATION',
    'archetypeId': 'openEHR-EHR-EVALUATION.clinical_synopsis-general_mnd.v1',
    'names': [
      'Clinical Synopses'
    ],
    'localizedNames': [
      {
        'en': 'Clinical Synopses'
      }
    ]
  },
  {
    'type': 'EVALUATION',
    'archetypeId': 'openEHR-EHR-EVALUATION.exclusion-problem_diagnosis.v0',
    'names': [
      'No co-morbidity'
    ],
    'localizedNames': [
      {
        'en': 'No co-morbidity'
      }
    ]
  },
  {
    'type': 'EVALUATION',
    'archetypeId': 'openEHR-EHR-EVALUATION.clinical_synopsis.v1',
    'names': [
      'Laboratory test result comment'
    ],
    'localizedNames': [
      {
        'en': 'Laboratory test result comment'
      }
    ]
  },
  {
    'type': 'EVALUATION',
    'archetypeId': 'openEHR-EHR-EVALUATION.ichom_lpc_treatment_modalities.v0',
    'names': [
      'Primary treatment modalities'
    ],
    'localizedNames': [
      {
        'en': 'Primary treatment modalities'
      }
    ]
  },
  {
    'type': 'EVALUATION',
    'archetypeId': 'openEHR-EHR-EVALUATION.exclusion_global.v1',
    'names': [
      'Exclusion - global'
    ],
    'localizedNames': [
      {
        'en': 'Exclusion - global'
      }
    ]
  },
  {
    'type': 'EVALUATION',
    'archetypeId': 'openEHR-EHR-EVALUATION.medication_summary.v0',
    'names': [
      'Packed cells'
    ],
    'localizedNames': [
      {
        'nl': 'Packed cells'
      }
    ]
  },
  {
    'type': 'EVALUATION',
    'archetypeId': 'openEHR-EHR-EVALUATION.medication_summary-simi.v0',
    'names': [
      'Принимает препарат'
    ],
    'localizedNames': [
      {
        'ru': 'Принимает препарат'
      }
    ]
  },
  {
    'type': 'EVALUATION',
    'archetypeId': 'openEHR-EHR-EVALUATION.adverse_reaction_risk.v1',
    'names': [
      'Adverse reaction risk'
    ],
    'localizedNames': [
      {
        'en': 'Adverse reaction risk',
        'sl': 'Opis neželenega učinka zdravila (NUZ)'
      }
    ]
  },
  {
    'type': 'EVALUATION',
    'archetypeId': 'openEHR-EHR-EVALUATION.examination_melanoma.v0',
    'names': [
      'examination melanoma'
    ],
    'localizedNames': [
      {
        'ru': 'examination melanoma'
      }
    ]
  },
  {
    'type': 'EVALUATION',
    'archetypeId': 'openEHR-EHR-EVALUATION.problem_diagnosis.v1',
    'names': [
      'Problem/Diagnosis'
    ],
    'localizedNames': [
      {
        'en': 'Problem/Diagnosis'
      }
    ]
  },
  {
    'type': 'EVALUATION',
    'archetypeId': 'openEHR-EHR-EVALUATION.melanoma_therapy_rr.v0',
    'names': [
      'Melanoma therapy summary'
    ],
    'localizedNames': [
      {
        'en': 'Melanoma therapy summary'
      }
    ]
  },
  {
    'type': 'EVALUATION',
    'archetypeId': 'openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1',
    'names': [
      'Adverse Reaction - Allergy'
    ],
    'localizedNames': [
      {
        'en': 'Adverse Reaction - Allergy',
        'sl': '*Adverse Reaction(en)'
      }
    ]
  },
  {
    'type': 'EVALUATION',
    'archetypeId': 'openEHR-EHR-EVALUATION.clinical_report.v1',
    'names': [
      'Clinical report'
    ],
    'localizedNames': [
      {
        'en': 'Clinical report',
        'sl': '*Clinical report(en)'
      }
    ]
  },
  {
    'type': 'EVALUATION',
    'archetypeId': 'openEHR-EHR-EVALUATION.ichom_lpc_disease_control.v0',
    'names': [
      'ICHOM LPC disease control'
    ],
    'localizedNames': [
      {
        'en': 'ICHOM LPC disease control'
      }
    ]
  },
  {
    'type': 'EVALUATION',
    'archetypeId': 'openEHR-EHR-EVALUATION.exclusion_specific.v1',
    'names': [
      'Exclusion - specific'
    ],
    'localizedNames': [
      {
        'en': 'Exclusion - specific'
      }
    ]
  },
  {
    'type': 'EVALUATION',
    'archetypeId': 'openEHR-EHR-EVALUATION.infant_feeding.v0',
    'names': [
      'Возраст введения прикорма'
    ],
    'localizedNames': [
      {
        'ru': 'Возраст введения прикорма'
      }
    ]
  },
  {
    'type': 'EVALUATION',
    'archetypeId': 'openEHR-EHR-EVALUATION.medication_summary-et.v0',
    'names': [
      'Medication summary'
    ],
    'localizedNames': [
      {
        'en': 'Medication summary'
      }
    ]
  },
  {
    'type': 'EVALUATION',
    'archetypeId': 'openEHR-EHR-EVALUATION.management_guidelines.v0',
    'names': [
      'Management guidelines'
    ],
    'localizedNames': [
      {
        'en': 'Management guidelines'
      }
    ]
  },
  {
    'type': 'EVALUATION',
    'archetypeId': 'openEHR-EHR-EVALUATION.recommendation.v1',
    'names': [
      'Прочие рекомендации'
    ],
    'localizedNames': [
      {
        'ru': 'Прочие рекомендации'
      }
    ]
  },
  {
    'type': 'EVALUATION',
    'archetypeId': 'openEHR-EHR-EVALUATION.absence.v1',
    'names': [
      'Absence of Information'
    ],
    'localizedNames': [
      {
        'en': 'Absence of Information'
      }
    ]
  },
  {
    'type': 'EVALUATION',
    'archetypeId': 'openEHR-EHR-EVALUATION.adverse_reaction-md.v1',
    'names': [
      'Adverse reaction'
    ],
    'localizedNames': [
      {
        'en': 'Adverse reaction'
      }
    ]
  },
  {
    'type': 'EVALUATION',
    'archetypeId': 'openEHR-EHR-EVALUATION.vte.v0',
    'names': [
      'vte'
    ],
    'localizedNames': [
      {
        'en': 'vte'
      }
    ]
  },
  {
    'type': 'EVALUATION',
    'archetypeId': 'openEHR-EHR-EVALUATION.summary_context.v1',
    'names': [
      'Summary context'
    ],
    'localizedNames': [
      {
        'en': 'Summary context'
      }
    ]
  },
  {
    'type': 'EVALUATION',
    'archetypeId': 'openEHR-EHR-EVALUATION.container.v0',
    'names': [
      'Режим'
    ],
    'localizedNames': [
      {
        'ru': 'Режим'
      }
    ]
  },
  {
    'type': 'EVALUATION',
    'archetypeId': 'openEHR-EHR-EVALUATION.therapy_summary.v0',
    'names': [
      'Therapy summary'
    ],
    'localizedNames': [
      {
        'en': 'Therapy summary'
      }
    ]
  },
  {
    'type': 'EVALUATION',
    'archetypeId': 'openEHR-EHR-EVALUATION.transplant_summary.v1',
    'names': [
      'Transplant summary'
    ],
    'localizedNames': [
      {
        'en': 'Transplant summary'
      }
    ]
  }
];
