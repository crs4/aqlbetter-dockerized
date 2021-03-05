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

/* tslint:disable */
export const laboratoryTestTemplate = {
  'meta': {'href': 'http://thinkehr.marand.si:18291/rest/v1/template/Laboratory%20test%20report'}, 'webTemplate': {
    'templateId': 'Laboratory test report', 'version': '2.3', 'defaultLanguage': 'en', 'languages': ['en'], 'tree': {
      'id': 'laboratory_test_report',
      'name': 'Laboratory test report',
      'localizedName': 'Laboratory test report',
      'rmType': 'COMPOSITION',
      'nodeId': 'openEHR-EHR-COMPOSITION.report-result.v1',
      'min': 1,
      'max': 1,
      'localizedNames': {'en': 'Laboratory test report'},
      'localizedDescriptions': {'en': 'Document to communicate information to others about the result of a test or assessment.'},
      'aqlPath': '',
      'children': [{
        'id': 'context',
        'rmType': 'EVENT_CONTEXT',
        'min': 1,
        'max': 1,
        'aqlPath': '/context',
        'children': [{
          'id': 'laboratory_order_id',
          'name': 'Laboratory order ID',
          'localizedName': 'Laboratory order ID',
          'rmType': 'DV_TEXT',
          'nodeId': 'at0002',
          'min': 0,
          'max': 1,
          'localizedNames': {'en': 'Laboratory order ID'},
          'localizedDescriptions': {'en': 'Identification information about the report.'},
          'aqlPath': '/context/other_context[at0001]/items[at0002,\'Laboratory order ID\']/value',
          'inputs': [{'type': 'TEXT'}]
        }, {
          'id': 'status',
          'name': 'Status',
          'localizedName': 'Status',
          'rmType': 'DV_TEXT',
          'nodeId': 'at0005',
          'min': 0,
          'max': 1,
          'localizedNames': {'en': 'Status'},
          'localizedDescriptions': {'en': 'The status of the entire report. Note: This is not the status of any of the report components.'},
          'aqlPath': '/context/other_context[at0001]/items[at0005]/value',
          'inputs': [{'type': 'TEXT'}]
        }, {
          'id': 'laboratory_context_details',
          'name': 'Laboratory context details',
          'localizedName': 'Laboratory context details',
          'rmType': 'CLUSTER',
          'nodeId': 'openEHR-EHR-CLUSTER.lab_context_details.v0',
          'min': 0,
          'max': -1,
          'localizedNames': {'en': 'Laboratory context details'},
          'localizedDescriptions': {'en': 'laboratory_context_details'},
          'aqlPath': '/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.lab_context_details.v0]',
          'children': [{
            'id': 'order_group_number',
            'name': 'Order group number',
            'localizedName': 'Order group number',
            'rmType': 'DV_TEXT',
            'nodeId': 'at0021',
            'min': 0,
            'max': 1,
            'localizedNames': {'en': 'Order group number'},
            'localizedDescriptions': {'en': '*'},
            'aqlPath': '/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.lab_context_details.v0]/items[at0021]/value',
            'inputs': [{'type': 'TEXT'}]
          }, {
            'id': 'central_case_id',
            'name': 'Central case ID',
            'localizedName': 'Central case ID',
            'rmType': 'DV_TEXT',
            'nodeId': 'at0001',
            'min': 0,
            'max': 1,
            'localizedNames': {'en': 'Central case ID'},
            'localizedDescriptions': {'en': '*'},
            'aqlPath': '/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.lab_context_details.v0]/items[at0001]/value',
            'inputs': [{'type': 'TEXT'}]
          }, {
            'id': 'episode_id',
            'name': 'Episode ID',
            'localizedName': 'Episode ID',
            'rmType': 'DV_TEXT',
            'nodeId': 'at0002',
            'min': 0,
            'max': 1,
            'localizedNames': {'en': 'Episode ID'},
            'localizedDescriptions': {'en': '*'},
            'aqlPath': '/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.lab_context_details.v0]/items[at0002]/value',
            'inputs': [{'type': 'TEXT'}]
          }, {
            'id': 'encounter_id',
            'name': 'Encounter ID',
            'localizedName': 'Encounter ID',
            'rmType': 'DV_TEXT',
            'nodeId': 'at0003',
            'min': 0,
            'max': 1,
            'localizedNames': {'en': 'Encounter ID'},
            'localizedDescriptions': {'en': '*'},
            'aqlPath': '/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.lab_context_details.v0]/items[at0003]/value',
            'inputs': [{'type': 'TEXT'}]
          }, {
            'id': 'requested_collection_timestamp',
            'name': 'Requested collection timestamp',
            'localizedName': 'Requested collection timestamp',
            'rmType': 'DV_DATE_TIME',
            'nodeId': 'at0014',
            'min': 0,
            'max': 1,
            'localizedNames': {'en': 'Requested collection timestamp'},
            'localizedDescriptions': {'en': '*'},
            'aqlPath': '/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.lab_context_details.v0]/items[at0014]/value',
            'inputs': [{'type': 'DATETIME'}]
          }, {
            'id': 'billing_id',
            'name': 'Billing ID',
            'localizedName': 'Billing ID',
            'rmType': 'DV_CODED_TEXT',
            'nodeId': 'at0005',
            'min': 0,
            'max': 1,
            'localizedNames': {'en': 'Billing ID'},
            'localizedDescriptions': {'en': '*'},
            'aqlPath': '/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.lab_context_details.v0]/items[at0005]/value',
            'inputs': [{'suffix': 'code', 'type': 'TEXT'}, {'suffix': 'value', 'type': 'TEXT'}]
          }, {
            'id': 'last_status_update',
            'name': 'Last status update',
            'localizedName': 'Last status update',
            'rmType': 'DV_DATE_TIME',
            'nodeId': 'at0006',
            'min': 0,
            'max': 1,
            'localizedNames': {'en': 'Last status update'},
            'localizedDescriptions': {'en': '*'},
            'aqlPath': '/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.lab_context_details.v0]/items[at0006]/value',
            'inputs': [{'type': 'DATETIME'}]
          }, {
            'id': 'report_id',
            'name': 'Report ID',
            'localizedName': 'Report ID',
            'rmType': 'DV_TEXT',
            'nodeId': 'at0007',
            'min': 0,
            'max': 1,
            'localizedNames': {'en': 'Report ID'},
            'localizedDescriptions': {'en': '*'},
            'aqlPath': '/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.lab_context_details.v0]/items[at0007]/value',
            'inputs': [{'type': 'TEXT'}]
          }, {
            'id': 'visit_number',
            'name': 'Visit number',
            'localizedName': 'Visit number',
            'rmType': 'DV_TEXT',
            'nodeId': 'at0008',
            'min': 0,
            'max': 1,
            'localizedNames': {'en': 'Visit number'},
            'localizedDescriptions': {'en': '*'},
            'aqlPath': '/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.lab_context_details.v0]/items[at0008]/value',
            'inputs': [{'type': 'TEXT'}]
          }, {
            'id': 'room',
            'name': 'Room',
            'localizedName': 'Room',
            'rmType': 'DV_CODED_TEXT',
            'nodeId': 'at0009',
            'min': 0,
            'max': 1,
            'localizedNames': {'en': 'Room'},
            'localizedDescriptions': {'en': '*'},
            'aqlPath': '/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.lab_context_details.v0]/items[at0009]/value',
            'inputs': [{'suffix': 'code', 'type': 'TEXT'}, {'suffix': 'value', 'type': 'TEXT'}]
          }, {
            'id': 'bed',
            'name': 'Bed',
            'localizedName': 'Bed',
            'rmType': 'DV_CODED_TEXT',
            'nodeId': 'at0010',
            'min': 0,
            'max': 1,
            'localizedNames': {'en': 'Bed'},
            'localizedDescriptions': {'en': '*'},
            'aqlPath': '/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.lab_context_details.v0]/items[at0010]/value',
            'inputs': [{'suffix': 'code', 'type': 'TEXT'}, {'suffix': 'value', 'type': 'TEXT'}]
          }, {
            'id': 'encounter_class',
            'name': 'Encounter Class',
            'localizedName': 'Encounter Class',
            'rmType': 'DV_TEXT',
            'nodeId': 'at0011',
            'min': 0,
            'max': 1,
            'localizedNames': {'en': 'Encounter Class'},
            'localizedDescriptions': {'en': '*'},
            'aqlPath': '/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.lab_context_details.v0]/items[at0011]/value',
            'inputs': [{'type': 'TEXT'}]
          }, {
            'id': 'laboratory',
            'name': 'Laboratory',
            'localizedName': 'Laboratory',
            'rmType': 'DV_CODED_TEXT',
            'nodeId': 'at0015',
            'min': 0,
            'max': 1,
            'localizedNames': {'en': 'Laboratory'},
            'localizedDescriptions': {'en': '*'},
            'aqlPath': '/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.lab_context_details.v0]/items[at0015]/value',
            'inputs': [{'suffix': 'code', 'type': 'TEXT'}, {'suffix': 'value', 'type': 'TEXT'}]
          }, {
            'id': 'laboratory_type',
            'name': 'Laboratory type',
            'localizedName': 'Laboratory type',
            'rmType': 'DV_TEXT',
            'nodeId': 'at0022',
            'min': 0,
            'max': 1,
            'localizedNames': {'en': 'Laboratory type'},
            'localizedDescriptions': {'en': '*'},
            'aqlPath': '/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.lab_context_details.v0]/items[at0022]/value',
            'inputs': [{'type': 'TEXT'}]
          }, {
            'id': 'shortcuts_for_laboratory_order',
            'name': 'Shortcuts for laboratory order',
            'localizedName': 'Shortcuts for laboratory order',
            'rmType': 'DV_TEXT',
            'nodeId': 'at0019',
            'min': 0,
            'max': 1,
            'localizedNames': {'en': 'Shortcuts for laboratory order'},
            'localizedDescriptions': {'en': '*'},
            'aqlPath': '/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.lab_context_details.v0]/items[at0019]/value',
            'inputs': [{'type': 'TEXT'}]
          }, {
            'id': 'point_of_care',
            'name': 'Point of care',
            'localizedName': 'Point of care',
            'rmType': 'DV_CODED_TEXT',
            'nodeId': 'at0020',
            'min': 0,
            'max': 1,
            'localizedNames': {'en': 'Point of care'},
            'localizedDescriptions': {'en': '*'},
            'aqlPath': '/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.lab_context_details.v0]/items[at0020]/value',
            'inputs': [{'suffix': 'code', 'type': 'TEXT'}, {'suffix': 'value', 'type': 'TEXT'}]
          }]
        }, {
          'id': 'start_time',
          'name': 'Start_time',
          'rmType': 'DV_DATE_TIME',
          'min': 0,
          'max': 1,
          'aqlPath': '/context/start_time',
          'inputs': [{'type': 'DATETIME'}],
          'inContext': true
        }, {
          'id': 'setting',
          'name': 'Setting',
          'rmType': 'DV_CODED_TEXT',
          'min': 0,
          'max': 1,
          'aqlPath': '/context/setting',
          'inputs': [{'suffix': 'code', 'type': 'TEXT'}, {'suffix': 'value', 'type': 'TEXT'}],
          'inContext': true
        }]
      }, {
        'id': 'laboratory_test_result',
        'name': 'Laboratory test result',
        'localizedName': 'Laboratory test result',
        'rmType': 'OBSERVATION',
        'nodeId': 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1',
        'min': 0,
        'max': -1,
        'localizedNames': {'en': 'Laboratory test result'},
        'localizedDescriptions': {'en': 'The result, including findings and the laboratory\'s interpretation, of an investigation performed on specimens collected from an individual or related to that individual.'},
        'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]',
        'children': [{
          'id': 'any_event',
          'name': 'Any event',
          'localizedName': 'Any event',
          'rmType': 'EVENT',
          'nodeId': 'at0002',
          'min': 0,
          'max': -1,
          'localizedNames': {'en': 'Any event'},
          'localizedDescriptions': {'en': 'Default, unspecified point in time or interval event which may be explicitly defined in a template or at run-time.'},
          'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]',
          'children': [{
            'id': 'test_name',
            'name': 'Test name',
            'localizedName': 'Test name',
            'rmType': 'DV_CODED_TEXT',
            'nodeId': 'at0005',
            'min': 1,
            'max': 1,
            'localizedNames': {'en': 'Test name'},
            'localizedDescriptions': {'en': 'Name of the laboratory investigation performed on the specimen(s).'},
            'annotations': {'comment': 'A test result may be for a single analyte, or a group of items, including panel tests. It is strongly recommended that \'Test name\' be coded with a terminology, for example LOINC or SNOMED CT. For example: \'Glucose\', \'Urea and Electrolytes\', \'Swab\', \'Cortisol (am)\', \'Potassium in perspiration\' or \'Melanoma histopathology\'. The name may sometimes include specimen type and patient state, for example \'Fasting blood glucose\' or include other information, as \'Potassium (PNA blood gas)\'.'},
            'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0005]/value',
            'inputs': [{'suffix': 'code', 'type': 'TEXT'}, {'suffix': 'value', 'type': 'TEXT'}]
          }, {
            'id': 'overall_test_status',
            'name': 'Overall test status',
            'localizedName': 'Overall test status',
            'rmType': 'DV_CODED_TEXT',
            'nodeId': 'at0073',
            'min': 0,
            'max': 1,
            'localizedNames': {'en': 'Overall test status'},
            'localizedDescriptions': {'en': 'The status of the laboratory test result as a whole.'},
            'annotations': {'comment': 'The values have been specifically chosen to match those in the HL7 FHIR Diagnostic report, historically derived from HL7v2 practice. Other local codes/terms can be used via the Text \'choice\'.\r\n\r\nThis element is multiple occurrence to cater for the use cases where statuses for different aspects of the result have been split into several elements.'},
            'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0073]/value',
            'inputs': [{
              'suffix': 'code',
              'type': 'CODED_TEXT',
              'list': [{
                'value': 'at0107',
                'label': 'Registered',
                'localizedLabels': {'en': 'Registered'},
                'localizedDescriptions': {'en': 'The existence of the test is registered in the Laboratory Information System, but there is nothing yet available.'}
              }, {
                'value': 'at0037',
                'label': 'Partial',
                'localizedLabels': {'en': 'Partial'},
                'localizedDescriptions': {'en': 'This is a partial (e.g. initial, interim or preliminary) Test Result: data in the Test Result may be incomplete or unverified.'}
              }, {
                'value': 'at0120',
                'label': 'Preliminary',
                'localizedLabels': {'en': 'Preliminary'},
                'localizedDescriptions': {'en': 'Verified early results are available, but not all results are final. This is a sub-category of \'Partial\'.'}
              }, {
                'value': 'at0038',
                'label': 'Final',
                'localizedLabels': {'en': 'Final'},
                'localizedDescriptions': {'en': 'The Test result is complete and verified by an authorised person.'}
              }, {
                'value': 'at0040',
                'label': 'Amended',
                'localizedLabels': {'en': 'Amended'},
                'localizedDescriptions': {'en': 'The result has been modified subsequent to being Final, and is complete and verified by the responsible pathologist, and result data has been changed.'}
              }, {
                'value': 'at0115',
                'label': 'Corrected',
                'localizedLabels': {'en': 'Corrected'},
                'localizedDescriptions': {'en': 'The result has been modified subsequent to being Final, and is complete and verified by the responsible pathologist. This is a sub-category of \'Amended\'.'}
              }, {
                'value': 'at0119',
                'label': 'Appended',
                'localizedLabels': {'en': 'Appended'},
                'localizedDescriptions': {'en': 'Subsequent to being final, the report has been modified by adding new content. The existing content is unchanged. This is a sub-category of \'Amended\'.'}
              }, {
                'value': 'at0074',
                'label': 'Cancelled',
                'localizedLabels': {'en': 'Cancelled'},
                'localizedDescriptions': {'en': 'The result is unavailable because the test was not started or not completed (also sometimes called \'aborted\').'}
              }, {
                'value': 'at0116',
                'label': 'Entered in error',
                'localizedLabels': {'en': 'Entered in error'},
                'localizedDescriptions': {'en': 'The Test Result has been withdrawn following previous Final release.'}
              }],
              'listOpen': true
            }, {'suffix': 'other', 'type': 'TEXT'}]
          }, {
            'id': 'overall_test_status_timestamp',
            'name': 'Overall test status timestamp',
            'localizedName': 'Overall test status timestamp',
            'rmType': 'DV_DATE_TIME',
            'nodeId': 'at0075',
            'min': 0,
            'max': 1,
            'localizedNames': {'en': 'Overall test status timestamp'},
            'localizedDescriptions': {'en': 'The date and/or time that ‘Overall test status’ was issued.'},
            'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0075]/value',
            'inputs': [{'type': 'DATETIME'}]
          }, {
            'id': 'comment',
            'name': 'Comment',
            'localizedName': 'Comment',
            'rmType': 'DV_TEXT',
            'nodeId': 'at0101',
            'min': 0,
            'max': -1,
            'localizedNames': {'en': 'Comment'},
            'localizedDescriptions': {'en': 'Additional narrative about the test result not captured in other fields.'},
            'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0101]/value',
            'inputs': [{'type': 'TEXT'}]
          }, {
            'id': 'specimen',
            'name': 'Specimen',
            'localizedName': 'Specimen',
            'rmType': 'CLUSTER',
            'nodeId': 'openEHR-EHR-CLUSTER.specimen.v0',
            'min': 0,
            'max': -1,
            'localizedNames': {'en': 'Specimen'},
            'localizedDescriptions': {'en': 'To record details of a laboratory specimen.'},
            'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]',
            'children': [{
              'id': 'specimen_type',
              'name': 'Specimen type',
              'localizedName': 'Specimen type',
              'rmType': 'DV_CODED_TEXT',
              'nodeId': 'at0029',
              'min': 0,
              'max': 1,
              'localizedNames': {'en': 'Specimen type'},
              'localizedDescriptions': {'en': 'The type of specimen to be collected e.g venous blood, prostatic biopsy.'},
              'annotations': {'fhir_mapping': 'Specimen.type'},
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[at0029]/value',
              'inputs': [{'suffix': 'code', 'type': 'TEXT'}, {'suffix': 'value', 'type': 'TEXT'}]
            }, {
              'id': 'datetime_collected',
              'name': 'Datetime collected',
              'localizedName': 'Datetime collected',
              'rmType': 'DV_DATE_TIME',
              'nodeId': 'at0015',
              'min': 0,
              'max': 1,
              'localizedNames': {'en': 'Datetime collected'},
              'localizedDescriptions': {'en': 'The date and time that collection has been ordered to take place or has taken place.'},
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[at0015]/value',
              'inputs': [{'type': 'DATETIME'}]
            }, {
              'id': 'collection_method',
              'name': 'Collection method',
              'localizedName': 'Collection method',
              'rmType': 'DV_CODED_TEXT',
              'nodeId': 'at0007',
              'min': 0,
              'max': 1,
              'localizedNames': {'en': 'Collection method'},
              'localizedDescriptions': {'en': 'The method of collection to be used eg Venepuncture, biopsy, resection.'},
              'annotations': {'fhir_mapping': 'Specimen.collection.method'},
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[at0007]/value',
              'inputs': [{'suffix': 'code', 'type': 'TEXT'}, {'suffix': 'value', 'type': 'TEXT'}]
            }, {
              'id': 'collection_method_description',
              'name': 'Collection method description',
              'localizedName': 'Collection method description',
              'rmType': 'DV_TEXT',
              'nodeId': 'at0079',
              'min': 0,
              'max': 1,
              'localizedNames': {'en': 'Collection method description'},
              'localizedDescriptions': {'en': 'Additional detailed description of method of sample collection.'},
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[at0079]/value',
              'inputs': [{'type': 'TEXT'}]
            }, {
              'id': 'collection_setting',
              'name': 'Collection setting',
              'localizedName': 'Collection setting',
              'rmType': 'DV_TEXT',
              'nodeId': 'at0067',
              'min': 0,
              'max': 1,
              'localizedNames': {'en': 'Collection setting'},
              'localizedDescriptions': {'en': 'Identification of the setting at which the specimen was collected \r\nfrom a subject of care. The specimen is often collected by a \r\nhealthcare provider, but may be collected directly by the patient or carer at home.'},
              'annotations': {'comment': 'This specifies the specimen collection location within the healthcare\nenvironment. It enables the laboratory to ask questions about the\ncollection of the specimen, if required. The specimen collection\nsetting may provide additional information relevant to the analysis \nof the result.\n\nWe save status cancelled. **'},
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[at0067]/value',
              'inputs': [{'type': 'TEXT'}]
            }, {
              'id': 'specimen_collector_identifier',
              'name': 'Specimen collector identifier',
              'localizedName': 'Specimen collector identifier',
              'rmType': 'DV_IDENTIFIER',
              'nodeId': 'at0070',
              'min': 0,
              'max': 1,
              'localizedNames': {'en': 'Specimen collector identifier'},
              'localizedDescriptions': {'en': 'Identifier of the person or agency responsible for collecting the specimen.'},
              'annotations': {'fhir_mapping': 'Specimen.collection.collector'},
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[at0070]/value',
              'inputs': [{'suffix': 'id', 'type': 'TEXT'}, {'suffix': 'type', 'type': 'TEXT'}, {
                'suffix': 'issuer',
                'type': 'TEXT'
              }, {'suffix': 'assigner', 'type': 'TEXT'}]
            }, {
              'id': 'number_of_containers',
              'name': 'Number of containers',
              'localizedName': 'Number of containers',
              'rmType': 'DV_COUNT',
              'nodeId': 'at0080',
              'min': 0,
              'max': 1,
              'localizedNames': {'en': 'Number of containers'},
              'localizedDescriptions': {'en': 'The total number of containers holding this specimen.'},
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[at0080]/value',
              'inputs': [{'type': 'INTEGER', 'validation': {'range': {'minOp': '>=', 'min': 0}}}]
            }, {
              'id': 'specimen_quality',
              'name': 'Specimen quality',
              'localizedName': 'Specimen quality',
              'rmType': 'CLUSTER',
              'nodeId': 'at0039',
              'min': 0,
              'max': 1,
              'localizedNames': {'en': 'Specimen quality'},
              'localizedDescriptions': {'en': 'Problems with the received specimen.'},
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[at0039]',
              'children': [{
                'id': 'comment',
                'name': 'Comment',
                'localizedName': 'Comment',
                'rmType': 'DV_TEXT',
                'nodeId': 'at0045',
                'min': 0,
                'max': 1,
                'localizedNames': {'en': 'Comment'},
                'localizedDescriptions': {'en': 'An additional text comment on the quality of the received specimen.'},
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[at0039]/items[at0045]/value',
                'inputs': [{'type': 'TEXT'}]
              }]
            }, {
              'id': 'processing',
              'name': 'Processing',
              'localizedName': 'Processing',
              'rmType': 'CLUSTER',
              'nodeId': 'at0046',
              'min': 0,
              'max': 1,
              'localizedNames': {'en': 'Processing'},
              'localizedDescriptions': {'en': 'Workflow of specimen processing/handling.'},
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[at0046]',
              'children': [{
                'id': 'datetime_received',
                'name': 'Datetime received',
                'localizedName': 'Datetime received',
                'rmType': 'DV_DATE_TIME',
                'nodeId': 'at0034',
                'min': 0,
                'max': 1,
                'localizedNames': {'en': 'Datetime received'},
                'localizedDescriptions': {'en': 'The date and time that the sample was received at the laboratory.'},
                'annotations': {'fhir_mapping': 'Specimen.receivedTime'},
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[at0046]/items[at0034]/value',
                'inputs': [{'type': 'DATETIME'}]
              }, {
                'id': 'laboratory_specimen_identifier',
                'name': 'Laboratory specimen identifier',
                'localizedName': 'Laboratory specimen identifier',
                'rmType': 'DV_IDENTIFIER',
                'nodeId': 'at0001',
                'min': 0,
                'max': 1,
                'localizedNames': {'en': 'Laboratory specimen identifier'},
                'localizedDescriptions': {'en': 'Unique identifier of the specimen, normally assigned by the laboratory.'},
                'annotations': {
                  'comment': 'Sometimes called the Accession Identifier.',
                  'fhir_mapping': 'Specimen.accessionIdentifier'
                },
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[at0046]/items[at0001]/value',
                'inputs': [{'suffix': 'id', 'type': 'TEXT'}, {'suffix': 'type', 'type': 'TEXT'}, {
                  'suffix': 'issuer',
                  'type': 'TEXT'
                }, {'suffix': 'assigner', 'type': 'TEXT'}]
              }]
            }, {
              'id': 'physical_properties_of_an_object',
              'name': 'Physical properties of an object',
              'localizedName': 'Physical properties of an object',
              'rmType': 'CLUSTER',
              'nodeId': 'openEHR-EHR-CLUSTER.physical_properties.v0',
              'min': 0,
              'max': -1,
              'localizedNames': {'en': 'Physical properties of an object'},
              'localizedDescriptions': {'en': 'To record the phycial properties of an object.'},
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.physical_properties.v0]',
              'children': [{
                'id': 'volume',
                'name': 'Volume',
                'localizedName': 'Volume',
                'rmType': 'DV_QUANTITY',
                'nodeId': 'at0046',
                'min': 0,
                'max': 1,
                'localizedNames': {'en': 'Volume'},
                'localizedDescriptions': {'en': 'The three dimensional volume of the object.'},
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.physical_properties.v0]/items[at0046]/value',
                'inputs': [{'suffix': 'magnitude', 'type': 'DECIMAL'}, {'suffix': 'unit', 'type': 'CODED_TEXT'}]
              }]
            }, {
              'id': 'additional_details',
              'name': 'Additional details',
              'localizedName': 'Additional details',
              'rmType': 'CLUSTER',
              'nodeId': 'openEHR-EHR-CLUSTER.additional_details.v0',
              'min': 0,
              'max': -1,
              'localizedNames': {'en': 'Additional details'},
              'localizedDescriptions': {'en': 'Additional_details'},
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]',
              'children': [{
                'id': 'detail',
                'name': 'Detail',
                'localizedName': 'Detail',
                'rmType': 'ELEMENT',
                'nodeId': 'at0001',
                'min': 0,
                'max': 1,
                'localizedNames': {'en': 'Detail'},
                'localizedDescriptions': {'en': '*'},
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]',
                'children': [{
                  'id': 'boolean_value',
                  'localizedName': 'Detail',
                  'rmType': 'DV_BOOLEAN',
                  'min': 0,
                  'max': 1,
                  'localizedNames': {'en': 'Detail'},
                  'localizedDescriptions': {'en': '*'},
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]/value',
                  'inputs': [{'type': 'BOOLEAN'}]
                }, {
                  'id': 'coded_text_value',
                  'localizedName': 'Detail',
                  'rmType': 'DV_CODED_TEXT',
                  'min': 0,
                  'max': 1,
                  'localizedNames': {'en': 'Detail'},
                  'localizedDescriptions': {'en': '*'},
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]/value',
                  'inputs': [{'suffix': 'code', 'type': 'TEXT'}, {'suffix': 'value', 'type': 'TEXT'}]
                }, {
                  'id': 'count_value',
                  'localizedName': 'Detail',
                  'rmType': 'DV_COUNT',
                  'min': 0,
                  'max': 1,
                  'localizedNames': {'en': 'Detail'},
                  'localizedDescriptions': {'en': '*'},
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]/value',
                  'inputs': [{'type': 'INTEGER'}]
                }, {
                  'id': 'date_value',
                  'localizedName': 'Detail',
                  'rmType': 'DV_DATE',
                  'min': 0,
                  'max': 1,
                  'localizedNames': {'en': 'Detail'},
                  'localizedDescriptions': {'en': '*'},
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]/value',
                  'inputs': [{'type': 'DATE'}]
                }, {
                  'id': 'date_time_value',
                  'localizedName': 'Detail',
                  'rmType': 'DV_DATE_TIME',
                  'min': 0,
                  'max': 1,
                  'localizedNames': {'en': 'Detail'},
                  'localizedDescriptions': {'en': '*'},
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]/value',
                  'inputs': [{'type': 'DATETIME'}]
                }, {
                  'id': 'duration_value',
                  'localizedName': 'Detail',
                  'rmType': 'DV_DURATION',
                  'min': 0,
                  'max': 1,
                  'localizedNames': {'en': 'Detail'},
                  'localizedDescriptions': {'en': '*'},
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]/value',
                  'inputs': [{
                    'suffix': 'year',
                    'type': 'INTEGER',
                    'validation': {'range': {'minOp': '>=', 'min': 0}},
                    'defaultValue': 0
                  }, {
                    'suffix': 'month',
                    'type': 'INTEGER',
                    'validation': {'range': {'minOp': '>=', 'min': 0}},
                    'defaultValue': 0
                  }, {
                    'suffix': 'day',
                    'type': 'INTEGER',
                    'validation': {'range': {'minOp': '>=', 'min': 0}},
                    'defaultValue': 0
                  }, {
                    'suffix': 'week',
                    'type': 'INTEGER',
                    'validation': {'range': {'minOp': '>=', 'min': 0}},
                    'defaultValue': 0
                  }, {
                    'suffix': 'hour',
                    'type': 'INTEGER',
                    'validation': {'range': {'minOp': '>=', 'min': 0}},
                    'defaultValue': 0
                  }, {
                    'suffix': 'minute',
                    'type': 'INTEGER',
                    'validation': {'range': {'minOp': '>=', 'min': 0}},
                    'defaultValue': 0
                  }, {
                    'suffix': 'second',
                    'type': 'INTEGER',
                    'validation': {'range': {'minOp': '>=', 'min': 0}},
                    'defaultValue': 0
                  }]
                }, {
                  'id': 'identifier_value',
                  'localizedName': 'Detail',
                  'rmType': 'DV_IDENTIFIER',
                  'min': 0,
                  'max': 1,
                  'localizedNames': {'en': 'Detail'},
                  'localizedDescriptions': {'en': '*'},
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]/value',
                  'inputs': [{'suffix': 'id', 'type': 'TEXT'}, {'suffix': 'type', 'type': 'TEXT'}, {
                    'suffix': 'issuer',
                    'type': 'TEXT'
                  }, {'suffix': 'assigner', 'type': 'TEXT'}]
                }, {
                  'id': 'interval_of_count_value',
                  'localizedName': 'Detail',
                  'rmType': 'DV_INTERVAL<DV_COUNT>',
                  'min': 0,
                  'max': 1,
                  'localizedNames': {'en': 'Detail'},
                  'localizedDescriptions': {'en': '*'},
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]/value',
                  'children': [{
                    'id': 'lower',
                    'rmType': 'DV_COUNT',
                    'min': 1,
                    'max': 1,
                    'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]/value/lower',
                    'inputs': [{'type': 'INTEGER'}]
                  }, {
                    'id': 'upper',
                    'rmType': 'DV_COUNT',
                    'min': 1,
                    'max': 1,
                    'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]/value/upper',
                    'inputs': [{'type': 'INTEGER'}]
                  }]
                }, {
                  'id': 'interval_of_date_value',
                  'localizedName': 'Detail',
                  'rmType': 'DV_INTERVAL<DV_DATE>',
                  'min': 0,
                  'max': 1,
                  'localizedNames': {'en': 'Detail'},
                  'localizedDescriptions': {'en': '*'},
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]/value',
                  'children': [{
                    'id': 'lower',
                    'rmType': 'DV_DATE',
                    'min': 1,
                    'max': 1,
                    'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]/value/lower',
                    'inputs': [{'type': 'DATE'}]
                  }, {
                    'id': 'upper',
                    'rmType': 'DV_DATE',
                    'min': 1,
                    'max': 1,
                    'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]/value/upper',
                    'inputs': [{'type': 'DATE'}]
                  }]
                }, {
                  'id': 'interval_of_date_time_value',
                  'localizedName': 'Detail',
                  'rmType': 'DV_INTERVAL<DV_DATE_TIME>',
                  'min': 0,
                  'max': 1,
                  'localizedNames': {'en': 'Detail'},
                  'localizedDescriptions': {'en': '*'},
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]/value',
                  'children': [{
                    'id': 'lower',
                    'rmType': 'DV_DATE_TIME',
                    'min': 1,
                    'max': 1,
                    'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]/value/lower',
                    'inputs': [{'type': 'DATETIME'}]
                  }, {
                    'id': 'upper',
                    'rmType': 'DV_DATE_TIME',
                    'min': 1,
                    'max': 1,
                    'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]/value/upper',
                    'inputs': [{'type': 'DATETIME'}]
                  }]
                }, {
                  'id': 'interval_of_duration_value',
                  'localizedName': 'Detail',
                  'rmType': 'DV_INTERVAL<DV_DURATION>',
                  'min': 0,
                  'max': 1,
                  'localizedNames': {'en': 'Detail'},
                  'localizedDescriptions': {'en': '*'},
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]/value',
                  'children': [{
                    'id': 'lower',
                    'rmType': 'DV_DURATION',
                    'min': 1,
                    'max': 1,
                    'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]/value/lower',
                    'inputs': [{
                      'suffix': 'year',
                      'type': 'INTEGER',
                      'validation': {'range': {'minOp': '>=', 'min': 0}},
                      'defaultValue': 0
                    }, {
                      'suffix': 'month',
                      'type': 'INTEGER',
                      'validation': {'range': {'minOp': '>=', 'min': 0}},
                      'defaultValue': 0
                    }, {
                      'suffix': 'day',
                      'type': 'INTEGER',
                      'validation': {'range': {'minOp': '>=', 'min': 0}},
                      'defaultValue': 0
                    }, {
                      'suffix': 'week',
                      'type': 'INTEGER',
                      'validation': {'range': {'minOp': '>=', 'min': 0}},
                      'defaultValue': 0
                    }, {
                      'suffix': 'hour',
                      'type': 'INTEGER',
                      'validation': {'range': {'minOp': '>=', 'min': 0}},
                      'defaultValue': 0
                    }, {
                      'suffix': 'minute',
                      'type': 'INTEGER',
                      'validation': {'range': {'minOp': '>=', 'min': 0}},
                      'defaultValue': 0
                    }, {
                      'suffix': 'second',
                      'type': 'INTEGER',
                      'validation': {'range': {'minOp': '>=', 'min': 0}},
                      'defaultValue': 0
                    }]
                  }, {
                    'id': 'upper',
                    'rmType': 'DV_DURATION',
                    'min': 1,
                    'max': 1,
                    'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]/value/upper',
                    'inputs': [{
                      'suffix': 'year',
                      'type': 'INTEGER',
                      'validation': {'range': {'minOp': '>=', 'min': 0}},
                      'defaultValue': 0
                    }, {
                      'suffix': 'month',
                      'type': 'INTEGER',
                      'validation': {'range': {'minOp': '>=', 'min': 0}},
                      'defaultValue': 0
                    }, {
                      'suffix': 'day',
                      'type': 'INTEGER',
                      'validation': {'range': {'minOp': '>=', 'min': 0}},
                      'defaultValue': 0
                    }, {
                      'suffix': 'week',
                      'type': 'INTEGER',
                      'validation': {'range': {'minOp': '>=', 'min': 0}},
                      'defaultValue': 0
                    }, {
                      'suffix': 'hour',
                      'type': 'INTEGER',
                      'validation': {'range': {'minOp': '>=', 'min': 0}},
                      'defaultValue': 0
                    }, {
                      'suffix': 'minute',
                      'type': 'INTEGER',
                      'validation': {'range': {'minOp': '>=', 'min': 0}},
                      'defaultValue': 0
                    }, {
                      'suffix': 'second',
                      'type': 'INTEGER',
                      'validation': {'range': {'minOp': '>=', 'min': 0}},
                      'defaultValue': 0
                    }]
                  }]
                }, {
                  'id': 'interval_of_quantity_value',
                  'localizedName': 'Detail',
                  'rmType': 'DV_INTERVAL<DV_QUANTITY>',
                  'min': 0,
                  'max': 1,
                  'localizedNames': {'en': 'Detail'},
                  'localizedDescriptions': {'en': '*'},
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]/value',
                  'children': [{
                    'id': 'lower',
                    'rmType': 'DV_QUANTITY',
                    'min': 1,
                    'max': 1,
                    'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]/value/lower',
                    'inputs': [{'suffix': 'magnitude', 'type': 'DECIMAL'}, {'suffix': 'unit', 'type': 'CODED_TEXT'}]
                  }, {
                    'id': 'upper',
                    'rmType': 'DV_QUANTITY',
                    'min': 1,
                    'max': 1,
                    'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]/value/upper',
                    'inputs': [{'suffix': 'magnitude', 'type': 'DECIMAL'}, {'suffix': 'unit', 'type': 'CODED_TEXT'}]
                  }]
                }, {
                  'id': 'interval_of_time_value',
                  'localizedName': 'Detail',
                  'rmType': 'DV_INTERVAL<DV_TIME>',
                  'min': 0,
                  'max': 1,
                  'localizedNames': {'en': 'Detail'},
                  'localizedDescriptions': {'en': '*'},
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]/value',
                  'children': [{
                    'id': 'lower',
                    'rmType': 'DV_TIME',
                    'min': 1,
                    'max': 1,
                    'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]/value/lower',
                    'inputs': [{'type': 'TIME'}]
                  }, {
                    'id': 'upper',
                    'rmType': 'DV_TIME',
                    'min': 1,
                    'max': 1,
                    'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]/value/upper',
                    'inputs': [{'type': 'TIME'}]
                  }]
                }, {
                  'id': 'multimedia_value',
                  'localizedName': 'Detail',
                  'rmType': 'DV_MULTIMEDIA',
                  'min': 0,
                  'max': 1,
                  'localizedNames': {'en': 'Detail'},
                  'localizedDescriptions': {'en': '*'},
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]/value',
                  'inputs': [{'type': 'TEXT'}]
                }, {
                  'id': 'ordinal_value',
                  'localizedName': 'Detail',
                  'rmType': 'DV_ORDINAL',
                  'min': 0,
                  'max': 1,
                  'localizedNames': {'en': 'Detail'},
                  'localizedDescriptions': {'en': '*'},
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]/value',
                  'inputs': [{'type': 'CODED_TEXT'}]
                }, {
                  'id': 'parsable_value',
                  'localizedName': 'Detail',
                  'rmType': 'DV_PARSABLE',
                  'min': 0,
                  'max': 1,
                  'localizedNames': {'en': 'Detail'},
                  'localizedDescriptions': {'en': '*'},
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]/value',
                  'inputs': [{'type': 'TEXT'}]
                }, {
                  'id': 'proportion_value',
                  'localizedName': 'Detail',
                  'rmType': 'DV_PROPORTION',
                  'min': 0,
                  'max': 1,
                  'localizedNames': {'en': 'Detail'},
                  'localizedDescriptions': {'en': '*'},
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]/value',
                  'proportionTypes': ['integer_fraction', 'unitary', 'percent', 'ratio', 'fraction'],
                  'inputs': [{'suffix': 'numerator', 'type': 'DECIMAL'}, {'suffix': 'denominator', 'type': 'DECIMAL'}]
                }, {
                  'id': 'quantity_value',
                  'localizedName': 'Detail',
                  'rmType': 'DV_QUANTITY',
                  'min': 0,
                  'max': 1,
                  'localizedNames': {'en': 'Detail'},
                  'localizedDescriptions': {'en': '*'},
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]/value',
                  'inputs': [{'suffix': 'magnitude', 'type': 'DECIMAL'}, {'suffix': 'unit', 'type': 'TEXT'}]
                }, {
                  'id': 'text_value',
                  'localizedName': 'Detail',
                  'rmType': 'DV_TEXT',
                  'min': 0,
                  'max': 1,
                  'localizedNames': {'en': 'Detail'},
                  'localizedDescriptions': {'en': '*'},
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]/value',
                  'inputs': [{'type': 'TEXT'}]
                }, {
                  'id': 'time_value',
                  'localizedName': 'Detail',
                  'rmType': 'DV_TIME',
                  'min': 0,
                  'max': 1,
                  'localizedNames': {'en': 'Detail'},
                  'localizedDescriptions': {'en': '*'},
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]/value',
                  'inputs': [{'type': 'TIME'}]
                }, {
                  'id': 'uri_value',
                  'localizedName': 'Detail',
                  'rmType': 'DV_URI',
                  'min': 0,
                  'max': 1,
                  'localizedNames': {'en': 'Detail'},
                  'localizedDescriptions': {'en': '*'},
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0001]/value',
                  'inputs': [{'type': 'TEXT'}]
                }]
              }, {
                'id': 'code',
                'name': 'Code',
                'localizedName': 'Code',
                'rmType': 'DV_TEXT',
                'nodeId': 'at0003',
                'min': 0,
                'max': 1,
                'localizedNames': {'en': 'Code'},
                'localizedDescriptions': {'en': '*'},
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0003]/value',
                'inputs': [{'type': 'TEXT'}]
              }, {
                'id': 'detail_timestamp',
                'name': 'Detail timestamp',
                'localizedName': 'Detail timestamp',
                'rmType': 'DV_DATE_TIME',
                'nodeId': 'at0008',
                'min': 0,
                'max': 1,
                'localizedNames': {'en': 'Detail timestamp'},
                'localizedDescriptions': {'en': '*'},
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0008]/value',
                'inputs': [{'type': 'DATETIME'}]
              }, {
                'id': 'specimen_series_code',
                'name': 'Specimen series code',
                'localizedName': 'Specimen series code',
                'rmType': 'DV_TEXT',
                'nodeId': 'at0005',
                'min': 0,
                'max': 1,
                'localizedNames': {'en': 'Specimen series code'},
                'localizedDescriptions': {'en': '*'},
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0005]/value',
                'inputs': [{'type': 'TEXT'}]
              }, {
                'id': 'biological_material_type_code',
                'name': 'Biological material type code',
                'localizedName': 'Biological material type code',
                'rmType': 'DV_TEXT',
                'nodeId': 'at0007',
                'min': 0,
                'max': 1,
                'localizedNames': {'en': 'Biological material type code'},
                'localizedDescriptions': {'en': '*'},
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0007]/value',
                'inputs': [{'type': 'TEXT'}]
              }, {
                'id': 'filler_assigner_identifier',
                'name': 'Filler assigner identifier',
                'localizedName': 'Filler assigner identifier',
                'rmType': 'DV_IDENTIFIER',
                'nodeId': 'at0009',
                'min': 0,
                'max': 1,
                'localizedNames': {'en': 'Filler assigner identifier'},
                'localizedDescriptions': {'en': '*'},
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.additional_details.v0]/items[at0009]/value',
                'inputs': [{'suffix': 'id', 'type': 'TEXT'}, {'suffix': 'type', 'type': 'TEXT'}, {
                  'suffix': 'issuer',
                  'type': 'TEXT'
                }, {'suffix': 'assigner', 'type': 'TEXT'}]
              }]
            }, {
              'id': 'transport_details',
              'name': 'Transport details',
              'localizedName': 'Transport details',
              'rmType': 'CLUSTER',
              'nodeId': 'openEHR-EHR-CLUSTER.transport_details.v0',
              'min': 0,
              'max': 1,
              'localizedNames': {'en': 'Transport details'},
              'localizedDescriptions': {'en': 'transport_details'},
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.transport_details.v0]',
              'children': [{
                'id': 'transport_status',
                'name': 'Transport status',
                'localizedName': 'Transport status',
                'rmType': 'DV_TEXT',
                'nodeId': 'at0001',
                'min': 0,
                'max': 1,
                'localizedNames': {'en': 'Transport status'},
                'localizedDescriptions': {'en': '*'},
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.transport_details.v0]/items[at0001]/value',
                'inputs': [{'type': 'TEXT'}]
              }, {
                'id': 'transport_number',
                'name': 'Transport number',
                'localizedName': 'Transport number',
                'rmType': 'DV_TEXT',
                'nodeId': 'at0002',
                'min': 0,
                'max': 1,
                'localizedNames': {'en': 'Transport number'},
                'localizedDescriptions': {'en': '*'},
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.transport_details.v0]/items[at0002]/value',
                'inputs': [{'type': 'TEXT'}]
              }, {
                'id': 'biological_material_type_code',
                'name': 'Biological material type code',
                'localizedName': 'Biological material type code',
                'rmType': 'DV_TEXT',
                'nodeId': 'at0003',
                'min': 0,
                'max': 1,
                'localizedNames': {'en': 'Biological material type code'},
                'localizedDescriptions': {'en': '*'},
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.transport_details.v0]/items[at0003]/value',
                'inputs': [{'type': 'TEXT'}]
              }]
            }, {
              'id': 'specimen_container',
              'name': 'Specimen container',
              'localizedName': 'Specimen container',
              'rmType': 'CLUSTER',
              'nodeId': 'openEHR-EHR-CLUSTER.specimen_container.v0',
              'min': 0,
              'max': -1,
              'localizedNames': {'en': 'Specimen container'},
              'localizedDescriptions': {'en': 'Details of a specimen container. This is often integral to workflow and reporting of pathology specimens, particularly anatomical and histological pathology specimens.'},
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.specimen_container.v0]',
              'children': [{
                'id': 'container_type',
                'name': 'Container type',
                'localizedName': 'Container type',
                'rmType': 'DV_CODED_TEXT',
                'nodeId': 'at0005',
                'min': 0,
                'max': 1,
                'localizedNames': {'en': 'Container type'},
                'localizedDescriptions': {'en': 'The type of container.'},
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.specimen_container.v0]/items[at0005]/value',
                'inputs': [{
                  'suffix': 'code',
                  'type': 'CODED_TEXT',
                  'list': [{
                    'value': 'at0006',
                    'label': 'Tissue cassette',
                    'localizedLabels': {'en': 'Tissue cassette'},
                    'localizedDescriptions': {'en': 'The container is a tissue cassette.'}
                  }, {
                    'value': 'at0007',
                    'label': 'Tissue microarray cassette',
                    'localizedLabels': {'en': 'Tissue microarray cassette'},
                    'localizedDescriptions': {'en': 'The container is a tissue microarray cassette.'}
                  }, {
                    'value': 'at0008',
                    'label': 'Specimen vial',
                    'localizedLabels': {'en': 'Specimen vial'},
                    'localizedDescriptions': {'en': 'The container is a specimen vial.'}
                  }, {
                    'value': 'at0009',
                    'label': 'Microscope slide',
                    'localizedLabels': {'en': 'Microscope slide'},
                    'localizedDescriptions': {'en': 'The container is a microscope slide.'}
                  }, {
                    'value': 'at0010',
                    'label': 'Specimen container',
                    'localizedLabels': {'en': 'Specimen container'},
                    'localizedDescriptions': {'en': 'The container is a gneric specimen container.'}
                  }, {
                    'value': 'at0011',
                    'label': 'Electron microscopy grid',
                    'localizedLabels': {'en': 'Electron microscopy grid'},
                    'localizedDescriptions': {'en': 'The container is an electron microscopy grid.'}
                  }, {
                    'value': 'at0012',
                    'label': 'Specimen well',
                    'localizedLabels': {'en': 'Specimen well'},
                    'localizedDescriptions': {'en': 'The container is a specimen well.'}
                  }],
                  'listOpen': true
                }, {'suffix': 'other', 'type': 'TEXT'}]
              }, {
                'id': 'datetime_transported',
                'name': 'Datetime transported',
                'localizedName': 'Datetime transported',
                'rmType': 'DV_DATE_TIME',
                'nodeId': 'at0024',
                'min': 0,
                'max': 1,
                'localizedNames': {'en': 'Datetime transported'},
                'localizedDescriptions': {'en': 'The data and time that the specimen was uplifted for transportation to the laboratory.'},
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.specimen_container.v0]/items[at0024]/value',
                'inputs': [{'type': 'DATETIME'}]
              }, {
                'id': 'container_identifier',
                'name': 'Container Identifier',
                'localizedName': 'Container Identifier',
                'rmType': 'DV_IDENTIFIER',
                'nodeId': 'at0003',
                'min': 0,
                'max': -1,
                'localizedNames': {'en': 'Container Identifier'},
                'localizedDescriptions': {'en': 'The unique identifier given to the container. May be multiple.'},
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.specimen_container.v0]/items[at0003]/value',
                'inputs': [{'suffix': 'id', 'type': 'TEXT'}, {'suffix': 'type', 'type': 'TEXT'}, {
                  'suffix': 'issuer',
                  'type': 'TEXT'
                }, {'suffix': 'assigner', 'type': 'TEXT'}]
              }, {
                'id': 'transporter_identifier',
                'name': 'Transporter identifier',
                'localizedName': 'Transporter identifier',
                'rmType': 'DV_IDENTIFIER',
                'nodeId': 'at0025',
                'min': 0,
                'max': 1,
                'localizedNames': {'en': 'Transporter identifier'},
                'localizedDescriptions': {'en': 'Identifier of person or agency responsible for transporting the container to the lab.'},
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.specimen.v0]/items[openEHR-EHR-CLUSTER.specimen_container.v0]/items[at0025]/value',
                'inputs': [{'suffix': 'id', 'type': 'TEXT'}, {'suffix': 'type', 'type': 'TEXT'}, {
                  'suffix': 'issuer',
                  'type': 'TEXT'
                }, {'suffix': 'assigner', 'type': 'TEXT'}]
              }]
            }]
          }, {
            'id': 'laboratory_analyte_result',
            'name': 'Laboratory analyte result',
            'localizedName': 'Laboratory analyte result',
            'rmType': 'CLUSTER',
            'nodeId': 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1',
            'min': 0,
            'max': -1,
            'localizedNames': {'en': 'Laboratory analyte result'},
            'localizedDescriptions': {'en': 'The result of a laboratory test for a single analyte value.'},
            'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.laboratory_test_analyte.v1]',
            'children': [{
              'id': 'analyte_result_sequence',
              'name': 'Analyte result sequence',
              'localizedName': 'Analyte result sequence',
              'rmType': 'DV_COUNT',
              'nodeId': 'at0027',
              'min': 0,
              'max': 1,
              'localizedNames': {'en': 'Analyte result sequence'},
              'localizedDescriptions': {'en': 'The intended position of this analyte result within the overall sequence of analyte results.'},
              'annotations': {'comment': 'For example: \'\'1\' \'2\', \'3\'. Where multiple analyte results are reported, the \'Analyte result sequence\' makes the order in which they were reported explicit.'},
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.laboratory_test_analyte.v1]/items[at0027]/value',
              'inputs': [{'type': 'INTEGER'}]
            }, {
              'id': 'analyte_name',
              'name': 'Analyte name',
              'localizedName': 'Analyte name',
              'rmType': 'DV_TEXT',
              'nodeId': 'at0024',
              'min': 0,
              'max': 1,
              'localizedNames': {'en': 'Analyte name'},
              'localizedDescriptions': {'en': 'The name of the analyte result.'},
              'annotations': {
                'comment': 'The value for this element is normally supplied in a specialisation, in a template or at run-time to reflect the actual analyte. For example: \'Serum sodium\', \'Haemoglobin\'. Coding with an external terminology is strongly recommended, such as LOINC, NPU, SNOMED CT, or local lab terminologies.',
                'hl7v2_mapping': 'OBX.3',
                'fhir_mapping': 'Observation.code'
              },
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.laboratory_test_analyte.v1]/items[at0024]/value',
              'inputs': [{'type': 'TEXT'}]
            }, {
              'id': 'analyte_result',
              'name': 'Analyte result',
              'localizedName': 'Analyte result',
              'rmType': 'ELEMENT',
              'nodeId': 'at0001',
              'min': 0,
              'max': -1,
              'localizedNames': {'en': 'Analyte result'},
              'localizedDescriptions': {'en': 'The value of the analyte result.'},
              'annotations': {
                'comment': 'For example \'7.3 mmol/l\', \'Raised\'. The \'Any\' data type will need to be constrained to an appropriate data type in a specialisation, a template or at run-time to reflect the actual analyte result. The Quantity data type has reference model attributes that include flags for normal/abnormal, reference ranges and approximations - see https://specifications.openehr.org/releases/RM/latest/data_types.html#_dv_quantity_class for more details.',
                'hl7v2_mapping': 'OBX.2, OBX.5, OBX.6, OBX.7, OBX.8',
                'fhir_mapping': 'Observation.value[x]'
              },
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.laboratory_test_analyte.v1]/items[at0001]',
              'children': [{
                'id': 'coded_text_value',
                'name': 'Analyte result',
                'localizedName': 'Analyte result',
                'rmType': 'DV_CODED_TEXT',
                'min': 0,
                'max': 1,
                'localizedNames': {'en': 'Analyte result'},
                'localizedDescriptions': {'en': 'The value of the analyte result.'},
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.laboratory_test_analyte.v1]/items[at0001]/Analyte result',
                'inputs': [{'suffix': 'code', 'type': 'TEXT'}, {'suffix': 'value', 'type': 'TEXT'}],
                'inContext': true
              }, {
                'id': 'text_value',
                'name': 'Analyte result',
                'localizedName': 'Analyte result',
                'rmType': 'DV_TEXT',
                'min': 0,
                'max': 1,
                'localizedNames': {'en': 'Analyte result'},
                'localizedDescriptions': {'en': 'The value of the analyte result.'},
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.laboratory_test_analyte.v1]/items[at0001]/Analyte result',
                'inputs': [{'type': 'TEXT'}],
                'inContext': true
              }, {
                'id': 'multimedia_value',
                'name': 'Analyte result',
                'localizedName': 'Analyte result',
                'rmType': 'DV_MULTIMEDIA',
                'min': 0,
                'max': 1,
                'localizedNames': {'en': 'Analyte result'},
                'localizedDescriptions': {'en': 'The value of the analyte result.'},
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.laboratory_test_analyte.v1]/items[at0001]/Analyte result',
                'inputs': [{'type': 'TEXT'}],
                'inContext': true
              }, {
                'id': 'parsable_value',
                'name': 'Analyte result',
                'localizedName': 'Analyte result',
                'rmType': 'DV_PARSABLE',
                'min': 0,
                'max': 1,
                'localizedNames': {'en': 'Analyte result'},
                'localizedDescriptions': {'en': 'The value of the analyte result.'},
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.laboratory_test_analyte.v1]/items[at0001]/Analyte result',
                'inputs': [{'type': 'TEXT'}],
                'inContext': true
              }, {
                'id': 'state_value',
                'name': 'Analyte result',
                'localizedName': 'Analyte result',
                'rmType': 'DV_STATE',
                'min': 0,
                'max': 1,
                'localizedNames': {'en': 'Analyte result'},
                'localizedDescriptions': {'en': 'The value of the analyte result.'},
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.laboratory_test_analyte.v1]/items[at0001]/Analyte result',
                'inputs': [{'suffix': 'code', 'type': 'TEXT'}, {'suffix': 'value', 'type': 'TEXT'}],
                'inContext': true
              }, {
                'id': 'boolean_value',
                'name': 'Analyte result',
                'localizedName': 'Analyte result',
                'rmType': 'DV_BOOLEAN',
                'min': 0,
                'max': 1,
                'localizedNames': {'en': 'Analyte result'},
                'localizedDescriptions': {'en': 'The value of the analyte result.'},
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.laboratory_test_analyte.v1]/items[at0001]/Analyte result',
                'inputs': [{'type': 'BOOLEAN'}],
                'inContext': true
              }, {
                'id': 'identifier_value',
                'name': 'Analyte result',
                'localizedName': 'Analyte result',
                'rmType': 'DV_IDENTIFIER',
                'min': 0,
                'max': 1,
                'localizedNames': {'en': 'Analyte result'},
                'localizedDescriptions': {'en': 'The value of the analyte result.'},
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.laboratory_test_analyte.v1]/items[at0001]/Analyte result',
                'inputs': [{'suffix': 'id', 'type': 'TEXT'}, {'suffix': 'type', 'type': 'TEXT'}, {
                  'suffix': 'issuer',
                  'type': 'TEXT'
                }, {'suffix': 'assigner', 'type': 'TEXT'}],
                'inContext': true
              }, {
                'id': 'uri_value',
                'name': 'Analyte result',
                'localizedName': 'Analyte result',
                'rmType': 'DV_URI',
                'min': 0,
                'max': 1,
                'localizedNames': {'en': 'Analyte result'},
                'localizedDescriptions': {'en': 'The value of the analyte result.'},
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.laboratory_test_analyte.v1]/items[at0001]/Analyte result',
                'inputs': [{'type': 'TEXT'}],
                'inContext': true
              }, {
                'id': 'ehr_uri_value',
                'name': 'Analyte result',
                'localizedName': 'Analyte result',
                'rmType': 'DV_EHR_URI',
                'min': 0,
                'max': 1,
                'localizedNames': {'en': 'Analyte result'},
                'localizedDescriptions': {'en': 'The value of the analyte result.'},
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.laboratory_test_analyte.v1]/items[at0001]/Analyte result',
                'inputs': [{'type': 'TEXT'}],
                'inContext': true
              }, {
                'id': 'duration_value',
                'name': 'Analyte result',
                'localizedName': 'Analyte result',
                'rmType': 'DV_DURATION',
                'min': 0,
                'max': 1,
                'localizedNames': {'en': 'Analyte result'},
                'localizedDescriptions': {'en': 'The value of the analyte result.'},
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.laboratory_test_analyte.v1]/items[at0001]/Analyte result',
                'inputs': [{
                  'suffix': 'year',
                  'type': 'INTEGER',
                  'validation': {'range': {'minOp': '>=', 'min': 0}},
                  'defaultValue': 0
                }, {
                  'suffix': 'month',
                  'type': 'INTEGER',
                  'validation': {'range': {'minOp': '>=', 'min': 0}},
                  'defaultValue': 0
                }, {
                  'suffix': 'day',
                  'type': 'INTEGER',
                  'validation': {'range': {'minOp': '>=', 'min': 0}},
                  'defaultValue': 0
                }, {
                  'suffix': 'week',
                  'type': 'INTEGER',
                  'validation': {'range': {'minOp': '>=', 'min': 0}},
                  'defaultValue': 0
                }, {
                  'suffix': 'hour',
                  'type': 'INTEGER',
                  'validation': {'range': {'minOp': '>=', 'min': 0}},
                  'defaultValue': 0
                }, {
                  'suffix': 'minute',
                  'type': 'INTEGER',
                  'validation': {'range': {'minOp': '>=', 'min': 0}},
                  'defaultValue': 0
                }, {
                  'suffix': 'second',
                  'type': 'INTEGER',
                  'validation': {'range': {'minOp': '>=', 'min': 0}},
                  'defaultValue': 0
                }],
                'inContext': true
              }, {
                'id': 'quantity_value',
                'name': 'Analyte result',
                'localizedName': 'Analyte result',
                'rmType': 'DV_QUANTITY',
                'min': 0,
                'max': 1,
                'localizedNames': {'en': 'Analyte result'},
                'localizedDescriptions': {'en': 'The value of the analyte result.'},
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.laboratory_test_analyte.v1]/items[at0001]/Analyte result',
                'inputs': [{'suffix': 'magnitude', 'type': 'DECIMAL'}, {'suffix': 'unit', 'type': 'TEXT'}],
                'inContext': true
              }, {
                'id': 'count_value',
                'name': 'Analyte result',
                'localizedName': 'Analyte result',
                'rmType': 'DV_COUNT',
                'min': 0,
                'max': 1,
                'localizedNames': {'en': 'Analyte result'},
                'localizedDescriptions': {'en': 'The value of the analyte result.'},
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.laboratory_test_analyte.v1]/items[at0001]/Analyte result',
                'inputs': [{'type': 'INTEGER'}],
                'inContext': true
              }, {
                'id': 'proportion_value',
                'name': 'Analyte result',
                'localizedName': 'Analyte result',
                'rmType': 'DV_PROPORTION',
                'min': 0,
                'max': 1,
                'localizedNames': {'en': 'Analyte result'},
                'localizedDescriptions': {'en': 'The value of the analyte result.'},
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.laboratory_test_analyte.v1]/items[at0001]/Analyte result',
                'proportionTypes': ['integer_fraction', 'unitary', 'percent', 'ratio', 'fraction'],
                'inputs': [{'suffix': 'numerator', 'type': 'DECIMAL'}, {'suffix': 'denominator', 'type': 'DECIMAL'}],
                'inContext': true
              }, {
                'id': 'date_time_value',
                'name': 'Analyte result',
                'localizedName': 'Analyte result',
                'rmType': 'DV_DATE_TIME',
                'min': 0,
                'max': 1,
                'localizedNames': {'en': 'Analyte result'},
                'localizedDescriptions': {'en': 'The value of the analyte result.'},
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.laboratory_test_analyte.v1]/items[at0001]/Analyte result',
                'inputs': [{'type': 'DATETIME'}],
                'inContext': true
              }, {
                'id': 'date_value',
                'name': 'Analyte result',
                'localizedName': 'Analyte result',
                'rmType': 'DV_DATE',
                'min': 0,
                'max': 1,
                'localizedNames': {'en': 'Analyte result'},
                'localizedDescriptions': {'en': 'The value of the analyte result.'},
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.laboratory_test_analyte.v1]/items[at0001]/Analyte result',
                'inputs': [{'type': 'DATE'}],
                'inContext': true
              }, {
                'id': 'time_value',
                'name': 'Analyte result',
                'localizedName': 'Analyte result',
                'rmType': 'DV_TIME',
                'min': 0,
                'max': 1,
                'localizedNames': {'en': 'Analyte result'},
                'localizedDescriptions': {'en': 'The value of the analyte result.'},
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.laboratory_test_analyte.v1]/items[at0001]/Analyte result',
                'inputs': [{'type': 'TIME'}],
                'inContext': true
              }, {
                'id': 'ordinal_value',
                'name': 'Analyte result',
                'localizedName': 'Analyte result',
                'rmType': 'DV_ORDINAL',
                'min': 0,
                'max': 1,
                'localizedNames': {'en': 'Analyte result'},
                'localizedDescriptions': {'en': 'The value of the analyte result.'},
                'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.laboratory_test_analyte.v1]/items[at0001]/Analyte result',
                'inputs': [{'type': 'CODED_TEXT'}],
                'inContext': true
              }]
            }, {
              'id': 'result_status',
              'name': 'Result status',
              'localizedName': 'Result status',
              'rmType': 'DV_CODED_TEXT',
              'nodeId': 'at0005',
              'min': 0,
              'max': 1,
              'localizedNames': {'en': 'Result status'},
              'localizedDescriptions': {'en': 'The status of the analyte result value.'},
              'annotations': {
                'comment': 'The values have been specifically chosen to match those in the HL7 FHIR Diagnostic report, historically derived from HL7v2 practice. Other local codes/terms can be used via the Text \'choice\'.',
                'hl7v2_mapping': 'OBX.11',
                'fhir_mapping': 'Observation.status'
              },
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.laboratory_test_analyte.v1]/items[at0005]/value',
              'inputs': [{
                'suffix': 'code',
                'type': 'CODED_TEXT',
                'list': [{
                  'value': 'at0015',
                  'label': 'Registered',
                  'localizedLabels': {'en': 'Registered'},
                  'localizedDescriptions': {'en': 'The existence of the test is registered in the Laboratory Information System, but there is nothing yet available.'}
                }, {
                  'value': 'at0016',
                  'label': 'Partial',
                  'localizedLabels': {'en': 'Partial'},
                  'localizedDescriptions': {'en': 'This is a partial (e.g. initial, interim or preliminary) Test Result: data in the Test Result may be incomplete or unverified.'}
                }, {
                  'value': 'at0017',
                  'label': 'Preliminary',
                  'localizedLabels': {'en': 'Preliminary'},
                  'localizedDescriptions': {'en': 'Verified early results are available, but not all results are final. This is a sub-category of \'Partial\'.'}
                }, {
                  'value': 'at0018',
                  'label': 'Final',
                  'localizedLabels': {'en': 'Final'},
                  'localizedDescriptions': {'en': 'The Test result is complete and verified by an authorised person.'}
                }, {
                  'value': 'at0020',
                  'label': 'Amended',
                  'localizedLabels': {'en': 'Amended'},
                  'localizedDescriptions': {'en': 'The result has been modified subsequent to being Final, and is complete and verified by the responsible pathologist, and result data has been changed.'}
                }, {
                  'value': 'at0019',
                  'label': 'Corrected',
                  'localizedLabels': {'en': 'Corrected'},
                  'localizedDescriptions': {'en': 'The result has been modified subsequent to being Final, and is complete and verified by the responsible pathologist. This is a sub-category of \'Amended\'.'}
                }, {
                  'value': 'at0021',
                  'label': 'Appended',
                  'localizedLabels': {'en': 'Appended'},
                  'localizedDescriptions': {'en': 'Subsequent to being final, the report has been modified by adding new content. The existing content is unchanged. This is a sub-category of \'Amended\'.'}
                }, {
                  'value': 'at0023',
                  'label': 'Cancelled',
                  'localizedLabels': {'en': 'Cancelled'},
                  'localizedDescriptions': {'en': 'The result is unavailable because the test was not started or not completed (also sometimes called \'aborted\').'}
                }, {
                  'value': 'at0022',
                  'label': 'Entered in error',
                  'localizedLabels': {'en': 'Entered in error'},
                  'localizedDescriptions': {'en': 'The Test Result has been withdrawn following previous Final release.'}
                }],
                'listOpen': true
              }, {'suffix': 'other', 'type': 'TEXT'}]
            }, {
              'id': 'result_status_time',
              'name': 'Result status time',
              'localizedName': 'Result status time',
              'rmType': 'DV_DATE_TIME',
              'nodeId': 'at0006',
              'min': 0,
              'max': 1,
              'localizedNames': {'en': 'Result status time'},
              'localizedDescriptions': {'en': 'The date and time that the analyte result was issued for the recorded ‘Result status’.'},
              'annotations': {'hl7v2_mapping': 'OBX.19', 'fhir_mapping': 'Observation.issued'},
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.laboratory_test_analyte.v1]/items[at0006]/value',
              'inputs': [{'type': 'DATETIME'}]
            }, {
              'id': 'comment',
              'name': 'Comment',
              'localizedName': 'Comment',
              'rmType': 'DV_TEXT',
              'nodeId': 'at0003',
              'min': 0,
              'max': -1,
              'localizedNames': {'en': 'Comment'},
              'localizedDescriptions': {'en': 'Additional narrative about the analyte result, not captured in other fields.'},
              'annotations': {'hl7v2_mapping': 'NTE.3', 'fhir_mapping': 'Observation.note'},
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.laboratory_test_analyte.v1]/items[at0003]/value',
              'inputs': [{'type': 'TEXT'}]
            }]
          }, {
            'id': 'time',
            'name': 'Time',
            'rmType': 'DV_DATE_TIME',
            'min': 0,
            'max': 1,
            'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/data[at0001]/events[at0002]/time',
            'inputs': [{'type': 'DATETIME'}],
            'inContext': true
          }]
        }, {
          'id': 'test_request_details',
          'name': 'Test request details',
          'localizedName': 'Test request details',
          'rmType': 'CLUSTER',
          'nodeId': 'at0094',
          'min': 0,
          'max': -1,
          'dependsOn': ['any_event'],
          'localizedNames': {'en': 'Test request details'},
          'localizedDescriptions': {'en': 'Details about the test request.'},
          'annotations': {'comment': 'In most situations there is one test request and a single corresponding test result, however this repeating cluster allows for the situation where there may be multiple test requests reported using a single test result.\r\n\r\nAs an example: \'a clinician asks for blood glucose in one request and Urea/electrolytes in a second request, but the lab analyser does both and the lab wishes to report these together\'.'},
          'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/protocol[at0004]/items[at0094]',
          'children': [{
            'id': 'original_test_requested_name',
            'name': 'Original test requested name',
            'localizedName': 'Original test requested name',
            'rmType': 'DV_CODED_TEXT',
            'nodeId': 'at0106',
            'min': 0,
            'max': -1,
            'localizedNames': {'en': 'Original test requested name'},
            'localizedDescriptions': {'en': 'Name of the original laboratory test requested.'},
            'annotations': {'comment': 'This data element is to be used when the test requested differs from the test actually performed by the laboratory.'},
            'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/protocol[at0004]/items[at0094]/items[at0106]/value',
            'inputs': [{'suffix': 'code', 'type': 'TEXT'}, {'suffix': 'value', 'type': 'TEXT'}]
          }, {
            'id': 'requester_order_identifier',
            'name': 'Requester order identifier',
            'localizedName': 'Requester order identifier',
            'rmType': 'ELEMENT',
            'nodeId': 'at0062',
            'min': 0,
            'max': 1,
            'localizedNames': {'en': 'Requester order identifier'},
            'localizedDescriptions': {'en': 'The local identifier assigned by the requesting clinical system.'},
            'annotations': {'comment': 'Equivalent to the HL7 Placer Order Identifier.'},
            'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/protocol[at0004]/items[at0094]/items[at0062]',
            'children': [{
              'id': 'identifier_value',
              'localizedName': 'Requester order identifier',
              'rmType': 'DV_IDENTIFIER',
              'min': 0,
              'max': 1,
              'localizedNames': {'en': 'Requester order identifier'},
              'localizedDescriptions': {'en': 'The local identifier assigned by the requesting clinical system.'},
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/protocol[at0004]/items[at0094]/items[at0062]/value',
              'inputs': [{'suffix': 'id', 'type': 'TEXT'}, {'suffix': 'type', 'type': 'TEXT'}, {
                'suffix': 'issuer',
                'type': 'TEXT'
              }, {'suffix': 'assigner', 'type': 'TEXT'}]
            }, {
              'id': 'text_value',
              'localizedName': 'Requester order identifier',
              'rmType': 'DV_TEXT',
              'min': 0,
              'max': 1,
              'localizedNames': {'en': 'Requester order identifier'},
              'localizedDescriptions': {'en': 'The local identifier assigned by the requesting clinical system.'},
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/protocol[at0004]/items[at0094]/items[at0062]/value',
              'inputs': [{'type': 'TEXT'}]
            }]
          }, {
            'id': 'receiver_order_identifier',
            'name': 'Receiver order identifier',
            'localizedName': 'Receiver order identifier',
            'rmType': 'ELEMENT',
            'nodeId': 'at0063',
            'min': 0,
            'max': 1,
            'localizedNames': {'en': 'Receiver order identifier'},
            'localizedDescriptions': {'en': 'The local identifier assigned to the test order by the order filler, usually by the Laboratory Information System (LIS).'},
            'annotations': {'comment': 'Assigning an identifier to a request by the Laboratory lnformation System (LIS) enables tracking progress of the request and enables linking results to requests. It also provides a reference to assist with enquiries and it is usually equivalent to the HL7 Filler Order Identifier.'},
            'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/protocol[at0004]/items[at0094]/items[at0063]',
            'children': [{
              'id': 'identifier_value',
              'localizedName': 'Receiver order identifier',
              'rmType': 'DV_IDENTIFIER',
              'min': 0,
              'max': 1,
              'localizedNames': {'en': 'Receiver order identifier'},
              'localizedDescriptions': {'en': 'The local identifier assigned to the test order by the order filler, usually by the Laboratory Information System (LIS).'},
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/protocol[at0004]/items[at0094]/items[at0063]/value',
              'inputs': [{'suffix': 'id', 'type': 'TEXT'}, {'suffix': 'type', 'type': 'TEXT'}, {
                'suffix': 'issuer',
                'type': 'TEXT'
              }, {'suffix': 'assigner', 'type': 'TEXT'}]
            }, {
              'id': 'text_value',
              'localizedName': 'Receiver order identifier',
              'rmType': 'DV_TEXT',
              'min': 0,
              'max': 1,
              'localizedNames': {'en': 'Receiver order identifier'},
              'localizedDescriptions': {'en': 'The local identifier assigned to the test order by the order filler, usually by the Laboratory Information System (LIS).'},
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/protocol[at0004]/items[at0094]/items[at0063]/value',
              'inputs': [{'type': 'TEXT'}]
            }]
          }]
        }, {
          'id': 'point-of-care_test',
          'name': 'Point-of-care test',
          'localizedName': 'Point-of-care test',
          'rmType': 'DV_BOOLEAN',
          'nodeId': 'at0111',
          'min': 0,
          'max': 1,
          'dependsOn': ['any_event'],
          'localizedNames': {'en': 'Point-of-care test'},
          'localizedDescriptions': {'en': 'This indicates whether the test was performed directly at Point-of-Care (POCT) as opposed to a formal result from a laboratory or other service delivery organisation.'},
          'annotations': {'comment': 'True if the test was performed directly at Point-of-Care (POCT).'},
          'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/protocol[at0004]/items[at0111]/value',
          'inputs': [{'type': 'BOOLEAN'}]
        }, {
          'id': 'additional_sample_details',
          'name': 'Additional sample details',
          'localizedName': 'Additional sample details',
          'rmType': 'CLUSTER',
          'nodeId': 'openEHR-EHR-CLUSTER.additional_sample_details.v0',
          'min': 0,
          'max': -1,
          'dependsOn': ['any_event'],
          'localizedNames': {'en': 'Additional sample details'},
          'localizedDescriptions': {'en': '*Additional sample details not included in other fields. '},
          'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/protocol[at0004]/items[openEHR-EHR-CLUSTER.additional_sample_details.v0]',
          'children': [{
            'id': 'biological_material_type',
            'name': 'Biological material type',
            'localizedName': 'Biological material type',
            'rmType': 'DV_CODED_TEXT',
            'nodeId': 'at0005',
            'min': 0,
            'max': -1,
            'localizedNames': {'en': 'Biological material type'},
            'localizedDescriptions': {'en': '*Type of the biological material, e.g. blood, urine, cerebrospinal fluid.\n\n*Slovenian mapping: "Vzorec".'},
            'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/protocol[at0004]/items[openEHR-EHR-CLUSTER.additional_sample_details.v0]/items[at0005]/value',
            'inputs': [{'suffix': 'code', 'type': 'TEXT'}, {'suffix': 'value', 'type': 'TEXT'}]
          }, {
            'id': 'additional_order_by_laboratory',
            'name': 'Additional order by laboratory?',
            'localizedName': 'Additional order by laboratory?',
            'rmType': 'DV_BOOLEAN',
            'nodeId': 'at0010',
            'min': 0,
            'max': 1,
            'localizedNames': {'en': 'Additional order by laboratory?'},
            'localizedDescriptions': {'en': '*'},
            'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/protocol[at0004]/items[openEHR-EHR-CLUSTER.additional_sample_details.v0]/items[at0010]/value',
            'inputs': [{'type': 'BOOLEAN'}]
          }]
        }, {
          'id': 'language',
          'name': 'Language',
          'rmType': 'CODE_PHRASE',
          'min': 0,
          'max': 1,
          'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/language',
          'inContext': true
        }, {
          'id': 'encoding',
          'name': 'Encoding',
          'rmType': 'CODE_PHRASE',
          'min': 0,
          'max': 1,
          'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/encoding',
          'inContext': true
        }, {
          'id': 'subject',
          'name': 'Subject',
          'rmType': 'PARTY_PROXY',
          'min': 0,
          'max': 1,
          'aqlPath': '/content[openEHR-EHR-OBSERVATION.laboratory_test_result.v1]/subject',
          'inContext': true
        }]
      }, {
        'id': 'laboratory_test_result_comment',
        'name': 'Laboratory test result comment',
        'localizedName': 'Laboratory test result comment',
        'rmType': 'EVALUATION',
        'nodeId': 'openEHR-EHR-EVALUATION.clinical_synopsis.v1',
        'min': 0,
        'max': 1,
        'localizedNames': {'en': 'Laboratory test result comment'},
        'localizedDescriptions': {'en': 'Narrative summary or overview about a patient, specifically from the perspective of a healthcare provider, and with or without associated interpretations.'},
        'aqlPath': '/content[openEHR-EHR-EVALUATION.clinical_synopsis.v1,\'Laboratory test result comment\']',
        'children': [{
          'id': 'laboratory_test_result_comment',
          'name': 'Laboratory test result comment',
          'localizedName': 'Laboratory test result comment',
          'rmType': 'DV_TEXT',
          'nodeId': 'at0002',
          'min': 1,
          'max': 1,
          'localizedNames': {'en': 'Laboratory test result comment'},
          'localizedDescriptions': {'en': 'The summary, assessment, conclusions or evaluation of the clinical findings.\n\n*Obtained from HL7 message.'},
          'aqlPath': '/content[openEHR-EHR-EVALUATION.clinical_synopsis.v1,\'Laboratory test result comment\']/data[at0001]/items[at0002,\'Laboratory test result comment\']/value',
          'inputs': [{'type': 'TEXT'}]
        }, {
          'id': 'multimedia_resource',
          'name': 'Multimedia Resource',
          'localizedName': 'Multimedia Resource',
          'rmType': 'CLUSTER',
          'nodeId': 'openEHR-EHR-CLUSTER.multimedia.v0',
          'min': 0,
          'max': -1,
          'dependsOn': ['laboratory_test_result_comment'],
          'localizedNames': {'en': 'Multimedia Resource'},
          'localizedDescriptions': {'en': 'Details about an multimedia representation of the clinical data.'},
          'aqlPath': '/content[openEHR-EHR-EVALUATION.clinical_synopsis.v1,\'Laboratory test result comment\']/protocol[at0003]/items[openEHR-EHR-CLUSTER.multimedia.v0]',
          'children': [{
            'id': 'name',
            'name': 'Name',
            'localizedName': 'Name',
            'rmType': 'DV_TEXT',
            'nodeId': 'at0002',
            'min': 0,
            'max': 1,
            'localizedNames': {'en': 'Name'},
            'localizedDescriptions': {'en': 'Title or identification of the multimedia resource.'},
            'aqlPath': '/content[openEHR-EHR-EVALUATION.clinical_synopsis.v1,\'Laboratory test result comment\']/protocol[at0003]/items[openEHR-EHR-CLUSTER.multimedia.v0]/items[at0002]/value',
            'inputs': [{'type': 'TEXT'}]
          }, {
            'id': 'description',
            'name': 'Description',
            'localizedName': 'Description',
            'rmType': 'DV_TEXT',
            'nodeId': 'at0005',
            'min': 0,
            'max': 1,
            'localizedNames': {'en': 'Description'},
            'localizedDescriptions': {'en': 'Narrative description of the multimedia resource.'},
            'aqlPath': '/content[openEHR-EHR-EVALUATION.clinical_synopsis.v1,\'Laboratory test result comment\']/protocol[at0003]/items[openEHR-EHR-CLUSTER.multimedia.v0]/items[at0005]/value',
            'inputs': [{'type': 'TEXT'}]
          }, {
            'id': 'multimedia',
            'name': 'Multimedia',
            'localizedName': 'Multimedia',
            'rmType': 'DV_MULTIMEDIA',
            'nodeId': 'at0001',
            'min': 0,
            'max': 1,
            'localizedNames': {'en': 'Multimedia'},
            'localizedDescriptions': {'en': 'Multimedia representation of the clinical observation or finding.'},
            'aqlPath': '/content[openEHR-EHR-EVALUATION.clinical_synopsis.v1,\'Laboratory test result comment\']/protocol[at0003]/items[openEHR-EHR-CLUSTER.multimedia.v0]/items[at0001]/value',
            'inputs': [{'type': 'TEXT'}]
          }, {
            'id': 'source',
            'name': 'Source',
            'localizedName': 'Source',
            'rmType': 'DV_TEXT',
            'nodeId': 'at0003',
            'min': 0,
            'max': 1,
            'localizedNames': {'en': 'Source'},
            'localizedDescriptions': {'en': 'The source of the multimedia resource.'},
            'aqlPath': '/content[openEHR-EHR-EVALUATION.clinical_synopsis.v1,\'Laboratory test result comment\']/protocol[at0003]/items[openEHR-EHR-CLUSTER.multimedia.v0]/items[at0003]/value',
            'inputs': [{'type': 'TEXT'}]
          }, {
            'id': 'author',
            'name': 'Author',
            'localizedName': 'Author',
            'rmType': 'DV_TEXT',
            'nodeId': 'at0009',
            'min': 0,
            'max': 1,
            'localizedNames': {'en': 'Author'},
            'localizedDescriptions': {'en': 'Name of the creator of the resource.'},
            'aqlPath': '/content[openEHR-EHR-EVALUATION.clinical_synopsis.v1,\'Laboratory test result comment\']/protocol[at0003]/items[openEHR-EHR-CLUSTER.multimedia.v0]/items[at0009]/value',
            'inputs': [{'type': 'TEXT'}]
          }, {
            'id': 'date_created',
            'name': 'Date created',
            'localizedName': 'Date created',
            'rmType': 'DV_DATE_TIME',
            'nodeId': 'at0004',
            'min': 0,
            'max': 1,
            'localizedNames': {'en': 'Date created'},
            'localizedDescriptions': {'en': 'Date/time that the multimedia resource was created.'},
            'aqlPath': '/content[openEHR-EHR-EVALUATION.clinical_synopsis.v1,\'Laboratory test result comment\']/protocol[at0003]/items[openEHR-EHR-CLUSTER.multimedia.v0]/items[at0004]/value',
            'inputs': [{'type': 'DATETIME'}]
          }, {
            'id': 'date_published',
            'name': 'Date published',
            'localizedName': 'Date published',
            'rmType': 'DV_DATE_TIME',
            'nodeId': 'at0006',
            'min': 0,
            'max': 1,
            'localizedNames': {'en': 'Date published'},
            'localizedDescriptions': {'en': 'Date/time that the multimedia resource was published.'},
            'aqlPath': '/content[openEHR-EHR-EVALUATION.clinical_synopsis.v1,\'Laboratory test result comment\']/protocol[at0003]/items[openEHR-EHR-CLUSTER.multimedia.v0]/items[at0006]/value',
            'inputs': [{'type': 'DATETIME'}]
          }]
        }, {
          'id': 'language',
          'name': 'Language',
          'rmType': 'CODE_PHRASE',
          'min': 0,
          'max': 1,
          'aqlPath': '/content[openEHR-EHR-EVALUATION.clinical_synopsis.v1,\'Laboratory test result comment\']/language',
          'inContext': true
        }, {
          'id': 'encoding',
          'name': 'Encoding',
          'rmType': 'CODE_PHRASE',
          'min': 0,
          'max': 1,
          'aqlPath': '/content[openEHR-EHR-EVALUATION.clinical_synopsis.v1,\'Laboratory test result comment\']/encoding',
          'inContext': true
        }, {
          'id': 'subject',
          'name': 'Subject',
          'rmType': 'PARTY_PROXY',
          'min': 0,
          'max': 1,
          'aqlPath': '/content[openEHR-EHR-EVALUATION.clinical_synopsis.v1,\'Laboratory test result comment\']/subject',
          'inContext': true
        }]
      }, {
        'id': 'category',
        'rmType': 'DV_CODED_TEXT',
        'min': 1,
        'max': 1,
        'aqlPath': '/category',
        'inputs': [{
          'suffix': 'code',
          'type': 'CODED_TEXT',
          'list': [{'value': '433', 'label': 'event', 'localizedLabels': {'en': 'event'}}],
          'terminology': 'openehr'
        }],
        'inContext': true
      }, {
        'id': 'language',
        'name': 'Language',
        'rmType': 'CODE_PHRASE',
        'min': 0,
        'max': 1,
        'aqlPath': '/language',
        'inContext': true
      }, {
        'id': 'territory',
        'name': 'Territory',
        'rmType': 'CODE_PHRASE',
        'min': 0,
        'max': 1,
        'aqlPath': '/territory',
        'inContext': true
      }, {
        'id': 'composer',
        'name': 'Composer',
        'rmType': 'PARTY_PROXY',
        'min': 0,
        'max': 1,
        'aqlPath': '/composer',
        'inContext': true
      }]
    }
  }
};


export const medicationOrderTemplate = {
  "meta": {"href": "https://thinkehr.marand.si:8083/rest/v1/template/FHIR%20-%20MED%20-%20Medication%20Order"},
  "webTemplate": {
    "templateId": "FHIR - MED - Medication Order",
    "version": "2.3",
    "defaultLanguage": "en",
    "languages": ["en"],
    "tree": {
      "id": "medication_order",
      "name": "Medication order",
      "localizedName": "Medication order",
      "rmType": "COMPOSITION",
      "nodeId": "openEHR-EHR-COMPOSITION.encounter.v1",
      "min": 1,
      "max": 1,
      "localizedNames": {"en": "Medication order"},
      "localizedDescriptions": {"en": "Interaction, contact or care event between a subject of care and healthcare provider(s)."},
      "annotations": {
        "fhir|and|MedicationRequest|all|select|name/value": "name",
        "fhir|and|MedicationRequest|all|select|archetype_details/archetype_id/value": "archetypeId",
        "fhir|and|MedicationRequest|all|select|context/setting": "category"
      },
      "aqlPath": "",
      "children": [{
        "id": "context", "rmType": "EVENT_CONTEXT", "min": 1, "max": 1, "aqlPath": "/context", "children": [{
          "id": "context_detail",
          "name": "Context detail ",
          "localizedName": "Context detail ",
          "rmType": "CLUSTER",
          "nodeId": "openEHR-EHR-CLUSTER.composition_context_detail.v1",
          "min": 0,
          "max": -1,
          "localizedNames": {"en": "Context detail "},
          "localizedDescriptions": {"en": "Additional contextual detail to be applied to all compositions."},
          "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.composition_context_detail.v1]",
          "children": [{
            "id": "period_of_care_identifier",
            "name": "Period of care identifier",
            "localizedName": "Period of care identifier",
            "rmType": "DV_TEXT",
            "nodeId": "at0001",
            "min": 0,
            "max": 1,
            "localizedNames": {"en": "Period of care identifier"},
            "localizedDescriptions": {"en": "The period of care to which this composition belongs. This equates to the CONTSYS concept and repesents an admisitrative or contractual spell of care, involving a specific instiution or care provider."},
            "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.composition_context_detail.v1]/items[at0001]/value",
            "inputs": [{"type": "TEXT"}]
          }, {
            "id": "departmental_period_of_care_identifier",
            "name": "Departmental period of care identifier",
            "localizedName": "Departmental period of care identifier",
            "rmType": "DV_TEXT",
            "nodeId": "at0002",
            "min": 0,
            "max": 1,
            "localizedNames": {"en": "Departmental period of care identifier"},
            "localizedDescriptions": {"en": "The identifier of the departmental period of care to which this Composition belongs."},
            "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.composition_context_detail.v1]/items[at0002]/value",
            "inputs": [{"type": "TEXT"}]
          }, {
            "id": "portlet_id",
            "name": "Portlet Id",
            "localizedName": "Portlet Id",
            "rmType": "DV_TEXT",
            "nodeId": "at0003",
            "min": 0,
            "max": 1,
            "localizedNames": {"en": "Portlet Id"},
            "localizedDescriptions": {"en": "Portlet ID from which stores the information where was the composition saved."},
            "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.composition_context_detail.v1]/items[at0003]/value",
            "inputs": [{"type": "TEXT"}]
          }, {
            "id": "medication_order_type",
            "name": "Medication order type",
            "localizedName": "Medication order type",
            "rmType": "DV_CODED_TEXT",
            "nodeId": "at0004",
            "min": 0,
            "max": 1,
            "localizedNames": {"en": "Medication order type"},
            "localizedDescriptions": {"en": "*"},
            "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.composition_context_detail.v1]/items[at0004]/value",
            "inputs": [{
              "suffix": "code",
              "type": "CODED_TEXT",
              "list": [{
                "value": "at0005",
                "label": "Oral",
                "localizedLabels": {"en": "Oral"},
                "localizedDescriptions": {"en": "*"}
              }, {
                "value": "at0006",
                "label": "Intravenous",
                "localizedLabels": {"en": "Intravenous"},
                "localizedDescriptions": {"en": "*"}
              }, {
                "value": "at0007",
                "label": "Mixture",
                "localizedLabels": {"en": "Mixture"},
                "localizedDescriptions": {"en": "*"}
              }]
            }]
          }, {
            "id": "tags",
            "name": "Tags",
            "localizedName": "Tags",
            "rmType": "DV_TEXT",
            "nodeId": "at0008",
            "min": 0,
            "max": -1,
            "localizedNames": {"en": "Tags"},
            "localizedDescriptions": {"en": "*"},
            "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.composition_context_detail.v1]/items[at0008]/value",
            "inputs": [{"type": "TEXT"}]
          }, {
            "id": "document_status",
            "name": "Document status",
            "localizedName": "Document status",
            "rmType": "DV_CODED_TEXT",
            "nodeId": "at0010",
            "min": 0,
            "max": 1,
            "localizedNames": {"en": "Document status"},
            "localizedDescriptions": {"en": "*"},
            "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.composition_context_detail.v1]/items[at0010]/value",
            "inputs": [{
              "suffix": "code",
              "type": "CODED_TEXT",
              "list": [{
                "value": "at0011",
                "label": "Authorised",
                "localizedLabels": {"en": "Authorised"},
                "localizedDescriptions": {"en": "*"}
              }, {
                "value": "at0012",
                "label": "Confirmed",
                "localizedLabels": {"en": "Confirmed"},
                "localizedDescriptions": {"en": "*"}
              }, {
                "value": "at0013",
                "label": "Open",
                "localizedLabels": {"en": "Open"},
                "localizedDescriptions": {"en": "*"}
              }]
            }]
          }, {
            "id": "attachment",
            "name": "Attachment",
            "localizedName": "Attachment",
            "rmType": "DV_MULTIMEDIA",
            "nodeId": "at0009",
            "min": 0,
            "max": -1,
            "localizedNames": {"en": "Attachment"},
            "localizedDescriptions": {"en": "*"},
            "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.composition_context_detail.v1]/items[at0009]/value",
            "inputs": [{"type": "TEXT"}]
          }]
        }, {
          "id": "start_time",
          "name": "Start_time",
          "rmType": "DV_DATE_TIME",
          "min": 0,
          "max": 1,
          "aqlPath": "/context/start_time",
          "inputs": [{"type": "DATETIME"}],
          "inContext": true
        }, {
          "id": "setting",
          "name": "Setting",
          "rmType": "DV_CODED_TEXT",
          "min": 0,
          "max": 1,
          "aqlPath": "/context/setting",
          "inputs": [{"suffix": "code", "type": "TEXT"}, {"suffix": "value", "type": "TEXT"}],
          "inContext": true
        }]
      }, {
        "id": "medication_detail",
        "name": "Medication detail",
        "localizedName": "Medication detail",
        "rmType": "SECTION",
        "nodeId": "openEHR-EHR-SECTION.medication.v1",
        "min": 0,
        "max": 1,
        "localizedNames": {"en": "Medication detail"},
        "localizedDescriptions": {"en": "A section containing medication orders and their associated actions."},
        "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']",
        "children": [{
          "id": "medication_instruction",
          "name": "Medication instruction",
          "localizedName": "Medication instruction",
          "rmType": "INSTRUCTION",
          "nodeId": "openEHR-EHR-INSTRUCTION.medication.v1",
          "min": 0,
          "max": -1,
          "localizedNames": {"en": "Medication instruction"},
          "localizedDescriptions": {"en": "Details of a medicine, vaccine or other therapeutic good with instructions for use."},
          "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]",
          "children": [{
            "id": "order",
            "name": "Order",
            "localizedName": "Order",
            "rmType": "ACTIVITY",
            "nodeId": "at0001",
            "min": 0,
            "max": 1,
            "localizedNames": {"en": "Order"},
            "localizedDescriptions": {"en": "The instructions for a particular medicine, vaccine or other therapeutic good including dose and timing."},
            "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]",
            "children": [{
              "id": "medicine",
              "name": "Medicine",
              "localizedName": "Medicine",
              "rmType": "DV_TEXT",
              "nodeId": "at0003",
              "min": 1,
              "max": 1,
              "localizedNames": {"en": "Medicine"},
              "localizedDescriptions": {"en": "The medicine, vaccine or other therapeutic good being ordered, administered to or used by the subject of care. This item should be coded if possible."},
              "annotations": {
                "fhir|and|Medication|all|select|value": "medication",
                "fhir|and|Medication|code|where|value/defining_code/code_string": ":code",
                "fhir|and|Medication|all|select|name/value": "name"
              },
              "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0003]/value",
              "inputs": [{"type": "TEXT"}]
            }, {
              "id": "directions",
              "name": "Directions",
              "localizedName": "Directions",
              "rmType": "DV_TEXT",
              "nodeId": "at0009",
              "min": 0,
              "max": 1,
              "localizedNames": {"en": "Directions"},
              "localizedDescriptions": {"en": "A complete narrative description of how much, when and how to use the medicine, vaccine or other therapeutic good."},
              "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0009]/value",
              "inputs": [{"type": "TEXT"}]
            }, {
              "id": "dose_description",
              "name": "Dose description",
              "localizedName": "Dose description",
              "rmType": "DV_TEXT",
              "nodeId": "at0005",
              "min": 0,
              "max": 1,
              "localizedNames": {"en": "Dose description"},
              "localizedDescriptions": {"en": "The amount and units of the medicine, vaccine or other therapeutic good to be used or administered at one time."},
              "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0005]/value",
              "inputs": [{"type": "TEXT"}]
            }, {
              "id": "medication_timing",
              "name": "Medication timing",
              "localizedName": "Medication timing",
              "rmType": "CLUSTER",
              "nodeId": "at0010",
              "min": 0,
              "max": 1,
              "localizedNames": {"en": "Medication timing"},
              "localizedDescriptions": {"en": "Details of the timing of the use or administration of the medicine, vaccine or other therapeutic good."},
              "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0010,'Medication timing']",
              "children": [{
                "id": "timing_description",
                "name": "Timing description",
                "localizedName": "Timing description",
                "rmType": "DV_TEXT",
                "nodeId": "at0008",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Timing description"},
                "localizedDescriptions": {"en": "The timing of the doses, which may include frequency and details such as relationship to food."},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0010,'Medication timing']/items[at0008]/value",
                "inputs": [{"type": "TEXT"}]
              }, {
                "id": "prn",
                "name": "PRN",
                "localizedName": "PRN",
                "rmType": "DV_BOOLEAN",
                "nodeId": "at0029",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "PRN"},
                "localizedDescriptions": {"en": "The timing is dependent within limits on the subject of care's condition or symptoms  (e.g. 4hrly p.r.n. means the medicine can be taken as frequently as every four hours if necessary). \"Pro re nata\" in latin means as circumstances arise."},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0010,'Medication timing']/items[at0029]/value",
                "inputs": [{"type": "BOOLEAN"}]
              }, {
                "id": "start_criterion",
                "name": "Start criterion",
                "localizedName": "Start criterion",
                "rmType": "DV_TEXT",
                "nodeId": "at0011",
                "min": 0,
                "max": -1,
                "localizedNames": {"en": "Start criterion"},
                "localizedDescriptions": {"en": "A condition which, when met, requires the start of administration or use."},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0010,'Medication timing']/items[at0011]/value",
                "inputs": [{"type": "TEXT"}]
              }, {
                "id": "start_date",
                "name": "Start date",
                "localizedName": "Start date",
                "rmType": "DV_DATE_TIME",
                "nodeId": "at0012",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Start date"},
                "localizedDescriptions": {"en": "The date and optional time to begin using the medicine, vaccine or other therapeutic good."},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0010,'Medication timing']/items[at0012]/value",
                "inputs": [{"type": "DATETIME"}]
              }, {
                "id": "stop_criterion",
                "name": "Stop criterion",
                "localizedName": "Stop criterion",
                "rmType": "DV_TEXT",
                "nodeId": "at0016",
                "min": 0,
                "max": -1,
                "localizedNames": {"en": "Stop criterion"},
                "localizedDescriptions": {"en": "A condition which, when met, requires the cessation of administration or use."},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0010,'Medication timing']/items[at0016]/value",
                "inputs": [{"type": "TEXT"}]
              }, {
                "id": "stop_date",
                "name": "Stop date",
                "localizedName": "Stop date",
                "rmType": "DV_DATE_TIME",
                "nodeId": "at0013",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Stop date"},
                "localizedDescriptions": {"en": "The date and optional time to stop using the medicine, vaccine or other therapeutic good."},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0010,'Medication timing']/items[at0013]/value",
                "inputs": [{"type": "DATETIME"}]
              }, {
                "id": "duration_of_treatment",
                "name": "Duration of treatment",
                "localizedName": "Duration of treatment",
                "rmType": "DV_DURATION",
                "nodeId": "at0014",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Duration of treatment"},
                "localizedDescriptions": {"en": "The length of time for which the medicine, vaccine or other therapeutic good should be used or administered (from the initial dose to the final dose)."},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0010,'Medication timing']/items[at0014]/value",
                "inputs": [{
                  "suffix": "year",
                  "type": "INTEGER",
                  "validation": {"range": {"minOp": ">=", "min": 0}}
                }, {
                  "suffix": "month",
                  "type": "INTEGER",
                  "validation": {"range": {"minOp": ">=", "min": 0}}
                }, {
                  "suffix": "day",
                  "type": "INTEGER",
                  "validation": {"range": {"minOp": ">=", "min": 0}}
                }, {
                  "suffix": "week",
                  "type": "INTEGER",
                  "validation": {"range": {"minOp": ">=", "min": 0}}
                }, {
                  "suffix": "hour",
                  "type": "INTEGER",
                  "validation": {"range": {"minOp": ">=", "min": 0}}
                }, {
                  "suffix": "minute",
                  "type": "INTEGER",
                  "validation": {"range": {"minOp": ">=", "min": 0}}
                }, {"suffix": "second", "type": "INTEGER", "validation": {"range": {"minOp": ">=", "min": 0}}}]
              }, {
                "id": "number_of_administrations",
                "name": "Number of administrations",
                "localizedName": "Number of administrations",
                "rmType": "DV_COUNT",
                "nodeId": "at0015",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Number of administrations"},
                "localizedDescriptions": {"en": "The total number of doses of the medicine, vaccine or other therapeutic good that are to be used or administered (from the initial dose to the final dose)."},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0010,'Medication timing']/items[at0015]/value",
                "inputs": [{"type": "INTEGER"}]
              }, {
                "id": "long-term",
                "name": "Long-term",
                "localizedName": "Long-term",
                "rmType": "DV_BOOLEAN",
                "nodeId": "at0017",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Long-term"},
                "localizedDescriptions": {"en": "It is anticipated that the medicine, vaccine or therapeutic good will be re-prescribed or re-dispensed over a period of time."},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0010,'Medication timing']/items[at0017]/value",
                "inputs": [{"type": "BOOLEAN"}]
              }, {
                "id": "timing",
                "name": "Timing",
                "localizedName": "Timing",
                "rmType": "CLUSTER",
                "nodeId": "openEHR-EHR-CLUSTER.timing.v1",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Timing"},
                "localizedDescriptions": {"en": "Structured information about the timing (intended or actual) of administration or use of a medicine, other therapeutic good or other intervention that is given on a scheduled basis."},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0010,'Medication timing']/items[openEHR-EHR-CLUSTER.timing.v1]",
                "children": [{
                  "id": "daily_count",
                  "name": "Daily count",
                  "localizedName": "Daily count",
                  "rmType": "DV_COUNT",
                  "nodeId": "at0001",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Daily count"},
                  "localizedDescriptions": {"en": "This is the actual or maximum number of doses or other interventions that are to be administered in a 24 hour period."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0010,'Medication timing']/items[openEHR-EHR-CLUSTER.timing.v1]/items[at0001]/value",
                  "inputs": [{"type": "INTEGER"}]
                }, {
                  "id": "frequency",
                  "name": "Frequency",
                  "localizedName": "Frequency",
                  "rmType": "DV_QUANTITY",
                  "nodeId": "at0003",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Frequency"},
                  "localizedDescriptions": {"en": "The frequency as number of times per time period that the intervention is to take place."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0010,'Medication timing']/items[openEHR-EHR-CLUSTER.timing.v1]/items[at0003]/value",
                  "inputs": [{"suffix": "magnitude", "type": "DECIMAL"}, {
                    "suffix": "unit",
                    "type": "CODED_TEXT",
                    "list": [{
                      "value": "/d",
                      "label": "/d",
                      "validation": {"range": {"minOp": ">=", "min": 0.0}}
                    }, {
                      "value": "/wk",
                      "label": "/wk",
                      "validation": {"range": {"minOp": ">=", "min": 0.0}}
                    }, {
                      "value": "/mo",
                      "label": "/mo",
                      "validation": {"range": {"minOp": ">=", "min": 0.0}}
                    }, {
                      "value": "/yr",
                      "label": "/yr",
                      "validation": {"range": {"minOp": ">=", "min": 0.0}}
                    }, {
                      "value": "/min",
                      "label": "/min",
                      "validation": {"range": {"minOp": ">=", "min": 0.0}}
                    }, {
                      "value": "/s",
                      "label": "/s",
                      "validation": {"range": {"minOp": ">=", "min": 0.0}}
                    }, {"value": "/h", "label": "/h", "validation": {"range": {"minOp": ">=", "min": 0.0}}}]
                  }]
                }, {
                  "id": "interval",
                  "name": "Interval",
                  "localizedName": "Interval",
                  "rmType": "DV_DURATION",
                  "nodeId": "at0014",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Interval"},
                  "localizedDescriptions": {"en": "The length of time between doses or interventions. 8 Hourly is PT8H, monthly is P1M, every hour and a half is PT1H30M."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0010,'Medication timing']/items[openEHR-EHR-CLUSTER.timing.v1]/items[at0014]/value",
                  "inputs": [{
                    "suffix": "year",
                    "type": "INTEGER",
                    "validation": {"range": {"minOp": ">=", "min": 0}}
                  }, {
                    "suffix": "month",
                    "type": "INTEGER",
                    "validation": {"range": {"minOp": ">=", "min": 0}}
                  }, {
                    "suffix": "day",
                    "type": "INTEGER",
                    "validation": {"range": {"minOp": ">=", "min": 0}}
                  }, {
                    "suffix": "week",
                    "type": "INTEGER",
                    "validation": {"range": {"minOp": ">=", "min": 0}}
                  }, {
                    "suffix": "hour",
                    "type": "INTEGER",
                    "validation": {"range": {"minOp": ">=", "min": 0}}
                  }, {
                    "suffix": "minute",
                    "type": "INTEGER",
                    "validation": {"range": {"minOp": ">=", "min": 0}}
                  }, {"suffix": "second", "type": "INTEGER", "validation": {"range": {"minOp": ">=", "min": 0}}}]
                }, {
                  "id": "variable_frequency",
                  "name": "Variable frequency",
                  "localizedName": "Variable frequency",
                  "rmType": "CLUSTER",
                  "nodeId": "at0015",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Variable frequency"},
                  "localizedDescriptions": {"en": "Details of variable upper and lower frequency e.g. 3-4 times a day."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0010,'Medication timing']/items[openEHR-EHR-CLUSTER.timing.v1]/items[at0015]",
                  "children": [{
                    "id": "upper",
                    "name": "Upper",
                    "localizedName": "Upper",
                    "rmType": "CLUSTER",
                    "nodeId": "at0016",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Upper"},
                    "localizedDescriptions": {"en": "The upper value of frequency."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0010,'Medication timing']/items[openEHR-EHR-CLUSTER.timing.v1]/items[at0015]/items[at0016]",
                    "children": [{
                      "id": "frequency",
                      "name": "Frequency",
                      "localizedName": "Frequency",
                      "rmType": "DV_QUANTITY",
                      "nodeId": "at0003",
                      "min": 0,
                      "max": 1,
                      "localizedNames": {"en": "Frequency"},
                      "localizedDescriptions": {"en": "The frequency as number of times per time period that the intervention is to take place."},
                      "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0010,'Medication timing']/items[openEHR-EHR-CLUSTER.timing.v1]/items[at0015]/items[at0016]/items[at0003]/value",
                      "inputs": [{"suffix": "magnitude", "type": "DECIMAL"}, {
                        "suffix": "unit",
                        "type": "CODED_TEXT",
                        "list": [{
                          "value": "/d",
                          "label": "/d",
                          "validation": {"range": {"minOp": ">=", "min": 0.0}}
                        }, {
                          "value": "/wk",
                          "label": "/wk",
                          "validation": {"range": {"minOp": ">=", "min": 0.0}}
                        }, {
                          "value": "/mo",
                          "label": "/mo",
                          "validation": {"range": {"minOp": ">=", "min": 0.0}}
                        }, {
                          "value": "/yr",
                          "label": "/yr",
                          "validation": {"range": {"minOp": ">=", "min": 0.0}}
                        }, {
                          "value": "/min",
                          "label": "/min",
                          "validation": {"range": {"minOp": ">=", "min": 0.0}}
                        }, {
                          "value": "/s",
                          "label": "/s",
                          "validation": {"range": {"minOp": ">=", "min": 0.0}}
                        }, {"value": "/h", "label": "/h", "validation": {"range": {"minOp": ">=", "min": 0.0}}}]
                      }]
                    }]
                  }, {
                    "id": "lower",
                    "name": "Lower",
                    "localizedName": "Lower",
                    "rmType": "CLUSTER",
                    "nodeId": "at0017",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Lower"},
                    "localizedDescriptions": {"en": "The lower value of frequency."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0010,'Medication timing']/items[openEHR-EHR-CLUSTER.timing.v1]/items[at0015]/items[at0017]",
                    "children": [{
                      "id": "frequency",
                      "name": "Frequency",
                      "localizedName": "Frequency",
                      "rmType": "DV_QUANTITY",
                      "nodeId": "at0003",
                      "min": 0,
                      "max": 1,
                      "localizedNames": {"en": "Frequency"},
                      "localizedDescriptions": {"en": "The frequency as number of times per time period that the intervention is to take place."},
                      "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0010,'Medication timing']/items[openEHR-EHR-CLUSTER.timing.v1]/items[at0015]/items[at0017]/items[at0003]/value",
                      "inputs": [{"suffix": "magnitude", "type": "DECIMAL"}, {
                        "suffix": "unit",
                        "type": "CODED_TEXT",
                        "list": [{
                          "value": "/d",
                          "label": "/d",
                          "validation": {"range": {"minOp": ">=", "min": 0.0}}
                        }, {
                          "value": "/wk",
                          "label": "/wk",
                          "validation": {"range": {"minOp": ">=", "min": 0.0}}
                        }, {
                          "value": "/mo",
                          "label": "/mo",
                          "validation": {"range": {"minOp": ">=", "min": 0.0}}
                        }, {
                          "value": "/yr",
                          "label": "/yr",
                          "validation": {"range": {"minOp": ">=", "min": 0.0}}
                        }, {
                          "value": "/min",
                          "label": "/min",
                          "validation": {"range": {"minOp": ">=", "min": 0.0}}
                        }, {
                          "value": "/s",
                          "label": "/s",
                          "validation": {"range": {"minOp": ">=", "min": 0.0}}
                        }, {"value": "/h", "label": "/h", "validation": {"range": {"minOp": ">=", "min": 0.0}}}]
                      }]
                    }]
                  }]
                }, {
                  "id": "variable_interval",
                  "name": "Variable interval",
                  "localizedName": "Variable interval",
                  "rmType": "CLUSTER",
                  "nodeId": "at0019",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Variable interval"},
                  "localizedDescriptions": {"en": "Details of variable upper and lower intervals e.g. every 2-3 hours."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0010,'Medication timing']/items[openEHR-EHR-CLUSTER.timing.v1]/items[at0019]",
                  "children": [{
                    "id": "upper",
                    "name": "Upper",
                    "localizedName": "Upper",
                    "rmType": "CLUSTER",
                    "nodeId": "at0020",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Upper"},
                    "localizedDescriptions": {"en": "The upper value of the interval."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0010,'Medication timing']/items[openEHR-EHR-CLUSTER.timing.v1]/items[at0019]/items[at0020]",
                    "children": [{
                      "id": "interval",
                      "name": "Interval",
                      "localizedName": "Interval",
                      "rmType": "DV_DURATION",
                      "nodeId": "at0014",
                      "min": 0,
                      "max": 1,
                      "localizedNames": {"en": "Interval"},
                      "localizedDescriptions": {"en": "The length of time between doses or interventions. 8 Hourly is PT8H, monthly is P1M, every hour and a half is PT1H30M."},
                      "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0010,'Medication timing']/items[openEHR-EHR-CLUSTER.timing.v1]/items[at0019]/items[at0020]/items[at0014]/value",
                      "inputs": [{
                        "suffix": "year",
                        "type": "INTEGER",
                        "validation": {"range": {"minOp": ">=", "min": 0}}
                      }, {
                        "suffix": "month",
                        "type": "INTEGER",
                        "validation": {"range": {"minOp": ">=", "min": 0}}
                      }, {
                        "suffix": "day",
                        "type": "INTEGER",
                        "validation": {"range": {"minOp": ">=", "min": 0}}
                      }, {
                        "suffix": "week",
                        "type": "INTEGER",
                        "validation": {"range": {"minOp": ">=", "min": 0}}
                      }, {
                        "suffix": "hour",
                        "type": "INTEGER",
                        "validation": {"range": {"minOp": ">=", "min": 0}}
                      }, {
                        "suffix": "minute",
                        "type": "INTEGER",
                        "validation": {"range": {"minOp": ">=", "min": 0}}
                      }, {"suffix": "second", "type": "INTEGER", "validation": {"range": {"minOp": ">=", "min": 0}}}]
                    }]
                  }, {
                    "id": "lower",
                    "name": "Lower",
                    "localizedName": "Lower",
                    "rmType": "CLUSTER",
                    "nodeId": "at0021",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Lower"},
                    "localizedDescriptions": {"en": "The lower value of the interval."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0010,'Medication timing']/items[openEHR-EHR-CLUSTER.timing.v1]/items[at0019]/items[at0021]",
                    "children": [{
                      "id": "interval",
                      "name": "Interval",
                      "localizedName": "Interval",
                      "rmType": "DV_DURATION",
                      "nodeId": "at0014",
                      "min": 0,
                      "max": 1,
                      "localizedNames": {"en": "Interval"},
                      "localizedDescriptions": {"en": "The length of time between doses or interventions. 8 Hourly is PT8H, monthly is P1M, every hour and a half is PT1H30M."},
                      "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0010,'Medication timing']/items[openEHR-EHR-CLUSTER.timing.v1]/items[at0019]/items[at0021]/items[at0014]/value",
                      "inputs": [{
                        "suffix": "year",
                        "type": "INTEGER",
                        "validation": {"range": {"minOp": ">=", "min": 0}}
                      }, {
                        "suffix": "month",
                        "type": "INTEGER",
                        "validation": {"range": {"minOp": ">=", "min": 0}}
                      }, {
                        "suffix": "day",
                        "type": "INTEGER",
                        "validation": {"range": {"minOp": ">=", "min": 0}}
                      }, {
                        "suffix": "week",
                        "type": "INTEGER",
                        "validation": {"range": {"minOp": ">=", "min": 0}}
                      }, {
                        "suffix": "hour",
                        "type": "INTEGER",
                        "validation": {"range": {"minOp": ">=", "min": 0}}
                      }, {
                        "suffix": "minute",
                        "type": "INTEGER",
                        "validation": {"range": {"minOp": ">=", "min": 0}}
                      }, {"suffix": "second", "type": "INTEGER", "validation": {"range": {"minOp": ">=", "min": 0}}}]
                    }]
                  }]
                }, {
                  "id": "time",
                  "name": "Time",
                  "localizedName": "Time",
                  "rmType": "DV_TIME",
                  "nodeId": "at0004",
                  "min": 0,
                  "max": -1,
                  "localizedNames": {"en": "Time"},
                  "localizedDescriptions": {"en": "Specific time(s) during the day when the intervention should be applied."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0010,'Medication timing']/items[openEHR-EHR-CLUSTER.timing.v1]/items[at0004]/value",
                  "inputs": [{"type": "TIME"}]
                }, {
                  "id": "day_of_week",
                  "name": "Day of week",
                  "localizedName": "Day of week",
                  "rmType": "DV_CODED_TEXT",
                  "nodeId": "at0006",
                  "min": 0,
                  "max": -1,
                  "localizedNames": {"en": "Day of week"},
                  "localizedDescriptions": {"en": "The specific and repeating day(s) of the week."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0010,'Medication timing']/items[openEHR-EHR-CLUSTER.timing.v1]/items[at0006]/value",
                  "inputs": [{
                    "suffix": "code",
                    "type": "CODED_TEXT",
                    "list": [{
                      "value": "at0007",
                      "label": "Monday",
                      "localizedLabels": {"en": "Monday"},
                      "localizedDescriptions": {"en": "Monday."}
                    }, {
                      "value": "at0008",
                      "label": "Tuesday",
                      "localizedLabels": {"en": "Tuesday"},
                      "localizedDescriptions": {"en": "Tuesday."}
                    }, {
                      "value": "at0009",
                      "label": "Wednesday",
                      "localizedLabels": {"en": "Wednesday"},
                      "localizedDescriptions": {"en": "Wednesday."}
                    }, {
                      "value": "at0010",
                      "label": "Thursday",
                      "localizedLabels": {"en": "Thursday"},
                      "localizedDescriptions": {"en": "Thursday."}
                    }, {
                      "value": "at0011",
                      "label": "Friday",
                      "localizedLabels": {"en": "Friday"},
                      "localizedDescriptions": {"en": "Friday."}
                    }, {
                      "value": "at0012",
                      "label": "Saturday",
                      "localizedLabels": {"en": "Saturday"},
                      "localizedDescriptions": {"en": "Saturday."}
                    }, {
                      "value": "at0013",
                      "label": "Sunday",
                      "localizedLabels": {"en": "Sunday"},
                      "localizedDescriptions": {"en": "Sunday."}
                    }]
                  }]
                }, {
                  "id": "day_of_month",
                  "name": "Day of month",
                  "localizedName": "Day of month",
                  "rmType": "DV_COUNT",
                  "nodeId": "at0005",
                  "min": 0,
                  "max": -1,
                  "localizedNames": {"en": "Day of month"},
                  "localizedDescriptions": {"en": "The specific and repeating day(s) of the month e.g. if it is required to give a dose on the 2nd day of each month then the value is 2."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0010,'Medication timing']/items[openEHR-EHR-CLUSTER.timing.v1]/items[at0005]/value",
                  "inputs": [{
                    "type": "INTEGER",
                    "validation": {"range": {"minOp": ">=", "min": 1, "maxOp": "<=", "max": 31}}
                  }]
                }, {
                  "id": "date",
                  "name": "Date",
                  "localizedName": "Date",
                  "rmType": "DV_DATE",
                  "nodeId": "at0018",
                  "min": 0,
                  "max": -1,
                  "localizedNames": {"en": "Date"},
                  "localizedDescriptions": {"en": "Actual dates."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0010,'Medication timing']/items[openEHR-EHR-CLUSTER.timing.v1]/items[at0018]/value",
                  "inputs": [{"type": "DATE"}]
                }]
              }]
            }, {
              "id": "additional_instruction",
              "name": "Additional instruction",
              "localizedName": "Additional instruction",
              "rmType": "DV_TEXT",
              "nodeId": "at0044",
              "min": 0,
              "max": -1,
              "localizedNames": {"en": "Additional instruction"},
              "localizedDescriptions": {"en": "An additional statement on how to use the medicine, vaccine or other therapeutic good."},
              "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0044]/value",
              "inputs": [{"type": "TEXT"}]
            }, {
              "id": "clinical_indication",
              "name": "Clinical Indication",
              "localizedName": "Clinical Indication",
              "rmType": "DV_TEXT",
              "nodeId": "at0018",
              "min": 0,
              "max": -1,
              "localizedNames": {"en": "Clinical Indication"},
              "localizedDescriptions": {"en": "A reason for ordering the medicine, vaccine or other therapeutic good."},
              "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0018]/value",
              "inputs": [{"type": "TEXT"}]
            }, {
              "id": "comment",
              "name": "Comment",
              "localizedName": "Comment",
              "rmType": "DV_TEXT",
              "nodeId": "at0035",
              "min": 0,
              "max": -1,
              "localizedNames": {"en": "Comment"},
              "localizedDescriptions": {"en": "Any additional information that may be needed to ensure the continuity of supply, rationale for current dose and timing, or safe and appropriate use."},
              "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[at0035]/value",
              "inputs": [{"type": "TEXT"}]
            }, {
              "id": "ingredients_and_form",
              "name": "Ingredients and form",
              "localizedName": "Ingredients and form",
              "rmType": "CLUSTER",
              "nodeId": "openEHR-EHR-CLUSTER.chemical_description_mnd.v1",
              "min": 0,
              "max": 1,
              "localizedNames": {"en": "Ingredients and form"},
              "localizedDescriptions": {"en": "The actual ingredients with strength and overall form of a chemical or medication."},
              "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']",
              "children": [{
                "id": "form",
                "name": "Form",
                "localizedName": "Form",
                "rmType": "DV_TEXT",
                "nodeId": "at0010",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Form"},
                "localizedDescriptions": {"en": "The formulation or presentation of the overall substance."},
                "annotations": {
                  "fhir|and|Medication|form|where|value/defining_code/code_string": ":form",
                  "fhir|explicit|Medication|all|select|value": "ingredient_form"
                },
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0010]/value",
                "inputs": [{"type": "TEXT"}]
              }, {
                "id": "role",
                "name": "Role",
                "localizedName": "Role",
                "rmType": "DV_CODED_TEXT",
                "nodeId": "at0005",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Role"},
                "localizedDescriptions": {"en": "The role of the agent. If not stated it will be assumed to be therapeutic."},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0005]/value",
                "inputs": [{
                  "suffix": "code",
                  "type": "CODED_TEXT",
                  "list": [{
                    "value": "at0006",
                    "label": "Therapeutic",
                    "localizedLabels": {"en": "Therapeutic"},
                    "localizedDescriptions": {"en": "The chemical has a known and desired effect which is positive."}
                  }, {
                    "value": "at0035",
                    "label": "Electrolyte",
                    "localizedLabels": {"en": "Electrolyte"},
                    "localizedDescriptions": {"en": "This ingredient is an electrolyte."}
                  }, {
                    "value": "at0007",
                    "label": "Toxic",
                    "localizedLabels": {"en": "Toxic"},
                    "localizedDescriptions": {"en": "This chemical is toxic and has no therapeutic effect."}
                  }, {
                    "value": "at0008",
                    "label": "Adjuvant",
                    "localizedLabels": {"en": "Adjuvant"},
                    "localizedDescriptions": {"en": "The chemical is active but aids the therapeutic effect of another ingredient."}
                  }, {
                    "value": "at0017",
                    "label": "Dilutant",
                    "localizedLabels": {"en": "Dilutant"},
                    "localizedDescriptions": {"en": "Inert dilutant."}
                  }, {
                    "value": "at0018",
                    "label": "Propellent",
                    "localizedLabels": {"en": "Propellent"},
                    "localizedDescriptions": {"en": "Inert propellent."}
                  }, {
                    "value": "at0019",
                    "label": "Preservative",
                    "localizedLabels": {"en": "Preservative"},
                    "localizedDescriptions": {"en": "The ingredient is present to prolong the life of the substance."}
                  }, {
                    "value": "at0020",
                    "label": "Colouring",
                    "localizedLabels": {"en": "Colouring"},
                    "localizedDescriptions": {"en": "The ingredient is used to colour the substance."}
                  }, {
                    "value": "at0009",
                    "label": "Other",
                    "localizedLabels": {"en": "Other"},
                    "localizedDescriptions": {"en": "The chemical has another active role."}
                  }]
                }]
              }, {
                "id": "ingredient",
                "name": "Ingredient",
                "localizedName": "Ingredient",
                "rmType": "CLUSTER",
                "nodeId": "at0001",
                "min": 0,
                "max": -1,
                "localizedNames": {"en": "Ingredient"},
                "localizedDescriptions": {"en": "Detailed Information about an individual ingredient."},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]",
                "children": [{
                  "id": "name",
                  "name": "Name",
                  "localizedName": "Name",
                  "rmType": "DV_TEXT",
                  "nodeId": "at0002",
                  "min": 1,
                  "max": 1,
                  "localizedNames": {"en": "Name"},
                  "localizedDescriptions": {"en": "The name of the chemical or medication."},
                  "annotations": {"fhir|explicit|Medication|all|select|value": "ingredient_name"},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[at0002]/value",
                  "inputs": [{"type": "TEXT"}]
                }, {
                  "id": "form",
                  "name": "Form",
                  "localizedName": "Form",
                  "rmType": "DV_TEXT",
                  "nodeId": "at0010",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Form"},
                  "localizedDescriptions": {"en": "The formulation or presentation of the overall substance."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[at0010]/value",
                  "inputs": [{"type": "TEXT"}]
                }, {
                  "id": "role",
                  "name": "Role",
                  "localizedName": "Role",
                  "rmType": "DV_CODED_TEXT",
                  "nodeId": "at0005",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Role"},
                  "localizedDescriptions": {"en": "The role of the agent. If not stated it will be assumed to be therapeutic."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[at0005]/value",
                  "inputs": [{
                    "suffix": "code",
                    "type": "CODED_TEXT",
                    "list": [{
                      "value": "at0006",
                      "label": "Therapeutic",
                      "localizedLabels": {"en": "Therapeutic"},
                      "localizedDescriptions": {"en": "The chemical has a known and desired effect which is positive."}
                    }, {
                      "value": "at0035",
                      "label": "Electrolyte",
                      "localizedLabels": {"en": "Electrolyte"},
                      "localizedDescriptions": {"en": "This ingredient is an electrolyte."}
                    }, {
                      "value": "at0007",
                      "label": "Toxic",
                      "localizedLabels": {"en": "Toxic"},
                      "localizedDescriptions": {"en": "This chemical is toxic and has no therapeutic effect."}
                    }, {
                      "value": "at0008",
                      "label": "Adjuvant",
                      "localizedLabels": {"en": "Adjuvant"},
                      "localizedDescriptions": {"en": "The chemical is active but aids the therapeutic effect of another ingredient."}
                    }, {
                      "value": "at0017",
                      "label": "Dilutant",
                      "localizedLabels": {"en": "Dilutant"},
                      "localizedDescriptions": {"en": "Inert dilutant."}
                    }, {
                      "value": "at0018",
                      "label": "Propellent",
                      "localizedLabels": {"en": "Propellent"},
                      "localizedDescriptions": {"en": "Inert propellent."}
                    }, {
                      "value": "at0019",
                      "label": "Preservative",
                      "localizedLabels": {"en": "Preservative"},
                      "localizedDescriptions": {"en": "The ingredient is present to prolong the life of the substance."}
                    }, {
                      "value": "at0020",
                      "label": "Colouring",
                      "localizedLabels": {"en": "Colouring"},
                      "localizedDescriptions": {"en": "The ingredient is used to colour the substance."}
                    }, {
                      "value": "at0009",
                      "label": "Other",
                      "localizedLabels": {"en": "Other"},
                      "localizedDescriptions": {"en": "The chemical has another active role."}
                    }]
                  }]
                }, {
                  "id": "ingredient_strength",
                  "name": "Ingredient strength",
                  "localizedName": "Ingredient strength",
                  "rmType": "CLUSTER",
                  "nodeId": "openEHR-EHR-CLUSTER.medication_amount.v1",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Ingredient strength"},
                  "localizedDescriptions": {"en": "The amount or strength of a medication or substance for medication orders, administrations, dispensing etc."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Ingredient strength']",
                  "children": [{
                    "id": "strength",
                    "name": "Strength",
                    "localizedName": "Strength",
                    "rmType": "DV_QUANTITY",
                    "nodeId": "at0001",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Strength"},
                    "localizedDescriptions": {"en": "The value of the amount of medication as a real number e.g 1, 1.5, 0.125. "},
                    "annotations": {"fhir|explicit|MedicationRequest|all|select|value": "ingredient_quantity_quantity"},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Ingredient strength']/items[at0001,'Strength']/value",
                    "inputs": [{
                      "suffix": "magnitude",
                      "type": "DECIMAL",
                      "validation": {"range": {"minOp": ">=", "min": 0.0}}
                    }, {
                      "suffix": "unit",
                      "type": "CODED_TEXT",
                      "list": [{
                        "value": "1",
                        "label": "1",
                        "localizedLabels": {"en": "1"},
                        "validation": {"range": {"minOp": ">=", "min": 0.0}}
                      }]
                    }]
                  }, {
                    "id": "dose_unit",
                    "name": "Dose unit",
                    "localizedName": "Dose unit",
                    "rmType": "DV_CODED_TEXT",
                    "nodeId": "at0002",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Dose unit"},
                    "localizedDescriptions": {"en": "The dose unit of this medication amount."},
                    "annotations": {"fhir|explicit|MedicationRequest|all|select|value": "ingredient_quantity_unit"},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Ingredient strength']/items[at0002]/value"
                  }, {
                    "id": "description",
                    "name": "Description",
                    "localizedName": "Description",
                    "rmType": "DV_TEXT",
                    "nodeId": "at0003",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Description"},
                    "localizedDescriptions": {"en": "Free text description of the amount which may consist of the amount value and amount dose unit."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Ingredient strength']/items[at0003]/value",
                    "inputs": [{"type": "TEXT"}]
                  }, {
                    "id": "ratio_numerator",
                    "name": "Ratio numerator",
                    "localizedName": "Ratio numerator",
                    "rmType": "CLUSTER",
                    "nodeId": "at0008",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Ratio numerator"},
                    "localizedDescriptions": {"en": "The numerator value where the amount is described as a ratio e.g. 2mg where the amount is 2mg/ 5mls."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Ingredient strength']/items[at0008]",
                    "children": [{
                      "id": "strength",
                      "name": "Strength",
                      "localizedName": "Strength",
                      "rmType": "DV_QUANTITY",
                      "nodeId": "at0001",
                      "min": 0,
                      "max": 1,
                      "localizedNames": {"en": "Strength"},
                      "localizedDescriptions": {"en": "The value of the amount of medication as a real number e.g 1, 1.5, 0.125. "},
                      "annotations": {"fhir|explicit|Medication|all|select|value": "ingredient_quantity_ratioNum_quantity"},
                      "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Ingredient strength']/items[at0008]/items[at0001,'Strength']/value",
                      "inputs": [{
                        "suffix": "magnitude",
                        "type": "DECIMAL",
                        "validation": {"range": {"minOp": ">=", "min": 0.0}}
                      }, {
                        "suffix": "unit",
                        "type": "CODED_TEXT",
                        "list": [{
                          "value": "1",
                          "label": "1",
                          "localizedLabels": {"en": "1"},
                          "validation": {"range": {"minOp": ">=", "min": 0.0}}
                        }]
                      }]
                    }, {
                      "id": "dose_unit",
                      "name": "Dose unit",
                      "localizedName": "Dose unit",
                      "rmType": "DV_CODED_TEXT",
                      "nodeId": "at0002",
                      "min": 0,
                      "max": 1,
                      "localizedNames": {"en": "Dose unit"},
                      "localizedDescriptions": {"en": "The dose unit of this medication amount."},
                      "annotations": {"fhir|explicit|Medication|all|select|value": "ingredient_quantity_ratioNum_unit"},
                      "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Ingredient strength']/items[at0008]/items[at0002]/value"
                    }]
                  }, {
                    "id": "ratio_denominator",
                    "name": "Ratio denominator",
                    "localizedName": "Ratio denominator",
                    "rmType": "CLUSTER",
                    "nodeId": "at0007",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Ratio denominator"},
                    "localizedDescriptions": {"en": "The denominator value where the amount is described as a ratio e.g. 5mls where the amount is 2mg/ 5mls."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Ingredient strength']/items[at0007]",
                    "children": [{
                      "id": "strength",
                      "name": "Strength",
                      "localizedName": "Strength",
                      "rmType": "DV_QUANTITY",
                      "nodeId": "at0001",
                      "min": 0,
                      "max": 1,
                      "localizedNames": {"en": "Strength"},
                      "localizedDescriptions": {"en": "The value of the amount of medication as a real number e.g 1, 1.5, 0.125. "},
                      "annotations": {"fhir|explicit|Medication|all|select|value": "ingredient_quantity_ratioDenom_quantity"},
                      "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Ingredient strength']/items[at0007]/items[at0001,'Strength']/value",
                      "inputs": [{
                        "suffix": "magnitude",
                        "type": "DECIMAL",
                        "validation": {"range": {"minOp": ">=", "min": 0.0}}
                      }, {
                        "suffix": "unit",
                        "type": "CODED_TEXT",
                        "list": [{
                          "value": "1",
                          "label": "1",
                          "localizedLabels": {"en": "1"},
                          "validation": {"range": {"minOp": ">=", "min": 0.0}}
                        }]
                      }]
                    }, {
                      "id": "dose_unit",
                      "name": "Dose unit",
                      "localizedName": "Dose unit",
                      "rmType": "DV_CODED_TEXT",
                      "nodeId": "at0002",
                      "min": 0,
                      "max": 1,
                      "localizedNames": {"en": "Dose unit"},
                      "localizedDescriptions": {"en": "The dose unit of this medication amount."},
                      "annotations": {"fhir|explicit|Medication|all|select|value": "ingredient_quantity_ratioDenom_unit"},
                      "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Ingredient strength']/items[at0007]/items[at0002]/value"
                    }]
                  }]
                }, {
                  "id": "ingredient_quantity",
                  "name": "Ingredient quantity",
                  "localizedName": "Ingredient quantity",
                  "rmType": "CLUSTER",
                  "nodeId": "openEHR-EHR-CLUSTER.medication_amount.v1",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Ingredient quantity"},
                  "localizedDescriptions": {"en": "The amount or strength of a medication or substance for medication orders, administrations, dispensing etc."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Ingredient quantity']",
                  "children": [{
                    "id": "quantity",
                    "name": "Quantity",
                    "localizedName": "Quantity",
                    "rmType": "DV_QUANTITY",
                    "nodeId": "at0001",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Quantity"},
                    "localizedDescriptions": {"en": "The value of the amount of medication as a real number e.g 1, 1.5, 0.125. "},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Ingredient quantity']/items[at0001,'Quantity']/value",
                    "inputs": [{
                      "suffix": "magnitude",
                      "type": "DECIMAL",
                      "validation": {"range": {"minOp": ">=", "min": 0.0}}
                    }, {
                      "suffix": "unit",
                      "type": "CODED_TEXT",
                      "list": [{
                        "value": "1",
                        "label": "1",
                        "localizedLabels": {"en": "1"},
                        "validation": {"range": {"minOp": ">=", "min": 0.0}}
                      }]
                    }]
                  }, {
                    "id": "dose_unit",
                    "name": "Dose unit",
                    "localizedName": "Dose unit",
                    "rmType": "DV_CODED_TEXT",
                    "nodeId": "at0002",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Dose unit"},
                    "localizedDescriptions": {"en": "The dose unit of this medication amount."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Ingredient quantity']/items[at0002]/value"
                  }, {
                    "id": "description",
                    "name": "Description",
                    "localizedName": "Description",
                    "rmType": "DV_TEXT",
                    "nodeId": "at0003",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Description"},
                    "localizedDescriptions": {"en": "Free text description of the amount which may consist of the amount value and amount dose unit."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Ingredient quantity']/items[at0003]/value",
                    "inputs": [{"type": "TEXT"}]
                  }, {
                    "id": "ratio_numerator",
                    "name": "Ratio numerator",
                    "localizedName": "Ratio numerator",
                    "rmType": "CLUSTER",
                    "nodeId": "at0008",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Ratio numerator"},
                    "localizedDescriptions": {"en": "The numerator value where the amount is described as a ratio e.g. 2mg where the amount is 2mg/ 5mls."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Ingredient quantity']/items[at0008]",
                    "children": [{
                      "id": "quantity",
                      "name": "Quantity",
                      "localizedName": "Quantity",
                      "rmType": "DV_QUANTITY",
                      "nodeId": "at0001",
                      "min": 0,
                      "max": 1,
                      "localizedNames": {"en": "Quantity"},
                      "localizedDescriptions": {"en": "The value of the amount of medication as a real number e.g 1, 1.5, 0.125. "},
                      "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Ingredient quantity']/items[at0008]/items[at0001,'Quantity']/value",
                      "inputs": [{
                        "suffix": "magnitude",
                        "type": "DECIMAL",
                        "validation": {"range": {"minOp": ">=", "min": 0.0}}
                      }, {
                        "suffix": "unit",
                        "type": "CODED_TEXT",
                        "list": [{
                          "value": "1",
                          "label": "1",
                          "localizedLabels": {"en": "1"},
                          "validation": {"range": {"minOp": ">=", "min": 0.0}}
                        }]
                      }]
                    }, {
                      "id": "dose_unit",
                      "name": "Dose unit",
                      "localizedName": "Dose unit",
                      "rmType": "DV_CODED_TEXT",
                      "nodeId": "at0002",
                      "min": 0,
                      "max": 1,
                      "localizedNames": {"en": "Dose unit"},
                      "localizedDescriptions": {"en": "The dose unit of this medication amount."},
                      "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Ingredient quantity']/items[at0008]/items[at0002]/value"
                    }]
                  }, {
                    "id": "ratio_denominator",
                    "name": "Ratio denominator",
                    "localizedName": "Ratio denominator",
                    "rmType": "CLUSTER",
                    "nodeId": "at0007",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Ratio denominator"},
                    "localizedDescriptions": {"en": "The denominator value where the amount is described as a ratio e.g. 5mls where the amount is 2mg/ 5mls."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Ingredient quantity']/items[at0007]",
                    "children": [{
                      "id": "quantity",
                      "name": "Quantity",
                      "localizedName": "Quantity",
                      "rmType": "DV_QUANTITY",
                      "nodeId": "at0001",
                      "min": 0,
                      "max": 1,
                      "localizedNames": {"en": "Quantity"},
                      "localizedDescriptions": {"en": "The value of the amount of medication as a real number e.g 1, 1.5, 0.125. "},
                      "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Ingredient quantity']/items[at0007]/items[at0001,'Quantity']/value",
                      "inputs": [{
                        "suffix": "magnitude",
                        "type": "DECIMAL",
                        "validation": {"range": {"minOp": ">=", "min": 0.0}}
                      }, {
                        "suffix": "unit",
                        "type": "CODED_TEXT",
                        "list": [{
                          "value": "1",
                          "label": "1",
                          "localizedLabels": {"en": "1"},
                          "validation": {"range": {"minOp": ">=", "min": 0.0}}
                        }]
                      }]
                    }, {
                      "id": "dose_unit",
                      "name": "Dose unit",
                      "localizedName": "Dose unit",
                      "rmType": "DV_CODED_TEXT",
                      "nodeId": "at0002",
                      "min": 0,
                      "max": 1,
                      "localizedNames": {"en": "Dose unit"},
                      "localizedDescriptions": {"en": "The dose unit of this medication amount."},
                      "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Ingredient quantity']/items[at0007]/items[at0002]/value"
                    }]
                  }]
                }]
              }, {
                "id": "medication_strength",
                "name": "Medication strength",
                "localizedName": "Medication strength",
                "rmType": "CLUSTER",
                "nodeId": "openEHR-EHR-CLUSTER.medication_amount.v1",
                "min": 1,
                "max": 1,
                "localizedNames": {"en": "Medication strength"},
                "localizedDescriptions": {"en": "The amount or strength of a medication or substance for medication orders, administrations, dispensing etc."},
                "annotations": {"fhir|explicit|Medication|all|select|name/value": "ingredient_strength_name"},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication strength']",
                "children": [{
                  "id": "strength",
                  "name": "Strength",
                  "localizedName": "Strength",
                  "rmType": "DV_QUANTITY",
                  "nodeId": "at0001",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Strength"},
                  "localizedDescriptions": {"en": "The value of the amount of medication as a real number e.g 1, 1.5, 0.125. "},
                  "annotations": {"fhir|explicit|Medication|all|select|value": "strength_strength"},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication strength']/items[at0001,'Strength']/value",
                  "inputs": [{
                    "suffix": "magnitude",
                    "type": "DECIMAL",
                    "validation": {"range": {"minOp": ">=", "min": 0.0}}
                  }, {
                    "suffix": "unit",
                    "type": "CODED_TEXT",
                    "list": [{
                      "value": "1",
                      "label": "1",
                      "localizedLabels": {"en": "1"},
                      "validation": {"range": {"minOp": ">=", "min": 0.0}}
                    }]
                  }]
                }, {
                  "id": "dose_unit",
                  "name": "Dose unit",
                  "localizedName": "Dose unit",
                  "rmType": "DV_CODED_TEXT",
                  "nodeId": "at0002",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Dose unit"},
                  "localizedDescriptions": {"en": "The dose unit of this medication amount."},
                  "annotations": {"fhir|explicit|Medication|all|select|value": "strength_unit"},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication strength']/items[at0002]/value"
                }, {
                  "id": "description",
                  "name": "Description",
                  "localizedName": "Description",
                  "rmType": "DV_TEXT",
                  "nodeId": "at0003",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Description"},
                  "localizedDescriptions": {"en": "Free text description of the amount which may consist of the amount value and amount dose unit."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication strength']/items[at0003]/value",
                  "inputs": [{"type": "TEXT"}]
                }, {
                  "id": "ratio_numerator",
                  "name": "Ratio numerator",
                  "localizedName": "Ratio numerator",
                  "rmType": "CLUSTER",
                  "nodeId": "at0008",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Ratio numerator"},
                  "localizedDescriptions": {"en": "The numerator value where the amount is described as a ratio e.g. 2mg where the amount is 2mg/ 5mls."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication strength']/items[at0008]",
                  "children": [{
                    "id": "strength",
                    "name": "Strength",
                    "localizedName": "Strength",
                    "rmType": "DV_QUANTITY",
                    "nodeId": "at0001",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Strength"},
                    "localizedDescriptions": {"en": "The value of the amount of medication as a real number e.g 1, 1.5, 0.125. "},
                    "annotations": {"fhir|explicit|Medication|all|select|value": "strength_ratioNum_strength"},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication strength']/items[at0008]/items[at0001,'Strength']/value",
                    "inputs": [{
                      "suffix": "magnitude",
                      "type": "DECIMAL",
                      "validation": {"range": {"minOp": ">=", "min": 0.0}}
                    }, {
                      "suffix": "unit",
                      "type": "CODED_TEXT",
                      "list": [{
                        "value": "1",
                        "label": "1",
                        "localizedLabels": {"en": "1"},
                        "validation": {"range": {"minOp": ">=", "min": 0.0}}
                      }]
                    }]
                  }, {
                    "id": "dose_unit",
                    "name": "Dose unit",
                    "localizedName": "Dose unit",
                    "rmType": "DV_CODED_TEXT",
                    "nodeId": "at0002",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Dose unit"},
                    "localizedDescriptions": {"en": "The dose unit of this medication amount."},
                    "annotations": {"fhir|explicit|Medication|all|select|value": "strength_ratioNum_unit"},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication strength']/items[at0008]/items[at0002]/value"
                  }]
                }, {
                  "id": "ratio_denominator",
                  "name": "Ratio denominator",
                  "localizedName": "Ratio denominator",
                  "rmType": "CLUSTER",
                  "nodeId": "at0007",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Ratio denominator"},
                  "localizedDescriptions": {"en": "The denominator value where the amount is described as a ratio e.g. 5mls where the amount is 2mg/ 5mls."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication strength']/items[at0007]",
                  "children": [{
                    "id": "strength",
                    "name": "Strength",
                    "localizedName": "Strength",
                    "rmType": "DV_QUANTITY",
                    "nodeId": "at0001",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Strength"},
                    "localizedDescriptions": {"en": "The value of the amount of medication as a real number e.g 1, 1.5, 0.125. "},
                    "annotations": {"fhir|explicit|Medication|all|select|value": "strength_ratioDenom_strength"},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication strength']/items[at0007]/items[at0001,'Strength']/value",
                    "inputs": [{
                      "suffix": "magnitude",
                      "type": "DECIMAL",
                      "validation": {"range": {"minOp": ">=", "min": 0.0}}
                    }, {
                      "suffix": "unit",
                      "type": "CODED_TEXT",
                      "list": [{
                        "value": "1",
                        "label": "1",
                        "localizedLabels": {"en": "1"},
                        "validation": {"range": {"minOp": ">=", "min": 0.0}}
                      }]
                    }]
                  }, {
                    "id": "dose_unit",
                    "name": "Dose unit",
                    "localizedName": "Dose unit",
                    "rmType": "DV_CODED_TEXT",
                    "nodeId": "at0002",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Dose unit"},
                    "localizedDescriptions": {"en": "The dose unit of this medication amount."},
                    "annotations": {"fhir|explicit|Medication|all|select|value": "strength_ratioDenom_unit"},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication strength']/items[at0007]/items[at0002]/value"
                  }]
                }]
              }]
            }, {
              "id": "structured_dose",
              "name": "Structured dose",
              "localizedName": "Structured dose",
              "rmType": "CLUSTER",
              "nodeId": "openEHR-EHR-CLUSTER.medication_amount.v1",
              "min": 0,
              "max": 1,
              "localizedNames": {"en": "Structured dose"},
              "localizedDescriptions": {"en": "The amount or strength of a medication or substance for medication orders, administrations, dispensing etc."},
              "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Structured dose']",
              "children": [{
                "id": "quantity",
                "name": "Quantity",
                "localizedName": "Quantity",
                "rmType": "DV_QUANTITY",
                "nodeId": "at0001",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Quantity"},
                "localizedDescriptions": {"en": "The value of the amount of medication as a real number e.g 1, 1.5, 0.125. "},
                "annotations": {"fhir|explicit|Medication|all|select|value": "quantity_quantity"},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Structured dose']/items[at0001,'Quantity']/value",
                "inputs": [{
                  "suffix": "magnitude",
                  "type": "DECIMAL",
                  "validation": {"range": {"minOp": ">=", "min": 0.0}}
                }, {
                  "suffix": "unit",
                  "type": "CODED_TEXT",
                  "list": [{
                    "value": "1",
                    "label": "1",
                    "localizedLabels": {"en": "1"},
                    "validation": {"range": {"minOp": ">=", "min": 0.0}}
                  }]
                }]
              }, {
                "id": "dose_unit",
                "name": "Dose unit",
                "localizedName": "Dose unit",
                "rmType": "DV_CODED_TEXT",
                "nodeId": "at0002",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Dose unit"},
                "localizedDescriptions": {"en": "The dose unit of this medication amount."},
                "annotations": {"fhir|explicit|Medication|all|select|value": "quantity_unit"},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Structured dose']/items[at0002]/value"
              }, {
                "id": "description",
                "name": "Description",
                "localizedName": "Description",
                "rmType": "DV_TEXT",
                "nodeId": "at0003",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Description"},
                "localizedDescriptions": {"en": "Free text description of the amount which may consist of the amount value and amount dose unit."},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Structured dose']/items[at0003]/value",
                "inputs": [{"type": "TEXT"}]
              }, {
                "id": "ratio_numerator",
                "name": "Ratio numerator",
                "localizedName": "Ratio numerator",
                "rmType": "CLUSTER",
                "nodeId": "at0008",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Ratio numerator"},
                "localizedDescriptions": {"en": "The numerator value where the amount is described as a ratio e.g. 2mg where the amount is 2mg/ 5mls."},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Structured dose']/items[at0008]",
                "children": [{
                  "id": "quantity",
                  "name": "Quantity",
                  "localizedName": "Quantity",
                  "rmType": "DV_QUANTITY",
                  "nodeId": "at0001",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Quantity"},
                  "localizedDescriptions": {"en": "The value of the amount of medication as a real number e.g 1, 1.5, 0.125. "},
                  "annotations": {"fhir|explicit|Medication|all|select|value": "quantity_ratioNum_quantity"},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Structured dose']/items[at0008]/items[at0001,'Quantity']/value",
                  "inputs": [{
                    "suffix": "magnitude",
                    "type": "DECIMAL",
                    "validation": {"range": {"minOp": ">=", "min": 0.0}}
                  }, {
                    "suffix": "unit",
                    "type": "CODED_TEXT",
                    "list": [{
                      "value": "1",
                      "label": "1",
                      "localizedLabels": {"en": "1"},
                      "validation": {"range": {"minOp": ">=", "min": 0.0}}
                    }]
                  }]
                }, {
                  "id": "dose_unit",
                  "name": "Dose unit",
                  "localizedName": "Dose unit",
                  "rmType": "DV_CODED_TEXT",
                  "nodeId": "at0002",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Dose unit"},
                  "localizedDescriptions": {"en": "The dose unit of this medication amount."},
                  "annotations": {"fhir|explicit|Medication|all|select|value": "quantity_ratioNum_unit"},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Structured dose']/items[at0008]/items[at0002]/value"
                }]
              }, {
                "id": "ratio_denominator",
                "name": "Ratio denominator",
                "localizedName": "Ratio denominator",
                "rmType": "CLUSTER",
                "nodeId": "at0007",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Ratio denominator"},
                "localizedDescriptions": {"en": "The denominator value where the amount is described as a ratio e.g. 5mls where the amount is 2mg/ 5mls."},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Structured dose']/items[at0007]",
                "children": [{
                  "id": "quantity",
                  "name": "Quantity",
                  "localizedName": "Quantity",
                  "rmType": "DV_QUANTITY",
                  "nodeId": "at0001",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Quantity"},
                  "localizedDescriptions": {"en": "The value of the amount of medication as a real number e.g 1, 1.5, 0.125. "},
                  "annotations": {"fhir|explicit|Medication|all|select|value": "quantity_ratioDenom_quantity"},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Structured dose']/items[at0007]/items[at0001,'Quantity']/value",
                  "inputs": [{
                    "suffix": "magnitude",
                    "type": "DECIMAL",
                    "validation": {"range": {"minOp": ">=", "min": 0.0}}
                  }, {
                    "suffix": "unit",
                    "type": "CODED_TEXT",
                    "list": [{
                      "value": "1",
                      "label": "1",
                      "localizedLabels": {"en": "1"},
                      "validation": {"range": {"minOp": ">=", "min": 0.0}}
                    }]
                  }]
                }, {
                  "id": "dose_unit",
                  "name": "Dose unit",
                  "localizedName": "Dose unit",
                  "rmType": "DV_CODED_TEXT",
                  "nodeId": "at0002",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Dose unit"},
                  "localizedDescriptions": {"en": "The dose unit of this medication amount."},
                  "annotations": {"fhir|explicit|Medication|all|select|value": "quantity_ratioDenom_unit"},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Structured dose']/items[at0007]/items[at0002]/value"
                }]
              }]
            }, {
              "id": "administration_details",
              "name": "Administration details",
              "localizedName": "Administration details",
              "rmType": "CLUSTER",
              "nodeId": "openEHR-EHR-CLUSTER.medication_admin.v1",
              "min": 0,
              "max": 1,
              "localizedNames": {"en": "Administration details"},
              "localizedDescriptions": {"en": "Information about the future or actual administration of medication."},
              "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Administration details']",
              "children": [{
                "id": "route",
                "name": "Route",
                "localizedName": "Route",
                "rmType": "DV_CODED_TEXT",
                "nodeId": "at0001",
                "min": 0,
                "max": -1,
                "localizedNames": {"en": "Route"},
                "localizedDescriptions": {"en": "The route by which the medication is administered (e.g. oral, sublingual etc)."},
                "annotations": {"fhir|or|MedicationRequest|all|select|value": "route"},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Administration details']/items[at0001]/value"
              }, {
                "id": "site",
                "name": "Site",
                "localizedName": "Site",
                "rmType": "DV_CODED_TEXT",
                "nodeId": "at0002",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Site"},
                "localizedDescriptions": {"en": "A description of the site of administration."},
                "annotations": {"fhir|or|MedicationRequest|all|select|value": "site"},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Administration details']/items[at0002]/value",
                "inputs": [{
                  "suffix": "code",
                  "type": "CODED_TEXT",
                  "list": [{
                    "value": "at0006",
                    "label": "Left upper arm",
                    "localizedLabels": {"en": "Left upper arm"},
                    "localizedDescriptions": {"en": "Left upper arm"}
                  }, {
                    "value": "at0007",
                    "label": "Right upper arm",
                    "localizedLabels": {"en": "Right upper arm"},
                    "localizedDescriptions": {"en": "Right upper arm"}
                  }, {
                    "value": "at0008",
                    "label": "Thigh left leg",
                    "localizedLabels": {"en": "Thigh left leg"},
                    "localizedDescriptions": {"en": "Thigh left leg"}
                  }, {
                    "value": "at0009",
                    "label": "Thigh right leg",
                    "localizedLabels": {"en": "Thigh right leg"},
                    "localizedDescriptions": {"en": "Thigh right leg"}
                  }, {
                    "value": "at0010",
                    "label": "Mouth",
                    "localizedLabels": {"en": "Mouth"},
                    "localizedDescriptions": {"en": "Mouth"}
                  }, {
                    "value": "at0011",
                    "label": "Gluteus left",
                    "localizedLabels": {"en": "Gluteus left"},
                    "localizedDescriptions": {"en": "Gluteus left"}
                  }, {
                    "value": "at0012",
                    "label": "Gluteus right",
                    "localizedLabels": {"en": "Gluteus right"},
                    "localizedDescriptions": {"en": "Gluteus right"}
                  }]
                }]
              }, {
                "id": "delivery_method",
                "name": "Delivery method",
                "localizedName": "Delivery method",
                "rmType": "DV_TEXT",
                "nodeId": "at0003",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Delivery method"},
                "localizedDescriptions": {"en": "The method of delivery if this should be specified (e.g. via a nebuliser or spacer)."},
                "annotations": {"fhir|or|MedicationRequest|all|select|value": "delivery_method"},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Administration details']/items[at0003]/value",
                "inputs": [{"type": "TEXT"}]
              }, {
                "id": "dose_duration",
                "name": "Dose duration",
                "localizedName": "Dose duration",
                "rmType": "DV_DURATION",
                "nodeId": "at0004",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Dose duration"},
                "localizedDescriptions": {"en": "The length of time over which to administer each dose (e.g. an intravenous administration may have to be over a period of 5 minutes)."},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Administration details']/items[at0004]/value",
                "inputs": [{
                  "suffix": "year",
                  "type": "INTEGER",
                  "validation": {"range": {"minOp": ">=", "min": 0}}
                }, {
                  "suffix": "month",
                  "type": "INTEGER",
                  "validation": {"range": {"minOp": ">=", "min": 0}}
                }, {
                  "suffix": "day",
                  "type": "INTEGER",
                  "validation": {"range": {"minOp": ">=", "min": 0}}
                }, {
                  "suffix": "week",
                  "type": "INTEGER",
                  "validation": {"range": {"minOp": ">=", "min": 0}}
                }, {
                  "suffix": "hour",
                  "type": "INTEGER",
                  "validation": {"range": {"minOp": ">=", "min": 0}}
                }, {
                  "suffix": "minute",
                  "type": "INTEGER",
                  "validation": {"range": {"minOp": ">=", "min": 0}}
                }, {"suffix": "second", "type": "INTEGER", "validation": {"range": {"minOp": ">=", "min": 0}}}]
              }, {
                "id": "infusion_administration_details",
                "name": "Infusion Administration Details",
                "localizedName": "Infusion Administration Details",
                "rmType": "CLUSTER",
                "nodeId": "openEHR-EHR-CLUSTER.infusion_details.v1",
                "min": 0,
                "max": -1,
                "localizedNames": {"en": "Infusion Administration Details"},
                "localizedDescriptions": {"en": "Details of a medication administered by infusion."},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Administration details']/items[openEHR-EHR-CLUSTER.infusion_details.v1]",
                "children": [{
                  "id": "dose_administration_formula",
                  "name": "Dose Administration Formula",
                  "localizedName": "Dose Administration Formula",
                  "rmType": "ELEMENT",
                  "nodeId": "at0006",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Dose Administration Formula"},
                  "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Administration details']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]",
                  "children": [{
                    "id": "coded_text_value",
                    "name": "Dose Administration Formula",
                    "localizedName": "Dose Administration Formula",
                    "rmType": "DV_CODED_TEXT",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Dose Administration Formula"},
                    "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Administration details']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                    "inputs": [{"suffix": "code", "type": "TEXT"}, {"suffix": "value", "type": "TEXT"}],
                    "inContext": true
                  }, {
                    "id": "text_value",
                    "name": "Dose Administration Formula",
                    "localizedName": "Dose Administration Formula",
                    "rmType": "DV_TEXT",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Dose Administration Formula"},
                    "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Administration details']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                    "inputs": [{"type": "TEXT"}],
                    "inContext": true
                  }, {
                    "id": "multimedia_value",
                    "name": "Dose Administration Formula",
                    "localizedName": "Dose Administration Formula",
                    "rmType": "DV_MULTIMEDIA",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Dose Administration Formula"},
                    "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Administration details']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                    "inputs": [{"type": "TEXT"}],
                    "inContext": true
                  }, {
                    "id": "parsable_value",
                    "name": "Dose Administration Formula",
                    "localizedName": "Dose Administration Formula",
                    "rmType": "DV_PARSABLE",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Dose Administration Formula"},
                    "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Administration details']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                    "inputs": [{"type": "TEXT"}],
                    "inContext": true
                  }, {
                    "id": "state_value",
                    "name": "Dose Administration Formula",
                    "localizedName": "Dose Administration Formula",
                    "rmType": "DV_STATE",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Dose Administration Formula"},
                    "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Administration details']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                    "inputs": [{"suffix": "code", "type": "TEXT"}, {"suffix": "value", "type": "TEXT"}],
                    "inContext": true
                  }, {
                    "id": "boolean_value",
                    "name": "Dose Administration Formula",
                    "localizedName": "Dose Administration Formula",
                    "rmType": "DV_BOOLEAN",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Dose Administration Formula"},
                    "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Administration details']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                    "inputs": [{"type": "BOOLEAN"}],
                    "inContext": true
                  }, {
                    "id": "identifier_value",
                    "name": "Dose Administration Formula",
                    "localizedName": "Dose Administration Formula",
                    "rmType": "DV_IDENTIFIER",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Dose Administration Formula"},
                    "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Administration details']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                    "inputs": [{"suffix": "id", "type": "TEXT"}, {
                      "suffix": "type",
                      "type": "TEXT"
                    }, {"suffix": "issuer", "type": "TEXT"}, {"suffix": "assigner", "type": "TEXT"}],
                    "inContext": true
                  }, {
                    "id": "uri_value",
                    "name": "Dose Administration Formula",
                    "localizedName": "Dose Administration Formula",
                    "rmType": "DV_URI",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Dose Administration Formula"},
                    "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Administration details']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                    "inputs": [{"type": "TEXT"}],
                    "inContext": true
                  }, {
                    "id": "ehr_uri_value",
                    "name": "Dose Administration Formula",
                    "localizedName": "Dose Administration Formula",
                    "rmType": "DV_EHR_URI",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Dose Administration Formula"},
                    "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Administration details']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                    "inputs": [{"type": "TEXT"}],
                    "inContext": true
                  }, {
                    "id": "duration_value",
                    "name": "Dose Administration Formula",
                    "localizedName": "Dose Administration Formula",
                    "rmType": "DV_DURATION",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Dose Administration Formula"},
                    "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Administration details']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                    "inputs": [{
                      "suffix": "year",
                      "type": "INTEGER",
                      "validation": {"range": {"minOp": ">=", "min": 0}}
                    }, {
                      "suffix": "month",
                      "type": "INTEGER",
                      "validation": {"range": {"minOp": ">=", "min": 0}}
                    }, {
                      "suffix": "day",
                      "type": "INTEGER",
                      "validation": {"range": {"minOp": ">=", "min": 0}}
                    }, {
                      "suffix": "week",
                      "type": "INTEGER",
                      "validation": {"range": {"minOp": ">=", "min": 0}}
                    }, {
                      "suffix": "hour",
                      "type": "INTEGER",
                      "validation": {"range": {"minOp": ">=", "min": 0}}
                    }, {
                      "suffix": "minute",
                      "type": "INTEGER",
                      "validation": {"range": {"minOp": ">=", "min": 0}}
                    }, {"suffix": "second", "type": "INTEGER", "validation": {"range": {"minOp": ">=", "min": 0}}}],
                    "inContext": true
                  }, {
                    "id": "quantity_value",
                    "name": "Dose Administration Formula",
                    "localizedName": "Dose Administration Formula",
                    "rmType": "DV_QUANTITY",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Dose Administration Formula"},
                    "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Administration details']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                    "inputs": [{"suffix": "magnitude", "type": "DECIMAL"}, {"suffix": "unit", "type": "TEXT"}],
                    "inContext": true
                  }, {
                    "id": "count_value",
                    "name": "Dose Administration Formula",
                    "localizedName": "Dose Administration Formula",
                    "rmType": "DV_COUNT",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Dose Administration Formula"},
                    "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Administration details']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                    "inputs": [{"type": "INTEGER"}],
                    "inContext": true
                  }, {
                    "id": "proportion_value",
                    "name": "Dose Administration Formula",
                    "localizedName": "Dose Administration Formula",
                    "rmType": "DV_PROPORTION",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Dose Administration Formula"},
                    "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Administration details']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                    "proportionTypes": ["integer_fraction", "unitary", "percent", "ratio", "fraction"],
                    "inputs": [{"suffix": "numerator", "type": "DECIMAL"}, {
                      "suffix": "denominator",
                      "type": "DECIMAL"
                    }],
                    "inContext": true
                  }, {
                    "id": "date_time_value",
                    "name": "Dose Administration Formula",
                    "localizedName": "Dose Administration Formula",
                    "rmType": "DV_DATE_TIME",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Dose Administration Formula"},
                    "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Administration details']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                    "inputs": [{"type": "DATETIME"}],
                    "inContext": true
                  }, {
                    "id": "date_value",
                    "name": "Dose Administration Formula",
                    "localizedName": "Dose Administration Formula",
                    "rmType": "DV_DATE",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Dose Administration Formula"},
                    "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Administration details']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                    "inputs": [{"type": "DATE"}],
                    "inContext": true
                  }, {
                    "id": "time_value",
                    "name": "Dose Administration Formula",
                    "localizedName": "Dose Administration Formula",
                    "rmType": "DV_TIME",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Dose Administration Formula"},
                    "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Administration details']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                    "inputs": [{"type": "TIME"}],
                    "inContext": true
                  }, {
                    "id": "ordinal_value",
                    "name": "Dose Administration Formula",
                    "localizedName": "Dose Administration Formula",
                    "rmType": "DV_ORDINAL",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Dose Administration Formula"},
                    "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Administration details']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                    "inputs": [{"type": "CODED_TEXT"}],
                    "inContext": true
                  }]
                }, {
                  "id": "dose_administration_rate",
                  "name": "Dose Administration Rate",
                  "localizedName": "Dose Administration Rate",
                  "rmType": "ELEMENT",
                  "nodeId": "at0001",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Dose Administration Rate"},
                  "localizedDescriptions": {"en": "The rate at which the infusion is to be administered. Use the Text choice to record non or semi-quantifiable instructions e.g. 1 drop per minute."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Administration details']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0001]",
                  "children": [{
                    "id": "quantity_value",
                    "localizedName": "Dose Administration Rate",
                    "rmType": "DV_QUANTITY",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Dose Administration Rate"},
                    "localizedDescriptions": {"en": "The rate at which the infusion is to be administered. Use the Text choice to record non or semi-quantifiable instructions e.g. 1 drop per minute."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Administration details']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0001]/value",
                    "inputs": [{"suffix": "magnitude", "type": "DECIMAL"}, {
                      "suffix": "unit",
                      "type": "CODED_TEXT",
                      "list": [{
                        "value": "l/h",
                        "label": "l/h",
                        "localizedLabels": {"en": "l/h"},
                        "validation": {"range": {"minOp": ">=", "min": 0.0}}
                      }, {"value": "ml/min", "label": "ml/min", "localizedLabels": {"en": "ml/min"}}, {
                        "value": "ml/s",
                        "label": "ml/s",
                        "localizedLabels": {"en": "ml/s"}
                      }, {"value": "ml/h", "label": "ml/h", "localizedLabels": {"en": "ml/h"}}]
                    }]
                  }, {
                    "id": "text_value",
                    "localizedName": "Dose Administration Rate",
                    "rmType": "DV_TEXT",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Dose Administration Rate"},
                    "localizedDescriptions": {"en": "The rate at which the infusion is to be administered. Use the Text choice to record non or semi-quantifiable instructions e.g. 1 drop per minute."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Administration details']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0001]/value",
                    "inputs": [{"type": "TEXT"}]
                  }]
                }, {
                  "id": "purpose",
                  "name": "Purpose",
                  "localizedName": "Purpose",
                  "rmType": "DV_CODED_TEXT",
                  "nodeId": "at0007",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Purpose"},
                  "localizedDescriptions": {"en": "The purpose of the infusion."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/description[at0002]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Administration details']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0007]/value",
                  "inputs": [{
                    "suffix": "code",
                    "type": "CODED_TEXT",
                    "list": [{
                      "value": "at0008",
                      "label": "Baseline electrolyte infusion",
                      "localizedLabels": {"en": "Baseline electrolyte infusion"},
                      "localizedDescriptions": {"en": "The infusion provides baseline hydration."}
                    }, {
                      "value": "at0009",
                      "label": "Active medication infusion",
                      "localizedLabels": {"en": "Active medication infusion"},
                      "localizedDescriptions": {"en": "The infusion carries an active pharrmaceutical ingredient."}
                    }]
                  }]
                }]
              }]
            }, {
              "id": "timing",
              "name": "Timing",
              "rmType": "DV_PARSABLE",
              "min": 0,
              "max": 1,
              "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/timing",
              "inputs": [{"type": "TEXT"}],
              "inContext": true
            }, {
              "id": "action_archetype_id",
              "name": "Action_archetype_id",
              "rmType": "STRING",
              "min": 0,
              "max": 1,
              "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/activities[at0001]/action_archetype_id",
              "inputs": [{"type": "TEXT"}],
              "inContext": true
            }]
          }, {
            "id": "indication_for_authorised_use",
            "name": "Indication for authorised use",
            "localizedName": "Indication for authorised use",
            "rmType": "DV_TEXT",
            "nodeId": "at0038",
            "min": 0,
            "max": -1,
            "dependsOn": ["order"],
            "localizedNames": {"en": "Indication for authorised use"},
            "localizedDescriptions": {"en": "The specific indication for use that is required by an authorising agency to achieve subsidy for or access to the medicine, vaccine or other therapeutic good. This could be a national medication scheme, insurance company or other funding agency."},
            "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/protocol[at0031]/items[at0038]/value",
            "inputs": [{"type": "TEXT"}]
          }, {
            "id": "medication_instruction_id",
            "name": "Medication Instruction Id",
            "localizedName": "Medication Instruction Id",
            "rmType": "DV_IDENTIFIER",
            "nodeId": "at0032",
            "min": 0,
            "max": -1,
            "dependsOn": ["order"],
            "localizedNames": {"en": "Medication Instruction Id"},
            "localizedDescriptions": {"en": "An identifier used in an external system and associated with this medication instruction."},
            "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/protocol[at0031]/items[at0032]/value",
            "inputs": [{"suffix": "id", "type": "TEXT"}, {"suffix": "type", "type": "TEXT"}, {
              "suffix": "issuer",
              "type": "TEXT"
            }, {"suffix": "assigner", "type": "TEXT"}]
          }, {
            "id": "concession_benefit",
            "name": "Concession benefit",
            "localizedName": "Concession benefit",
            "rmType": "DV_TEXT",
            "nodeId": "at0042",
            "min": 0,
            "max": 1,
            "dependsOn": ["order"],
            "localizedNames": {"en": "Concession benefit"},
            "localizedDescriptions": {"en": "Indicates the category of subsidy appropriate to the item being prescribed."},
            "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/protocol[at0031]/items[at0042]/value",
            "inputs": [{"type": "TEXT"}]
          }, {
            "id": "expiry_time",
            "name": "expiry_time",
            "rmType": "DV_DATE_TIME",
            "min": 0,
            "max": 1,
            "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/expiry_time",
            "inputs": [{"type": "DATETIME"}]
          }, {
            "id": "narrative",
            "name": "Narrative",
            "rmType": "DV_TEXT",
            "min": 0,
            "max": 1,
            "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/narrative",
            "inputs": [{"type": "TEXT"}],
            "inContext": true
          }, {
            "id": "language",
            "name": "Language",
            "rmType": "CODE_PHRASE",
            "min": 0,
            "max": 1,
            "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/language",
            "inContext": true
          }, {
            "id": "encoding",
            "name": "Encoding",
            "rmType": "CODE_PHRASE",
            "min": 0,
            "max": 1,
            "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/encoding",
            "inContext": true
          }, {
            "id": "subject",
            "name": "Subject",
            "rmType": "PARTY_PROXY",
            "min": 0,
            "max": 1,
            "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-INSTRUCTION.medication.v1]/subject",
            "inContext": true
          }]
        }, {
          "id": "medication_action",
          "name": "Medication action",
          "localizedName": "Medication action",
          "rmType": "ACTION",
          "nodeId": "openEHR-EHR-ACTION.medication.v1",
          "min": 0,
          "max": -1,
          "localizedNames": {"en": "Medication action"},
          "localizedDescriptions": {"en": "Details of use, administration, dispensing or other care step relating to a medicine, vaccine or other therapeutic good which may arise from an instruction from a clinician."},
          "annotations": {
            "fhir|and|MedicationRequest|all|select|time": "ism_transition_time",
            "fhir|and|MedicationRequest|all|select|ism_transition": "ism_transition"
          },
          "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]",
          "children": [{
            "id": "ism_transition",
            "name": "Ism_transition",
            "rmType": "ISM_TRANSITION",
            "min": 0,
            "max": 1,
            "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/ism_transition",
            "children": [{
              "id": "current_state",
              "name": "Current_state",
              "rmType": "DV_CODED_TEXT",
              "min": 1,
              "max": 1,
              "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/ism_transition/current_state",
              "inputs": [{
                "suffix": "code",
                "type": "CODED_TEXT",
                "list": [{"value": "530", "label": "suspended"}, {"value": "245", "label": "active"}, {
                  "value": "531",
                  "label": "aborted"
                }, {"value": "532", "label": "completed"}, {"value": "524", "label": "initial"}, {
                  "value": "526",
                  "label": "planned"
                }, {"value": "527", "label": "postponed"}, {"value": "528", "label": "cancelled"}, {
                  "value": "529",
                  "label": "scheduled"
                }]
              }],
              "inContext": true
            }, {
              "id": "transition",
              "name": "Transition",
              "rmType": "DV_CODED_TEXT",
              "min": 0,
              "max": 1,
              "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/ism_transition/transition",
              "inputs": [{"suffix": "code", "type": "TEXT"}, {"suffix": "value", "type": "TEXT"}],
              "inContext": true
            }, {
              "id": "careflow_step",
              "name": "Careflow_step",
              "rmType": "DV_CODED_TEXT",
              "min": 0,
              "max": 1,
              "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/ism_transition/careflow_step",
              "inputs": [{
                "suffix": "code",
                "type": "CODED_TEXT",
                "list": [{
                  "value": "at0042",
                  "label": "Recommend medication",
                  "localizedLabels": {"en": "Recommend medication"},
                  "currentStates": ["526"]
                }, {
                  "value": "at0001",
                  "label": "Plan medication",
                  "localizedLabels": {"en": "Plan medication"},
                  "currentStates": ["524"]
                }, {
                  "value": "at0013",
                  "label": "Suspend medication plan",
                  "localizedLabels": {"en": "Suspend medication plan"},
                  "currentStates": ["527"]
                }, {
                  "value": "at0012",
                  "label": "Cancel medication plan",
                  "localizedLabels": {"en": "Cancel medication plan"},
                  "currentStates": ["528"]
                }, {
                  "value": "at0016",
                  "label": "Set medication start date",
                  "localizedLabels": {"en": "Set medication start date"},
                  "currentStates": ["529"]
                }, {
                  "value": "at0002",
                  "label": "Issue prescription for medication",
                  "localizedLabels": {"en": "Issue prescription for medication"},
                  "currentStates": ["245", "524"]
                }, {
                  "value": "at0003",
                  "label": "Dispense medication",
                  "localizedLabels": {"en": "Dispense medication"},
                  "currentStates": ["245", "524"]
                }, {
                  "value": "at0004",
                  "label": "Commence medication",
                  "localizedLabels": {"en": "Commence medication"},
                  "currentStates": ["245"]
                }, {
                  "value": "at0005",
                  "label": "Review medication",
                  "localizedLabels": {"en": "Review medication"},
                  "currentStates": ["245"]
                }, {
                  "value": "at0041",
                  "label": "Medication order modified",
                  "localizedLabels": {"en": "Medication order modified"},
                  "currentStates": ["245"]
                }, {
                  "value": "at0006",
                  "label": "Administer medication",
                  "localizedLabels": {"en": "Administer medication"},
                  "currentStates": ["245"]
                }, {
                  "value": "at0010",
                  "label": "Re-issue prescription for medication",
                  "localizedLabels": {"en": "Re-issue prescription for medication"},
                  "currentStates": ["245"]
                }, {
                  "value": "at0018",
                  "label": "Withhold medication",
                  "localizedLabels": {"en": "Withhold medication"},
                  "currentStates": ["245"]
                }, {
                  "value": "at0044",
                  "label": "Defer administration",
                  "localizedLabels": {"en": "Defer administration"},
                  "currentStates": ["245"]
                }, {
                  "value": "at0019",
                  "label": "Medication declined",
                  "localizedLabels": {"en": "Medication declined"},
                  "currentStates": ["245"]
                }, {
                  "value": "at0035",
                  "label": "Return medication",
                  "localizedLabels": {"en": "Return medication"},
                  "currentStates": ["245", "524"]
                }, {
                  "value": "at0008",
                  "label": "Delay medication supply",
                  "localizedLabels": {"en": "Delay medication supply"},
                  "currentStates": ["530"]
                }, {
                  "value": "at0009",
                  "label": "Suspend administration",
                  "localizedLabels": {"en": "Suspend administration"},
                  "currentStates": ["530"]
                }, {
                  "value": "at0011",
                  "label": "Suspend re-issue of prescription",
                  "localizedLabels": {"en": "Suspend re-issue of prescription"},
                  "currentStates": ["530"]
                }, {
                  "value": "at0015",
                  "label": "Cease administration",
                  "localizedLabels": {"en": "Cease administration"},
                  "currentStates": ["531"]
                }, {
                  "value": "at0014",
                  "label": "Reverse prescription for medication",
                  "localizedLabels": {"en": "Reverse prescription for medication"},
                  "currentStates": ["531"]
                }, {
                  "value": "at0039",
                  "label": "Change dose or timing",
                  "localizedLabels": {"en": "Change dose or timing"},
                  "currentStates": ["531"]
                }, {
                  "value": "at0007",
                  "label": "Complete medication",
                  "localizedLabels": {"en": "Complete medication"},
                  "currentStates": ["532"]
                }]
              }],
              "inContext": true
            }],
            "inContext": true
          }, {
            "id": "medicine",
            "name": "Medicine",
            "localizedName": "Medicine",
            "rmType": "DV_TEXT",
            "nodeId": "at0020",
            "min": 0,
            "max": 1,
            "localizedNames": {"en": "Medicine"},
            "localizedDescriptions": {"en": "The medicine, vaccine or other therapeutic good which was the focus of the action. This element will normally be coded with a medicines terminology but free text may be required in some cases."},
            "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[at0020]/value",
            "inputs": [{"type": "TEXT", "listOpen": true}, {"suffix": "other", "type": "TEXT"}]
          }, {
            "id": "instructions",
            "name": "Instructions",
            "localizedName": "Instructions",
            "rmType": "DV_TEXT",
            "nodeId": "at0033",
            "min": 0,
            "max": -1,
            "localizedNames": {"en": "Instructions"},
            "localizedDescriptions": {"en": "Any instructions given to the subject of care or carer at the time of the action."},
            "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[at0033]/value",
            "inputs": [{"type": "TEXT"}]
          }, {
            "id": "reason",
            "name": "Reason",
            "localizedName": "Reason",
            "rmType": "DV_TEXT",
            "nodeId": "at0021",
            "min": 0,
            "max": -1,
            "localizedNames": {"en": "Reason"},
            "localizedDescriptions": {"en": "The reason(s) the specific action or step was carried out. Note: This is not the reason for the medication instruction, rather the specific reason e.g. for administration."},
            "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[at0021]/value",
            "inputs": [{"type": "TEXT"}]
          }, {
            "id": "comment",
            "name": "Comment",
            "localizedName": "Comment",
            "rmType": "DV_TEXT",
            "nodeId": "at0024",
            "min": 0,
            "max": 1,
            "localizedNames": {"en": "Comment"},
            "localizedDescriptions": {"en": "A comment on the action taken."},
            "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[at0024]/value",
            "inputs": [{"type": "TEXT"}]
          }, {
            "id": "sequence_number",
            "name": "Sequence number",
            "localizedName": "Sequence number",
            "rmType": "DV_COUNT",
            "nodeId": "at0025",
            "min": 0,
            "max": 1,
            "localizedNames": {"en": "Sequence number"},
            "localizedDescriptions": {"en": "The sequence number specific to the action being recorded."},
            "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[at0025]/value",
            "inputs": [{"type": "INTEGER"}]
          }, {
            "id": "ingredients_and_form",
            "name": "Ingredients and form",
            "localizedName": "Ingredients and form",
            "rmType": "CLUSTER",
            "nodeId": "openEHR-EHR-CLUSTER.chemical_description_mnd.v1",
            "min": 0,
            "max": 1,
            "localizedNames": {"en": "Ingredients and form"},
            "localizedDescriptions": {"en": "The actual ingredients with strength and overall form of a chemical or medication."},
            "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']",
            "children": [{
              "id": "form",
              "name": "Form",
              "localizedName": "Form",
              "rmType": "DV_TEXT",
              "nodeId": "at0010",
              "min": 0,
              "max": 1,
              "localizedNames": {"en": "Form"},
              "localizedDescriptions": {"en": "The formulation or presentation of the overall substance."},
              "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0010]/value",
              "inputs": [{"type": "TEXT"}]
            }, {
              "id": "role",
              "name": "Role",
              "localizedName": "Role",
              "rmType": "DV_CODED_TEXT",
              "nodeId": "at0005",
              "min": 0,
              "max": 1,
              "localizedNames": {"en": "Role"},
              "localizedDescriptions": {"en": "The role of the agent. If not stated it will be assumed to be therapeutic."},
              "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0005]/value",
              "inputs": [{
                "suffix": "code",
                "type": "CODED_TEXT",
                "list": [{
                  "value": "at0006",
                  "label": "Therapeutic",
                  "localizedLabels": {"en": "Therapeutic"},
                  "localizedDescriptions": {"en": "The chemical has a known and desired effect which is positive."}
                }, {
                  "value": "at0035",
                  "label": "Electrolyte",
                  "localizedLabels": {"en": "Electrolyte"},
                  "localizedDescriptions": {"en": "This ingredient is an electrolyte."}
                }, {
                  "value": "at0007",
                  "label": "Toxic",
                  "localizedLabels": {"en": "Toxic"},
                  "localizedDescriptions": {"en": "This chemical is toxic and has no therapeutic effect."}
                }, {
                  "value": "at0008",
                  "label": "Adjuvant",
                  "localizedLabels": {"en": "Adjuvant"},
                  "localizedDescriptions": {"en": "The chemical is active but aids the therapeutic effect of another ingredient."}
                }, {
                  "value": "at0017",
                  "label": "Dilutant",
                  "localizedLabels": {"en": "Dilutant"},
                  "localizedDescriptions": {"en": "Inert dilutant."}
                }, {
                  "value": "at0018",
                  "label": "Propellent",
                  "localizedLabels": {"en": "Propellent"},
                  "localizedDescriptions": {"en": "Inert propellent."}
                }, {
                  "value": "at0019",
                  "label": "Preservative",
                  "localizedLabels": {"en": "Preservative"},
                  "localizedDescriptions": {"en": "The ingredient is present to prolong the life of the substance."}
                }, {
                  "value": "at0020",
                  "label": "Colouring",
                  "localizedLabels": {"en": "Colouring"},
                  "localizedDescriptions": {"en": "The ingredient is used to colour the substance."}
                }, {
                  "value": "at0009",
                  "label": "Other",
                  "localizedLabels": {"en": "Other"},
                  "localizedDescriptions": {"en": "The chemical has another active role."}
                }]
              }]
            }, {
              "id": "ingredient",
              "name": "Ingredient",
              "localizedName": "Ingredient",
              "rmType": "CLUSTER",
              "nodeId": "at0001",
              "min": 0,
              "max": -1,
              "localizedNames": {"en": "Ingredient"},
              "localizedDescriptions": {"en": "Detailed Information about an individual ingredient."},
              "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]",
              "children": [{
                "id": "name",
                "name": "Name",
                "localizedName": "Name",
                "rmType": "DV_TEXT",
                "nodeId": "at0002",
                "min": 1,
                "max": 1,
                "localizedNames": {"en": "Name"},
                "localizedDescriptions": {"en": "The name of the chemical or medication."},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[at0002]/value",
                "inputs": [{"type": "TEXT"}]
              }, {
                "id": "form",
                "name": "Form",
                "localizedName": "Form",
                "rmType": "DV_TEXT",
                "nodeId": "at0010",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Form"},
                "localizedDescriptions": {"en": "The formulation or presentation of the overall substance."},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[at0010]/value",
                "inputs": [{"type": "TEXT"}]
              }, {
                "id": "role",
                "name": "Role",
                "localizedName": "Role",
                "rmType": "DV_CODED_TEXT",
                "nodeId": "at0005",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Role"},
                "localizedDescriptions": {"en": "The role of the agent. If not stated it will be assumed to be therapeutic."},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[at0005]/value",
                "inputs": [{
                  "suffix": "code",
                  "type": "CODED_TEXT",
                  "list": [{
                    "value": "at0006",
                    "label": "Therapeutic",
                    "localizedLabels": {"en": "Therapeutic"},
                    "localizedDescriptions": {"en": "The chemical has a known and desired effect which is positive."}
                  }, {
                    "value": "at0035",
                    "label": "Electrolyte",
                    "localizedLabels": {"en": "Electrolyte"},
                    "localizedDescriptions": {"en": "This ingredient is an electrolyte."}
                  }, {
                    "value": "at0007",
                    "label": "Toxic",
                    "localizedLabels": {"en": "Toxic"},
                    "localizedDescriptions": {"en": "This chemical is toxic and has no therapeutic effect."}
                  }, {
                    "value": "at0008",
                    "label": "Adjuvant",
                    "localizedLabels": {"en": "Adjuvant"},
                    "localizedDescriptions": {"en": "The chemical is active but aids the therapeutic effect of another ingredient."}
                  }, {
                    "value": "at0017",
                    "label": "Dilutant",
                    "localizedLabels": {"en": "Dilutant"},
                    "localizedDescriptions": {"en": "Inert dilutant."}
                  }, {
                    "value": "at0018",
                    "label": "Propellent",
                    "localizedLabels": {"en": "Propellent"},
                    "localizedDescriptions": {"en": "Inert propellent."}
                  }, {
                    "value": "at0019",
                    "label": "Preservative",
                    "localizedLabels": {"en": "Preservative"},
                    "localizedDescriptions": {"en": "The ingredient is present to prolong the life of the substance."}
                  }, {
                    "value": "at0020",
                    "label": "Colouring",
                    "localizedLabels": {"en": "Colouring"},
                    "localizedDescriptions": {"en": "The ingredient is used to colour the substance."}
                  }, {
                    "value": "at0009",
                    "label": "Other",
                    "localizedLabels": {"en": "Other"},
                    "localizedDescriptions": {"en": "The chemical has another active role."}
                  }]
                }]
              }, {
                "id": "compound",
                "name": "Compound",
                "localizedName": "Compound",
                "rmType": "DV_TEXT",
                "nodeId": "at0003",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Compound"},
                "localizedDescriptions": {"en": "The detailed chemical name of the compound that is an active ingredient."},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[at0003]/value",
                "inputs": [{"type": "TEXT"}]
              }, {
                "id": "medication_quantity",
                "name": "Medication quantity",
                "localizedName": "Medication quantity",
                "rmType": "CLUSTER",
                "nodeId": "openEHR-EHR-CLUSTER.medication_amount.v1",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Medication quantity"},
                "localizedDescriptions": {"en": "The amount or strength of a medication or substance for medication orders, administrations, dispensing etc."},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication quantity']",
                "children": [{
                  "id": "quantity",
                  "name": "Quantity",
                  "localizedName": "Quantity",
                  "rmType": "DV_QUANTITY",
                  "nodeId": "at0001",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Quantity"},
                  "localizedDescriptions": {"en": "The value of the amount of medication as a real number e.g 1, 1.5, 0.125. "},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication quantity']/items[at0001,'Quantity']/value",
                  "inputs": [{
                    "suffix": "magnitude",
                    "type": "DECIMAL",
                    "validation": {"range": {"minOp": ">=", "min": 0.0}}
                  }, {
                    "suffix": "unit",
                    "type": "CODED_TEXT",
                    "list": [{
                      "value": "1",
                      "label": "1",
                      "localizedLabels": {"en": "1"},
                      "validation": {"range": {"minOp": ">=", "min": 0.0}}
                    }]
                  }]
                }, {
                  "id": "dose_unit",
                  "name": "Dose unit",
                  "localizedName": "Dose unit",
                  "rmType": "DV_CODED_TEXT",
                  "nodeId": "at0002",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Dose unit"},
                  "localizedDescriptions": {"en": "The dose unit of this medication amount."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication quantity']/items[at0002]/value"
                }, {
                  "id": "description",
                  "name": "Description",
                  "localizedName": "Description",
                  "rmType": "DV_TEXT",
                  "nodeId": "at0003",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Description"},
                  "localizedDescriptions": {"en": "Free text description of the amount which may consist of the amount value and amount dose unit."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication quantity']/items[at0003]/value",
                  "inputs": [{"type": "TEXT"}]
                }, {
                  "id": "ratio_numerator",
                  "name": "Ratio numerator",
                  "localizedName": "Ratio numerator",
                  "rmType": "CLUSTER",
                  "nodeId": "at0008",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Ratio numerator"},
                  "localizedDescriptions": {"en": "The numerator value where the amount is described as a ratio e.g. 2mg where the amount is 2mg/ 5mls."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication quantity']/items[at0008]",
                  "children": [{
                    "id": "quantity",
                    "name": "Quantity",
                    "localizedName": "Quantity",
                    "rmType": "DV_QUANTITY",
                    "nodeId": "at0001",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Quantity"},
                    "localizedDescriptions": {"en": "The value of the amount of medication as a real number e.g 1, 1.5, 0.125. "},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication quantity']/items[at0008]/items[at0001,'Quantity']/value",
                    "inputs": [{
                      "suffix": "magnitude",
                      "type": "DECIMAL",
                      "validation": {"range": {"minOp": ">=", "min": 0.0}}
                    }, {
                      "suffix": "unit",
                      "type": "CODED_TEXT",
                      "list": [{
                        "value": "1",
                        "label": "1",
                        "localizedLabels": {"en": "1"},
                        "validation": {"range": {"minOp": ">=", "min": 0.0}}
                      }]
                    }]
                  }, {
                    "id": "dose_unit",
                    "name": "Dose unit",
                    "localizedName": "Dose unit",
                    "rmType": "DV_CODED_TEXT",
                    "nodeId": "at0002",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Dose unit"},
                    "localizedDescriptions": {"en": "The dose unit of this medication amount."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication quantity']/items[at0008]/items[at0002]/value"
                  }]
                }, {
                  "id": "ratio_denominator",
                  "name": "Ratio denominator",
                  "localizedName": "Ratio denominator",
                  "rmType": "CLUSTER",
                  "nodeId": "at0007",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Ratio denominator"},
                  "localizedDescriptions": {"en": "The denominator value where the amount is described as a ratio e.g. 5mls where the amount is 2mg/ 5mls."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication quantity']/items[at0007]",
                  "children": [{
                    "id": "quantity",
                    "name": "Quantity",
                    "localizedName": "Quantity",
                    "rmType": "DV_QUANTITY",
                    "nodeId": "at0001",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Quantity"},
                    "localizedDescriptions": {"en": "The value of the amount of medication as a real number e.g 1, 1.5, 0.125. "},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication quantity']/items[at0007]/items[at0001,'Quantity']/value",
                    "inputs": [{
                      "suffix": "magnitude",
                      "type": "DECIMAL",
                      "validation": {"range": {"minOp": ">=", "min": 0.0}}
                    }, {
                      "suffix": "unit",
                      "type": "CODED_TEXT",
                      "list": [{
                        "value": "1",
                        "label": "1",
                        "localizedLabels": {"en": "1"},
                        "validation": {"range": {"minOp": ">=", "min": 0.0}}
                      }]
                    }]
                  }, {
                    "id": "dose_unit",
                    "name": "Dose unit",
                    "localizedName": "Dose unit",
                    "rmType": "DV_CODED_TEXT",
                    "nodeId": "at0002",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Dose unit"},
                    "localizedDescriptions": {"en": "The dose unit of this medication amount."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication quantity']/items[at0007]/items[at0002]/value"
                  }]
                }]
              }, {
                "id": "medication_quantity2",
                "name": "Medication quantity",
                "localizedName": "Medication quantity",
                "rmType": "CLUSTER",
                "nodeId": "openEHR-EHR-CLUSTER.medication_amount.v1",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Medication quantity"},
                "localizedDescriptions": {"en": "The amount or strength of a medication or substance for medication orders, administrations, dispensing etc."},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication quantity']",
                "children": [{
                  "id": "quantity",
                  "name": "Quantity",
                  "localizedName": "Quantity",
                  "rmType": "DV_QUANTITY",
                  "nodeId": "at0001",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Quantity"},
                  "localizedDescriptions": {"en": "The value of the amount of medication as a real number e.g 1, 1.5, 0.125. "},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication quantity']/items[at0001,'Quantity']/value",
                  "inputs": [{
                    "suffix": "magnitude",
                    "type": "DECIMAL",
                    "validation": {"range": {"minOp": ">=", "min": 0.0}}
                  }, {
                    "suffix": "unit",
                    "type": "CODED_TEXT",
                    "list": [{
                      "value": "1",
                      "label": "1",
                      "localizedLabels": {"en": "1"},
                      "validation": {"range": {"minOp": ">=", "min": 0.0}}
                    }]
                  }]
                }, {
                  "id": "dose_unit",
                  "name": "Dose unit",
                  "localizedName": "Dose unit",
                  "rmType": "DV_CODED_TEXT",
                  "nodeId": "at0002",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Dose unit"},
                  "localizedDescriptions": {"en": "The dose unit of this medication amount."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication quantity']/items[at0002]/value"
                }, {
                  "id": "description",
                  "name": "Description",
                  "localizedName": "Description",
                  "rmType": "DV_TEXT",
                  "nodeId": "at0003",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Description"},
                  "localizedDescriptions": {"en": "Free text description of the amount which may consist of the amount value and amount dose unit."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication quantity']/items[at0003]/value",
                  "inputs": [{"type": "TEXT"}]
                }, {
                  "id": "ratio_numerator",
                  "name": "Ratio numerator",
                  "localizedName": "Ratio numerator",
                  "rmType": "CLUSTER",
                  "nodeId": "at0008",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Ratio numerator"},
                  "localizedDescriptions": {"en": "The numerator value where the amount is described as a ratio e.g. 2mg where the amount is 2mg/ 5mls."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication quantity']/items[at0008]",
                  "children": [{
                    "id": "quantity",
                    "name": "Quantity",
                    "localizedName": "Quantity",
                    "rmType": "DV_QUANTITY",
                    "nodeId": "at0001",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Quantity"},
                    "localizedDescriptions": {"en": "The value of the amount of medication as a real number e.g 1, 1.5, 0.125. "},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication quantity']/items[at0008]/items[at0001,'Quantity']/value",
                    "inputs": [{
                      "suffix": "magnitude",
                      "type": "DECIMAL",
                      "validation": {"range": {"minOp": ">=", "min": 0.0}}
                    }, {
                      "suffix": "unit",
                      "type": "CODED_TEXT",
                      "list": [{
                        "value": "1",
                        "label": "1",
                        "localizedLabels": {"en": "1"},
                        "validation": {"range": {"minOp": ">=", "min": 0.0}}
                      }]
                    }]
                  }, {
                    "id": "dose_unit",
                    "name": "Dose unit",
                    "localizedName": "Dose unit",
                    "rmType": "DV_CODED_TEXT",
                    "nodeId": "at0002",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Dose unit"},
                    "localizedDescriptions": {"en": "The dose unit of this medication amount."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication quantity']/items[at0008]/items[at0002]/value"
                  }]
                }, {
                  "id": "ratio_denominator",
                  "name": "Ratio denominator",
                  "localizedName": "Ratio denominator",
                  "rmType": "CLUSTER",
                  "nodeId": "at0007",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Ratio denominator"},
                  "localizedDescriptions": {"en": "The denominator value where the amount is described as a ratio e.g. 5mls where the amount is 2mg/ 5mls."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication quantity']/items[at0007]",
                  "children": [{
                    "id": "quantity",
                    "name": "Quantity",
                    "localizedName": "Quantity",
                    "rmType": "DV_QUANTITY",
                    "nodeId": "at0001",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Quantity"},
                    "localizedDescriptions": {"en": "The value of the amount of medication as a real number e.g 1, 1.5, 0.125. "},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication quantity']/items[at0007]/items[at0001,'Quantity']/value",
                    "inputs": [{
                      "suffix": "magnitude",
                      "type": "DECIMAL",
                      "validation": {"range": {"minOp": ">=", "min": 0.0}}
                    }, {
                      "suffix": "unit",
                      "type": "CODED_TEXT",
                      "list": [{
                        "value": "1",
                        "label": "1",
                        "localizedLabels": {"en": "1"},
                        "validation": {"range": {"minOp": ">=", "min": 0.0}}
                      }]
                    }]
                  }, {
                    "id": "dose_unit",
                    "name": "Dose unit",
                    "localizedName": "Dose unit",
                    "rmType": "DV_CODED_TEXT",
                    "nodeId": "at0002",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {"en": "Dose unit"},
                    "localizedDescriptions": {"en": "The dose unit of this medication amount."},
                    "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[at0001]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication quantity']/items[at0007]/items[at0002]/value"
                  }]
                }]
              }]
            }, {
              "id": "medication_strength",
              "name": "Medication strength",
              "localizedName": "Medication strength",
              "rmType": "CLUSTER",
              "nodeId": "openEHR-EHR-CLUSTER.medication_amount.v1",
              "min": 1,
              "max": 1,
              "localizedNames": {"en": "Medication strength"},
              "localizedDescriptions": {"en": "The amount or strength of a medication or substance for medication orders, administrations, dispensing etc."},
              "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication strength']",
              "children": [{
                "id": "strength",
                "name": "Strength",
                "localizedName": "Strength",
                "rmType": "DV_QUANTITY",
                "nodeId": "at0001",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Strength"},
                "localizedDescriptions": {"en": "The value of the amount of medication as a real number e.g 1, 1.5, 0.125. "},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication strength']/items[at0001,'Strength']/value",
                "inputs": [{
                  "suffix": "magnitude",
                  "type": "DECIMAL",
                  "validation": {"range": {"minOp": ">=", "min": 0.0}}
                }, {
                  "suffix": "unit",
                  "type": "CODED_TEXT",
                  "list": [{
                    "value": "1",
                    "label": "1",
                    "localizedLabels": {"en": "1"},
                    "validation": {"range": {"minOp": ">=", "min": 0.0}}
                  }]
                }]
              }, {
                "id": "dose_unit",
                "name": "Dose unit",
                "localizedName": "Dose unit",
                "rmType": "DV_CODED_TEXT",
                "nodeId": "at0002",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Dose unit"},
                "localizedDescriptions": {"en": "The dose unit of this medication amount."},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication strength']/items[at0002]/value"
              }, {
                "id": "description",
                "name": "Description",
                "localizedName": "Description",
                "rmType": "DV_TEXT",
                "nodeId": "at0003",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Description"},
                "localizedDescriptions": {"en": "Free text description of the amount which may consist of the amount value and amount dose unit."},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication strength']/items[at0003]/value",
                "inputs": [{"type": "TEXT"}]
              }, {
                "id": "ratio_numerator",
                "name": "Ratio numerator",
                "localizedName": "Ratio numerator",
                "rmType": "CLUSTER",
                "nodeId": "at0008",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Ratio numerator"},
                "localizedDescriptions": {"en": "The numerator value where the amount is described as a ratio e.g. 2mg where the amount is 2mg/ 5mls."},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication strength']/items[at0008]",
                "children": [{
                  "id": "strength",
                  "name": "Strength",
                  "localizedName": "Strength",
                  "rmType": "DV_QUANTITY",
                  "nodeId": "at0001",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Strength"},
                  "localizedDescriptions": {"en": "The value of the amount of medication as a real number e.g 1, 1.5, 0.125. "},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication strength']/items[at0008]/items[at0001,'Strength']/value",
                  "inputs": [{
                    "suffix": "magnitude",
                    "type": "DECIMAL",
                    "validation": {"range": {"minOp": ">=", "min": 0.0}}
                  }, {
                    "suffix": "unit",
                    "type": "CODED_TEXT",
                    "list": [{
                      "value": "1",
                      "label": "1",
                      "localizedLabels": {"en": "1"},
                      "validation": {"range": {"minOp": ">=", "min": 0.0}}
                    }]
                  }]
                }, {
                  "id": "dose_unit",
                  "name": "Dose unit",
                  "localizedName": "Dose unit",
                  "rmType": "DV_CODED_TEXT",
                  "nodeId": "at0002",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Dose unit"},
                  "localizedDescriptions": {"en": "The dose unit of this medication amount."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication strength']/items[at0008]/items[at0002]/value"
                }]
              }, {
                "id": "ratio_denominator",
                "name": "Ratio denominator",
                "localizedName": "Ratio denominator",
                "rmType": "CLUSTER",
                "nodeId": "at0007",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Ratio denominator"},
                "localizedDescriptions": {"en": "The denominator value where the amount is described as a ratio e.g. 5mls where the amount is 2mg/ 5mls."},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication strength']/items[at0007]",
                "children": [{
                  "id": "strength",
                  "name": "Strength",
                  "localizedName": "Strength",
                  "rmType": "DV_QUANTITY",
                  "nodeId": "at0001",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Strength"},
                  "localizedDescriptions": {"en": "The value of the amount of medication as a real number e.g 1, 1.5, 0.125. "},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication strength']/items[at0007]/items[at0001,'Strength']/value",
                  "inputs": [{
                    "suffix": "magnitude",
                    "type": "DECIMAL",
                    "validation": {"range": {"minOp": ">=", "min": 0.0}}
                  }, {
                    "suffix": "unit",
                    "type": "CODED_TEXT",
                    "list": [{
                      "value": "1",
                      "label": "1",
                      "localizedLabels": {"en": "1"},
                      "validation": {"range": {"minOp": ">=", "min": 0.0}}
                    }]
                  }]
                }, {
                  "id": "dose_unit",
                  "name": "Dose unit",
                  "localizedName": "Dose unit",
                  "rmType": "DV_CODED_TEXT",
                  "nodeId": "at0002",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Dose unit"},
                  "localizedDescriptions": {"en": "The dose unit of this medication amount."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.chemical_description_mnd.v1,'Ingredients and form']/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication strength']/items[at0007]/items[at0002]/value"
                }]
              }]
            }]
          }, {
            "id": "medication_quantity",
            "name": "Medication quantity",
            "localizedName": "Medication quantity",
            "rmType": "CLUSTER",
            "nodeId": "openEHR-EHR-CLUSTER.medication_amount.v1",
            "min": 0,
            "max": 1,
            "localizedNames": {"en": "Medication quantity"},
            "localizedDescriptions": {"en": "The amount or strength of a medication or substance for medication orders, administrations, dispensing etc."},
            "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication quantity']",
            "children": [{
              "id": "quantity",
              "name": "Quantity",
              "localizedName": "Quantity",
              "rmType": "DV_QUANTITY",
              "nodeId": "at0001",
              "min": 0,
              "max": 1,
              "localizedNames": {"en": "Quantity"},
              "localizedDescriptions": {"en": "The value of the amount of medication as a real number e.g 1, 1.5, 0.125. "},
              "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication quantity']/items[at0001,'Quantity']/value",
              "inputs": [{
                "suffix": "magnitude",
                "type": "DECIMAL",
                "validation": {"range": {"minOp": ">=", "min": 0.0}}
              }, {
                "suffix": "unit",
                "type": "CODED_TEXT",
                "list": [{
                  "value": "1",
                  "label": "1",
                  "localizedLabels": {"en": "1"},
                  "validation": {"range": {"minOp": ">=", "min": 0.0}}
                }]
              }]
            }, {
              "id": "dose_unit",
              "name": "Dose unit",
              "localizedName": "Dose unit",
              "rmType": "DV_CODED_TEXT",
              "nodeId": "at0002",
              "min": 0,
              "max": 1,
              "localizedNames": {"en": "Dose unit"},
              "localizedDescriptions": {"en": "The dose unit of this medication amount."},
              "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication quantity']/items[at0002]/value"
            }, {
              "id": "description",
              "name": "Description",
              "localizedName": "Description",
              "rmType": "DV_TEXT",
              "nodeId": "at0003",
              "min": 0,
              "max": 1,
              "localizedNames": {"en": "Description"},
              "localizedDescriptions": {"en": "Free text description of the amount which may consist of the amount value and amount dose unit."},
              "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication quantity']/items[at0003]/value",
              "inputs": [{"type": "TEXT"}]
            }, {
              "id": "ratio_numerator",
              "name": "Ratio numerator",
              "localizedName": "Ratio numerator",
              "rmType": "CLUSTER",
              "nodeId": "at0008",
              "min": 0,
              "max": 1,
              "localizedNames": {"en": "Ratio numerator"},
              "localizedDescriptions": {"en": "The numerator value where the amount is described as a ratio e.g. 2mg where the amount is 2mg/ 5mls."},
              "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication quantity']/items[at0008]",
              "children": [{
                "id": "quantity",
                "name": "Quantity",
                "localizedName": "Quantity",
                "rmType": "DV_QUANTITY",
                "nodeId": "at0001",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Quantity"},
                "localizedDescriptions": {"en": "The value of the amount of medication as a real number e.g 1, 1.5, 0.125. "},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication quantity']/items[at0008]/items[at0001,'Quantity']/value",
                "inputs": [{
                  "suffix": "magnitude",
                  "type": "DECIMAL",
                  "validation": {"range": {"minOp": ">=", "min": 0.0}}
                }, {
                  "suffix": "unit",
                  "type": "CODED_TEXT",
                  "list": [{
                    "value": "1",
                    "label": "1",
                    "localizedLabels": {"en": "1"},
                    "validation": {"range": {"minOp": ">=", "min": 0.0}}
                  }]
                }]
              }, {
                "id": "dose_unit",
                "name": "Dose unit",
                "localizedName": "Dose unit",
                "rmType": "DV_CODED_TEXT",
                "nodeId": "at0002",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Dose unit"},
                "localizedDescriptions": {"en": "The dose unit of this medication amount."},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication quantity']/items[at0008]/items[at0002]/value"
              }]
            }, {
              "id": "ratio_denominator",
              "name": "Ratio denominator",
              "localizedName": "Ratio denominator",
              "rmType": "CLUSTER",
              "nodeId": "at0007",
              "min": 0,
              "max": 1,
              "localizedNames": {"en": "Ratio denominator"},
              "localizedDescriptions": {"en": "The denominator value where the amount is described as a ratio e.g. 5mls where the amount is 2mg/ 5mls."},
              "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication quantity']/items[at0007]",
              "children": [{
                "id": "quantity",
                "name": "Quantity",
                "localizedName": "Quantity",
                "rmType": "DV_QUANTITY",
                "nodeId": "at0001",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Quantity"},
                "localizedDescriptions": {"en": "The value of the amount of medication as a real number e.g 1, 1.5, 0.125. "},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication quantity']/items[at0007]/items[at0001,'Quantity']/value",
                "inputs": [{
                  "suffix": "magnitude",
                  "type": "DECIMAL",
                  "validation": {"range": {"minOp": ">=", "min": 0.0}}
                }, {
                  "suffix": "unit",
                  "type": "CODED_TEXT",
                  "list": [{
                    "value": "1",
                    "label": "1",
                    "localizedLabels": {"en": "1"},
                    "validation": {"range": {"minOp": ">=", "min": 0.0}}
                  }]
                }]
              }, {
                "id": "dose_unit",
                "name": "Dose unit",
                "localizedName": "Dose unit",
                "rmType": "DV_CODED_TEXT",
                "nodeId": "at0002",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Dose unit"},
                "localizedDescriptions": {"en": "The dose unit of this medication amount."},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_amount.v1,'Medication quantity']/items[at0007]/items[at0002]/value"
              }]
            }]
          }, {
            "id": "medicine_administered",
            "name": "Medicine administered",
            "localizedName": "Medicine administered",
            "rmType": "CLUSTER",
            "nodeId": "openEHR-EHR-CLUSTER.medication_admin.v1",
            "min": 0,
            "max": 1,
            "localizedNames": {"en": "Medicine administered"},
            "localizedDescriptions": {"en": "Information about the future or actual administration of medication."},
            "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Medicine administered']",
            "children": [{
              "id": "route",
              "name": "Route",
              "localizedName": "Route",
              "rmType": "DV_CODED_TEXT",
              "nodeId": "at0001",
              "min": 0,
              "max": -1,
              "localizedNames": {"en": "Route"},
              "localizedDescriptions": {"en": "The route by which the medication is administered (e.g. oral, sublingual etc)."},
              "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Medicine administered']/items[at0001]/value"
            }, {
              "id": "site",
              "name": "Site",
              "localizedName": "Site",
              "rmType": "DV_CODED_TEXT",
              "nodeId": "at0002",
              "min": 0,
              "max": 1,
              "localizedNames": {"en": "Site"},
              "localizedDescriptions": {"en": "A description of the site of administration."},
              "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Medicine administered']/items[at0002]/value",
              "inputs": [{
                "suffix": "code",
                "type": "CODED_TEXT",
                "list": [{
                  "value": "at0006",
                  "label": "Left upper arm",
                  "localizedLabels": {"en": "Left upper arm"},
                  "localizedDescriptions": {"en": "Left upper arm"}
                }, {
                  "value": "at0007",
                  "label": "Right upper arm",
                  "localizedLabels": {"en": "Right upper arm"},
                  "localizedDescriptions": {"en": "Right upper arm"}
                }, {
                  "value": "at0008",
                  "label": "Thigh left leg",
                  "localizedLabels": {"en": "Thigh left leg"},
                  "localizedDescriptions": {"en": "Thigh left leg"}
                }, {
                  "value": "at0009",
                  "label": "Thigh right leg",
                  "localizedLabels": {"en": "Thigh right leg"},
                  "localizedDescriptions": {"en": "Thigh right leg"}
                }, {
                  "value": "at0010",
                  "label": "Mouth",
                  "localizedLabels": {"en": "Mouth"},
                  "localizedDescriptions": {"en": "Mouth"}
                }, {
                  "value": "at0011",
                  "label": "Gluteus left",
                  "localizedLabels": {"en": "Gluteus left"},
                  "localizedDescriptions": {"en": "Gluteus left"}
                }, {
                  "value": "at0012",
                  "label": "Gluteus right",
                  "localizedLabels": {"en": "Gluteus right"},
                  "localizedDescriptions": {"en": "Gluteus right"}
                }]
              }]
            }, {
              "id": "delivery_method",
              "name": "Delivery method",
              "localizedName": "Delivery method",
              "rmType": "DV_TEXT",
              "nodeId": "at0003",
              "min": 0,
              "max": 1,
              "localizedNames": {"en": "Delivery method"},
              "localizedDescriptions": {"en": "The method of delivery if this should be specified (e.g. via a nebuliser or spacer)."},
              "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Medicine administered']/items[at0003]/value",
              "inputs": [{"type": "TEXT"}]
            }, {
              "id": "dose_duration",
              "name": "Dose duration",
              "localizedName": "Dose duration",
              "rmType": "DV_DURATION",
              "nodeId": "at0004",
              "min": 0,
              "max": 1,
              "localizedNames": {"en": "Dose duration"},
              "localizedDescriptions": {"en": "The length of time over which to administer each dose (e.g. an intravenous administration may have to be over a period of 5 minutes)."},
              "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Medicine administered']/items[at0004]/value",
              "inputs": [{
                "suffix": "year",
                "type": "INTEGER",
                "validation": {"range": {"minOp": ">=", "min": 0}}
              }, {
                "suffix": "month",
                "type": "INTEGER",
                "validation": {"range": {"minOp": ">=", "min": 0}}
              }, {
                "suffix": "day",
                "type": "INTEGER",
                "validation": {"range": {"minOp": ">=", "min": 0}}
              }, {
                "suffix": "week",
                "type": "INTEGER",
                "validation": {"range": {"minOp": ">=", "min": 0}}
              }, {
                "suffix": "hour",
                "type": "INTEGER",
                "validation": {"range": {"minOp": ">=", "min": 0}}
              }, {
                "suffix": "minute",
                "type": "INTEGER",
                "validation": {"range": {"minOp": ">=", "min": 0}}
              }, {"suffix": "second", "type": "INTEGER", "validation": {"range": {"minOp": ">=", "min": 0}}}]
            }, {
              "id": "infusion_administration_details",
              "name": "Infusion Administration Details",
              "localizedName": "Infusion Administration Details",
              "rmType": "CLUSTER",
              "nodeId": "openEHR-EHR-CLUSTER.infusion_details.v1",
              "min": 0,
              "max": -1,
              "localizedNames": {"en": "Infusion Administration Details"},
              "localizedDescriptions": {"en": "Details of a medication administered by infusion."},
              "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Medicine administered']/items[openEHR-EHR-CLUSTER.infusion_details.v1]",
              "children": [{
                "id": "dose_administration_formula",
                "name": "Dose Administration Formula",
                "localizedName": "Dose Administration Formula",
                "rmType": "ELEMENT",
                "nodeId": "at0006",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Dose Administration Formula"},
                "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Medicine administered']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]",
                "children": [{
                  "id": "coded_text_value",
                  "name": "Dose Administration Formula",
                  "localizedName": "Dose Administration Formula",
                  "rmType": "DV_CODED_TEXT",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Dose Administration Formula"},
                  "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Medicine administered']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                  "inputs": [{"suffix": "code", "type": "TEXT"}, {"suffix": "value", "type": "TEXT"}],
                  "inContext": true
                }, {
                  "id": "text_value",
                  "name": "Dose Administration Formula",
                  "localizedName": "Dose Administration Formula",
                  "rmType": "DV_TEXT",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Dose Administration Formula"},
                  "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Medicine administered']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                  "inputs": [{"type": "TEXT"}],
                  "inContext": true
                }, {
                  "id": "multimedia_value",
                  "name": "Dose Administration Formula",
                  "localizedName": "Dose Administration Formula",
                  "rmType": "DV_MULTIMEDIA",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Dose Administration Formula"},
                  "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Medicine administered']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                  "inputs": [{"type": "TEXT"}],
                  "inContext": true
                }, {
                  "id": "parsable_value",
                  "name": "Dose Administration Formula",
                  "localizedName": "Dose Administration Formula",
                  "rmType": "DV_PARSABLE",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Dose Administration Formula"},
                  "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Medicine administered']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                  "inputs": [{"type": "TEXT"}],
                  "inContext": true
                }, {
                  "id": "state_value",
                  "name": "Dose Administration Formula",
                  "localizedName": "Dose Administration Formula",
                  "rmType": "DV_STATE",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Dose Administration Formula"},
                  "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Medicine administered']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                  "inputs": [{"suffix": "code", "type": "TEXT"}, {"suffix": "value", "type": "TEXT"}],
                  "inContext": true
                }, {
                  "id": "boolean_value",
                  "name": "Dose Administration Formula",
                  "localizedName": "Dose Administration Formula",
                  "rmType": "DV_BOOLEAN",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Dose Administration Formula"},
                  "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Medicine administered']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                  "inputs": [{"type": "BOOLEAN"}],
                  "inContext": true
                }, {
                  "id": "identifier_value",
                  "name": "Dose Administration Formula",
                  "localizedName": "Dose Administration Formula",
                  "rmType": "DV_IDENTIFIER",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Dose Administration Formula"},
                  "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Medicine administered']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                  "inputs": [{"suffix": "id", "type": "TEXT"}, {"suffix": "type", "type": "TEXT"}, {
                    "suffix": "issuer",
                    "type": "TEXT"
                  }, {"suffix": "assigner", "type": "TEXT"}],
                  "inContext": true
                }, {
                  "id": "uri_value",
                  "name": "Dose Administration Formula",
                  "localizedName": "Dose Administration Formula",
                  "rmType": "DV_URI",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Dose Administration Formula"},
                  "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Medicine administered']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                  "inputs": [{"type": "TEXT"}],
                  "inContext": true
                }, {
                  "id": "ehr_uri_value",
                  "name": "Dose Administration Formula",
                  "localizedName": "Dose Administration Formula",
                  "rmType": "DV_EHR_URI",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Dose Administration Formula"},
                  "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Medicine administered']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                  "inputs": [{"type": "TEXT"}],
                  "inContext": true
                }, {
                  "id": "duration_value",
                  "name": "Dose Administration Formula",
                  "localizedName": "Dose Administration Formula",
                  "rmType": "DV_DURATION",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Dose Administration Formula"},
                  "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Medicine administered']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                  "inputs": [{
                    "suffix": "year",
                    "type": "INTEGER",
                    "validation": {"range": {"minOp": ">=", "min": 0}}
                  }, {
                    "suffix": "month",
                    "type": "INTEGER",
                    "validation": {"range": {"minOp": ">=", "min": 0}}
                  }, {
                    "suffix": "day",
                    "type": "INTEGER",
                    "validation": {"range": {"minOp": ">=", "min": 0}}
                  }, {
                    "suffix": "week",
                    "type": "INTEGER",
                    "validation": {"range": {"minOp": ">=", "min": 0}}
                  }, {
                    "suffix": "hour",
                    "type": "INTEGER",
                    "validation": {"range": {"minOp": ">=", "min": 0}}
                  }, {
                    "suffix": "minute",
                    "type": "INTEGER",
                    "validation": {"range": {"minOp": ">=", "min": 0}}
                  }, {"suffix": "second", "type": "INTEGER", "validation": {"range": {"minOp": ">=", "min": 0}}}],
                  "inContext": true
                }, {
                  "id": "quantity_value",
                  "name": "Dose Administration Formula",
                  "localizedName": "Dose Administration Formula",
                  "rmType": "DV_QUANTITY",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Dose Administration Formula"},
                  "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Medicine administered']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                  "inputs": [{"suffix": "magnitude", "type": "DECIMAL"}, {"suffix": "unit", "type": "TEXT"}],
                  "inContext": true
                }, {
                  "id": "count_value",
                  "name": "Dose Administration Formula",
                  "localizedName": "Dose Administration Formula",
                  "rmType": "DV_COUNT",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Dose Administration Formula"},
                  "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Medicine administered']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                  "inputs": [{"type": "INTEGER"}],
                  "inContext": true
                }, {
                  "id": "proportion_value",
                  "name": "Dose Administration Formula",
                  "localizedName": "Dose Administration Formula",
                  "rmType": "DV_PROPORTION",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Dose Administration Formula"},
                  "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Medicine administered']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                  "proportionTypes": ["integer_fraction", "unitary", "percent", "ratio", "fraction"],
                  "inputs": [{"suffix": "numerator", "type": "DECIMAL"}, {"suffix": "denominator", "type": "DECIMAL"}],
                  "inContext": true
                }, {
                  "id": "date_time_value",
                  "name": "Dose Administration Formula",
                  "localizedName": "Dose Administration Formula",
                  "rmType": "DV_DATE_TIME",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Dose Administration Formula"},
                  "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Medicine administered']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                  "inputs": [{"type": "DATETIME"}],
                  "inContext": true
                }, {
                  "id": "date_value",
                  "name": "Dose Administration Formula",
                  "localizedName": "Dose Administration Formula",
                  "rmType": "DV_DATE",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Dose Administration Formula"},
                  "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Medicine administered']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                  "inputs": [{"type": "DATE"}],
                  "inContext": true
                }, {
                  "id": "time_value",
                  "name": "Dose Administration Formula",
                  "localizedName": "Dose Administration Formula",
                  "rmType": "DV_TIME",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Dose Administration Formula"},
                  "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Medicine administered']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                  "inputs": [{"type": "TIME"}],
                  "inContext": true
                }, {
                  "id": "ordinal_value",
                  "name": "Dose Administration Formula",
                  "localizedName": "Dose Administration Formula",
                  "rmType": "DV_ORDINAL",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Dose Administration Formula"},
                  "localizedDescriptions": {"en": "The formula used to calculate the Dose Administration rate where this is dependent on some other factor such as patient weight e.g. 10mg/kg/day."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Medicine administered']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0006]/Dose Administration Formula",
                  "inputs": [{"type": "CODED_TEXT"}],
                  "inContext": true
                }]
              }, {
                "id": "dose_administration_rate",
                "name": "Dose Administration Rate",
                "localizedName": "Dose Administration Rate",
                "rmType": "ELEMENT",
                "nodeId": "at0001",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Dose Administration Rate"},
                "localizedDescriptions": {"en": "The rate at which the infusion is to be administered. Use the Text choice to record non or semi-quantifiable instructions e.g. 1 drop per minute."},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Medicine administered']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0001]",
                "children": [{
                  "id": "quantity_value",
                  "localizedName": "Dose Administration Rate",
                  "rmType": "DV_QUANTITY",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Dose Administration Rate"},
                  "localizedDescriptions": {"en": "The rate at which the infusion is to be administered. Use the Text choice to record non or semi-quantifiable instructions e.g. 1 drop per minute."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Medicine administered']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0001]/value",
                  "inputs": [{"suffix": "magnitude", "type": "DECIMAL"}, {
                    "suffix": "unit",
                    "type": "CODED_TEXT",
                    "list": [{
                      "value": "l/h",
                      "label": "l/h",
                      "localizedLabels": {"en": "l/h"},
                      "validation": {"range": {"minOp": ">=", "min": 0.0}}
                    }, {"value": "ml/min", "label": "ml/min", "localizedLabels": {"en": "ml/min"}}, {
                      "value": "ml/s",
                      "label": "ml/s",
                      "localizedLabels": {"en": "ml/s"}
                    }, {"value": "ml/h", "label": "ml/h", "localizedLabels": {"en": "ml/h"}}]
                  }]
                }, {
                  "id": "text_value",
                  "localizedName": "Dose Administration Rate",
                  "rmType": "DV_TEXT",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {"en": "Dose Administration Rate"},
                  "localizedDescriptions": {"en": "The rate at which the infusion is to be administered. Use the Text choice to record non or semi-quantifiable instructions e.g. 1 drop per minute."},
                  "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Medicine administered']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0001]/value",
                  "inputs": [{"type": "TEXT"}]
                }]
              }, {
                "id": "purpose",
                "name": "Purpose",
                "localizedName": "Purpose",
                "rmType": "DV_CODED_TEXT",
                "nodeId": "at0007",
                "min": 0,
                "max": 1,
                "localizedNames": {"en": "Purpose"},
                "localizedDescriptions": {"en": "The purpose of the infusion."},
                "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/description[at0017]/items[openEHR-EHR-CLUSTER.medication_admin.v1,'Medicine administered']/items[openEHR-EHR-CLUSTER.infusion_details.v1]/items[at0007]/value",
                "inputs": [{
                  "suffix": "code",
                  "type": "CODED_TEXT",
                  "list": [{
                    "value": "at0008",
                    "label": "Baseline electrolyte infusion",
                    "localizedLabels": {"en": "Baseline electrolyte infusion"},
                    "localizedDescriptions": {"en": "The infusion provides baseline hydration."}
                  }, {
                    "value": "at0009",
                    "label": "Active medication infusion",
                    "localizedLabels": {"en": "Active medication infusion"},
                    "localizedDescriptions": {"en": "The infusion carries an active pharrmaceutical ingredient."}
                  }]
                }]
              }]
            }]
          }, {
            "id": "self-administration_type",
            "name": "Self-administration type",
            "localizedName": "Self-administration type",
            "rmType": "DV_CODED_TEXT",
            "nodeId": "at0048",
            "min": 0,
            "max": 1,
            "localizedNames": {"en": "Self-administration type"},
            "localizedDescriptions": {"en": "The category of self-administration"},
            "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/protocol[at0030]/items[at0048]/value",
            "inputs": [{
              "suffix": "code",
              "type": "CODED_TEXT",
              "list": [{
                "value": "at0050",
                "label": "Level 1",
                "localizedLabels": {"en": "Level 1"},
                "localizedDescriptions": {"en": "UK self-administration level 1."}
              }, {
                "value": "at0051",
                "label": "Level 2",
                "localizedLabels": {"en": "Level 2"},
                "localizedDescriptions": {"en": "UK self-administration level 2."}
              }, {
                "value": "at0052",
                "label": "Level 3",
                "localizedLabels": {"en": "Level 3"},
                "localizedDescriptions": {"en": "UK self-administration level 3."}
              }]
            }]
          }, {
            "id": "scheduled_action_time",
            "name": "Scheduled action time",
            "localizedName": "Scheduled action time",
            "rmType": "DV_DATE_TIME",
            "nodeId": "at0043",
            "min": 0,
            "max": 1,
            "localizedNames": {"en": "Scheduled action time"},
            "localizedDescriptions": {"en": "The datetime at which the action was scheduled to occur."},
            "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/protocol[at0030]/items[at0043]/value",
            "inputs": [{"type": "DATETIME"}]
          }, {
            "id": "time",
            "name": "Time",
            "rmType": "DV_DATE_TIME",
            "min": 0,
            "max": 1,
            "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/time",
            "inputs": [{"type": "DATETIME"}],
            "inContext": true
          }, {
            "id": "language",
            "name": "Language",
            "rmType": "CODE_PHRASE",
            "min": 0,
            "max": 1,
            "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/language",
            "inContext": true
          }, {
            "id": "encoding",
            "name": "Encoding",
            "rmType": "CODE_PHRASE",
            "min": 0,
            "max": 1,
            "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/encoding",
            "inContext": true
          }, {
            "id": "subject",
            "name": "Subject",
            "rmType": "PARTY_PROXY",
            "min": 0,
            "max": 1,
            "aqlPath": "/content[openEHR-EHR-SECTION.medication.v1,'Medication detail']/items[openEHR-EHR-ACTION.medication.v1]/subject",
            "inContext": true
          }]
        }]
      }, {
        "id": "category",
        "rmType": "DV_CODED_TEXT",
        "min": 1,
        "max": 1,
        "aqlPath": "/category",
        "inputs": [{
          "suffix": "code",
          "type": "CODED_TEXT",
          "list": [{"value": "433", "label": "event", "localizedLabels": {"en": "event"}}],
          "terminology": "openehr"
        }],
        "inContext": true
      }, {
        "id": "language",
        "name": "Language",
        "rmType": "CODE_PHRASE",
        "min": 0,
        "max": 1,
        "aqlPath": "/language",
        "inContext": true
      }, {
        "id": "territory",
        "name": "Territory",
        "rmType": "CODE_PHRASE",
        "min": 0,
        "max": 1,
        "aqlPath": "/territory",
        "inContext": true
      }, {
        "id": "composer",
        "name": "Composer",
        "rmType": "PARTY_PROXY",
        "min": 0,
        "max": 1,
        "aqlPath": "/composer",
        "inContext": true
      }]
    }
  }
};
