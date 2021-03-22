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
import {EhrApiService} from './ehr-api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ToastrModule} from 'ngx-toastr';
import {TranslateModule} from '@ngx-translate/core';
import {CoreModule} from './core.module';
import {AppContextService} from './app-context.service';

describe('EhrApiService', () => {
  let service: EhrApiService;
  let httpMock: HttpTestingController;
  let appContextService: AppContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        TranslateModule.forRoot()
      ],
      providers: []
    });

    httpMock = TestBed.inject<HttpTestingController>(HttpTestingController);
    appContextService = TestBed.inject(AppContextService);

    appContextService.setContext('ehrscape.com', 'testToken');

    service = TestBed.inject<EhrApiService>(EhrApiService);
  });


  describe('#getTemplateIDs', () => {
    it('should return an Observable<TemplateID[]>', () => {
      const dummyTemplateIDs = {
        'templates': [
          {
            'templateId': 'Allergies',
            'createdOn': '2014-04-04T11:52:01.546Z'
          },
          {
            'templateId': 'Clinical Report',
            'createdOn': '2014-04-04T11:52:01.595Z'
          },
          {
            'templateId': 'Digiscope',
            'createdOn': '2014-12-08T07:51:00.080Z'
          },
          {
            'templateId': 'Vital Signs',
            'createdOn': '2015-10-26T07:36:16.095Z'
          }
        ]
      };

      service.getTemplateIDs().subscribe(templates => {
        expect(templates.length).toBe(4);
        expect(templates[0].templateId).toBe('Allergies');
        expect(templates[3].templateId).toBe('Vital Signs');
      });

      const req = httpMock.expectOne(`${appContextService.getRestUrl()}/template`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyTemplateIDs);
    });
  });

  /* tslint:disable:max-line-length */
  describe('#getWebTemplate', () => {
    it('should return an Observable<Template> with id "Allergies"', () => {
      const templateId = 'Allergies';
      const dummyTemplate = {
        'meta': {
          'href': 'https://rest.ehrscape.com/rest/v1/template/Allergies'
        },
        'webTemplate': {
          'templateId': 'Allergies',
          'version': '2.3',
          'defaultLanguage': 'en',
          'languages': [
            'en',
            'sl'
          ],
          'tree': {
            'id': 'allergies',
            'name': 'Allergies',
            'localizedName': 'Allergies',
            'rmType': 'COMPOSITION',
            'nodeId': 'openEHR-EHR-COMPOSITION.summary.v1',
            'min': 1,
            'max': 1,
            'localizedNames': {
              'en': 'Allergies'
            },
            'localizedDescriptions': {
              'en': 'A snapshot summary of the vaccination record.',
              'sl': '*A snapshot summary of the vaccination record.(en)'
            },
            'aqlPath': '',
            'children': [
              {
                'id': 'adverse_reaction_-_allergy',
                'name': 'Adverse Reaction - Allergy',
                'localizedName': 'Adverse Reaction - Allergy',
                'rmType': 'EVALUATION',
                'nodeId': 'openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1',
                'min': 1,
                'max': -1,
                'localizedNames': {
                  'en': 'Adverse Reaction - Allergy',
                  'sl': '*Adverse Reaction(en)'
                },
                'localizedDescriptions': {
                  'en': 'A harmful or undesirable effect associated with exposure to any substance or agent, including food, plants, animals, insect stings or a medication at therapeutic doses. The range of Adverse Reactions includes both Immune mediated reactions Types I-IV (including allergies and hypersensitivities) and Non-immune mediated reactions (including pseudoallergic reactions, side effects, intolerances, drug toxicities (eg Gentamycin), drug-drug interactions, food-drug interactions, drug-disease interactions and idiosyncratic reactions).',
                  'sl': '*A harmful or undesirable effect associated with exposure to any substance or agent, including food, plants, animals, insect stings or a medication at therapeutic doses. The range of Adverse Reactions includes both Immune mediated reactions Types I-IV (including allergies and hypersensitivities) and Non-immune mediated reactions (including pseudoallergic reactions, side effects, intolerances, drug toxicities (eg Gentamycin), drug-drug interactions, food-drug interactions, drug-disease interactions and idiosyncratic reactions).(en)'
                },
                'aqlPath': '/content[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1]',
                'children': [
                  {
                    'id': 'substance_agent',
                    'name': 'Substance/Agent',
                    'localizedName': 'Substance/Agent',
                    'rmType': 'DV_TEXT',
                    'nodeId': 'at0002',
                    'min': 1,
                    'max': 1,
                    'localizedNames': {
                      'en': 'Substance/Agent',
                      'sl': 'Alergen'
                    },
                    'localizedDescriptions': {
                      'en': 'Identification of a substance, agent, or a class of substance, that is considered to be responsible for the adverse reaction. Coding of the substance with a terminology is desirable, where possible.',
                      'sl': '*Identification of a substance, agent, or a class of substance, that is considered to be responsible for the adverse reaction. Coding of the substance with a terminology is desirable, where possible.(en)'
                    },
                    'aqlPath': '/content[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1]/data[at0001]/items[at0002]/value',
                    'inputs': [
                      {
                        'type': 'TEXT'
                      }
                    ]
                  },
                  {
                    'id': 'comment',
                    'name': 'Comment',
                    'localizedName': 'Comment',
                    'rmType': 'DV_TEXT',
                    'nodeId': 'at0006',
                    'min': 0,
                    'max': 1,
                    'localizedNames': {
                      'en': 'Comment',
                      'sl': 'Opis'
                    },
                    'localizedDescriptions': {
                      'en': 'Record any additional comments about the adverse reaction, including instructions related to future exposure or administration of the substance/agent.',
                      'sl': '*Record any additional comments about the adverse reaction, including instructions related to future exposure or administration of the substance/agent.(en)'
                    },
                    'aqlPath': '/content[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1]/data[at0001]/items[at0006]/value',
                    'inputs': [
                      {
                        'type': 'TEXT'
                      }
                    ]
                  },
                  {
                    'id': 'recorded',
                    'name': 'Recorded',
                    'localizedName': 'Recorded',
                    'rmType': 'DV_DATE_TIME',
                    'nodeId': 'at0048',
                    'min': 0,
                    'max': 1,
                    'localizedNames': {
                      'en': 'Recorded',
                      'sl': 'Zabeleženo'
                    },
                    'localizedDescriptions': {
                      'en': '*',
                      'sl': '**(en)'
                    },
                    'aqlPath': '/content[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1]/data[at0001]/items[at0048]/value',
                    'inputs': [
                      {
                        'type': 'DATETIME'
                      }
                    ]
                  },
                  {
                    'id': 'reaction_event_summary',
                    'name': 'Reaction event summary',
                    'localizedName': 'Reaction event summary',
                    'rmType': 'CLUSTER',
                    'nodeId': 'at0009',
                    'min': 0,
                    'max': 1,
                    'localizedNames': {
                      'en': 'Reaction event summary',
                      'sl': '*Reaction event summary(en)'
                    },
                    'localizedDescriptions': {
                      'en': 'Summary about each reaction event, on a per exposure basis.',
                      'sl': '*Summary about each reaction event, on a per exposure basis.(en)'
                    },
                    'aqlPath': '/content[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1]/data[at0001]/items[at0009]',
                    'children': [
                      {
                        'id': 'clinical_impact',
                        'name': 'Clinical Impact',
                        'localizedName': 'Clinical Impact',
                        'rmType': 'DV_CODED_TEXT',
                        'nodeId': 'at0017',
                        'min': 0,
                        'max': 1,
                        'localizedNames': {
                          'en': 'Clinical Impact',
                          'sl': 'Resnost'
                        },
                        'localizedDescriptions': {
                          'en': 'Assessment of the clinical impact of the adverse reaction on the patient.',
                          'sl': '*Assessment of the clinical impact of the adverse reaction on the patient.(en)'
                        },
                        'aqlPath': '/content[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1]/data[at0001]/items[at0009]/items[at0017]/value',
                        'inputs': [
                          {
                            'suffix': 'code',
                            'type': 'CODED_TEXT',
                            'list': [
                              {
                                'value': 'at0035',
                                'label': 'None',
                                'localizedLabels': {
                                  'en': 'None',
                                  'sl': 'Ni'
                                },
                                'localizedDescriptions': {
                                  'en': 'No clinical effect observed.',
                                  'sl': '*No clinical effect observed.(en)'
                                }
                              },
                              {
                                'value': 'at0036',
                                'label': 'Insignificant',
                                'localizedLabels': {
                                  'en': 'Insignificant',
                                  'sl': 'Nepomembno'
                                },
                                'localizedDescriptions': {
                                  'en': 'Little noticeable clinical effect observed.',
                                  'sl': '*Little noticeable clinical effect observed.(en)'
                                }
                              },
                              {
                                'value': 'at0037',
                                'label': 'Significant',
                                'localizedLabels': {
                                  'en': 'Significant',
                                  'sl': 'Pomembno'
                                },
                                'localizedDescriptions': {
                                  'en': 'Obvious clinical effect observed.',
                                  'sl': '*Obvious clinical effect observed.(en)'
                                }
                              },
                              {
                                'value': 'at0038',
                                'label': 'Life-threatening',
                                'localizedLabels': {
                                  'en': 'Life-threatening',
                                  'sl': 'Življensko nevarno'
                                },
                                'localizedDescriptions': {
                                  'en': 'Life-threatening effect observed.',
                                  'sl': '*Life-threatening effect observed.(en)'
                                }
                              },
                              {
                                'value': 'at0039',
                                'label': 'Death',
                                'localizedLabels': {
                                  'en': 'Death',
                                  'sl': 'Smrtno'
                                },
                                'localizedDescriptions': {
                                  'en': 'Individual died.',
                                  'sl': '*Individual died.(en)'
                                }
                              }
                            ]
                          }
                        ]
                      },
                      {
                        'id': 'certainty',
                        'name': 'Certainty',
                        'localizedName': 'Certainty',
                        'rmType': 'DV_CODED_TEXT',
                        'nodeId': 'at0021',
                        'min': 0,
                        'max': 1,
                        'localizedNames': {
                          'en': 'Certainty',
                          'sl': 'Status'
                        },
                        'localizedDescriptions': {
                          'en': 'Degree of certainty, as assessed by clinician, that the substance/agent was the cause of the reaction.',
                          'sl': '*Degree of certainty, as assessed by clinician, that the substance/agent was the cause of the reaction.(en)'
                        },
                        'aqlPath': '/content[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1]/data[at0001]/items[at0009]/items[at0021]/value',
                        'inputs': [
                          {
                            'suffix': 'code',
                            'type': 'CODED_TEXT',
                            'list': [
                              {
                                'value': 'at0022',
                                'label': 'Suspected',
                                'localizedLabels': {
                                  'en': 'Suspected',
                                  'sl': 'Sum'
                                },
                                'localizedDescriptions': {
                                  'en': 'Possible to be the causative agent, but without evidence.',
                                  'sl': '*Possible to be the causative agent, but without evidence.(en)'
                                }
                              },
                              {
                                'value': 'at0024',
                                'label': 'Confirmed',
                                'localizedLabels': {
                                  'en': 'Confirmed',
                                  'sl': 'Potrjeno'
                                },
                                'localizedDescriptions': {
                                  'en': 'Confirmed as the causative agent, by testing or rechallenge.',
                                  'sl': '*Confirmed as the causative agent, by testing or rechallenge.(en)'
                                }
                              },
                              {
                                'value': 'at0054',
                                'label': 'Refuted',
                                'localizedLabels': {
                                  'en': 'Refuted',
                                  'sl': 'Zavrnjeno'
                                },
                                'localizedDescriptions': {
                                  'en': '*',
                                  'sl': '*'
                                }
                              },
                              {
                                'value': 'at0055',
                                'label': 'Resolved',
                                'localizedLabels': {
                                  'en': 'Resolved',
                                  'sl': 'Izzvenelo'
                                },
                                'localizedDescriptions': {
                                  'en': '*',
                                  'sl': '*'
                                }
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'id': 'reaction_reported',
                    'name': 'Reaction reported?',
                    'localizedName': 'Reaction reported?',
                    'rmType': 'DV_BOOLEAN',
                    'nodeId': 'at0044',
                    'min': 0,
                    'max': 1,
                    'dependsOn': [
                      'reaction_event_summary',
                      'comment',
                      'substance_agent',
                      'recorded'
                    ],
                    'localizedNames': {
                      'en': 'Reaction reported?',
                      'sl': '*Reaction reported?(en)'
                    },
                    'localizedDescriptions': {
                      'en': 'Was the adverse reaction reported to a regulatory body?',
                      'sl': '*Was the adverse reaction reported to a regulatory body?(en)'
                    },
                    'aqlPath': '/content[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1]/protocol[at0042]/items[at0044]/value',
                    'inputs': [
                      {
                        'type': 'BOOLEAN'
                      }
                    ]
                  },
                  {
                    'id': 'link_to_adverse_reaction_report',
                    'name': 'Link to Adverse Reaction Report',
                    'localizedName': 'Link to Adverse Reaction Report',
                    'rmType': 'DV_URI',
                    'nodeId': 'at0045',
                    'min': 0,
                    'max': 1,
                    'dependsOn': [
                      'reaction_event_summary',
                      'comment',
                      'substance_agent',
                      'recorded'
                    ],
                    'localizedNames': {
                      'en': 'Link to Adverse Reaction Report',
                      'sl': '*Link to Adverse Reaction Report(en)'
                    },
                    'localizedDescriptions': {
                      'en': 'Link to the Adverse Reaction Report sent to the regulatory body.',
                      'sl': '*Link to the Adverse Reaction Report sent to the regulatory body.(en)'
                    },
                    'aqlPath': '/content[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1]/protocol[at0042]/items[at0045]/value',
                    'inputs': [
                      {
                        'type': 'TEXT'
                      }
                    ]
                  },
                  {
                    'id': 'links_to_supporting_clinical_record_information',
                    'name': 'Links to supporting clinical record information',
                    'localizedName': 'Links to supporting clinical record information',
                    'rmType': 'DV_URI',
                    'nodeId': 'at0047',
                    'min': 0,
                    'max': 1,
                    'dependsOn': [
                      'reaction_event_summary',
                      'comment',
                      'substance_agent',
                      'recorded'
                    ],
                    'localizedNames': {
                      'en': 'Links to supporting clinical record information',
                      'sl': '*Links to supporting clinical record information(en)'
                    },
                    'localizedDescriptions': {
                      'en': 'Link to further information about  about the presentation and findings that exist elsewhere in the health record, for example, presenting symptoms, examination findings, diagnosis etc.',
                      'sl': '*Link to further information about  about the presentation and findings that exist elsewhere in the health record, for example, presenting symptoms, examination findings, diagnosis etc.(en)'
                    },
                    'aqlPath': '/content[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1]/protocol[at0042]/items[at0047]/value',
                    'inputs': [
                      {
                        'type': 'TEXT'
                      }
                    ]
                  },
                  {
                    'id': 'language',
                    'name': 'Language',
                    'rmType': 'CODE_PHRASE',
                    'min': 1,
                    'max': 1,
                    'aqlPath': '/content[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1]/language',
                    'inContext': true
                  },
                  {
                    'id': 'encoding',
                    'name': 'Encoding',
                    'rmType': 'CODE_PHRASE',
                    'min': 1,
                    'max': 1,
                    'aqlPath': '/content[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1]/encoding',
                    'inContext': true
                  },
                  {
                    'id': 'subject',
                    'name': 'Subject',
                    'rmType': 'PARTY_PROXY',
                    'min': 1,
                    'max': 1,
                    'aqlPath': '/content[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1]/subject',
                    'inContext': true
                  }
                ]
              },
              {
                'id': 'category',
                'rmType': 'DV_CODED_TEXT',
                'nodeId': '',
                'min': 1,
                'max': 1,
                'aqlPath': '/category',
                'inputs': [
                  {
                    'suffix': 'code',
                    'type': 'CODED_TEXT',
                    'list': [
                      {
                        'value': '431',
                        'label': 'persistent',
                        'localizedLabels': {
                          'en': 'persistent',
                          'sl': ''
                        }
                      }
                    ],
                    'terminology': 'openehr'
                  }
                ]
              },
              {
                'id': 'language',
                'name': 'Language',
                'rmType': 'CODE_PHRASE',
                'min': 1,
                'max': 1,
                'aqlPath': '/language',
                'inContext': true
              },
              {
                'id': 'territory',
                'name': 'Territory',
                'rmType': 'CODE_PHRASE',
                'min': 1,
                'max': 1,
                'aqlPath': '/territory',
                'inContext': true
              },
              {
                'id': 'composer',
                'name': 'Composer',
                'rmType': 'PARTY_PROXY',
                'min': 1,
                'max': 1,
                'aqlPath': '/composer',
                'inContext': true
              }
            ]
          }
        }
      };
      /* tslint:enable:max-line-length */


      service.getWebTemplate(templateId).subscribe(template => {
        expect(template.webTemplate.templateId).toBe(templateId);
        expect(template.webTemplate.tree.children[0].id).toBe('adverse_reaction_-_allergy');
      });

      const req = httpMock.expectOne(`${appContextService.getRestUrl()}/template/${templateId}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyTemplate);
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
