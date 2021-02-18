# Aql result table

AQL result table is a UI component written in Angular (10+) which provides logic for presenting data from AQL query response in a human-readable format.

## Using library

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

## Development

### Code scaffolding

Run `ng generate component component-name --project aql-result-table` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project aql-result-table`.
> Note: Don't forget to add `--project aql-result-table` or else it will be added to the default project in your `angular.json` file. 

### Build

Run `ng build aql-result-table` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test aql-result-table` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
