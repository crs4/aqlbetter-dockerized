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


export class Ehr {
  system_id: {
    value: {rmType: RmType.DV_TEXT},
    rmType: RmType.DV_IDENTIFIER
  };
  ehr_id: {
    value: {rmType: RmType.DV_TEXT},
    rmType: RmType.DV_IDENTIFIER
  };
  time_created: {
    value: {rmType: RmType.DV_TIME},
    normal_status: {code_string: {rmType: RmType.DV_TEXT}},
    magnitude_status: {rmType: RmType.DV_TEXT},
    accuracy: {value: Accuracy, rmType: RmType.DV_DURATION},
    rmType: RmType.DV_TIME
  };
  ehr_status: EhrStatus;

  constructor () {
    this.system_id = {value: {rmType: RmType.DV_TEXT}, rmType: RmType.DV_IDENTIFIER};
    this.ehr_id = {value: {rmType: RmType.DV_TEXT}, rmType: RmType.DV_IDENTIFIER};
    this.time_created = {
      value: {rmType: RmType.DV_TIME},
      normal_status: {code_string: {rmType: RmType.DV_TEXT}},
      magnitude_status: {rmType: RmType.DV_TEXT},
      accuracy: {value: new Accuracy(), rmType: RmType.DV_DURATION},
      rmType: RmType.DV_TIME
    };
    this.ehr_status = new EhrStatus();
  }

}

export class EhrStatus {
  name: {
    value: {rmType: RmType.DV_TEXT},
    defining_code: {terminology_id: {rmType: RmType.DV_TEXT}, code_phrase: {rmType: RmType.DV_TEXT}},
    hyperlink: {value: {rmType: RmType.DV_TEXT}},
    formatting: {rmType: RmType.DV_TEXT},
    language: {code_string: RmType.DV_TEXT},
    encoding: {code_string: RmType.DV_TEXT}
  };
  uid: {
    value: {rmType: RmType.DV_TEXT},
    rmType: RmType.DV_IDENTIFIER
  };
  feeder_audit: FeederAudit;
  subject: {external_ref: ExternalRef};
  queryable: {rmType: RmType.DV_BOOLEAN};
  modifiable: {rmType: RmType.DV_BOOLEAN};

  constructor() {
    this.name = {
      value: {rmType: RmType.DV_TEXT},
      defining_code: {terminology_id: {rmType: RmType.DV_TEXT}, code_phrase: {rmType: RmType.DV_TEXT}},
      hyperlink: {value: {rmType: RmType.DV_TEXT}},
      formatting: {rmType: RmType.DV_TEXT},
      language: {code_string: RmType.DV_TEXT},
      encoding: {code_string: RmType.DV_TEXT}
    };
    this.uid = {
      value: {rmType: RmType.DV_TEXT},
      rmType: RmType.DV_IDENTIFIER
    };
    this.feeder_audit = new FeederAudit();
    this.subject = {external_ref: new ExternalRef()};
    this.queryable = {rmType: RmType.DV_BOOLEAN};
    this.modifiable = {rmType: RmType.DV_BOOLEAN};
  }

}

export class FeederAudit {
  originating_system_item_ids: {
    value: Identifiers,
    rmType: RmType.DV_IDENTIFIER
  };
  feeder_system_item_ids: {
    value: Identifiers,
    rmType: RmType.DV_IDENTIFIER
  };
  original_content: {charset: {code_string: {rmType: RmType.DV_TEXT}}, language: {code_string: {rmType: RmType.DV_TEXT}}, value: {rmType: RmType.DV_TEXT}};
  originating_system_audit: {system_id: {rmType: RmType.DV_TEXT}, location: Location, provider: Provider, time: Time, version_id: {rmType: RmType.DV_TEXT}};
  feeder_system_audit: {
    system_id: {rmType: RmType.DV_TEXT},
    location: Location,
    provider: Provider,
    subject: {external_ref: ExternalRef},
    time: {value: Time, rmType: RmType.DV_TIME},
    version_id: {rmType: RmType.DV_TEXT}
  };

  constructor() {
    this.originating_system_item_ids = {
      value: new Identifiers(),
      rmType: RmType.DV_IDENTIFIER
    };
    this.feeder_system_item_ids = {
      value: new Identifiers(),
      rmType: RmType.DV_IDENTIFIER
    };
    this.original_content = {charset: {code_string: {rmType: RmType.DV_TEXT}}, language: {code_string: {rmType: RmType.DV_TEXT}}, value: {rmType: RmType.DV_TEXT}};
    this.originating_system_audit = {
      system_id: {rmType: RmType.DV_TEXT},
      location: new Location(),
      provider: new Provider(),
      time: new Time(),
      version_id: {rmType: RmType.DV_TEXT}
    };
    this.feeder_system_audit = {
      system_id: {rmType: RmType.DV_TEXT},
      location: new Location(),
      provider: new Provider(),
      subject: {external_ref: new ExternalRef()},
      time: {value: new Time(), rmType: RmType.DV_TIME},
      version_id: {rmType: RmType.DV_TEXT}
    };
  }
}

export class Location {
  name: {rmType: RmType.DV_TEXT};
  identifiers: {value: Identifiers, rmType: RmType.DV_IDENTIFIER};
  external_ref: {id: {value: {rmType: RmType.DV_TEXT}, rmType: RmType.DV_IDENTIFIER}, namespace: {rmType: RmType.DV_TEXT}, type: {rmType: RmType.DV_TEXT}};

  constructor() {
    this.name = {rmType: RmType.DV_TEXT};
    this.identifiers = {value: new Identifiers(), rmType: RmType.DV_IDENTIFIER};
    this.external_ref = {id: {value: {rmType: RmType.DV_TEXT}, rmType: RmType.DV_IDENTIFIER}, namespace: {rmType: RmType.DV_TEXT}, type: {rmType: RmType.DV_TEXT}};
  }
}

export class Identifiers {
  id: {rmType: RmType.DV_TEXT};
  issuer: {rmType: RmType.DV_TEXT};
  assigner: {rmType: RmType.DV_TEXT};
  type: {rmType: RmType.DV_TEXT};

  constructor() {
    this.id = {rmType: RmType.DV_TEXT};
    this.issuer = {rmType: RmType.DV_TEXT};
    this.assigner = {rmType: RmType.DV_TEXT};
    this.type = {rmType: RmType.DV_TEXT};
  }

}

export class Provider {
  name: {rmType: RmType.DV_TEXT};
  identifiers: {value: Identifiers, rmType: RmType.DV_IDENTIFIER};
  external_ref: ExternalRef;

  constructor() {
    this.name = {rmType: RmType.DV_TEXT};
    this.identifiers = {value: new Identifiers(), rmType: RmType.DV_IDENTIFIER};
    this.external_ref = new ExternalRef();
  }

}

export class ExternalRef {
  id: {value: {rmType: RmType.DV_TEXT}, rmType: RmType.DV_IDENTIFIER};
  namespace: {rmType: RmType.DV_TEXT};
  type: {rmType: RmType.DV_TEXT};

  constructor() {
    this.id = {value: {rmType: RmType.DV_TEXT}, rmType: RmType.DV_IDENTIFIER};
    this.namespace = {rmType: RmType.DV_TEXT};
    this.type = {rmType: RmType.DV_TEXT};
  }
}

export class Time {
  normal_status: {code_string: {rmType: RmType.DV_TEXT}};
  magnitude_status: {rmType: RmType.DV_TEXT};
  accuracy: {value: Accuracy, rmType: RmType.DV_DURATION};

  constructor() {
    this.normal_status = {code_string: {rmType: RmType.DV_TEXT}};
    this.magnitude_status = {rmType: RmType.DV_TEXT};
    this.accuracy = {value: new Accuracy(), rmType: RmType.DV_DURATION};
  }
}

export class Accuracy {
  normal_status: {code_string: {rmType: RmType.DV_TEXT}};
  magnitude_status: {rmType: RmType.DV_TEXT};
  accuracy: any;
  accuracy_is_percent: {rmType: RmType.DV_BOOLEAN};
  value: {rmType: RmType.DV_DURATION};

  constructor() {
    this.normal_status = {code_string: {rmType: RmType.DV_TEXT}};
    this.magnitude_status = {rmType: RmType.DV_TEXT};
    this.accuracy = undefined;
    this.accuracy_is_percent = {rmType: RmType.DV_BOOLEAN};
    this.value = {rmType: RmType.DV_DURATION};
  }
}
