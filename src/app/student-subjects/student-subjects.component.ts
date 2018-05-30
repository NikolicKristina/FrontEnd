import { Component, OnInit, Input } from '@angular/core';
import { ScSubject } from '../scSubject';
import { ScSubjectService } from '../scSubject.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../student';
import { GradeService }  from '../grade.service';
import { Grade } from '../grade';

@Component({
  selector: 'app-student-subjects',
  templateUrl: './student-subjects.component.html',
  styleUrls: ['./student-subjects.component.css']
})
export class StudentSubjectsComponent implements OnInit {

  subjects: ScSubject[];
  selectedSubject: ScSubject;
  grades: Grade[];

  constructor(private gradeService: GradeService, private route: ActivatedRoute, private scSubjectService: ScSubjectService, private location: Location) { }

  ngOnInit() {
    this.getSubjectsForStudent();
  }

  onSelect(subject: ScSubject): void {
    this.selectedSubject = subject;
  }

  getGradesBySubjectAndStudent(): void {
    const studentId = +this.route.snapshot.paramMap.get('id');
    const subjectId = this.selectedSubject.id;
    this.gradeService.getGradesBySubjectAndStudent(studentId, subjectId).subscribe(grades => this.grades = grades);
  }

  getSubjectsForStudent(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.scSubjectService.getSubjectsForStudent(id).subscribe(subjects => this.subjects = subjects);
  }

  goBack(): void {
    this.location.back();
  }

}
