import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, UserPaginatedList } from './users.types';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _authUser: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);
  private _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private _usersLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _pagination: BehaviorSubject<any> = new BehaviorSubject(null);

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

  /**
   * Getter for users
   */
  get users$(): Observable<User[]> {
    return this._users.asObservable();
  }

  /**
   * Getter for user loading
   */
  get usersLoading$(): Observable<boolean> {
    return this._usersLoading.asObservable();
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
   * Get the current signed-in user data
   */
  get(): Observable<User> {
    return this._httpClient.get<User>(`${environment.apiUrl}/auth_user`).pipe(
      tap((user) => {
        this._authUser.next(user);
      })
    );
  }

  /**
   * Get users
   */
  getUsers(page: string = '1'): Observable<any> {
    // Execute the visitors loading with true
    this._usersLoading.next(true);

    return this._httpClient
      .get<UserPaginatedList>(`${environment.apiUrl}/users`, {
        params: {
          page,
        },
      })
      .pipe(
        tap((response: any) => {
          this._users.next(response.data);
          this._pagination.next(response.pagination);
          this._usersLoading.next(false);
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
}
