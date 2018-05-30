import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Teacher } from './teacher';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable()
export class TeacherService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private teachersUrl = 'http://localhost:8080/api/v1/teacher';

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.teachersUrl).pipe(
      tap(teachers => this.log("Teachers fetched")),
      catchError(this.handleError('getTeachers', []))
    );
  }

  getTeacherById(id: number): Observable<Teacher> {
    const url = `${this.teachersUrl}/${id}/by-id`;
    return this.http.get<Teacher>(url).pipe(
      tap(_ => this.log(`Teacher with id=${id}`)),
      catchError(this.handleError<Teacher>(`getTeacherById id=${id}`))
    );
  }

  addTeacher(teacher: Teacher): Observable<Teacher> {
    const url = `${this.teachersUrl}`;
    return this.http.post<Teacher>(url, teacher, httpOptions).pipe(
      tap((teacher: Teacher) => this.log(`added student with id=${teacher.id}`)),
      catchError(this.handleError<Teacher>('addTeacher'))
    );
}

  searchTeachers(term: string): Observable<Teacher[]> {
  if (!term.trim()) {
    return of([]);
  }
  return this.http.get<Teacher[]>(`${this.teachersUrl}/by-jmbg?jmbg=${term}`).pipe(
    tap(_ => this.log(`found teachers matching "${term}"`)),
    catchError(this.handleError<Teacher[]>('searchTeachers', [])));
}

updateTeacher(teacher: Teacher): Observable<any> {
  const url = `${this.teachersUrl}/${teacher.id}`
  return this.http.put(url, teacher, httpOptions).pipe(
    tap(_ => this.log(`Updated teacher id=${teacher.id}`)),
    catchError(this.handleError<any>('updateTeacher'))
  );
}

deleteTeacher(teacher: Teacher): Observable<Teacher> {
  const url = `${this.teachersUrl}/${teacher.id}`;
  return this.http.delete<Teacher>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted teacher id=${teacher.id}`)),
    catchError(this.handleError<Teacher>('deleteStudent'))
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
  this.messageService.add('TeacherService: ' + message);
}

}
