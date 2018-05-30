import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-student',
  templateUrl: './admin-student.component.html',
  styleUrls: ['./admin-student.component.css']
})
export class AdminStudentComponent implements OnInit {

  students: Student[];
  students$: Observable<Student[]>;
  private searchTerms = new Subject<string>();
  angForm: FormGroup;

  constructor( private studentService: StudentService, private location: Location, private fb: FormBuilder) {
  this.createForm()}

  createForm() {
    this.angForm = this.fb.group({
      studentFirstName: ['', Validators.required ],
      studentLastName: ['', Validators.required ],
      studentEmail: ['', Validators.required ],
      studentJmbg: ['', Validators.required ],
      studentAddress: ['', Validators.required ],
      studentDateOfBirth: ['', Validators.required ]
   });
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.students$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.studentService.searchStudents(term)),
    );
  }

  addStudent(firstName, lastName, email, jmbg, address, title, dateOfBirth): void {
  this.studentService.addStudent({ firstName, lastName, email, jmbg, address, title, dateOfBirth } as Student)
  .subscribe();
}

  goBack(): void {
    this.location.back();
  }

}
