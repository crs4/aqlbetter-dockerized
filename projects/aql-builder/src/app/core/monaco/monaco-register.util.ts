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

import {Subject} from 'rxjs';
import {conf, language} from './monaco.config';
import {AqlLangKeyword} from '../../aql-builder/monaco/monaco-aql.model';
import {getFullSelections} from '@better-ui';

export class MonacoRegisterUtil {
  static monacoLoaded = new Subject<boolean>();

  static newLineKeywords = [
    AqlLangKeyword.CONTAINS,
    AqlLangKeyword.FROM,
    AqlLangKeyword.WHERE,
    AqlLangKeyword.FETCH,
    AqlLangKeyword.OFFSET,
    AqlLangKeyword.AND,
    AqlLangKeyword.ORDER_BY,
    AqlLangKeyword.LIMIT,
  ];

  static registerLanguage(): boolean {
    const monaco = (window as any).monaco;
    if (!monaco.languages.getLanguages().some(lang => lang.id === 'aql')) {
      monaco.languages.register({id: 'aql'});
      monaco.languages.setMonarchTokensProvider('aql', language);
      monaco.languages.setLanguageConfiguration('aql', conf);
      monaco.languages.registerDocumentFormattingEditProvider('aql', this.getAqlFormatterProvider());
      return true;
    }
    return false;
  }

  static notifyLoaded() {
    MonacoRegisterUtil.monacoLoaded.next(true);
  }

  static registerTheme() {
    monaco.editor.defineTheme('m-monaco-theme', {
      base: 'vs',
      inherit: true,
      rules: [
        {token: 'keyword', foreground: '9745F4'},
        {token: 'comment', foreground: 'B2B3B7'},
        {token: 'number', foreground: '3BA239'},
        {token: 'string', foreground: '3BA239'},
        {token: 'identifier.quote', foreground: '3BA239'},
        {token: 'predefined', foreground: 'F3AB56', fontStyle: 'italic'},
        {token: 'operator', foreground: '0C58FB', fontStyle: 'italic'},
        {token: 'sign-operators', foreground: 'ABB0B6', fontStyle: 'italic'},
        {token: 'aql.identifier', foreground: '4278EF'},
        {token: 'aql.path', foreground: '383A42'},
        {token: 'aql.path.short', foreground: '383A42', fontStyle: 'bold'},
        {token: 'aql.path.variable', foreground: 'E03F3C', fontStyle: 'bold'}
      ],
      colors: {}
    });
  }

  static showAutocompletion(obj) {
    // Disable default autocompletion for javascript
    // monaco.languages.typescript.javascriptDefaults.setCompilerOptions({ noLib: true  });
    const monaco = window['monaco'];

    // Helper function to return the monaco completion item type of a thing
    function getType(thing, isMember) {
      isMember = (isMember === undefined) ? (typeof isMember === 'boolean') ? isMember : false : false; // Give isMember a
                                                                                                        // default value of
                                                                                                        // false
      switch ((typeof thing).toLowerCase()) {
        case 'object':
          return monaco.languages.CompletionItemKind.Class;

        case 'function':
          return (isMember) ? monaco.languages.CompletionItemKind.Method : monaco.languages.CompletionItemKind.Function;

        default:
          return (isMember) ? monaco.languages.CompletionItemKind.Property : monaco.languages.CompletionItemKind.Variable;
      }
    }

    // Register object that will return autocomplete items
    monaco.languages.registerCompletionItemProvider('javascript', {
      // Run this function when the period or open parenthesis is typed (and anything after a space)
      triggerCharacters: ['.', '('],

      // Function to generate autocompletion results
      // tslint:disable-next-line:object-literal-shorthand
      provideCompletionItems: function (model, position, token) {
        // Split everything the user has typed on the current line up at each space, and only look at the last word
        const last_chars = model.getValueInRange(
          {
            startLineNumber: position.lineNumber,
            startColumn: 0,
            endLineNumber: position.lineNumber,
            endColumn: position.column
          }
        );
        const words = last_chars.replace('\t', '').split(' ');
        const active_typing = words[words.length - 1]; // What the user is currently typing (everything after the last space)

        // If the last character typed is a period then we need to look at member objects of the obj object
        const is_member = active_typing.charAt(active_typing.length - 1) === '.';

        // Array of autocompletion results
        const result = [];

        // Used for generic handling between member and non-member objects
        let last_token = obj;
        let prefix = '';

        if (is_member) {
          // Is a member, get a list of all members, and the prefix
          const parents = active_typing.substring(0, active_typing.length - 1).split('.');
          last_token = obj[parents[0]];
          prefix = parents[0];

          // Loop through all the parents the current one will have (to generate prefix)
          for (let i = 1; i < parents.length; i++) {
            if (last_token.hasOwnProperty(parents[i])) {
              prefix += '.' + parents[i];
              last_token = last_token[parents[i]];
            } else {
              // Not valid
              return {suggestions: result};
            }
          }

          prefix += '.';
        }

        // Get all the child properties of the last token
        for (const prop in last_token) {
          // Do not show properites that begin with "__"
          if (last_token.hasOwnProperty(prop) && !prop.startsWith('_')) {
            // Get the detail type (try-catch) incase object does not have prototype
            let details = '';
            try {
              details = last_token[prop].__proto__.constructor.name;
            } catch (e) {
              details = typeof last_token[prop];
            }

            // Create completion object
            const to_push = {
              label: prefix + prop,
              kind: getType(last_token[prop], is_member),
              detail: details,
              insertText: prop
            };

            // Change insertText and documentation for functions
            if (to_push.detail.toLowerCase() === 'function') {
              to_push['detail'] = (last_token[prop].toString()).split('{')[0];
              to_push['documentation'] = MonacoRegisterUtil.getDoc(to_push.insertText); // Show function prototype in the documentation popup

              to_push.insertText += '(';
            }

            // Add to final results
            result.push(to_push);
          }
        }

        return {suggestions: result};
      }
    });
  }

  private static getDoc(name: string): IMarkdownString {

    const documentationMap = {
        getFieldValue:
          'Gets value of a field - usually this is only basic string. \n\n ' +
          'Returns nothing else but value. If there is no value you get _undefined_\n\n' +
          '_@param **tagOrPath**_ takes aqlPath, treePath or tag of a field \n\n' +
          '_@param **multiindex**_ multiplicity index - by default it is the first item\n\n' +
          '_@param **searchWithinContainerTag**_ optional',
        changeFieldType:
          'Some elements have many types available. You can change them by providing a different RmType \n\n' +
          '_@param **rmType**_ change type\n\n' +
          '_@param **tagOrPath**_ takes aqlPath, treePath or tag of a field \n\n' +
          '_@param **searchWithinContainerTag**_ optional',
        setFieldValue:
          'Set the value of the field. Works for simple inputs (boolean, string, number). ' +
          'If you have more complex field that has many inputs (DV_PROPORTION) you should use specific method like setProportionValue\n\n' +
          '_@param **tagOrPath**_ takes aqlPath, treePath or tag of a field \n\n' +
          '_@param **value**_ value of a field to set\n\n' +
          '_@param **multiIndex**_ set on which multiplicity value',
      }
    ;
    if (documentationMap[name] === undefined) {
      return {
        value: '',
        isTrusted: true
      };
    } else {
      return {
        value: documentationMap[name],
        isTrusted: true
      };
    }
  }

  private static getAqlFormatterProvider() {
    return {
      formatAql(value: any) {
      let selections = getFullSelections(value, false);
      const fromIndex = value.toUpperCase().indexOf(AqlLangKeyword.FROM);
      const lineStart = selections ? `${AqlLangKeyword.SELECT} ` : '';

      selections = selections ? selections : value;

      const formatSelections = lineStart +
        selections
          .filter(v => !!v.trim())
          .map(v => v.trim())
          .join(',\n' + this.getSelectIdent());

      const formatKeywords = (fromIndex > -1 ? value.substring(fromIndex) : '')
        .split('\n')
        .map(v => v.trim())
        .map(v => {
          let sanitizedValue = this.getSanitizedAqlValue(v);
          const newLineAqlKeywords = new Set(sanitizedValue.split(' ')
            .filter((word, index) => {
              const words = sanitizedValue.split(' ');
              const assembledWord = words[index] + '_' + words[index + 1];
              return MonacoRegisterUtil.newLineKeywords.includes(word) || MonacoRegisterUtil.newLineKeywords.includes(AqlLangKeyword[assembledWord]);
            }));

          newLineAqlKeywords.forEach(keyword => {
            sanitizedValue = this.getSanitizedAqlValue(v);
            const keywordIndexes = this.getIndexes(sanitizedValue, keyword);
            const items = [];
            let ident = '';
            if (keyword === AqlLangKeyword.AND || keyword === AqlLangKeyword.OR) {
              ident = '    ';
            }

            keywordIndexes.forEach((index, i) => {
              if (keywordIndexes[i + 1]) {
                if (keywordIndexes[i - 1]) {
                  items.push(ident + v.substring(index, keywordIndexes[i + 1]).trim());
                } else {
                  items.push(v.substring(0, index), ident + v.substring(index, keywordIndexes[i + 1]).trim());
                }
              } else {
                if (keywordIndexes[i - 1]) {
                  items.push(ident + v.substring(index, v.length).trim());
                } else {
                  items.push(v.substring(0, index), ident + v.substring(index, v.length).trim());
                }
              }
            });
            v = items.join('\n');
          });

          return v;
        }).join('');

      return formatSelections + formatKeywords;
      },
      getSelectIdent() {
        let ident = ' ';
        [...AqlLangKeyword.SELECT].forEach(_ => ident += ' ');
        return ident;
      },
      getIndexes(code: string, word: string): number[] {
        const regex = new RegExp(`\\b${word}\\b`, 'g');
        const indices: number[] = [];
        let result;
        // tslint:disable-next-line:no-conditional-assignment
        while ((result = regex.exec(code)) ) {
          indices.push(result.index);
        }

        return indices;
      },
      getSanitizedAqlValue(aql: string) {
        let sanitizedValue = aql;
        aql.match(/'.+?'/g)?.forEach(item => {
          const replacement = new Array(item.length).join('•');
          const toBeReplaced = new RegExp(`${item}`);
          sanitizedValue = sanitizedValue.replace(toBeReplaced, replacement).toUpperCase();
        });

        return sanitizedValue;
      },
      provideDocumentFormattingEdits(model, options, token) {
        return [{
          text: this.formatAql(model.getValue()),
          range: model.getFullModelRange()
        }];
      }
    };
  }
}

export interface IMarkdownString {
  value: string;
  isTrusted?: boolean;
}
