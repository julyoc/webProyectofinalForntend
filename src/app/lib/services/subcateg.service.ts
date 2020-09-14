import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SubcategService {

  private baseurl = 'https://proyecto-web-freelancer.web.app/api/v0/subcateg';
  private id: any;
  private headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });

  setCateg(id) {
    this.baseurl = this.baseurl.concat('/', id);
  }

  constructor(private http: HttpClient, actrute: ActivatedRoute) {
    actrute.queryParams.subscribe(value => {
      if (value.id) this.setCateg(value.id);
      if (value.id) this.id = value.id;
    });
  }

  getAll() {
    return this.http.get<Category[]>(this.baseurl, {headers: this.headers}).pipe(catchError(this.handleError));
  }

  get(id: any) {
    return this.http.get<Category>(this.baseurl.concat('?id=', id), {headers: this.headers}).pipe(catchError(this.handleError));
  }

  add(data: Category) {
    return this.http.post<{id: string, massage: string}>(this.baseurl, data, {headers: this.headers}).pipe(catchError(this.handleError));
  }

  update(id: any, data: Category) {
    return this.http.put<{id: string, massage: string}>(this.baseurl.concat('?id=', id), data, {headers: this.headers}).pipe(catchError(this.handleError));
  }

  delete(id: any) {
    return this.http.delete<{id: string, massage: string}>(this.baseurl.concat('?id=', id), {headers: this.headers}).pipe(catchError(this.handleError));
  }

  len(id?: any) {
    if (id || this.id) {
      return this.http.get<{len: number}>(this.baseurl.concat('/', id, '/length'), {headers: this.headers}).pipe(catchError(this.handleError));
    }
    return this.http.get<{len: number}>(this.baseurl.concat('/length'), {headers: this.headers}).pipe(catchError(this.handleError));
  }

  pag(size: number, page: number) {
    return this.http.get<Category[]>(this.baseurl.concat('/', size.toString(), '/', page.toString()), {headers: this.headers}).pipe(catchError(this.handleError));
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
