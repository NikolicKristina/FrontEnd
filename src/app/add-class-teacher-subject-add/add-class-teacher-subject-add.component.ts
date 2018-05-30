import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SchoolClass } from '../class';
import { ClassService } from '../class.service';
import { ActivatedRoute } from '@angular/router';
import { Teacher } from '../teacher';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-add-class-teacher-subject-add',
  templateUrl: './add-class-teacher-subject-add.component.html',
  styleUrls: ['./add-class-teacher-subject-add.component.css']
})
export class AddClassTeacherSubjectAddComponent implements OnInit {

    @Input() schoolClass: SchoolClass;
    teachers$: Observable<Teacher[]>;
    private searchTerms = new Subject<string>();
    subjectId: number = +this.route.snapshot.paramMap.get('sId');
    classId: number = +this.route.snapshot.paramMap.get('id');

    constructor(private teacherService: TeacherService, private location: Location,
      private route: ActivatedRoute, private classService: ClassService) { }

    search(term: string): void {
      this.searchTerms.next(term);
    }

    ngOnInit() {
      this.getClass();
      this.teachers$ = this.searchTerms.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => this.teacherService.searchTeachers(term)),
      );
    }

    getClass(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.classService.getClass(id)
      .subscribe(schoolClass => this.schoolClass = schoolClass);
  }

    goBack(): void {
      this.location.back();
    }

}
