import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, switchMap, take, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Application, ApplicationPaginatedList } from './applications.types';

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  selectedDepartmentChanged: BehaviorSubject<any> = new BehaviorSubject(null);
  private _applications: BehaviorSubject<Application[]> = new BehaviorSubject<Application[]>([]);
  private _applicationLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _application: BehaviorSubject<Application | null> = new BehaviorSubject<Application | null>(null);
  private _pagination: BehaviorSubject<any> = new BehaviorSubject(null);

  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for applicatrion
   */
  get applications$(): Observable<Application[]> {
    return this._applications.asObservable();
  }

  /**
   * Getter for applicatrion loading
   */
  get applicationLoading$(): Observable<boolean> {
    return this._applicationLoading.asObservable();
  }

  /**
   * Getter for applicatrion
   */
  get application$(): Observable<Application | null> {
    return this._application.asObservable();
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
  getApplications(page: string = '1'): Observable<any> {
    // Execute the visitors loading with true
    this._applicationLoading.next(true);

    return this._httpClient
      .get<ApplicationPaginatedList>(`${environment.apiUrl}/applications`, {
        params: {
          page,
        },
      })
      .pipe(
        tap((response: any) => {
          this._applications.next(response.data);
          this._pagination.next(response.pagination);
          this._applicationLoading.next(false);
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
   * Get application by id
   */
  getApplicationById(id: string): Observable<any> {
    return this._applications.pipe(
      take(1),
      map((departments) => {
        // Find the application
        const department = departments.find((item) => item.id === id) || null;

        // Update the application
        if (department) {
          this._application.next(department);
        }

        // Return the application
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
   * Reset the current application
   */
  resetApplication(): Observable<boolean> {
    return of(true).pipe(
      take(1),
      tap(() => {
        this._application.next(null);
      })
    );
  }

  /**
   * Rerview Application
   *
   * @param application
   */
  reviewStaffApplication(application: Application, id: string): Observable<Application> {
    this._applicationLoading.next(true);
    return this._httpClient.post<Application>(`${environment.apiUrl}/applications/${id}`, application).pipe(
      map((response) => {
        this._applicationLoading.next(false);
        return response;
      }),
      tap({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        error: (error) => {
          this._applicationLoading.next(false);
        },
      })
    );
  }
}
