import { Injectable } from '@angular/core';
import { Student } from './student';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable()
export class StudentService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private studentsUrl = 'http://localhost:8080/api/v1/student';

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl).pipe(
      tap(students => this.log("Students fetched")),
      catchError(this.handleError('getStudents', []))
    );
  }

  getStudentsForParent(id: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.studentsUrl}/${id}/students`).pipe(
      tap(students => this.log(`Students fetched for parent with id=${id}`)),
      catchError(this.handleError('getStudentsForParent', []))
    );
  }

  getStudentsForSubjectAndTeacher(tId: number, sId: number, classId: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.studentsUrl}/${tId}/subject?subjectId=${sId}&classId=${classId}`).pipe(
      tap(students => this.log(`Students fetched for teacher with id=${tId} and subject with id=${sId}`)),
      catchError(this.handleError('getStudentsForSubjectAndTeacher', []))
    );
  }

  getStudentById(id: number): Observable<Student> {
    const url = `${this.studentsUrl}/${id}/by-id`;
    return this.http.get<Student>(url).pipe(
      tap(_ => this.log(`Student with id=${id}`)),
      catchError(this.handleError<Student>(`getStudentById id=${id}`))
    );
  }

  addStudent(student: Student): Observable<Student> {
    const url = `${this.studentsUrl}`;
    return this.http.post<Student>(url, student, httpOptions).pipe(
      tap((student: Student) => this.log(`added student with id=${student.id}`)),
      catchError(this.handleError<Student>('addStudent'))
    );
}

  searchStudents(term: string): Observable<Student[]> {
  if (!term.trim()) {
    return of([]);
  }
  return this.http.get<Student[]>(`${this.studentsUrl}/by-jmbg?jmbg=${term}`).pipe(
    tap(_ => this.log(`found students matching "${term}"`)),
    catchError(this.handleError<Student[]>('searchStudents', [])));
}

  updateStudent(student: Student): Observable<any> {
    const url = `${this.studentsUrl}/${student.id}`
    return this.http.put(url, student, httpOptions).pipe(
      tap(_ => this.log(`Updated student id=${student.id}`)),
      catchError(this.handleError<any>('updateStudent'))
    );
}

  deleteStudent(student: Student): Observable<Student> {
    const url = `${this.studentsUrl}/${student.id}`;
    return this.http.delete<Student>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted student id=${student.id}`)),
      catchError(this.handleError<Student>('deleteStudent'))
    );
}

  addClassToStudent(studId: number, classId: number): Observable<any> {
    const url = `${this.studentsUrl}/${studId}/school_class?classId=${classId}`
    return this.http.put(url, httpOptions).pipe(
      tap(_ => this.log(`Updated student id=${studId}`)),
      catchError(this.handleError<any>('addClassToStudent'))
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
    this.messageService.add('StudentService: ' + message);
}

}
