import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GradeService }  from '../grade.service';
import { Grade } from '../grade';
import { Student } from '../student';
import { GradeType} from '../gradeType';

@Component({
  selector: 'app-gradeing',
  templateUrl: './gradeing.component.html',
  styleUrls: ['./gradeing.component.css']
})
export class GradeingComponent implements OnInit {

  grades: Grade[];
  grade: Grade;
  studentId: number = +this.route.snapshot.paramMap.get('studId');
  subjectId: number = +this.route.snapshot.paramMap.get('subId');
  teacherId: number = +this.route.snapshot.paramMap.get('tId');
  classId: number = +this.route.snapshot.paramMap.get('cId');
  finGradeSem1: number = (this.getGradeFinSem1() ? this.finGradeSem1 : 0.0);
  finalGrade: number = (this.getFinalGrade() ? this.finalGrade : 0.0);

  constructor(private gradeService: GradeService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.getGradesBySubjectAndStudent();
  }

  getGradesBySubjectAndStudent(): void {
    this.gradeService.getGradesBySubjectAndStudent(this.studentId, this.subjectId).subscribe(grades => this.grades = grades);
  }

  getGradeFinSem1(): void {
    this.gradeService.getGradeFinSem1(this.studentId, this.subjectId).subscribe(finGradeSem1 => this.finGradeSem1 = finGradeSem1);
  }

  getFinalGrade(): void {
    this.gradeService.getFinalGrade(this.studentId, this.subjectId).subscribe(finalGrade => this.finalGrade = finalGrade);
  }

  addGrade(value, type, semester): void {
  this.gradeService.addGrade({ value, type, semester } as Grade, this.teacherId, this.subjectId,  this.studentId )
    .subscribe(grade => {
      this.grades.push(grade);
    });
  }

  deleteGrade(grade): void {
    this.grades = this.grades.filter(g => g !== grade);
    this.gradeService.deleteGrade(grade).subscribe();
  }

  goBack(): void {
    this.location.back();
  }

}
