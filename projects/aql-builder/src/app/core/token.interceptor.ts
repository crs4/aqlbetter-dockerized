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
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {EMPTY, Observable, throwError} from 'rxjs';
import {AppContextService} from './app-context.service';
import {environment} from '../../environments/environment';
import {AuthType} from '../shared/models/app.model';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {AuthHelperService} from './auth-helper.service';
import {StorageService} from './storage.service';
import {Router} from '@angular/router';
import {AppRoutes} from '../app-routes';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  authType: AuthType;
  constructor(private appContextService: AppContextService,
              private authHelperService: AuthHelperService,
              private storageService: StorageService,
              private router: Router) {
    this.authType = environment.auth.type;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(this.updateHeaders(req))
        .pipe(catchError((e) => {
            if (this.isBasicAuth()) {
              //console.log('inside intercept');
              //console.log('req',req);
              return throwError(e);
            }

            if (e.status === 401 && this.isLoggedIn()) {
              return this.refreshToken(req, next);
            }
          }));
  }

  private updateHeaders(req: HttpRequest<any>): HttpRequest<any> {
    const token = this.appContextService.getToken();
    let auth;
    //console.log('inside updateHeaders',token)
    if (this.authType === AuthType.BASIC) {
      auth = `Basic ${token}`;
      //console.log('auth',auth);
    } else {
      auth = `Bearer ${token}`;
    }
    return req.clone({setHeaders: {Authorization: auth}});
  }

  private refreshToken(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const payload = this.authHelperService.getRefreshPayload();
    const headers = this.authHelperService.getUrlEncodedHeaders();
    return this.authHelperService.getHttpClient()
      .post(environment.auth.authorizationUrl, payload, {headers})
      .pipe(
        tap((res: any) => {
          this.appContextService.setToken(res.access_token);
          if (res?.refresh_token) {
            this.appContextService.setRefreshToken(res?.refresh_token);
          }
        }),
        switchMap(() => next.handle(this.updateHeaders(req))),
        catchError(() => {
          this.logout();
          return EMPTY;
        })
      );

  }

  private isBasicAuth(): boolean {
    return this.authType === AuthType.BASIC;
  }

  private isLoggedIn(): boolean {
    return !!this.appContextService.getToken();
  }

  private logout() {
    this.appContextService.clear();
    this.storageService.clear();
    this.router.navigate([AppRoutes.DOMAIN_SELECT]);
  }
}
