# Better UI components

![Lint all packages](https://github.com/better-care/better-ui-components/workflows/Lint%20all%20packages/badge.svg)
![Test all packages](https://github.com/better-care/better-ui-components/workflows/Test%20all%20packages/badge.svg)

**Better UI Components** is an Angular UI workspace consisting of libraries and tools to easily adopt openEHR concepts to your own projects. 

It is based on Angular(10+) framework.

## Using the libraries

### AQL result table

To install this library run:

```
npm install @better/aql-result-table
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

#Contributing

See our [CONTRIBUTING.md](/CONTRIBUTING.md) guide

#Licence

Feel free to use our library in your commercial and private applications

All Better UI component packages are covered by [Apache 2.0](/LICENSE)

Read more about this license [here](https://choosealicense.com/licenses/apache-2.0/)
