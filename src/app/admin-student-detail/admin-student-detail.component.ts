import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../student';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { StudentService }  from '../student.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import {ClassService }  from '../class.service';
import { SchoolClass } from '../class';

@Component({
  selector: 'app-admin-student-detail',
  templateUrl: './admin-student-detail.component.html',
  styleUrls: ['./admin-student-detail.component.css']
})

export class AdminStudentDetailComponent implements OnInit {

@Input() student: Student;
students: Student[];
classes$: Observable<SchoolClass[]>;

studentId: number = +this.route.snapshot.paramMap.get('id');

private searchTerms = new Subject<string>();

  constructor(private route: ActivatedRoute, private studentService: StudentService,
    private location: Location, private classService: ClassService) { }

    search(term: string): void {
      this.searchTerms.next(term);
    }

  ngOnInit(): void {
    this.getStudent();
    this.classes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.classService.searchClasses(term)),
    );
  }

  getStudent(): void {
    this.studentService.getStudentById(this.studentId).subscribe(student => this.student = student);
  }

  save(): void {
    this.studentService.updateStudent(this.student).subscribe(() => this.goBack());
   }

   deleteStudent(student: Student): void {
     this.studentService.deleteStudent(student).subscribe(() => this.goBack());
   }

  goBack(): void {
    this.location.back();
  }

}
