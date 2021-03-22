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

import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {EhrApiService} from '../../core/ehr-api.service';
import {UploaderOptions, UploadFile, UploadOutput} from 'ngx-uploader';
import {Observable, Subject} from 'rxjs';
import {ToastrWrapperService, ToastType} from '../../shared/toastr-wrapper.service';
import {ToastContent} from '../../shared/models/app.model';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'bui-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit, OnDestroy {
  static notifyImport = new Subject<{templateId?: string, type?: ImportType}>();
  files: UploadFile[];
  fileTypeError = false;
  dragOver = false;
  availableTypes = [FileType.OPT, FileType.ZIP, FileType.XML];
  options: UploaderOptions = {
    concurrency: 1
  };
  private activeModal: NgbModalRef;
  private destroy$: Subject<unknown> = new Subject<unknown>();

  constructor(private modalService: NgbModal,
              private ehrApiService: EhrApiService,
              private toastrWrapperService: ToastrWrapperService) {

  }

  ngOnInit() {
    this.files = [];
  }

  openModal(element) {
    console.log('Header: Import template or form');
    this.fileTypeError = false;
    this.activeModal = this.modalService.open(element);
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
      this.dragOver = false;
      this.fileTypeError = !this.isFileTypeValid(output.file);
      if (!this.fileTypeError) {
        this.postFile(output.file.nativeFile);
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private isFileTypeValid(file: UploadFile): boolean {
    const fileType = this.getFileType(file.name);
    if (fileType) {
      const isFileTypeValid = this.availableTypes.includes(fileType);
      if (!isFileTypeValid) {
        console.error(`Imported file type ${fileType} is not supported`);
      }
      return isFileTypeValid;
    } else {
      console.error(`Imported file does not have extension`);
      return false;
    }
  }

  private postFile(file: File): void {
    const fileType = this.getFileType(file.name);

    if (fileType === FileType.OPT || fileType === FileType.XML ) {
      this.import(ImportType.TEMPLATE, this.ehrApiService.importTemplate(file));
    } else {
      console.error('Cannot import file with this extention');
    }
  }

  private import(type: ImportType, api: Observable<any>) {
    api.pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        this.activeModal.close();
        this.toastrWrapperService.handleToast(ToastType.SUCCESS, new ToastContent('IMPORT.' + type + '.SUCCESS'), null);
        const body = {
          type,
          templateId: data ? data.templateId : undefined
        };
        ImportComponent.notifyImport.next(body);
      },
      (error) => {
        const errorKey: string = (error.status === 403) ? 'IMPORT.NOT_ALLOWED' : 'IMPORT.ERROR';
        this.toastrWrapperService.handleToast(ToastType.ERROR, new ToastContent(errorKey), error);
      }
    );
  }

  private getFileType(fileName: string): string | undefined {
    const typeSeparator = fileName.lastIndexOf('.');
    if (typeSeparator !== -1) {
      return fileName.substring(typeSeparator, fileName.length);
    }
    return undefined;
  }

}

export const FileType = {
  ZIP: '.zip',
  OPT: '.opt',
  XML: '.xml'
};

export enum ImportType {
  FORM = 'FORM',
  TEMPLATE = 'TEMPLATE'
}
