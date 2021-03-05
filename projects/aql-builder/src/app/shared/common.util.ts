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

export class CommonUtil {

  static isBlank(str: string): boolean {
    return (!str || /^\s*$/.test(str));
  }

  static removeWhitespacesFromString(str: string): string {
    return str.replace(/\s*/g, '');
  }

  static toStringAndLowerCase(object: any): string | undefined {
    if (object) {
      return object.toString().toLowerCase();
    }
    return;
  }

  static removeAttributeFromObject(object: any, attribute: string) {
    if (object && object.hasOwnProperty(attribute)) {
      delete object[attribute];
    }
  }

  static insertArrayAt(array: any[], index: number, arrayToInsert: any[]): void {
    Array.prototype.splice.apply(array, [index, 0].concat(arrayToInsert));
  }

  static cloneMap(map: Map<string, string>): Map<string, string> {
    const clonedMap: Map<string, string> = new Map<string, string>();
    map.forEach((value, key) => clonedMap.set(key, value));
    return clonedMap;
  }

  static escapeRegExp(string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  public static copyToClipboard(text: string): void {
    const textarea: HTMLElement = document.createElement('textarea');
    textarea.style.opacity = '0';
    textarea.style.position = 'fixed';
    textarea.textContent = text;
    const body = document.getElementsByTagName('body')[0];
    body.appendChild(textarea);
    (textarea as HTMLInputElement).select();
    document.execCommand('copy');
    body.removeChild(textarea);
  }

  public static downloadFile(file: Blob, fileName: string, mimeType: string): void {
    const body: HTMLBodyElement = document.getElementsByTagName('body')[0];
    const link = document.createElement('a');
    body.appendChild(link);
    link.href = URL.createObjectURL(file);
    link.download = fileName;
    link.dataset.downloadurl = [mimeType, link.download, link.href].join(':');
    link.click();
    URL.revokeObjectURL(link.href);
    link.parentElement.removeChild(link);
  }

  /**
   * UUID v4
   */
  /*tslint:disable no-bitwise*/
  static getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  static updateIdForObject(obj: object, idKey: string = 'id'): void {
    if (obj?.hasOwnProperty(idKey)) {
      obj[idKey] = CommonUtil.getUUID();
    }
  }

  static isSafari(): boolean {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }

  static checkDomTreeForTargetId(target: HTMLElement, validTargets: string[]): string {
    const validTarget = validTargets.find(t => {
      const regexp = new RegExp(t, 'i');
      return regexp.test(target.id);
    });
    if (validTarget) {
      return validTarget;
    } else if (target.parentElement) {
      return this.checkDomTreeForTargetId(target.parentElement, validTargets);
    } else {
      return undefined;
    }
  }

  static sanitizeName(name: string): string {
    return name.replace(/\W/g, '_');
  }

  static getBaseHrefFromDOM(): string {
    const base = document.querySelector('base');
    if (!base) {
      return '/';
    }
    return base.attributes.getNamedItem('href')?.value || '/';
  }

  static removeTrailingSlash(resourceUrl: string): string | undefined {
    return resourceUrl?.replace(/\/$/, '');
  }
}
