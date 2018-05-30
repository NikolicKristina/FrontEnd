import { Injectable } from '@angular/core';
import { Grade } from './grade';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable()
export class GradeService {

  constructor(private http: HttpClient, private messageService: MessageService, private route: ActivatedRoute) { }

  private gradesUrl = 'http://localhost:8080/api/v1/grade';

  getGradesBySubjectAndStudent(studentId: number, subjectId: number): Observable<Grade[]> {
    const url = `${this.gradesUrl}/${studentId}/students?subjectId=${subjectId}`;
    return this.http.get<Grade[]>(url).pipe(
      tap(grades => this.log(`Grades fetched for subjectId: ${subjectId} and studentId: ${studentId}`)),
      catchError(this.handleError('getGradesBySubjectAndStudent', []))
    );
  }

  getGradeFinSem1(studentId: number, subjectId: number): Observable<any> {
    const url = `${this.gradesUrl}/${studentId}/final_grade_sem1?subjectId=${subjectId}`;
    return this.http.get<any>(url).pipe(
      tap(_ => this.log(`Final grade sem1 for subjectId: ${subjectId} studentId: ${studentId}`)),
      catchError(this.handleError<Grade>(`getGradeFinSem1`))
    );
  }

  getFinalGrade(studentId: number, subjectId: number): Observable<any> {
    const url = `${this.gradesUrl}/${studentId}/final_grade?subjectId=${subjectId}`;
    return this.http.get<any>(url).pipe(
      tap(_ => this.log(`Final grade for subjectId: ${subjectId} studentId: ${studentId}`)),
      catchError(this.handleError<Grade>(`getFinalGrade`))
    );
  }

  getGradeById(id: number): Observable<Grade> {
    const url = `${this.gradesUrl}/${id}/by-id`;
    return this.http.get<Grade>(url).pipe(
      tap(_ => this.log(`Grade with id=${id}`)),
      catchError(this.handleError<Grade>(`getGradeById id=${id}`))
    );
  }

  addGrade(grade: Grade, tId: number, subId: number, stId: number ): Observable<Grade> {
    const url = `${this.gradesUrl}/${tId}/${subId}/${stId}`;
    return this.http.post<Grade>(url, grade, httpOptions).pipe(
      tap((grade: Grade) => this.log(`added grade with id=${grade.id}`)),
      catchError(this.handleError<Grade>('addGrade'))
    );
}

  deleteGrade(grade: Grade): Observable<Grade> {
    const url = `${this.gradesUrl}/${grade.id}`;
    return this.http.delete<Grade>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted grade id=${grade.id}`)),
      catchError(this.handleError<Grade>('deleteGrade'))
    );
}

  updateGrade(grade: Grade): Observable<any> {
    const url = `${this.gradesUrl}/${grade.id}`
    return this.http.put(url, grade, httpOptions).pipe(
      tap(_ => this.log(`Updated grade id=${grade.id}`)),
      catchError(this.handleError<any>('updateGrade'))
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
    this.messageService.add('GradeService: ' + message);
  }

}
