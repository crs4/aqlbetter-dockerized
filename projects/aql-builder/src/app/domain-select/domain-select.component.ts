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

import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AppContextService} from '../core/app-context.service';
import {Router} from '@angular/router';
import {AppRoutes} from '../app-routes';
import {environment} from '../../environments/environment';
import {AuthType, GrantType} from '../shared/models/app.model';
import {HttpHeaders} from '@angular/common/http';
import {catchError, finalize, take, tap} from 'rxjs/operators';
import {EMPTY, Observable} from 'rxjs';
import {AuthHelperService} from '../core/auth-helper.service';

@Component({
  selector: 'aql-domain-select',
  templateUrl: './domain-select.component.html',
  styleUrls: ['./domain-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DomainSelectComponent implements OnInit {
  contextGroup = this.fb.group({
    resourceUrl: [null, Validators.required],
    username: [null, Validators.required],
    password: [null, Validators.required],
    clientSecret: null
  });
  showClientSecret = false;
  requestInProgress = false;
  errorMessage: string;
  private authType: AuthType;

  constructor(private appContextService: AppContextService,
              private fb: FormBuilder,
              private router: Router,
              private authHelperService: AuthHelperService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.authType = environment.auth.type;

    if (this.authType === AuthType.BASIC) {
      this.initBasicAuth();
    } else {
      this.initOauth();
    }
  }

  setAppContext() {
    this.errorMessage = null;
    this.requestInProgress = true;

    const call: Observable<unknown> = this.authType === AuthType.BASIC ? this.setBasicContext() : this.setOauthContext();
    call.subscribe(() => this.router.navigate([AppRoutes.AQL_BUILDER]));
  }

  private initBasicAuth() {
    const {username, password} = this.appContextService.getCredentials();
    //console.log('initbasicAuth');
    //console.log(username);
    //console.log(password);
    const resourceUrl = this.appContextService.getResourceUrl() ?? null;
    //console.log(resourceUrl);
    if (!resourceUrl && !username && !password) {
      return;
    }
    this.contextGroup.setValue({
      resourceUrl,
      username,
      password
    });
  }

  private initOauth() {
    //this.showClientSecret = environment.auth?.grant_type === GrantType.clientSecret;
    this.showClientSecret = environment.auth?.grant_type === GrantType.password;
  }

  private setOauthContext(): Observable<unknown> {
    const {resourceUrl, username, password, clientSecret} = this.contextGroup.getRawValue();
    const {authorizationUrl, client_id, grant_type} = environment.auth;

    const payload: any = {client_id, grant_type, password, username};
    //if (grant_type === GrantType.clientSecret) {
    if (grant_type === GrantType.password) {
      payload.client_secret = clientSecret;
    }

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const body = this.authHelperService.createUrlEncodedBody(payload);
    return this.authHelperService.getHttpClient()
      .post(authorizationUrl, body, {headers})
      .pipe(
        //take(1),
        tap((res: any) => this.appContextService.setContext(resourceUrl, res?.access_token, res?.refresh_token)),
        catchError(e => this.handleErrorResponse(e)),
        finalize(() => {
          this.requestInProgress = false;
          this.cd.detectChanges();
        })
      );
  }

  // private setBasicContext(): Observable<unknown> {
  //   const {resourceUrl, username, password} = this.contextGroup.getRawValue();
  //   const token = btoa(username + ':' + password);
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Authorization', `Basic ${token}`);
  //   return this.authHelperService.getHttpClient()
  //     .head(`${this.sanitizeUrl(resourceUrl)}/rest/openehr/v1/definition/template/adl1.4`, {headers})
  //     .pipe(
  //       take(1),
  //       tap(() => this.appContextService.setContext(resourceUrl, token)),
  //       catchError(e => this.handleErrorResponse(e)),
  //       finalize(() => {
  //         this.requestInProgress = false;
  //         this.cd.detectChanges();
  //       })
  //     );
  // }

  private setBasicContext(): Observable<unknown> {
    const {resourceUrl, username, password} = this.contextGroup.getRawValue();
    const token = btoa(username + ':' + password);
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Basic ${token}`);
    return this.authHelperService.getHttpClient()
      .head(`${this.sanitizeUrl(resourceUrl)}/rest/openehr/v1/definition/template/adl1.4`, {headers})
      .pipe(
        take(1),
        tap(() => this.appContextService.setContext(resourceUrl, token)),
        catchError(e => this.handleErrorResponse(e)),
        finalize(() => {
          this.requestInProgress = false;
          this.cd.detectChanges();
        })
      );

      // return this.authHelperService.getHttpClient()
      // .head(`/api/ehrbase/rest/openehr/v1/definition/template/adl1.4`, {headers})
      // .pipe(
      //   take(1),
      //   tap(() => this.appContextService.setContext(resourceUrl, token)),
      //   catchError(e => this.handleErrorResponse(e)),
      //   finalize(() => {
      //     this.requestInProgress = false;
      //     this.cd.detectChanges();
      //   })
      // );


  }


  private sanitizeUrl(url: string): string {
    return url.replace(/(?:(?:\/admin)(?:\/rest)?( ?:\/v1)?|(?:\/adminconsole)(?:\/stats)?)(?:\/)?$/, '');
  }

  private handleErrorResponse(e) {
    if (e.status === 401) {
      this.errorMessage = 'ERRORS.UNAUTHORIZED';
    } else {
      this.errorMessage = e.error?.message || e.message || 'ERROR.PLATFORM_UNREACHABLE';
    }
    return EMPTY;
  }
}
