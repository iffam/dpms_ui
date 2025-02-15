import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MyPermit } from './permits.types';

@Injectable({ providedIn: 'root' })
export class PermitService {
  private _myPermit: BehaviorSubject<MyPermit | null> = new BehaviorSubject<MyPermit | null>(null);

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

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

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
}
