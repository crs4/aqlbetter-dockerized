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

import {Accuracy} from './version.model';
import {RmType} from './rm-type.enum';

export class VersionedObject {
  uid: {value: {rmType: RmType.DV_TEXT}};
  owner_id: {
    id: {value: {rmType: RmType.DV_TEXT}},
    namespace: {rmType: RmType.DV_TEXT},
    type: {rmType: RmType.DV_TEXT}
  };
  time_created: {
    normal_status: {code_string: {rmType: RmType.DV_TEXT}},
    magnitude_status: {rmType: RmType.DV_TEXT},
    value: {rmType: RmType.DV_TIME},
    accuracy: {
      normal_status: {code_string: {rmType: RmType.DV_TEXT}},
      magnitude_status: {rmType: RmType.DV_TEXT},
      accuracy: Accuracy,
      accuracy_is_percent: {rmType: RmType.DV_TEXT},
      value: any
    }
  };
  trunk_lifecycle_state: {
    value: {rmType: RmType.DV_TEXT},
    formatting: {rmType: RmType.DV_TEXT},
    defining_code: {code_string: {rmType: RmType.DV_TEXT}},
    hyperlink: {value: {rmType: RmType.DV_TEXT}},
    language: {code_string: {rmType: RmType.DV_TEXT}},
    encoding: {code_string: {rmType: RmType.DV_TEXT}}
  };

  constructor() {
    this.uid = {value: {rmType: RmType.DV_TEXT}};
    this.owner_id = {
      id: {value: {rmType: RmType.DV_TEXT}},
      namespace: {rmType: RmType.DV_TEXT},
      type: {rmType: RmType.DV_TEXT}
    };
    this.time_created = {
      normal_status: {code_string: {rmType: RmType.DV_TEXT}},
      magnitude_status: {rmType: RmType.DV_TEXT},
        value: {rmType: RmType.DV_TIME},
        accuracy: {
        normal_status: {code_string: {rmType: RmType.DV_TEXT}},
        magnitude_status: {rmType: RmType.DV_TEXT},
          accuracy: new Accuracy(),
          accuracy_is_percent: {rmType: RmType.DV_TEXT},
          value: {rmType: RmType.DV_TEXT}
      }
    };
    this.trunk_lifecycle_state = {
      value: {rmType: RmType.DV_TEXT},
        formatting: {rmType: RmType.DV_TEXT},
        defining_code: {code_string: {rmType: RmType.DV_TEXT}},
      hyperlink: {value: {rmType: RmType.DV_TEXT}},
      language: {code_string: {rmType: RmType.DV_TEXT}},
      encoding: {code_string: {rmType: RmType.DV_TEXT}}
    };
  }

}
