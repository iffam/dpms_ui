import { UpperCasePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSlidePanel } from 'ngx-mat-slide-panel';
import { Subject, takeUntil } from 'rxjs';
import { PermitUsageComponent } from './permit-usage/permit-usage.component';
import { PermitService } from './permits.service';
import { Permit } from './permits.types';

@Component({
  selector: 'app-permits',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule,
    UpperCasePipe,
    MatRadioModule,
    FormsModule,
  ],
  templateUrl: './permits.component.html',
  styleUrl: './permits.component.scss',
})
export class PermitsComponent implements OnInit, OnDestroy {
  selectedFilter: string = 'all';
  displayedColumns: string[] = ['id', 'name', 'permit_type', 'actions'];
  permitsLoading: boolean = false;
  permits: Permit[] = [];
  pagination: any;
  dataSource: any;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _permitService: PermitService,
    private panel: MatSlidePanel,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  /**
   * On init
   */
  ngOnInit(): void {
    this._permitService.permits$.pipe(takeUntil(this._unsubscribeAll)).subscribe((permits: Permit[]) => {
      this.permits = permits;
      this.dataSource = new MatTableDataSource(this.permits);
    });

    // user loading
    this._permitService.permitLoading$.pipe(takeUntil(this._unsubscribeAll)).subscribe((permitLoading: boolean) => {
      this.permitsLoading = permitLoading;
    });

    // Pagination
    this._permitService.pagination$.pipe(takeUntil(this._unsubscribeAll)).subscribe((pagination) => {
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
    this._permitService.getPermits((event.pageIndex + 1).toString()).subscribe();
  }

  openDetailsPanel(permit: Permit): void {
    const panelConfig = {
      panelClass: 'w-[500px]',
      data: {
        permit,
      },
    };
    this.panel
      .open(PermitUsageComponent, panelConfig)
      .afterDismissed()
      .subscribe((d) => {
        if (d) {
          console.log('Panel closed with data:', d);
        }
      });
  }
}
