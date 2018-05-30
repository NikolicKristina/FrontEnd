import { Component, OnInit } from '@angular/core';
import { Teacher } from '../teacher';
import { SchoolClass } from '../class';
import { ClassService } from '../class.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ScSubject } from '../scSubject';
import { ScSubjectService } from '../scSubject.service';

@Component({
  selector: 'app-teacher-class',
  templateUrl: './teacher-class.component.html',
  styleUrls: ['./teacher-class.component.css']
})
export class TeacherClassComponent implements OnInit {

  schoolClasses: SchoolClass[];
  selectedSchoolClass: SchoolClass;
  subjects: ScSubject[];
  teacherId: number;

  constructor(private classService: ClassService, private route: ActivatedRoute, private location: Location, private scSubjectService: ScSubjectService) { }

  ngOnInit() {
    this.getClassesForTeacher();
  }

  onSelect(schoolClass: SchoolClass): void {
    this.selectedSchoolClass = schoolClass;
  }

  getClassesForTeacher(): void {
    this.teacherId = +this.route.snapshot.paramMap.get('id');
    this.classService.getClassesForTeacher(this.teacherId).subscribe(schoolClasses => this.schoolClasses = schoolClasses);
  }

  getSubjectsForClassAndTeacher(): void {
    this.scSubjectService.getSubjectsForClassAndTeacher(this.teacherId, this.selectedSchoolClass.id).subscribe(subjects => this.subjects = subjects);
  }

  goBack(): void {
    this.location.back();
  }

}
