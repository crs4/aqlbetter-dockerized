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


// tslint:disable
import { AqlResultMetadata } from '@bettercare/aql-result-table';

export const resultWithDataMock: AqlResultMetadata = {
  meta: {href: 'https://tools-internal.app.better.care/rest/v1/query/'},
  aql: 'SELECT c AS Allergies\nFROM EHR e\nCONTAINS COMPOSITION c[openEHR-EHR-COMPOSITION.summary.v1]\nWHERE c/name/value=\'Allergies\'\nOFFSET 0 LIMIT 5',
  executedAql: 'SELECT c AS Allergies\nFROM EHR e\nCONTAINS COMPOSITION c[openEHR-EHR-COMPOSITION.summary.v1]\nWHERE c/name/value=\'Allergies\'\nOFFSET 0 LIMIT 5',
  resultSet: [{
    Allergies: {
      '@class': 'COMPOSITION',
      name: {'@class': 'DV_TEXT', value: 'Allergies'},
      uid: {'@class': 'OBJECT_VERSION_ID', value: '737f1412-567f-4eb9-813f-0c583d1e89ab::metod::1'},
      archetype_details: {
        '@class': 'ARCHETYPED',
        archetype_id: {'@class': 'ARCHETYPE_ID', value: 'openEHR-EHR-COMPOSITION.summary.v1'},
        template_id: {'@class': 'TEMPLATE_ID', value: 'Allergies'},
        rm_version: '1.0.4'
      },
      feeder_audit: {
        '@class': 'FEEDER_AUDIT',
        original_content: {'@class': 'DV_PARSABLE', value: '{}', formalism: 'application/json'},
        originating_system_audit: {'@class': 'FEEDER_AUDIT_DETAILS', system_id: 'FormRenderer'}
      },
      archetype_node_id: 'openEHR-EHR-COMPOSITION.summary.v1',
      language: {
        '@class': 'CODE_PHRASE',
        terminology_id: {'@class': 'TERMINOLOGY_ID', value: 'ISO_639-1'},
        code_string: 'en'
      },
      territory: {
        '@class': 'CODE_PHRASE',
        terminology_id: {'@class': 'TERMINOLOGY_ID', value: 'ISO_3166-1'},
        code_string: 'EN'
      },
      category: {
        '@class': 'DV_CODED_TEXT',
        value: 'persistent',
        defining_code: {
          '@class': 'CODE_PHRASE',
          terminology_id: {'@class': 'TERMINOLOGY_ID', value: 'openehr'},
          code_string: '431'
        }
      },
      composer: {'@class': 'PARTY_IDENTIFIED', name: 'metod'},
      content: [{
        '@class': 'EVALUATION',
        name: {'@class': 'DV_TEXT', value: 'Adverse Reaction - Allergy'},
        archetype_details: {
          '@class': 'ARCHETYPED',
          archetype_id: {'@class': 'ARCHETYPE_ID', value: 'openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1'},
          rm_version: '1.0.4'
        },
        archetype_node_id: 'openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1',
        language: {
          '@class': 'CODE_PHRASE',
          terminology_id: {'@class': 'TERMINOLOGY_ID', value: 'ISO_639-1'},
          code_string: 'en'
        },
        encoding: {
          '@class': 'CODE_PHRASE',
          terminology_id: {'@class': 'TERMINOLOGY_ID', value: 'IANA_character-sets'},
          code_string: 'UTF-8'
        },
        subject: {'@class': 'PARTY_SELF'},
        data: {
          '@class': 'ITEM_TREE',
          name: {'@class': 'DV_TEXT', value: 'Tree'},
          archetype_node_id: 'at0001',
          items: [{
            '@class': 'ELEMENT',
            name: {'@class': 'DV_TEXT', value: 'Substance/Agent'},
            archetype_node_id: 'at0002',
            value: {'@class': 'DV_TEXT', value: 'uu'}
          }, {
            '@class': 'ELEMENT',
            name: {'@class': 'DV_TEXT', value: 'Comment'},
            archetype_node_id: 'at0006',
            value: {'@class': 'DV_TEXT', value: 'uu'}
          }]
        }
      }]
    }
  }, {
    Allergies: {
      '@class': 'COMPOSITION',
      name: {'@class': 'DV_TEXT', value: 'Allergies'},
      uid: {'@class': 'OBJECT_VERSION_ID', value: '2b563900-a7ff-4638-9c57-c74c36ea103d::metod::1'},
      archetype_details: {
        '@class': 'ARCHETYPED',
        archetype_id: {'@class': 'ARCHETYPE_ID', value: 'openEHR-EHR-COMPOSITION.summary.v1'},
        template_id: {'@class': 'TEMPLATE_ID', value: 'Allergies'},
        rm_version: '1.0.4'
      },
      feeder_audit: {
        '@class': 'FEEDER_AUDIT',
        original_content: {'@class': 'DV_PARSABLE', value: '{}', formalism: 'application/json'},
        originating_system_audit: {'@class': 'FEEDER_AUDIT_DETAILS', system_id: 'FormRenderer'}
      },
      archetype_node_id: 'openEHR-EHR-COMPOSITION.summary.v1',
      language: {
        '@class': 'CODE_PHRASE',
        terminology_id: {'@class': 'TERMINOLOGY_ID', value: 'ISO_639-1'},
        code_string: 'en'
      },
      territory: {
        '@class': 'CODE_PHRASE',
        terminology_id: {'@class': 'TERMINOLOGY_ID', value: 'ISO_3166-1'},
        code_string: 'EN'
      },
      category: {
        '@class': 'DV_CODED_TEXT',
        value: 'persistent',
        defining_code: {
          '@class': 'CODE_PHRASE',
          terminology_id: {'@class': 'TERMINOLOGY_ID', value: 'openehr'},
          code_string: '431'
        }
      },
      composer: {'@class': 'PARTY_IDENTIFIED', name: 'metod'},
      content: [{
        '@class': 'EVALUATION',
        name: {'@class': 'DV_TEXT', value: 'Adverse Reaction - Allergy'},
        archetype_details: {
          '@class': 'ARCHETYPED',
          archetype_id: {'@class': 'ARCHETYPE_ID', value: 'openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1'},
          rm_version: '1.0.4'
        },
        archetype_node_id: 'openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1',
        language: {
          '@class': 'CODE_PHRASE',
          terminology_id: {'@class': 'TERMINOLOGY_ID', value: 'ISO_639-1'},
          code_string: 'en'
        },
        encoding: {
          '@class': 'CODE_PHRASE',
          terminology_id: {'@class': 'TERMINOLOGY_ID', value: 'IANA_character-sets'},
          code_string: 'UTF-8'
        },
        subject: {'@class': 'PARTY_SELF'},
        data: {
          '@class': 'ITEM_TREE',
          name: {'@class': 'DV_TEXT', value: 'Tree'},
          archetype_node_id: 'at0001',
          items: [{
            '@class': 'ELEMENT',
            name: {'@class': 'DV_TEXT', value: 'Substance/Agent'},
            archetype_node_id: 'at0002',
            value: {'@class': 'DV_TEXT', value: 'uu'}
          }, {
            '@class': 'ELEMENT',
            name: {'@class': 'DV_TEXT', value: 'Comment'},
            archetype_node_id: 'at0006',
            value: {'@class': 'DV_TEXT', value: 'uu'}
          }]
        }
      }]
    }
  }, {
    Allergies: {
      '@class': 'COMPOSITION',
      name: {'@class': 'DV_TEXT', value: 'Allergies'},
      uid: {'@class': 'OBJECT_VERSION_ID', value: 'af90fe23-7083-48d8-aad7-c878598ff205::metod::1'},
      archetype_details: {
        '@class': 'ARCHETYPED',
        archetype_id: {'@class': 'ARCHETYPE_ID', value: 'openEHR-EHR-COMPOSITION.summary.v1'},
        template_id: {'@class': 'TEMPLATE_ID', value: 'Allergies'},
        rm_version: '1.0.4'
      },
      feeder_audit: {
        '@class': 'FEEDER_AUDIT',
        original_content: {'@class': 'DV_PARSABLE', value: '{}', formalism: 'application/json'},
        originating_system_audit: {'@class': 'FEEDER_AUDIT_DETAILS', system_id: 'FormRenderer'}
      },
      archetype_node_id: 'openEHR-EHR-COMPOSITION.summary.v1',
      language: {
        '@class': 'CODE_PHRASE',
        terminology_id: {'@class': 'TERMINOLOGY_ID', value: 'ISO_639-1'},
        code_string: 'en'
      },
      territory: {
        '@class': 'CODE_PHRASE',
        terminology_id: {'@class': 'TERMINOLOGY_ID', value: 'ISO_3166-1'},
        code_string: 'EN'
      },
      category: {
        '@class': 'DV_CODED_TEXT',
        value: 'persistent',
        defining_code: {
          '@class': 'CODE_PHRASE',
          terminology_id: {'@class': 'TERMINOLOGY_ID', value: 'openehr'},
          code_string: '431'
        }
      },
      composer: {'@class': 'PARTY_IDENTIFIED', name: 'metod'},
      content: [{
        '@class': 'EVALUATION',
        name: {'@class': 'DV_TEXT', value: 'Adverse Reaction - Allergy'},
        archetype_details: {
          '@class': 'ARCHETYPED',
          archetype_id: {'@class': 'ARCHETYPE_ID', value: 'openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1'},
          rm_version: '1.0.4'
        },
        archetype_node_id: 'openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1',
        language: {
          '@class': 'CODE_PHRASE',
          terminology_id: {'@class': 'TERMINOLOGY_ID', value: 'ISO_639-1'},
          code_string: 'en'
        },
        encoding: {
          '@class': 'CODE_PHRASE',
          terminology_id: {'@class': 'TERMINOLOGY_ID', value: 'IANA_character-sets'},
          code_string: 'UTF-8'
        },
        subject: {'@class': 'PARTY_SELF'},
        data: {
          '@class': 'ITEM_TREE',
          name: {'@class': 'DV_TEXT', value: 'Tree'},
          archetype_node_id: 'at0001',
          items: [{
            '@class': 'ELEMENT',
            name: {'@class': 'DV_TEXT', value: 'Substance/Agent'},
            archetype_node_id: 'at0002',
            value: {'@class': 'DV_TEXT', value: '12'}
          }]
        }
      }]
    }
  }, {
    Allergies: {
      '@class': 'COMPOSITION',
      name: {'@class': 'DV_TEXT', value: 'Allergies'},
      uid: {'@class': 'OBJECT_VERSION_ID', value: 'cfe79258-305a-43d2-b24c-3053efc07677::metod::1'},
      archetype_details: {
        '@class': 'ARCHETYPED',
        archetype_id: {'@class': 'ARCHETYPE_ID', value: 'openEHR-EHR-COMPOSITION.summary.v1'},
        template_id: {'@class': 'TEMPLATE_ID', value: 'Allergies'},
        rm_version: '1.0.4'
      },
      feeder_audit: {
        '@class': 'FEEDER_AUDIT',
        original_content: {'@class': 'DV_PARSABLE', value: '{}', formalism: 'application/json'},
        originating_system_audit: {'@class': 'FEEDER_AUDIT_DETAILS', system_id: 'FormRenderer'}
      },
      archetype_node_id: 'openEHR-EHR-COMPOSITION.summary.v1',
      language: {
        '@class': 'CODE_PHRASE',
        terminology_id: {'@class': 'TERMINOLOGY_ID', value: 'ISO_639-1'},
        code_string: 'en'
      },
      territory: {
        '@class': 'CODE_PHRASE',
        terminology_id: {'@class': 'TERMINOLOGY_ID', value: 'ISO_3166-1'},
        code_string: 'EN'
      },
      category: {
        '@class': 'DV_CODED_TEXT',
        value: 'persistent',
        defining_code: {
          '@class': 'CODE_PHRASE',
          terminology_id: {'@class': 'TERMINOLOGY_ID', value: 'openehr'},
          code_string: '431'
        }
      },
      composer: {'@class': 'PARTY_IDENTIFIED', name: 'metod'},
      content: [{
        '@class': 'EVALUATION',
        name: {'@class': 'DV_TEXT', value: 'Adverse Reaction - Allergy'},
        archetype_details: {
          '@class': 'ARCHETYPED',
          archetype_id: {'@class': 'ARCHETYPE_ID', value: 'openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1'},
          rm_version: '1.0.4'
        },
        archetype_node_id: 'openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1',
        language: {
          '@class': 'CODE_PHRASE',
          terminology_id: {'@class': 'TERMINOLOGY_ID', value: 'ISO_639-1'},
          code_string: 'en'
        },
        encoding: {
          '@class': 'CODE_PHRASE',
          terminology_id: {'@class': 'TERMINOLOGY_ID', value: 'IANA_character-sets'},
          code_string: 'UTF-8'
        },
        subject: {'@class': 'PARTY_SELF'},
        data: {
          '@class': 'ITEM_TREE',
          name: {'@class': 'DV_TEXT', value: 'Tree'},
          archetype_node_id: 'at0001',
          items: [{
            '@class': 'ELEMENT',
            name: {'@class': 'DV_TEXT', value: 'Substance/Agent'},
            archetype_node_id: 'at0002',
            value: {'@class': 'DV_TEXT', value: 'test'}
          }, {
            '@class': 'ELEMENT',
            name: {'@class': 'DV_TEXT', value: 'Comment'},
            archetype_node_id: 'at0006',
            value: {'@class': 'DV_TEXT', value: 'test'}
          }]
        }
      }]
    }
  }, {
    Allergies: {
      '@class': 'COMPOSITION',
      name: {'@class': 'DV_TEXT', value: 'Allergies'},
      uid: {'@class': 'OBJECT_VERSION_ID', value: '32a4a1b3-0854-4848-9fc4-f42aabf8d20a::metod::1'},
      archetype_details: {
        '@class': 'ARCHETYPED',
        archetype_id: {'@class': 'ARCHETYPE_ID', value: 'openEHR-EHR-COMPOSITION.summary.v1'},
        template_id: {'@class': 'TEMPLATE_ID', value: 'Allergies'},
        rm_version: '1.0.4'
      },
      feeder_audit: {
        '@class': 'FEEDER_AUDIT',
        original_content: {'@class': 'DV_PARSABLE', value: '{}', formalism: 'application/json'},
        originating_system_audit: {'@class': 'FEEDER_AUDIT_DETAILS', system_id: 'FormRenderer'}
      },
      archetype_node_id: 'openEHR-EHR-COMPOSITION.summary.v1',
      language: {
        '@class': 'CODE_PHRASE',
        terminology_id: {'@class': 'TERMINOLOGY_ID', value: 'ISO_639-1'},
        code_string: 'en'
      },
      territory: {
        '@class': 'CODE_PHRASE',
        terminology_id: {'@class': 'TERMINOLOGY_ID', value: 'ISO_3166-1'},
        code_string: 'EN'
      },
      category: {
        '@class': 'DV_CODED_TEXT',
        value: 'persistent',
        defining_code: {
          '@class': 'CODE_PHRASE',
          terminology_id: {'@class': 'TERMINOLOGY_ID', value: 'openehr'},
          code_string: '431'
        }
      },
      composer: {'@class': 'PARTY_IDENTIFIED', name: 'metod'},
      content: [{
        '@class': 'EVALUATION',
        name: {'@class': 'DV_TEXT', value: 'Adverse Reaction - Allergy'},
        archetype_details: {
          '@class': 'ARCHETYPED',
          archetype_id: {'@class': 'ARCHETYPE_ID', value: 'openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1'},
          rm_version: '1.0.4'
        },
        archetype_node_id: 'openEHR-EHR-EVALUATION.adverse_reaction-allergy.v1',
        language: {
          '@class': 'CODE_PHRASE',
          terminology_id: {'@class': 'TERMINOLOGY_ID', value: 'ISO_639-1'},
          code_string: 'en'
        },
        encoding: {
          '@class': 'CODE_PHRASE',
          terminology_id: {'@class': 'TERMINOLOGY_ID', value: 'IANA_character-sets'},
          code_string: 'UTF-8'
        },
        subject: {'@class': 'PARTY_SELF'},
        data: {
          '@class': 'ITEM_TREE',
          name: {'@class': 'DV_TEXT', value: 'Tree'},
          archetype_node_id: 'at0001',
          items: [{
            '@class': 'ELEMENT',
            name: {'@class': 'DV_TEXT', value: 'Substance/Agent'},
            archetype_node_id: 'at0002',
            value: {'@class': 'DV_TEXT', value: 'test'}
          }, {
            '@class': 'ELEMENT',
            name: {'@class': 'DV_TEXT', value: 'Comment'},
            archetype_node_id: 'at0006',
            value: {'@class': 'DV_TEXT', value: 'test'}
          }]
        }
      }]
    }
  }]
};
