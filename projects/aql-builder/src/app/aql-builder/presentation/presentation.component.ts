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
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {Tab, TabType} from '../editor/tab.model';
import {EhrViewType, AqlResultSet} from '../../shared/models';
import {TablePresentation} from './table-presentation/table-presentation.enum';
import {TablePresentationService} from './table-presentation/table-presentation.service';
import {BehaviorSubject, combineLatest, Observable, of, Subject} from 'rxjs';
import {filter, switchMap, takeUntil} from 'rxjs/operators';
import {TabService} from '../../core/tab.service';
import {SpinnerService} from '../../shared/spinner/spinner.service';
import {AqlXmlPresentationService} from './raw-presentation/aql-xml-presentation.service';

@Component({
  selector: 'aql-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss'],
  providers: [AqlXmlPresentationService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresentationComponent implements OnInit, OnDestroy {
  @Input() showEditor: boolean;
  @Output() hideEditor: EventEmitter<void> = new EventEmitter<void>();
  tab: Tab;
  TablePresentation = TablePresentation;
  TabType = TabType;
  EhrViewType = EhrViewType;

  currentPresentation: Observable<TablePresentation>;
  destroy$: Subject<void> = new Subject<void>();

  showSpinner$: Observable<boolean>;
  rawData: string;
  private showAsXml: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private tablePresentationService: TablePresentationService,
              private tabService: TabService,
              private cd: ChangeDetectorRef,
              private spinnerService: SpinnerService,
              private aqlXmlPresentationService: AqlXmlPresentationService) { }

  ngOnInit(): void {
    this.tabService.activeTabChange
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((tab) => {
      const resultsetExists = tab && tab.result && tab.result.resultSet && tab.result.resultSet.length;
      if (resultsetExists) {
        this.spinnerService.showSpinner();
        setTimeout(_ => {
          this.tab = tab;
          this.spinnerService.hideSpinner();
          this.cd.detectChanges();
        }, 500);
      } else {
        this.tab = tab;
        this.cd.markForCheck();
      }
    });
    this.currentPresentation = this.tablePresentationService.selectedTablePresentation$;

    combineLatest([this.currentPresentation, this.showAsXml, this.tabService.resultChanges])
      .pipe(
        takeUntil(this.destroy$),
        filter(([currPresentation]) => currPresentation === TablePresentation.RAW),
        switchMap(([_, showAsXml, aqlResult]) => {
          if (showAsXml) {
            return this.aqlXmlPresentationService.getXmlData(this.tabService.getActiveTab());
          }
          const result: AqlResultSet[] = aqlResult?.resultSet;
          const rawJson = result?.length ? JSON.stringify(result, null, 4) : '';
          return of(rawJson);
        })
      ).subscribe((data) => {
        this.rawData = data;
        this.spinnerService.hideSpinner();
        this.cd.detectChanges();
      });

    this.showSpinner$ = this.spinnerService.spinner$;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleEditor() {
    this.hideEditor.emit();
  }

  toggleXmlView() {
    this.spinnerService.showSpinner();
    const currentValue = this.showAsXml.getValue();
    this.showAsXml.next(!currentValue);
  }
}
