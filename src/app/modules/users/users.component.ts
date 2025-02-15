import { JsonPipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from './users.service';
import { User } from './users.types';

@Component({
  selector: 'app-users',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule, JsonPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'employee_number', 'email'];
  usersLoading: boolean = false;
  users: User[] = [];
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
    private _userService: UserService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // users
    this._userService.users$.pipe(takeUntil(this._unsubscribeAll)).subscribe((users: User[]) => {
      this.users = users;
      this.dataSource = new MatTableDataSource(this.users);
    });

    // user loading
    this._userService.usersLoading$.pipe(takeUntil(this._unsubscribeAll)).subscribe((usersLoading: boolean) => {
      this.usersLoading = usersLoading;
    });

    // Pagination
    this._userService.pagination$.pipe(takeUntil(this._unsubscribeAll)).subscribe((pagination) => {
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
    this._userService.getUsers((event.pageIndex + 1).toString()).subscribe();
  }
}
