Y7# AQL BUILDER WRITTEN BY BETTER AND ADAPTED BY SASURFER (@GITHUB). DOCKERIZED VERSION
 This sofware helps in building openEHR aql queries. It needs a running instance of EHRBase in order to work. Its main capabilities are: creating the query with autocompletion and template visualization, saving queries on the running instance of EHRBase (called views) or locally (called snippets), performing queries, retrieving and showing the results, importing (writing into EHRBase) templates. More info at [aql builder site]( https://docs.better.care/studio/aql-builder/overview ).

At login are asked: Username, Password. If oauth is configured (see below on how to do it) then the client_secret is also requested. 

NOTE: It is necessary to login with the EHRBase admin credentials to let all template and views methods work as intended.

Example of values for the default credentials:
- Username: ehrbase-admin
- Password: EvenMoreSecretPassword

The dockerized version proxy the calls from nodejs to EHRBase via an instance of nginx. 

## RUN WITH BASIC AUTH
It uses the file docker-compose.yml (copy of docker-compose-basic.yml). Some configuration must be filled before the container creation.

### EHRBASE CONFIGURATION
This is an example of .env.ehrbase (read by docker compose yaml):
```
SERVER_NODENAME=local.ehrbase.org
SECURITY_AUTHTYPE=BASIC
SECURITY_AUTHUSER=ehrbase-user
SECURITY_AUTHPASSWORD=SuperSecretPassword
SECURITY_AUTHADMINUSER=ehrbase-admin
SECURITY_AUTHADMINPASSWORD=EvenMoreSecretPassword
SECURITY_OAUTH2USERROLE=USER
SECURITY_OAUTH2ADMINROLE=ADMIN
SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_ISSUERURI=
MANAGEMENT_ENDPOINTS_WEB_EXPOSURE=env,health,info,metrics,prometheus
MANAGEMENT_ENDPOINTS_WEB_BASEPATH=/management
MANAGEMENT_ENDPOINT_ENV_ENABLED=true
MANAGEMENT_ENDPOINT_HEALTH_ENABLED=true
MANAGEMENT_ENDPOINT_HEALTH_DATASOURCE_ENABLED=true
MANAGEMENT_ENDPOINT_INFO_ENABLED=true
MANAGEMENT_ENDPOINT_METRICS_ENABLED=true
MANAGEMENT_ENDPOINT_PROMETHEUS_ENABLED=FALSE
MANAGEMENT_ENDPOINT_HEALTH_PROBES_ENABLED=true
MANAGEMENT_ENDPOINT_ENV_SHOWVALUES=ALWAYS
SYSTEM_ALLOW_TEMPLATE_OVERWRITE=true
ADMIN_API_ACTIVE=true
CACHE_ENABLED=true
ADMINAPI_ALLOWDELETEALL=true
WEB_CORS_ALLOWEDORIGINS=http://localhost
WEB_CORS_ALLOWEDORIGINPATTERNS=http://*.localhost
WEB_CORS_ALLOWEDMETHODS=GET,PUT,DELETE,POST,OPTIONS,HEAD
WEB_CORS_ALLOWCREDENTIALS=true
WEB_CORS_ALLOWEDHEADERS=*
```
and the related docker-compose.yml:
```
version: '3'

#
# Minimal setup for a running EHRbase. Contains the server component as well as the required postgres instance.
#
services:

  #
  # EHRBase container. see `.env.ehrbase` for configuration details.
  #
  ehrbase:
    image: ${EHRBASE_IMAGE:-ehrbase/ehrbase:2.6.0}
    env_file:
      - .env.ehrbase
    environment:
      DB_URL: jdbc:postgresql://ehrdb:5432/ehrbase
      DB_USER_ADMIN: ehrbase
      DB_PASS_ADMIN: ehrbase
      DB_USER: ehrbase_restricted
      DB_PASS: ehrbase_restricted
    links:
      - ehrdb
    depends_on:
      ehrdb:
        condition: service_healthy
    ports:
      - "8080:8080"
    networks:
      - ehrbase-net

  #
  # Pre-configured ehrbase postgres.
  #
  ehrdb:
    image: ${EHRBASE_POSTGRES_IMAGE:-ehrbase/ehrbase-v2-postgres:16.2}
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      EHRBASE_USER_ADMIN: ehrbase
      EHRBASE_PASSWORD_ADMIN: ehrbase
      EHRBASE_USER: ehrbase_restricted
      EHRBASE_PASSWORD: ehrbase_restricted
    healthcheck:
      test: [ "CMD-SHELL", "pg_isready -U postgres" ]
      interval: 5s
      timeout: 5s
      retries: 12
    ports:
      - "5432:5432"
    networks:
      - ehrbase-net
    volumes:
      - ./.pgdata:/var/lib/postgresql/data      
networks:
  ehrbase-net: { }

```
Start the services:
```
docker compose up 
```
### NGINX CONFIGURATION
In the directory of aqlbetter-dockerized edit the file {path_to_aqlbetter-dockerized}/nginx/nginx.conf

- In 'proxy_pass http://host.docker.internal:8080' replace, if necessary, "host.docker.internal:8080" with your ehrbaseEHRBase server address and port. This is the address where the server can reached from the aqlbetter container.
- in 'proxy_set_header Host localhost:8080' replace localhost:8080 with your EHRBase server address and port. This is the address where the server can be reached from the docker host. 

Note: host.docker.internal links the docker container to the docker host.

### RUN
Run from the aqlbetter-dockerized directory with:
```
docker compose up --build
```
The option "--build" is needed only the first time it is created then can be omitted.

Open a browser tab to localhost, fill the credentials and click "Start querying data".

## OAUTH2
### EXAMPLE OF EHRBASE CONFIGURATION
Create a directory for EHRBase and copy the following two files.

This is an example of .env.ehrbase (read by docker compose yaml):
```
SERVER_NODENAME=local.ehrbase.org
SECURITY_AUTHTYPE=OAUTH
SECURITY_AUTHUSER=ehrbase-user
SECURITY_AUTHPASSWORD=SuperSecretPassword
SECURITY_AUTHADMINUSER=ehrbase-admin
SECURITY_AUTHADMINPASSWORD=EvenMoreSecretPassword
SECURITY_OAUTH2USERROLE=USER
SECURITY_OAUTH2ADMINROLE=ADMIN
SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_ISSUERURI=http://172.31.0.2:8080/auth/realms/ehrbase
MANAGEMENT_ENDPOINTS_WEB_EXPOSURE=env,health,info,metrics,prometheus
MANAGEMENT_ENDPOINTS_WEB_BASEPATH=/management
MANAGEMENT_ENDPOINT_ENV_ENABLED=true
MANAGEMENT_ENDPOINT_HEALTH_ENABLED=true
MANAGEMENT_ENDPOINT_HEALTH_DATASOURCE_ENABLED=true
MANAGEMENT_ENDPOINT_INFO_ENABLED=true
MANAGEMENT_ENDPOINT_METRICS_ENABLED=true
MANAGEMENT_ENDPOINT_PROMETHEUS_ENABLED=FALSE
MANAGEMENT_ENDPOINT_HEALTH_PROBES_ENABLED=true
MANAGEMENT_ENDPOINT_ENV_SHOWVALUES=ALWAYS
SYSTEM_ALLOW_TEMPLATE_OVERWRITE=true
ADMIN_API_ACTIVE=true
CACHE_ENABLED=true
ADMINAPI_ALLOWDELETEALL=true
WEB_CORS_ALLOWEDORIGINS=http://localhost
WEB_CORS_ALLOWEDORIGINPATTERNS=http://*.localhost
WEB_CORS_ALLOWEDMETHODS=GET,PUT,DELETE,POST,OPTIONS,HEAD
WEB_CORS_ALLOWCREDENTIALS=true
WEB_CORS_ALLOWEDHEADERS=*
```
and the docker-compose.yml:
```
version: '3'

#
# Minimal setup for a running EHRbase. Contains the server component as well as the required postgres instance.
#
services:

  #
  # EHRBase container. see `.env.ehrbase` for configuration details.
  #
  version: '3'

#
# Minimal setup for a running EHRbase. Contains the server component as well as the required postgres instance.
#
services:

  #
  # EHRBase container. see `.env.ehrbase` for configuration details.
  #
  ehrbase:
    image: ${EHRBASE_IMAGE:-ehrbase/ehrbase:2.6.0}
    env_file:
      - .env.ehrbase
    environment:
      DB_URL: jdbc:postgresql://ehrdb:5432/ehrbase
      DB_USER_ADMIN: ehrbase
      DB_PASS_ADMIN: ehrbase
      DB_USER: ehrbase_restricted
      DB_PASS: ehrbase_restricted
    links:
      - ehrdb
      - keycloak4
    depends_on:
      ehrdb:
        condition: service_healthy
      keycloak4:
        condition: service_started
    ports:
      - "8080:8080"
    networks:
      - ehrbase-net
#
  # Pre-configured ehrbase postgres.
  #
  ehrdb:
    image: ${EHRBASE_POSTGRES_IMAGE:-ehrbase/ehrbase-v2-postgres:16.2}
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      EHRBASE_USER_ADMIN: ehrbase
      EHRBASE_PASSWORD_ADMIN: ehrbase
      EHRBASE_USER: ehrbase_restricted
      EHRBASE_PASSWORD: ehrbase_restricted
    healthcheck:
      test: [ "CMD-SHELL", "pg_isready -U postgres" ]
      interval: 5s
      timeout: 5s
      retries: 12
    ports:
      - "5432:5432"
    networks:
      - ehrbase-net
    volumes:
      - ./.pgdata:/var/lib/postgresql/data      

  keycloak4:
    image: quay.io/keycloak/keycloak:24.0.3
    #image: registry.vitasystems.dev/docker-registry/keycloak-x:0.9.9
    container_name: keycloak4
    command: "start-dev --import-realm"
    ports:
      - "8081:8080"
    ports:
      - "5432:5432"
    networks:
      - ehrbase-net
    volumes:
      - ./.pgdata:/var/lib/postgresql/data      

  keycloak4:
    image: quay.io/keycloak/keycloak:24.0.3
    #image: registry.vitasystems.dev/docker-registry/keycloak-x:0.9.9
    container_name: keycloak4
    command: "start-dev --import-realm"
    ports:
      - "8081:8080"
    environment:
      KEYCLOAK_ADMIN: admin
      KEYCLOAK_ADMIN_PASSWORD: admin
      KC_HTTP_RELATIVE_PATH: /auth
      KC_HTTP_PORT: 8080
    volumes:
      - ./tests/keycloak/import:/opt/keycloak/data/import
    networks:
            ehrbase-net:
              ipv4_address: 172.31.0.2
networks:
  ehrbase-net:
    driver: bridge
    ipam:
        config:
          - subnet: 172.31.0.0/16 
            gateway: 172.31.0.1
            ip_range: 172.31.0.1/15

```
from the latest https://github.com/ehrbase/ehrbase.git copy the path to the file (included) tests/keycloak/import/ehrbase-realm-exported.json to this directory.

Modify the SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_ISSUERURI server and port with your keycloak ip and port, if necessary. 

Start the services:
```
docker compose up 
```

### AQLBETTER CONFIGURATION
Edit {aqlbetter_dir}/projects/aql-builder/src/environments/environment.prod.ts.OAUTH2 and modify the authorizationUrl according to your installation of keycloak. Remember that the address (server:port) must be the same as the one given in SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_ISSUERURI in the EHRBase settings (172.31.0.2:8080 in the example).

### KEYCLOAK
Open a browser tab to localhost:8081 and login to keycloak (admin/admin). Create, inside the realm ehrbase, a client named aqlbetter with client_id=aqlbetter, the urls set to "http://localhost" and Authentication and OAuth 2.0 Device Authorization Grant flagged on, choose client_id and client_secret as credentials and copy the newly created client_secret. Reset the ehrbase-admin password and copy it. client_secret and password for ehrbase-admin will be needed for the login form. 

### NGINX CONFIGURATION
In the directory of aqlbetter-dockerized edit the file {path_to_aqlbetter-dockerized}/nginx/nginx.conf

- In "proxy_pass http://host.docker.internal:8080" replace, if necessary, "host.docker.internal:8080" with your EHRBase server address and port. This is the address where the server can reached from the aqlbetter container.
- in 'proxy_set_header Host localhost:8080' replace localhost:8080 with your EHRBase server address and port. This is the address where the server can be reached from the docker host. 

Note: host.docker.internal links the docker container to the docker host.

Note2: If you are following this example and have used the docker compose file given you don't need to change address and port.

### RUN
Run from the aqlbetter-dockerized directory with:
```
docker compose -f docker-compose-oauth2.yml up --build
```
The option "--build" is needed only the first time it is created then can be omitted.

Open a browser tab to localhost, fill the credentials and the client_secret and click "Start querying data".


# ORIGINAL README FROM BETTER FOLLOWS

# Better UI components

![Lint all packages](https://github.com/better-care/better-ui-components/workflows/Lint%20all%20packages/badge.svg)
![Test all packages](https://github.com/better-care/better-ui-components/workflows/Test%20all%20packages/badge.svg)

**Better UI Components** is an Angular UI workspace consisting of libraries and tools to easily adopt openEHR concepts to your own projects. 

It is based on Angular(10+) framework.

## Using the libraries

### AQL Builder

AQL builder is standalone full-featured application written in Angular (10+) for writing, executing [AQL queries](https://specifications.openehr.org/releases/QUERY/latest/AQL.html) for clinical data and outputting results.

For detailed instructions on setting up and using the application see the AQL Builder [README.md](/projects/aql-builder/README.md)

### AQL result table

To install this library run:

```
npm install @bettercare/aql-result-table
```

Once you have installed the library, include library to your project module:

```typescript
 @NgModule({
   imports: [
     ...
     AqlResultTableModule
   ],
   bootstrap: [AppComponent]
 })
 
 export class AppModule {
 }
```

Then you can simply use it in your component `html` and provide input data:

```html
<bui-aql-result-table
    [aqlResultMetadata]="aqlResultMetadata"
    [tablePresentation]="tablePresentation">
</bui-aql-result-table>
```

_* `tablePresentation` input is optional and is by default set to `COMPACT` view_

#### Input models
```typescript
class AqlResultMetadata {
  aql?: string;
  executedAql: string;
  meta?: {href: string};
  resultSet: unknown[] = [];
}

enum TablePresentation {
  DETAILED = 'DETAILED',
  COMPACT = 'COMPACT'
}
```

## Trying out demo app

Simply run dev server `ng serve` and you are good to go.

### Specifying server

If you have access to EHR platform, you can also specify platform url and credentials in `AppComponent`.

```typescript
  serverConfig = {
    url: undefined, // 'https://MY-EHR-PLATFORM/rest/v1/query',
    username: undefined, // 'MY_USERNAME',
    pwd: undefined, // 'MY_PWD'
  };
```

In this case you will be able to write and execute your custom AQLs. Results will be immediately shown in the table. 

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Contributing

See our [CONTRIBUTING.md](/CONTRIBUTING.md) guide

## Licence

Feel free to use our library in your commercial and private applications

All Better UI component packages are covered by [Apache 2.0](/LICENSE)

Read more about this license [here](https://choosealicense.com/licenses/apache-2.0/)

# Acknowledgments
This work has been partially funded by the following sources:
<li> the “Total Patient Management” (ToPMa) project (grant by the Sardinian Regional Aut
hority, grant number RC_CRP_077);
<li>the “Processing, Analysis, Exploration, and Sharing of Big and/or Complex Data” (XDATA) project (grant by the Sardinian Regional Authority). 

