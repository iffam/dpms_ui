import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MyPermit, ScanData } from './permits.types';

@Injectable({ providedIn: 'root' })
export class PermitService {
  private _myPermit: BehaviorSubject<MyPermit | null> = new BehaviorSubject<MyPermit | null>(null);
  private _permits: BehaviorSubject<any> = new BehaviorSubject<any[]>([]);
  private _permitLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _pagination: BehaviorSubject<any> = new BehaviorSubject(null);

  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for department
   */
  get myPermit$(): Observable<MyPermit | null> {
    return this._myPermit.asObservable();
  }

  /**
   * Getter for applicatrion
   */
  get permits$(): Observable<any[]> {
    return this._permits.asObservable();
  }

  /**
   * Getter for applicatrion loading
   */
  get permitLoading$(): Observable<boolean> {
    return this._permitLoading.asObservable();
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

  getPermits(page: string = '1', filter: string = 'all'): Observable<any> {
    // Execute the visitors loading with true
    this._permitLoading.next(true);

    return this._httpClient
      .get<any>(`${environment.apiUrl}/permits`, {
        params: {
          page,
          filter,
        },
      })
      .pipe(
        tap((response: any) => {
          this._permits.next(response.data);
          this._pagination.next(response.pagination);
          this._permitLoading.next(false);
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
   * Get the my permit
   */
  get(): Observable<MyPermit> {
    return this._httpClient.get<MyPermit>(`${environment.apiUrl}/permits/mypermit`).pipe(
      tap((permit) => {
        this._myPermit.next(permit);
      })
    );
  }

  Validate(data: ScanData, checkpoint: string): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/permits/validate`, { ...data, checkpoint }).pipe(
      switchMap((response: any) => {
        return of(response);
      })
    );
  }
}
