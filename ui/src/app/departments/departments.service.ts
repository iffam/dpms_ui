import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, switchMap, take, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Department, DepartmentPaginatedList } from './departments.types';

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  selectedDepartmentChanged: BehaviorSubject<any> = new BehaviorSubject(null);
  private _departments: BehaviorSubject<Department[]> = new BehaviorSubject<Department[]>([]);
  private _departmentsLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _department: BehaviorSubject<Department | null> = new BehaviorSubject<Department | null>({
    id: '',
    name: '',
  });
  private _pagination: BehaviorSubject<any> = new BehaviorSubject(null);

  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for departments
   */
  get departments$(): Observable<Department[]> {
    return this._departments.asObservable();
  }

  /**
   * Getter for departments loading
   */
  get departmentsLoading$(): Observable<boolean> {
    return this._departmentsLoading.asObservable();
  }

  /**
   * Getter for department
   */
  get department$(): Observable<Department | null> {
    return this._department.asObservable();
  }

  /**
   * Getter for pagination
   */
  get pagination$(): Observable<any> {
    return this._pagination.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get departments
   */
  getDepartments(page: string = '1'): Observable<any> {
    // Execute the visitors loading with true
    this._departmentsLoading.next(true);

    return this._httpClient
      .get<DepartmentPaginatedList>(`${environment.apiUrl}/departments`, {
        params: {
          page,
        },
      })
      .pipe(
        tap((response: any) => {
          this._departments.next(response.data);
          this._pagination.next(response.pagination);
          this._departmentsLoading.next(false);
        }),
        switchMap((response) => {
          if (response.data === null) {
            return throwError({
              message: 'Requested page is not available!',
              pagination: response.data.pagination,
            });
          }

          return of(response);
        })
      );
  }

  /**
   * Get department by id
   */
  getDepartmentById(id: string): Observable<any> {
    return this._departments.pipe(
      take(1),
      map((departments) => {
        // Find the department
        const department = departments.find((item) => item.id === id) || null;

        // Update the department
        if (department) {
          this._department.next(department);
        }

        // Return the department
        return department;
      }),
      switchMap((department) => {
        if (!department) {
          return throwError('Could not found department with id of ' + id + '!');
        }

        return of(department);
      })
    );
  }

  /**
   * Reset the current department
   */
  resetDepartment(): Observable<boolean> {
    return of(true).pipe(
      take(1),
      tap(() => {
        this._department.next(null);
      })
    );
  }
}
