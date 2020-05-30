import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

interface myData {
  data: object; 
}
@Injectable({
  providedIn: 'root'
})
export class OverviewService {

  assetUrl = 'http://localhost:5000/api/v1/asset'

  constructor(private http: HttpClient) { }

  getAssetById(): Observable<any[]> {
    return this.http.get<any[]>(this.assetUrl).pipe(
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
      console.log(`Backend returned code ${err.status}`);
      errMsg = err.error.status;
    }
    return throwError(errMsg);
  }
}
