import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DepartmentService } from './departments.service';
import { Department } from './departments.types';

@Component({
  selector: 'app-departments',
  imports: [],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css',
})
export class DepartmentsComponent implements OnInit, OnDestroy {
  departmentsLoading: boolean = false;
  departments: Department[] = [];
  pagination: any;
  selectedDepartment: Department | null = null;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(private _departmentService: DepartmentService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Department
    this._departmentService.departments$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((departments: Department[]) => {
        this.departments = departments;
      });

    // Department loading
    this._departmentService.departmentsLoading$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((departmentsLoading: boolean) => {
        this.departmentsLoading = departmentsLoading;
      });

    // Pagination
    this._departmentService.pagination$.pipe(takeUntil(this._unsubscribeAll)).subscribe((pagination) => {
      this.pagination = pagination;
    });

    // Selected department
    this._departmentService.department$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((department: Department | null) => {
        this.selectedDepartment = department as Department;
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
}
