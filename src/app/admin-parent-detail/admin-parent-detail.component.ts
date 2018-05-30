import { Component, OnInit, Input } from '@angular/core';
import { Parent } from '../parent';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ParentService }  from '../parent.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-admin-parent-detail',
  templateUrl: './admin-parent-detail.component.html',
  styleUrls: ['./admin-parent-detail.component.css']
})
export class AdminParentDetailComponent implements OnInit {

  @Input() parent: Parent;
  parents: Parent[];
  students$: Observable<Student[]>;

  parentId: number = +this.route.snapshot.paramMap.get('id');

  private searchTerms = new Subject<string>();

  constructor(private route: ActivatedRoute, private parentService: ParentService,
    private location: Location, private studentService: StudentService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
      this.getParent();
      this.students$ = this.searchTerms.pipe(
        // wait 300ms after each keystroke before considering the term
        debounceTime(300),

        // ignore new term if same as previous term
        distinctUntilChanged(),

        // switch to new search observable each time the term changes
        switchMap((term: string) => this.studentService.searchStudents(term)),
      );
  }

  getParent(): void {
    this.parentService.getParentById(this.parentId).subscribe(parent => this.parent = parent);
  }

  save(): void {
    this.parentService.updateParent(this.parent).subscribe(() => this.goBack());
   }

   deleteParent(parent: Parent): void {
     this.parentService.deleteParent(parent).subscribe(() => this.goBack());
   }

  goBack(): void {
    this.location.back();
  }

}
