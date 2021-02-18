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

export const resultSetWithDuplicatesMock = {
  aql: 'SELECT c\nFROM EHR e\nCONTAINS COMPOSITION c\nCONTAINS CLUSTER m[openEHR-EHR-CLUSTER.lab_context_details.v0]\nWHERE m/items[at0021]/value/value = \'A03621394\' \nOFFSET 0 LIMIT 1',
  executedAql: 'SELECT c\nFROM EHR e\nCONTAINS COMPOSITION c\nCONTAINS CLUSTER m[openEHR-EHR-CLUSTER.lab_context_details.v0]\nWHERE m/items[at0021]/value/value = \'A03621394\' \nOFFSET 0 LIMIT 1',
  resultSet: [
    {
      '#0': {
        '@class': 'COMPOSITION',
        name: {
          '@class': 'DV_TEXT',
          value: 'Laboratory test report'
        },
        uid: {
          '@class': 'OBJECT_VERSION_ID',
          value: '2e19f4c1-5bec-48cd-941d-ebd6edaa5055::default::1'
        },
        archetype_details: {
          '@class': 'ARCHETYPED',
          archetype_id: {
            '@class': 'ARCHETYPE_ID',
            value: 'openEHR-EHR-COMPOSITION.report-result.v1'
          },
          template_id: {
            '@class': 'TEMPLATE_ID',
            value: 'Laboratory test report'
          },
          rm_version: '1.0.4'
        },
        archetype_node_id: 'openEHR-EHR-COMPOSITION.report-result.v1',
        language: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'ISO_639-1'
          },
          code_string: 'en'
        },
        territory: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'ISO_3166-1'
          },
          code_string: 'GB'
        },
        category: {
          '@class': 'DV_CODED_TEXT',
          value: 'event',
          defining_code: {
            '@class': 'CODE_PHRASE',
            terminology_id: {
              '@class': 'TERMINOLOGY_ID',
              value: 'openehr'
            },
            code_string: '433'
          }
        },
        composer: {
          '@class': 'PARTY_SELF'
        },
        context: {
          '@class': 'EVENT_CONTEXT',
          start_time: {
            '@class': 'DV_DATE_TIME',
            value: '2020-07-17T11:52:19.092799+02:00'
          },
          end_time: {
            '@class': 'DV_DATE_TIME',
            value: '2020-07-17T11:52:19.092799+02:00'
          },
          setting: {
            '@class': 'DV_CODED_TEXT',
            value: 'secondary medical care',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'openehr'
              },
              code_string: '232'
            }
          },
          other_context: {
            '@class': 'ITEM_TREE',
            name: {
              '@class': 'DV_TEXT',
              value: 'Tree'
            },
            archetype_node_id: 'at0001',
            items: [
              {
                '@class': 'ELEMENT',
                name: {
                  '@class': 'DV_TEXT',
                  value: 'Laboratory order ID'
                },
                archetype_node_id: 'at0002',
                value: {
                  '@class': 'DV_TEXT',
                  value: 'b03220a2-77bc-4da9-88fe-18cde728a475'
                }
              },
              {
                '@class': 'CLUSTER',
                name: {
                  '@class': 'DV_TEXT',
                  value: 'Laboratory context details'
                },
                archetype_details: {
                  '@class': 'ARCHETYPED',
                  archetype_id: {
                    '@class': 'ARCHETYPE_ID',
                    value: 'openEHR-EHR-CLUSTER.lab_context_details.v0'
                  },
                  rm_version: '1.0.4'
                },
                archetype_node_id: 'openEHR-EHR-CLUSTER.lab_context_details.v0',
                items: [
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Order group number'
                    },
                    archetype_node_id: 'at0021',
                    value: {
                      '@class': 'DV_TEXT',
                      value: 'A03621394'
                    }
                  },
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Report ID'
                    },
                    archetype_node_id: 'at0007',
                    value: {
                      '@class': 'DV_TEXT',
                      value: '96a63d95-7b2f-4320-84a1-b6f52b93fc2e'
                    }
                  },
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Laboratory'
                    },
                    archetype_node_id: 'at0015',
                    value: {
                      '@class': 'DV_CODED_TEXT',
                      value: 'Laboratory',
                      defining_code: {
                        '@class': 'CODE_PHRASE',
                        terminology_id: {
                          '@class': 'TERMINOLOGY_ID',
                          value: 'external_terminology'
                        },
                        code_string: 'Laboratory'
                      }
                    }
                  }
                ]
              }
            ]
          }
        },
        content: [
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Laboratory test result'
            },
            uid: {
              '@class': 'HIER_OBJECT_ID',
              value: '4acdf4b6-ef76-431a-a3d1-a03baabeef5a'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1'
              },
              rm_version: '1.0.4'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            provider: {
              '@class': 'PARTY_SELF'
            },
            other_participations: [
              {
                '@class': 'PARTICIPATION',
                function: {
                  '@class': 'DV_TEXT',
                  value: 'ORDERING_PROFESSIONAL'
                },
                performer: {
                  '@class': 'PARTY_IDENTIFIED',
                  name: 'Dr D. JAMES'
                },
                mode: {
                  '@class': 'DV_CODED_TEXT',
                  value: 'not specified',
                  defining_code: {
                    '@class': 'CODE_PHRASE',
                    terminology_id: {
                      '@class': 'TERMINOLOGY_ID',
                      value: 'openehr'
                    },
                    code_string: '193'
                  }
                }
              }
            ],
            protocol: {
              '@class': 'ITEM_TREE',
              name: {
                '@class': 'DV_TEXT',
                value: 'Tree'
              },
              archetype_node_id: 'at0004',
              items: [
                {
                  '@class': 'CLUSTER',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Test request details'
                  },
                  archetype_node_id: 'at0094',
                  items: [
                    {
                      '@class': 'ELEMENT',
                      name: {
                        '@class': 'DV_TEXT',
                        value: 'Requester order identifier'
                      },
                      archetype_node_id: 'at0062',
                      value: {
                        '@class': 'DV_IDENTIFIER',
                        issuer: 'PLACER',
                        assigner: 'PLACER',
                        id: 'A03621394',
                        type: 'Requester order identifier'
                      }
                    },
                    {
                      '@class': 'ELEMENT',
                      name: {
                        '@class': 'DV_TEXT',
                        value: 'Receiver order identifier'
                      },
                      archetype_node_id: 'at0063',
                      value: {
                        '@class': 'DV_IDENTIFIER',
                        issuer: 'BSMLAB',
                        assigner: 'BSMLAB',
                        id: 'A03621394',
                        type: 'Receiver order identifier'
                      }
                    }
                  ]
                }
              ]
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'Event Series'
              },
              archetype_node_id: 'at0001',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2020-07-17T11:52:19.092799+02:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0002',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2020-07-17T11:52:19.092799+02:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Tree'
                    },
                    archetype_node_id: 'at0003',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Test name'
                        },
                        archetype_node_id: 'at0005',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'CREATININE',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'external_terminology'
                            },
                            code_string: 'BS_RCR'
                          }
                        }
                      },
                      {
                        '@class': 'CLUSTER',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Specimen'
                        },
                        archetype_details: {
                          '@class': 'ARCHETYPED',
                          archetype_id: {
                            '@class': 'ARCHETYPE_ID',
                            value: 'openEHR-EHR-CLUSTER.specimen.v1'
                          },
                          rm_version: '1.0.4'
                        },
                        archetype_node_id: 'openEHR-EHR-CLUSTER.specimen.v1',
                        items: [
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Specimen type'
                            },
                            archetype_node_id: 'at0029',
                            value: {
                              '@class': 'DV_CODED_TEXT',
                              value: 'BLOOD',
                              defining_code: {
                                '@class': 'CODE_PHRASE',
                                terminology_id: {
                                  '@class': 'TERMINOLOGY_ID',
                                  value: 'external_terminology'
                                },
                                code_string: 'B'
                              }
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Collection date/time'
                            },
                            archetype_node_id: 'at0015',
                            value: {
                              '@class': 'DV_DATE_TIME',
                              value: '2020-07-02T17:07:00.000+02:00'
                            }
                          }
                        ]
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Overall test status'
                        },
                        archetype_node_id: 'at0073',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'Final',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'local'
                            },
                            code_string: 'at0038'
                          }
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Overall test status timestamp'
                        },
                        archetype_node_id: 'at0075',
                        value: {
                          '@class': 'DV_DATE_TIME',
                          value: '2020-07-02T17:13:00.000+02:00'
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Diagnostic service category'
                        },
                        archetype_node_id: 'at0077',
                        value: {
                          '@class': 'DV_TEXT',
                          value: 'HM'
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Clinical information provided'
                        },
                        archetype_node_id: 'at0100',
                        value: {
                          '@class': 'DV_TEXT',
                          value: 'testing for Julian'
                        }
                      },
                      {
                        '@class': 'CLUSTER',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Laboratory analyte result'
                        },
                        archetype_details: {
                          '@class': 'ARCHETYPED',
                          archetype_id: {
                            '@class': 'ARCHETYPE_ID',
                            value: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1'
                          },
                          rm_version: '1.0.4'
                        },
                        feeder_audit: {
                          '@class': 'FEEDER_AUDIT',
                          original_content: {
                            '@class': 'DV_PARSABLE',
                            value: '50|50-100|umol/L|N|',
                            formalism: 'original'
                          },
                          originating_system_audit: {
                            '@class': 'FEEDER_AUDIT_DETAILS',
                            system_id: 'BSMLAB'
                          }
                        },
                        archetype_node_id: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1',
                        items: [
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Analyte result sequence'
                            },
                            archetype_node_id: 'at0027',
                            value: {
                              '@class': 'DV_COUNT',
                              magnitude: 1
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Analyte name'
                            },
                            archetype_node_id: 'at0024',
                            value: {
                              '@class': 'DV_CODED_TEXT',
                              value: 'CREATININE',
                              defining_code: {
                                '@class': 'CODE_PHRASE',
                                terminology_id: {
                                  '@class': 'TERMINOLOGY_ID',
                                  value: 'external_terminology'
                                },
                                code_string: 'BS_TCREA'
                              }
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Analyte result'
                            },
                            archetype_node_id: 'at0001',
                            value: {
                              '@class': 'DV_QUANTITY',
                              normal_range: {
                                '@class': 'DV_INTERVAL',
                                lower: {
                                  '@class': 'DV_QUANTITY',
                                  magnitude: 50,
                                  units: 'umol/L',
                                  precision: 0
                                },
                                upper: {
                                  '@class': 'DV_QUANTITY',
                                  magnitude: 100,
                                  units: 'umol/L',
                                  precision: 0
                                },
                                lower_included: true,
                                upper_included: true,
                                lower_unbounded: false,
                                upper_unbounded: false
                              },
                              normal_status: {
                                '@class': 'CODE_PHRASE',
                                terminology_id: {
                                  '@class': 'TERMINOLOGY_ID',
                                  value: 'openehr_normal_statuses'
                                },
                                code_string: 'N'
                              },
                              magnitude: 50,
                              units: 'umol/L',
                              precision: 0
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Result status'
                            },
                            archetype_node_id: 'at0005',
                            value: {
                              '@class': 'DV_CODED_TEXT',
                              value: 'Final',
                              defining_code: {
                                '@class': 'CODE_PHRASE',
                                terminology_id: {
                                  '@class': 'TERMINOLOGY_ID',
                                  value: 'local'
                                },
                                code_string: 'at0018'
                              }
                            }
                          }
                        ]
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Laboratory test result #2'
            },
            uid: {
              '@class': 'HIER_OBJECT_ID',
              value: '4acdf4b6-ef76-431a-a3d1-a03baabeef5a'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1'
              },
              rm_version: '1.0.4'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            provider: {
              '@class': 'PARTY_SELF'
            },
            other_participations: [
              {
                '@class': 'PARTICIPATION',
                function: {
                  '@class': 'DV_TEXT',
                  value: 'ORDERING_PROFESSIONAL'
                },
                performer: {
                  '@class': 'PARTY_IDENTIFIED',
                  name: 'Dr D. JAMES'
                },
                mode: {
                  '@class': 'DV_CODED_TEXT',
                  value: 'not specified',
                  defining_code: {
                    '@class': 'CODE_PHRASE',
                    terminology_id: {
                      '@class': 'TERMINOLOGY_ID',
                      value: 'openehr'
                    },
                    code_string: '193'
                  }
                }
              }
            ],
            protocol: {
              '@class': 'ITEM_TREE',
              name: {
                '@class': 'DV_TEXT',
                value: 'Tree'
              },
              archetype_node_id: 'at0004',
              items: [
                {
                  '@class': 'CLUSTER',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Test request details'
                  },
                  archetype_node_id: 'at0094',
                  items: [
                    {
                      '@class': 'ELEMENT',
                      name: {
                        '@class': 'DV_TEXT',
                        value: 'Requester order identifier'
                      },
                      archetype_node_id: 'at0062',
                      value: {
                        '@class': 'DV_IDENTIFIER',
                        issuer: 'PLACER',
                        assigner: 'PLACER',
                        id: 'A03621394',
                        type: 'Requester order identifier'
                      }
                    },
                    {
                      '@class': 'ELEMENT',
                      name: {
                        '@class': 'DV_TEXT',
                        value: 'Receiver order identifier'
                      },
                      archetype_node_id: 'at0063',
                      value: {
                        '@class': 'DV_IDENTIFIER',
                        issuer: 'BSMLAB',
                        assigner: 'BSMLAB',
                        id: 'A03621394',
                        type: 'Receiver order identifier'
                      }
                    }
                  ]
                }
              ]
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'Event Series'
              },
              archetype_node_id: 'at0001',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2020-07-17T11:52:19.092799+02:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0002',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2020-07-17T11:52:19.092799+02:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Tree'
                    },
                    archetype_node_id: 'at0003',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Test name'
                        },
                        archetype_node_id: 'at0005',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'AKI RISK',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'external_terminology'
                            },
                            code_string: 'BS_RAKI'
                          }
                        }
                      },
                      {
                        '@class': 'CLUSTER',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Specimen'
                        },
                        archetype_details: {
                          '@class': 'ARCHETYPED',
                          archetype_id: {
                            '@class': 'ARCHETYPE_ID',
                            value: 'openEHR-EHR-CLUSTER.specimen.v1'
                          },
                          rm_version: '1.0.4'
                        },
                        archetype_node_id: 'openEHR-EHR-CLUSTER.specimen.v1',
                        items: [
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Specimen type'
                            },
                            archetype_node_id: 'at0029',
                            value: {
                              '@class': 'DV_CODED_TEXT',
                              value: 'BLOOD',
                              defining_code: {
                                '@class': 'CODE_PHRASE',
                                terminology_id: {
                                  '@class': 'TERMINOLOGY_ID',
                                  value: 'external_terminology'
                                },
                                code_string: 'B'
                              }
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Collection date/time'
                            },
                            archetype_node_id: 'at0015',
                            value: {
                              '@class': 'DV_DATE_TIME',
                              value: '2020-07-02T17:07:00.000+02:00'
                            }
                          }
                        ]
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Overall test status'
                        },
                        archetype_node_id: 'at0073',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'Final',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'local'
                            },
                            code_string: 'at0038'
                          }
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Overall test status timestamp'
                        },
                        archetype_node_id: 'at0075',
                        value: {
                          '@class': 'DV_DATE_TIME',
                          value: '2020-07-02T17:13:00.000+02:00'
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Diagnostic service category'
                        },
                        archetype_node_id: 'at0077',
                        value: {
                          '@class': 'DV_TEXT',
                          value: 'HM'
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Clinical information provided'
                        },
                        archetype_node_id: 'at0100',
                        value: {
                          '@class': 'DV_TEXT',
                          value: 'testing for Julian'
                        }
                      },
                      {
                        '@class': 'CLUSTER',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Laboratory analyte result'
                        },
                        archetype_details: {
                          '@class': 'ARCHETYPED',
                          archetype_id: {
                            '@class': 'ARCHETYPE_ID',
                            value: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1'
                          },
                          rm_version: '1.0.4'
                        },
                        feeder_audit: {
                          '@class': 'FEEDER_AUDIT',
                          original_content: {
                            '@class': 'DV_PARSABLE',
                            value: '0||||',
                            formalism: 'original'
                          },
                          originating_system_audit: {
                            '@class': 'FEEDER_AUDIT_DETAILS',
                            system_id: 'BSMLAB'
                          }
                        },
                        archetype_node_id: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1',
                        items: [
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Analyte result sequence'
                            },
                            archetype_node_id: 'at0027',
                            value: {
                              '@class': 'DV_COUNT',
                              magnitude: 1
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Analyte name'
                            },
                            archetype_node_id: 'at0024',
                            value: {
                              '@class': 'DV_CODED_TEXT',
                              value: 'AKI RISK',
                              defining_code: {
                                '@class': 'CODE_PHRASE',
                                terminology_id: {
                                  '@class': 'TERMINOLOGY_ID',
                                  value: 'external_terminology'
                                },
                                code_string: 'BS_TAKI'
                              }
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Analyte result'
                            },
                            archetype_node_id: 'at0001',
                            value: {
                              '@class': 'DV_COUNT',
                              magnitude: 0
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Result status'
                            },
                            archetype_node_id: 'at0005',
                            value: {
                              '@class': 'DV_CODED_TEXT',
                              value: 'Final',
                              defining_code: {
                                '@class': 'CODE_PHRASE',
                                terminology_id: {
                                  '@class': 'TERMINOLOGY_ID',
                                  value: 'local'
                                },
                                code_string: 'at0018'
                              }
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Comment'
                            },
                            archetype_node_id: 'at0003',
                            value: {
                              '@class': 'DV_TEXT',
                              value: 'NO RISK OF AKI IDENTIFIED'
                            }
                          }
                        ]
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Laboratory test result #3'
            },
            uid: {
              '@class': 'HIER_OBJECT_ID',
              value: '4acdf4b6-ef76-431a-a3d1-a03baabeef5a'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1'
              },
              rm_version: '1.0.4'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            provider: {
              '@class': 'PARTY_SELF'
            },
            other_participations: [
              {
                '@class': 'PARTICIPATION',
                function: {
                  '@class': 'DV_TEXT',
                  value: 'ORDERING_PROFESSIONAL'
                },
                performer: {
                  '@class': 'PARTY_IDENTIFIED',
                  name: 'Dr D. JAMES'
                },
                mode: {
                  '@class': 'DV_CODED_TEXT',
                  value: 'not specified',
                  defining_code: {
                    '@class': 'CODE_PHRASE',
                    terminology_id: {
                      '@class': 'TERMINOLOGY_ID',
                      value: 'openehr'
                    },
                    code_string: '193'
                  }
                }
              }
            ],
            protocol: {
              '@class': 'ITEM_TREE',
              name: {
                '@class': 'DV_TEXT',
                value: 'Tree'
              },
              archetype_node_id: 'at0004',
              items: [
                {
                  '@class': 'CLUSTER',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Test request details'
                  },
                  archetype_node_id: 'at0094',
                  items: [
                    {
                      '@class': 'ELEMENT',
                      name: {
                        '@class': 'DV_TEXT',
                        value: 'Requester order identifier'
                      },
                      archetype_node_id: 'at0062',
                      value: {
                        '@class': 'DV_IDENTIFIER',
                        issuer: 'PLACER',
                        assigner: 'PLACER',
                        id: 'A03621394',
                        type: 'Requester order identifier'
                      }
                    },
                    {
                      '@class': 'ELEMENT',
                      name: {
                        '@class': 'DV_TEXT',
                        value: 'Receiver order identifier'
                      },
                      archetype_node_id: 'at0063',
                      value: {
                        '@class': 'DV_IDENTIFIER',
                        issuer: 'BSMLAB',
                        assigner: 'BSMLAB',
                        id: 'A03621394',
                        type: 'Receiver order identifier'
                      }
                    }
                  ]
                }
              ]
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'Event Series'
              },
              archetype_node_id: 'at0001',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2020-07-17T11:52:19.092799+02:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0002',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2020-07-17T11:52:19.092799+02:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Tree'
                    },
                    archetype_node_id: 'at0003',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Test name'
                        },
                        archetype_node_id: 'at0005',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'C REACTIVE PROTEIN',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'external_terminology'
                            },
                            code_string: 'BS_RCRP'
                          }
                        }
                      },
                      {
                        '@class': 'CLUSTER',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Specimen'
                        },
                        archetype_details: {
                          '@class': 'ARCHETYPED',
                          archetype_id: {
                            '@class': 'ARCHETYPE_ID',
                            value: 'openEHR-EHR-CLUSTER.specimen.v1'
                          },
                          rm_version: '1.0.4'
                        },
                        archetype_node_id: 'openEHR-EHR-CLUSTER.specimen.v1',
                        items: [
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Specimen type'
                            },
                            archetype_node_id: 'at0029',
                            value: {
                              '@class': 'DV_CODED_TEXT',
                              value: 'BLOOD',
                              defining_code: {
                                '@class': 'CODE_PHRASE',
                                terminology_id: {
                                  '@class': 'TERMINOLOGY_ID',
                                  value: 'external_terminology'
                                },
                                code_string: 'B'
                              }
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Collection date/time'
                            },
                            archetype_node_id: 'at0015',
                            value: {
                              '@class': 'DV_DATE_TIME',
                              value: '2020-07-02T17:07:00.000+02:00'
                            }
                          }
                        ]
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Overall test status'
                        },
                        archetype_node_id: 'at0073',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'Final',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'local'
                            },
                            code_string: 'at0038'
                          }
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Overall test status timestamp'
                        },
                        archetype_node_id: 'at0075',
                        value: {
                          '@class': 'DV_DATE_TIME',
                          value: '2020-07-02T17:13:00.000+02:00'
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Diagnostic service category'
                        },
                        archetype_node_id: 'at0077',
                        value: {
                          '@class': 'DV_TEXT',
                          value: 'HM'
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Clinical information provided'
                        },
                        archetype_node_id: 'at0100',
                        value: {
                          '@class': 'DV_TEXT',
                          value: 'testing for Julian'
                        }
                      },
                      {
                        '@class': 'CLUSTER',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Laboratory analyte result'
                        },
                        archetype_details: {
                          '@class': 'ARCHETYPED',
                          archetype_id: {
                            '@class': 'ARCHETYPE_ID',
                            value: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1'
                          },
                          rm_version: '1.0.4'
                        },
                        feeder_audit: {
                          '@class': 'FEEDER_AUDIT',
                          original_content: {
                            '@class': 'DV_PARSABLE',
                            value: '9|0-10|mg/L|N|',
                            formalism: 'original'
                          },
                          originating_system_audit: {
                            '@class': 'FEEDER_AUDIT_DETAILS',
                            system_id: 'BSMLAB'
                          }
                        },
                        archetype_node_id: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1',
                        items: [
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Analyte result sequence'
                            },
                            archetype_node_id: 'at0027',
                            value: {
                              '@class': 'DV_COUNT',
                              magnitude: 1
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Analyte name'
                            },
                            archetype_node_id: 'at0024',
                            value: {
                              '@class': 'DV_CODED_TEXT',
                              value: 'C REACTIVE PROTEIN',
                              defining_code: {
                                '@class': 'CODE_PHRASE',
                                terminology_id: {
                                  '@class': 'TERMINOLOGY_ID',
                                  value: 'external_terminology'
                                },
                                code_string: 'BS_TCRP'
                              }
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Analyte result'
                            },
                            archetype_node_id: 'at0001',
                            value: {
                              '@class': 'DV_QUANTITY',
                              normal_range: {
                                '@class': 'DV_INTERVAL',
                                lower: {
                                  '@class': 'DV_QUANTITY',
                                  magnitude: 0,
                                  units: 'mg/L',
                                  precision: 0
                                },
                                upper: {
                                  '@class': 'DV_QUANTITY',
                                  magnitude: 10,
                                  units: 'mg/L',
                                  precision: 0
                                },
                                lower_included: true,
                                upper_included: true,
                                lower_unbounded: false,
                                upper_unbounded: false
                              },
                              normal_status: {
                                '@class': 'CODE_PHRASE',
                                terminology_id: {
                                  '@class': 'TERMINOLOGY_ID',
                                  value: 'openehr_normal_statuses'
                                },
                                code_string: 'N'
                              },
                              magnitude: 9,
                              units: 'mg/L',
                              precision: 0
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Result status'
                            },
                            archetype_node_id: 'at0005',
                            value: {
                              '@class': 'DV_CODED_TEXT',
                              value: 'Final',
                              defining_code: {
                                '@class': 'CODE_PHRASE',
                                terminology_id: {
                                  '@class': 'TERMINOLOGY_ID',
                                  value: 'local'
                                },
                                code_string: 'at0018'
                              }
                            }
                          }
                        ]
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Laboratory test result #4'
            },
            uid: {
              '@class': 'HIER_OBJECT_ID',
              value: '4acdf4b6-ef76-431a-a3d1-a03baabeef5a'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1'
              },
              rm_version: '1.0.4'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            provider: {
              '@class': 'PARTY_SELF'
            },
            other_participations: [
              {
                '@class': 'PARTICIPATION',
                function: {
                  '@class': 'DV_TEXT',
                  value: 'ORDERING_PROFESSIONAL'
                },
                performer: {
                  '@class': 'PARTY_IDENTIFIED',
                  name: 'Dr D. JAMES'
                },
                mode: {
                  '@class': 'DV_CODED_TEXT',
                  value: 'not specified',
                  defining_code: {
                    '@class': 'CODE_PHRASE',
                    terminology_id: {
                      '@class': 'TERMINOLOGY_ID',
                      value: 'openehr'
                    },
                    code_string: '193'
                  }
                }
              }
            ],
            protocol: {
              '@class': 'ITEM_TREE',
              name: {
                '@class': 'DV_TEXT',
                value: 'Tree'
              },
              archetype_node_id: 'at0004',
              items: [
                {
                  '@class': 'CLUSTER',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Test request details'
                  },
                  archetype_node_id: 'at0094',
                  items: [
                    {
                      '@class': 'ELEMENT',
                      name: {
                        '@class': 'DV_TEXT',
                        value: 'Requester order identifier'
                      },
                      archetype_node_id: 'at0062',
                      value: {
                        '@class': 'DV_IDENTIFIER',
                        issuer: 'PLACER',
                        assigner: 'PLACER',
                        id: 'A03621394',
                        type: 'Requester order identifier'
                      }
                    },
                    {
                      '@class': 'ELEMENT',
                      name: {
                        '@class': 'DV_TEXT',
                        value: 'Receiver order identifier'
                      },
                      archetype_node_id: 'at0063',
                      value: {
                        '@class': 'DV_IDENTIFIER',
                        issuer: 'BSMLAB',
                        assigner: 'BSMLAB',
                        id: 'A03621394',
                        type: 'Receiver order identifier'
                      }
                    }
                  ]
                }
              ]
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'Event Series'
              },
              archetype_node_id: 'at0001',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2020-07-17T11:52:19.092799+02:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0002',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2020-07-17T11:52:19.092799+02:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Tree'
                    },
                    archetype_node_id: 'at0003',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Test name'
                        },
                        archetype_node_id: 'at0005',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'INR (ON WARFARIN)',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'external_terminology'
                            },
                            code_string: 'BS_RINR'
                          }
                        }
                      },
                      {
                        '@class': 'CLUSTER',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Specimen'
                        },
                        archetype_details: {
                          '@class': 'ARCHETYPED',
                          archetype_id: {
                            '@class': 'ARCHETYPE_ID',
                            value: 'openEHR-EHR-CLUSTER.specimen.v1'
                          },
                          rm_version: '1.0.4'
                        },
                        archetype_node_id: 'openEHR-EHR-CLUSTER.specimen.v1',
                        items: [
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Specimen type'
                            },
                            archetype_node_id: 'at0029',
                            value: {
                              '@class': 'DV_CODED_TEXT',
                              value: 'BLOOD',
                              defining_code: {
                                '@class': 'CODE_PHRASE',
                                terminology_id: {
                                  '@class': 'TERMINOLOGY_ID',
                                  value: 'external_terminology'
                                },
                                code_string: 'B'
                              }
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Collection date/time'
                            },
                            archetype_node_id: 'at0015',
                            value: {
                              '@class': 'DV_DATE_TIME',
                              value: '2020-07-02T17:07:00.000+02:00'
                            }
                          }
                        ]
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Overall test status'
                        },
                        archetype_node_id: 'at0073',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'Final',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'local'
                            },
                            code_string: 'at0038'
                          }
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Overall test status timestamp'
                        },
                        archetype_node_id: 'at0075',
                        value: {
                          '@class': 'DV_DATE_TIME',
                          value: '2020-07-02T17:13:00.000+02:00'
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Diagnostic service category'
                        },
                        archetype_node_id: 'at0077',
                        value: {
                          '@class': 'DV_TEXT',
                          value: 'HM'
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Clinical information provided'
                        },
                        archetype_node_id: 'at0100',
                        value: {
                          '@class': 'DV_TEXT',
                          value: 'testing for Julian'
                        }
                      },
                      {
                        '@class': 'CLUSTER',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Laboratory analyte result'
                        },
                        archetype_details: {
                          '@class': 'ARCHETYPED',
                          archetype_id: {
                            '@class': 'ARCHETYPE_ID',
                            value: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1'
                          },
                          rm_version: '1.0.4'
                        },
                        feeder_audit: {
                          '@class': 'FEEDER_AUDIT',
                          original_content: {
                            '@class': 'DV_PARSABLE',
                            value: '11.0|10.2-14.1|s|N|',
                            formalism: 'original'
                          },
                          originating_system_audit: {
                            '@class': 'FEEDER_AUDIT_DETAILS',
                            system_id: 'BSMLAB'
                          }
                        },
                        archetype_node_id: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1',
                        items: [
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Analyte result sequence'
                            },
                            archetype_node_id: 'at0027',
                            value: {
                              '@class': 'DV_COUNT',
                              magnitude: 1
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Analyte name'
                            },
                            archetype_node_id: 'at0024',
                            value: {
                              '@class': 'DV_CODED_TEXT',
                              value: 'PT',
                              defining_code: {
                                '@class': 'CODE_PHRASE',
                                terminology_id: {
                                  '@class': 'TERMINOLOGY_ID',
                                  value: 'external_terminology'
                                },
                                code_string: 'BS_TPT'
                              }
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Analyte result'
                            },
                            archetype_node_id: 'at0001',
                            value: {
                              '@class': 'DV_QUANTITY',
                              normal_range: {
                                '@class': 'DV_INTERVAL',
                                lower: {
                                  '@class': 'DV_QUANTITY',
                                  magnitude: 10.2,
                                  units: 's',
                                  precision: 1
                                },
                                upper: {
                                  '@class': 'DV_QUANTITY',
                                  magnitude: 14.1,
                                  units: 's',
                                  precision: 1
                                },
                                lower_included: true,
                                upper_included: true,
                                lower_unbounded: false,
                                upper_unbounded: false
                              },
                              normal_status: {
                                '@class': 'CODE_PHRASE',
                                terminology_id: {
                                  '@class': 'TERMINOLOGY_ID',
                                  value: 'openehr_normal_statuses'
                                },
                                code_string: 'N'
                              },
                              magnitude: 11,
                              units: 's',
                              precision: 1
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Result status'
                            },
                            archetype_node_id: 'at0005',
                            value: {
                              '@class': 'DV_CODED_TEXT',
                              value: 'Final',
                              defining_code: {
                                '@class': 'CODE_PHRASE',
                                terminology_id: {
                                  '@class': 'TERMINOLOGY_ID',
                                  value: 'local'
                                },
                                code_string: 'at0018'
                              }
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Comment'
                            },
                            archetype_node_id: 'at0003',
                            value: {
                              '@class': 'DV_TEXT',
                              value: '*Note new reference range for this test 19.02.19*\\.br\\MNPT=10.5 for calculating Maddrey\'s coefficient'
                            }
                          }
                        ]
                      },
                      {
                        '@class': 'CLUSTER',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Laboratory analyte result #2'
                        },
                        archetype_details: {
                          '@class': 'ARCHETYPED',
                          archetype_id: {
                            '@class': 'ARCHETYPE_ID',
                            value: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1'
                          },
                          rm_version: '1.0.4'
                        },
                        feeder_audit: {
                          '@class': 'FEEDER_AUDIT',
                          original_content: {
                            '@class': 'DV_PARSABLE',
                            value: '2.5|0.9-1.2||H|',
                            formalism: 'original'
                          },
                          originating_system_audit: {
                            '@class': 'FEEDER_AUDIT_DETAILS',
                            system_id: 'BSMLAB'
                          }
                        },
                        archetype_node_id: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1',
                        items: [
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Analyte result sequence'
                            },
                            archetype_node_id: 'at0027',
                            value: {
                              '@class': 'DV_COUNT',
                              magnitude: 2
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Analyte name'
                            },
                            archetype_node_id: 'at0024',
                            value: {
                              '@class': 'DV_CODED_TEXT',
                              value: 'INR',
                              defining_code: {
                                '@class': 'CODE_PHRASE',
                                terminology_id: {
                                  '@class': 'TERMINOLOGY_ID',
                                  value: 'external_terminology'
                                },
                                code_string: 'BS_TINR'
                              }
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Analyte result'
                            },
                            archetype_node_id: 'at0001',
                            value: {
                              '@class': 'DV_TEXT',
                              value: '2.5'
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Result status'
                            },
                            archetype_node_id: 'at0005',
                            value: {
                              '@class': 'DV_CODED_TEXT',
                              value: 'Final',
                              defining_code: {
                                '@class': 'CODE_PHRASE',
                                terminology_id: {
                                  '@class': 'TERMINOLOGY_ID',
                                  value: 'local'
                                },
                                code_string: 'at0018'
                              }
                            }
                          }
                        ]
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Comment'
                        },
                        archetype_node_id: 'at0101',
                        value: {
                          '@class': 'DV_TEXT',
                          value: 'THERAPEUTIC GUIDE FOR WARFARIN\\.br\\AF, DVT/PE : INR 2.0 to 3.0\\.br\\Most valve prostheses : INR 3.0 to 4.0\\.br\\If on warfarin reference range and flag do NOT apply.If patient is not on warfarin this result is abnormal\\.br\\and requires further investigation.\n'
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Laboratory test result #5'
            },
            uid: {
              '@class': 'HIER_OBJECT_ID',
              value: '4acdf4b6-ef76-431a-a3d1-a03baabeef5a'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1'
              },
              rm_version: '1.0.4'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            provider: {
              '@class': 'PARTY_SELF'
            },
            other_participations: [
              {
                '@class': 'PARTICIPATION',
                function: {
                  '@class': 'DV_TEXT',
                  value: 'ORDERING_PROFESSIONAL'
                },
                performer: {
                  '@class': 'PARTY_IDENTIFIED',
                  name: 'Dr D. JAMES'
                },
                mode: {
                  '@class': 'DV_CODED_TEXT',
                  value: 'not specified',
                  defining_code: {
                    '@class': 'CODE_PHRASE',
                    terminology_id: {
                      '@class': 'TERMINOLOGY_ID',
                      value: 'openehr'
                    },
                    code_string: '193'
                  }
                }
              }
            ],
            protocol: {
              '@class': 'ITEM_TREE',
              name: {
                '@class': 'DV_TEXT',
                value: 'Tree'
              },
              archetype_node_id: 'at0004',
              items: [
                {
                  '@class': 'CLUSTER',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Test request details'
                  },
                  archetype_node_id: 'at0094',
                  items: [
                    {
                      '@class': 'ELEMENT',
                      name: {
                        '@class': 'DV_TEXT',
                        value: 'Requester order identifier'
                      },
                      archetype_node_id: 'at0062',
                      value: {
                        '@class': 'DV_IDENTIFIER',
                        issuer: 'PLACER',
                        assigner: 'PLACER',
                        id: 'A03621394',
                        type: 'Requester order identifier'
                      }
                    },
                    {
                      '@class': 'ELEMENT',
                      name: {
                        '@class': 'DV_TEXT',
                        value: 'Receiver order identifier'
                      },
                      archetype_node_id: 'at0063',
                      value: {
                        '@class': 'DV_IDENTIFIER',
                        issuer: 'BSMLAB',
                        assigner: 'BSMLAB',
                        id: 'A03621394',
                        type: 'Receiver order identifier'
                      }
                    }
                  ]
                }
              ]
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'Event Series'
              },
              archetype_node_id: 'at0001',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2020-07-17T11:52:19.092799+02:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0002',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2020-07-17T11:52:19.092799+02:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Tree'
                    },
                    archetype_node_id: 'at0003',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Test name'
                        },
                        archetype_node_id: 'at0005',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'APTT (ON HEPARIN)',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'external_terminology'
                            },
                            code_string: 'BS_RAPTT'
                          }
                        }
                      },
                      {
                        '@class': 'CLUSTER',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Specimen'
                        },
                        archetype_details: {
                          '@class': 'ARCHETYPED',
                          archetype_id: {
                            '@class': 'ARCHETYPE_ID',
                            value: 'openEHR-EHR-CLUSTER.specimen.v1'
                          },
                          rm_version: '1.0.4'
                        },
                        archetype_node_id: 'openEHR-EHR-CLUSTER.specimen.v1',
                        items: [
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Specimen type'
                            },
                            archetype_node_id: 'at0029',
                            value: {
                              '@class': 'DV_CODED_TEXT',
                              value: 'BLOOD',
                              defining_code: {
                                '@class': 'CODE_PHRASE',
                                terminology_id: {
                                  '@class': 'TERMINOLOGY_ID',
                                  value: 'external_terminology'
                                },
                                code_string: 'B'
                              }
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Collection date/time'
                            },
                            archetype_node_id: 'at0015',
                            value: {
                              '@class': 'DV_DATE_TIME',
                              value: '2020-07-02T17:07:00.000+02:00'
                            }
                          }
                        ]
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Overall test status'
                        },
                        archetype_node_id: 'at0073',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'Final',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'local'
                            },
                            code_string: 'at0038'
                          }
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Overall test status timestamp'
                        },
                        archetype_node_id: 'at0075',
                        value: {
                          '@class': 'DV_DATE_TIME',
                          value: '2020-07-02T17:13:00.000+02:00'
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Diagnostic service category'
                        },
                        archetype_node_id: 'at0077',
                        value: {
                          '@class': 'DV_TEXT',
                          value: 'HM'
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Clinical information provided'
                        },
                        archetype_node_id: 'at0100',
                        value: {
                          '@class': 'DV_TEXT',
                          value: 'testing for Julian'
                        }
                      },
                      {
                        '@class': 'CLUSTER',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Laboratory analyte result'
                        },
                        archetype_details: {
                          '@class': 'ARCHETYPED',
                          archetype_id: {
                            '@class': 'ARCHETYPE_ID',
                            value: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1'
                          },
                          rm_version: '1.0.4'
                        },
                        feeder_audit: {
                          '@class': 'FEEDER_AUDIT',
                          original_content: {
                            '@class': 'DV_PARSABLE',
                            value: '1||s||',
                            formalism: 'original'
                          },
                          originating_system_audit: {
                            '@class': 'FEEDER_AUDIT_DETAILS',
                            system_id: 'BSMLAB'
                          }
                        },
                        archetype_node_id: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1',
                        items: [
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Analyte result sequence'
                            },
                            archetype_node_id: 'at0027',
                            value: {
                              '@class': 'DV_COUNT',
                              magnitude: 1
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Analyte name'
                            },
                            archetype_node_id: 'at0024',
                            value: {
                              '@class': 'DV_CODED_TEXT',
                              value: 'APTT',
                              defining_code: {
                                '@class': 'CODE_PHRASE',
                                terminology_id: {
                                  '@class': 'TERMINOLOGY_ID',
                                  value: 'external_terminology'
                                },
                                code_string: 'BS_TAPTT'
                              }
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Analyte result'
                            },
                            archetype_node_id: 'at0001',
                            value: {
                              '@class': 'DV_QUANTITY',
                              magnitude: 1,
                              units: 's',
                              precision: 0
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Result status'
                            },
                            archetype_node_id: 'at0005',
                            value: {
                              '@class': 'DV_CODED_TEXT',
                              value: 'Final',
                              defining_code: {
                                '@class': 'CODE_PHRASE',
                                terminology_id: {
                                  '@class': 'TERMINOLOGY_ID',
                                  value: 'local'
                                },
                                code_string: 'at0018'
                              }
                            }
                          }
                        ]
                      },
                      {
                        '@class': 'CLUSTER',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Laboratory analyte result #2'
                        },
                        archetype_details: {
                          '@class': 'ARCHETYPED',
                          archetype_id: {
                            '@class': 'ARCHETYPE_ID',
                            value: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1'
                          },
                          rm_version: '1.0.4'
                        },
                        feeder_audit: {
                          '@class': 'FEEDER_AUDIT',
                          original_content: {
                            '@class': 'DV_PARSABLE',
                            value: '0.9|0.8-1.2||N|',
                            formalism: 'original'
                          },
                          originating_system_audit: {
                            '@class': 'FEEDER_AUDIT_DETAILS',
                            system_id: 'BSMLAB'
                          }
                        },
                        archetype_node_id: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1',
                        items: [
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Analyte result sequence'
                            },
                            archetype_node_id: 'at0027',
                            value: {
                              '@class': 'DV_COUNT',
                              magnitude: 2
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Analyte name'
                            },
                            archetype_node_id: 'at0024',
                            value: {
                              '@class': 'DV_CODED_TEXT',
                              value: 'APTT RATIO',
                              defining_code: {
                                '@class': 'CODE_PHRASE',
                                terminology_id: {
                                  '@class': 'TERMINOLOGY_ID',
                                  value: 'external_terminology'
                                },
                                code_string: 'BS_TARAT'
                              }
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Analyte result'
                            },
                            archetype_node_id: 'at0001',
                            value: {
                              '@class': 'DV_TEXT',
                              value: '0.9'
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Result status'
                            },
                            archetype_node_id: 'at0005',
                            value: {
                              '@class': 'DV_CODED_TEXT',
                              value: 'Final',
                              defining_code: {
                                '@class': 'CODE_PHRASE',
                                terminology_id: {
                                  '@class': 'TERMINOLOGY_ID',
                                  value: 'local'
                                },
                                code_string: 'at0018'
                              }
                            }
                          }
                        ]
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Comment'
                        },
                        archetype_node_id: 'at0101',
                        value: {
                          '@class': 'DV_TEXT',
                          value: 'THERAPEUTIC GUIDE FOR HEPARIN : APTTR 1.5 - 2.5'
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Laboratory test result #6'
            },
            uid: {
              '@class': 'HIER_OBJECT_ID',
              value: '4acdf4b6-ef76-431a-a3d1-a03baabeef5a'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1'
              },
              rm_version: '1.0.4'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            provider: {
              '@class': 'PARTY_SELF'
            },
            other_participations: [
              {
                '@class': 'PARTICIPATION',
                function: {
                  '@class': 'DV_TEXT',
                  value: 'ORDERING_PROFESSIONAL'
                },
                performer: {
                  '@class': 'PARTY_IDENTIFIED',
                  name: 'Dr D. JAMES'
                },
                mode: {
                  '@class': 'DV_CODED_TEXT',
                  value: 'not specified',
                  defining_code: {
                    '@class': 'CODE_PHRASE',
                    terminology_id: {
                      '@class': 'TERMINOLOGY_ID',
                      value: 'openehr'
                    },
                    code_string: '193'
                  }
                }
              }
            ],
            protocol: {
              '@class': 'ITEM_TREE',
              name: {
                '@class': 'DV_TEXT',
                value: 'Tree'
              },
              archetype_node_id: 'at0004',
              items: [
                {
                  '@class': 'CLUSTER',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Test request details'
                  },
                  archetype_node_id: 'at0094',
                  items: [
                    {
                      '@class': 'ELEMENT',
                      name: {
                        '@class': 'DV_TEXT',
                        value: 'Requester order identifier'
                      },
                      archetype_node_id: 'at0062',
                      value: {
                        '@class': 'DV_IDENTIFIER',
                        issuer: 'PLACER',
                        assigner: 'PLACER',
                        id: 'A03621394',
                        type: 'Requester order identifier'
                      }
                    },
                    {
                      '@class': 'ELEMENT',
                      name: {
                        '@class': 'DV_TEXT',
                        value: 'Receiver order identifier'
                      },
                      archetype_node_id: 'at0063',
                      value: {
                        '@class': 'DV_IDENTIFIER',
                        issuer: 'BSMLAB',
                        assigner: 'BSMLAB',
                        id: 'A03621394',
                        type: 'Receiver order identifier'
                      }
                    }
                  ]
                }
              ]
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'Event Series'
              },
              archetype_node_id: 'at0001',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2020-07-17T11:52:19.092799+02:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0002',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2020-07-17T11:52:19.092799+02:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Tree'
                    },
                    archetype_node_id: 'at0003',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Test name'
                        },
                        archetype_node_id: 'at0005',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'ESTIMATED GFR',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'external_terminology'
                            },
                            code_string: 'BS_RGFR'
                          }
                        }
                      },
                      {
                        '@class': 'CLUSTER',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Specimen'
                        },
                        archetype_details: {
                          '@class': 'ARCHETYPED',
                          archetype_id: {
                            '@class': 'ARCHETYPE_ID',
                            value: 'openEHR-EHR-CLUSTER.specimen.v1'
                          },
                          rm_version: '1.0.4'
                        },
                        archetype_node_id: 'openEHR-EHR-CLUSTER.specimen.v1',
                        items: [
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Specimen type'
                            },
                            archetype_node_id: 'at0029',
                            value: {
                              '@class': 'DV_CODED_TEXT',
                              value: 'BLOOD',
                              defining_code: {
                                '@class': 'CODE_PHRASE',
                                terminology_id: {
                                  '@class': 'TERMINOLOGY_ID',
                                  value: 'external_terminology'
                                },
                                code_string: 'B'
                              }
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Collection date/time'
                            },
                            archetype_node_id: 'at0015',
                            value: {
                              '@class': 'DV_DATE_TIME',
                              value: '2020-07-02T17:07:00.000+02:00'
                            }
                          }
                        ]
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Overall test status'
                        },
                        archetype_node_id: 'at0073',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'Final',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'local'
                            },
                            code_string: 'at0038'
                          }
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Overall test status timestamp'
                        },
                        archetype_node_id: 'at0075',
                        value: {
                          '@class': 'DV_DATE_TIME',
                          value: '2020-07-02T17:13:00.000+02:00'
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Diagnostic service category'
                        },
                        archetype_node_id: 'at0077',
                        value: {
                          '@class': 'DV_TEXT',
                          value: 'HM'
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Clinical information provided'
                        },
                        archetype_node_id: 'at0100',
                        value: {
                          '@class': 'DV_TEXT',
                          value: 'testing for Julian'
                        }
                      },
                      {
                        '@class': 'CLUSTER',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Laboratory analyte result'
                        },
                        archetype_details: {
                          '@class': 'ARCHETYPED',
                          archetype_id: {
                            '@class': 'ARCHETYPE_ID',
                            value: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1'
                          },
                          rm_version: '1.0.4'
                        },
                        feeder_audit: {
                          '@class': 'FEEDER_AUDIT',
                          original_content: {
                            '@class': 'DV_PARSABLE',
                            value: '>90||ml/min||',
                            formalism: 'original'
                          },
                          originating_system_audit: {
                            '@class': 'FEEDER_AUDIT_DETAILS',
                            system_id: 'BSMLAB'
                          }
                        },
                        archetype_node_id: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1',
                        items: [
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Analyte result sequence'
                            },
                            archetype_node_id: 'at0027',
                            value: {
                              '@class': 'DV_COUNT',
                              magnitude: 1
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Analyte name'
                            },
                            archetype_node_id: 'at0024',
                            value: {
                              '@class': 'DV_CODED_TEXT',
                              value: 'ESTIMATED GFR',
                              defining_code: {
                                '@class': 'CODE_PHRASE',
                                terminology_id: {
                                  '@class': 'TERMINOLOGY_ID',
                                  value: 'external_terminology'
                                },
                                code_string: 'BS_TGFR'
                              }
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Analyte result'
                            },
                            archetype_node_id: 'at0001',
                            value: {
                              '@class': 'DV_INTERVAL',
                              lower: {
                                '@class': 'DV_QUANTITY',
                                magnitude: 90,
                                units: 'ml/min',
                                precision: 0
                              },
                              lower_included: false,
                              upper_included: false,
                              lower_unbounded: false,
                              upper_unbounded: true
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Result status'
                            },
                            archetype_node_id: 'at0005',
                            value: {
                              '@class': 'DV_CODED_TEXT',
                              value: 'Final',
                              defining_code: {
                                '@class': 'CODE_PHRASE',
                                terminology_id: {
                                  '@class': 'TERMINOLOGY_ID',
                                  value: 'local'
                                },
                                code_string: 'at0018'
                              }
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'Comment'
                            },
                            archetype_node_id: 'at0003',
                            value: {
                              '@class': 'DV_TEXT',
                              value: '\\.br\\GFR units = ml/min/1.73m^2\\.br\\\\.br\\Please note limitations.\\.br\\\\.br\\https://renal.org/information-resources\\.br\\\\.br\\/the-uk-eckd-guide/about-egfr/\\.br\\'
                            }
                          }
                        ]
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Comment'
                        },
                        archetype_node_id: 'at0101',
                        value: {
                          '@class': 'DV_TEXT',
                          value: 'eGFR results MUST NOT be used in hospitalised patients'
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
};
export const mockResultTablesForDuplicates = [
  {
    '@class': 'COMPOSITION',
    name: {
      '@class': 'DV_TEXT',
      value: 'Laboratory test report'
    },
    uid: {
      '@class': 'OBJECT_VERSION_ID',
      value: '2e19f4c1-5bec-48cd-941d-ebd6edaa5055::default::1'
    },
    archetype_details: {
      '@class': 'ARCHETYPED',
      archetype_id: {
        '@class': 'ARCHETYPE_ID',
        value: 'openEHR-EHR-COMPOSITION.report-result.v1'
      },
      template_id: {
        '@class': 'TEMPLATE_ID',
        value: 'Laboratory test report'
      },
      rm_version: '1.0.4'
    },
    archetype_node_id: 'openEHR-EHR-COMPOSITION.report-result.v1',
    language: {
      '@class': 'CODE_PHRASE',
      terminology_id: {
        '@class': 'TERMINOLOGY_ID',
        value: 'ISO_639-1'
      },
      code_string: 'en'
    },
    territory: {
      '@class': 'CODE_PHRASE',
      terminology_id: {
        '@class': 'TERMINOLOGY_ID',
        value: 'ISO_3166-1'
      },
      code_string: 'GB'
    },
    category: {
      '@class': 'DV_CODED_TEXT',
      value: 'event',
      defining_code: {
        '@class': 'CODE_PHRASE',
        terminology_id: {
          '@class': 'TERMINOLOGY_ID',
          value: 'openehr'
        },
        code_string: '433'
      }
    },
    composer: {
      '@class': 'PARTY_SELF'
    },
    context: {
      '@class': 'EVENT_CONTEXT',
      start_time: {
        '@class': 'DV_DATE_TIME',
        value: '2020-07-17T11:52:19.092799+02:00'
      },
      end_time: {
        '@class': 'DV_DATE_TIME',
        value: '2020-07-17T11:52:19.092799+02:00'
      },
      setting: {
        '@class': 'DV_CODED_TEXT',
        value: 'secondary medical care',
        defining_code: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'openehr'
          },
          code_string: '232'
        }
      },
      other_context: {
        '@class': 'ITEM_TREE',
        name: {
          '@class': 'DV_TEXT',
          value: 'Tree'
        },
        archetype_node_id: 'at0001',
        items: [
          {
            '@class': 'ELEMENT',
            name: {
              '@class': 'DV_TEXT',
              value: 'Laboratory order ID'
            },
            archetype_node_id: 'at0002',
            value: {
              '@class': 'DV_TEXT',
              value: 'b03220a2-77bc-4da9-88fe-18cde728a475'
            }
          },
          {
            '@class': 'CLUSTER',
            name: {
              '@class': 'DV_TEXT',
              value: 'Laboratory context details'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-CLUSTER.lab_context_details.v0'
              },
              rm_version: '1.0.4'
            },
            archetype_node_id: 'openEHR-EHR-CLUSTER.lab_context_details.v0',
            items: [
              {
                '@class': 'ELEMENT',
                name: {
                  '@class': 'DV_TEXT',
                  value: 'Order group number'
                },
                archetype_node_id: 'at0021',
                value: {
                  '@class': 'DV_TEXT',
                  value: 'A03621394'
                }
              },
              {
                '@class': 'ELEMENT',
                name: {
                  '@class': 'DV_TEXT',
                  value: 'Report ID'
                },
                archetype_node_id: 'at0007',
                value: {
                  '@class': 'DV_TEXT',
                  value: '96a63d95-7b2f-4320-84a1-b6f52b93fc2e'
                }
              },
              {
                '@class': 'ELEMENT',
                name: {
                  '@class': 'DV_TEXT',
                  value: 'Laboratory'
                },
                archetype_node_id: 'at0015',
                value: {
                  '@class': 'DV_CODED_TEXT',
                  value: 'Laboratory',
                  defining_code: {
                    '@class': 'CODE_PHRASE',
                    terminology_id: {
                      '@class': 'TERMINOLOGY_ID',
                      value: 'external_terminology'
                    },
                    code_string: 'Laboratory'
                  }
                }
              }
            ]
          }
        ]
      }
    },
    content: [
      {
        '@class': 'OBSERVATION',
        name: {
          '@class': 'DV_TEXT',
          value: 'Laboratory test result'
        },
        uid: {
          '@class': 'HIER_OBJECT_ID',
          value: '4acdf4b6-ef76-431a-a3d1-a03baabeef5a'
        },
        archetype_details: {
          '@class': 'ARCHETYPED',
          archetype_id: {
            '@class': 'ARCHETYPE_ID',
            value: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1'
          },
          rm_version: '1.0.4'
        },
        archetype_node_id: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1',
        language: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'ISO_639-1'
          },
          code_string: 'en'
        },
        encoding: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'IANA_character-sets'
          },
          code_string: 'UTF-8'
        },
        subject: {
          '@class': 'PARTY_SELF'
        },
        provider: {
          '@class': 'PARTY_SELF'
        },
        other_participations: [
          {
            '@class': 'PARTICIPATION',
            function: {
              '@class': 'DV_TEXT',
              value: 'ORDERING_PROFESSIONAL'
            },
            performer: {
              '@class': 'PARTY_IDENTIFIED',
              name: 'Dr D. JAMES'
            },
            mode: {
              '@class': 'DV_CODED_TEXT',
              value: 'not specified',
              defining_code: {
                '@class': 'CODE_PHRASE',
                terminology_id: {
                  '@class': 'TERMINOLOGY_ID',
                  value: 'openehr'
                },
                code_string: '193'
              }
            }
          }
        ],
        protocol: {
          '@class': 'ITEM_TREE',
          name: {
            '@class': 'DV_TEXT',
            value: 'Tree'
          },
          archetype_node_id: 'at0004',
          items: [
            {
              '@class': 'CLUSTER',
              name: {
                '@class': 'DV_TEXT',
                value: 'Test request details'
              },
              archetype_node_id: 'at0094',
              items: [
                {
                  '@class': 'ELEMENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Requester order identifier'
                  },
                  archetype_node_id: 'at0062',
                  value: {
                    '@class': 'DV_IDENTIFIER',
                    issuer: 'PLACER',
                    assigner: 'PLACER',
                    id: 'A03621394',
                    type: 'Requester order identifier'
                  }
                },
                {
                  '@class': 'ELEMENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Receiver order identifier'
                  },
                  archetype_node_id: 'at0063',
                  value: {
                    '@class': 'DV_IDENTIFIER',
                    issuer: 'BSMLAB',
                    assigner: 'BSMLAB',
                    id: 'A03621394',
                    type: 'Receiver order identifier'
                  }
                }
              ]
            }
          ]
        },
        data: {
          '@class': 'HISTORY',
          name: {
            '@class': 'DV_TEXT',
            value: 'Event Series'
          },
          archetype_node_id: 'at0001',
          origin: {
            '@class': 'DV_DATE_TIME',
            value: '2020-07-17T11:52:19.092799+02:00'
          },
          events: [
            {
              '@class': 'POINT_EVENT',
              name: {
                '@class': 'DV_TEXT',
                value: 'Any event'
              },
              archetype_node_id: 'at0002',
              time: {
                '@class': 'DV_DATE_TIME',
                value: '2020-07-17T11:52:19.092799+02:00'
              },
              data: {
                '@class': 'ITEM_TREE',
                name: {
                  '@class': 'DV_TEXT',
                  value: 'Tree'
                },
                archetype_node_id: 'at0003',
                items: [
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Test name'
                    },
                    archetype_node_id: 'at0005',
                    value: {
                      '@class': 'DV_CODED_TEXT',
                      value: 'CREATININE',
                      defining_code: {
                        '@class': 'CODE_PHRASE',
                        terminology_id: {
                          '@class': 'TERMINOLOGY_ID',
                          value: 'external_terminology'
                        },
                        code_string: 'BS_RCR'
                      }
                    }
                  },
                  {
                    '@class': 'CLUSTER',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Specimen'
                    },
                    archetype_details: {
                      '@class': 'ARCHETYPED',
                      archetype_id: {
                        '@class': 'ARCHETYPE_ID',
                        value: 'openEHR-EHR-CLUSTER.specimen.v1'
                      },
                      rm_version: '1.0.4'
                    },
                    archetype_node_id: 'openEHR-EHR-CLUSTER.specimen.v1',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Specimen type'
                        },
                        archetype_node_id: 'at0029',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'BLOOD',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'external_terminology'
                            },
                            code_string: 'B'
                          }
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Collection date/time'
                        },
                        archetype_node_id: 'at0015',
                        value: {
                          '@class': 'DV_DATE_TIME',
                          value: '2020-07-02T17:07:00.000+02:00'
                        }
                      }
                    ]
                  },
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Overall test status'
                    },
                    archetype_node_id: 'at0073',
                    value: {
                      '@class': 'DV_CODED_TEXT',
                      value: 'Final',
                      defining_code: {
                        '@class': 'CODE_PHRASE',
                        terminology_id: {
                          '@class': 'TERMINOLOGY_ID',
                          value: 'local'
                        },
                        code_string: 'at0038'
                      }
                    }
                  },
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Overall test status timestamp'
                    },
                    archetype_node_id: 'at0075',
                    value: {
                      '@class': 'DV_DATE_TIME',
                      value: '2020-07-02T17:13:00.000+02:00'
                    }
                  },
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Diagnostic service category'
                    },
                    archetype_node_id: 'at0077',
                    value: {
                      '@class': 'DV_TEXT',
                      value: 'HM'
                    }
                  },
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Clinical information provided'
                    },
                    archetype_node_id: 'at0100',
                    value: {
                      '@class': 'DV_TEXT',
                      value: 'testing for Julian'
                    }
                  },
                  {
                    '@class': 'CLUSTER',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Laboratory analyte result'
                    },
                    archetype_details: {
                      '@class': 'ARCHETYPED',
                      archetype_id: {
                        '@class': 'ARCHETYPE_ID',
                        value: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1'
                      },
                      rm_version: '1.0.4'
                    },
                    feeder_audit: {
                      '@class': 'FEEDER_AUDIT',
                      original_content: {
                        '@class': 'DV_PARSABLE',
                        value: '50|50-100|umol/L|N|',
                        formalism: 'original'
                      },
                      originating_system_audit: {
                        '@class': 'FEEDER_AUDIT_DETAILS',
                        system_id: 'BSMLAB'
                      }
                    },
                    archetype_node_id: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Analyte result sequence'
                        },
                        archetype_node_id: 'at0027',
                        value: {
                          '@class': 'DV_COUNT',
                          magnitude: 1
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Analyte name'
                        },
                        archetype_node_id: 'at0024',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'CREATININE',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'external_terminology'
                            },
                            code_string: 'BS_TCREA'
                          }
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Analyte result'
                        },
                        archetype_node_id: 'at0001',
                        value: {
                          '@class': 'DV_QUANTITY',
                          normal_range: {
                            '@class': 'DV_INTERVAL',
                            lower: {
                              '@class': 'DV_QUANTITY',
                              magnitude: 50,
                              units: 'umol/L',
                              precision: 0
                            },
                            upper: {
                              '@class': 'DV_QUANTITY',
                              magnitude: 100,
                              units: 'umol/L',
                              precision: 0
                            },
                            lower_included: true,
                            upper_included: true,
                            lower_unbounded: false,
                            upper_unbounded: false
                          },
                          normal_status: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'openehr_normal_statuses'
                            },
                            code_string: 'N'
                          },
                          magnitude: 50,
                          units: 'umol/L',
                          precision: 0
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Result status'
                        },
                        archetype_node_id: 'at0005',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'Final',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'local'
                            },
                            code_string: 'at0018'
                          }
                        }
                      }
                    ]
                  }
                ]
              }
            }
          ]
        }
      }
    ]
  },
  {
    '@class': 'COMPOSITION',
    name: {
      '@class': 'DV_TEXT',
      value: null
    },
    uid: {
      '@class': 'OBJECT_VERSION_ID',
      value: null
    },
    archetype_details: {
      '@class': 'ARCHETYPED',
      archetype_id: {
        '@class': 'ARCHETYPE_ID',
        value: null
      },
      template_id: {
        '@class': 'TEMPLATE_ID',
        value: null
      },
      rm_version: null
    },
    archetype_node_id: null,
    language: {
      '@class': 'CODE_PHRASE',
      terminology_id: {
        '@class': 'TERMINOLOGY_ID',
        value: null
      },
      code_string: null
    },
    territory: {
      '@class': 'CODE_PHRASE',
      terminology_id: {
        '@class': 'TERMINOLOGY_ID',
        value: null
      },
      code_string: null
    },
    category: {
      '@class': 'DV_CODED_TEXT',
      value: null,
      defining_code: {
        '@class': 'CODE_PHRASE',
        terminology_id: {
          '@class': 'TERMINOLOGY_ID',
          value: null
        },
        code_string: null
      }
    },
    composer: {
      '@class': 'PARTY_SELF'
    },
    context: {
      '@class': 'EVENT_CONTEXT',
      start_time: {
        '@class': 'DV_DATE_TIME',
        value: null
      },
      end_time: {
        '@class': 'DV_DATE_TIME',
        value: null
      },
      setting: {
        '@class': 'DV_CODED_TEXT',
        value: null,
        defining_code: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: null
          },
          code_string: null
        }
      },
      other_context: {
        '@class': 'ITEM_TREE',
        name: {
          '@class': 'DV_TEXT',
          value: null
        },
        archetype_node_id: null,
        items: [
          {
            '@class': 'ELEMENT',
            name: {
              '@class': 'DV_TEXT',
              value: 'Laboratory order ID'
            },
            archetype_node_id: 'at0002',
            value: {
              '@class': 'DV_TEXT',
              value: 'b03220a2-77bc-4da9-88fe-18cde728a475'
            }
          },
          {
            '@class': 'CLUSTER',
            name: {
              '@class': 'DV_TEXT',
              value: 'Laboratory context details'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-CLUSTER.lab_context_details.v0'
              },
              rm_version: '1.0.4'
            },
            archetype_node_id: 'openEHR-EHR-CLUSTER.lab_context_details.v0',
            items: [
              {
                '@class': 'ELEMENT',
                name: {
                  '@class': 'DV_TEXT',
                  value: 'Order group number'
                },
                archetype_node_id: 'at0021',
                value: {
                  '@class': 'DV_TEXT',
                  value: 'A03621394'
                }
              },
              {
                '@class': 'ELEMENT',
                name: {
                  '@class': 'DV_TEXT',
                  value: 'Report ID'
                },
                archetype_node_id: 'at0007',
                value: {
                  '@class': 'DV_TEXT',
                  value: '96a63d95-7b2f-4320-84a1-b6f52b93fc2e'
                }
              },
              {
                '@class': 'ELEMENT',
                name: {
                  '@class': 'DV_TEXT',
                  value: 'Laboratory'
                },
                archetype_node_id: 'at0015',
                value: {
                  '@class': 'DV_CODED_TEXT',
                  value: 'Laboratory',
                  defining_code: {
                    '@class': 'CODE_PHRASE',
                    terminology_id: {
                      '@class': 'TERMINOLOGY_ID',
                      value: 'external_terminology'
                    },
                    code_string: 'Laboratory'
                  }
                }
              }
            ]
          }
        ]
      }
    },
    content: [
      {
        '@class': 'OBSERVATION',
        name: {
          '@class': 'DV_TEXT',
          value: 'Laboratory test result #2'
        },
        uid: {
          '@class': 'HIER_OBJECT_ID',
          value: '4acdf4b6-ef76-431a-a3d1-a03baabeef5a'
        },
        archetype_details: {
          '@class': 'ARCHETYPED',
          archetype_id: {
            '@class': 'ARCHETYPE_ID',
            value: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1'
          },
          rm_version: '1.0.4'
        },
        archetype_node_id: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1',
        language: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'ISO_639-1'
          },
          code_string: 'en'
        },
        encoding: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'IANA_character-sets'
          },
          code_string: 'UTF-8'
        },
        subject: {
          '@class': 'PARTY_SELF'
        },
        provider: {
          '@class': 'PARTY_SELF'
        },
        other_participations: [
          {
            '@class': 'PARTICIPATION',
            function: {
              '@class': 'DV_TEXT',
              value: 'ORDERING_PROFESSIONAL'
            },
            performer: {
              '@class': 'PARTY_IDENTIFIED',
              name: 'Dr D. JAMES'
            },
            mode: {
              '@class': 'DV_CODED_TEXT',
              value: 'not specified',
              defining_code: {
                '@class': 'CODE_PHRASE',
                terminology_id: {
                  '@class': 'TERMINOLOGY_ID',
                  value: 'openehr'
                },
                code_string: '193'
              }
            }
          }
        ],
        protocol: {
          '@class': 'ITEM_TREE',
          name: {
            '@class': 'DV_TEXT',
            value: 'Tree'
          },
          archetype_node_id: 'at0004',
          items: [
            {
              '@class': 'CLUSTER',
              name: {
                '@class': 'DV_TEXT',
                value: 'Test request details'
              },
              archetype_node_id: 'at0094',
              items: [
                {
                  '@class': 'ELEMENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Requester order identifier'
                  },
                  archetype_node_id: 'at0062',
                  value: {
                    '@class': 'DV_IDENTIFIER',
                    issuer: 'PLACER',
                    assigner: 'PLACER',
                    id: 'A03621394',
                    type: 'Requester order identifier'
                  }
                },
                {
                  '@class': 'ELEMENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Receiver order identifier'
                  },
                  archetype_node_id: 'at0063',
                  value: {
                    '@class': 'DV_IDENTIFIER',
                    issuer: 'BSMLAB',
                    assigner: 'BSMLAB',
                    id: 'A03621394',
                    type: 'Receiver order identifier'
                  }
                }
              ]
            }
          ]
        },
        data: {
          '@class': 'HISTORY',
          name: {
            '@class': 'DV_TEXT',
            value: 'Event Series'
          },
          archetype_node_id: 'at0001',
          origin: {
            '@class': 'DV_DATE_TIME',
            value: '2020-07-17T11:52:19.092799+02:00'
          },
          events: [
            {
              '@class': 'POINT_EVENT',
              name: {
                '@class': 'DV_TEXT',
                value: 'Any event'
              },
              archetype_node_id: 'at0002',
              time: {
                '@class': 'DV_DATE_TIME',
                value: '2020-07-17T11:52:19.092799+02:00'
              },
              data: {
                '@class': 'ITEM_TREE',
                name: {
                  '@class': 'DV_TEXT',
                  value: 'Tree'
                },
                archetype_node_id: 'at0003',
                items: [
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Test name'
                    },
                    archetype_node_id: 'at0005',
                    value: {
                      '@class': 'DV_CODED_TEXT',
                      value: 'AKI RISK',
                      defining_code: {
                        '@class': 'CODE_PHRASE',
                        terminology_id: {
                          '@class': 'TERMINOLOGY_ID',
                          value: 'external_terminology'
                        },
                        code_string: 'BS_RAKI'
                      }
                    }
                  },
                  {
                    '@class': 'CLUSTER',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Specimen'
                    },
                    archetype_details: {
                      '@class': 'ARCHETYPED',
                      archetype_id: {
                        '@class': 'ARCHETYPE_ID',
                        value: 'openEHR-EHR-CLUSTER.specimen.v1'
                      },
                      rm_version: '1.0.4'
                    },
                    archetype_node_id: 'openEHR-EHR-CLUSTER.specimen.v1',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Specimen type'
                        },
                        archetype_node_id: 'at0029',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'BLOOD',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'external_terminology'
                            },
                            code_string: 'B'
                          }
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Collection date/time'
                        },
                        archetype_node_id: 'at0015',
                        value: {
                          '@class': 'DV_DATE_TIME',
                          value: '2020-07-02T17:07:00.000+02:00'
                        }
                      }
                    ]
                  },
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Overall test status'
                    },
                    archetype_node_id: 'at0073',
                    value: {
                      '@class': 'DV_CODED_TEXT',
                      value: 'Final',
                      defining_code: {
                        '@class': 'CODE_PHRASE',
                        terminology_id: {
                          '@class': 'TERMINOLOGY_ID',
                          value: 'local'
                        },
                        code_string: 'at0038'
                      }
                    }
                  },
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Overall test status timestamp'
                    },
                    archetype_node_id: 'at0075',
                    value: {
                      '@class': 'DV_DATE_TIME',
                      value: '2020-07-02T17:13:00.000+02:00'
                    }
                  },
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Diagnostic service category'
                    },
                    archetype_node_id: 'at0077',
                    value: {
                      '@class': 'DV_TEXT',
                      value: 'HM'
                    }
                  },
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Clinical information provided'
                    },
                    archetype_node_id: 'at0100',
                    value: {
                      '@class': 'DV_TEXT',
                      value: 'testing for Julian'
                    }
                  },
                  {
                    '@class': 'CLUSTER',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Laboratory analyte result'
                    },
                    archetype_details: {
                      '@class': 'ARCHETYPED',
                      archetype_id: {
                        '@class': 'ARCHETYPE_ID',
                        value: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1'
                      },
                      rm_version: '1.0.4'
                    },
                    feeder_audit: {
                      '@class': 'FEEDER_AUDIT',
                      original_content: {
                        '@class': 'DV_PARSABLE',
                        value: '0||||',
                        formalism: 'original'
                      },
                      originating_system_audit: {
                        '@class': 'FEEDER_AUDIT_DETAILS',
                        system_id: 'BSMLAB'
                      }
                    },
                    archetype_node_id: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Analyte result sequence'
                        },
                        archetype_node_id: 'at0027',
                        value: {
                          '@class': 'DV_COUNT',
                          magnitude: 1
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Analyte name'
                        },
                        archetype_node_id: 'at0024',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'AKI RISK',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'external_terminology'
                            },
                            code_string: 'BS_TAKI'
                          }
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Analyte result'
                        },
                        archetype_node_id: 'at0001',
                        value: {
                          '@class': 'DV_COUNT',
                          magnitude: 0
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Result status'
                        },
                        archetype_node_id: 'at0005',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'Final',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'local'
                            },
                            code_string: 'at0018'
                          }
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Comment'
                        },
                        archetype_node_id: 'at0003',
                        value: {
                          '@class': 'DV_TEXT',
                          value: 'NO RISK OF AKI IDENTIFIED'
                        }
                      }
                    ]
                  }
                ]
              }
            }
          ]
        }
      }
    ],
    empty: true
  },
  {
    '@class': 'COMPOSITION',
    name: {
      '@class': 'DV_TEXT',
      value: null
    },
    uid: {
      '@class': 'OBJECT_VERSION_ID',
      value: null
    },
    archetype_details: {
      '@class': 'ARCHETYPED',
      archetype_id: {
        '@class': 'ARCHETYPE_ID',
        value: null
      },
      template_id: {
        '@class': 'TEMPLATE_ID',
        value: null
      },
      rm_version: null
    },
    archetype_node_id: null,
    language: {
      '@class': 'CODE_PHRASE',
      terminology_id: {
        '@class': 'TERMINOLOGY_ID',
        value: null
      },
      code_string: null
    },
    territory: {
      '@class': 'CODE_PHRASE',
      terminology_id: {
        '@class': 'TERMINOLOGY_ID',
        value: null
      },
      code_string: null
    },
    category: {
      '@class': 'DV_CODED_TEXT',
      value: null,
      defining_code: {
        '@class': 'CODE_PHRASE',
        terminology_id: {
          '@class': 'TERMINOLOGY_ID',
          value: null
        },
        code_string: null
      }
    },
    composer: {
      '@class': 'PARTY_SELF'
    },
    context: {
      '@class': 'EVENT_CONTEXT',
      start_time: {
        '@class': 'DV_DATE_TIME',
        value: null
      },
      end_time: {
        '@class': 'DV_DATE_TIME',
        value: null
      },
      setting: {
        '@class': 'DV_CODED_TEXT',
        value: null,
        defining_code: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: null
          },
          code_string: null
        }
      },
      other_context: {
        '@class': 'ITEM_TREE',
        name: {
          '@class': 'DV_TEXT',
          value: null
        },
        archetype_node_id: null,
        items: [
          {
            '@class': 'ELEMENT',
            name: {
              '@class': 'DV_TEXT',
              value: 'Laboratory order ID'
            },
            archetype_node_id: 'at0002',
            value: {
              '@class': 'DV_TEXT',
              value: 'b03220a2-77bc-4da9-88fe-18cde728a475'
            }
          },
          {
            '@class': 'CLUSTER',
            name: {
              '@class': 'DV_TEXT',
              value: 'Laboratory context details'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-CLUSTER.lab_context_details.v0'
              },
              rm_version: '1.0.4'
            },
            archetype_node_id: 'openEHR-EHR-CLUSTER.lab_context_details.v0',
            items: [
              {
                '@class': 'ELEMENT',
                name: {
                  '@class': 'DV_TEXT',
                  value: 'Order group number'
                },
                archetype_node_id: 'at0021',
                value: {
                  '@class': 'DV_TEXT',
                  value: 'A03621394'
                }
              },
              {
                '@class': 'ELEMENT',
                name: {
                  '@class': 'DV_TEXT',
                  value: 'Report ID'
                },
                archetype_node_id: 'at0007',
                value: {
                  '@class': 'DV_TEXT',
                  value: '96a63d95-7b2f-4320-84a1-b6f52b93fc2e'
                }
              },
              {
                '@class': 'ELEMENT',
                name: {
                  '@class': 'DV_TEXT',
                  value: 'Laboratory'
                },
                archetype_node_id: 'at0015',
                value: {
                  '@class': 'DV_CODED_TEXT',
                  value: 'Laboratory',
                  defining_code: {
                    '@class': 'CODE_PHRASE',
                    terminology_id: {
                      '@class': 'TERMINOLOGY_ID',
                      value: 'external_terminology'
                    },
                    code_string: 'Laboratory'
                  }
                }
              }
            ]
          }
        ]
      }
    },
    content: [
      {
        '@class': 'OBSERVATION',
        name: {
          '@class': 'DV_TEXT',
          value: 'Laboratory test result #3'
        },
        uid: {
          '@class': 'HIER_OBJECT_ID',
          value: '4acdf4b6-ef76-431a-a3d1-a03baabeef5a'
        },
        archetype_details: {
          '@class': 'ARCHETYPED',
          archetype_id: {
            '@class': 'ARCHETYPE_ID',
            value: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1'
          },
          rm_version: '1.0.4'
        },
        archetype_node_id: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1',
        language: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'ISO_639-1'
          },
          code_string: 'en'
        },
        encoding: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'IANA_character-sets'
          },
          code_string: 'UTF-8'
        },
        subject: {
          '@class': 'PARTY_SELF'
        },
        provider: {
          '@class': 'PARTY_SELF'
        },
        other_participations: [
          {
            '@class': 'PARTICIPATION',
            function: {
              '@class': 'DV_TEXT',
              value: 'ORDERING_PROFESSIONAL'
            },
            performer: {
              '@class': 'PARTY_IDENTIFIED',
              name: 'Dr D. JAMES'
            },
            mode: {
              '@class': 'DV_CODED_TEXT',
              value: 'not specified',
              defining_code: {
                '@class': 'CODE_PHRASE',
                terminology_id: {
                  '@class': 'TERMINOLOGY_ID',
                  value: 'openehr'
                },
                code_string: '193'
              }
            }
          }
        ],
        protocol: {
          '@class': 'ITEM_TREE',
          name: {
            '@class': 'DV_TEXT',
            value: 'Tree'
          },
          archetype_node_id: 'at0004',
          items: [
            {
              '@class': 'CLUSTER',
              name: {
                '@class': 'DV_TEXT',
                value: 'Test request details'
              },
              archetype_node_id: 'at0094',
              items: [
                {
                  '@class': 'ELEMENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Requester order identifier'
                  },
                  archetype_node_id: 'at0062',
                  value: {
                    '@class': 'DV_IDENTIFIER',
                    issuer: 'PLACER',
                    assigner: 'PLACER',
                    id: 'A03621394',
                    type: 'Requester order identifier'
                  }
                },
                {
                  '@class': 'ELEMENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Receiver order identifier'
                  },
                  archetype_node_id: 'at0063',
                  value: {
                    '@class': 'DV_IDENTIFIER',
                    issuer: 'BSMLAB',
                    assigner: 'BSMLAB',
                    id: 'A03621394',
                    type: 'Receiver order identifier'
                  }
                }
              ]
            }
          ]
        },
        data: {
          '@class': 'HISTORY',
          name: {
            '@class': 'DV_TEXT',
            value: 'Event Series'
          },
          archetype_node_id: 'at0001',
          origin: {
            '@class': 'DV_DATE_TIME',
            value: '2020-07-17T11:52:19.092799+02:00'
          },
          events: [
            {
              '@class': 'POINT_EVENT',
              name: {
                '@class': 'DV_TEXT',
                value: 'Any event'
              },
              archetype_node_id: 'at0002',
              time: {
                '@class': 'DV_DATE_TIME',
                value: '2020-07-17T11:52:19.092799+02:00'
              },
              data: {
                '@class': 'ITEM_TREE',
                name: {
                  '@class': 'DV_TEXT',
                  value: 'Tree'
                },
                archetype_node_id: 'at0003',
                items: [
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Test name'
                    },
                    archetype_node_id: 'at0005',
                    value: {
                      '@class': 'DV_CODED_TEXT',
                      value: 'C REACTIVE PROTEIN',
                      defining_code: {
                        '@class': 'CODE_PHRASE',
                        terminology_id: {
                          '@class': 'TERMINOLOGY_ID',
                          value: 'external_terminology'
                        },
                        code_string: 'BS_RCRP'
                      }
                    }
                  },
                  {
                    '@class': 'CLUSTER',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Specimen'
                    },
                    archetype_details: {
                      '@class': 'ARCHETYPED',
                      archetype_id: {
                        '@class': 'ARCHETYPE_ID',
                        value: 'openEHR-EHR-CLUSTER.specimen.v1'
                      },
                      rm_version: '1.0.4'
                    },
                    archetype_node_id: 'openEHR-EHR-CLUSTER.specimen.v1',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Specimen type'
                        },
                        archetype_node_id: 'at0029',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'BLOOD',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'external_terminology'
                            },
                            code_string: 'B'
                          }
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Collection date/time'
                        },
                        archetype_node_id: 'at0015',
                        value: {
                          '@class': 'DV_DATE_TIME',
                          value: '2020-07-02T17:07:00.000+02:00'
                        }
                      }
                    ]
                  },
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Overall test status'
                    },
                    archetype_node_id: 'at0073',
                    value: {
                      '@class': 'DV_CODED_TEXT',
                      value: 'Final',
                      defining_code: {
                        '@class': 'CODE_PHRASE',
                        terminology_id: {
                          '@class': 'TERMINOLOGY_ID',
                          value: 'local'
                        },
                        code_string: 'at0038'
                      }
                    }
                  },
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Overall test status timestamp'
                    },
                    archetype_node_id: 'at0075',
                    value: {
                      '@class': 'DV_DATE_TIME',
                      value: '2020-07-02T17:13:00.000+02:00'
                    }
                  },
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Diagnostic service category'
                    },
                    archetype_node_id: 'at0077',
                    value: {
                      '@class': 'DV_TEXT',
                      value: 'HM'
                    }
                  },
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Clinical information provided'
                    },
                    archetype_node_id: 'at0100',
                    value: {
                      '@class': 'DV_TEXT',
                      value: 'testing for Julian'
                    }
                  },
                  {
                    '@class': 'CLUSTER',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Laboratory analyte result'
                    },
                    archetype_details: {
                      '@class': 'ARCHETYPED',
                      archetype_id: {
                        '@class': 'ARCHETYPE_ID',
                        value: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1'
                      },
                      rm_version: '1.0.4'
                    },
                    feeder_audit: {
                      '@class': 'FEEDER_AUDIT',
                      original_content: {
                        '@class': 'DV_PARSABLE',
                        value: '9|0-10|mg/L|N|',
                        formalism: 'original'
                      },
                      originating_system_audit: {
                        '@class': 'FEEDER_AUDIT_DETAILS',
                        system_id: 'BSMLAB'
                      }
                    },
                    archetype_node_id: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Analyte result sequence'
                        },
                        archetype_node_id: 'at0027',
                        value: {
                          '@class': 'DV_COUNT',
                          magnitude: 1
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Analyte name'
                        },
                        archetype_node_id: 'at0024',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'C REACTIVE PROTEIN',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'external_terminology'
                            },
                            code_string: 'BS_TCRP'
                          }
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Analyte result'
                        },
                        archetype_node_id: 'at0001',
                        value: {
                          '@class': 'DV_QUANTITY',
                          normal_range: {
                            '@class': 'DV_INTERVAL',
                            lower: {
                              '@class': 'DV_QUANTITY',
                              magnitude: 0,
                              units: 'mg/L',
                              precision: 0
                            },
                            upper: {
                              '@class': 'DV_QUANTITY',
                              magnitude: 10,
                              units: 'mg/L',
                              precision: 0
                            },
                            lower_included: true,
                            upper_included: true,
                            lower_unbounded: false,
                            upper_unbounded: false
                          },
                          normal_status: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'openehr_normal_statuses'
                            },
                            code_string: 'N'
                          },
                          magnitude: 9,
                          units: 'mg/L',
                          precision: 0
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Result status'
                        },
                        archetype_node_id: 'at0005',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'Final',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'local'
                            },
                            code_string: 'at0018'
                          }
                        }
                      }
                    ]
                  }
                ]
              }
            }
          ]
        }
      }
    ],
    empty: true
  },
  {
    '@class': 'COMPOSITION',
    name: {
      '@class': 'DV_TEXT',
      value: null
    },
    uid: {
      '@class': 'OBJECT_VERSION_ID',
      value: null
    },
    archetype_details: {
      '@class': 'ARCHETYPED',
      archetype_id: {
        '@class': 'ARCHETYPE_ID',
        value: null
      },
      template_id: {
        '@class': 'TEMPLATE_ID',
        value: null
      },
      rm_version: null
    },
    archetype_node_id: null,
    language: {
      '@class': 'CODE_PHRASE',
      terminology_id: {
        '@class': 'TERMINOLOGY_ID',
        value: null
      },
      code_string: null
    },
    territory: {
      '@class': 'CODE_PHRASE',
      terminology_id: {
        '@class': 'TERMINOLOGY_ID',
        value: null
      },
      code_string: null
    },
    category: {
      '@class': 'DV_CODED_TEXT',
      value: null,
      defining_code: {
        '@class': 'CODE_PHRASE',
        terminology_id: {
          '@class': 'TERMINOLOGY_ID',
          value: null
        },
        code_string: null
      }
    },
    composer: {
      '@class': 'PARTY_SELF'
    },
    context: {
      '@class': 'EVENT_CONTEXT',
      start_time: {
        '@class': 'DV_DATE_TIME',
        value: null
      },
      end_time: {
        '@class': 'DV_DATE_TIME',
        value: null
      },
      setting: {
        '@class': 'DV_CODED_TEXT',
        value: null,
        defining_code: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: null
          },
          code_string: null
        }
      },
      other_context: {
        '@class': 'ITEM_TREE',
        name: {
          '@class': 'DV_TEXT',
          value: null
        },
        archetype_node_id: null,
        items: [
          {
            '@class': 'ELEMENT',
            name: {
              '@class': 'DV_TEXT',
              value: 'Laboratory order ID'
            },
            archetype_node_id: 'at0002',
            value: {
              '@class': 'DV_TEXT',
              value: 'b03220a2-77bc-4da9-88fe-18cde728a475'
            }
          },
          {
            '@class': 'CLUSTER',
            name: {
              '@class': 'DV_TEXT',
              value: 'Laboratory context details'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-CLUSTER.lab_context_details.v0'
              },
              rm_version: '1.0.4'
            },
            archetype_node_id: 'openEHR-EHR-CLUSTER.lab_context_details.v0',
            items: [
              {
                '@class': 'ELEMENT',
                name: {
                  '@class': 'DV_TEXT',
                  value: 'Order group number'
                },
                archetype_node_id: 'at0021',
                value: {
                  '@class': 'DV_TEXT',
                  value: 'A03621394'
                }
              },
              {
                '@class': 'ELEMENT',
                name: {
                  '@class': 'DV_TEXT',
                  value: 'Report ID'
                },
                archetype_node_id: 'at0007',
                value: {
                  '@class': 'DV_TEXT',
                  value: '96a63d95-7b2f-4320-84a1-b6f52b93fc2e'
                }
              },
              {
                '@class': 'ELEMENT',
                name: {
                  '@class': 'DV_TEXT',
                  value: 'Laboratory'
                },
                archetype_node_id: 'at0015',
                value: {
                  '@class': 'DV_CODED_TEXT',
                  value: 'Laboratory',
                  defining_code: {
                    '@class': 'CODE_PHRASE',
                    terminology_id: {
                      '@class': 'TERMINOLOGY_ID',
                      value: 'external_terminology'
                    },
                    code_string: 'Laboratory'
                  }
                }
              }
            ]
          }
        ]
      }
    },
    content: [
      {
        '@class': 'OBSERVATION',
        name: {
          '@class': 'DV_TEXT',
          value: 'Laboratory test result #4'
        },
        uid: {
          '@class': 'HIER_OBJECT_ID',
          value: '4acdf4b6-ef76-431a-a3d1-a03baabeef5a'
        },
        archetype_details: {
          '@class': 'ARCHETYPED',
          archetype_id: {
            '@class': 'ARCHETYPE_ID',
            value: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1'
          },
          rm_version: '1.0.4'
        },
        archetype_node_id: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1',
        language: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'ISO_639-1'
          },
          code_string: 'en'
        },
        encoding: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'IANA_character-sets'
          },
          code_string: 'UTF-8'
        },
        subject: {
          '@class': 'PARTY_SELF'
        },
        provider: {
          '@class': 'PARTY_SELF'
        },
        other_participations: [
          {
            '@class': 'PARTICIPATION',
            function: {
              '@class': 'DV_TEXT',
              value: 'ORDERING_PROFESSIONAL'
            },
            performer: {
              '@class': 'PARTY_IDENTIFIED',
              name: 'Dr D. JAMES'
            },
            mode: {
              '@class': 'DV_CODED_TEXT',
              value: 'not specified',
              defining_code: {
                '@class': 'CODE_PHRASE',
                terminology_id: {
                  '@class': 'TERMINOLOGY_ID',
                  value: 'openehr'
                },
                code_string: '193'
              }
            }
          }
        ],
        protocol: {
          '@class': 'ITEM_TREE',
          name: {
            '@class': 'DV_TEXT',
            value: 'Tree'
          },
          archetype_node_id: 'at0004',
          items: [
            {
              '@class': 'CLUSTER',
              name: {
                '@class': 'DV_TEXT',
                value: 'Test request details'
              },
              archetype_node_id: 'at0094',
              items: [
                {
                  '@class': 'ELEMENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Requester order identifier'
                  },
                  archetype_node_id: 'at0062',
                  value: {
                    '@class': 'DV_IDENTIFIER',
                    issuer: 'PLACER',
                    assigner: 'PLACER',
                    id: 'A03621394',
                    type: 'Requester order identifier'
                  }
                },
                {
                  '@class': 'ELEMENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Receiver order identifier'
                  },
                  archetype_node_id: 'at0063',
                  value: {
                    '@class': 'DV_IDENTIFIER',
                    issuer: 'BSMLAB',
                    assigner: 'BSMLAB',
                    id: 'A03621394',
                    type: 'Receiver order identifier'
                  }
                }
              ]
            }
          ]
        },
        data: {
          '@class': 'HISTORY',
          name: {
            '@class': 'DV_TEXT',
            value: 'Event Series'
          },
          archetype_node_id: 'at0001',
          origin: {
            '@class': 'DV_DATE_TIME',
            value: '2020-07-17T11:52:19.092799+02:00'
          },
          events: [
            {
              '@class': 'POINT_EVENT',
              name: {
                '@class': 'DV_TEXT',
                value: 'Any event'
              },
              archetype_node_id: 'at0002',
              time: {
                '@class': 'DV_DATE_TIME',
                value: '2020-07-17T11:52:19.092799+02:00'
              },
              data: {
                '@class': 'ITEM_TREE',
                name: {
                  '@class': 'DV_TEXT',
                  value: 'Tree'
                },
                archetype_node_id: 'at0003',
                items: [
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Test name'
                    },
                    archetype_node_id: 'at0005',
                    value: {
                      '@class': 'DV_CODED_TEXT',
                      value: 'INR (ON WARFARIN)',
                      defining_code: {
                        '@class': 'CODE_PHRASE',
                        terminology_id: {
                          '@class': 'TERMINOLOGY_ID',
                          value: 'external_terminology'
                        },
                        code_string: 'BS_RINR'
                      }
                    }
                  },
                  {
                    '@class': 'CLUSTER',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Specimen'
                    },
                    archetype_details: {
                      '@class': 'ARCHETYPED',
                      archetype_id: {
                        '@class': 'ARCHETYPE_ID',
                        value: 'openEHR-EHR-CLUSTER.specimen.v1'
                      },
                      rm_version: '1.0.4'
                    },
                    archetype_node_id: 'openEHR-EHR-CLUSTER.specimen.v1',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Specimen type'
                        },
                        archetype_node_id: 'at0029',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'BLOOD',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'external_terminology'
                            },
                            code_string: 'B'
                          }
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Collection date/time'
                        },
                        archetype_node_id: 'at0015',
                        value: {
                          '@class': 'DV_DATE_TIME',
                          value: '2020-07-02T17:07:00.000+02:00'
                        }
                      }
                    ]
                  },
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Overall test status'
                    },
                    archetype_node_id: 'at0073',
                    value: {
                      '@class': 'DV_CODED_TEXT',
                      value: 'Final',
                      defining_code: {
                        '@class': 'CODE_PHRASE',
                        terminology_id: {
                          '@class': 'TERMINOLOGY_ID',
                          value: 'local'
                        },
                        code_string: 'at0038'
                      }
                    }
                  },
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Overall test status timestamp'
                    },
                    archetype_node_id: 'at0075',
                    value: {
                      '@class': 'DV_DATE_TIME',
                      value: '2020-07-02T17:13:00.000+02:00'
                    }
                  },
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Diagnostic service category'
                    },
                    archetype_node_id: 'at0077',
                    value: {
                      '@class': 'DV_TEXT',
                      value: 'HM'
                    }
                  },
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Clinical information provided'
                    },
                    archetype_node_id: 'at0100',
                    value: {
                      '@class': 'DV_TEXT',
                      value: 'testing for Julian'
                    }
                  },
                  {
                    '@class': 'CLUSTER',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Laboratory analyte result'
                    },
                    archetype_details: {
                      '@class': 'ARCHETYPED',
                      archetype_id: {
                        '@class': 'ARCHETYPE_ID',
                        value: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1'
                      },
                      rm_version: '1.0.4'
                    },
                    feeder_audit: {
                      '@class': 'FEEDER_AUDIT',
                      original_content: {
                        '@class': 'DV_PARSABLE',
                        value: '11.0|10.2-14.1|s|N|',
                        formalism: 'original'
                      },
                      originating_system_audit: {
                        '@class': 'FEEDER_AUDIT_DETAILS',
                        system_id: 'BSMLAB'
                      }
                    },
                    archetype_node_id: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Analyte result sequence'
                        },
                        archetype_node_id: 'at0027',
                        value: {
                          '@class': 'DV_COUNT',
                          magnitude: 1
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Analyte name'
                        },
                        archetype_node_id: 'at0024',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'PT',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'external_terminology'
                            },
                            code_string: 'BS_TPT'
                          }
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Analyte result'
                        },
                        archetype_node_id: 'at0001',
                        value: {
                          '@class': 'DV_QUANTITY',
                          normal_range: {
                            '@class': 'DV_INTERVAL',
                            lower: {
                              '@class': 'DV_QUANTITY',
                              magnitude: 10.2,
                              units: 's',
                              precision: 1
                            },
                            upper: {
                              '@class': 'DV_QUANTITY',
                              magnitude: 14.1,
                              units: 's',
                              precision: 1
                            },
                            lower_included: true,
                            upper_included: true,
                            lower_unbounded: false,
                            upper_unbounded: false
                          },
                          normal_status: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'openehr_normal_statuses'
                            },
                            code_string: 'N'
                          },
                          magnitude: 11,
                          units: 's',
                          precision: 1
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Result status'
                        },
                        archetype_node_id: 'at0005',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'Final',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'local'
                            },
                            code_string: 'at0018'
                          }
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Comment'
                        },
                        archetype_node_id: 'at0003',
                        value: {
                          '@class': 'DV_TEXT',
                          value: '*Note new reference range for this test 19.02.19*\\.br\\MNPT=10.5 for calculating Maddrey\'s coefficient'
                        }
                      }
                    ]
                  },
                  {
                    '@class': 'CLUSTER',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Laboratory analyte result #2'
                    },
                    archetype_details: {
                      '@class': 'ARCHETYPED',
                      archetype_id: {
                        '@class': 'ARCHETYPE_ID',
                        value: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1'
                      },
                      rm_version: '1.0.4'
                    },
                    feeder_audit: {
                      '@class': 'FEEDER_AUDIT',
                      original_content: {
                        '@class': 'DV_PARSABLE',
                        value: '2.5|0.9-1.2||H|',
                        formalism: 'original'
                      },
                      originating_system_audit: {
                        '@class': 'FEEDER_AUDIT_DETAILS',
                        system_id: 'BSMLAB'
                      }
                    },
                    archetype_node_id: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Analyte result sequence'
                        },
                        archetype_node_id: 'at0027',
                        value: {
                          '@class': 'DV_COUNT',
                          magnitude: 2
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Analyte name'
                        },
                        archetype_node_id: 'at0024',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'INR',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'external_terminology'
                            },
                            code_string: 'BS_TINR'
                          }
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Analyte result'
                        },
                        archetype_node_id: 'at0001',
                        value: {
                          '@class': 'DV_TEXT',
                          value: '2.5'
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Result status'
                        },
                        archetype_node_id: 'at0005',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'Final',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'local'
                            },
                            code_string: 'at0018'
                          }
                        }
                      }
                    ]
                  },
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Comment'
                    },
                    archetype_node_id: 'at0101',
                    value: {
                      '@class': 'DV_TEXT',
                      value: 'THERAPEUTIC GUIDE FOR WARFARIN\\.br\\AF, DVT/PE : INR 2.0 to 3.0\\.br\\Most valve prostheses : INR 3.0 to 4.0\\.br\\If on warfarin reference range and flag do NOT apply.If patient is not on warfarin this result is abnormal\\.br\\and requires further investigation.\n'
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    ],
    empty: true
  },
  {
    '@class': 'COMPOSITION',
    name: {
      '@class': 'DV_TEXT',
      value: null
    },
    uid: {
      '@class': 'OBJECT_VERSION_ID',
      value: null
    },
    archetype_details: {
      '@class': 'ARCHETYPED',
      archetype_id: {
        '@class': 'ARCHETYPE_ID',
        value: null
      },
      template_id: {
        '@class': 'TEMPLATE_ID',
        value: null
      },
      rm_version: null
    },
    archetype_node_id: null,
    language: {
      '@class': 'CODE_PHRASE',
      terminology_id: {
        '@class': 'TERMINOLOGY_ID',
        value: null
      },
      code_string: null
    },
    territory: {
      '@class': 'CODE_PHRASE',
      terminology_id: {
        '@class': 'TERMINOLOGY_ID',
        value: null
      },
      code_string: null
    },
    category: {
      '@class': 'DV_CODED_TEXT',
      value: null,
      defining_code: {
        '@class': 'CODE_PHRASE',
        terminology_id: {
          '@class': 'TERMINOLOGY_ID',
          value: null
        },
        code_string: null
      }
    },
    composer: {
      '@class': 'PARTY_SELF'
    },
    context: {
      '@class': 'EVENT_CONTEXT',
      start_time: {
        '@class': 'DV_DATE_TIME',
        value: null
      },
      end_time: {
        '@class': 'DV_DATE_TIME',
        value: null
      },
      setting: {
        '@class': 'DV_CODED_TEXT',
        value: null,
        defining_code: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: null
          },
          code_string: null
        }
      },
      other_context: {
        '@class': 'ITEM_TREE',
        name: {
          '@class': 'DV_TEXT',
          value: null
        },
        archetype_node_id: null,
        items: [
          {
            '@class': 'ELEMENT',
            name: {
              '@class': 'DV_TEXT',
              value: 'Laboratory order ID'
            },
            archetype_node_id: 'at0002',
            value: {
              '@class': 'DV_TEXT',
              value: 'b03220a2-77bc-4da9-88fe-18cde728a475'
            }
          },
          {
            '@class': 'CLUSTER',
            name: {
              '@class': 'DV_TEXT',
              value: 'Laboratory context details'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-CLUSTER.lab_context_details.v0'
              },
              rm_version: '1.0.4'
            },
            archetype_node_id: 'openEHR-EHR-CLUSTER.lab_context_details.v0',
            items: [
              {
                '@class': 'ELEMENT',
                name: {
                  '@class': 'DV_TEXT',
                  value: 'Order group number'
                },
                archetype_node_id: 'at0021',
                value: {
                  '@class': 'DV_TEXT',
                  value: 'A03621394'
                }
              },
              {
                '@class': 'ELEMENT',
                name: {
                  '@class': 'DV_TEXT',
                  value: 'Report ID'
                },
                archetype_node_id: 'at0007',
                value: {
                  '@class': 'DV_TEXT',
                  value: '96a63d95-7b2f-4320-84a1-b6f52b93fc2e'
                }
              },
              {
                '@class': 'ELEMENT',
                name: {
                  '@class': 'DV_TEXT',
                  value: 'Laboratory'
                },
                archetype_node_id: 'at0015',
                value: {
                  '@class': 'DV_CODED_TEXT',
                  value: 'Laboratory',
                  defining_code: {
                    '@class': 'CODE_PHRASE',
                    terminology_id: {
                      '@class': 'TERMINOLOGY_ID',
                      value: 'external_terminology'
                    },
                    code_string: 'Laboratory'
                  }
                }
              }
            ]
          }
        ]
      }
    },
    content: [
      {
        '@class': 'OBSERVATION',
        name: {
          '@class': 'DV_TEXT',
          value: 'Laboratory test result #5'
        },
        uid: {
          '@class': 'HIER_OBJECT_ID',
          value: '4acdf4b6-ef76-431a-a3d1-a03baabeef5a'
        },
        archetype_details: {
          '@class': 'ARCHETYPED',
          archetype_id: {
            '@class': 'ARCHETYPE_ID',
            value: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1'
          },
          rm_version: '1.0.4'
        },
        archetype_node_id: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1',
        language: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'ISO_639-1'
          },
          code_string: 'en'
        },
        encoding: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'IANA_character-sets'
          },
          code_string: 'UTF-8'
        },
        subject: {
          '@class': 'PARTY_SELF'
        },
        provider: {
          '@class': 'PARTY_SELF'
        },
        other_participations: [
          {
            '@class': 'PARTICIPATION',
            function: {
              '@class': 'DV_TEXT',
              value: 'ORDERING_PROFESSIONAL'
            },
            performer: {
              '@class': 'PARTY_IDENTIFIED',
              name: 'Dr D. JAMES'
            },
            mode: {
              '@class': 'DV_CODED_TEXT',
              value: 'not specified',
              defining_code: {
                '@class': 'CODE_PHRASE',
                terminology_id: {
                  '@class': 'TERMINOLOGY_ID',
                  value: 'openehr'
                },
                code_string: '193'
              }
            }
          }
        ],
        protocol: {
          '@class': 'ITEM_TREE',
          name: {
            '@class': 'DV_TEXT',
            value: 'Tree'
          },
          archetype_node_id: 'at0004',
          items: [
            {
              '@class': 'CLUSTER',
              name: {
                '@class': 'DV_TEXT',
                value: 'Test request details'
              },
              archetype_node_id: 'at0094',
              items: [
                {
                  '@class': 'ELEMENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Requester order identifier'
                  },
                  archetype_node_id: 'at0062',
                  value: {
                    '@class': 'DV_IDENTIFIER',
                    issuer: 'PLACER',
                    assigner: 'PLACER',
                    id: 'A03621394',
                    type: 'Requester order identifier'
                  }
                },
                {
                  '@class': 'ELEMENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Receiver order identifier'
                  },
                  archetype_node_id: 'at0063',
                  value: {
                    '@class': 'DV_IDENTIFIER',
                    issuer: 'BSMLAB',
                    assigner: 'BSMLAB',
                    id: 'A03621394',
                    type: 'Receiver order identifier'
                  }
                }
              ]
            }
          ]
        },
        data: {
          '@class': 'HISTORY',
          name: {
            '@class': 'DV_TEXT',
            value: 'Event Series'
          },
          archetype_node_id: 'at0001',
          origin: {
            '@class': 'DV_DATE_TIME',
            value: '2020-07-17T11:52:19.092799+02:00'
          },
          events: [
            {
              '@class': 'POINT_EVENT',
              name: {
                '@class': 'DV_TEXT',
                value: 'Any event'
              },
              archetype_node_id: 'at0002',
              time: {
                '@class': 'DV_DATE_TIME',
                value: '2020-07-17T11:52:19.092799+02:00'
              },
              data: {
                '@class': 'ITEM_TREE',
                name: {
                  '@class': 'DV_TEXT',
                  value: 'Tree'
                },
                archetype_node_id: 'at0003',
                items: [
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Test name'
                    },
                    archetype_node_id: 'at0005',
                    value: {
                      '@class': 'DV_CODED_TEXT',
                      value: 'APTT (ON HEPARIN)',
                      defining_code: {
                        '@class': 'CODE_PHRASE',
                        terminology_id: {
                          '@class': 'TERMINOLOGY_ID',
                          value: 'external_terminology'
                        },
                        code_string: 'BS_RAPTT'
                      }
                    }
                  },
                  {
                    '@class': 'CLUSTER',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Specimen'
                    },
                    archetype_details: {
                      '@class': 'ARCHETYPED',
                      archetype_id: {
                        '@class': 'ARCHETYPE_ID',
                        value: 'openEHR-EHR-CLUSTER.specimen.v1'
                      },
                      rm_version: '1.0.4'
                    },
                    archetype_node_id: 'openEHR-EHR-CLUSTER.specimen.v1',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Specimen type'
                        },
                        archetype_node_id: 'at0029',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'BLOOD',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'external_terminology'
                            },
                            code_string: 'B'
                          }
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Collection date/time'
                        },
                        archetype_node_id: 'at0015',
                        value: {
                          '@class': 'DV_DATE_TIME',
                          value: '2020-07-02T17:07:00.000+02:00'
                        }
                      }
                    ]
                  },
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Overall test status'
                    },
                    archetype_node_id: 'at0073',
                    value: {
                      '@class': 'DV_CODED_TEXT',
                      value: 'Final',
                      defining_code: {
                        '@class': 'CODE_PHRASE',
                        terminology_id: {
                          '@class': 'TERMINOLOGY_ID',
                          value: 'local'
                        },
                        code_string: 'at0038'
                      }
                    }
                  },
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Overall test status timestamp'
                    },
                    archetype_node_id: 'at0075',
                    value: {
                      '@class': 'DV_DATE_TIME',
                      value: '2020-07-02T17:13:00.000+02:00'
                    }
                  },
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Diagnostic service category'
                    },
                    archetype_node_id: 'at0077',
                    value: {
                      '@class': 'DV_TEXT',
                      value: 'HM'
                    }
                  },
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Clinical information provided'
                    },
                    archetype_node_id: 'at0100',
                    value: {
                      '@class': 'DV_TEXT',
                      value: 'testing for Julian'
                    }
                  },
                  {
                    '@class': 'CLUSTER',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Laboratory analyte result'
                    },
                    archetype_details: {
                      '@class': 'ARCHETYPED',
                      archetype_id: {
                        '@class': 'ARCHETYPE_ID',
                        value: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1'
                      },
                      rm_version: '1.0.4'
                    },
                    feeder_audit: {
                      '@class': 'FEEDER_AUDIT',
                      original_content: {
                        '@class': 'DV_PARSABLE',
                        value: '1||s||',
                        formalism: 'original'
                      },
                      originating_system_audit: {
                        '@class': 'FEEDER_AUDIT_DETAILS',
                        system_id: 'BSMLAB'
                      }
                    },
                    archetype_node_id: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Analyte result sequence'
                        },
                        archetype_node_id: 'at0027',
                        value: {
                          '@class': 'DV_COUNT',
                          magnitude: 1
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Analyte name'
                        },
                        archetype_node_id: 'at0024',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'APTT',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'external_terminology'
                            },
                            code_string: 'BS_TAPTT'
                          }
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Analyte result'
                        },
                        archetype_node_id: 'at0001',
                        value: {
                          '@class': 'DV_QUANTITY',
                          magnitude: 1,
                          units: 's',
                          precision: 0
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Result status'
                        },
                        archetype_node_id: 'at0005',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'Final',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'local'
                            },
                            code_string: 'at0018'
                          }
                        }
                      }
                    ]
                  },
                  {
                    '@class': 'CLUSTER',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Laboratory analyte result #2'
                    },
                    archetype_details: {
                      '@class': 'ARCHETYPED',
                      archetype_id: {
                        '@class': 'ARCHETYPE_ID',
                        value: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1'
                      },
                      rm_version: '1.0.4'
                    },
                    feeder_audit: {
                      '@class': 'FEEDER_AUDIT',
                      original_content: {
                        '@class': 'DV_PARSABLE',
                        value: '0.9|0.8-1.2||N|',
                        formalism: 'original'
                      },
                      originating_system_audit: {
                        '@class': 'FEEDER_AUDIT_DETAILS',
                        system_id: 'BSMLAB'
                      }
                    },
                    archetype_node_id: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Analyte result sequence'
                        },
                        archetype_node_id: 'at0027',
                        value: {
                          '@class': 'DV_COUNT',
                          magnitude: 2
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Analyte name'
                        },
                        archetype_node_id: 'at0024',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'APTT RATIO',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'external_terminology'
                            },
                            code_string: 'BS_TARAT'
                          }
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Analyte result'
                        },
                        archetype_node_id: 'at0001',
                        value: {
                          '@class': 'DV_TEXT',
                          value: '0.9'
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Result status'
                        },
                        archetype_node_id: 'at0005',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'Final',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'local'
                            },
                            code_string: 'at0018'
                          }
                        }
                      }
                    ]
                  },
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Comment'
                    },
                    archetype_node_id: 'at0101',
                    value: {
                      '@class': 'DV_TEXT',
                      value: 'THERAPEUTIC GUIDE FOR HEPARIN : APTTR 1.5 - 2.5'
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    ],
    empty: true
  },
  {
    '@class': 'COMPOSITION',
    name: {
      '@class': 'DV_TEXT',
      value: null
    },
    uid: {
      '@class': 'OBJECT_VERSION_ID',
      value: null
    },
    archetype_details: {
      '@class': 'ARCHETYPED',
      archetype_id: {
        '@class': 'ARCHETYPE_ID',
        value: null
      },
      template_id: {
        '@class': 'TEMPLATE_ID',
        value: null
      },
      rm_version: null
    },
    archetype_node_id: null,
    language: {
      '@class': 'CODE_PHRASE',
      terminology_id: {
        '@class': 'TERMINOLOGY_ID',
        value: null
      },
      code_string: null
    },
    territory: {
      '@class': 'CODE_PHRASE',
      terminology_id: {
        '@class': 'TERMINOLOGY_ID',
        value: null
      },
      code_string: null
    },
    category: {
      '@class': 'DV_CODED_TEXT',
      value: null,
      defining_code: {
        '@class': 'CODE_PHRASE',
        terminology_id: {
          '@class': 'TERMINOLOGY_ID',
          value: null
        },
        code_string: null
      }
    },
    composer: {
      '@class': 'PARTY_SELF'
    },
    context: {
      '@class': 'EVENT_CONTEXT',
      start_time: {
        '@class': 'DV_DATE_TIME',
        value: null
      },
      end_time: {
        '@class': 'DV_DATE_TIME',
        value: null
      },
      setting: {
        '@class': 'DV_CODED_TEXT',
        value: null,
        defining_code: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: null
          },
          code_string: null
        }
      },
      other_context: {
        '@class': 'ITEM_TREE',
        name: {
          '@class': 'DV_TEXT',
          value: null
        },
        archetype_node_id: null,
        items: [
          {
            '@class': 'ELEMENT',
            name: {
              '@class': 'DV_TEXT',
              value: 'Laboratory order ID'
            },
            archetype_node_id: 'at0002',
            value: {
              '@class': 'DV_TEXT',
              value: 'b03220a2-77bc-4da9-88fe-18cde728a475'
            }
          },
          {
            '@class': 'CLUSTER',
            name: {
              '@class': 'DV_TEXT',
              value: 'Laboratory context details'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-CLUSTER.lab_context_details.v0'
              },
              rm_version: '1.0.4'
            },
            archetype_node_id: 'openEHR-EHR-CLUSTER.lab_context_details.v0',
            items: [
              {
                '@class': 'ELEMENT',
                name: {
                  '@class': 'DV_TEXT',
                  value: 'Order group number'
                },
                archetype_node_id: 'at0021',
                value: {
                  '@class': 'DV_TEXT',
                  value: 'A03621394'
                }
              },
              {
                '@class': 'ELEMENT',
                name: {
                  '@class': 'DV_TEXT',
                  value: 'Report ID'
                },
                archetype_node_id: 'at0007',
                value: {
                  '@class': 'DV_TEXT',
                  value: '96a63d95-7b2f-4320-84a1-b6f52b93fc2e'
                }
              },
              {
                '@class': 'ELEMENT',
                name: {
                  '@class': 'DV_TEXT',
                  value: 'Laboratory'
                },
                archetype_node_id: 'at0015',
                value: {
                  '@class': 'DV_CODED_TEXT',
                  value: 'Laboratory',
                  defining_code: {
                    '@class': 'CODE_PHRASE',
                    terminology_id: {
                      '@class': 'TERMINOLOGY_ID',
                      value: 'external_terminology'
                    },
                    code_string: 'Laboratory'
                  }
                }
              }
            ]
          }
        ]
      }
    },
    content: [
      {
        '@class': 'OBSERVATION',
        name: {
          '@class': 'DV_TEXT',
          value: 'Laboratory test result #6'
        },
        uid: {
          '@class': 'HIER_OBJECT_ID',
          value: '4acdf4b6-ef76-431a-a3d1-a03baabeef5a'
        },
        archetype_details: {
          '@class': 'ARCHETYPED',
          archetype_id: {
            '@class': 'ARCHETYPE_ID',
            value: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1'
          },
          rm_version: '1.0.4'
        },
        archetype_node_id: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1',
        language: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'ISO_639-1'
          },
          code_string: 'en'
        },
        encoding: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'IANA_character-sets'
          },
          code_string: 'UTF-8'
        },
        subject: {
          '@class': 'PARTY_SELF'
        },
        provider: {
          '@class': 'PARTY_SELF'
        },
        other_participations: [
          {
            '@class': 'PARTICIPATION',
            function: {
              '@class': 'DV_TEXT',
              value: 'ORDERING_PROFESSIONAL'
            },
            performer: {
              '@class': 'PARTY_IDENTIFIED',
              name: 'Dr D. JAMES'
            },
            mode: {
              '@class': 'DV_CODED_TEXT',
              value: 'not specified',
              defining_code: {
                '@class': 'CODE_PHRASE',
                terminology_id: {
                  '@class': 'TERMINOLOGY_ID',
                  value: 'openehr'
                },
                code_string: '193'
              }
            }
          }
        ],
        protocol: {
          '@class': 'ITEM_TREE',
          name: {
            '@class': 'DV_TEXT',
            value: 'Tree'
          },
          archetype_node_id: 'at0004',
          items: [
            {
              '@class': 'CLUSTER',
              name: {
                '@class': 'DV_TEXT',
                value: 'Test request details'
              },
              archetype_node_id: 'at0094',
              items: [
                {
                  '@class': 'ELEMENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Requester order identifier'
                  },
                  archetype_node_id: 'at0062',
                  value: {
                    '@class': 'DV_IDENTIFIER',
                    issuer: 'PLACER',
                    assigner: 'PLACER',
                    id: 'A03621394',
                    type: 'Requester order identifier'
                  }
                },
                {
                  '@class': 'ELEMENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Receiver order identifier'
                  },
                  archetype_node_id: 'at0063',
                  value: {
                    '@class': 'DV_IDENTIFIER',
                    issuer: 'BSMLAB',
                    assigner: 'BSMLAB',
                    id: 'A03621394',
                    type: 'Receiver order identifier'
                  }
                }
              ]
            }
          ]
        },
        data: {
          '@class': 'HISTORY',
          name: {
            '@class': 'DV_TEXT',
            value: 'Event Series'
          },
          archetype_node_id: 'at0001',
          origin: {
            '@class': 'DV_DATE_TIME',
            value: '2020-07-17T11:52:19.092799+02:00'
          },
          events: [
            {
              '@class': 'POINT_EVENT',
              name: {
                '@class': 'DV_TEXT',
                value: 'Any event'
              },
              archetype_node_id: 'at0002',
              time: {
                '@class': 'DV_DATE_TIME',
                value: '2020-07-17T11:52:19.092799+02:00'
              },
              data: {
                '@class': 'ITEM_TREE',
                name: {
                  '@class': 'DV_TEXT',
                  value: 'Tree'
                },
                archetype_node_id: 'at0003',
                items: [
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Test name'
                    },
                    archetype_node_id: 'at0005',
                    value: {
                      '@class': 'DV_CODED_TEXT',
                      value: 'ESTIMATED GFR',
                      defining_code: {
                        '@class': 'CODE_PHRASE',
                        terminology_id: {
                          '@class': 'TERMINOLOGY_ID',
                          value: 'external_terminology'
                        },
                        code_string: 'BS_RGFR'
                      }
                    }
                  },
                  {
                    '@class': 'CLUSTER',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Specimen'
                    },
                    archetype_details: {
                      '@class': 'ARCHETYPED',
                      archetype_id: {
                        '@class': 'ARCHETYPE_ID',
                        value: 'openEHR-EHR-CLUSTER.specimen.v1'
                      },
                      rm_version: '1.0.4'
                    },
                    archetype_node_id: 'openEHR-EHR-CLUSTER.specimen.v1',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Specimen type'
                        },
                        archetype_node_id: 'at0029',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'BLOOD',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'external_terminology'
                            },
                            code_string: 'B'
                          }
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Collection date/time'
                        },
                        archetype_node_id: 'at0015',
                        value: {
                          '@class': 'DV_DATE_TIME',
                          value: '2020-07-02T17:07:00.000+02:00'
                        }
                      }
                    ]
                  },
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Overall test status'
                    },
                    archetype_node_id: 'at0073',
                    value: {
                      '@class': 'DV_CODED_TEXT',
                      value: 'Final',
                      defining_code: {
                        '@class': 'CODE_PHRASE',
                        terminology_id: {
                          '@class': 'TERMINOLOGY_ID',
                          value: 'local'
                        },
                        code_string: 'at0038'
                      }
                    }
                  },
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Overall test status timestamp'
                    },
                    archetype_node_id: 'at0075',
                    value: {
                      '@class': 'DV_DATE_TIME',
                      value: '2020-07-02T17:13:00.000+02:00'
                    }
                  },
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Diagnostic service category'
                    },
                    archetype_node_id: 'at0077',
                    value: {
                      '@class': 'DV_TEXT',
                      value: 'HM'
                    }
                  },
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Clinical information provided'
                    },
                    archetype_node_id: 'at0100',
                    value: {
                      '@class': 'DV_TEXT',
                      value: 'testing for Julian'
                    }
                  },
                  {
                    '@class': 'CLUSTER',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Laboratory analyte result'
                    },
                    archetype_details: {
                      '@class': 'ARCHETYPED',
                      archetype_id: {
                        '@class': 'ARCHETYPE_ID',
                        value: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1'
                      },
                      rm_version: '1.0.4'
                    },
                    feeder_audit: {
                      '@class': 'FEEDER_AUDIT',
                      original_content: {
                        '@class': 'DV_PARSABLE',
                        value: '>90||ml/min||',
                        formalism: 'original'
                      },
                      originating_system_audit: {
                        '@class': 'FEEDER_AUDIT_DETAILS',
                        system_id: 'BSMLAB'
                      }
                    },
                    archetype_node_id: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Analyte result sequence'
                        },
                        archetype_node_id: 'at0027',
                        value: {
                          '@class': 'DV_COUNT',
                          magnitude: 1
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Analyte name'
                        },
                        archetype_node_id: 'at0024',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'ESTIMATED GFR',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'external_terminology'
                            },
                            code_string: 'BS_TGFR'
                          }
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Analyte result'
                        },
                        archetype_node_id: 'at0001',
                        value: {
                          '@class': 'DV_INTERVAL',
                          lower: {
                            '@class': 'DV_QUANTITY',
                            magnitude: 90,
                            units: 'ml/min',
                            precision: 0
                          },
                          lower_included: false,
                          upper_included: false,
                          lower_unbounded: false,
                          upper_unbounded: true
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Result status'
                        },
                        archetype_node_id: 'at0005',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'Final',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'local'
                            },
                            code_string: 'at0018'
                          }
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Comment'
                        },
                        archetype_node_id: 'at0003',
                        value: {
                          '@class': 'DV_TEXT',
                          value: '\\.br\\GFR units = ml/min/1.73m^2\\.br\\\\.br\\Please note limitations.\\.br\\\\.br\\https://renal.org/information-resources\\.br\\\\.br\\/the-uk-eckd-guide/about-egfr/\\.br\\'
                        }
                      }
                    ]
                  },
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Comment'
                    },
                    archetype_node_id: 'at0101',
                    value: {
                      '@class': 'DV_TEXT',
                      value: 'eGFR results MUST NOT be used in hospitalised patients'
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    ],
    empty: true
  }
];


export const resultSetWithoutDuplicatesMock = {
  aql: 'SELECT p/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/magnitude as temperatura,\np/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/units as enota,\np/data[at0002]/events[at0003]/time as time\nFROM EHR e\nCONTAINS COMPOSITION c\nCONTAINS OBSERVATION p[openEHR-EHR-OBSERVATION.body_temperature.v1] \nOFFSET 0 LIMIT 10',
  executedAql: 'SELECT p/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/magnitude as temperatura,\np/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/units as enota,\np/data[at0002]/events[at0003]/time as time\nFROM EHR e\nCONTAINS COMPOSITION c\nCONTAINS OBSERVATION p[openEHR-EHR-OBSERVATION.body_temperature.v1] \nOFFSET 0 LIMIT 10',
  resultSet: [
    {
      temperatura: 1,
      enota: '°C',
      time: {
        '@class': 'DV_DATE_TIME',
        value: '2020-07-14T10:12:48.692251+02:00'
      }
    },
    {
      temperatura: 36.1,
      enota: '°C',
      time: {
        '@class': 'DV_DATE_TIME',
        value: '2015-03-23T20:25:44.000+01:00'
      }
    },
    {
      temperatura: 39,
      enota: '°C',
      time: {
        '@class': 'DV_DATE_TIME',
        value: '2015-03-19T22:35:56.000+01:00'
      }
    },
    {
      temperatura: 39.4,
      enota: '°C',
      time: {
        '@class': 'DV_DATE_TIME',
        value: '2015-03-12T15:19:34.000+01:00'
      }
    },
    {
      temperatura: 37.6,
      enota: '°C',
      time: {
        '@class': 'DV_DATE_TIME',
        value: '2015-03-24T04:20:39.000+01:00'
      }
    },
    {
      temperatura: 36.9,
      enota: '°C',
      time: {
        '@class': 'DV_DATE_TIME',
        value: '2015-03-15T17:29:59.000+01:00'
      }
    },
    {
      temperatura: 37.4,
      enota: '°C',
      time: {
        '@class': 'DV_DATE_TIME',
        value: '2015-04-18T23:04:49.000+02:00'
      }
    },
    {
      temperatura: 38.3,
      enota: '°C',
      time: {
        '@class': 'DV_DATE_TIME',
        value: '2015-03-13T17:19:39.000+01:00'
      }
    },
    {
      temperatura: 39.1,
      enota: '°C',
      time: {
        '@class': 'DV_DATE_TIME',
        value: '2015-03-18T21:50:28.000+01:00'
      }
    },
    {
      temperatura: 39,
      enota: '°C',
      time: {
        '@class': 'DV_DATE_TIME',
        value: '2015-04-14T01:18:38.000+02:00'
      }
    }
  ]
};
export const mockResultTablesWithoutDuplicates = {
  temperatura: [
    1,
    36.1,
    39,
    39.4,
    37.6,
    36.9,
    37.4,
    38.3,
    39.1,
    39
  ],
  enota: [
    '°C',
    '°C',
    '°C',
    '°C',
    '°C',
    '°C',
    '°C',
    '°C',
    '°C',
    '°C'
  ],
  'DV_DATE_TIME:::time': [
    {
      '@class': 'DV_DATE_TIME',
      value: '2020-07-14T10:12:48.692251+02:00'
    },
    {
      '@class': 'DV_DATE_TIME',
      value: '2015-03-23T20:25:44.000+01:00'
    },
    {
      '@class': 'DV_DATE_TIME',
      value: '2015-03-19T22:35:56.000+01:00'
    },
    {
      '@class': 'DV_DATE_TIME',
      value: '2015-03-12T15:19:34.000+01:00'
    },
    {
      '@class': 'DV_DATE_TIME',
      value: '2015-03-24T04:20:39.000+01:00'
    },
    {
      '@class': 'DV_DATE_TIME',
      value: '2015-03-15T17:29:59.000+01:00'
    },
    {
      '@class': 'DV_DATE_TIME',
      value: '2015-04-18T23:04:49.000+02:00'
    },
    {
      '@class': 'DV_DATE_TIME',
      value: '2015-03-13T17:19:39.000+01:00'
    },
    {
      '@class': 'DV_DATE_TIME',
      value: '2015-03-18T21:50:28.000+01:00'
    },
    {
      '@class': 'DV_DATE_TIME',
      value: '2015-04-14T01:18:38.000+02:00'
    }
  ]
};

export const resultSetMultipleTablesMock = {
  aql: 'SELECT c\nfrom composition c\nlimit 10',
  executedAql: 'SELECT c\nfrom composition c\nlimit 10',
  resultSet: [
    {
      '#0': {
        '@class': 'COMPOSITION',
        name: {
          '@class': 'DV_TEXT',
          value: 'Allergies'
        },
        uid: {
          '@class': 'OBJECT_VERSION_ID',
          value: 'a50568d6-cf66-4889-bbf0-f0b29c8efcfb::metod::1'
        },
        archetype_details: {
          '@class': 'ARCHETYPED',
          archetype_id: {
            '@class': 'ARCHETYPE_ID',
            value: 'openEHR-EHR-COMPOSITION.summary.v1'
          },
          template_id: {
            '@class': 'TEMPLATE_ID',
            value: 'Allergies'
          },
          rm_version: '1.0.4'
        },
        feeder_audit: {
          '@class': 'FEEDER_AUDIT',
          original_content: {
            '@class': 'DV_PARSABLE',
            value: '{"/generic-canvas-1254364":[{"|uri":"http://thinkehr2.marand.si:9080/store/rest/45f5dc07-3cd1-49f6-a4ad-1dd997341796","|mediatype":"image/png","|alternatetext":"blob"}],"/generic-button-5300183":[],"/generic-button-9984023":[],"/generic-button-2278401":[],"/generic-label-9674691":[],"/generic-spacer-1815800":[],"/generic-spacer-250360":[],"/generic-input_text-6510713":[],"/generic-input_text-5820420":[],"/generic-input_text-6622482":[],"/generic-fieldset-584431/generic-button-2756289":[],"/generic-fieldset-584431/generic-button-2669319":[],"/generic-fieldset-584431/generic-button-134499":[],"/generic-label-4324142":[],"/generic-spacer-3786102":[],"/generic-input_text-3496826":[],"/generic-input_text-9564171":[],"/generic-spacer-7835634":[],"/generic-button-9437698":[],"/generic-label-7374567":[],"/generic-spacer-1411387":[],"/generic-input_text-162709":[],"/generic-input_text-8897652":[],"/generic-spacer-9067666":[],"/generic-input_text-6377224":[],"/generic-input_text-2518807":[],"/generic-spacer-5181305":[],"/generic-input_text-5485377":[],"/generic-input_text-9554415":[],"/generic-spacer-4739706":[],"/generic-fieldset-7905275/generic-button-3619796":[],"/generic-fieldset-7905275/generic-button-593945":[],"/generic-fieldset-7905275/generic-button-8208914":[],"/generic-coded_text-6692328":[],"/generic-button-1020544":[],"/generic-fieldset-220832/generic-label-4050811":[],"/generic-fieldset-220832/generic-spacer-5944304":[],"/generic-fieldset-220832/generic-input_text-8695512":[],"/generic-fieldset-220832/generic-input_text-2713209":[],"/generic-fieldset-220832/generic-date_time-3225308":[],"/generic-fieldset-220832/generic-input_text-952299":[],"/generic-fieldset-220832/generic-numeric_field-3274192":[],"/generic-fieldset-220832/generic-input_text-4968791":[],"/generic-fieldset-220832/generic-input_text-7071674":[],"/generic-fieldset-220832/generic-input_text-3980994":[],"/generic-fieldset-220832/generic-spacer-1750048":[],"/generic-fieldset-220832/generic-label-6708729":[],"/generic-fieldset-220832/generic-button-526380":[],"/generic-button-8543118":[],"/generic-fieldset-4033411/generic-label-9414743":[],"/generic-spacer-8334743":[],"/generic-spacer-189618":[],"/generic-button-7460990":[],"/generic-fieldset-9885036/generic-coded_text-2497155":[],"/generic-fieldset-9885036/generic-input_text-7113784":[],"/generic-fieldset-9885036/generic-button-7276418":[],"/generic-fieldset-9885036/generic-input_text-3071502":[],"/generic-fieldset-9885036/generic-input_text-4109816":[],"/generic-fieldset-9885036/generic-input_text-4920128":[],"/generic-fieldset-9885036/generic-input_text-8473215":[],"/generic-fieldset-9885036/generic-numeric_field-3174593":[]}',
            formalism: 'application/json'
          },
          originating_system_audit: {
            '@class': 'FEEDER_AUDIT_DETAILS',
            system_id: 'FormRenderer'
          }
        },
        archetype_node_id: 'openEHR-EHR-COMPOSITION.summary.v1',
        language: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'ISO_639-1'
          },
          code_string: 'en'
        },
        territory: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'ISO_3166-1'
          },
          code_string: 'EN'
        },
        category: {
          '@class': 'DV_CODED_TEXT',
          value: 'persistent',
          defining_code: {
            '@class': 'CODE_PHRASE',
            terminology_id: {
              '@class': 'TERMINOLOGY_ID',
              value: 'openehr'
            },
            code_string: '431'
          }
        },
        composer: {
          '@class': 'PARTY_IDENTIFIED',
          name: 'metod'
        },
        content: [
          {
            '@class': 'EVALUATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Adverse Reaction - Allergy'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1'
              },
              rm_version: '1.0.4'
            },
            archetype_node_id: 'openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            data: {
              '@class': 'ITEM_TREE',
              name: {
                '@class': 'DV_TEXT',
                value: 'Tree'
              },
              archetype_node_id: 'at0001',
              items: [
                {
                  '@class': 'ELEMENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Substance/Agent'
                  },
                  archetype_node_id: 'at0002',
                  value: {
                    '@class': 'DV_TEXT',
                    value: 'test'
                  }
                },
                {
                  '@class': 'ELEMENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Comment'
                  },
                  archetype_node_id: 'at0006',
                  value: {
                    '@class': 'DV_TEXT',
                    value: 'test'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      '#0': {
        '@class': 'COMPOSITION',
        name: {
          '@class': 'DV_TEXT',
          value: 'Vital Signs'
        },
        uid: {
          '@class': 'OBJECT_VERSION_ID',
          value: 'f79d4239-b4c1-49d7-a3c2-3c307c7c5dd9::metod::1'
        },
        archetype_details: {
          '@class': 'ARCHETYPED',
          archetype_id: {
            '@class': 'ARCHETYPE_ID',
            value: 'openEHR-EHR-COMPOSITION.encounter.v1'
          },
          template_id: {
            '@class': 'TEMPLATE_ID',
            value: 'Vital Signs'
          },
          rm_version: '1.0.4'
        },
        feeder_audit: {
          '@class': 'FEEDER_AUDIT',
          original_content: {
            '@class': 'DV_PARSABLE',
            value: '{"/generic-boolean-5399376":[true]}',
            formalism: 'application/json'
          },
          originating_system_audit: {
            '@class': 'FEEDER_AUDIT_DETAILS',
            system_id: 'FormRenderer'
          }
        },
        archetype_node_id: 'openEHR-EHR-COMPOSITION.encounter.v1',
        language: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'ISO_639-1'
          },
          code_string: 'sl'
        },
        territory: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'ISO_3166-1'
          },
          code_string: 'SL'
        },
        category: {
          '@class': 'DV_CODED_TEXT',
          value: 'event',
          defining_code: {
            '@class': 'CODE_PHRASE',
            terminology_id: {
              '@class': 'TERMINOLOGY_ID',
              value: 'openehr'
            },
            code_string: '433'
          }
        },
        composer: {
          '@class': 'PARTY_IDENTIFIED',
          name: 'metod'
        },
        context: {
          '@class': 'EVENT_CONTEXT',
          start_time: {
            '@class': 'DV_DATE_TIME',
            value: '2020-07-14T10:12:48.692251+02:00'
          },
          setting: {
            '@class': 'DV_CODED_TEXT',
            value: 'other care',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'openehr'
              },
              code_string: '238'
            }
          }
        },
        content: [
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Body temperature'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.body_temperature.v1'
              },
              rm_version: '1.0.4'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.body_temperature.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'sl'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'History'
              },
              archetype_node_id: 'at0002',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2020-07-14T10:12:48.692251+02:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0003',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2020-07-14T10:12:48.692251+02:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Tree'
                    },
                    archetype_node_id: 'at0001',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Temperature'
                        },
                        archetype_node_id: 'at0004',
                        value: {
                          '@class': 'DV_QUANTITY',
                          magnitude: 1,
                          units: '°C',
                          precision: 1
                        }
                      }
                    ]
                  },
                  state: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'State'
                    },
                    archetype_node_id: 'at0029',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Body exposure'
                        },
                        archetype_node_id: 'at0030',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'Appropriate clothing/bedding',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'local'
                            },
                            code_string: 'at0033'
                          }
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      '#0': {
        '@class': 'COMPOSITION',
        name: {
          '@class': 'DV_TEXT',
          value: 'MEDTRONIC VBHC CRC Clinical Outcomes Follow-up'
        },
        uid: {
          '@class': 'OBJECT_VERSION_ID',
          value: '07bcc53e-b3c7-421f-8a4f-c55c4b1c5c9c::metod::1'
        },
        archetype_details: {
          '@class': 'ARCHETYPED',
          archetype_id: {
            '@class': 'ARCHETYPE_ID',
            value: 'openEHR-EHR-COMPOSITION.encounter.v1'
          },
          template_id: {
            '@class': 'TEMPLATE_ID',
            value: 'MEDTRONIC VBHC CRC Clinical Outcomes Follow-up'
          },
          rm_version: '1.0.4'
        },
        feeder_audit: {
          '@class': 'FEEDER_AUDIT',
          original_content: {
            '@class': 'DV_PARSABLE',
            value: '{"/generic-label-9508959":[],"/generic-spacer-465008":[],"/generic-label-6147265":[],"/generic-fieldset-8009165/generic-button-9239936":[],"/generic-spacer-4628677":[],"/generic-label-3569178":[],"/treatment_variables/generic-fieldset-5366045/generic-label-7401456":[],"/treatment_variables/generic-fieldset-5366045/NT":[],"/treatment_variables/generic-fieldset-5366045/SUR":[],"/treatment_variables/generic-fieldset-5366045/RD":[],"/treatment_variables/generic-fieldset-5366045/CH":[],"/treatment_variables/generic-fieldset-5366045/TX":[],"/treatment_variables/generic-fieldset-5366045/BSC":[],"/treatment_variables/generic-fieldset-5366045/UNK":[],"/treatment_variables/surgery/generic-label-9790344":[],"/treatment_variables/radiotherapy/generic-label-5645389":[],"/treatment_variables/chemotherapy/generic-label-7394185":[],"/treatment_variables/targeted_therapy/generic-label-262850":[],"/treatment_variables/generic-spacer-3836982":[],"/treatment_variables/stoma/generic-label-3015676":[],"/treatment_variables/stoma/generic-fieldset-6624652/generic-label-3727581":[],"/generic-spacer-3216215":[],"/generic-label-7373269":[],"/generic-label-1716641":[],"/generic-spacer-3945017":[],"/generic-label-627078":[],"/generic-spacer-4653790":[],"/generic-label-9518409":[],"/survival_and_disease_control/generic-spacer-1638504":[],"/survival_and_disease_control/generic-spacer-3477573":[],"/survival_and_disease_control/generic-spacer-6241125":[],"/generic-fieldset-279802/generic-spacer-3494504":[],"/generic-fieldset-279802/generic-label-1336821":[],"/quality_of_death/generic-spacer-3494504":[],"/quality_of_death/generic-label-1336821":[]}',
            formalism: 'application/json'
          },
          originating_system_audit: {
            '@class': 'FEEDER_AUDIT_DETAILS',
            system_id: 'FormRenderer'
          }
        },
        archetype_node_id: 'openEHR-EHR-COMPOSITION.encounter.v1',
        language: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'ISO_639-1'
          },
          code_string: 'fr'
        },
        territory: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'ISO_3166-1'
          },
          code_string: 'SI'
        },
        category: {
          '@class': 'DV_CODED_TEXT',
          value: 'event',
          defining_code: {
            '@class': 'CODE_PHRASE',
            terminology_id: {
              '@class': 'TERMINOLOGY_ID',
              value: 'openehr'
            },
            code_string: '433'
          }
        },
        composer: {
          '@class': 'PARTY_IDENTIFIED',
          name: 'vanessap'
        },
        context: {
          '@class': 'EVENT_CONTEXT',
          start_time: {
            '@class': 'DV_DATE_TIME',
            value: '2020-07-14T19:29:00+02:00'
          },
          setting: {
            '@class': 'DV_CODED_TEXT',
            value: 'other care',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'openehr'
              },
              code_string: '238'
            }
          },
          other_context: {
            '@class': 'ITEM_TREE',
            name: {
              '@class': 'DV_TEXT',
              value: 'Tree'
            },
            archetype_node_id: 'at0001',
            items: [
              {
                '@class': 'CLUSTER',
                name: {
                  '@class': 'DV_TEXT',
                  value: 'Research information'
                },
                archetype_details: {
                  '@class': 'ARCHETYPED',
                  archetype_id: {
                    '@class': 'ARCHETYPE_ID',
                    value: 'openEHR-EHR-CLUSTER.research_information.v0'
                  },
                  rm_version: '1.0.4'
                },
                archetype_node_id: 'openEHR-EHR-CLUSTER.research_information.v0',
                items: [
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Cohort study name'
                    },
                    archetype_node_id: 'at0001',
                    value: {
                      '@class': 'DV_CODED_TEXT',
                      value: 'Dépistage du cancer colorectal',
                      defining_code: {
                        '@class': 'CODE_PHRASE',
                        terminology_id: {
                          '@class': 'TERMINOLOGY_ID',
                          value: 'cohortStudyName'
                        },
                        code_string: 'CRC'
                      }
                    }
                  },
                  {
                    '@class': 'ELEMENT',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Assessment timeline'
                    },
                    archetype_node_id: 'at0002',
                    value: {
                      '@class': 'DV_CODED_TEXT',
                      value: '1 an',
                      defining_code: {
                        '@class': 'CODE_PHRASE',
                        terminology_id: {
                          '@class': 'TERMINOLOGY_ID',
                          value: 'followTimelineAssessmentICHOMCRC'
                        },
                        code_string: 'A1'
                      }
                    }
                  }
                ]
              }
            ]
          }
        },
        content: [
          {
            '@class': 'ACTION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Care Plan'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-ACTION.care_plan.v0'
              },
              rm_version: '1.0.4'
            },
            archetype_node_id: 'openEHR-EHR-ACTION.care_plan.v0',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'fr'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            protocol: {
              '@class': 'ITEM_TREE',
              name: {
                '@class': 'DV_TEXT',
                value: 'Tree'
              },
              archetype_node_id: 'at0015',
              items: [
                {
                  '@class': 'ELEMENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Care Plan ID'
                  },
                  archetype_node_id: 'at0016',
                  value: {
                    '@class': 'DV_IDENTIFIER',
                    id: '96'
                  }
                }
              ]
            },
            time: {
              '@class': 'DV_DATE_TIME',
              value: '2020-07-14T17:29:39.674Z'
            },
            description: {
              '@class': 'ITEM_TREE',
              name: {
                '@class': 'DV_TEXT',
                value: 'Tree'
              },
              archetype_node_id: 'at0019',
              items: [
                {
                  '@class': 'ELEMENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Care Plan Name'
                  },
                  archetype_node_id: 'at0002',
                  value: {
                    '@class': 'DV_TEXT',
                    value: 'Generic'
                  }
                }
              ]
            },
            ism_transition: {
              '@class': 'ISM_TRANSITION',
              current_state: {
                '@class': 'DV_CODED_TEXT',
                value: 'completed',
                defining_code: {
                  '@class': 'CODE_PHRASE',
                  terminology_id: {
                    '@class': 'TERMINOLOGY_ID',
                    value: 'openehr'
                  },
                  code_string: '532'
                }
              }
            }
          },
          {
            '@class': 'SECTION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Metastasis or progression of treatment'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-SECTION.adhoc.v1'
              },
              rm_version: '1.0.4'
            },
            archetype_node_id: 'openEHR-EHR-SECTION.adhoc.v1',
            items: [
              {
                '@class': 'ACTION',
                name: {
                  '@class': 'DV_TEXT',
                  value: 'Cancer organ treatment'
                },
                archetype_details: {
                  '@class': 'ARCHETYPED',
                  archetype_id: {
                    '@class': 'ARCHETYPE_ID',
                    value: 'openEHR-EHR-ACTION.procedure.v1'
                  },
                  rm_version: '1.0.4'
                },
                archetype_node_id: 'openEHR-EHR-ACTION.procedure.v1',
                language: {
                  '@class': 'CODE_PHRASE',
                  terminology_id: {
                    '@class': 'TERMINOLOGY_ID',
                    value: 'ISO_639-1'
                  },
                  code_string: 'fr'
                },
                encoding: {
                  '@class': 'CODE_PHRASE',
                  terminology_id: {
                    '@class': 'TERMINOLOGY_ID',
                    value: 'IANA_character-sets'
                  },
                  code_string: 'UTF-8'
                },
                subject: {
                  '@class': 'PARTY_SELF'
                },
                time: {
                  '@class': 'DV_DATE_TIME',
                  value: '2020-07-14T17:29:39.674Z'
                },
                description: {
                  '@class': 'ITEM_TREE',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Tree'
                  },
                  archetype_node_id: 'at0001',
                  items: [
                    {
                      '@class': 'ELEMENT',
                      name: {
                        '@class': 'DV_TEXT',
                        value: 'Procedure name'
                      },
                      archetype_node_id: 'at0002',
                      value: {
                        '@class': 'DV_TEXT',
                        value: 'Cancer metastasis or treatment progression'
                      }
                    }
                  ]
                },
                ism_transition: {
                  '@class': 'ISM_TRANSITION',
                  current_state: {
                    '@class': 'DV_CODED_TEXT',
                    value: 'completed',
                    defining_code: {
                      '@class': 'CODE_PHRASE',
                      terminology_id: {
                        '@class': 'TERMINOLOGY_ID',
                        value: 'openehr'
                      },
                      code_string: '532'
                    }
                  }
                }
              }
            ]
          },
          {
            '@class': 'SECTION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Survival and disease control'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-SECTION.adhoc.v1'
              },
              rm_version: '1.0.4'
            },
            archetype_node_id: 'openEHR-EHR-SECTION.adhoc.v1',
            items: [
              {
                '@class': 'ADMIN_ENTRY',
                name: {
                  '@class': 'DV_TEXT',
                  value: 'Patient death information'
                },
                archetype_details: {
                  '@class': 'ARCHETYPED',
                  archetype_id: {
                    '@class': 'ARCHETYPE_ID',
                    value: 'openEHR-EHR-ADMIN_ENTRY.death_information.v0'
                  },
                  rm_version: '1.0.4'
                },
                archetype_node_id: 'openEHR-EHR-ADMIN_ENTRY.death_information.v0',
                language: {
                  '@class': 'CODE_PHRASE',
                  terminology_id: {
                    '@class': 'TERMINOLOGY_ID',
                    value: 'ISO_639-1'
                  },
                  code_string: 'fr'
                },
                encoding: {
                  '@class': 'CODE_PHRASE',
                  terminology_id: {
                    '@class': 'TERMINOLOGY_ID',
                    value: 'IANA_character-sets'
                  },
                  code_string: 'UTF-8'
                },
                subject: {
                  '@class': 'PARTY_SELF'
                },
                data: {
                  '@class': 'ITEM_TREE',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Item tree'
                  },
                  archetype_node_id: 'at0001',
                  items: [
                    {
                      '@class': 'CLUSTER',
                      name: {
                        '@class': 'DV_TEXT',
                        value: 'Death details'
                      },
                      archetype_details: {
                        '@class': 'ARCHETYPED',
                        archetype_id: {
                          '@class': 'ARCHETYPE_ID',
                          value: 'openEHR-EHR-CLUSTER.death_details_parent.v1'
                        },
                        rm_version: '1.0.4'
                      },
                      archetype_node_id: 'openEHR-EHR-CLUSTER.death_details_parent.v1',
                      items: [
                        {
                          '@class': 'ELEMENT',
                          name: {
                            '@class': 'DV_TEXT',
                            value: 'Date of death'
                          },
                          archetype_node_id: 'at0001',
                          value: {
                            '@class': 'DV_DATE_TIME',
                            value: '2020-07-09'
                          }
                        },
                        {
                          '@class': 'ELEMENT',
                          name: {
                            '@class': 'DV_TEXT',
                            value: 'Death attributable to colorectal cancer?'
                          },
                          archetype_node_id: 'at0002',
                          value: {
                            '@class': 'DV_CODED_TEXT',
                            value: 'Oui',
                            defining_code: {
                              '@class': 'CODE_PHRASE',
                              terminology_id: {
                                '@class': 'TERMINOLOGY_ID',
                                value: 'ternaryValuesMED'
                              },
                              code_string: '1'
                            }
                          }
                        }
                      ]
                    },
                    {
                      '@class': 'CLUSTER',
                      name: {
                        '@class': 'DV_TEXT',
                        value: 'Anonymised person'
                      },
                      archetype_details: {
                        '@class': 'ARCHETYPED',
                        archetype_id: {
                          '@class': 'ARCHETYPE_ID',
                          value: 'openEHR-EHR-CLUSTER.person_anonymised_parent.v0'
                        },
                        rm_version: '1.0.4'
                      },
                      archetype_node_id: 'openEHR-EHR-CLUSTER.person_anonymised_parent.v0',
                      items: [
                        {
                          '@class': 'ELEMENT',
                          name: {
                            '@class': 'DV_TEXT',
                            value: 'Dead?'
                          },
                          archetype_node_id: 'at0003',
                          value: {
                            '@class': 'DV_CODED_TEXT',
                            value: 'Yes',
                            defining_code: {
                              '@class': 'CODE_PHRASE',
                              terminology_id: {
                                '@class': 'TERMINOLOGY_ID',
                                value: 'ternaryValuesMED'
                              },
                              code_string: '1'
                            }
                          }
                        }
                      ]
                    }
                  ]
                }
              }
            ]
          },
          {
            '@class': 'SECTION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Quality of death'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-SECTION.adhoc.v1'
              },
              rm_version: '1.0.4'
            },
            archetype_node_id: 'openEHR-EHR-SECTION.adhoc.v1',
            items: [
              {
                '@class': 'EVALUATION',
                name: {
                  '@class': 'DV_TEXT',
                  value: 'ICHOM CRC Quality of death'
                },
                archetype_details: {
                  '@class': 'ARCHETYPED',
                  archetype_id: {
                    '@class': 'ARCHETYPE_ID',
                    value: 'openEHR-EHR-EVALUATION.ichom_crc_quality_death.v0'
                  },
                  rm_version: '1.0.4'
                },
                archetype_node_id: 'openEHR-EHR-EVALUATION.ichom_crc_quality_death.v0',
                language: {
                  '@class': 'CODE_PHRASE',
                  terminology_id: {
                    '@class': 'TERMINOLOGY_ID',
                    value: 'ISO_639-1'
                  },
                  code_string: 'fr'
                },
                encoding: {
                  '@class': 'CODE_PHRASE',
                  terminology_id: {
                    '@class': 'TERMINOLOGY_ID',
                    value: 'IANA_character-sets'
                  },
                  code_string: 'UTF-8'
                },
                subject: {
                  '@class': 'PARTY_SELF'
                },
                data: {
                  '@class': 'ITEM_TREE',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Item tree'
                  },
                  archetype_node_id: 'at0001',
                  items: [
                    {
                      '@class': 'ELEMENT',
                      name: {
                        '@class': 'DV_TEXT',
                        value: 'Place of death'
                      },
                      archetype_node_id: 'at0011',
                      value: {
                        '@class': 'DV_CODED_TEXT',
                        value: 'Hospitalisation à domicile / EHPAD / SSR',
                        defining_code: {
                          '@class': 'CODE_PHRASE',
                          terminology_id: {
                            '@class': 'TERMINOLOGY_ID',
                            value: 'deathPlaceFUICHOMCRC'
                          },
                          code_string: '3'
                        }
                      }
                    },
                    {
                      '@class': 'ELEMENT',
                      name: {
                        '@class': 'DV_TEXT',
                        value: 'Hospice'
                      },
                      archetype_node_id: 'at0027',
                      value: {
                        '@class': 'DV_CODED_TEXT',
                        value: 'Non',
                        defining_code: {
                          '@class': 'CODE_PHRASE',
                          terminology_id: {
                            '@class': 'TERMINOLOGY_ID',
                            value: 'ternaryValuesMED'
                          },
                          code_string: '0'
                        }
                      }
                    },
                    {
                      '@class': 'ELEMENT',
                      name: {
                        '@class': 'DV_TEXT',
                        value: 'Prefered place of death'
                      },
                      archetype_node_id: 'at0031',
                      value: {
                        '@class': 'DV_CODED_TEXT',
                        value: 'Hôpital',
                        defining_code: {
                          '@class': 'CODE_PHRASE',
                          terminology_id: {
                            '@class': 'TERMINOLOGY_ID',
                            value: 'deathPlacePrefFUICHOMCRC'
                          },
                          code_string: '2'
                        }
                      }
                    },
                    {
                      '@class': 'ELEMENT',
                      name: {
                        '@class': 'DV_TEXT',
                        value: 'Date of documentation of desired place of death'
                      },
                      archetype_node_id: 'at0032',
                      value: {
                        '@class': 'DV_DATE',
                        value: '2020-07-08'
                      }
                    },
                    {
                      '@class': 'ELEMENT',
                      name: {
                        '@class': 'DV_TEXT',
                        value: 'Hospital readmission > 1 time during the last 30 days of life (excluding emergency consultations)'
                      },
                      archetype_node_id: 'at0033',
                      value: {
                        '@class': 'DV_CODED_TEXT',
                        value: 'Oui',
                        defining_code: {
                          '@class': 'CODE_PHRASE',
                          terminology_id: {
                            '@class': 'TERMINOLOGY_ID',
                            value: 'ternaryValuesMED'
                          },
                          code_string: '1'
                        }
                      }
                    }
                  ]
                }
              }
            ]
          }
        ]
      }
    },
    {
      '#0': {
        '@class': 'COMPOSITION',
        name: {
          '@class': 'DV_TEXT',
          value: 'comp'
        },
        uid: {
          '@class': 'OBJECT_VERSION_ID',
          value: 'e9eb6cdc-f3be-45bd-ab4a-69bbce5747cf::metod::1'
        },
        archetype_details: {
          '@class': 'ARCHETYPED',
          archetype_id: {
            '@class': 'ARCHETYPE_ID',
            value: 'openEHR-EHR-COMPOSITION.comp.v0'
          },
          template_id: {
            '@class': 'TEMPLATE_ID',
            value: 'a-vsi'
          },
          rm_version: '1.0.4'
        },
        feeder_audit: {
          '@class': 'FEEDER_AUDIT',
          original_content: {
            '@class': 'DV_PARSABLE',
            value: '{"/generic-numeric_field-1046621":[12],"/generic-numeric_field-5838149":[234],"/generic-numeric_field-8220696":[-40],"/generic-spacer-9344838":[],"/generic-numeric_field-7226076":[-40],"/generic-numeric_field-6769103":[234],"/generic-numeric_field-7523082":[69],"/generic-numeric_field-2623180":[15],"/generic-numeric_field-709294":[40],"/generic-numeric_field-7081109":[8916100448256],"/generic-quantity-4145600":[{"|unit":"dag","|magnitude":69}],"/generic-ordinal-6614636":[{"|code":"89bfc877-0cbc-4470-b507-07bcf3698b08","|value":"woohoo","|ordinal":69}],"/generic-proportion_field-9654467":[{"|denominator":-40,"|numerator":234}],"/generic-input_text-3131794":[15.297058540778355],"/generic-input_text-3672701":["2020-07-17T12:43:33+02:00"],"/generic-date_time-2686113":["2020-07-17T12:43:33+02:00"],"/generic-time-7696168":["2020-07-17T12:43:33+02:00"],"/generic-date_time-7482257":["2020-07-17T12:43:33+02:00"],"/generic-input_text-3253850":["17-07-2020 12:43"],"/generic-spacer-179619":[],"/generic-input_text-9024464":["2020-07-10T00:00:00+02:00"],"/generic-date_time-3814326":["2020-07-10T00:00:00+02:00"],"/generic-time-8391521":["2020-07-10T00:00:00+02:00"],"/generic-date_field-9568176":["2020-07-10T00:00:00+02:00"],"/generic-input_text-3222434":["10.07.2020"],"/generic-spacer-3017410":[],"/generic-input_text-1576000":["2020-07-17T22:10:00+02:00"],"/generic-date_time-3141879":["2020-07-17T22:10:00+02:00"],"/generic-time-1870889":["2020-07-17T22:10:00+02:00"],"/generic-date_field-872615":["2020-07-17T22:10:00+02:00"],"/generic-input_text-8392521":["22:10"],"/generic-input_text-4717730":["08:15"],"/generic-input_text-9169117":["8:15"],"/generic-spacer-5560815":[],"/generic-input_text-4916078":["2020-07-27T12:43:33+02:00"],"/generic-input_text-671115":["2020-08-17T12:43:33+02:00"],"/generic-input_text-2820170":["2020-08-03T02:00:00+02:00"],"/generic-input_text-5664977":["2020-07-17T12:43:00+02:00"],"/generic-date_time-6313257":["2020-07-17T12:43:00+02:00"],"/generic-date_time-1576410":["2020-07-17T12:43:33+02:00"],"/generic-input_text-8134649":[],"/generic-label-1710623":[],"/generic-date_field-9171641":[],"/generic-input_text-4092511":["random testing TEXT 1"],"/generic-input_text-3573363":["  random testing     TEXT 2"],"/generic-input_text-2312691":["random testing text 1"],"/generic-input_text-4589452":["RANDOM TESTING     TEXT 2"],"/generic-input_text-2464960":["random testing TEXT 1"],"/generic-input_text-2691998":["random testing TEXT 2"],"/generic-input_text-4667661":["text"],"/generic-boolean-550726":[true],"/generic-boolean-7446323":[false],"/generic-numeric_field-2271479":[27],"/generic-spacer-6732714":[],"/generic-input_text-7756000":["Chuck Norris asked his nurse to help him go take a piss. Chuck just had surgery and his Doctor told him not to lift anything over 10 pounds."]}',
            formalism: 'application/json'
          },
          originating_system_audit: {
            '@class': 'FEEDER_AUDIT_DETAILS',
            system_id: 'FormRenderer'
          }
        },
        archetype_node_id: 'openEHR-EHR-COMPOSITION.comp.v0',
        language: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'ISO_639-1'
          },
          code_string: 'en'
        },
        territory: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'ISO_3166-1'
          },
          code_string: 'EN'
        },
        category: {
          '@class': 'DV_CODED_TEXT',
          value: 'event',
          defining_code: {
            '@class': 'CODE_PHRASE',
            terminology_id: {
              '@class': 'TERMINOLOGY_ID',
              value: 'openehr'
            },
            code_string: '433'
          }
        },
        composer: {
          '@class': 'PARTY_IDENTIFIED',
          name: 'metod'
        },
        context: {
          '@class': 'EVENT_CONTEXT',
          start_time: {
            '@class': 'DV_DATE_TIME',
            value: '2020-07-17T12:43:45.308527+02:00'
          },
          setting: {
            '@class': 'DV_CODED_TEXT',
            value: 'other care',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'openehr'
              },
              code_string: '238'
            }
          }
        }
      }
    },
    {
      '#0': {
        '@class': 'COMPOSITION',
        name: {
          '@class': 'DV_TEXT',
          value: 'luka3'
        },
        uid: {
          '@class': 'OBJECT_VERSION_ID',
          value: '642fd25f-f20a-4ebd-aa43-fcc3e22e5a1c::metod::1'
        },
        archetype_details: {
          '@class': 'ARCHETYPED',
          archetype_id: {
            '@class': 'ARCHETYPE_ID',
            value: 'openEHR-EHR-COMPOSITION.luka3.v0'
          },
          template_id: {
            '@class': 'TEMPLATE_ID',
            value: 'luka3'
          },
          rm_version: '1.0.4'
        },
        feeder_audit: {
          '@class': 'FEEDER_AUDIT',
          original_content: {
            '@class': 'DV_PARSABLE',
            value: '{}',
            formalism: 'application/json'
          },
          originating_system_audit: {
            '@class': 'FEEDER_AUDIT_DETAILS',
            system_id: 'FormRenderer'
          }
        },
        archetype_node_id: 'openEHR-EHR-COMPOSITION.luka3.v0',
        language: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'ISO_639-1'
          },
          code_string: 'en'
        },
        territory: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'ISO_3166-1'
          },
          code_string: 'EN'
        },
        category: {
          '@class': 'DV_CODED_TEXT',
          value: 'event',
          defining_code: {
            '@class': 'CODE_PHRASE',
            terminology_id: {
              '@class': 'TERMINOLOGY_ID',
              value: 'openehr'
            },
            code_string: '433'
          }
        },
        composer: {
          '@class': 'PARTY_IDENTIFIED',
          name: 'metod'
        },
        context: {
          '@class': 'EVENT_CONTEXT',
          start_time: {
            '@class': 'DV_DATE_TIME',
            value: '2020-07-20T09:54:09.168717+02:00'
          },
          setting: {
            '@class': 'DV_CODED_TEXT',
            value: 'other care',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'openehr'
              },
              code_string: '238'
            }
          }
        },
        content: [
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'test3'
            },
            archetype_node_id: 'at0005',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'History'
              },
              archetype_node_id: 'at0004',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2020-07-20T09:54:09.168717+02:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0006',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2020-07-20T09:54:09.168717+02:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Item tree'
                    },
                    archetype_node_id: 'at0007',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'DV_TEXT'
                        },
                        archetype_node_id: 'at0008',
                        value: {
                          '@class': 'DV_TEXT',
                          value: 'vitamin a'
                        }
                      },
                      {
                        '@class': 'CLUSTER',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'CLUSTER'
                        },
                        archetype_node_id: 'at0010',
                        items: [
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'DV_CODED_TEXT'
                            },
                            archetype_node_id: 'at0011',
                            value: {
                              '@class': 'DV_CODED_TEXT',
                              value: 'mon',
                              defining_code: {
                                '@class': 'CODE_PHRASE',
                                terminology_id: {
                                  '@class': 'TERMINOLOGY_ID',
                                  value: 'local'
                                },
                                code_string: 'at0012'
                              }
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'DV_CODED_TEXT #2'
                            },
                            archetype_node_id: 'at0011',
                            value: {
                              '@class': 'DV_CODED_TEXT',
                              value: 'thu',
                              defining_code: {
                                '@class': 'CODE_PHRASE',
                                terminology_id: {
                                  '@class': 'TERMINOLOGY_ID',
                                  value: 'local'
                                },
                                code_string: 'at0015'
                              }
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'DV_CODED_TEXT #3'
                            },
                            archetype_node_id: 'at0011',
                            value: {
                              '@class': 'DV_CODED_TEXT',
                              value: 'sat',
                              defining_code: {
                                '@class': 'CODE_PHRASE',
                                terminology_id: {
                                  '@class': 'TERMINOLOGY_ID',
                                  value: 'local'
                                },
                                code_string: 'at0017'
                              }
                            }
                          }
                        ]
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'test3 #2'
            },
            archetype_node_id: 'at0005',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'History'
              },
              archetype_node_id: 'at0004',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2020-07-20T09:54:09.168717+02:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0006',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2020-07-20T09:54:09.168717+02:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Item tree'
                    },
                    archetype_node_id: 'at0007',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'DV_TEXT'
                        },
                        archetype_node_id: 'at0008',
                        value: {
                          '@class': 'DV_TEXT',
                          value: 'vitamin b'
                        }
                      },
                      {
                        '@class': 'CLUSTER',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'CLUSTER'
                        },
                        archetype_node_id: 'at0010',
                        items: [
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'DV_CODED_TEXT'
                            },
                            archetype_node_id: 'at0011',
                            value: {
                              '@class': 'DV_CODED_TEXT',
                              value: 'mon',
                              defining_code: {
                                '@class': 'CODE_PHRASE',
                                terminology_id: {
                                  '@class': 'TERMINOLOGY_ID',
                                  value: 'local'
                                },
                                code_string: 'at0012'
                              }
                            }
                          },
                          {
                            '@class': 'ELEMENT',
                            name: {
                              '@class': 'DV_TEXT',
                              value: 'DV_CODED_TEXT #2'
                            },
                            archetype_node_id: 'at0011',
                            value: {
                              '@class': 'DV_CODED_TEXT',
                              value: 'tue',
                              defining_code: {
                                '@class': 'CODE_PHRASE',
                                terminology_id: {
                                  '@class': 'TERMINOLOGY_ID',
                                  value: 'local'
                                },
                                code_string: 'at0013'
                              }
                            }
                          }
                        ]
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      '#0': {
        '@class': 'COMPOSITION',
        name: {
          '@class': 'DV_TEXT',
          value: 'Vital Signs'
        },
        uid: {
          '@class': 'OBJECT_VERSION_ID',
          value: '5c8e851c-d2fe-41a2-82cc-8b04bb7d8b3a::metod::1'
        },
        archetype_details: {
          '@class': 'ARCHETYPED',
          archetype_id: {
            '@class': 'ARCHETYPE_ID',
            value: 'openEHR-EHR-COMPOSITION.encounter.v1'
          },
          template_id: {
            '@class': 'TEMPLATE_ID',
            value: 'Vital Signs'
          },
          rm_version: '1.0.1'
        },
        archetype_node_id: 'openEHR-EHR-COMPOSITION.encounter.v1',
        language: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'ISO_639-1'
          },
          code_string: 'en'
        },
        territory: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'ISO_3166-1'
          },
          code_string: 'SI'
        },
        category: {
          '@class': 'DV_CODED_TEXT',
          value: 'event',
          defining_code: {
            '@class': 'CODE_PHRASE',
            terminology_id: {
              '@class': 'TERMINOLOGY_ID',
              value: 'openehr'
            },
            code_string: '433'
          }
        },
        composer: {
          '@class': 'PARTY_IDENTIFIED',
          name: 'ehrscape'
        },
        context: {
          '@class': 'EVENT_CONTEXT',
          start_time: {
            '@class': 'DV_DATE_TIME',
            value: '2015-03-23T20:25:44.000+01:00'
          },
          setting: {
            '@class': 'DV_CODED_TEXT',
            value: 'other care',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'openehr'
              },
              code_string: '238'
            }
          }
        },
        content: [
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Body temperature'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.body_temperature.v1'
              },
              rm_version: '1.0.1'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.body_temperature.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'History'
              },
              archetype_node_id: 'at0002',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2015-03-23T20:25:44.000+01:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0003',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2015-03-23T20:25:44.000+01:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Single'
                    },
                    archetype_node_id: 'at0001',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Temperature'
                        },
                        archetype_node_id: 'at0004',
                        value: {
                          '@class': 'DV_QUANTITY',
                          magnitude: 36.1,
                          units: '°C',
                          precision: 1
                        }
                      }
                    ]
                  },
                  state: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'State'
                    },
                    archetype_node_id: 'at0029',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Body exposure'
                        },
                        archetype_node_id: 'at0030',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'Appropriate clothing/bedding',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'local'
                            },
                            code_string: 'at0033'
                          }
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Blood Pressure'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.blood_pressure.v1'
              },
              rm_version: '1.0.1'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.blood_pressure.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'history'
              },
              archetype_node_id: 'at0001',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2015-03-23T20:25:44.000+01:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'any event'
                  },
                  archetype_node_id: 'at0006',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2015-03-23T20:25:44.000+01:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'blood pressure'
                    },
                    archetype_node_id: 'at0003',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Systolic'
                        },
                        archetype_node_id: 'at0004',
                        value: {
                          '@class': 'DV_QUANTITY',
                          magnitude: 98,
                          units: 'mm[Hg]',
                          precision: 0
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Diastolic'
                        },
                        archetype_node_id: 'at0005',
                        value: {
                          '@class': 'DV_QUANTITY',
                          magnitude: 60,
                          units: 'mm[Hg]',
                          precision: 0
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Height/Length'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.height.v1'
              },
              rm_version: '1.0.1'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.height.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'history'
              },
              archetype_node_id: 'at0001',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2015-03-23T20:25:44.000+01:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0002',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2015-03-23T20:25:44.000+01:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Simple'
                    },
                    archetype_node_id: 'at0003',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Body Height/Length'
                        },
                        archetype_node_id: 'at0004',
                        value: {
                          '@class': 'DV_QUANTITY',
                          magnitude: 154,
                          units: 'cm'
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Body weight'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.body_weight.v1'
              },
              rm_version: '1.0.1'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.body_weight.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'history'
              },
              archetype_node_id: 'at0002',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2015-03-23T20:25:44.000+01:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0003',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2015-03-23T20:25:44.000+01:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Simple'
                    },
                    archetype_node_id: 'at0001',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Body weight'
                        },
                        archetype_node_id: 'at0004',
                        value: {
                          '@class': 'DV_QUANTITY',
                          magnitude: 54.4,
                          units: 'kg'
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Pulse'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.heart_rate-pulse.v1'
              },
              rm_version: '1.0.1'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.heart_rate-pulse.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'history'
              },
              archetype_node_id: 'at0002',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2015-03-23T20:25:44.000+01:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0003',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2015-03-23T20:25:44.000+01:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'structure'
                    },
                    archetype_node_id: 'at0001',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Rate'
                        },
                        archetype_node_id: 'at0004',
                        value: {
                          '@class': 'DV_QUANTITY',
                          magnitude: 180,
                          units: '/min',
                          precision: 0
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Respirations'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.respiration.v1'
              },
              rm_version: '1.0.1'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.respiration.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'history'
              },
              archetype_node_id: 'at0001',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2015-03-23T20:25:44.000+01:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0002',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2015-03-23T20:25:44.000+01:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'List'
                    },
                    archetype_node_id: 'at0003',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Rate'
                        },
                        archetype_node_id: 'at0004',
                        value: {
                          '@class': 'DV_QUANTITY',
                          magnitude: 19,
                          units: '/min',
                          precision: 0
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Indirect oximetry'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.indirect_oximetry.v1'
              },
              rm_version: '1.0.1'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.indirect_oximetry.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'Event Series'
              },
              archetype_node_id: 'at0001',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2015-03-23T20:25:44.000+01:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0002',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2015-03-23T20:25:44.000+01:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Tree'
                    },
                    archetype_node_id: 'at0003',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'spO2'
                        },
                        archetype_node_id: 'at0006',
                        value: {
                          '@class': 'DV_PROPORTION',
                          numerator: 99.9,
                          denominator: 100,
                          type: 0
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      '#0': {
        '@class': 'COMPOSITION',
        name: {
          '@class': 'DV_TEXT',
          value: 'Vital Signs'
        },
        uid: {
          '@class': 'OBJECT_VERSION_ID',
          value: '7e9b3642-bf61-40f8-93d1-d2b5b142054e::metod::1'
        },
        archetype_details: {
          '@class': 'ARCHETYPED',
          archetype_id: {
            '@class': 'ARCHETYPE_ID',
            value: 'openEHR-EHR-COMPOSITION.encounter.v1'
          },
          template_id: {
            '@class': 'TEMPLATE_ID',
            value: 'Vital Signs'
          },
          rm_version: '1.0.1'
        },
        archetype_node_id: 'openEHR-EHR-COMPOSITION.encounter.v1',
        language: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'ISO_639-1'
          },
          code_string: 'en'
        },
        territory: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'ISO_3166-1'
          },
          code_string: 'SI'
        },
        category: {
          '@class': 'DV_CODED_TEXT',
          value: 'event',
          defining_code: {
            '@class': 'CODE_PHRASE',
            terminology_id: {
              '@class': 'TERMINOLOGY_ID',
              value: 'openehr'
            },
            code_string: '433'
          }
        },
        composer: {
          '@class': 'PARTY_IDENTIFIED',
          name: 'ehrscape'
        },
        context: {
          '@class': 'EVENT_CONTEXT',
          start_time: {
            '@class': 'DV_DATE_TIME',
            value: '2015-03-19T22:35:56.000+01:00'
          },
          setting: {
            '@class': 'DV_CODED_TEXT',
            value: 'other care',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'openehr'
              },
              code_string: '238'
            }
          }
        },
        content: [
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Body temperature'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.body_temperature.v1'
              },
              rm_version: '1.0.1'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.body_temperature.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'History'
              },
              archetype_node_id: 'at0002',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2015-03-19T22:35:56.000+01:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0003',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2015-03-19T22:35:56.000+01:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Single'
                    },
                    archetype_node_id: 'at0001',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Temperature'
                        },
                        archetype_node_id: 'at0004',
                        value: {
                          '@class': 'DV_QUANTITY',
                          magnitude: 39,
                          units: '°C',
                          precision: 1
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Blood Pressure'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.blood_pressure.v1'
              },
              rm_version: '1.0.1'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.blood_pressure.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'history'
              },
              archetype_node_id: 'at0001',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2015-03-19T22:35:56.000+01:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'any event'
                  },
                  archetype_node_id: 'at0006',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2015-03-19T22:35:56.000+01:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'blood pressure'
                    },
                    archetype_node_id: 'at0003',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Systolic'
                        },
                        archetype_node_id: 'at0004',
                        value: {
                          '@class': 'DV_QUANTITY',
                          magnitude: 88,
                          units: 'mm[Hg]',
                          precision: 0
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Diastolic'
                        },
                        archetype_node_id: 'at0005',
                        value: {
                          '@class': 'DV_QUANTITY',
                          magnitude: 81,
                          units: 'mm[Hg]',
                          precision: 0
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Height/Length'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.height.v1'
              },
              rm_version: '1.0.1'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.height.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'history'
              },
              archetype_node_id: 'at0001',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2015-03-19T22:35:56.000+01:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0002',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2015-03-19T22:35:56.000+01:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Simple'
                    },
                    archetype_node_id: 'at0003',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Body Height/Length'
                        },
                        archetype_node_id: 'at0004',
                        value: {
                          '@class': 'DV_QUANTITY',
                          magnitude: 154,
                          units: 'cm'
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Body weight'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.body_weight.v1'
              },
              rm_version: '1.0.1'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.body_weight.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'history'
              },
              archetype_node_id: 'at0002',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2015-03-19T22:35:56.000+01:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0003',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2015-03-19T22:35:56.000+01:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Simple'
                    },
                    archetype_node_id: 'at0001',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Body weight'
                        },
                        archetype_node_id: 'at0004',
                        value: {
                          '@class': 'DV_QUANTITY',
                          magnitude: 55.5,
                          units: 'kg'
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Pulse'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.heart_rate-pulse.v1'
              },
              rm_version: '1.0.1'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.heart_rate-pulse.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'history'
              },
              archetype_node_id: 'at0002',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2015-03-19T22:35:56.000+01:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0003',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2015-03-19T22:35:56.000+01:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'structure'
                    },
                    archetype_node_id: 'at0001',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Rate'
                        },
                        archetype_node_id: 'at0004',
                        value: {
                          '@class': 'DV_QUANTITY',
                          magnitude: 81,
                          units: '/min',
                          precision: 0
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Respirations'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.respiration.v1'
              },
              rm_version: '1.0.1'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.respiration.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'history'
              },
              archetype_node_id: 'at0001',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2015-03-19T22:35:56.000+01:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0002',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2015-03-19T22:35:56.000+01:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'List'
                    },
                    archetype_node_id: 'at0003',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Rate'
                        },
                        archetype_node_id: 'at0004',
                        value: {
                          '@class': 'DV_QUANTITY',
                          magnitude: 10,
                          units: '/min',
                          precision: 0
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      '#0': {
        '@class': 'COMPOSITION',
        name: {
          '@class': 'DV_TEXT',
          value: 'Vital Signs'
        },
        uid: {
          '@class': 'OBJECT_VERSION_ID',
          value: '4f7f6a38-83ed-4909-bf34-32b5b8675e43::metod::1'
        },
        archetype_details: {
          '@class': 'ARCHETYPED',
          archetype_id: {
            '@class': 'ARCHETYPE_ID',
            value: 'openEHR-EHR-COMPOSITION.encounter.v1'
          },
          template_id: {
            '@class': 'TEMPLATE_ID',
            value: 'Vital Signs'
          },
          rm_version: '1.0.1'
        },
        archetype_node_id: 'openEHR-EHR-COMPOSITION.encounter.v1',
        language: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'ISO_639-1'
          },
          code_string: 'en'
        },
        territory: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'ISO_3166-1'
          },
          code_string: 'SI'
        },
        category: {
          '@class': 'DV_CODED_TEXT',
          value: 'event',
          defining_code: {
            '@class': 'CODE_PHRASE',
            terminology_id: {
              '@class': 'TERMINOLOGY_ID',
              value: 'openehr'
            },
            code_string: '433'
          }
        },
        composer: {
          '@class': 'PARTY_IDENTIFIED',
          name: 'ehrscape'
        },
        context: {
          '@class': 'EVENT_CONTEXT',
          start_time: {
            '@class': 'DV_DATE_TIME',
            value: '2015-03-01T23:43:01.000+01:00'
          },
          setting: {
            '@class': 'DV_CODED_TEXT',
            value: 'other care',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'openehr'
              },
              code_string: '238'
            }
          }
        },
        content: [
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Blood Pressure'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.blood_pressure.v1'
              },
              rm_version: '1.0.1'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.blood_pressure.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'history'
              },
              archetype_node_id: 'at0001',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2015-03-01T23:43:01.000+01:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'any event'
                  },
                  archetype_node_id: 'at0006',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2015-03-01T23:43:01.000+01:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'blood pressure'
                    },
                    archetype_node_id: 'at0003',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Systolic'
                        },
                        archetype_node_id: 'at0004',
                        value: {
                          '@class': 'DV_QUANTITY',
                          magnitude: 124,
                          units: 'mm[Hg]',
                          precision: 0
                        }
                      },
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Diastolic'
                        },
                        archetype_node_id: 'at0005',
                        value: {
                          '@class': 'DV_QUANTITY',
                          magnitude: 75,
                          units: 'mm[Hg]',
                          precision: 0
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Height/Length'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.height.v1'
              },
              rm_version: '1.0.1'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.height.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'history'
              },
              archetype_node_id: 'at0001',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2015-03-01T23:43:01.000+01:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0002',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2015-03-01T23:43:01.000+01:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Simple'
                    },
                    archetype_node_id: 'at0003',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Body Height/Length'
                        },
                        archetype_node_id: 'at0004',
                        value: {
                          '@class': 'DV_QUANTITY',
                          magnitude: 156,
                          units: 'cm'
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Body weight'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.body_weight.v1'
              },
              rm_version: '1.0.1'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.body_weight.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'history'
              },
              archetype_node_id: 'at0002',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2015-03-01T23:43:01.000+01:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0003',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2015-03-01T23:43:01.000+01:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Simple'
                    },
                    archetype_node_id: 'at0001',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Body weight'
                        },
                        archetype_node_id: 'at0004',
                        value: {
                          '@class': 'DV_QUANTITY',
                          magnitude: 55.6,
                          units: 'kg'
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Pulse'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.heart_rate-pulse.v1'
              },
              rm_version: '1.0.1'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.heart_rate-pulse.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'history'
              },
              archetype_node_id: 'at0002',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2015-03-01T23:43:01.000+01:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0003',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2015-03-01T23:43:01.000+01:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'structure'
                    },
                    archetype_node_id: 'at0001',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Rate'
                        },
                        archetype_node_id: 'at0004',
                        value: {
                          '@class': 'DV_QUANTITY',
                          magnitude: 180,
                          units: '/min',
                          precision: 0
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Indirect oximetry'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.indirect_oximetry.v1'
              },
              rm_version: '1.0.1'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.indirect_oximetry.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'Event Series'
              },
              archetype_node_id: 'at0001',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2015-03-01T23:43:01.000+01:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0002',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2015-03-01T23:43:01.000+01:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Tree'
                    },
                    archetype_node_id: 'at0003',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'spO2'
                        },
                        archetype_node_id: 'at0006',
                        value: {
                          '@class': 'DV_PROPORTION',
                          numerator: 96.4,
                          denominator: 100,
                          type: 0
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      '#0': {
        '@class': 'COMPOSITION',
        name: {
          '@class': 'DV_TEXT',
          value: 'Vital Signs'
        },
        uid: {
          '@class': 'OBJECT_VERSION_ID',
          value: '4652b2be-a043-4154-a42a-81834007831f::metod::1'
        },
        archetype_details: {
          '@class': 'ARCHETYPED',
          archetype_id: {
            '@class': 'ARCHETYPE_ID',
            value: 'openEHR-EHR-COMPOSITION.encounter.v1'
          },
          template_id: {
            '@class': 'TEMPLATE_ID',
            value: 'Vital Signs'
          },
          rm_version: '1.0.1'
        },
        archetype_node_id: 'openEHR-EHR-COMPOSITION.encounter.v1',
        language: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'ISO_639-1'
          },
          code_string: 'en'
        },
        territory: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'ISO_3166-1'
          },
          code_string: 'SI'
        },
        category: {
          '@class': 'DV_CODED_TEXT',
          value: 'event',
          defining_code: {
            '@class': 'CODE_PHRASE',
            terminology_id: {
              '@class': 'TERMINOLOGY_ID',
              value: 'openehr'
            },
            code_string: '433'
          }
        },
        composer: {
          '@class': 'PARTY_IDENTIFIED',
          name: 'ehrscape'
        },
        context: {
          '@class': 'EVENT_CONTEXT',
          start_time: {
            '@class': 'DV_DATE_TIME',
            value: '2015-03-12T15:19:34.000+01:00'
          },
          setting: {
            '@class': 'DV_CODED_TEXT',
            value: 'other care',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'openehr'
              },
              code_string: '238'
            }
          }
        },
        content: [
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Body temperature'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.body_temperature.v1'
              },
              rm_version: '1.0.1'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.body_temperature.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'History'
              },
              archetype_node_id: 'at0002',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2015-03-12T15:19:34.000+01:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0003',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2015-03-12T15:19:34.000+01:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Single'
                    },
                    archetype_node_id: 'at0001',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Temperature'
                        },
                        archetype_node_id: 'at0004',
                        value: {
                          '@class': 'DV_QUANTITY',
                          magnitude: 39.4,
                          units: '°C',
                          precision: 1
                        }
                      }
                    ]
                  },
                  state: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'State'
                    },
                    archetype_node_id: 'at0029',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Body exposure'
                        },
                        archetype_node_id: 'at0030',
                        value: {
                          '@class': 'DV_CODED_TEXT',
                          value: 'Naked',
                          defining_code: {
                            '@class': 'CODE_PHRASE',
                            terminology_id: {
                              '@class': 'TERMINOLOGY_ID',
                              value: 'local'
                            },
                            code_string: 'at0031'
                          }
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Height/Length'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.height.v1'
              },
              rm_version: '1.0.1'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.height.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'history'
              },
              archetype_node_id: 'at0001',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2015-03-12T15:19:34.000+01:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0002',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2015-03-12T15:19:34.000+01:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Simple'
                    },
                    archetype_node_id: 'at0003',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Body Height/Length'
                        },
                        archetype_node_id: 'at0004',
                        value: {
                          '@class': 'DV_QUANTITY',
                          magnitude: 154,
                          units: 'cm'
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Body weight'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.body_weight.v1'
              },
              rm_version: '1.0.1'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.body_weight.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'history'
              },
              archetype_node_id: 'at0002',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2015-03-12T15:19:34.000+01:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0003',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2015-03-12T15:19:34.000+01:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Simple'
                    },
                    archetype_node_id: 'at0001',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Body weight'
                        },
                        archetype_node_id: 'at0004',
                        value: {
                          '@class': 'DV_QUANTITY',
                          magnitude: 56.2,
                          units: 'kg'
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Pulse'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.heart_rate-pulse.v1'
              },
              rm_version: '1.0.1'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.heart_rate-pulse.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'history'
              },
              archetype_node_id: 'at0002',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2015-03-12T15:19:34.000+01:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0003',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2015-03-12T15:19:34.000+01:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'structure'
                    },
                    archetype_node_id: 'at0001',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Rate'
                        },
                        archetype_node_id: 'at0004',
                        value: {
                          '@class': 'DV_QUANTITY',
                          magnitude: 44,
                          units: '/min',
                          precision: 0
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Indirect oximetry'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.indirect_oximetry.v1'
              },
              rm_version: '1.0.1'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.indirect_oximetry.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'Event Series'
              },
              archetype_node_id: 'at0001',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2015-03-12T15:19:34.000+01:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0002',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2015-03-12T15:19:34.000+01:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Tree'
                    },
                    archetype_node_id: 'at0003',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'spO2'
                        },
                        archetype_node_id: 'at0006',
                        value: {
                          '@class': 'DV_PROPORTION',
                          numerator: 96.2,
                          denominator: 100,
                          type: 0
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      '#0': {
        '@class': 'COMPOSITION',
        name: {
          '@class': 'DV_TEXT',
          value: 'Vital Signs'
        },
        uid: {
          '@class': 'OBJECT_VERSION_ID',
          value: 'cc33e5ed-6183-4e9b-9cf7-9eac26a6cde6::metod::1'
        },
        archetype_details: {
          '@class': 'ARCHETYPED',
          archetype_id: {
            '@class': 'ARCHETYPE_ID',
            value: 'openEHR-EHR-COMPOSITION.encounter.v1'
          },
          template_id: {
            '@class': 'TEMPLATE_ID',
            value: 'Vital Signs'
          },
          rm_version: '1.0.1'
        },
        archetype_node_id: 'openEHR-EHR-COMPOSITION.encounter.v1',
        language: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'ISO_639-1'
          },
          code_string: 'en'
        },
        territory: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'ISO_3166-1'
          },
          code_string: 'SI'
        },
        category: {
          '@class': 'DV_CODED_TEXT',
          value: 'event',
          defining_code: {
            '@class': 'CODE_PHRASE',
            terminology_id: {
              '@class': 'TERMINOLOGY_ID',
              value: 'openehr'
            },
            code_string: '433'
          }
        },
        composer: {
          '@class': 'PARTY_IDENTIFIED',
          name: 'ehrscape'
        },
        context: {
          '@class': 'EVENT_CONTEXT',
          start_time: {
            '@class': 'DV_DATE_TIME',
            value: '2015-03-24T04:20:39.000+01:00'
          },
          setting: {
            '@class': 'DV_CODED_TEXT',
            value: 'other care',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'openehr'
              },
              code_string: '238'
            }
          }
        },
        content: [
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Body temperature'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.body_temperature.v1'
              },
              rm_version: '1.0.1'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.body_temperature.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'History'
              },
              archetype_node_id: 'at0002',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2015-03-24T04:20:39.000+01:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0003',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2015-03-24T04:20:39.000+01:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Single'
                    },
                    archetype_node_id: 'at0001',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Temperature'
                        },
                        archetype_node_id: 'at0004',
                        value: {
                          '@class': 'DV_QUANTITY',
                          magnitude: 37.6,
                          units: '°C',
                          precision: 1
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Height/Length'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.height.v1'
              },
              rm_version: '1.0.1'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.height.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'history'
              },
              archetype_node_id: 'at0001',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2015-03-24T04:20:39.000+01:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0002',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2015-03-24T04:20:39.000+01:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Simple'
                    },
                    archetype_node_id: 'at0003',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Body Height/Length'
                        },
                        archetype_node_id: 'at0004',
                        value: {
                          '@class': 'DV_QUANTITY',
                          magnitude: 154,
                          units: 'cm'
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Body weight'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.body_weight.v1'
              },
              rm_version: '1.0.1'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.body_weight.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'history'
              },
              archetype_node_id: 'at0002',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2015-03-24T04:20:39.000+01:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0003',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2015-03-24T04:20:39.000+01:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'Simple'
                    },
                    archetype_node_id: 'at0001',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Body weight'
                        },
                        archetype_node_id: 'at0004',
                        value: {
                          '@class': 'DV_QUANTITY',
                          magnitude: 55.5,
                          units: 'kg'
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Pulse'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.heart_rate-pulse.v1'
              },
              rm_version: '1.0.1'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.heart_rate-pulse.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'history'
              },
              archetype_node_id: 'at0002',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2015-03-24T04:20:39.000+01:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0003',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2015-03-24T04:20:39.000+01:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'structure'
                    },
                    archetype_node_id: 'at0001',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Rate'
                        },
                        archetype_node_id: 'at0004',
                        value: {
                          '@class': 'DV_QUANTITY',
                          magnitude: 152,
                          units: '/min',
                          precision: 0
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            '@class': 'OBSERVATION',
            name: {
              '@class': 'DV_TEXT',
              value: 'Respirations'
            },
            archetype_details: {
              '@class': 'ARCHETYPED',
              archetype_id: {
                '@class': 'ARCHETYPE_ID',
                value: 'openEHR-EHR-OBSERVATION.respiration.v1'
              },
              rm_version: '1.0.1'
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.respiration.v1',
            language: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'ISO_639-1'
              },
              code_string: 'en'
            },
            encoding: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'IANA_character-sets'
              },
              code_string: 'UTF-8'
            },
            subject: {
              '@class': 'PARTY_SELF'
            },
            data: {
              '@class': 'HISTORY',
              name: {
                '@class': 'DV_TEXT',
                value: 'history'
              },
              archetype_node_id: 'at0001',
              origin: {
                '@class': 'DV_DATE_TIME',
                value: '2015-03-24T04:20:39.000+01:00'
              },
              events: [
                {
                  '@class': 'POINT_EVENT',
                  name: {
                    '@class': 'DV_TEXT',
                    value: 'Any event'
                  },
                  archetype_node_id: 'at0002',
                  time: {
                    '@class': 'DV_DATE_TIME',
                    value: '2015-03-24T04:20:39.000+01:00'
                  },
                  data: {
                    '@class': 'ITEM_TREE',
                    name: {
                      '@class': 'DV_TEXT',
                      value: 'List'
                    },
                    archetype_node_id: 'at0003',
                    items: [
                      {
                        '@class': 'ELEMENT',
                        name: {
                          '@class': 'DV_TEXT',
                          value: 'Rate'
                        },
                        archetype_node_id: 'at0004',
                        value: {
                          '@class': 'DV_QUANTITY',
                          magnitude: 23,
                          units: '/min',
                          precision: 0
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
};

export const mockData = {
  aql: 'SELECT w/data[at0001]/items[at0009],\n       w/data[at0001]/items[at0006]/value,\n       w/data[at0001]/items[at0002]/value\nFROM EHR e\nCONTAINS COMPOSITION c\nCONTAINS EVALUATION w[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1] \nOFFSET 0 LIMIT 10',
  executedAql: 'SELECT w/data[at0001]/items[at0009],\n       w/data[at0001]/items[at0006]/value,\n       w/data[at0001]/items[at0002]/value\nFROM EHR e\nCONTAINS COMPOSITION c\nCONTAINS EVALUATION w[openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1] \nOFFSET 0 LIMIT 10',
  resultSet: [
    {
      '#0': null,
      '#1': {
        '@class': 'DV_TEXT',
        value: 'test'
      },
      '#2': {
        '@class': 'DV_TEXT',
        value: 'test'
      }
    },
    {
      '#0': {
        '@class': 'CLUSTER',
        name: {
          '@class': 'DV_TEXT',
          value: 'Reaction event summary'
        },
        archetype_node_id: 'at0009',
        items: [
          {
            '@class': 'ELEMENT',
            name: {
              '@class': 'DV_TEXT',
              value: 'Clinical Impact'
            },
            archetype_node_id: 'at0017',
            value: {
              '@class': 'DV_CODED_TEXT',
              value: 'Significant',
              defining_code: {
                '@class': 'CODE_PHRASE',
                terminology_id: {
                  '@class': 'TERMINOLOGY_ID',
                  value: 'local'
                },
                code_string: 'at0037'
              }
            }
          },
          {
            '@class': 'ELEMENT',
            name: {
              '@class': 'DV_TEXT',
              value: 'Certainty'
            },
            archetype_node_id: 'at0021',
            value: {
              '@class': 'DV_CODED_TEXT',
              value: 'Suspected',
              defining_code: {
                '@class': 'CODE_PHRASE',
                terminology_id: {
                  '@class': 'TERMINOLOGY_ID',
                  value: 'local'
                },
                code_string: 'at0022'
              }
            }
          }
        ]
      },
      '#1': null,
      '#2': {
        '@class': 'DV_CODED_TEXT',
        value: 'Mites',
        defining_code: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'local'
          },
          code_string: 'at0.61'
        }
      }
    },
    {
      '#0': {
        '@class': 'CLUSTER',
        name: {
          '@class': 'DV_TEXT',
          value: 'Reaction event summary'
        },
        archetype_node_id: 'at0009',
        items: [
          {
            '@class': 'ELEMENT',
            name: {
              '@class': 'DV_TEXT',
              value: 'Clinical Impact'
            },
            archetype_node_id: 'at0017',
            value: {
              '@class': 'DV_CODED_TEXT',
              value: 'Insignificant',
              defining_code: {
                '@class': 'CODE_PHRASE',
                terminology_id: {
                  '@class': 'TERMINOLOGY_ID',
                  value: 'local'
                },
                code_string: 'at0036'
              }
            }
          },
          {
            '@class': 'ELEMENT',
            name: {
              '@class': 'DV_TEXT',
              value: 'Certainty'
            },
            archetype_node_id: 'at0021',
            value: {
              '@class': 'DV_CODED_TEXT',
              value: 'Confirmed',
              defining_code: {
                '@class': 'CODE_PHRASE',
                terminology_id: {
                  '@class': 'TERMINOLOGY_ID',
                  value: 'local'
                },
                code_string: 'at0024'
              }
            }
          }
        ]
      },
      '#1': null,
      '#2': {
        '@class': 'DV_CODED_TEXT',
        value: 'Dog fur/hair',
        defining_code: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'local'
          },
          code_string: 'at0.63'
        }
      }
    },
    {
      '#0': {
        '@class': 'CLUSTER',
        name: {
          '@class': 'DV_TEXT',
          value: 'Reaction event summary'
        },
        archetype_node_id: 'at0009',
        items: [
          {
            '@class': 'ELEMENT',
            name: {
              '@class': 'DV_TEXT',
              value: 'Clinical Impact'
            },
            archetype_node_id: 'at0017',
            value: {
              '@class': 'DV_CODED_TEXT',
              value: 'Insignificant',
              defining_code: {
                '@class': 'CODE_PHRASE',
                terminology_id: {
                  '@class': 'TERMINOLOGY_ID',
                  value: 'local'
                },
                code_string: 'at0036'
              }
            }
          },
          {
            '@class': 'ELEMENT',
            name: {
              '@class': 'DV_TEXT',
              value: 'Certainty'
            },
            archetype_node_id: 'at0021',
            value: {
              '@class': 'DV_CODED_TEXT',
              value: 'Confirmed',
              defining_code: {
                '@class': 'CODE_PHRASE',
                terminology_id: {
                  '@class': 'TERMINOLOGY_ID',
                  value: 'local'
                },
                code_string: 'at0024'
              }
            }
          }
        ]
      },
      '#1': null,
      '#2': {
        '@class': 'DV_CODED_TEXT',
        value: 'Dog fur/hair',
        defining_code: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'local'
          },
          code_string: 'at0.63'
        }
      }
    },
    {
      '#0': {
        '@class': 'CLUSTER',
        name: {
          '@class': 'DV_TEXT',
          value: 'Reaction event summary'
        },
        archetype_node_id: 'at0009',
        items: [
          {
            '@class': 'ELEMENT',
            name: {
              '@class': 'DV_TEXT',
              value: 'Clinical Impact'
            },
            archetype_node_id: 'at0017',
            value: {
              '@class': 'DV_CODED_TEXT',
              value: 'Significant',
              defining_code: {
                '@class': 'CODE_PHRASE',
                terminology_id: {
                  '@class': 'TERMINOLOGY_ID',
                  value: 'local'
                },
                code_string: 'at0037'
              }
            }
          },
          {
            '@class': 'ELEMENT',
            name: {
              '@class': 'DV_TEXT',
              value: 'Certainty'
            },
            archetype_node_id: 'at0021',
            value: {
              '@class': 'DV_CODED_TEXT',
              value: 'Suspected',
              defining_code: {
                '@class': 'CODE_PHRASE',
                terminology_id: {
                  '@class': 'TERMINOLOGY_ID',
                  value: 'local'
                },
                code_string: 'at0022'
              }
            }
          }
        ]
      },
      '#1': null,
      '#2': {
        '@class': 'DV_CODED_TEXT',
        value: 'Mites',
        defining_code: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'local'
          },
          code_string: 'at0.61'
        }
      }
    },
    {
      '#0': {
        '@class': 'CLUSTER',
        name: {
          '@class': 'DV_TEXT',
          value: 'Reaction event summary'
        },
        archetype_node_id: 'at0009',
        items: [
          {
            '@class': 'ELEMENT',
            name: {
              '@class': 'DV_TEXT',
              value: 'Clinical Impact'
            },
            archetype_node_id: 'at0017',
            value: {
              '@class': 'DV_CODED_TEXT',
              value: 'Insignificant',
              defining_code: {
                '@class': 'CODE_PHRASE',
                terminology_id: {
                  '@class': 'TERMINOLOGY_ID',
                  value: 'local'
                },
                code_string: 'at0036'
              }
            }
          },
          {
            '@class': 'ELEMENT',
            name: {
              '@class': 'DV_TEXT',
              value: 'Certainty'
            },
            archetype_node_id: 'at0021',
            value: {
              '@class': 'DV_CODED_TEXT',
              value: 'Confirmed',
              defining_code: {
                '@class': 'CODE_PHRASE',
                terminology_id: {
                  '@class': 'TERMINOLOGY_ID',
                  value: 'local'
                },
                code_string: 'at0024'
              }
            }
          }
        ]
      },
      '#1': null,
      '#2': {
        '@class': 'DV_CODED_TEXT',
        value: 'Dog fur/hair',
        defining_code: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'local'
          },
          code_string: 'at0.63'
        }
      }
    },
    {
      '#0': {
        '@class': 'CLUSTER',
        name: {
          '@class': 'DV_TEXT',
          value: 'Reaction event summary'
        },
        archetype_node_id: 'at0009',
        items: [
          {
            '@class': 'ELEMENT',
            name: {
              '@class': 'DV_TEXT',
              value: 'Clinical Impact'
            },
            archetype_node_id: 'at0017',
            value: {
              '@class': 'DV_CODED_TEXT',
              value: 'Insignificant',
              defining_code: {
                '@class': 'CODE_PHRASE',
                terminology_id: {
                  '@class': 'TERMINOLOGY_ID',
                  value: 'local'
                },
                code_string: 'at0036'
              }
            }
          },
          {
            '@class': 'ELEMENT',
            name: {
              '@class': 'DV_TEXT',
              value: 'Certainty'
            },
            archetype_node_id: 'at0021',
            value: {
              '@class': 'DV_CODED_TEXT',
              value: 'Confirmed',
              defining_code: {
                '@class': 'CODE_PHRASE',
                terminology_id: {
                  '@class': 'TERMINOLOGY_ID',
                  value: 'local'
                },
                code_string: 'at0024'
              }
            }
          }
        ]
      },
      '#1': null,
      '#2': {
        '@class': 'DV_CODED_TEXT',
        value: 'Dog fur/hair',
        defining_code: {
          '@class': 'CODE_PHRASE',
          terminology_id: {
            '@class': 'TERMINOLOGY_ID',
            value: 'local'
          },
          code_string: 'at0.63'
        }
      }
    },
    {
      '#0': {
        '@class': 'CLUSTER',
        name: {
          '@class': 'DV_TEXT',
          value: 'Reaction event summary'
        },
        archetype_node_id: 'at0009',
        items: [
          {
            '@class': 'ELEMENT',
            name: {
              '@class': 'DV_TEXT',
              value: 'Clinical Impact'
            },
            archetype_node_id: 'at0017',
            value: {
              '@class': 'DV_CODED_TEXT',
              value: 'Insignificant',
              defining_code: {
                '@class': 'CODE_PHRASE',
                terminology_id: {
                  '@class': 'TERMINOLOGY_ID',
                  value: 'local'
                },
                code_string: 'at0036'
              }
            }
          }
        ]
      },
      '#1': {
        '@class': 'DV_TEXT',
        value: 'preko add'
      },
      '#2': {
        '@class': 'DV_TEXT',
        value: 'test'
      }
    },
    {
      '#0': {
        '@class': 'CLUSTER',
        name: {
          '@class': 'DV_TEXT',
          value: 'Reaction event summary'
        },
        archetype_node_id: 'at0009',
        items: [
          {
            '@class': 'ELEMENT',
            name: {
              '@class': 'DV_TEXT',
              value: 'Clinical Impact'
            },
            archetype_node_id: 'at0017',
            value: {
              '@class': 'DV_CODED_TEXT',
              value: 'Insignificant',
              defining_code: {
                '@class': 'CODE_PHRASE',
                terminology_id: {
                  '@class': 'TERMINOLOGY_ID',
                  value: 'local'
                },
                code_string: 'at0036'
              }
            }
          }
        ]
      },
      '#1': null,
      '#2': {
        '@class': 'DV_TEXT',
        value: 'test'
      }
    },
    {
      '#0': null,
      '#1': null,
      '#2': {
        '@class': 'DV_TEXT',
        value: 'dsdasdsadsa'
      }
    }
  ]
};

export const compactTableSanitizedData = {
  '#0': [
    null,
    {
      '@class': 'CLUSTER',
      name: {
        '@class': 'DV_TEXT',
        value: 'Reaction event summary'
      },
      archetype_node_id: 'at0009',
      items: [
        {
          '@class': 'ELEMENT',
          name: {
            '@class': 'DV_TEXT',
            value: 'Clinical Impact'
          },
          archetype_node_id: 'at0017',
          value: {
            '@class': 'DV_CODED_TEXT',
            value: 'Significant',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'local'
              },
              code_string: 'at0037'
            }
          }
        },
        {
          '@class': 'ELEMENT',
          name: {
            '@class': 'DV_TEXT',
            value: 'Certainty'
          },
          archetype_node_id: 'at0021',
          value: {
            '@class': 'DV_CODED_TEXT',
            value: 'Suspected',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'local'
              },
              code_string: 'at0022'
            }
          }
        }
      ]
    },
    {
      '@class': 'CLUSTER',
      name: {
        '@class': 'DV_TEXT',
        value: 'Reaction event summary'
      },
      archetype_node_id: 'at0009',
      items: [
        {
          '@class': 'ELEMENT',
          name: {
            '@class': 'DV_TEXT',
            value: 'Clinical Impact'
          },
          archetype_node_id: 'at0017',
          value: {
            '@class': 'DV_CODED_TEXT',
            value: 'Insignificant',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'local'
              },
              code_string: 'at0036'
            }
          }
        },
        {
          '@class': 'ELEMENT',
          name: {
            '@class': 'DV_TEXT',
            value: 'Certainty'
          },
          archetype_node_id: 'at0021',
          value: {
            '@class': 'DV_CODED_TEXT',
            value: 'Confirmed',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'local'
              },
              code_string: 'at0024'
            }
          }
        }
      ]
    },
    {
      '@class': 'CLUSTER',
      name: {
        '@class': 'DV_TEXT',
        value: 'Reaction event summary'
      },
      archetype_node_id: 'at0009',
      items: [
        {
          '@class': 'ELEMENT',
          name: {
            '@class': 'DV_TEXT',
            value: 'Clinical Impact'
          },
          archetype_node_id: 'at0017',
          value: {
            '@class': 'DV_CODED_TEXT',
            value: 'Insignificant',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'local'
              },
              code_string: 'at0036'
            }
          }
        },
        {
          '@class': 'ELEMENT',
          name: {
            '@class': 'DV_TEXT',
            value: 'Certainty'
          },
          archetype_node_id: 'at0021',
          value: {
            '@class': 'DV_CODED_TEXT',
            value: 'Confirmed',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'local'
              },
              code_string: 'at0024'
            }
          }
        }
      ]
    },
    {
      '@class': 'CLUSTER',
      name: {
        '@class': 'DV_TEXT',
        value: 'Reaction event summary'
      },
      archetype_node_id: 'at0009',
      items: [
        {
          '@class': 'ELEMENT',
          name: {
            '@class': 'DV_TEXT',
            value: 'Clinical Impact'
          },
          archetype_node_id: 'at0017',
          value: {
            '@class': 'DV_CODED_TEXT',
            value: 'Significant',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'local'
              },
              code_string: 'at0037'
            }
          }
        },
        {
          '@class': 'ELEMENT',
          name: {
            '@class': 'DV_TEXT',
            value: 'Certainty'
          },
          archetype_node_id: 'at0021',
          value: {
            '@class': 'DV_CODED_TEXT',
            value: 'Suspected',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'local'
              },
              code_string: 'at0022'
            }
          }
        }
      ]
    },
    {
      '@class': 'CLUSTER',
      name: {
        '@class': 'DV_TEXT',
        value: 'Reaction event summary'
      },
      archetype_node_id: 'at0009',
      items: [
        {
          '@class': 'ELEMENT',
          name: {
            '@class': 'DV_TEXT',
            value: 'Clinical Impact'
          },
          archetype_node_id: 'at0017',
          value: {
            '@class': 'DV_CODED_TEXT',
            value: 'Insignificant',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'local'
              },
              code_string: 'at0036'
            }
          }
        },
        {
          '@class': 'ELEMENT',
          name: {
            '@class': 'DV_TEXT',
            value: 'Certainty'
          },
          archetype_node_id: 'at0021',
          value: {
            '@class': 'DV_CODED_TEXT',
            value: 'Confirmed',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'local'
              },
              code_string: 'at0024'
            }
          }
        }
      ]
    },
    {
      '@class': 'CLUSTER',
      name: {
        '@class': 'DV_TEXT',
        value: 'Reaction event summary'
      },
      archetype_node_id: 'at0009',
      items: [
        {
          '@class': 'ELEMENT',
          name: {
            '@class': 'DV_TEXT',
            value: 'Clinical Impact'
          },
          archetype_node_id: 'at0017',
          value: {
            '@class': 'DV_CODED_TEXT',
            value: 'Insignificant',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'local'
              },
              code_string: 'at0036'
            }
          }
        },
        {
          '@class': 'ELEMENT',
          name: {
            '@class': 'DV_TEXT',
            value: 'Certainty'
          },
          archetype_node_id: 'at0021',
          value: {
            '@class': 'DV_CODED_TEXT',
            value: 'Confirmed',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'local'
              },
              code_string: 'at0024'
            }
          }
        }
      ]
    },
    {
      '@class': 'CLUSTER',
      name: {
        '@class': 'DV_TEXT',
        value: 'Reaction event summary'
      },
      archetype_node_id: 'at0009',
      items: [
        {
          '@class': 'ELEMENT',
          name: {
            '@class': 'DV_TEXT',
            value: 'Clinical Impact'
          },
          archetype_node_id: 'at0017',
          value: {
            '@class': 'DV_CODED_TEXT',
            value: 'Insignificant',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'local'
              },
              code_string: 'at0036'
            }
          }
        }
      ]
    },
    {
      '@class': 'CLUSTER',
      name: {
        '@class': 'DV_TEXT',
        value: 'Reaction event summary'
      },
      archetype_node_id: 'at0009',
      items: [
        {
          '@class': 'ELEMENT',
          name: {
            '@class': 'DV_TEXT',
            value: 'Clinical Impact'
          },
          archetype_node_id: 'at0017',
          value: {
            '@class': 'DV_CODED_TEXT',
            value: 'Insignificant',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'local'
              },
              code_string: 'at0036'
            }
          }
        }
      ]
    },
    null
  ],
  'DV_TEXT:::#1': [
    {
      '@class': 'DV_TEXT',
      value: 'test'
    },
    null,
    null,
    null,
    null,
    null,
    null,
    {
      '@class': 'DV_TEXT',
      value: 'preko add'
    },
    null,
    null
  ],
  'DV_TEXT:::#2': [
    {
      '@class': 'DV_TEXT',
      value: 'test'
    },
    {
      '@class': 'DV_CODED_TEXT',
      value: 'Mites',
      defining_code: {
        '@class': 'CODE_PHRASE',
        terminology_id: {
          '@class': 'TERMINOLOGY_ID',
          value: 'local'
        },
        code_string: 'at0.61'
      }
    },
    {
      '@class': 'DV_CODED_TEXT',
      value: 'Dog fur/hair',
      defining_code: {
        '@class': 'CODE_PHRASE',
        terminology_id: {
          '@class': 'TERMINOLOGY_ID',
          value: 'local'
        },
        code_string: 'at0.63'
      }
    },
    {
      '@class': 'DV_CODED_TEXT',
      value: 'Dog fur/hair',
      defining_code: {
        '@class': 'CODE_PHRASE',
        terminology_id: {
          '@class': 'TERMINOLOGY_ID',
          value: 'local'
        },
        code_string: 'at0.63'
      }
    },
    {
      '@class': 'DV_CODED_TEXT',
      value: 'Mites',
      defining_code: {
        '@class': 'CODE_PHRASE',
        terminology_id: {
          '@class': 'TERMINOLOGY_ID',
          value: 'local'
        },
        code_string: 'at0.61'
      }
    },
    {
      '@class': 'DV_CODED_TEXT',
      value: 'Dog fur/hair',
      defining_code: {
        '@class': 'CODE_PHRASE',
        terminology_id: {
          '@class': 'TERMINOLOGY_ID',
          value: 'local'
        },
        code_string: 'at0.63'
      }
    },
    {
      '@class': 'DV_CODED_TEXT',
      value: 'Dog fur/hair',
      defining_code: {
        '@class': 'CODE_PHRASE',
        terminology_id: {
          '@class': 'TERMINOLOGY_ID',
          value: 'local'
        },
        code_string: 'at0.63'
      }
    },
    {
      '@class': 'DV_TEXT',
      value: 'test'
    },
    {
      '@class': 'DV_TEXT',
      value: 'test'
    },
    {
      '@class': 'DV_TEXT',
      value: 'dsdasdsadsa'
    }
  ]
};

export const detailedTableDetailedData = {
  '#0': [
    null,
    {
      '@class': 'CLUSTER',
      name: {
        '@class': 'DV_TEXT',
        value: 'Reaction event summary'
      },
      archetype_node_id: 'at0009',
      items: [
        {
          '@class': 'ELEMENT',
          name: {
            '@class': 'DV_TEXT',
            value: 'Clinical Impact'
          },
          archetype_node_id: 'at0017',
          value: {
            '@class': 'DV_CODED_TEXT',
            value: 'Significant',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'local'
              },
              code_string: 'at0037'
            }
          }
        },
        {
          '@class': 'ELEMENT',
          name: {
            '@class': 'DV_TEXT',
            value: 'Certainty'
          },
          archetype_node_id: 'at0021',
          value: {
            '@class': 'DV_CODED_TEXT',
            value: 'Suspected',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'local'
              },
              code_string: 'at0022'
            }
          }
        }
      ]
    },
    {
      '@class': 'CLUSTER',
      name: {
        '@class': 'DV_TEXT',
        value: 'Reaction event summary'
      },
      archetype_node_id: 'at0009',
      items: [
        {
          '@class': 'ELEMENT',
          name: {
            '@class': 'DV_TEXT',
            value: 'Clinical Impact'
          },
          archetype_node_id: 'at0017',
          value: {
            '@class': 'DV_CODED_TEXT',
            value: 'Insignificant',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'local'
              },
              code_string: 'at0036'
            }
          }
        },
        {
          '@class': 'ELEMENT',
          name: {
            '@class': 'DV_TEXT',
            value: 'Certainty'
          },
          archetype_node_id: 'at0021',
          value: {
            '@class': 'DV_CODED_TEXT',
            value: 'Confirmed',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'local'
              },
              code_string: 'at0024'
            }
          }
        }
      ]
    },
    {
      '@class': 'CLUSTER',
      name: {
        '@class': 'DV_TEXT',
        value: 'Reaction event summary'
      },
      archetype_node_id: 'at0009',
      items: [
        {
          '@class': 'ELEMENT',
          name: {
            '@class': 'DV_TEXT',
            value: 'Clinical Impact'
          },
          archetype_node_id: 'at0017',
          value: {
            '@class': 'DV_CODED_TEXT',
            value: 'Insignificant',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'local'
              },
              code_string: 'at0036'
            }
          }
        },
        {
          '@class': 'ELEMENT',
          name: {
            '@class': 'DV_TEXT',
            value: 'Certainty'
          },
          archetype_node_id: 'at0021',
          value: {
            '@class': 'DV_CODED_TEXT',
            value: 'Confirmed',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'local'
              },
              code_string: 'at0024'
            }
          }
        }
      ]
    },
    {
      '@class': 'CLUSTER',
      name: {
        '@class': 'DV_TEXT',
        value: 'Reaction event summary'
      },
      archetype_node_id: 'at0009',
      items: [
        {
          '@class': 'ELEMENT',
          name: {
            '@class': 'DV_TEXT',
            value: 'Clinical Impact'
          },
          archetype_node_id: 'at0017',
          value: {
            '@class': 'DV_CODED_TEXT',
            value: 'Significant',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'local'
              },
              code_string: 'at0037'
            }
          }
        },
        {
          '@class': 'ELEMENT',
          name: {
            '@class': 'DV_TEXT',
            value: 'Certainty'
          },
          archetype_node_id: 'at0021',
          value: {
            '@class': 'DV_CODED_TEXT',
            value: 'Suspected',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'local'
              },
              code_string: 'at0022'
            }
          }
        }
      ]
    },
    {
      '@class': 'CLUSTER',
      name: {
        '@class': 'DV_TEXT',
        value: 'Reaction event summary'
      },
      archetype_node_id: 'at0009',
      items: [
        {
          '@class': 'ELEMENT',
          name: {
            '@class': 'DV_TEXT',
            value: 'Clinical Impact'
          },
          archetype_node_id: 'at0017',
          value: {
            '@class': 'DV_CODED_TEXT',
            value: 'Insignificant',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'local'
              },
              code_string: 'at0036'
            }
          }
        },
        {
          '@class': 'ELEMENT',
          name: {
            '@class': 'DV_TEXT',
            value: 'Certainty'
          },
          archetype_node_id: 'at0021',
          value: {
            '@class': 'DV_CODED_TEXT',
            value: 'Confirmed',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'local'
              },
              code_string: 'at0024'
            }
          }
        }
      ]
    },
    {
      '@class': 'CLUSTER',
      name: {
        '@class': 'DV_TEXT',
        value: 'Reaction event summary'
      },
      archetype_node_id: 'at0009',
      items: [
        {
          '@class': 'ELEMENT',
          name: {
            '@class': 'DV_TEXT',
            value: 'Clinical Impact'
          },
          archetype_node_id: 'at0017',
          value: {
            '@class': 'DV_CODED_TEXT',
            value: 'Insignificant',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'local'
              },
              code_string: 'at0036'
            }
          }
        },
        {
          '@class': 'ELEMENT',
          name: {
            '@class': 'DV_TEXT',
            value: 'Certainty'
          },
          archetype_node_id: 'at0021',
          value: {
            '@class': 'DV_CODED_TEXT',
            value: 'Confirmed',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'local'
              },
              code_string: 'at0024'
            }
          }
        }
      ]
    },
    {
      '@class': 'CLUSTER',
      name: {
        '@class': 'DV_TEXT',
        value: 'Reaction event summary'
      },
      archetype_node_id: 'at0009',
      items: [
        {
          '@class': 'ELEMENT',
          name: {
            '@class': 'DV_TEXT',
            value: 'Clinical Impact'
          },
          archetype_node_id: 'at0017',
          value: {
            '@class': 'DV_CODED_TEXT',
            value: 'Insignificant',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'local'
              },
              code_string: 'at0036'
            }
          }
        }
      ]
    },
    {
      '@class': 'CLUSTER',
      name: {
        '@class': 'DV_TEXT',
        value: 'Reaction event summary'
      },
      archetype_node_id: 'at0009',
      items: [
        {
          '@class': 'ELEMENT',
          name: {
            '@class': 'DV_TEXT',
            value: 'Clinical Impact'
          },
          archetype_node_id: 'at0017',
          value: {
            '@class': 'DV_CODED_TEXT',
            value: 'Insignificant',
            defining_code: {
              '@class': 'CODE_PHRASE',
              terminology_id: {
                '@class': 'TERMINOLOGY_ID',
                value: 'local'
              },
              code_string: 'at0036'
            }
          }
        }
      ]
    },
    null
  ],
  'DV_TEXT:::#1': [
    {
      '@class': 'DV_TEXT',
      value: 'test'
    },
    null,
    null,
    null,
    null,
    null,
    null,
    {
      '@class': 'DV_TEXT',
      value: 'preko add'
    },
    null,
    null
  ],
  'DV_TEXT:::#2': [
    {
      '@class': 'DV_TEXT',
      value: 'test'
    },
    {
      '@class': 'DV_CODED_TEXT',
      value: 'Mites',
      defining_code: {
        '@class': 'CODE_PHRASE',
        terminology_id: {
          '@class': 'TERMINOLOGY_ID',
          value: 'local'
        },
        code_string: 'at0.61'
      }
    },
    {
      '@class': 'DV_CODED_TEXT',
      value: 'Dog fur/hair',
      defining_code: {
        '@class': 'CODE_PHRASE',
        terminology_id: {
          '@class': 'TERMINOLOGY_ID',
          value: 'local'
        },
        code_string: 'at0.63'
      }
    },
    {
      '@class': 'DV_CODED_TEXT',
      value: 'Dog fur/hair',
      defining_code: {
        '@class': 'CODE_PHRASE',
        terminology_id: {
          '@class': 'TERMINOLOGY_ID',
          value: 'local'
        },
        code_string: 'at0.63'
      }
    },
    {
      '@class': 'DV_CODED_TEXT',
      value: 'Mites',
      defining_code: {
        '@class': 'CODE_PHRASE',
        terminology_id: {
          '@class': 'TERMINOLOGY_ID',
          value: 'local'
        },
        code_string: 'at0.61'
      }
    },
    {
      '@class': 'DV_CODED_TEXT',
      value: 'Dog fur/hair',
      defining_code: {
        '@class': 'CODE_PHRASE',
        terminology_id: {
          '@class': 'TERMINOLOGY_ID',
          value: 'local'
        },
        code_string: 'at0.63'
      }
    },
    {
      '@class': 'DV_CODED_TEXT',
      value: 'Dog fur/hair',
      defining_code: {
        '@class': 'CODE_PHRASE',
        terminology_id: {
          '@class': 'TERMINOLOGY_ID',
          value: 'local'
        },
        code_string: 'at0.63'
      }
    },
    {
      '@class': 'DV_TEXT',
      value: 'test'
    },
    {
      '@class': 'DV_TEXT',
      value: 'test'
    },
    {
      '@class': 'DV_TEXT',
      value: 'dsdasdsadsa'
    }
  ]
};

export const nodeMock = {
  '@class': 'ELEMENT',
  name: {
    '@class': 'DV_TEXT',
    value: 'Clinical Impact'
  },
  archetype_node_id: 'at0017',
  value: {
    '@class': 'DV_CODED_TEXT',
    value: 'Significant',
    defining_code: {
      '@class': 'CODE_PHRASE',
      terminology_id: {
        '@class': 'TERMINOLOGY_ID',
        value: 'local'
      },
      code_string: 'at0037'
    }
  }
};

export const squashResultSet = {
  aql: 'SELECT c/uid/value as cuid,\nc/context/start_time/value as completed,\n' +
    'e/ehr_status/subject/external_ref/id/value as mrn,' +
    '\nSQUASH(g/data[at0001]/items[at0006]/items[openEHR-EHR-CLUSTER.generic_assessment.v0,\'Communication\']/items[at0009]/items[at0013]/value/value) as com_assessment_findings\n' +
    'FROM EHR e\nCONTAINS top 1 COMPOSITION c[openEHR-EHR-COMPOSITION.encounter.v1]\nCONTAINS EVALUATION g[openEHR-EHR-EVALUATION.generic_assessment_collection.v0]\n' +
    'WHERE c/name/value = "About Me"\nAND completed > \'2020-08-11T10:00:00+01:00\'\nORDER BY c/context/start_time/value DESC\nOFFSET 1 LIMIT 5',
  executedAql: 'SELECT c/uid/value as cuid,\nc/context/start_time/value as completed,\ne/ehr_status/subject/external_ref/id/value as mrn,' +
    '\nSQUASH(g/data[at0001]/items[at0006]/items[openEHR-EHR-CLUSTER.generic_assessment.v0,\'Communication\']/items[at0009]/items[at0013]/value/value) as com_assessment_findings\n' +
    'FROM EHR e\nCONTAINS top 1 COMPOSITION c[openEHR-EHR-COMPOSITION.encounter.v1]\nCONTAINS EVALUATION g[openEHR-EHR-EVALUATION.generic_assessment_collection.v0]\n' +
    'WHERE c/name/value = "About Me"\nAND completed > \'2020-08-11T10:00:00+01:00\'\nORDER BY c/context/start_time/value DESC\nOFFSET 1 LIMIT 5',
  resultSet: [{
    cuid: '0b96249b-9d55-436e-96ac-755f368adb21::default::1',
    completed: '2020-09-11T10:37:00+01:00',
    mrn: '486943002',
    com_assessment_findings: ['Uses hearing aid', 'Registered partially sighted', 'Hearing difficulty', 'Registered deaf', 'Registered Blind']
  }, {
    cuid: '7fb9a2da-7445-4901-b505-014282f65b02::default::1',
    completed: '2020-09-08T09:23:00+01:00',
    mrn: '20200213001',
    com_assessment_findings: ['Registered deaf', 'Registered partially sighted', 'Registered Blind', 'Post-laryngectomy voice', 'Non-verbal communication', 'Confused', 'Dementia']
  }, {
    cuid: 'b5bbf8ff-49c8-402b-a181-a8c413ab2420::default::1',
    completed: '2020-08-19T15:06:00+02:00',
    mrn: '897200',
    com_assessment_findings: ['Uses hearing aid', 'Wears Glasses', 'Post-laryngectomy voice', 'Interpreter needed']
  }, {
    cuid: '148d0e37-c680-419a-bfb4-0fbf0c2daf7d::default::1',
    completed: '2020-08-19T13:17:00+02:00',
    mrn: '1234564',
    com_assessment_findings: ['Normal']
  }]
};
