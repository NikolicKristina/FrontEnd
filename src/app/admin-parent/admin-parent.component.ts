import { Component, OnInit } from '@angular/core';
import { Parent } from '../parent';
import { ParentService } from '../parent.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-parent',
  templateUrl: './admin-parent.component.html',
  styleUrls: ['./admin-parent.component.css']
})
export class AdminParentComponent implements OnInit {

  parents: Parent[];
  parents$: Observable<Parent[]>;
  private searchTerms = new Subject<string>();
  angForm: FormGroup;

  constructor(private parentService: ParentService, private location: Location, private fb: FormBuilder) {
  this.createForm()}

  createForm() {
    this.angForm = this.fb.group({
      parentFirstName: ['', Validators.required ],
      parentLastName: ['', Validators.required ],
      parentEmail: ['', Validators.required ],
      parentJmbg: ['', Validators.required ],
      parentAddress: ['', Validators.required ],
      parentDateOfBirth: ['', Validators.required ]
   });
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.parents$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.parentService.searchParents(term)),
    );
  }

  addParent(firstName, lastName, email, jmbg, address, title, dateOfBirth): void {
  this.parentService.addParent({ firstName, lastName, email, jmbg, address, title, dateOfBirth } as Parent)
  .subscribe();
}

  goBack(): void {
    this.location.back();
  }

}
