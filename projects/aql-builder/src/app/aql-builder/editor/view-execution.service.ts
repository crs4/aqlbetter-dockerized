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

import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpXhrBackend} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {TabService} from '../../core/tab.service';
import {AppContextService} from '../../core/app-context.service';

@Injectable({
  providedIn: 'root'
})
export class ViewExecutionService {

  private loggerInitialized = false;

  constructor(private tabService: TabService,
              private appContextService: AppContextService) {

  }

  executeView(editorContent: string, debuggerEnabled: boolean) {
    this.prepareViewApi();

    this.initializeLogger(this.loggerInitialized);

    // execute view
    const ctx = {vars: {}};
    this.tabService.getActiveTab().editor.viewExecutionParameters.forEach((val, name) => {
      ctx.vars[name] = val;
    });

    if (Object.keys(ctx.vars).some(prop => !ctx.vars[prop])) {
      console.warn(`Not all parameter values were set`);
    }

    let viewScript = editorContent;

    const functionNames = this.getFunctionNames(viewScript);

    if (debuggerEnabled) {
      viewScript = viewScript.substring(0, viewScript.indexOf('{') + 1) + '\ndebugger;' + viewScript.substring(viewScript.indexOf('{') + 1);
    }

    viewScript = viewScript.substring(0, viewScript.indexOf('function')) + '\nasync ' + viewScript.substring(viewScript.indexOf('function'));
    viewScript = this.makeFunctionCallsAwait(viewScript, functionNames);

    try {
      /* tslint:disable:no-eval */
      eval(
        'async function resultWrapperFunction() {' +
        '\n \n\/\/View code start\n' +
        viewScript +
        '\n\/\/View code end\n\n ' +
        'var viewResult = await compute(' + JSON.stringify(ctx) + ', null);\n ' +
        'console.log(\'View result: \', viewResult);\n ' +
        'window[\'Ehr\'] = undefined;\n}\n' +
        'resultWrapperFunction();'
      );
    } catch (err) {
      console.error(err);
    }
  }

  resetLogger() {
    this.loggerInitialized = false;
  }

  private prepareViewApi() {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Basic ${this.appContextService.getToken()}`);
    window['Ehr'] = EhrViewApi;
    window['Ehr'].httpHeaders = headers;
    window['Ehr'].domainUrl = this.appContextService.getRestUrl();
  }

  private makeFunctionCallsAwait(editorContent: string, functionNames: string[]) {
    return editorContent.replace(/Ehr.allhash/g, 'await Ehr.allhash');
  }

  private getFunctionNames(viewScript: string): string[] {
    return viewScript.match(/function\s+[A-aZ-z]+\s*\(/g)
      .map(match => {
        const removedFunction = match.replace('function', '');
        return removedFunction.substring(0, removedFunction.length - 1).trim();
      });
  }

  private initializeLogger(loggerRegistered: boolean) {
    const logDiv = document.getElementById('js-console-wrapper');

    if (loggerRegistered) {
      logDiv.innerHTML = '';
      return;
    }

    ['log', 'debug', 'info', 'warn', 'error'].forEach(function (verb) {
      console[verb] = (function (method, givenVerb, logDivEl) {
        return function () {
          method.apply(console, arguments);
          const codeWrapper = document.createElement('div');
          codeWrapper.classList.add('code-wrapper');
          const msg = document.createElement('code');
          const br = document.createElement('br');
          const val = Array.prototype.slice.call(arguments);
          msg.classList.add(givenVerb);
          msg.textContent = givenVerb + ': ' + val.map(v => ' ' + JSON.stringify(v, null, 2));
          if (logDivEl) {
            codeWrapper.append(msg);
            logDivEl.append(codeWrapper);
            logDivEl.append(br);
          }
        };
      })(console[verb].bind(console), verb, logDiv);
    });

    // catch unhandled errors
    window.addEventListener('unhandledrejection', function (e) {
      console.error('Error occurred: ' + e.reason.message);
    });

    this.loggerInitialized = true;
  }

}

class EhrViewApi {
  static httpHeaders: HttpHeaders;
  static domainUrl: string;

  static query(params: QueryParams) {

    const httpClient = new HttpClient(new HttpXhrBackend({build: () => new XMLHttpRequest()}));

    const aqlRequest = {
      aql: params.aql,
      aqlParameters: params.params
    };

    return httpClient.post(`${this.domainUrl}/query`, aqlRequest , {headers: this.httpHeaders})
      .pipe(
        map(resultSet => {
          if (!resultSet) {
            return of([]).toPromise();
          }

          const result = resultSet['resultSet'];
          const data = result.length === 1 ? result[0] : result;
          const value = params.initvalue;
          if (!params.callback) {
            return data;
          }

          if (value) {
            if (Array.isArray(data)) {
              data.forEach(dataRow => params.callback(value, dataRow));
            } else {
              params.callback(value, data);
            }
          } else {
            console.error('Initial value was not defined, please provide initial value.');
            return [];
          }

          return value;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return of([]).toPromise();
        })
      ).toPromise();
  }

  static async allhash(promises: {[key: string]: any}, callback: Function) {
    const calls = [];
    const result = {};
    Object.keys(promises).forEach(p => {
      calls.push(promises[p]);
    });

    const allSettled = await Promise.all(calls);

    allSettled.forEach((d, index) => {
      result[Object.keys(promises)[index]] = d;
    });
    callback(result);
  }
}

interface QueryParams {
  aql?: string;
  params?: any;
  initvalue?: any;
  callback: Function;
}
