import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subject, Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  //private serviceUrl = 'https://#######ognitiveservices.azure.com/vision/v2.0/analyze?visualFeatures=Objects,Description&language=en';
  private serviceUrl = 'https://southcentralus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/#####s/Iteration3/url';
  //private subscriptionKey = '####';
  private PredictionKey = '#####';
  
  constructor(private http: HttpClient) { }

  getImageDetails(imageURL :String): Observable<any>{
    //const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Ocp-Apim-Subscription-Key': this.subscriptionKey });
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Prediction-Key': this.PredictionKey });
    console.log('Image: ' + imageURL);
    return this.http.post<any>(this.serviceUrl, {url:imageURL}, { headers: headers })
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
