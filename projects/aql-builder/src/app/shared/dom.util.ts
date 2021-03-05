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
 * Util service for everything related to direct DOM manipulation
 */
export class DomUtil {

  public static getElementById(id: string): HTMLElement | null {
    return document.getElementById(id);
  }

  public static getElementBySelector(parentId: string, selector: string) {
    return document.getElementById(parentId).querySelector(selector);
  }

  public static getElementsBySelector(selector: string) {
    return document.querySelectorAll(selector);
  }

  /**
   * Query parent container for element with appended class sortable-chosen
   *
   * @param {string} parentContainer
   * @returns {Element | null}
   */
  public static getDraggableElement(parentContainer: string = ''): Element | null {
    const query = parentContainer + '.' + DomSelectorsEnum.SORTABLE_CHOSEN;
    return document.querySelector(query);
  }

  public static getFormElementAttribute(element: Element, attributeName: string): string {
    if (element) {
      const ehrDataEl = element.querySelector(`[${attributeName}]`);
      return ehrDataEl ? ehrDataEl.getAttribute(`${attributeName}`) : '';
    }
    return '';
  }

  public static getCurrentlyActiveFocusElementId(): string {
    return document.activeElement.id;
  }
}

export enum DomSelectorsEnum {
  DATA_EHR_PATH = 'data-ehr-path',
  APP_RENDERER = 'fb-renderer',
  SORTABLE_CHOSEN = 'sortable-chosen',
  ID = 'id',
  APP_COLUMN_RENDERER = 'fb-column-renderer',
  TREE_GENERIC_ELEMENT = 'tree-generic-',
  GENERIC_ELEMENT = 'generic-',
  GENERIC_FIELDSET = 'generic-field', // only 'field' because of backwards compatibility with previous builder version
  HIGHLIGHTED_FIELD = 'highlight-field',
  HIGHLIGHTED_FIELD_SELECTED = 'highlight-field-selected',
  DRAGGABLE = 'draggable',
  CANVAS = 'canvas',
  TEMPLATES_SEARCH_INPUT = 'templates-search-input',
  TOKENS_TOOLTIP = 'tokensTooltip',
  TOKENS_CONTAINER = 'tokensContainer',
  EXPRESSION_ASSISTANT_TOGGLE = 'expression-assistant-toggle',
  TYPEAHEAD_PREFIX = 'ngb-typeahead',
  TYPEAHEAD_EMPTY = 'typeahead-empty',
  FIELD_PICKER_CONTAINER = 'field-picker-container',
  TOOLBAR = 'toolbar'
}
