import { UpperCasePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSlidePanel } from 'ngx-mat-slide-panel';
import { Subject, takeUntil } from 'rxjs';
import { ApplicationDetailsComponent } from '../applications/application-details/application-details.component';
import { Application } from '../applications/applications.types';
import { MyApplicationService } from './my-applications.service';
import { NewApplicationComponent } from './new-application/new-application.component';

@Component({
  selector: 'app-my-applications',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule,
    UpperCasePipe,
  ],
  templateUrl: './my-applications.component.html',
  styleUrl: './my-applications.component.scss',
})
export class MyApplicationsComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  displayedColumns: string[] = ['id', 'name', 'permit_type', 'status', 'actions'];
  applicationsLoading: boolean = false;
  applications: Application[] = [];
  pagination: any;
  dataSource: any;
  constructor(
    private panel: MatSlidePanel,
    private _myApplicationService: MyApplicationService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._myApplicationService.applications$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((applications: Application[]) => {
        this.applications = applications;
        this.dataSource = new MatTableDataSource(this.applications);
      });

    // user loading
    this._myApplicationService.applicationLoading$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((applicationLoading: boolean) => {
        this.applicationsLoading = applicationLoading;
      });

    // Pagination
    this._myApplicationService.pagination$.pipe(takeUntil(this._unsubscribeAll)).subscribe((pagination) => {
      this.pagination = pagination;
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  openNewAppPanel(): void {
    const panelConfig = {
      panelClass: 'w-[500px]',
      data: {
        title: 'Checklist Template',
      },
    };
    this.panel
      .open(NewApplicationComponent, panelConfig)
      .afterDismissed()
      .subscribe((d) => {
        if (d) {
          console.log('Panel closed with data:', d);
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handlePageEvent(event: PageEvent) {
    this._myApplicationService.getMyApplications((event.pageIndex + 1).toString()).subscribe();
  }

  openDetailsPanel(application: Application): void {
    const panelConfig = {
      panelClass: 'w-[500px]',
      data: {
        application,
      },
    };
    this.panel
      .open(ApplicationDetailsComponent, panelConfig)
      .afterDismissed()
      .subscribe((d) => {
        if (d) {
          console.log('Panel closed with data:', d);
        }
      });
  }
}
