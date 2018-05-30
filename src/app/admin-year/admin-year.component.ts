import { Component, OnInit, Input } from '@angular/core';
import { Year } from '../year';
import { YearService } from '../year.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-year',
  templateUrl: './admin-year.component.html',
  styleUrls: ['./admin-year.component.css']
})
export class AdminYearComponent implements OnInit {

  years: Year[];
  years$: Observable<Year[]>;
  private searchTerms = new Subject<string>();
  angForm: FormGroup;

  constructor(private yearService: YearService, private location: Location, private fb: FormBuilder) {
  this.createForm()}

  createForm() {
    this.angForm = this.fb.group({
      yearYear: ['', Validators.required ]
   });
  }

  ngOnInit() {
    this.getYears();
  }

  getYears(): void {
    this.yearService.getYears().subscribe(years => this.years = years);
  }

  addYear(year: number): void {
  this.yearService.addYear({ year } as Year)
  .subscribe(year => {
        this.years.push(year);
      } );
}

deleteYear(year: Year): void {
    this.years = this.years.filter(y => y !== year);
    this.yearService.deleteYear(year).subscribe();
  }

  goBack(): void {
    this.location.back();
  }

}
