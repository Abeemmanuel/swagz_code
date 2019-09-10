import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subject, Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Event, CarbReq } from '../_models/event.model';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private eventsUrl = 'https://bsmart-functions.azurewebsites.net/api/addEventData?#####';
  private carbsUrl = 'https://bsmart-functions.azurewebsites.net/api/getCarbs?#####';

  constructor(private http: HttpClient) { }

  saveEvent(event :Event): Observable<Event>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('Saved: ' + JSON.stringify(event));
    return this.http.post<Event>(this.eventsUrl, event, { headers: headers })
    .pipe(
      tap(data => console.log('Saved: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getCarbs(carbReq :CarbReq): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('Saved: ' + JSON.stringify(event));
    return this.http.post<any>(this.carbsUrl, carbReq, { headers: headers })
    .pipe(
      tap(data => console.log('Saved: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
