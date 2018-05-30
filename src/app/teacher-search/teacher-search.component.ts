import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';

import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

import { Teacher } from '../teacher';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-teacher-search',
  templateUrl: './teacher-search.component.html',
  styleUrls: ['./teacher-search.component.css']
})
export class TeacherSearchComponent implements OnInit {

  teachers$: Observable<Teacher[]>;
  private searchTerms = new Subject<string>();

  constructor(private teacherService: TeacherService) {}

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

}
