import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Parent } from './parent';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable()
export class ParentService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private parentsUrl = 'http://localhost:8080/api/v1/parent';

  getParents(): Observable<Parent[]> {
    return this.http.get<Parent[]>(this.parentsUrl).pipe(
      tap(parents => this.log("Parents fetched")),
      catchError(this.handleError('getParents', []))
    );
  }

  getParentById(id: number): Observable<Parent> {
    const url = `${this.parentsUrl}/${id}/by-id`;
    return this.http.get<Parent>(url).pipe(
      tap(_ => this.log(`Parent with id=${id}`)),
      catchError(this.handleError<Parent>(`getParentById id=${id}`))
    );
  }

  addParent(parent: Parent): Observable<Parent> {
    const url = `${this.parentsUrl}`;
    return this.http.post<Parent>(url, parent, httpOptions).pipe(
      tap((parent: Parent) => this.log(`added parent with id=${parent.id}`)),
      catchError(this.handleError<Parent>('addParent'))
    );
}

  addStudentToParent(parentId: number, studentId: number): Observable<any> {
    const url = `${this.parentsUrl}/${parentId}/student?studentId=${studentId}`;
    return this.http.put(url, httpOptions).pipe(
      tap(_ => this.log(`Updated parent id=${parentId}`)),
      catchError(this.handleError<any>('addStudentToParent'))
    );
}

  searchParents(term: string): Observable<Parent[]> {
  if (!term.trim()) {
    return of([]);
  }
  return this.http.get<Parent[]>(`${this.parentsUrl}/by-jmbg?jmbg=${term}`).pipe(
    tap(_ => this.log(`found parents matching "${term}"`)),
    catchError(this.handleError<Parent[]>('searchParents', [])));
}

  updateParent(parent: Parent): Observable<any> {
    this.log(`Updated parent id=${parent.id}`)
    const url = `${this.parentsUrl}/${parent.id}`
    return this.http.put(url, parent, httpOptions).pipe(
      tap(_ => this.log(`Updated parent id=${parent.id}`)),
      catchError(this.handleError<any>('updateParent'))
    );
}

  deleteParent(parent: Parent): Observable<Parent> {
    const url = `${this.parentsUrl}/${parent.id}`;
    return this.http.delete<Parent>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted parent id=${parent.id}`)),
      catchError(this.handleError<Parent>('deleteStudent'))
    );
}

private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    this.log(`${operation} failed ${error.message}`);
    return of(result as T);
  }
}

  private log(message: string) {
    this.messageService.add('ParentService: ' + message);
}

}
