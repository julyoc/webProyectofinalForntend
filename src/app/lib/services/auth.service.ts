import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-localstorage';



@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private baseurl = 'https://proyecto-web-freelancer.web.app/api/v0/auth';
  private headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });
  token: any;

  constructor(private auth: AngularFireAuth, private http: HttpClient, private storage: LocalStorageService) { }

  register(data: User) {
    return this.http.post<{id: string, massage: string}>(this.baseurl.concat('/register'), data, {headers: this.headers}).pipe(catchError(this.handleError));
  }

  logout() {
    this.auth.signOut();
    this.headers.delete('user');
    this.storage.remove('user');
  }


  login(email: string, password: string, cb: () => void) {
    this.auth.signInWithEmailAndPassword(email, password).then(values => {
      values.user.getIdToken().then(value => {
        this.storage.set('user', JSON.stringify(values.user));
        this.headers.set('user', JSON.stringify(values.user));
      });
    }).catch(err => {throw err}).finally(() => {
      cb();
    });
  }

  authorize() {
    var uid: string = '';
    if (this.storage.get('user')) uid = JSON.parse(this.storage.get('user')).uid;
    return this.http.post<{id: string, massage: string, role: string}>(this.baseurl.concat('/authorizate'), {uid}, {headers: this.headers}).pipe(catchError(this.handleError));
  }

  currentUser() {
    return this.http.get<User>(this.baseurl.concat('/currentUser'), {headers: this.headers}).pipe(catchError(this.handleError));
  }

  getAllUsers() {
    return this.http.get<User[]>(this.baseurl.concat('/users'), {headers: this.headers}).pipe(catchError(this.handleError));
  }

  updateUser(data: User) {
    return this.http.post<{id: string, massage: string}>(this.baseurl.concat('/update'), data, {headers: this.headers}).pipe(catchError(this.handleError));
  }

  getUser(id: any) {
    return this.http.get<User>(this.baseurl.concat('/user?id=', id), {headers: this.headers}).pipe(catchError(this.handleError));
  }
  getUserByEmail(email: string) {
    return this.http.get<User>(this.baseurl.concat('/user-by-email?email=', email), {headers: this.headers}).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}
