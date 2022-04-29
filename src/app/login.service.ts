import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cookie, ROOT_URL, User } from './login';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = ROOT_URL + 'formlogin';
  private userUrl = ROOT_URL + 'user/';

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.nzMessageService.error(`${operation} 错误: ${error.message}`);
      return of(result as T);
    };
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*' })
  };

  login(account: string, password: string): Observable<Cookie> {
    return this.http.post<Cookie>(`${this.loginUrl}?account=${account}&password=${password}`,this.httpOptions)
      .pipe(
        tap(_ => null,
        catchError(this.handleError<Cookie>('登录'))
      ));
  }
  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.userUrl}save`, user, this.httpOptions).pipe(
      tap((newUser: User) => this.nzMessageService.info(`注册成功，账号为${newUser.account}`)),
      catchError(this.handleError<User>('注册账号'))
    );
  }
  constructor(
    private http: HttpClient,
    private nzMessageService: NzMessageService
  ) { }
}
