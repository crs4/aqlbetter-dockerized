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

import {QueryManipulationService} from './query-manipulation.service';
import {CoreModule} from '../../core/core.module';
import {ToastrModule} from 'ngx-toastr';
import {TranslateModule} from '@ngx-translate/core';
import {Template, TreeNode} from '../../shared/models';
import {Tab, TabType} from '../editor/tab.model';
import {TabService} from '../../core/tab.service';
import {MonacoEditorModule, NgxMonacoEditorConfig} from 'ngx-monaco-editor';
import {registerLanguageProperties} from '../../app.module';
import {EditorData} from '../editor/editor-data.model';
import {AdditionalAqlAutocompleteKeyword, AqlLangKeyword} from '../monaco/monaco-aql.model';
import {EhrApiService} from '../../core/ehr-api.service';
import {MonacoService} from '../monaco/monaco.service';
import {laboratoryTestTemplate, medicationOrderTemplate} from './template-test.mock';
import {QueryManipulatorUtil} from './query-manipulator.util';
import {SharedModule} from '../../shared/shared.module';
import {RmType} from '../../shared/models/rm-type.enum';
import {CommonUtil} from '../../shared';

const monacoConfigMock: NgxMonacoEditorConfig = {
  baseUrl: `${CommonUtil.getBaseHrefFromDOM()}/assets`,
  defaultOptions: {
    scrollBeyondLastLine: true,
    overviewRulerLanes: 0,
    overviewRulerBorder: false,
    hideCursorInOverviewRuler: true,
    wordWrap: true
  },
  onMonacoLoad: registerLanguageProperties
};

describe('QueryManipulationService', () => {
  let queryManipulationService: QueryManipulationService;
  let tabService: TabService;
  let ehrApiService: EhrApiService;
  let monacoService: MonacoService;
  let templateMap: Map<string, TreeNode>;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      CoreModule,
      SharedModule,
      ToastrModule.forRoot(),
      TranslateModule.forRoot(),
      MonacoEditorModule.forRoot(monacoConfigMock)
    ],
    providers: [
      TabService,
      EhrApiService,
      MonacoService
    ]
  }));

  beforeEach(() => {
    queryManipulationService = TestBed.inject<QueryManipulationService>(QueryManipulationService);
    tabService = TestBed.inject<TabService>(TabService);
    ehrApiService = TestBed.inject<EhrApiService>(EhrApiService);
    monacoService = TestBed.inject<MonacoService>(MonacoService);
    templateMap = new Map<string, TreeNode>();

    spyOn(queryManipulationService, 'setQuery').and.callFake(code => code);
  });

  it('should be created', () => {
    const service: QueryManipulationService = TestBed.inject<QueryManipulationService>(QueryManipulationService);
    expect(service).toBeTruthy();
  });

  describe('apply root query', () => {

    it('without current code', () => {
      spyOn(queryManipulationService, 'getCurrentCode').and.returnValue('');
      const tab = new Tab(TabType.NEW_QUERY);
      tabService.createTab(tab);
      tabService.setActiveTab(0);

      const newCode = queryManipulationService.applyRootQuery(rootTreeNodeMock);

      const activeState = tabService.getActiveEditorState();

      const expectedArchetypeNameAndIdMap = new Map<string, string>()
        .set('Allergies', 'openEHR-EHR-COMPOSITION.summary.v1');

      const expectedNewCode =
        'SELECT c\n' +
        'FROM EHR e\n' +
        'CONTAINS COMPOSITION c#Allergies\n' +
        'WHERE c/name/value=\'Allergies\'\n' +
        'OFFSET 0 LIMIT 10';

      expect(newCode).toEqual(expectedNewCode);
      expect(activeState.archetypeNameAndIdMap).toEqual(expectedArchetypeNameAndIdMap);
    });

    it('current code has composition', () => {
      const mockCurrentCode =
        'SELECT r/Comment,\n' +
        '       r/Substance_Agent\n' +
        'FROM EHR e\n' +
        'CONTAINS COMPOSITION a\n' +
        'CONTAINS EVALUATION r#Adverse_Reaction___Allergy \n' +
        'OFFSET 0 LIMIT 10';

      spyOn(queryManipulationService, 'getCurrentCode').and.returnValue(mockCurrentCode);
      const tab = new Tab(TabType.NEW_QUERY, getMockedEditorState());
      tabService.createTab(tab);
      tabService.setActiveTab(0);

      const newCode = queryManipulationService.applyRootQuery(rootTreeNodeMock);

      const activeState = tabService.getActiveEditorState();

      const expectedArchetypeNameAndIdMap = new Map<string, string>()
        .set('Adverse_Reaction___Allergy', 'openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1')
        .set('Allergies', 'openEHR-EHR-COMPOSITION.summary.v1');

      const expectedNewCode =
        'SELECT r/Comment,\n' +
        '       r/Substance_Agent\n' +
        'FROM EHR e\n' +
        'CONTAINS COMPOSITION a#Allergies\n' +
        'CONTAINS EVALUATION r#Adverse_Reaction___Allergy \n' +
        'OFFSET 0 LIMIT 10';

      expect(newCode).toEqual(expectedNewCode);
      expect(activeState.archetypeNameAndIdMap).toEqual(expectedArchetypeNameAndIdMap);
    });

    it('current code does not have composition', () => {
      const mockCurrentCode =
        'SELECT r/Comment,\n' +
        '       r/Substance_Agent\n' +
        'FROM EHR e\n' +
        'CONTAINS EVALUATION r#Adverse_Reaction___Allergy \n' +
        'OFFSET 0 LIMIT 10';

      spyOn(queryManipulationService, 'getCurrentCode').and.returnValue(mockCurrentCode);
      const tab = new Tab(TabType.NEW_QUERY, getMockedEditorState());
      tabService.createTab(tab);
      tabService.setActiveTab(0);

      const newCode = queryManipulationService.applyRootQuery(rootTreeNodeMock);

      const activeState = tabService.getActiveEditorState();

      const expectedArchetypeNameAndIdMap = new Map<string, string>()
        .set('Adverse_Reaction___Allergy', 'openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1');

      const expectedNewCode =
        'SELECT r/Comment,\n' +
        '       r/Substance_Agent\n' +
        'FROM EHR e\n' +
        'CONTAINS EVALUATION r#Adverse_Reaction___Allergy \n' +
        'OFFSET 0 LIMIT 10';

      expect(newCode).toEqual(expectedNewCode);
      expect(activeState.archetypeNameAndIdMap).toEqual(expectedArchetypeNameAndIdMap);
    });
  });

  describe('apply query', () => {

    describe('current code is empty', () => {
      it('version is selected, should return predefined version query', async () => {
        spyOn(queryManipulationService, 'getCurrentCode').and.returnValue('');
        spyOn(ehrApiService, 'getArchetypes').and.returnValue(Promise.resolve(archetypesMock));

        const tab = new Tab(TabType.NEW_QUERY);
        tabService.createTab(tab);
        tabService.setActiveTab(0);

        const treeNodeMock = {
          'id': 'bbd3852d-e27f-4862-aa42-b40ceb5b9e86',
          'name': 'value',
          'localizedName': 'value',
          'localizedNames': {},
          'localizedDescriptions': new Map<string, string>(),
          'nodeId': undefined,
          'rmType': RmType.DV_TEXT,
          'formId': 'version/uid/value',
          'min': 1,
          'max': 1,
          'aqlPath': undefined,
          'children': [],
          'inContext': true,
          'viewConfig': undefined
        };


        const query = await queryManipulationService.applyChanges(treeNodeMock, AqlLangKeyword.VERSION);

        const expectedEditorState = new EditorData();
        expectedEditorState.additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>()
          .set('e', AdditionalAqlAutocompleteKeyword.EHR)
          .set('vo', AdditionalAqlAutocompleteKeyword.VERSIONED_OBJECT)
          .set('v', AdditionalAqlAutocompleteKeyword.VERSION)
          .set('c', AdditionalAqlAutocompleteKeyword.COMPOSITION);

        const expectedQuery = '' +
          'SELECT v/uid/value\n' +
          'FROM EHR e \n' +
          'CONTAINS VERSIONED_OBJECT vo\n' +
          'CONTAINS VERSION v[all_versions]\n' +
          'CONTAINS COMPOSITION c\n' +
          'OFFSET 0 LIMIT 10';

        const activeState = tabService.getActiveEditorState();

        expect(activeState.additionalKeywordVariables).toEqual(expectedEditorState.additionalKeywordVariables);
        expect(query).toEqual(expectedQuery);
      });

      it('version object is selected, should return predefined version query', async () => {
        spyOn(queryManipulationService, 'getCurrentCode').and.returnValue('');
        spyOn(ehrApiService, 'getArchetypes').and.returnValue(Promise.resolve(archetypesMock));

        const tab = new Tab(TabType.NEW_QUERY);
        tabService.createTab(tab);
        tabService.setActiveTab(0);

        const treeNodeMock = {
          'id': 'c7ea8813-f6e9-4f15-8f1e-fffb499b0940',
          'name': 'value',
          'localizedName': 'value',
          'localizedNames': {},
          'localizedDescriptions': new Map<string, string>(),
          'nodeId': undefined,
          'rmType': RmType.DV_TEXT,
          'formId': 'versioned_object/uid/value',
          'min': 1,
          'max': 1,
          'aqlPath': undefined,
          'children': [],
          'inContext': true,
          'viewConfig': undefined
        };


        const query = await queryManipulationService.applyChanges(treeNodeMock, AqlLangKeyword.VERSIONED_OBJECT);

        const expectedEditorState = new EditorData();
        expectedEditorState.additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>()
          .set('e', AdditionalAqlAutocompleteKeyword.EHR)
          .set('vo', AdditionalAqlAutocompleteKeyword.VERSIONED_OBJECT)
          .set('v', AdditionalAqlAutocompleteKeyword.VERSION)
          .set('c', AdditionalAqlAutocompleteKeyword.COMPOSITION);

        const expectedQuery = '' +
          'SELECT vo/uid/value\n' +
          'FROM EHR e \n' +
          'CONTAINS VERSIONED_OBJECT vo\n' +
          'CONTAINS VERSION v[all_versions]\n' +
          'CONTAINS COMPOSITION c\n' +
          'OFFSET 0 LIMIT 10';

        const activeState = tabService.getActiveEditorState();

        expect(activeState.additionalKeywordVariables).toEqual(expectedEditorState.additionalKeywordVariables);
        expect(query).toEqual(expectedQuery);
      });

      it('composition is selected, should return predefined composition and ehr query', async () => {
        spyOn(queryManipulationService, 'getCurrentCode').and.returnValue('');
        spyOn(ehrApiService, 'getArchetypes').and.returnValue(Promise.resolve(archetypesMock));

        const tab = new Tab(TabType.NEW_QUERY);
        tabService.createTab(tab);
        tabService.setActiveTab(0);

        const treeNodeMock = {
          'id': 'c7ea8813-f6e9-4f15-8f1e-fffb499b0940',
          'name': 'value',
          'localizedName': 'value',
          'localizedNames': {},
          'localizedDescriptions': new Map<string, string>(),
          'nodeId': undefined,
          'rmType': RmType.DV_TEXT,
          'formId': 'composition/name/value',
          'min': 1,
          'max': 1,
          'aqlPath': undefined,
          'children': [],
          'inContext': true,
          'viewConfig': undefined
        };


        const query = await queryManipulationService.applyChanges(treeNodeMock, AqlLangKeyword.COMPOSITION);

        const expectedEditorState = new EditorData();
        expectedEditorState.additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>()
          .set('e', AdditionalAqlAutocompleteKeyword.EHR)
          .set('c', AdditionalAqlAutocompleteKeyword.COMPOSITION);

        const expectedQuery = '' +
          'SELECT c/name/value\n' +
          'FROM EHR e\n' +
          'CONTAINS COMPOSITION c\n' +
          'OFFSET 0 LIMIT 10';

        const activeState = tabService.getActiveEditorState();

        expect(activeState.additionalKeywordVariables).toEqual(expectedEditorState.additionalKeywordVariables);
        expect(query).toEqual(expectedQuery);
      });

      it('ehr is selected, should return predefined composition and ehr query', async () => {
        spyOn(queryManipulationService, 'getCurrentCode').and.returnValue('');
        spyOn(ehrApiService, 'getArchetypes').and.returnValue(Promise.resolve(archetypesMock));

        const tab = new Tab(TabType.NEW_QUERY);
        tabService.createTab(tab);
        tabService.setActiveTab(0);

        const treeNodeMock = {
          'id': 'c7ea8813-f6e9-4f15-8f1e-fffb499b0940',
          'name': 'value',
          'localizedName': 'value',
          'localizedNames': {},
          'localizedDescriptions': new Map<string, string>(),
          'nodeId': undefined,
          'rmType': RmType.DV_TEXT,
          'formId': 'ehr/ehr_id/value',
          'min': 1,
          'max': 1,
          'aqlPath': undefined,
          'children': [],
          'inContext': true,
          'viewConfig': undefined
        };


        const query = await queryManipulationService.applyChanges(treeNodeMock, AqlLangKeyword.EHR);

        const expectedEditorState = new EditorData();
        expectedEditorState.additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>()
          .set('e', AdditionalAqlAutocompleteKeyword.EHR)
          .set('c', AdditionalAqlAutocompleteKeyword.COMPOSITION);

        const expectedQuery = '' +
          'SELECT e/ehr_id/value\n' +
          'FROM EHR e\n' +
          'CONTAINS COMPOSITION c\n' +
          'OFFSET 0 LIMIT 10';

        const activeState = tabService.getActiveEditorState();

        expect(activeState.additionalKeywordVariables).toEqual(expectedEditorState.additionalKeywordVariables);
        expect(query).toEqual(expectedQuery);
      });
    });

    describe('current code is not empty', () => {
      it('should add new archetype', async () => {
        const currentCodeMock = '' +
          'SELECT c\n' +
          'FROM EHR e\n' +
          'CONTAINS COMPOSITION c\n' +
          'OFFSET 0 LIMIT 10';

        spyOn(queryManipulationService, 'getCurrentCode').and.returnValue(currentCodeMock);
        spyOn(ehrApiService, 'getArchetypes').and.returnValue(Promise.resolve(archetypesMock));
        // @ts-ignore
        spyOn(QueryManipulatorUtil, 'getVariableName').and.returnValue('q');

        const editorStateMock = new EditorData();
        editorStateMock.code = currentCodeMock;
        editorStateMock.additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>()
          .set('e', AdditionalAqlAutocompleteKeyword.EHR)
          .set('c', AdditionalAqlAutocompleteKeyword.COMPOSITION);

        const tab = new Tab(TabType.NEW_QUERY, editorStateMock);
        tabService.createTab(tab);
        tabService.setActiveTab(0);

        const treeNodeMock = {
          'id': 'c7ea8813-f6e9-4f15-8f1e-fffb499b0940',
          'name': 'Comment',
          'localizedName': 'Comment',
          'localizedNames': {},
          'localizedDescriptions': new Map<string, string>(),
          'nodeId': 'at0006',
          'rmType': RmType.DV_TEXT,
          'formId': '',
          'min': 1,
          'max': 1,
          'aqlPath': '/content[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1]/data[at0001]/items[at0006]/value',
          'children': [],
          'inContext': true,
          'viewConfig': undefined,
          'parentModel': {
            'id': 'adverse_reaction_-_allergy',
            'name': 'Adverse Reaction - Allergy',
            'localizedName': 'Adverse Reaction - Allergy',
            'rmType': RmType.EVALUATION,
            'nodeId': 'openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1',
            'min': 1,
            'max': -1,
            'formId': '',
            'localizedNames': {
              'en': 'Adverse Reaction - Allergy',
              'sl': '*Adverse Reaction(en)'
            },
            'localizedDescriptions': new Map<string, string>(),
            'aqlPath': '/content[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1]',
            'children': [],
            'inContext': false,
            'viewConfig': undefined
          }
        };


        const query = await queryManipulationService.applyChanges(treeNodeMock, AqlLangKeyword.EVALUATION);

        const expectedEditorState = new EditorData();
        expectedEditorState.additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>()
          .set('e', AdditionalAqlAutocompleteKeyword.EHR)
          .set('c', AdditionalAqlAutocompleteKeyword.COMPOSITION)
          .set('q', AdditionalAqlAutocompleteKeyword.EVALUATION);
        expectedEditorState.replacementMap = new Map<string, string>()
          .set('q/Comment···/data[at0001]/items[at0006]/value', '/data[at0001]/items[at0006]/value');
        expectedEditorState.archetypeNameAndIdMap = new Map<string, string>()
          .set('Adverse_Reaction___Allergy', 'openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1');
        expectedEditorState.variableToArchetypeNameMap = new Map<string, string>()
          .set('q', 'Adverse_Reaction___Allergy');

        const expectedQuery = '' +
          'SELECT c,\n' +
          '       q/Comment\n' +
          'FROM EHR e\n' +
          'CONTAINS COMPOSITION c\n' +
          'CONTAINS EVALUATION q#Adverse_Reaction___Allergy \n' +
          'OFFSET 0 LIMIT 10';

        const activeState = tabService.getActiveEditorState();

        expect(activeState.additionalKeywordVariables).toEqual(expectedEditorState.additionalKeywordVariables);
        expect(query).toEqual(expectedQuery);
      });

      it('should add new attribute, archetype already exists', async () => {
        const currentCodeMock = '' +
          'SELECT c,\n' +
          '       q/Comment\n' +
          'FROM EHR e\n' +
          'CONTAINS COMPOSITION c\n' +
          'CONTAINS EVALUATION q#Adverse_Reaction___Allergy \n' +
          'OFFSET 0 LIMIT 10';

        spyOn(queryManipulationService, 'getCurrentCode').and.returnValue(currentCodeMock);
        spyOn(ehrApiService, 'getArchetypes').and.returnValue(Promise.resolve(archetypesMock));
        // @ts-ignore
        spyOn(QueryManipulatorUtil, 'getVariableName').and.returnValue('q');

        const editorStateMock = new EditorData();
        editorStateMock.code = currentCodeMock;
        editorStateMock.additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>()
          .set('e', AdditionalAqlAutocompleteKeyword.EHR)
          .set('c', AdditionalAqlAutocompleteKeyword.COMPOSITION)
          .set('q', AdditionalAqlAutocompleteKeyword.EVALUATION);

        const tab = new Tab(TabType.NEW_QUERY, editorStateMock);
        tabService.createTab(tab);
        tabService.setActiveTab(0);

        const treeNodeMock = {
          'id': 'substance_agent',
          'name': 'Substance Agent',
          'localizedName': 'Substance Agent',
          'localizedNames': {},
          'localizedDescriptions': new Map<string, string>(),
          'nodeId': 'at0002',
          'rmType': RmType.DV_TEXT,
          'formId': '',
          'min': 1,
          'max': 1,
          'aqlPath': '/content[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1]/data[at0001]/items[at0002]/value',
          'children': [],
          'inContext': true,
          'viewConfig': undefined,
          'parentModel': {
            'id': 'adverse_reaction_-_allergy',
            'name': 'Adverse Reaction - Allergy',
            'localizedName': 'Adverse Reaction - Allergy',
            'rmType': RmType.EVALUATION,
            'nodeId': 'openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1',
            'min': 1,
            'max': -1,
            'formId': '',
            'localizedNames': {
              'en': 'Adverse Reaction - Allergy',
              'sl': '*Adverse Reaction(en)'
            },
            'localizedDescriptions': new Map<string, string>(),
            'aqlPath': '/content[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1]',
            'children': [],
            'inContext': false,
            'viewConfig': undefined
          }
        };


        const query = await queryManipulationService.applyChanges(treeNodeMock, AqlLangKeyword.EVALUATION);

        const expectedEditorState = new EditorData();
        expectedEditorState.additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>()
          .set('e', AdditionalAqlAutocompleteKeyword.EHR)
          .set('c', AdditionalAqlAutocompleteKeyword.COMPOSITION)
          .set('q', AdditionalAqlAutocompleteKeyword.EVALUATION);
        expectedEditorState.replacementMap = new Map<string, string>()
          .set('q/Comment···/data[at0001]/items[at0006]/value', '/data[at0001]/items[at0006]/value')
          .set('q/Substance_Agent···/data[at0001]/items[at0006]/value', '/data[at0001]/items[at0006]/value');
        expectedEditorState.archetypeNameAndIdMap = new Map<string, string>()
          .set('Adverse_Reaction___Allergy', 'openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1');
        expectedEditorState.variableToArchetypeNameMap = new Map<string, string>()
          .set('q', 'Adverse_Reaction___Allergy');

        const expectedQuery = '' +
          'SELECT c,\n' +
          '       q/Comment,\n' +
          '       q/Substance_Agent\n' +
          'FROM EHR e\n' +
          'CONTAINS COMPOSITION c\n' +
          'CONTAINS EVALUATION q#Adverse_Reaction___Allergy \n' +
          'OFFSET 0 LIMIT 10';

        const activeState = tabService.getActiveEditorState();

        expect(activeState.additionalKeywordVariables).toEqual(expectedEditorState.additionalKeywordVariables);
        expect(query).toEqual(expectedQuery);
      });

      it('should not add new attribute, attribute already exists', async () => {
        const currentCodeMock = '' +
          'SELECT c,\n' +
          '       q/Comment,\n' +
          '       q/Substance_Agent\n' +
          'FROM EHR e\n' +
          'CONTAINS COMPOSITION c\n' +
          'CONTAINS EVALUATION q#Adverse_Reaction___Allergy \n' +
          'OFFSET 0 LIMIT 10';

        spyOn(queryManipulationService, 'getCurrentCode').and.returnValue(currentCodeMock);
        spyOn(ehrApiService, 'getArchetypes').and.returnValue(Promise.resolve(archetypesMock));
        // @ts-ignore
        spyOn(QueryManipulatorUtil, 'getVariableName').and.returnValue('q');

        const editorStateMock = new EditorData();
        editorStateMock.code = currentCodeMock;
        editorStateMock.additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>()
          .set('e', AdditionalAqlAutocompleteKeyword.EHR)
          .set('c', AdditionalAqlAutocompleteKeyword.COMPOSITION)
          .set('q', AdditionalAqlAutocompleteKeyword.EVALUATION);
        editorStateMock.replacementMap
          .set('q/Comment···/data[at0001]/items[at0006]/value', '/data[at0001]/items[at0006]/value')
          .set('q/Substance_Agent···/data[at0001]/items[at0002]/value', '/data[at0001]/items[at0002]/value');
        editorStateMock.archetypeNameAndIdMap = new Map<string, string>()
          .set('Adverse_Reaction___Allergy', 'openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1');
        editorStateMock.variableToArchetypeNameMap = new Map<string, string>()
          .set('q', 'Adverse_Reaction___Allergy');

        const tab = new Tab(TabType.NEW_QUERY, editorStateMock);
        tabService.createTab(tab);
        tabService.setActiveTab(0);

        const treeNodeMock = {
          'id': 'substance_agent',
          'name': 'Substance Agent',
          'localizedName': 'Substance Agent',
          'localizedNames': {},
          'localizedDescriptions': new Map<string, string>(),
          'nodeId': 'at0002',
          'rmType': RmType.DV_TEXT,
          'formId': '',
          'min': 1,
          'max': 1,
          'aqlPath': '/content[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1]/data[at0001]/items[at0002]/value',
          'children': [],
          'inContext': true,
          'viewConfig': undefined,
          'parentModel': {
            'id': 'adverse_reaction_-_allergy',
            'name': 'Adverse Reaction - Allergy',
            'localizedName': 'Adverse Reaction - Allergy',
            'rmType': RmType.EVALUATION,
            'nodeId': 'openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1',
            'min': 1,
            'max': -1,
            'formId': '',
            'localizedNames': {
              'en': 'Adverse Reaction - Allergy',
              'sl': '*Adverse Reaction(en)'
            },
            'localizedDescriptions': new Map<string, string>(),
            'aqlPath': '/content[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1]',
            'children': [],
            'inContext': false,
            'viewConfig': undefined
          }
        };


        const query = await queryManipulationService.applyChanges(treeNodeMock, AqlLangKeyword.EVALUATION);

        const expectedEditorState = new EditorData();
        expectedEditorState.additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>()
          .set('e', AdditionalAqlAutocompleteKeyword.EHR)
          .set('c', AdditionalAqlAutocompleteKeyword.COMPOSITION)
          .set('q', AdditionalAqlAutocompleteKeyword.EVALUATION);
        expectedEditorState.replacementMap = new Map<string, string>()
          .set('q/Comment···/data[at0001]/items[at0006]/value', '/data[at0001]/items[at0006]/value')
          .set('q/Substance_Agent···/data[at0001]/items[at0002]/value', '/data[at0001]/items[at0002]/value');
        expectedEditorState.archetypeNameAndIdMap = new Map<string, string>()
          .set('Adverse_Reaction___Allergy', 'openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1');
        expectedEditorState.variableToArchetypeNameMap = new Map<string, string>()
          .set('q', 'Adverse_Reaction___Allergy');

        const expectedQuery = '' +
          'SELECT c,\n' +
          '       q/Comment,\n' +
          '       q/Substance_Agent\n' +
          'FROM EHR e\n' +
          'CONTAINS COMPOSITION c\n' +
          'CONTAINS EVALUATION q#Adverse_Reaction___Allergy \n' +
          'OFFSET 0 LIMIT 10';

        const activeState = tabService.getActiveEditorState();

        expect(activeState.additionalKeywordVariables).toEqual(expectedEditorState.additionalKeywordVariables);
        expect(query).toEqual(expectedQuery);
      });

      describe ('add predefined object', () => {
        it('should add composition keyword', async () => {
          const currentCodeMock = '' +
            'SELECT q/Comment,\n' +
            '       q/Substance_Agent\n' +
            'FROM EHR e\n' +
            'CONTAINS EVALUATION q#Adverse_Reaction___Allergy \n' +
            'OFFSET 0 LIMIT 10';

          spyOn(queryManipulationService, 'getCurrentCode').and.returnValue(currentCodeMock);
          spyOn(ehrApiService, 'getArchetypes').and.returnValue(Promise.resolve(archetypesMock));
          // @ts-ignore
          spyOn(QueryManipulatorUtil, 'getVariableName').and.returnValue('c');

          const editorStateMock = new EditorData();
          editorStateMock.code = currentCodeMock;
          editorStateMock.additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>()
            .set('e', AdditionalAqlAutocompleteKeyword.EHR)
            .set('q', AdditionalAqlAutocompleteKeyword.EVALUATION);
          editorStateMock.replacementMap
            .set('q/Comment···/data[at0001]/items[at0006]/value', '/data[at0001]/items[at0006]/value')
            .set('q/Substance_Agent···/data[at0001]/items[at0002]/value', '/data[at0001]/items[at0002]/value');
          editorStateMock.archetypeNameAndIdMap = new Map<string, string>()
            .set('Adverse_Reaction___Allergy', 'openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1');
          editorStateMock.variableToArchetypeNameMap = new Map<string, string>()
            .set('q', 'Adverse_Reaction___Allergy');

          const tab = new Tab(TabType.NEW_QUERY, editorStateMock);
          tabService.createTab(tab);
          tabService.setActiveTab(0);

          const treeNodeMock = {
            'id': 'c7ea8813-f6e9-4f15-8f1e-fffb499b0940',
            'name': 'value',
            'localizedName': 'value',
            'localizedNames': {},
            'localizedDescriptions': new Map<string, string>(),
            'nodeId': undefined,
            'rmType': RmType.DV_TEXT,
            'formId': 'composition/name/value',
            'min': 1,
            'max': 1,
            'aqlPath': undefined,
            'children': [],
            'inContext': true,
            'viewConfig': undefined
          };


          const query = await queryManipulationService.applyChanges(treeNodeMock, AqlLangKeyword.COMPOSITION);

          const expectedEditorState = new EditorData();
          expectedEditorState.additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>()
            .set('e', AdditionalAqlAutocompleteKeyword.EHR)
            .set('c', AdditionalAqlAutocompleteKeyword.COMPOSITION)
            .set('q', AdditionalAqlAutocompleteKeyword.EVALUATION);
          expectedEditorState.replacementMap = new Map<string, string>()
            .set('q/Comment···/data[at0001]/items[at0006]/value', '/data[at0001]/items[at0006]/value')
            .set('q/Substance_Agent···/data[at0001]/items[at0002]/value', '/data[at0001]/items[at0002]/value');
          expectedEditorState.archetypeNameAndIdMap = new Map<string, string>()
            .set('Adverse_Reaction___Allergy', 'openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1');
          expectedEditorState.variableToArchetypeNameMap = new Map<string, string>()
            .set('q', 'Adverse_Reaction___Allergy');

          const expectedQuery = '' +
            'SELECT q/Comment,\n' +
            '       q/Substance_Agent,\n' +
            '       c/name/value\n' +
            'FROM EHR e\n' +
            'CONTAINS COMPOSITION c\n' +
            'CONTAINS EVALUATION q#Adverse_Reaction___Allergy \n' +
            'OFFSET 0 LIMIT 10';

          const activeState = tabService.getActiveEditorState();

          expect(activeState.additionalKeywordVariables).toEqual(expectedEditorState.additionalKeywordVariables);
          expect(query).toEqual(expectedQuery);
        });

        it('should not add composition keyword', async () => {
          const currentCodeMock = '' +
            'SELECT q/Comment,\n' +
            '       q/Substance_Agent,\n' +
            '       c/name/value\n' +
            'FROM EHR e\n' +
            'CONTAINS COMPOSITION c\n' +
            'CONTAINS EVALUATION q#Adverse_Reaction___Allergy \n' +
            'OFFSET 0 LIMIT 10';

          spyOn(queryManipulationService, 'getCurrentCode').and.returnValue(currentCodeMock);
          spyOn(ehrApiService, 'getArchetypes').and.returnValue(Promise.resolve(archetypesMock));
          // @ts-ignore
          spyOn(QueryManipulatorUtil, 'getVariableName').and.returnValue('c');

          const editorStateMock = new EditorData();
          editorStateMock.code = currentCodeMock;
          editorStateMock.additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>()
            .set('e', AdditionalAqlAutocompleteKeyword.EHR)
            .set('c', AdditionalAqlAutocompleteKeyword.COMPOSITION)
            .set('q', AdditionalAqlAutocompleteKeyword.EVALUATION);
          editorStateMock.replacementMap
            .set('q/Comment···/data[at0001]/items[at0006]/value', '/data[at0001]/items[at0006]/value')
            .set('q/Substance_Agent···/data[at0001]/items[at0002]/value', '/data[at0001]/items[at0002]/value');
          editorStateMock.archetypeNameAndIdMap = new Map<string, string>()
            .set('Adverse_Reaction___Allergy', 'openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1');
          editorStateMock.variableToArchetypeNameMap = new Map<string, string>()
            .set('q', 'Adverse_Reaction___Allergy');

          const tab = new Tab(TabType.NEW_QUERY, editorStateMock);
          tabService.createTab(tab);
          tabService.setActiveTab(0);

          const treeNodeMock = {
            'id': 'c7ea8813-f6e9-4f15-8f1e-fffb499b0940',
            'name': 'value',
            'localizedName': 'value',
            'localizedNames': {},
            'localizedDescriptions': new Map<string, string>(),
            'nodeId': undefined,
            'rmType': RmType.DV_TEXT,
            'formId': 'composition/name/value',
            'min': 1,
            'max': 1,
            'aqlPath': undefined,
            'children': [],
            'inContext': true,
            'viewConfig': undefined
          };


          const query = await queryManipulationService.applyChanges(treeNodeMock, AqlLangKeyword.COMPOSITION);

          const expectedEditorState = new EditorData();
          expectedEditorState.additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>()
            .set('e', AdditionalAqlAutocompleteKeyword.EHR)
            .set('c', AdditionalAqlAutocompleteKeyword.COMPOSITION)
            .set('q', AdditionalAqlAutocompleteKeyword.EVALUATION);
          expectedEditorState.replacementMap = new Map<string, string>()
            .set('q/Comment···/data[at0001]/items[at0006]/value', '/data[at0001]/items[at0006]/value')
            .set('q/Substance_Agent···/data[at0001]/items[at0002]/value', '/data[at0001]/items[at0002]/value');
          expectedEditorState.archetypeNameAndIdMap = new Map<string, string>()
            .set('Adverse_Reaction___Allergy', 'openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1');
          expectedEditorState.variableToArchetypeNameMap = new Map<string, string>()
            .set('q', 'Adverse_Reaction___Allergy');

          const expectedQuery = '' +
            'SELECT q/Comment,\n' +
            '       q/Substance_Agent,\n' +
            '       c/name/value\n' +
            'FROM EHR e\n' +
            'CONTAINS COMPOSITION c\n' +
            'CONTAINS EVALUATION q#Adverse_Reaction___Allergy \n' +
            'OFFSET 0 LIMIT 10';

          const activeState = tabService.getActiveEditorState();

          expect(activeState.additionalKeywordVariables).toEqual(expectedEditorState.additionalKeywordVariables);
          expect(query).toEqual(expectedQuery);
        });

        it('should add ehr keyword', async () => {
          const currentCodeMock = '' +
            'SELECT q/Comment,\n' +
            '       q/Substance_Agent\n' +
            'FROM COMPOSITION c\n' +
            'CONTAINS EVALUATION q#Adverse_Reaction___Allergy \n' +
            'OFFSET 0 LIMIT 10';

          spyOn(queryManipulationService, 'getCurrentCode').and.returnValue(currentCodeMock);
          spyOn(ehrApiService, 'getArchetypes').and.returnValue(Promise.resolve(archetypesMock));
          // @ts-ignore
          spyOn(QueryManipulatorUtil, 'getVariableName').and.returnValue('e');

          const editorStateMock = new EditorData();
          editorStateMock.code = currentCodeMock;
          editorStateMock.additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>()
            .set('c', AdditionalAqlAutocompleteKeyword.COMPOSITION)
            .set('q', AdditionalAqlAutocompleteKeyword.EVALUATION);
          editorStateMock.replacementMap
            .set('q/Comment···/data[at0001]/items[at0006]/value', '/data[at0001]/items[at0006]/value')
            .set('q/Substance_Agent···/data[at0001]/items[at0002]/value', '/data[at0001]/items[at0002]/value');
          editorStateMock.archetypeNameAndIdMap = new Map<string, string>()
            .set('Adverse_Reaction___Allergy', 'openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1');
          editorStateMock.variableToArchetypeNameMap = new Map<string, string>()
            .set('q', 'Adverse_Reaction___Allergy');

          const tab = new Tab(TabType.NEW_QUERY, editorStateMock);
          tabService.createTab(tab);
          tabService.setActiveTab(0);

          const treeNodeMock = {
            'id': 'c7ea8813-f6e9-4f15-8f1e-fffb499b0940',
            'name': 'value',
            'localizedName': 'value',
            'localizedNames': {},
            'localizedDescriptions': new Map<string, string>(),
            'nodeId': undefined,
            'rmType': RmType.DV_TEXT,
            'formId': 'ehr/ehr_id/value',
            'min': 1,
            'max': 1,
            'aqlPath': undefined,
            'children': [],
            'inContext': true,
            'viewConfig': undefined
          };


          const query = await queryManipulationService.applyChanges(treeNodeMock, AqlLangKeyword.EHR);

          const expectedEditorState = new EditorData();
          expectedEditorState.additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>()
            .set('e', AdditionalAqlAutocompleteKeyword.EHR)
            .set('c', AdditionalAqlAutocompleteKeyword.COMPOSITION)
            .set('q', AdditionalAqlAutocompleteKeyword.EVALUATION);
          expectedEditorState.replacementMap = new Map<string, string>()
            .set('q/Comment···/data[at0001]/items[at0006]/value', '/data[at0001]/items[at0006]/value')
            .set('q/Substance_Agent···/data[at0001]/items[at0002]/value', '/data[at0001]/items[at0002]/value');
          expectedEditorState.archetypeNameAndIdMap = new Map<string, string>()
            .set('Adverse_Reaction___Allergy', 'openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1');
          expectedEditorState.variableToArchetypeNameMap = new Map<string, string>()
            .set('q', 'Adverse_Reaction___Allergy');

          const expectedQuery = '' +
            'SELECT q/Comment,\n' +
            '       q/Substance_Agent,\n' +
            '       e/ehr_id/value\n' +
            'FROM EHR e \n' +
            'CONTAINS COMPOSITION c\n' +
            'CONTAINS EVALUATION q#Adverse_Reaction___Allergy \n' +
            'OFFSET 0 LIMIT 10';

          const activeState = tabService.getActiveEditorState();

          expect(activeState.additionalKeywordVariables).toEqual(expectedEditorState.additionalKeywordVariables);
          expect(query).toEqual(expectedQuery);
        });

        it('should not add ehr keyword', async () => {
          const currentCodeMock = '' +
            'SELECT q/Comment,\n' +
            '       q/Substance_Agent,\n' +
            '       e/ehr_id/value\n' +
            'FROM EHR e \n' +
            'CONTAINS COMPOSITION c\n' +
            'CONTAINS EVALUATION q#Adverse_Reaction___Allergy \n' +
            'OFFSET 0 LIMIT 10';

          spyOn(queryManipulationService, 'getCurrentCode').and.returnValue(currentCodeMock);
          spyOn(ehrApiService, 'getArchetypes').and.returnValue(Promise.resolve(archetypesMock));
          // @ts-ignore
          spyOn(QueryManipulatorUtil, 'getVariableName').and.returnValue('e');

          const editorStateMock = new EditorData();
          editorStateMock.code = currentCodeMock;
          editorStateMock.additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>()
            .set('c', AdditionalAqlAutocompleteKeyword.COMPOSITION)
            .set('e', AdditionalAqlAutocompleteKeyword.EHR)
            .set('q', AdditionalAqlAutocompleteKeyword.EVALUATION);
          editorStateMock.replacementMap
            .set('q/Comment···/data[at0001]/items[at0006]/value', '/data[at0001]/items[at0006]/value')
            .set('q/Substance_Agent···/data[at0001]/items[at0002]/value', '/data[at0001]/items[at0002]/value');
          editorStateMock.archetypeNameAndIdMap = new Map<string, string>()
            .set('Adverse_Reaction___Allergy', 'openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1');
          editorStateMock.variableToArchetypeNameMap = new Map<string, string>()
            .set('q', 'Adverse_Reaction___Allergy');

          const tab = new Tab(TabType.NEW_QUERY, editorStateMock);
          tabService.createTab(tab);
          tabService.setActiveTab(0);

          const treeNodeMock = {
            'id': 'c7ea8813-f6e9-4f15-8f1e-fffb499b0940',
            'name': 'value',
            'localizedName': 'value',
            'localizedNames': {},
            'localizedDescriptions': new Map<string, string>(),
            'nodeId': undefined,
            'rmType': RmType.DV_TEXT,
            'formId': 'ehr/ehr_id/value',
            'min': 1,
            'max': 1,
            'aqlPath': undefined,
            'children': [],
            'inContext': true,
            'viewConfig': undefined
          };


          const query = await queryManipulationService.applyChanges(treeNodeMock, AqlLangKeyword.EHR);

          const expectedEditorState = new EditorData();
          expectedEditorState.additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>()
            .set('e', AdditionalAqlAutocompleteKeyword.EHR)
            .set('c', AdditionalAqlAutocompleteKeyword.COMPOSITION)
            .set('q', AdditionalAqlAutocompleteKeyword.EVALUATION);
          expectedEditorState.replacementMap = new Map<string, string>()
            .set('q/Comment···/data[at0001]/items[at0006]/value', '/data[at0001]/items[at0006]/value')
            .set('q/Substance_Agent···/data[at0001]/items[at0002]/value', '/data[at0001]/items[at0002]/value');
          expectedEditorState.archetypeNameAndIdMap = new Map<string, string>()
            .set('Adverse_Reaction___Allergy', 'openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1');
          expectedEditorState.variableToArchetypeNameMap = new Map<string, string>()
            .set('q', 'Adverse_Reaction___Allergy');

          const expectedQuery = '' +
            'SELECT q/Comment,\n' +
            '       q/Substance_Agent,\n' +
            '       e/ehr_id/value\n' +
            'FROM EHR e \n' +
            'CONTAINS COMPOSITION c\n' +
            'CONTAINS EVALUATION q#Adverse_Reaction___Allergy \n' +
            'OFFSET 0 LIMIT 10';

          const activeState = tabService.getActiveEditorState();

          expect(activeState.additionalKeywordVariables).toEqual(expectedEditorState.additionalKeywordVariables);
          expect(query).toEqual(expectedQuery);
        });
      });

      describe('hierarchy', () => {
        it ('should append first child cluster', async () => {
          const currentCodeMock = '' +
            'SELECT l/Test_name\n' +
            'FROM EHR e\n' +
            'CONTAINS COMPOSITION c\n' +
            'CONTAINS OBSERVATION l#Laboratory_test_result \n' +
            'OFFSET 0 LIMIT 10';

          spyOn(queryManipulationService, 'getCurrentCode').and.returnValue(currentCodeMock);
          // @ts-ignore
          spyOn(QueryManipulatorUtil, 'getVariableName').and.returnValue('g');

          const editorStateMock = new EditorData();
          editorStateMock.code = currentCodeMock;
          editorStateMock.additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>()
            .set('e', AdditionalAqlAutocompleteKeyword.EHR)
            .set('c', AdditionalAqlAutocompleteKeyword.COMPOSITION)
            .set('l', AdditionalAqlAutocompleteKeyword.OBSERVATION);
          editorStateMock.replacementMap
            .set('l/Test_name···/data[at0001]/events[at0002]/data[at0003]/items[at0005]/value', '/data[at0001]/events[at0002]/data[at0003]/items[at0005]/value');
          editorStateMock.archetypeNameAndIdMap = new Map<string, string>()
            .set('Laboratory_test_result', 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1');
          editorStateMock.variableToArchetypeNameMap = new Map<string, string>()
            .set('l', 'Laboratory_test_result');

          const tab = new Tab(TabType.NEW_QUERY, editorStateMock);
          tabService.createTab(tab);
          tabService.setActiveTab(0);


          const expectedQuery = '' +
            'SELECT l/Test_name,\n' +
            '       g/Specimen_type\n' +
            'FROM EHR e\n' +
            'CONTAINS COMPOSITION c\n' +
            'CONTAINS OBSERVATION l#Laboratory_test_result CONTAINS (CLUSTER g#Specimen) \n' +
            'OFFSET 0 LIMIT 10';

          const expectedEditorState = new EditorData();
          expectedEditorState.code = currentCodeMock;
          expectedEditorState.additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>()
            .set('e', AdditionalAqlAutocompleteKeyword.EHR)
            .set('c', AdditionalAqlAutocompleteKeyword.COMPOSITION)
            .set('l', AdditionalAqlAutocompleteKeyword.OBSERVATION)
            .set('g', AdditionalAqlAutocompleteKeyword.CLUSTER);
          expectedEditorState.replacementMap
            .set('l/Test_name···/data[at0001]/events[at0002]/data[at0003]/items[at0005]/value', '/data[at0001]/events[at0002]/data[at0003]/items[at0005]/value')
            .set('g/Specimen_type···/items[at0029]/value', '/items[at0029]/value');
          expectedEditorState.archetypeNameAndIdMap = new Map<string, string>()
            .set('Laboratory_test_result', 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1');
          expectedEditorState.variableToArchetypeNameMap = new Map<string, string>()
            .set('l', 'Laboratory_test_result')
            .set('g', 'Specimen');

          prepareTemplate(laboratoryTestTemplate, templateMap);
          const specimentAql = '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[at0029]/value';
          const query = await queryManipulationService.applyChanges(templateMap.get(specimentAql), AqlLangKeyword.CLUSTER);

          expect(query).toEqual(expectedQuery);
        });

        it ('should append child cluster on the same level with one that already exists', async () => {
          const currentCodeMock = '' +
            'SELECT l/Test_name,\n' +
            '       g/Specimen_type\n' +
            'FROM EHR e\n' +
            'CONTAINS COMPOSITION c\n' +
            'CONTAINS OBSERVATION l#Laboratory_test_result \n' +
            'CONTAINS CLUSTER g#Specimen \n' +
            'OFFSET 0 LIMIT 10';


          spyOn(queryManipulationService, 'getCurrentCode').and.returnValue(currentCodeMock);
          // @ts-ignore
          spyOn(QueryManipulatorUtil, 'getVariableName').and.returnValue('z');

          const editorStateMock = new EditorData();
          editorStateMock.code = currentCodeMock;
          editorStateMock.additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>()
            .set('e', AdditionalAqlAutocompleteKeyword.EHR)
            .set('c', AdditionalAqlAutocompleteKeyword.COMPOSITION)
            .set('l', AdditionalAqlAutocompleteKeyword.OBSERVATION)
            .set('g', AdditionalAqlAutocompleteKeyword.CLUSTER);
          editorStateMock.replacementMap
            .set('l/Test_name···/data[at0001]/events[at0002]/data[at0003]/items[at0005]/value', '/data[at0001]/events[at0002]/data[at0003]/items[at0005]/value')
            .set('g/Specimen_type···/items[at0029]/value', '/items[at0029]/value');
          editorStateMock.archetypeNameAndIdMap = new Map<string, string>()
            .set('Laboratory_test_result', 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1')
            .set('Specimen', 'openEHR-EHR-CLUSTER.specimen.v0');
          editorStateMock.variableToArchetypeNameMap = new Map<string, string>()
            .set('l', 'Laboratory_test_result');

          const tab = new Tab(TabType.NEW_QUERY, editorStateMock);
          tabService.createTab(tab);
          tabService.setActiveTab(0);


          const expectedQuery = '' +
            'SELECT l/Test_name,\n' +
            '       g/Specimen_type,\n' +
            '       z/Analyte_name\n' +
            'FROM EHR e\n' +
            'CONTAINS COMPOSITION c\n' +
            'CONTAINS OBSERVATION l#Laboratory_test_result \n' +
            'CONTAINS (CLUSTER g#Specimen and CLUSTER z#Laboratory_analyte_result) \n' +
            'OFFSET 0 LIMIT 10';

          const expectedEditorState = new EditorData();
          expectedEditorState.code = currentCodeMock;
          expectedEditorState.additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>()
            .set('e', AdditionalAqlAutocompleteKeyword.EHR)
            .set('c', AdditionalAqlAutocompleteKeyword.COMPOSITION)
            .set('l', AdditionalAqlAutocompleteKeyword.OBSERVATION)
            .set('g', AdditionalAqlAutocompleteKeyword.CLUSTER)
            .set('z', AdditionalAqlAutocompleteKeyword.CLUSTER);
          expectedEditorState.replacementMap
            .set('l/Test_name···/data[at0001]/events[at0002]/data[at0003]/items[at0005]/value', '/data[at0001]/events[at0002]/data[at0003]/items[at0005]/value')
            .set('g/Specimen_type···/items[at0029]/value', '/items[at0029]/value')
            .set('z/Analyte_name···/items[at0024]/value', '/items[at0024]/value');
          expectedEditorState.archetypeNameAndIdMap = new Map<string, string>()
            .set('Laboratory_test_result', 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1')
            .set('Specimen', 'openEHR-EHR-CLUSTER.specimen.v0')
            .set('Laboratory_analyte_result', 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1');
          expectedEditorState.variableToArchetypeNameMap = new Map<string, string>()
            .set('l', 'Laboratory_test_result')
            .set('g', 'Specimen')
            .set('z', 'Laboratory_analyte_result');

          prepareTemplate(laboratoryTestTemplate, templateMap);
          // tslint:disable-next-line:max-line-length
          const analyteName = '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.laboratory_test_analyte.v1]/items[at0024]/value';
          const query = await queryManipulationService.applyChanges(templateMap.get(analyteName), AqlLangKeyword.CLUSTER);

          expect(query).toEqual(expectedQuery);
        });

        it ('should append child on the same level as already existing archetype in query wich already has contains content', async () => {
          const currentCodeMock = '' +
            'SELECT l/Test_name,\n' +
            '       g/Specimen_type,\n' +
            '       z/Analyte_name\n' +
            'FROM EHR e\n' +
            'CONTAINS COMPOSITION c\n' +
            'CONTAINS OBSERVATION l#Laboratory_test_result \n' +
            'CONTAINS (CLUSTER g#Specimen and CLUSTER z#Laboratory_analyte_result) \n' +
            'OFFSET 0 LIMIT 10';

          spyOn(queryManipulationService, 'getCurrentCode').and.returnValue(currentCodeMock);

          // @ts-ignore
          spyOn(QueryManipulatorUtil, 'getVariableName').and.returnValue('d');

          const editorStateMock = new EditorData();
          editorStateMock.code = currentCodeMock;
          editorStateMock.additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>()
            .set('e', AdditionalAqlAutocompleteKeyword.EHR)
            .set('c', AdditionalAqlAutocompleteKeyword.COMPOSITION)
            .set('l', AdditionalAqlAutocompleteKeyword.OBSERVATION)
            .set('g', AdditionalAqlAutocompleteKeyword.CLUSTER)
            .set('z', AdditionalAqlAutocompleteKeyword.CLUSTER);
          editorStateMock.replacementMap
            .set('l/Test_name···/data[at0001]/events[at0002]/data[at0003]/items[at0005]/value', '/data[at0001]/events[at0002]/data[at0003]/items[at0005]/value')
            .set('g/Specimen_type···/items[at0029]/value', '/items[at0029]/value')
            .set('z/Analyte_name···/items[at0024]/value', '/items[at0024]/value');
          editorStateMock.archetypeNameAndIdMap = new Map<string, string>()
            .set('Laboratory_test_result', 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1')
            .set('Specimen', 'openEHR-EHR-CLUSTER.specimen.v0')
            .set('Laboratory_analyte_result', 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1');
          editorStateMock.variableToArchetypeNameMap = new Map<string, string>()
            .set('l', 'Laboratory_test_result')
            .set('g', 'Specimen')
            .set('z', 'Laboratory_analyte_result');

          const tab = new Tab(TabType.NEW_QUERY, editorStateMock);
          tabService.createTab(tab);
          tabService.setActiveTab(0);

          const expectedQuery = '' +
            'SELECT l/Test_name,\n' +
            '       g/Specimen_type,\n' +
            '       z/Analyte_name,\n' +
            '       d\n' +
            'FROM EHR e\n' +
            'CONTAINS COMPOSITION c\n' +
            'CONTAINS (OBSERVATION l#Laboratory_test_result \n' +
            'CONTAINS (CLUSTER g#Specimen and CLUSTER z#Laboratory_analyte_result) and EVALUATION d#Laboratory_test_result_comment) \n' +
            'OFFSET 0 LIMIT 10';

          const expectedEditorState = new EditorData();
          expectedEditorState.code = currentCodeMock;
          expectedEditorState.additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>()
            .set('e', AdditionalAqlAutocompleteKeyword.EHR)
            .set('c', AdditionalAqlAutocompleteKeyword.COMPOSITION)
            .set('l', AdditionalAqlAutocompleteKeyword.OBSERVATION)
            .set('g', AdditionalAqlAutocompleteKeyword.CLUSTER)
            .set('d', AdditionalAqlAutocompleteKeyword.EVALUATION);
          expectedEditorState.replacementMap
            .set('l/Test_name···/data[at0001]/events[at0002]/data[at0003]/items[at0005]/value', '/data[at0001]/events[at0002]/data[at0003]/items[at0005]/value')
            .set('g/Specimen_type···/items[at0029]/value', '/items[at0029]/value')
            .set('z/Analyte_name···/items[at0024]/value', '/items[at0024]/value')
            .set('d/Laboratory_test_result_comment···/data[at0001]/items[at0002,\'Laboratory test result comment\']/value', '/data[at0001]/items[at0002,\'Laboratory test result comment\']/value');
          expectedEditorState.archetypeNameAndIdMap = new Map<string, string>()
            .set('Laboratory_test_result', 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1')
            .set('Specimen', 'openEHR-EHR-CLUSTER.specimen.v0')
            .set('Laboratory_analyte_result', 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1')
            .set('Laboratory_test_result_comment', 'openEHR-EHR-EVALUATION.clinical_synopsis.v1');
          expectedEditorState.variableToArchetypeNameMap = new Map<string, string>()
            .set('l', 'Laboratory_test_result')
            .set('g', 'Specimen')
            .set('z', 'Laboratory_analyte_result');

          prepareTemplate(laboratoryTestTemplate, templateMap);
          // tslint:disable-next-line:max-line-length
          const analyteName = '/content[openEHR-EHR-EVALUATION.clinical_synopsis.v1,\'Laboratory test result comment\']/data[at0001]/items[at0002,\'Laboratory test result comment\']/value';
          const query = await queryManipulationService.applyChanges(templateMap.get(analyteName), AqlLangKeyword.CLUSTER);

          expect(query).toEqual(expectedQuery);
        });

        it ('should append parent before existing child', async () => {
          const currentCodeMock = '' +
            'SELECT r/Specimen_type\n' +
            'FROM EHR e\n' +
            'CONTAINS COMPOSITION c\n' +
            'CONTAINS CLUSTER r#Specimen \n' +
            'OFFSET 0 LIMIT 10';

          spyOn(queryManipulationService, 'getCurrentCode').and.returnValue(currentCodeMock);

          // @ts-ignore
          spyOn(QueryManipulatorUtil, 'getVariableName').and.returnValue('l');

          const editorStateMock = new EditorData();
          editorStateMock.code = currentCodeMock;
          editorStateMock.additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>()
            .set('e', AdditionalAqlAutocompleteKeyword.EHR)
            .set('c', AdditionalAqlAutocompleteKeyword.COMPOSITION)
            .set('r', AdditionalAqlAutocompleteKeyword.CLUSTER);
          editorStateMock.replacementMap
            .set('r/Specimen_type···/items[at0029]/value', '/items[at0029]/value');
          editorStateMock.archetypeNameAndIdMap = new Map<string, string>()
            .set('Specimen', 'openEHR-EHR-CLUSTER.specimen.v0');
          editorStateMock.variableToArchetypeNameMap = new Map<string, string>()
            .set('r', 'Specimen');

          const tab = new Tab(TabType.NEW_QUERY, editorStateMock);
          tabService.createTab(tab);
          tabService.setActiveTab(0);


          const expectedQuery = '' +
            'SELECT r/Specimen_type,\n' +
            '       l/Test_name\n' +
            'FROM EHR e\n' +
            'CONTAINS COMPOSITION c\n' +
            'CONTAINS OBSERVATION l#Laboratory_test_result\n' +
            'CONTAINS CLUSTER r#Specimen \n' +
            'OFFSET 0 LIMIT 10';

          const expectedEditorState = new EditorData();
          expectedEditorState.code = currentCodeMock;
          expectedEditorState.additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>()
            .set('e', AdditionalAqlAutocompleteKeyword.EHR)
            .set('c', AdditionalAqlAutocompleteKeyword.COMPOSITION)
            .set('r', AdditionalAqlAutocompleteKeyword.CLUSTER)
            .set('l', AdditionalAqlAutocompleteKeyword.OBSERVATION);
          expectedEditorState.replacementMap
            .set('l/Test_name···/data[at0001]/events[at0002]/data[at0003]/items[at0005]/value', '/data[at0001]/events[at0002]/data[at0003]/items[at0005]/value')
            .set('r/Specimen_type···/items[at0029]/value', '/items[at0029]/value');
          expectedEditorState.archetypeNameAndIdMap = new Map<string, string>()
            .set('Laboratory_test_result', 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1')
            .set('Specimen', 'openEHR-EHR-CLUSTER.specimen.v0');
          expectedEditorState.variableToArchetypeNameMap = new Map<string, string>()
            .set('l', 'Laboratory_test_result')
            .set('r', 'Specimen');

          prepareTemplate(laboratoryTestTemplate, templateMap);
          const fieldAql = '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0005]/value';
          const query = await queryManipulationService.applyChanges(templateMap.get(fieldAql), AqlLangKeyword.CLUSTER);

          expect(query).toEqual(expectedQuery);
        });

        it ('should append child to existing archetype in code', async () => {
          const currentCodeMock = '' +
            'SELECT h/Route,\n' +
            '       u/Dose_description\n' +
            'FROM EHR e\n' +
            'CONTAINS COMPOSITION c\n' +
            'CONTAINS SECTION t#Medication_detail\n' +
            'CONTAINS (CLUSTER h#Medicine_administered and INSTRUCTION u#Medication_instruction) \n' +
            'OFFSET 0 LIMIT 10';

          spyOn(queryManipulationService, 'getCurrentCode').and.returnValue(currentCodeMock);

          // @ts-ignore
          spyOn(QueryManipulatorUtil, 'getVariableName').and.returnValue('d');

          const editorStateMock = new EditorData();
          editorStateMock.code = currentCodeMock;
          editorStateMock.additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>()
            .set('e', AdditionalAqlAutocompleteKeyword.EHR)
            .set('t', AdditionalAqlAutocompleteKeyword.SECTION)
            .set('c', AdditionalAqlAutocompleteKeyword.COMPOSITION)
            .set('h', AdditionalAqlAutocompleteKeyword.CLUSTER)
            .set('u', AdditionalAqlAutocompleteKeyword.INSTRUCTION);
          editorStateMock.replacementMap
            .set('h/Route···/items[at0001]/value', '/items[at0001]/value')
            .set('u/Dose_description···/activities[at0001]/description[at0002]/items[at0005]/value', '/activities[at0001]/description[at0002]/items[at0005]/value');
          editorStateMock.archetypeNameAndIdMap = new Map<string, string>()
            .set('Medicine_administered', 'openEHR-EHR-CLUSTER.medication_admin.v1')
            .set('Medication_detail', 'openEHR-EHR-SECTION.medication.v1')
            .set('Medication_instruction', 'openEHR-EHR-INSTRUCTION.medication.v1');
          editorStateMock.variableToArchetypeNameMap = new Map<string, string>()
            .set('t', 'Medication_detail')
            .set('h', 'Medicine_administered')
            .set('u', 'Medication_instruction');

          const tab = new Tab(TabType.NEW_QUERY, editorStateMock);
          tabService.createTab(tab);
          tabService.setActiveTab(0);


          const expectedQuery = '' +
            'SELECT h/Route,\n' +
            '       u/Dose_description,\n' +
            '       d/Delivery_method\n' +
            'FROM EHR e\n' +
            'CONTAINS COMPOSITION c\n' +
            'CONTAINS SECTION t#Medication_detail\n' +
            'CONTAINS (CLUSTER h#Medicine_administered and INSTRUCTION u#Medication_instruction CONTAINS (CLUSTER d#Administration_details)) \n' +
            'OFFSET 0 LIMIT 10';

          const expectedEditorState = new EditorData();
          expectedEditorState.code = currentCodeMock;
          expectedEditorState.additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>()
            .set('e', AdditionalAqlAutocompleteKeyword.EHR)
            .set('c', AdditionalAqlAutocompleteKeyword.COMPOSITION)
            .set('t', AdditionalAqlAutocompleteKeyword.SECTION)
            .set('h', AdditionalAqlAutocompleteKeyword.CLUSTER)
            .set('u', AdditionalAqlAutocompleteKeyword.INSTRUCTION)
            .set('d', AdditionalAqlAutocompleteKeyword.CLUSTER);
          expectedEditorState.replacementMap
            .set('h/Route···/items[at0001]/value', '/items[at0001]/value')
            .set('u/Dose_description···/activities[at0001]/description[at0002]/items[at0005]/value', '/activities[at0001]/description[at0002]/items[at0005]/value')
            .set('d/Delivery_method···/items[at0003]/value', '/items[at0003]/value');
          editorStateMock.archetypeNameAndIdMap = new Map<string, string>()
            .set('Medicine_administered', 'openEHR-EHR-CLUSTER.medication_admin.v1')
            .set('Medication_detail', 'openEHR-EHR-SECTION.medication.v1')
            .set('Medication_instruction', 'openEHR-EHR-INSTRUCTION.medication.v1')
            .set('Administration_details', 'openEHR-EHR-CLUSTER.medication_admin.v1');
          expectedEditorState.variableToArchetypeNameMap = new Map<string, string>()
            .set('t', 'Medication_detail')
            .set('h', 'Medicine_administered')
            .set('u', 'Medication_instruction')
            .set('d', 'Administration_details');

          prepareTemplate(medicationOrderTemplate, templateMap);
          const fieldAql = '/content[openEHR-EHR-SECTION.medication.v1,\'Medication detail\']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_admin.v1,\'Administration details\']/items[at0003]/value';
          const query = await queryManipulationService.applyChanges(templateMap.get(fieldAql), AqlLangKeyword.CLUSTER);

          expect(query).toEqual(expectedQuery);
        });

        it ('should append child to existing archetype which already has a child in code', async () => {
          const currentCodeMock = '' +
            'SELECT h/Route,\n' +
            '       u/Dose_description,\n' +
            '       d/Delivery_method\n' +
            'FROM EHR e\n' +
            'CONTAINS COMPOSITION c\n' +
            'CONTAINS SECTION t#Medication_detail\n' +
            'CONTAINS (CLUSTER h#Medicine_administered and INSTRUCTION u#Medication_instruction CONTAINS (CLUSTER d#Administration_details)) \n' +
            'OFFSET 0 LIMIT 10';

          spyOn(queryManipulationService, 'getCurrentCode').and.returnValue(currentCodeMock);

          // @ts-ignore
          spyOn(QueryManipulatorUtil, 'getVariableName').and.returnValue('z');

          const editorStateMock = new EditorData();
          editorStateMock.code = currentCodeMock;
          editorStateMock.additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>()
            .set('e', AdditionalAqlAutocompleteKeyword.EHR)
            .set('c', AdditionalAqlAutocompleteKeyword.COMPOSITION)
            .set('t', AdditionalAqlAutocompleteKeyword.SECTION)
            .set('h', AdditionalAqlAutocompleteKeyword.CLUSTER)
            .set('u', AdditionalAqlAutocompleteKeyword.INSTRUCTION)
            .set('d', AdditionalAqlAutocompleteKeyword.CLUSTER);
          editorStateMock.replacementMap
            .set('h/Route···/items[at0001]/value', '/items[at0001]/value')
            .set('u/Dose_description···/activities[at0001]/description[at0002]/items[at0005]/value', '/activities[at0001]/description[at0002]/items[at0005]/value')
            .set('d/Delivery_method···/items[at0003]/value', '/items[at0003]/value');
          editorStateMock.archetypeNameAndIdMap = new Map<string, string>()
            .set('Medicine_administered', 'openEHR-EHR-CLUSTER.medication_admin.v1')
            .set('Medication_detail', 'openEHR-EHR-SECTION.medication.v1')
            .set('Medication_instruction', 'openEHR-EHR-INSTRUCTION.medication.v1')
            .set('Administration_details', 'openEHR-EHR-CLUSTER.medication_admin.v1');
          editorStateMock.variableToArchetypeNameMap = new Map<string, string>()
            .set('t', 'Medication_detail')
            .set('h', 'Medicine_administered')
            .set('u', 'Medication_instruction')
            .set('d', 'Administration_details');

          const tab = new Tab(TabType.NEW_QUERY, editorStateMock);
          tabService.createTab(tab);
          tabService.setActiveTab(0);


          const expectedQuery = '' +
            'SELECT h/Route,\n' +
            '       u/Dose_description,\n' +
            '       d/Delivery_method,\n' +
            '       z/Dose_unit\n' +
            'FROM EHR e\n' +
            'CONTAINS COMPOSITION c\n' +
            'CONTAINS SECTION t#Medication_detail\n' +
            'CONTAINS (CLUSTER h#Medicine_administered and INSTRUCTION u#Medication_instruction CONTAINS (CLUSTER d#Administration_details and CLUSTER z#Structured_dose)) \n' +
            'OFFSET 0 LIMIT 10';

          const expectedEditorState = new EditorData();
          expectedEditorState.code = currentCodeMock;
          expectedEditorState.additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>()
            .set('e', AdditionalAqlAutocompleteKeyword.EHR)
            .set('c', AdditionalAqlAutocompleteKeyword.COMPOSITION)
            .set('h', AdditionalAqlAutocompleteKeyword.CLUSTER)
            .set('u', AdditionalAqlAutocompleteKeyword.INSTRUCTION)
            .set('d', AdditionalAqlAutocompleteKeyword.CLUSTER)
            .set('z', AdditionalAqlAutocompleteKeyword.CLUSTER);
          expectedEditorState.replacementMap
            .set('h/Route···/items[at0001]/value', '/items[at0001]/value')
            .set('u/Dose_description···/activities[at0001]/description[at0002]/items[at0005]/value', '/activities[at0001]/description[at0002]/items[at0005]/value')
            .set('d/Delivery_method···/items[at0003]/value', '/items[at0003]/value')
            .set('z/Dose_unit···/items[at0002]/value', '/items[at0002]/value');
          editorStateMock.archetypeNameAndIdMap = new Map<string, string>()
            .set('Medicine_administered', 'openEHR-EHR-CLUSTER.medication_admin.v1')
            .set('Medication_detail', 'openEHR-EHR-SECTION.medication.v1')
            .set('Medication_instruction', 'openEHR-EHR-INSTRUCTION.medication.v1')
            .set('Administration_details', 'openEHR-EHR-CLUSTER.medication_admin.v1')
            .set('Structured_dose', 'openEHR-EHR-CLUSTER.medication_amount.v1');
          expectedEditorState.variableToArchetypeNameMap = new Map<string, string>()
            .set('t', 'Medication_detail')
            .set('h', 'Medicine_administered')
            .set('u', 'Medication_instruction')
            .set('d', 'Administration_details')
            .set('z', 'Structured_dose');

          prepareTemplate(medicationOrderTemplate, templateMap);
          const fieldAql = '/content[openEHR-EHR-SECTION.medication.v1,\'Medication detail\']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_amount.v1,\'Structured dose\']/items[at0002]/value';
          const query = await queryManipulationService.applyChanges(templateMap.get(fieldAql), AqlLangKeyword.CLUSTER);

          expect(query).toEqual(expectedQuery);
        });
      });
    });

  });

});


function getMockedEditorState(): EditorData {
  const editorStateMock: EditorData = new EditorData();
  editorStateMock.replacementMap = new Map<string, string>()
    .set('r/Substance_Agent···/data[at0001]/items[at0002]/value', '/data[at0001]/items[at0002]/value')
    .set('r/Comment···/data[at0001]/items[at0006]/value', '/data[at0001]/items[at0006]/value');

  editorStateMock.additionalKeywordVariables = new Map<string, AdditionalAqlAutocompleteKeyword>()
    .set('e', AdditionalAqlAutocompleteKeyword.EHR)
    .set('a', AdditionalAqlAutocompleteKeyword.COMPOSITION)
    .set('r', AdditionalAqlAutocompleteKeyword.EVALUATION);
  editorStateMock.archetypeNameAndIdMap = new Map<string, string>()
    .set('Adverse_Reaction___Allergy', 'openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1');

  editorStateMock.variableToArchetypeNameMap = new Map<string, string>()
    .set('r', 'Adverse_Reaction___Allergy');

  return editorStateMock;
}

function prepareTemplate(template: any, templateMap: Map<string, TreeNode>): Template {
  prepareChildren(template.webTemplate.tree, templateMap);
  return template;
}

function prepareChildren(tree: TreeNode, templateMap: Map<string, TreeNode>) {
  tree.children.forEach(child => {
    child.parentModel = tree;
    templateMap.set(child.aqlPath, child);
    if (child.children) {
      prepareChildren(child, templateMap);
    }
  });
}

const rootTreeNodeMock = {
  'id': 'allergies',
  'name': 'Allergies',
  'localizedName': 'Allergies',
  'rmType': RmType.COMPOSITION,
  'nodeId': 'openEHR-EHR-COMPOSITION.summary.v1',
  'formId': '',
  'min': 1,
  'max': 1,
  'localizedNames': {
    'en': 'Allergies'
  },
  'localizedDescriptions': new Map<string, string>(),
  'aqlPath': '',
  'children': [],
  'inContext': true,
  'viewConfig': undefined
};

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
