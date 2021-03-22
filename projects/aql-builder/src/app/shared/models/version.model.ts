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

import {RmType} from './rm-type.enum';

export class Version {
  uid: {value: {rmType: RmType.DV_TEXT}};
  preceding_version_uid: {value: {rmType: RmType.DV_TEXT}};
  other_input_version_uids: {value: {rmType: RmType.DV_TEXT}};
  lifecycle_state: {
    value: {rmType: RmType.DV_TEXT};
    formatting: {rmType: RmType.DV_TEXT};
    defining_code: {code_string: {rmType: RmType.DV_TEXT}};
    hyperlink: {value: {rmType: RmType.DV_TEXT}};
    language: {code_string: {rmType: RmType.DV_TEXT}};
    encoding: {code_string: {rmType: RmType.DV_TEXT}};
  };
  contribution: {
    id: { value: {rmType: RmType.DV_TEXT} }
    namespace: {rmType: RmType.DV_TEXT};
    type: {rmType: RmType.DV_TEXT};
  };
  commit_audit: {
    system_id: {rmType: RmType.DV_TEXT};
    commiter: {
      external_ref: {
        id: {value: {rmType: RmType.DV_TEXT}};
        namespace: {rmType: RmType.DV_TEXT};
        type: {rmType: RmType.DV_TEXT};
      }
    },
    time_committed: {
      normal_status: {code_string: {rmType: RmType.DV_TEXT}},
      magnitude_status;
      value: {rmType: RmType.DV_TIME};
      accuracy: Accuracy
    },
    change_type: {
      value: {rmType: RmType.DV_TEXT};
      formatting: {rmType: RmType.DV_TEXT};
      defining_code: {code_string: {rmType: RmType.DV_TEXT}};
      hyperlink: {value: {rmType: RmType.DV_TEXT}};
      language: {code_string: {rmType: RmType.DV_TEXT}};
      encoding: {code_string: {rmType: RmType.DV_TEXT}};
    },
    description: {
      value: {rmType: RmType.DV_TEXT};
      defining_code: {
        terminology_id: {rmType: RmType.DV_TEXT};
        code_phrase: {rmType: RmType.DV_TEXT};
      };
      hyperlink: {value: {rmType: RmType.DV_TEXT}};
      formatting: {rmType: RmType.DV_TEXT};
      language: {code_string: {rmType: RmType.DV_TEXT}};
      encoding: {code_string: {rmType: RmType.DV_TEXT}};
    }
  };
  signature: {rmType: RmType.DV_TEXT};

  constructor() {
    this.uid = {value: {rmType: RmType.DV_TEXT}};
    this.preceding_version_uid = {value: {rmType: RmType.DV_TEXT}};
    this.other_input_version_uids = {value: {rmType: RmType.DV_TEXT}};
    this.lifecycle_state = {
      value: {rmType: RmType.DV_TEXT},
      formatting: {rmType: RmType.DV_TEXT},
      defining_code: {code_string: {rmType: RmType.DV_TEXT}},
      hyperlink: {value: {rmType: RmType.DV_TEXT}},
      language: {code_string: {rmType: RmType.DV_TEXT}},
      encoding: {code_string: {rmType: RmType.DV_TEXT}},
    };
    this.contribution = {
      id: { value: {rmType: RmType.DV_TEXT} },
      namespace: {rmType: RmType.DV_TEXT},
      type: {rmType: RmType.DV_TEXT}
    };
    this.commit_audit = {
      system_id: {rmType: RmType.DV_TEXT},
      commiter: {
        external_ref: {
          id: {value: {rmType: RmType.DV_TEXT}},
          namespace: {rmType: RmType.DV_TEXT},
          type: {rmType: RmType.DV_TEXT}
        }
      },
      time_committed: {
        normal_status: {code_string: {rmType: RmType.DV_TEXT}},
        magnitude_status: {rmType: RmType.DV_TEXT},
        value: {rmType: RmType.DV_TIME},
        accuracy: new Accuracy()
      },
      change_type: {
        value: {rmType: RmType.DV_TEXT},
        formatting: {rmType: RmType.DV_TEXT},
        defining_code: {code_string: {rmType: RmType.DV_TEXT}},
        hyperlink: {value: {rmType: RmType.DV_TEXT}},
        language: {code_string: {rmType: RmType.DV_TEXT}},
        encoding: {code_string: {rmType: RmType.DV_TEXT}}
      },
      description: {
        value: {rmType: RmType.DV_TEXT},
        defining_code: {
          terminology_id: {rmType: RmType.DV_TEXT},
          code_phrase: {rmType: RmType.DV_TEXT},
        },
        hyperlink: {value: {rmType: RmType.DV_TEXT}},
        formatting: {rmType: RmType.DV_TEXT},
        language: {code_string: {rmType: RmType.DV_TEXT}},
        encoding: {code_string: {rmType: RmType.DV_TEXT}}
      }
    };
    this.signature = {rmType: RmType.DV_TEXT};
  }
}


export class Accuracy {
  normal_status: {code_string: {rmType: RmType.DV_TEXT}};
  magnitude_status: {rmType: RmType.DV_TEXT};
  accuracy: any;
  accuracy_is_percent: {rmType: RmType.DV_TEXT};
  value: any;

  constructor() {
    this.normal_status = {code_string: {rmType: RmType.DV_TEXT}};
    this.magnitude_status = {rmType: RmType.DV_TEXT};
    this.accuracy = {rmType: RmType.DV_TEXT};
    this.accuracy_is_percent = {rmType: RmType.DV_TEXT};
    this.value = {rmType: RmType.DV_TEXT};
  }
}
