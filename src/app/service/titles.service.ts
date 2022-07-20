import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, retry, throwError, from } from 'rxjs';
import { Title } from '../data/title';
import titles from '../data/titles';


@Injectable({
  providedIn: 'root'
})
export class TitlesService {

  private titlesUrl = "/assets/titles.json";
  constructor(private httpClient: HttpClient) { } //for further user

  getTitles(startsWith?: string): Observable<Title[]> {
    let params = startsWith ? new HttpParams().set('startsWith', startsWith) : undefined;
    return this.httpClient.get<Title[]>(this.titlesUrl, { params })
      .pipe(retry(3), catchError(this.httpErrorHandler));
  }

  getStaticTitles(){
    return from<Title[]>(titles);
  }

  private httpErrorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("The error message is " + error.message);
    } else {
      console.error(
        "Error:  " + error.status + " and the error returned is " + error.message);
    }
    return throwError("Error occurred. Pleas try again");
  }
}
