import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map, tap } from 'rxjs/operators'

export class User {
  constructor(
    public name: string
  ){}
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/users')
    .pipe(
      tap(_ => console.log('fetched heroes')),
      catchError(this.handleError<User[]>('getUsers'))
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/users', user, this.httpOptions)
      .pipe(
        catchError(this.handleError('addUser', user))
      );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    // this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
