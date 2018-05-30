import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SchoolClass } from '../class';
import { ClassService } from '../class.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-class-teacher-subject',
  templateUrl: './add-class-teacher-subject.component.html',
  styleUrls: ['./add-class-teacher-subject.component.css']
})
export class AddClassTeacherSubjectComponent implements OnInit {

  classes$: Observable<SchoolClass[]>;
  private searchTerms = new Subject<string>();
  subjectId: number = +this.route.snapshot.paramMap.get('id');

  constructor(private classService: ClassService, private location: Location, private route: ActivatedRoute) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.classes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.classService.searchClasses(term)),
    );
  }

  goBack(): void {
    this.location.back();
  }

}
