import { Injectable } from '@angular/core';
import { ScSubject } from './scSubject';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Teacher } from './teacher';
import { catchError, map, tap } from 'rxjs/operators';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable()
export class ScSubjectService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private subjectsUrl = 'http://localhost:8080/api/v1/subject';

  getSubjectsForStudent(id: number): Observable<ScSubject[]> {
    this.log(`Subjects fetched for student with id=${id}`);
    const url = `${this.subjectsUrl}/${id}/student`;
    return this.http.get<ScSubject[]>(url).pipe(
      tap(subjects => this.log(`Subjects fetched for student with id=${id}`)),
      catchError(this.handleError('getSubjectsForStudent', []))
    );
  }

  getSubjectsForClassAndTeacher(tId: number, cId: number): Observable<ScSubject[]> {
    this.log(`Predmeti za odeljenje id: ${cId} i nastavnika id: ${tId} `);
    const url = `${this.subjectsUrl}/${tId}/class?classId=${cId}`;
    return this.http.get<ScSubject[]>(url).pipe(
      tap(subjects => this.log(`Subjects fetched for class id: ${cId} and teacher id: ${tId}` )),
      catchError(this.handleError('getSubjectsForClassAndTeacher', []))
    );
  }

  getSubjectById(id: number): Observable<ScSubject> {
    const url = `${this.subjectsUrl}/${id}/by-id`;
    return this.http.get<ScSubject>(url).pipe(
      tap(_ => this.log(`Subject with id=${id}`)),
      catchError(this.handleError<ScSubject>(`getSubjectById id=${id}`))
    );
  }

  addSubject(subject: ScSubject): Observable<ScSubject> {
    const url = `${this.subjectsUrl}`;
    return this.http.post<ScSubject>(url, subject, httpOptions).pipe(
      tap((subject: ScSubject) => this.log(`added subject w/ id=${subject.id}`)),
      catchError(this.handleError<ScSubject>('addSubject'))
    );
}

addYearToSubject(subjectId: number, yearId: number): Observable<any> {
  const url = `${this.subjectsUrl}/${subjectId}/year?yearId=${yearId}`;
  return this.http.put(url, httpOptions).pipe(
    tap(_ => this.log(`Updated subject id=${subjectId}`)),
    catchError(this.handleError<any>('addYearToSubject'))
  );
}

addTeacherAndClassToSubject(subjectId: number, teacherId: number, classId: number): Observable<any> {
  const url = `${this.subjectsUrl}/${subjectId}/teacher/class?teacherId=${teacherId}&classId=${classId}`;
  return this.http.put(url, httpOptions).pipe(
    tap(_ => this.log(`Updated subject id=${subjectId}`)),
    catchError(this.handleError<any>('addTeacherAndClassToSubject'))
  );
}

  searchSubjects(term: string): Observable<ScSubject[]> {
  if (!term.trim()) {
    return of([]);
  }
  return this.http.get<ScSubject[]>(`${this.subjectsUrl}/by-name?name=${term}`);
}

  updateSubject(subject: ScSubject): Observable<any> {
    this.log(`Updated subject with id=${subject.id}`)
    const url = `${this.subjectsUrl}/${subject.id}`
    return this.http.put(url, subject, httpOptions).pipe(
      tap(_ => this.log(`Updated subject id=${subject.id}`)),
      catchError(this.handleError<any>('updateSubject'))
    );
}

  deleteSubject(subject: ScSubject): Observable<ScSubject> {
    const url = `${this.subjectsUrl}/${subject.id}`;
    return this.http.delete<ScSubject>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted subject id=${subject.id}`)),
      catchError(this.handleError<ScSubject>('deleteSubject'))
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
