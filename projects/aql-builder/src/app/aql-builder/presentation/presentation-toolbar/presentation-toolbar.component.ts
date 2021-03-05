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

import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Tab} from '../../editor/tab.model';
import {TablePresentation} from '../table-presentation/table-presentation.enum';
import {EhrViewType} from '../../../shared/models';
import {TablePresentationService} from '../table-presentation/table-presentation.service';
import {ToastrWrapperService, ToastType} from '../../../shared/toastr-wrapper.service';
import {ToastContent} from '../../../shared/models/app.model';
import {ExportService} from '../table-presentation/export.service';
import * as JSZip from 'jszip';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {SpinnerService} from '../../../shared/spinner/spinner.service';
import {CommonUtil} from '../../../shared';

@Component({
  selector: 'aql-presentation-toolbar',
  templateUrl: './presentation-toolbar.component.html',
  styleUrls: ['./presentation-toolbar.component.scss']
})
export class PresentationToolbarComponent implements OnInit, OnDestroy {
  @Input() tab: Tab;
  @Input() showEditor: boolean;
  @Output() hideEditor: EventEmitter<void> = new EventEmitter<void>();
  TablePresentation = TablePresentation;
  currentTablePresentation: TablePresentation;
  EhrViewType = EhrViewType;
  destroy$: Subject<void> = new Subject<void>();

  constructor(private exportService: ExportService,
              private tablePresentationService: TablePresentationService,
              private toastrWrapperService: ToastrWrapperService,
              private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.tablePresentationService.selectedTablePresentation$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((presentation) => {
      this.currentTablePresentation = presentation;
    });
  }

  exportCsv() {
    const exportTables = this.exportService.getExportTables(this.currentTablePresentation);
    if (!exportTables.length) {
      return;
    }

    if (exportTables.length === 1) {
      CommonUtil.downloadFile(new Blob([exportTables[0]]), `result-table.csv`, 'application/zip');
      return;
    }

    const zipFile: JSZip = new JSZip();
    exportTables.forEach((table, index) => {
      zipFile.file(`result-table-${index + 1}.csv`, table);
    });

    zipFile.generateAsync({type: 'blob'})
      .then((content) => {
        CommonUtil.downloadFile(content, 'aql-results.zip', 'application/zip');
      })
      .catch((err) => {
        this.toastrWrapperService.handleToast(ToastType.ERROR, new ToastContent('ERRORS.EXPORT_ZIP'), err);
      });

  }


  toggleHideEditor() {
    this.hideEditor.emit();
  }

  toggleView(presentation: TablePresentation) {
    this.spinnerService.showSpinner();
    this.tablePresentationService.switchPresentation(presentation);
    setTimeout(() => {
      this.spinnerService.hideSpinner();
    }, 100);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
