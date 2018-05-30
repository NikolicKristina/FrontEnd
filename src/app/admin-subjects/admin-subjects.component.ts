import { Component, OnInit, Input } from '@angular/core';
import { ScSubject } from '../scSubject';
import { ScSubjectService } from '../scSubject.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-subjects',
  templateUrl: './admin-subjects.component.html',
  styleUrls: ['./admin-subjects.component.css']
})
export class AdminSubjectsComponent implements OnInit {

  subjects: ScSubject[];
  subjects$: Observable<ScSubject[]>;
  private searchTerms = new Subject<string>();
  angForm: FormGroup;

  constructor(private scSubjectService: ScSubjectService, private location: Location, private fb: FormBuilder) {
  this.createForm()}

  createForm() {
    this.angForm = this.fb.group({
      subjectName: ['', Validators.required ],
      subjectWeeklyHours: ['', Validators.required ]
   });
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.subjects$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.scSubjectService.searchSubjects(term)),
    );
  }

  addSubject(name, weeklyHours): void {
  this.scSubjectService.addSubject({ name, weeklyHours } as ScSubject)
  .subscribe();
}

  goBack(): void {
    this.location.back();
  }

}
