import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Year } from './year';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable()
export class YearService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private yearsUrl = 'http://localhost:8080/api/v1/year';

  getYears(): Observable<Year[]> {
    return this.http.get<Year[]>(this.yearsUrl).pipe(
      tap(years => this.log(`fetched years`)),
      catchError(this.handleError('getYears', []))
    );
  }

  getYear(id: number): Observable<Year> {
  const url = `${this.yearsUrl}/${id}/by-id`;
  return this.http.get<Year>(url).pipe(
    tap(_ => this.log(`fetched Year id=${id}`)),
    catchError(this.handleError<Year>(`getYear id=${id}`))
  );
}

  addYear(year: Year): Observable<Year> {
    const url = `${this.yearsUrl}`;
    return this.http.post<Year>(url, year, httpOptions).pipe(
      tap((year: Year) => this.log(`added year w/ id=${year.id}`)),
      catchError(this.handleError<Year>('addYear'))
    );
}

updateYear(year: Year): Observable<any> {
  const url = `${this.yearsUrl}/${year.id}`
  return this.http.put(url, year, httpOptions).pipe(
    tap(_ => this.log(`Updated year with id=${year.id}`),
    catchError(this.handleError<any>('updateYear')))
  );
}

deleteYear(year: Year): Observable<Year> {
  const url = `${this.yearsUrl}/${year.id}`;
  return this.http.delete<Year>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted year id=${year.id}`)),
    catchError(this.handleError<Year>('deleteYear'))
  );
}

private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

private log(message: string) {
  this.messageService.add('SubjectService: ' + message);
}

}
