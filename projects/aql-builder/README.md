# AQL Builder

AQL builder is standalone full-featured application written in Angular (10+) for writing, executing [AQL queries](https://specifications.openehr.org/releases/QUERY/latest/AQL.html) for clinical data and outputting results.

### Features:
* AQL specific code hints and autocompletion
* code beautification
* structured (compact or detailed) result view
* export results in CSV, XML or JSON formats
* support for executing and displaying EHR Views and JS Views
* result pagination
* multiple query tabs
* saving snippets (browser local storage) and views
* query history (browser local storage)

#
## Build


Build the application by running `ng build aql-builder --prod`. For deploying on a specific base href use the flag `--base-href=/MY_BASE_HREF/`


## Build using OAuth2 settings

Setting up OAuth2 requires an additional step of configuring the oauth environment file `environment.prod.oauth.ts` before building the application:

```typescript
const auth: AuthContext = {
    type: AuthType.OAUTH,
    authorizationUrl: 'https://my-auth.server/oidc/token',
    client_id: 'my-client-id',
    grant_type: GrantType.password
};

export const environment = {
  production: true,
  auth
};
```


After entering all the required settings in the environment, the application can be built by running the build command with the `--configuration` flag:

`ng build aql-builder --prod --base-href=/MY_BASE_HREF/ --configuration=production-oauth`


## Deployment
The build artifacts will be stored in the `dist/aql-builder` directory and can be deployed to a server as static files.

#
# Using the Application

Once the application is up and running all that is needed to start using the editor is the Platform URL and credentials for the Platform.

>The Platform URL should be formatted without the /rest/v1 or /admin/rest/v1 endpoints:

> https://my-openehr-server.com/ehr



Changing to another platform URL can be done by returning to the Platform setup screen by clicking on the blue `Q` icon on the top left of the screen.

The platform URL and credentials are stored in the browsers local storage. The logout icon is in the lower left corner of the screen.
> Note: Logging out of the builder clears the local storage and will erase all the data - snippets, history and open tabs.

#
# Development

### Serve

Run `ng serve aql-builder` to run the application in a local development server

### Code scaffolding

Run `ng generate component component-name --project aql-builder` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project aql-builder`.
> Note: Don't forget to add `--project aql-builder` or else it will be added to the default project in your `angular.json` file.


### Running unit tests

Run `ng test aql-builder` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

