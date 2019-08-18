import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { environment } from './environment/environment';



const endpoint = environment.apiUrl + '/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  getUrls(): Observable<any> {
    return this.http.get(endpoint + 'urls', httpOptions).pipe(
      catchError(this.handleError<any>('urls'))
    );
  }

  getNUrls(n): Observable<any> {
    return this.http.get(endpoint + 'urls_N/' + n, httpOptions).pipe(
      catchError(this.handleError<any>('urls_N'))
    );
  }


  getUserUrls(userKey): Observable<any> {
    return this.http.post(endpoint + 'user_urls', {
      userKey
    }, httpOptions).pipe(
      catchError(this.handleError<any>('user_urls'))
    );
  }


  getUrl(shortUrl): Observable<any> {
    return this.http.get(endpoint + 'urls/' + shortUrl, httpOptions).pipe(
      catchError(this.handleError<any>('urls/' + shortUrl))
    );
  }

  loginUser(userInfo): Observable<any> {
    return this.http.post(endpoint + 'login', {
      email: userInfo.email,
      password: userInfo.password
    }, httpOptions).pipe(
      catchError(this.handleError<any>('login '))
    );
  }

  registerUser(userInfo): Observable<any> {
    console.log(userInfo);
    return this.http.post(endpoint + 'sign_up', {
      email: userInfo.email,
      password: userInfo.password,
      username: userInfo.userName,
    }, httpOptions).pipe(
      catchError(this.handleError<any>('sign_up '))
    );
  }

  getUserInfo(userKey): Observable<any> {
    return this.http.post(endpoint + 'user', {
      userKey
    }, httpOptions).pipe(
      catchError(this.handleError<any>('user'))
    );
  }

  createUrl(url, shortUrl = '', token): Observable<any> {
    return this.http.post(endpoint + 'create_url', {
      token : token,
      url: url,
      shortUrl: shortUrl  
    }, httpOptions ).pipe(
      catchError(this.handleError<any>('create_url'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
