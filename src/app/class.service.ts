import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SchoolClass } from './class';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable()
export class ClassService {

private classUrl = 'http://localhost:8080/api/v1/class';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getClasses(): Observable<SchoolClass[]> {
    return this.http.get<SchoolClass[]>(this.classUrl).pipe(
      tap(classes => this.log(`fetched classes`)),
      catchError(this.handleError('getClasses', []))
    );
  }

  getClass(id: number): Observable<SchoolClass> {
  const url = `${this.classUrl}/${id}/by-id`;
  return this.http.get<SchoolClass>(url).pipe(
    tap(_ => this.log(`fetched class id=${id}`)),
    catchError(this.handleError<SchoolClass>(`getClass id=${id}`))
  );
}

  addClass(schoolClass: SchoolClass): Observable<SchoolClass> {
    const url = `${this.classUrl}`;
    return this.http.post<SchoolClass>(url, schoolClass, httpOptions).pipe(
      tap((schoolClass: SchoolClass) => this.log(`added class w/ id=${schoolClass.id}`)),
      catchError(this.handleError<SchoolClass>('addClass'))
    );
}

updateClass(schoolClass: SchoolClass): Observable<any> {
  const url = `${this.classUrl}/${schoolClass.id}`
  return this.http.put(url, schoolClass, httpOptions).pipe(
    tap(_ => this.log(`Updated class with id=${schoolClass.id}`)),
    catchError(this.handleError<any>('updateClass'))
  );
}

addYearToClass(classId: number, yearId: number): Observable<any> {
  const url = `${this.classUrl}/${classId}/year?yearId=${yearId}`
  return this.http.put(url, httpOptions).pipe(
    tap(_ => this.log(`Updated class id=${classId}`)),
    catchError(this.handleError<any>('updateClass'))
  );;
}

deleteClass(schoolClass: SchoolClass): Observable<SchoolClass> {
  const url = `${this.classUrl}/${schoolClass.id}`;
  return this.http.delete<SchoolClass>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted class id=${schoolClass.id}`)),
    catchError(this.handleError<SchoolClass>('deleteClass'))
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

  getClassesForTeacher(id: number): Observable<SchoolClass[]> {
    const url = `${this.classUrl}/${id}/by-teacher`;
    return this.http.get<SchoolClass[]>(url).pipe(
      tap(classes => this.log(`Classes fetched for teacher with id=${id}`)),
      catchError(this.handleError('getClassesForTeacher', []))
    );
  }

  searchClasses(term: string): Observable<SchoolClass[]> {
  if (!term.trim()) {
    return of([]);
  }
  return this.http.get<SchoolClass[]>(`${this.classUrl}/by-sign?classSign=${term}`).pipe(
    tap(_ => this.log(`found classes matching "${term}"`)),
    catchError(this.handleError<SchoolClass[]>('searchClasses', [])));
}

  private log(message: string) {
    this.messageService.add('ClassService: ' + message);
  }
}
