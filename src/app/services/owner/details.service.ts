import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment'

interface owner {
  user_name:string;
  email:string;
  owner_name:string;
  address:{
    city:string;
    country:string;
    postalcode:number
  };
    owner_details:{
      org:{
        name:string;
        info:string
      },
      title:string;
      phone:number;
      brief:string
    };
    owner_id:string;
    avatar:string;
}

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  baseUrl = environment.ownerUrl

  constructor(private http: HttpClient) { }

  getOwnerDetail(): Observable<owner> {
    return this.http.get<owner>(this.baseUrl).pipe(
      tap(),
      catchError(this.handleError))
    }

  private handleError(err: HttpErrorResponse) {
    let errMsg = '';
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', err.error.message);
      errMsg = err.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(`Backend returned code`,err);
      errMsg = err.error.message;
    }
    return throwError(errMsg);
  }
}
