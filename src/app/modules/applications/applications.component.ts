import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSlidePanel } from 'ngx-mat-slide-panel';
import { Subject, takeUntil } from 'rxjs';
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { ApplicationService } from './applications.service';
import { Application } from './applications.types';

@Component({
  selector: 'app-applications',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule, MatIconModule, MatMenuModule],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.scss',
})
export class ApplicationsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'permit_type', 'status', 'actions'];
  applicationsLoading: boolean = false;
  applications: Application[] = [];
  pagination: any;
  dataSource: any;

  lengthq = 0;
  pageSizeq = 0;
  pageIndexq = 0;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _applicationService: ApplicationService,
    private panel: MatSlidePanel,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  /**
   * On init
   */
  ngOnInit(): void {
    this._applicationService.applications$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((applications: Application[]) => {
        this.applications = applications;
        this.dataSource = new MatTableDataSource(this.applications);
      });

    // user loading
    this._applicationService.applicationLoading$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((applicationLoading: boolean) => {
        this.applicationsLoading = applicationLoading;
      });

    // Pagination
    this._applicationService.pagination$.pipe(takeUntil(this._unsubscribeAll)).subscribe((pagination) => {
      this.pagination = pagination;
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handlePageEvent(event: PageEvent) {
    this._applicationService.getApplications((event.pageIndex + 1).toString()).subscribe();
  }

  openDetailsPanel(): void {
    const panelConfig = {
      panelClass: 'w-[500px]',
      data: {
        title: 'Checklist Template',
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
