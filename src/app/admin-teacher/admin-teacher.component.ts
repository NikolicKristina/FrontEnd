import { Component, OnInit } from '@angular/core';
import { Teacher } from '../teacher';
import { TeacherService } from '../teacher.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-teacher',
  templateUrl: './admin-teacher.component.html',
  styleUrls: ['./admin-teacher.component.css']
})
export class AdminTeacherComponent implements OnInit {

  teachers: Teacher[];
  teachers$: Observable<Teacher[]>;
  private searchTerms = new Subject<string>();
  angForm: FormGroup;

  constructor(private teacherService: TeacherService, private location: Location, private fb: FormBuilder) {
  this.createForm()}

  createForm() {
    this.angForm = this.fb.group({
      teacherFirstName: ['', Validators.required ],
      teacherLastName: ['', Validators.required ],
      teacherEmail: ['', Validators.required ],
      teacherJmbg: ['', Validators.required ],
      teacherAddress: ['', Validators.required ],
      teacherDateOfBirth: ['', Validators.required ]
   });
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.teachers$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.teacherService.searchTeachers(term)),
    );
  }

  addTeacher(firstName, lastName, email, jmbg, address, title, dateOfBirth): void {
  this.teacherService.addTeacher({ firstName, lastName, email, jmbg, address, title, dateOfBirth } as Teacher)
  .subscribe();
}

  goBack(): void {
    this.location.back();
  }

}
