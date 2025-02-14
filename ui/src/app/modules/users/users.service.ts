import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from './users.types';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _authUser: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);

  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for auth user
   *
   * @param value
   */
  set authUser(value: User) {
    // Store the value
    this._authUser.next(value);
  }

  get authUser$(): Observable<User> {
    return this._authUser.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get the current signed-in user data
   */
  get(): Observable<User> {
    return this._httpClient.get<User>(`${environment.apiUrl}/auth_user`).pipe(
      tap((user) => {
        this._authUser.next(user);
      })
    );
  }
}
