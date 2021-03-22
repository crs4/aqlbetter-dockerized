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

import {AuthContext, AuthType, GrantType} from '../app/shared/models/app.model';

const auth: AuthContext = {
    type: AuthType.OAUTH,
    authorizationUrl: '',
    client_id: '',
    grant_type: GrantType.password,
};

export const environment = {
  production: true,
  auth
};
