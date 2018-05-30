import { Component, OnInit } from '@angular/core';
import { Year } from '../year';
import { YearService } from '../year.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ScSubjectService }  from '../scSubject.service';

@Component({
  selector: 'app-add-year-subject',
  templateUrl: './add-year-subject.component.html',
  styleUrls: ['./add-year-subject.component.css']
})
export class AddYearSubjectComponent implements OnInit {

  years: Year[];

  constructor(private route: ActivatedRoute, private scSubjectService: ScSubjectService,
    private location: Location, private yearService: YearService) { }

  ngOnInit() {
    this.getYears();
  }

  getYears(): void {
    this.yearService.getYears().subscribe( years => this.years = years);
  }

  addYearToSubject(year: Year): void {
    const subjectId = +this.route.snapshot.paramMap.get('id');
    this.scSubjectService.addYearToSubject(subjectId, year.id).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
