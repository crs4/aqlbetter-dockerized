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

import {ExternalRef, FeederAudit, Identifiers} from './ehr.model';
import {Accuracy} from './version.model';
import {RmType} from './rm-type.enum';

export class Composition {
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
  archetype_details: ArchetypeDetails;
  composer: Composer;
  context: Context;
  category: Category;
  language: Language;
  territory: {code_string: {rmType: RmType.DV_TEXT}};
  feeder_audit: FeederAudit;
  content: Content;

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
    this.archetype_details = new ArchetypeDetails();
    this.composer = new Composer();
    this.context = new Context();
    this.category = new Category();
    this.language = new Language();
    this.territory =  {code_string: {rmType: RmType.DV_TEXT}};
    this.feeder_audit = new FeederAudit();
    this.content = new Content();
  }
}

export class ArchetypeDetails {
  archetype_id: {value: {rmType: RmType.DV_TEXT}};
  template_id: {value: {rmType: RmType.DV_TEXT}};
  rm_version: {rmType: RmType.DV_TEXT};
  archetype_node_id: {rmType: RmType.DV_TEXT};
  language: Language;
  content: AqlContent[];

  constructor() {
    this.archetype_id = {value: {rmType: RmType.DV_TEXT}};
    this.template_id = {value: {rmType: RmType.DV_TEXT}};
    this.rm_version = {rmType: RmType.DV_TEXT};
    this.archetype_node_id = {rmType: RmType.DV_TEXT};
    this.language = new Language();
    this.content = new Array<AqlContent>();
  }
}

export class Language {
  terminology_id: {value: {rmType: RmType.DV_TEXT}};
  code_string: {rmType: RmType.DV_TEXT};

  constructor() {
    this.terminology_id = {value: {rmType: RmType.DV_TEXT}};
    this.code_string = {rmType: RmType.DV_TEXT};
  }
}


export class AqlContent {
  name: {value: {rmType: RmType.DV_TEXT}};
  archetype_details: ArchetypeDetails;
  archetype_node_id: {rmType: RmType.DV_TEXT};

  constructor() {
    this.name = {value: {rmType: RmType.DV_TEXT}};
    this.archetype_details = new ArchetypeDetails();
    this.archetype_node_id = {rmType: RmType.DV_TEXT};
  }
}


export class Composer {
  external_ref: ExternalRef;

  constructor() {
    this.external_ref = new ExternalRef();
  }
}

export class Context {
  start_time: {
    normal_status: {code_string: {rmType: RmType.DV_TEXT}};
    magnitude_status: {rmType: RmType.DV_TEXT};
    value: {rmType: RmType.DV_TIME};
    accuracy: Accuracy;
  };
  end_time: {
    normal_status: {code_string: {rmType: RmType.DV_TEXT}};
    magnitude_status: {rmType: RmType.DV_TEXT};
    value: {rmType: RmType.DV_TIME};
    accuracy: Accuracy;
  };
  location: {rmType: RmType.DV_TEXT};
  setting: {
    value: {rmType: RmType.DV_TEXT};
    formatting: {rmType: RmType.DV_TEXT};
    defining_code: {code_string: {rmType: RmType.DV_TEXT}};
    hyperlink: {value: {rmType: RmType.DV_TEXT}};
    language: {code_string: {rmType: RmType.DV_TEXT}};
    encoding: {code_string: {rmType: RmType.DV_TEXT}};
  };
  health_care_facility: {
    name: {rmType: RmType.DV_TEXT};
    identifiers: Identifiers;
    external_ref: ExternalRef;
  };

  constructor() {
    this.start_time = {
      normal_status: {code_string: {rmType: RmType.DV_TEXT}},
      magnitude_status: {rmType: RmType.DV_TEXT},
      value: {rmType: RmType.DV_TIME},
      accuracy: new Accuracy()
    };
    this.end_time = {
      normal_status: {code_string: {rmType: RmType.DV_TEXT}},
      magnitude_status: {rmType: RmType.DV_TEXT},
      value: {rmType: RmType.DV_TIME},
      accuracy: new Accuracy(),
    };
    this.location = {rmType: RmType.DV_TEXT};
    this.setting = {
      value: {rmType: RmType.DV_TEXT},
      formatting: {rmType: RmType.DV_TEXT},
      defining_code: {code_string: {rmType: RmType.DV_TEXT}},
      hyperlink: {value: {rmType: RmType.DV_TEXT}},
      language: {code_string: {rmType: RmType.DV_TEXT}},
      encoding: {code_string: {rmType: RmType.DV_TEXT}}
    };
    this.health_care_facility = {
      name: {rmType: RmType.DV_TEXT},
      identifiers: new Identifiers(),
      external_ref: new ExternalRef()
    };
  }
}

export class Category {
  value: {rmType: RmType.DV_TEXT};
  formatting: {rmType: RmType.DV_TEXT};
  defining_code: {code_string: {rmType: RmType.DV_TEXT}};
  hyperlink: {value: {rmType: RmType.DV_TEXT}};
  language: {code_string: {rmType: RmType.DV_TEXT}};
  encoding: {code_string: {rmType: RmType.DV_TEXT}};

  constructor() {
    this.value = {rmType: RmType.DV_TEXT};
    this.formatting = {rmType: RmType.DV_TEXT};
    this.defining_code = {code_string: {rmType: RmType.DV_TEXT}};
    this.hyperlink = {value: {rmType: RmType.DV_TEXT}};
    this.language =  {code_string: {rmType: RmType.DV_TEXT}};
    this.encoding = {code_string: {rmType: RmType.DV_TEXT}};
  }
}

export class Content {
  name: {
    value: {rmType: RmType.DV_TEXT},
    defining_code: {
      terminology_id: {rmType: RmType.DV_TEXT};
      code_phrase: {rmType: RmType.DV_TEXT};
    };
    hyperlink: {value: {rmType: RmType.DV_TEXT}};
    formatting: {rmType: RmType.DV_TEXT};
    language: {code_string: {rmType: RmType.DV_TEXT}};
    encoding: {code_string: {rmType: RmType.DV_TEXT}};
  };
  uid: {value: {rmType: RmType.DV_TEXT}};
  feeder_audit: FeederAudit;
  archetype_details: ArchetypeDetails;

  constructor() {
    this.name = {
      value: {rmType: RmType.DV_TEXT},
      defining_code: {
        terminology_id: {rmType: RmType.DV_TEXT},
        code_phrase: {rmType: RmType.DV_TEXT}
      },
      hyperlink: {value: {rmType: RmType.DV_TEXT}},
      formatting: {rmType: RmType.DV_TEXT},
      language: {code_string: {rmType: RmType.DV_TEXT}},
      encoding: {code_string: {rmType: RmType.DV_TEXT}}
    };
    this.uid = {value: {rmType: RmType.DV_TEXT}};
    this.feeder_audit = new FeederAudit();
    this.archetype_details = new ArchetypeDetails();
  }
}
