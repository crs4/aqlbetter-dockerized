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

import {AdditionalAqlAutocompleteKeyword} from '../aql-builder/monaco/monaco-aql.model';
import {Ehr} from '../shared/models/ehr.model';
import {Composition} from '../shared/models/composition.model';
import {Version} from '../shared/models/version.model';
import {VersionedObject} from '../shared/models/versioned-object.model';

export class AutocompleteObjectsStore {

  static readonly predefinedObjects = new Map<AdditionalAqlAutocompleteKeyword, any>([
    [AdditionalAqlAutocompleteKeyword.EHR, new Ehr()],
    [AdditionalAqlAutocompleteKeyword.COMPOSITION, new Composition()],
    [AdditionalAqlAutocompleteKeyword.VERSION, new Version()],
    [AdditionalAqlAutocompleteKeyword.VERSIONED_OBJECT, new VersionedObject()]
  ]);

  static snippetMap: Map<string, string> = new Map<string, string>();
}
