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
  Component,
  EventEmitter, HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges, TemplateRef, ViewChild
} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {CodeSnippetService} from '../../core/code-snippet.service';
import {EhrView, EhrViewMetaData, EhrViewSteps, EhrViewType} from '../../shared/models/ehr-view.model';
import {ToastrWrapperService, ToastType} from '../../shared/toastr-wrapper.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {EhrApiService} from '../../core/ehr-api.service';
import {Subject} from 'rxjs';
import {Tab, TabType} from '../editor/tab.model';
import {ToastContent} from '../../shared/models/app.model';
import {MonacoService} from '../monaco/monaco.service';

@Component({
  selector: 'aql-save',
  templateUrl: './save.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SaveComponent implements OnChanges, OnDestroy {

  @Input() tab: Tab;
  @Input() code: string;
  @Input() name: string;

  @Output() viewUpdate: EventEmitter<Tab> = new EventEmitter<Tab>();

  @ViewChild('snippetModal') snippetModal: TemplateRef<HTMLDivElement>;
  @ViewChild('saveViewModal') saveViewModal: TemplateRef<HTMLDivElement>;

  /**
   * Indicates if update logic should be triggered instead of save
   */
  isUpdate = false;
  snippetFormGroup = new FormGroup({
    name: new FormControl('', {validators: [Validators.required, Validators.minLength(3), this.snippetExist()]}),
  });

  viewsFormGroup = new FormGroup({
    name: new FormControl('', {validators: [Validators.required, Validators.minLength(3)]}),
    description: new FormControl(),
    version: new FormControl(),
    paramsTypes: new FormControl(),
    updateAgreement: new FormControl(false)
  });

  EditorTabType = TabType;
  private activeModal: NgbModalRef;
  private unsubscribe: Subject<void> = new Subject<void>();

  @HostListener('document:keydown', ['$event']) onKeyDown(event) {
    const metaKey: boolean = (event.metaKey || event.ctrlKey);

    /**
     * key binding Save as View: CTRL + SHIFT + S
     */
    if (event.keyCode === 83 && metaKey && event.shiftKey) {
      event.preventDefault();
      !this.tab.view ? this.openModal(this.saveViewModal) : this.openModal(this.snippetModal);
      return;
    }

    /**
     * key-binding Save as Snippet: CTRL + S
     */
    if (event.keyCode === 83 && metaKey) {
      event.preventDefault();
      this.tab.view ? this.openModal(this.saveViewModal) : this.openModal(this.snippetModal);
      return;
    }
  }

  constructor(private codeSnippetService: CodeSnippetService,
              private modalService: NgbModal,
              private monacoService: MonacoService,
              private toastrWrapperService: ToastrWrapperService,
              private ehrApiService: EhrApiService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.name) {
        const name = this.name || '';
        this.snippetFormGroup.controls['name'].patchValue(name.replace(/\s/g, '_'));
        this.viewsFormGroup.controls['name'].patchValue(name);
    }

    if (changes.tab && !!this.tab) {
        this.isUpdate = this.tab.unsaved;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  /**
   * Calls update or save based on isUpdate parameter
   */
  save() {
    if (this.viewsFormGroup.invalid) {
      return;
    }

    this.isUpdate ? this.updateView() : this.saveView();
  }

  saveSnippet(): void {
    if (this.snippetFormGroup.valid) {
      this.codeSnippetService.saveSnippet(this.snippetFormGroup.controls['name'].value, this.tab.editor.code);
      this.closeActiveModal();
    }
  }

  openModal(modal, isUpdate = false): void {
    this.isUpdate = isUpdate;
    isUpdate ?
      this.viewsFormGroup.get('name').disable() :
      this.viewsFormGroup.get('name').enable();

    this.prefillSaveForm();
    this.activeModal = this.modalService.open(modal);
  }

  /**
   * 
   * Check if view with predefined name already exist and save it only if it doesn't
   */
  private saveView(): void {
    const name: string = this.viewsFormGroup.get('name').value;
    const description: string = this.viewsFormGroup.get('description').value;
    let version: string = this.viewsFormGroup.get('version').value;
    const data = this.tab.view?.type === EhrViewType.JS ? this.tab.editor.viewParameters : this.tab.editor.aqlParameters;
    const params: EhrViewMetaData = this.handleViewMetadata(data);
    const code =  this.monacoService.replaceWithPaths(this.tab.editor.code); // `this` is not a scope of the component inside second subscribe

    // console.log('saveView name',name);
    // console.log('saveView version',version);
    // if (!version){
    //   version='1.0.0';
    // }

    // this.ehrApiService.getView(name,version)
    //   .subscribe(
    //     () => this.toastrWrapperService.handleToast(ToastType.ERROR, new ToastContent('ERRORS.VIEW_ALREADY_EXIST')),
    //     (error) => {
    //       if (error.status && error.status === 400) {
    //         const view: EhrView = new EhrView(name, version, EhrViewType.JSON_AQL, new Date(new Date().toJSON()), new EhrViewSteps(code, this.tab.view?.type || EhrViewType.JSON_AQL), JSON.stringify(params, null, 4),description);
    //         this.ehrApiService.saveView(view)
    //           .subscribe(
    //             () => this.handleSuccessResponse('VIEW.SAVED'),
    //             (err) => {
    //               this.toastrWrapperService.handleToast(ToastType.ERROR, new ToastContent('ERRORS.GENERAL'), `[Error] Saving view failed (raw payload: ${JSON.stringify(err.error)})`);
    //             },
    //             () => {
    //               this.tab.view = view;
    //               this.tab.name = name;
    //               this.emitViewUpdate();
    //             }
    //           );
    //       }
    //     }
    //   );


      // this.ehrApiService.getView(name,version)
      // .subscribe(
      //   () => this.toastrWrapperService.handleToast(ToastType.ERROR, new ToastContent('ERRORS.VIEW_ALREADY_EXIST')),
      //   (error) => {
      //     if (error.status && error.status === 400) {
            const view: EhrView = new EhrView(name, version, EhrViewType.JSON_AQL, new Date(new Date().toJSON()), new EhrViewSteps(code, this.tab.view?.type || EhrViewType.JSON_AQL), JSON.stringify(params, null, 4),description);
            this.ehrApiService.saveView(view)
              .subscribe(
                () => this.handleSuccessResponse('VIEW.SAVED'),
                (err) => {
                  this.toastrWrapperService.handleToast(ToastType.ERROR, new ToastContent('ERRORS.GENERAL'), `[Error] Saving view failed (raw payload: ${JSON.stringify(err.error)})`);
                },
                () => {
                  this.tab.view = view;
                  this.tab.name = name;
                  this.emitViewUpdate();
                }
              );
      //     }
      //   }
      // );


  }

  private updateView(): void {
    console.log('bbbbbbbbbbbUPDATEVIEWbbbbbbbbbbbbbbbbb');
    const description: string = this.viewsFormGroup.get('description').value;
    const version = this.viewsFormGroup.get('version').value;
    const view = this.tab.view;
    const previousCode = Object.assign({}, view.steps.processorData);
    const data = this.tab.view?.type === EhrViewType.JS ? this.tab.editor.viewParameters : this.tab.editor.aqlParameters;
    view.description = description;
    view.version = version;

    if (view.metaData) {
      view.metaData = typeof view.metaData === 'string' ? JSON.parse(view.metaData) : view.metaData;
      view.metaData['parameters'] = this.handleViewMetadata(data).parameters;
      view.metaData = JSON.stringify(view.metaData, null, 4);
    } else {
      view.metaData = JSON.stringify(this.handleViewMetadata(data), null, 4);
    }
    view.steps.processorData = this.monacoService.replaceWithPaths(this.tab.editor.code);

    this.ehrApiService.updateView(view)
      .subscribe(
        () => this.handleSuccessResponse('VIEW.UPDATED'),
        error => {
          this.toastrWrapperService.handleToast(ToastType.ERROR, new ToastContent('ERRORS.GENERAL'), `[Error] Updating view failed (raw payload: ${JSON.stringify(error.error)})`);
          view.steps.processorData = previousCode;
        },
        () => {
          this.tab.view = view;
          this.emitViewUpdate();
        });
  }

  /**
   * Prefill or clear form based on isUpdate
   */
  private prefillSaveForm(): void {
    if (this.isUpdate) {
      this.viewsFormGroup.patchValue({name: this.tab.name, description: this.tab.view.description,version: this.tab.view.version});
    } else {
      this.viewsFormGroup.patchValue({name: '', description: '', version: ''});
    }
  }

  private closeActiveModal(): void {
    if (this.activeModal) {
      this.activeModal.close();
    }
  }

  private snippetExist(): ValidatorFn {
    return (control: FormControl) => {
      if (this.codeSnippetService.snippetNameExist(control.value)) {
        return {
          exist: true
        };
      }
      return null;
    };
  }

  /**
   * Get EhrViewMetadata from
   */
  private handleViewMetadata(definedParams: Map<string, any> = this.tab.editor.viewParameters): EhrViewMetaData {
    const params: EhrViewMetaData = new EhrViewMetaData();

    if (!definedParams) {
      return params;
    }

    definedParams.forEach( (value, key) => {
      params.setParameter(key, value.description || '', value.type || 'string');
    });

    return params;
  }

  /**
   * Update view list with new/updated view, Display notification, log successful update and close modal window
   */
  private handleSuccessResponse(message: string): void {
    this.toastrWrapperService.handleToast(ToastType.SUCCESS, new ToastContent(message));
    console.log(message);
    this.closeActiveModal();
  }

  private emitViewUpdate(): void {
    this.tab.unsaved = false;
    this.viewUpdate.emit(this.tab);
  }

}
