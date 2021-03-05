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

/**
 * Models for Better Platform views (view is basically predefined AQL execution endpoint)
 */

export class EhrView {
  name: string;
  type: EhrViewType;
  description: string;
  steps: EhrViewSteps;
  metaData: EhrViewMetaData | string;
  unsaved = false;

  constructor(name: string, description: string, steps: EhrViewSteps, metadata?: EhrViewMetaData | string) {
    this.name = name;
    this.type = Array.isArray(steps) ? steps[0].processorName : steps.processorName;
    this.description = description;
    this.metaData = metadata;
    /**
     * This check if it is array can be removed once platform drops support for multi steps
     */
    this.steps = Array.isArray(steps) ? new EhrViewSteps(steps[0].processorData, this.type) : steps;
  }
}

export class EhrViewSteps {
  processorData: string;
  processorName: EhrViewType;

  constructor(data: string, viewType = EhrViewType.JSON_AQL) {
    this.processorData = data;
    this.processorName = viewType;
  }
}

export class EhrViewMetaData {
  parameters: Record<string, string>[] = [];
  cacheable: boolean;

  setParameter(name: string, description: string = '', type: string = 'string') {
    this.parameters.push({name, description, type});
  }
}

export enum EhrViewType {
  JSON_AQL = 'jsonAql',
  JSON_FTL_AQL = 'jsonFtlAql',
  JS = 'js'
}
