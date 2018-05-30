import { Component, OnInit, Input } from '@angular/core';
import { SchoolClass } from '../class';
import { ClassService } from '../class.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-class',
  templateUrl: './admin-class.component.html',
  styleUrls: ['./admin-class.component.css']
})
export class AdminClassComponent implements OnInit {

  constructor(private classService: ClassService, private location: Location, private fb: FormBuilder) {
  this.createForm()}

  createForm() {
    this.angForm = this.fb.group({
      schoolClassClassSign: ['', Validators.required ]
   });
  }

  classes: SchoolClass[];
  classes$: Observable<SchoolClass[]>;
  private searchTerms = new Subject<string>();
  angForm: FormGroup;

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

  addClass(classSign: string ): void {
  this.classService.addClass({ classSign } as SchoolClass)
  .subscribe();
}

  goBack(): void {
    this.location.back();
  }

}
