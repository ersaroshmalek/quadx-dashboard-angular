import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  assetUrl = 'http://www.localhost:5000/api/v1/asset/data'

  constructor(private http: HttpClient) {}

  getAssetById(assetId,startDate,endDate){
    let params = new HttpParams();
    params = params.append('lte',startDate) 
    params = params.append('gte',endDate) 
    const url = `${this.assetUrl}/${assetId}`;
    return this.http.get(url, {params: params}).pipe(
      tap(data => console.log('Asset id fetched: ' + JSON.stringify(data))),
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
