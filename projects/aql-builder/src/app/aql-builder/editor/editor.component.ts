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

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {EhrApiService} from '../../core/ehr-api.service';
import {EMPTY, Subject} from 'rxjs';
import {MonacoService} from '../monaco/monaco.service';
import {ValidationService} from '../monaco/validation.service';
import {catchError, takeUntil} from 'rxjs/operators';
import {CodeSnippetService} from '../../core/code-snippet.service';
import {ToastrWrapperService, ToastType} from '../../shared/toastr-wrapper.service';
import {AdditionalAqlAutocompleteKeyword} from '../monaco/monaco-aql.model';
import {MonacoRegisterUtil} from '../../core/monaco/monaco-register.util';
import {TabService} from '../../core/tab.service';
import {AqlResultSet} from '../../shared/models/result-set.model';
import {EditorData} from './editor-data.model';
import {Tab, TabType} from './tab.model';
import {ViewExecutionService} from './view-execution.service';
import {cloneDeep} from 'lodash';
import {EhrViewType} from '../../shared/models/ehr-view.model';
import {ToastContent} from '../../shared/models/app.model';
import {TablePresentation} from '../presentation/table-presentation/table-presentation.enum';
import {TablePresentationService} from '../presentation/table-presentation/table-presentation.service';
import {EditorMenuAction} from './editor-menu/editor-menu-action.enum';
import {SpinnerService} from '../../shared/spinner/spinner.service';
import {CodePresentation} from './code-presentation.enum';
import {StorageService} from '../../core/storage.service';
import {MonacoAutocompleteHelper} from '../monaco/monaco-autocomplete.helper';
import {CommonUtil} from '../../shared';
import IEditor = monaco.editor.IEditor;
import IDimension = monaco.editor.IDimension;

@Component({
  selector: 'aql-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent implements OnInit, OnChanges, OnDestroy {
  @Input() wasEditorResized: boolean;
  @Input() editorFlexHeight: number;
  @Input() isSidebarPanelOpen: boolean;
  @ViewChild('parametersTable') parametersTable: ElementRef;
  @ViewChild('monacoWrapper', {static: true}) monacoWrapper: ElementRef;
  @Output() resetResizeState: EventEmitter<void> = new EventEmitter<void>();

  AdditionalAqlAutocompleteKeyword = AdditionalAqlAutocompleteKeyword;
  codePresentation = CodePresentation.BEAUTIFY;
  tablePresentation: TablePresentation;
  EhrViewType = EhrViewType;
  TabType = TabType;

  editorOptions = {
    theme: 'm-monaco-theme',
    language: 'aql',
    wordBasedSuggestions: false,
    scrollBeyondLastLine: false,
    minimap: {
      enabled: false
    },
    quickSuggestionsDelay: 500
  };
  editorData: EditorData;
  tab: Tab;
  activeTabId: number;
  debuggerEnabled = false;
  code = '';
  isEditorHidden = false;
  parametersSize = {
    viewParams: 0,
    aqlParams: 0,
    viewExecParams: 0
  };


  private previousCodeState: {code: string, cursorPosition?: any};

  private unsubscribe: Subject<void> = new Subject<void>();
  private readonly invalidClass = 'invalid';
  private readonly  variableRegex = /((\s+|=\s*|{):([a-za-яA-ZA-Я0-9_](?!]))*($|\w))/g;
  private editor: IEditor;

  /**
   * .monaco-wrapper css class padding * 2 (top + bottom, left + right)
   * needed so that the editor does not overflow the container
   */
  private readonly monacoWrapperPadding = { y: 20, x: 10};

  @HostListener('document:keydown', ['$event']) onKeyDown(event) {
    /**
     * key-binding switch between simplify and plain: ALT + I
     */
    if (event.keyCode === 73 && event.altKey) {
      event.preventDefault();
      this.handleMenuAction(EditorMenuAction.SWITCH_CODE_PRESENTATION);
    }

    /**
     * key-binding Run Query: CTRL + ENTER
     */
    if (event.keyCode === 13 && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      const paramActiveEl = document.activeElement.classList.contains('param');
      if (paramActiveEl) {
        // remove focus from current active param element so that values are applied
        (document.activeElement as HTMLInputElement).blur();
      }
      // because of enter binding within monaco, we should just reset state of the code, without new line
      const isMonacoEditorFocused = document.querySelector('.monaco-editor.focused');
      if (isMonacoEditorFocused) {
        const cursorPosition = this.previousCodeState.cursorPosition;
        this.code = this.previousCodeState.code;
        setTimeout(() => {
          this.editor.setPosition(cursorPosition);
          this.editor.focus();
        }, 100);
      }
      if (this.tab.type === TabType.VIEW && this.tab.view.type === EhrViewType.JS) {
        this.executeJSView();
      } else {
        this.runQuery();
      }
    }
  }

  constructor(public tabService: TabService,
              private ehrApiService: EhrApiService,
              private monacoService: MonacoService,
              private validationService: ValidationService,
              private codeSnippetService: CodeSnippetService,
              private toastrWrapperService: ToastrWrapperService,
              private cd: ChangeDetectorRef,
              private renderer: Renderer2,
              private viewExecutionService: ViewExecutionService,
              private tablePresentationService: TablePresentationService,
              private spinnerService: SpinnerService,
              private aqlBuilderStorageService: StorageService) {
  }

  ngOnInit() {
    this.tabService.runQuery
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(code => {
      if (this.tab.type === TabType.VIEW && this.tab.view.type === EhrViewType.JS) {
        this.executeJSView();
        return;
      }

      if (code) {
        this.runQuery(code.code);
      }
    });

    this.tabService.activeTabChange
      .pipe(takeUntil(this.unsubscribe))
      .subscribe( (tab: Tab) => {
        // If code in new tab is the same as in the previous, codeChange() is not automatically
        // triggered because onModelChange on <ngx-monaco-editor> never emits new value
        const manuallyUpdateCode = this.code === tab.editor.code && this.tab && this.tab.id !== tab.id;
        this.tab = tab;
        this.code = tab.editor.code;
        if (this.tab.type === TabType.VIEW && this.tab.view.type === EhrViewType.JS) {
          this.initJsViewEditor();
          this.debuggerEnabled = false;
          this.viewExecutionService.resetLogger();
        } else if (this.editorOptions.language !== 'aql') {
          this.editorOptions.language = 'aql';
          this.editorOptions.theme = 'm-monaco-theme';
          this.editorOptions = cloneDeep(this.editorOptions);
        }
        this.editorData = tab.editor;
        this.codePresentation = tab.editor.codePresentation;
        this.activeTabId = this.tabService.activeTabId;
        if (manuallyUpdateCode) {
          this.codeChanged(tab.editor.code);
        }
        this.isEditorHidden = false;
        this.cd.detectChanges();
      });

    MonacoRegisterUtil.monacoLoaded
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((registered) => {
        if (registered) {
          // wait for ngx monaco to create monaco instance with editor, and check code/validation in next tick
          setTimeout(() => {
            this.codeChanged(this.code);
          });
        }
      });

    if (!this.tabService.getActiveTab()) {
      this.tabService.initialize();
      const activeTab = this.tabService.getActiveTab();
      activeTab.editor.code = this.code;
      this.editorData = activeTab.editor;
    } else {
      this.tabService.setActiveTab(this.tabService.activeTabId);
      this.tabService.dispatchTabListChange();
    }

    const aqlStorage = this.aqlBuilderStorageService.getState();
    if (aqlStorage.tablePresentation) {
      this.tablePresentationService.switchPresentation(aqlStorage.tablePresentation);
    }

    this.tablePresentationService.selectedTablePresentation$.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe((presentation: TablePresentation) => {
      this.tablePresentation = presentation;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.wasEditorResized && this.editorData) {
      this.checkEditorContainerSizeAndResize();
    }
  }

  editorInit(editor: IEditor) {
    this.editor = editor;
  }

  onFormatDocument() {
       this.editor.trigger('', 'editor.action.formatDocument', null);
  }


  /**
   * Executes query
   * @param code - code with order by statement for sorting purposes
   */
  private runQuery(code?: string) {
    if (this.tab.type === TabType.VIEW && this.tab.view.type === EhrViewType.JS) {
      this.editorData.aqlParameters = this.editorData.viewExecutionParameters;
    }

    this.tabService.setResult(new AqlResultSet());
    this.toggleSpinner(true);
    const runCode = code || this.code;

    if (this.editorData.aqlParameters.size) {
      if (this.parametersTable) {
        this.parametersTable.nativeElement.querySelectorAll('.param')
          .forEach(input => {
            if (!(!!input['value'])) {
              this.renderer.addClass(input, this.invalidClass);
            }
          });
      }
    }

    if (!this.validationService.areAqlParamsValid(runCode.match(this.variableRegex), this.editorData.aqlParameters)) {
      this.toastrWrapperService.handleToast(ToastType.ERROR, new ToastContent('ERRORS.MISSING_PARAMETERS'));
      this.toggleSpinner(false);
      return;
    }

    if (!code) {
      this.codeSnippetService.addHistoryItem(runCode, this.editorData.aqlParameters, this.tab.name || null);
      this.tabService.sortedField = null;
    }
    const sanitizedQuery = this.monacoService.replaceWithPaths(runCode);

    this.ehrApiService.getAqlQueryResultWithParameters(sanitizedQuery, this.editorData.aqlParameters)
        .pipe(
          catchError(err => {
            this.toggleSpinner(false);
            this.validationService.createModelMarkerFromServerErrorResponse(err);
            this.tab.queryIsValid = false;
            this.tab.errorMessage = `${err.error.exceptionMessage} \n(Error code: ${err.error['code']})`;
            this.tabService.setResult(new AqlResultSet());
            return EMPTY;
          })
        )
        .subscribe( (data: AqlResultSet) => {
          this.tabService.setResult(data);
          this.tab.queryIsValid = true;
          this.validationService.clearModelMarkers();
          this.toggleSpinner(false);
          this.cd.detectChanges();
        });
  }

  codeChanged(event: string) {
    this.previousCodeState = {code: this.code, cursorPosition: this.editor && this.editor.getPosition()};
    this.code = event;
    this.handleParameters();
    this.checkEditorContainerSizeAndResize();
    if (this.tab && (!this.tab.view || this.tab.view && this.tab.view.type !== EhrViewType.JS)) {
      const model = monaco.editor.getModels()[0];
      const code = model ? model.getValue() : this.code;
      const archetypeMap = this.editorData.variableToArchetypeNameMap;
      this.monacoService.clearEditorDataStore(code);
      this.monacoService.setAdditionalAqlKeywords(code);
      this.monacoService.setVariableToArchetypeName(code);
      this.monacoService.cleanReplacementMap(archetypeMap, code);
      if (model) {
        this.validationService.validate();
      }
    }

    this.editorData.code = this.code;
    if (this.tab.initialChange) {
      this.tab.initialChange = false;
    } else {
      this.tab.unsaved = true;
    }

    this.codePresentation = this.monacoService.getCodePresentation(this.codePresentation);
    this.aqlBuilderStorageService.updateTabs(this.tabService.tabs, this.tabService.activeTabId);

  }

  changeValue(key: string, $event: string) {
    if (CommonUtil.isBlank($event) || isNaN(+$event)) {
      this.editorData.aqlParameters.set(key, $event);
    } else {
      this.editorData.aqlParameters.set(key, +$event);
    }
  }

  validateInput(element: HTMLInputElement) {
    if (!(!!element.value)) {
      this.renderer.addClass(element, this.invalidClass);
    } else {
      this.renderer.removeClass(element, this.invalidClass);
    }
  }

  replacePaths() {
    this.code = this.monacoService.replaceWithPaths(this.code);
  }

  beautifyCode() {
    this.code = this.monacoService.beautifyCode(this.code);
  }

  handleMenuAction($event) {
    switch ($event) {
      case EditorMenuAction.SWITCH_CODE_PRESENTATION:
        this.codePresentation = this.codePresentation === CodePresentation.BEAUTIFY ? CodePresentation.PLAIN : CodePresentation.BEAUTIFY;
        this.toggleCodePresentation();
        break;
      case EditorMenuAction.RUN_QUERY:
        this.runQuery();
        break;
      case EditorMenuAction.RUN_JS_VIEW:
        this.executeJSView();
        break;
      case EditorMenuAction.DEBUG_VIEW:
        this.debugView();
        break;
    }
  }

  toggleCodePresentation() {
    const editorData = this.tabService.getActiveEditorState();
    editorData.codePresentation = this.codePresentation;
    if (this.codePresentation === CodePresentation.BEAUTIFY) {
      this.beautifyCode();
    } else {
      this.replacePaths();
    }
  }

  toggleSpinner(show: boolean): void {
    show ? this.spinnerService.showSpinner() : this.spinnerService.hideSpinner();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private executeJSView(): void {
    this.viewExecutionService.executeView(monaco.editor.getModels()[0].getValue(), this.debuggerEnabled);
    this.debuggerEnabled = false;
  }

  private debugView(): void {
    this.debuggerEnabled = !this.debuggerEnabled;
    this.executeJSView();
  }


  private handleParameters() {
    let params = this.code.match(this.variableRegex);

    if (!params) {
      this.editorData.aqlParameters.clear();
      return;
    }

    params = this.filterCommentedParams(params);
    params = params.map(value => `:${value.split(':')[1]}`);
    params.forEach((param) => {
      const key = param.split(':')[1];
      const isCommented = this.monacoService.isWordCommented(this.code, key);
      if (!this.editorData.aqlParameters.has(key) && key.length > 0 && !isCommented) {
        this.editorData.aqlParameters.set(key, '');
      }
    });


    // delete keys that do not exists anymore
    const excludedKeys = Array.from(this.editorData.aqlParameters.keys()).filter(key => !params.includes(':' + key));
    excludedKeys.forEach(k => this.editorData.aqlParameters.delete(k));
  }

  private initJsViewEditor() {
    this.editorOptions.language = 'javascript';
    this.editorOptions.theme = 'vs';
    this.editorOptions = cloneDeep(this.editorOptions);

    if (!this.tab.editor.viewExecutionParameters) {
      this.tab.editor.viewExecutionParameters = new Map<string, any>();
    }

    this.tab.editor.viewExecutionParameters.set('ehrId', '');
  }

  private checkEditorContainerSizeAndResize(): void {
    const {viewParams, viewExecParams, aqlParams} = this.parametersSize;

    const currentAqlParams = this.editorData.aqlParameters.size;
    const currentViewExecParams = this.editorData.viewExecutionParameters ? this.editorData.viewExecutionParameters.size : 0;
    const currentViewParams = this.editorData.viewParameters ? this.editorData.viewParameters.size : 0;

    if (currentViewParams !== viewParams ||
        currentAqlParams !==  aqlParams ||
        currentViewExecParams !== viewExecParams ||
        this.wasEditorResized) {

      requestAnimationFrame(() => {
        const container = this.monacoWrapper.nativeElement as HTMLDivElement;
        const editorSize: IDimension = {
          width: container.offsetWidth - this.monacoWrapperPadding.x,
          height: container.offsetHeight - this.monacoWrapperPadding.y,
        };
        this.editor?.layout(editorSize);
        this.resetResizeState.emit();
      });

    }

    this.parametersSize = {
      viewParams: currentViewParams,
      aqlParams: currentAqlParams,
      viewExecParams: currentViewExecParams
    };
  }

  private filterCommentedParams(params: RegExpMatchArray) {
    const codeLines = this.code.split('\n');
    const filteredParams = [];
    params.forEach(param => {
      const lineIndex = codeLines.findIndex(line => line.indexOf(param) > -1);
      const commentIndex = codeLines[lineIndex] ? codeLines[lineIndex].indexOf(MonacoAutocompleteHelper.commentPattern) : -1;
      const isParamCommentedOut = commentIndex > -1 && commentIndex < codeLines[lineIndex].indexOf(param);
      if (!isParamCommentedOut) {
        filteredParams.push(param);
      }
    });

    return filteredParams;
  }
}
