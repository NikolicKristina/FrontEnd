import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SchoolClass }         from '../class';
import { ClassService }  from '../class.service';
import { Year } from '../year';
import { YearService } from '../year.service';

@Component({
  selector: 'app-admin-class-detail',
  templateUrl: './admin-class-detail.component.html',
  styleUrls: ['./admin-class-detail.component.css']
})
export class AdminClassDetailComponent implements OnInit {

  @Input() schoolClass: SchoolClass;
  classes: SchoolClass[];
  year: Year;
  years: Year[];

  constructor(private route: ActivatedRoute, private classService: ClassService, private location: Location,
  private yearService: YearService) { }

  ngOnInit(): void {
    this.getClass();
  }

  getClass(): void {
  const id = +this.route.snapshot.paramMap.get('id');
  this.classService.getClass(id)
    .subscribe(schoolClass => this.schoolClass = schoolClass);
}

save(): void {
   this.classService.updateClass(this.schoolClass)
     .subscribe(() => this.goBack());
 }

 deleteClass(schoolClass: SchoolClass): void {
     this.classService.deleteClass(schoolClass).subscribe(() => this.goBack());
   }

 getYears(): void {
   this.yearService.getYears().subscribe(years => this.years = years);
 }

 addYearToClass(year: Year): void {
   const classId = +this.route.snapshot.paramMap.get('id');
   this.classService.addYearToClass(classId, year.id).subscribe(() => this.goBack());
 }

 goBack(): void {
  this.location.back();
}

}
