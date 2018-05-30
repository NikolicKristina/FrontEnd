import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Year }         from '../year';
import { YearService }  from '../year.service';

@Component({
  selector: 'app-admin-year-detail',
  templateUrl: './admin-year-detail.component.html',
  styleUrls: ['./admin-year-detail.component.css']
})
export class AdminYearDetailComponent implements OnInit {

  @Input() year: Year;

  constructor(private route: ActivatedRoute, private yearService: YearService, private location: Location) { }

  ngOnInit(): void {
    this.getYear();
  }

  getYear(): void {
  const id = +this.route.snapshot.paramMap.get('id');
  this.yearService.getYear(id)
    .subscribe(year => this.year = year);
}

save(): void {
   this.yearService.updateYear(this.year)
     .subscribe(() => this.goBack());
 }

 goBack(): void {
  this.location.back();
}

}
