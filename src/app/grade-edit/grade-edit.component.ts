import { Component, OnInit, Input } from '@angular/core';
import { Grade } from '../grade';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GradeService }  from '../grade.service';

@Component({
  selector: 'app-grade-edit',
  templateUrl: './grade-edit.component.html',
  styleUrls: ['./grade-edit.component.css']
})
export class GradeEditComponent implements OnInit {

  @Input() grade: Grade;
  @Input() finGradeSem1: any;
  @Input() finalGrade: any;
  studentId: number = +this.route.snapshot.paramMap.get('studId');
  subjectId: number = +this.route.snapshot.paramMap.get('subId');
  teacherId: number = +this.route.snapshot.paramMap.get('tId');

  constructor(private gradeService: GradeService, private route: ActivatedRoute,
  private location: Location) { }

  ngOnInit() {
    this.getGrade();
  }

  getGrade(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.gradeService.getGradeById(id).subscribe(grade => this.grade = grade);
  }

  getGradeFinSem1(): void {
    this.gradeService.getGradeFinSem1(this.studentId, this.subjectId).subscribe(finGradeSem1 => this.finGradeSem1 = finGradeSem1);
  }

  getFinalGrade(): void {
    this.gradeService.getFinalGrade(this.studentId, this.subjectId).subscribe(finalGrade => this.finalGrade = finalGrade);
  }

save(): void {
  this.gradeService.updateGrade(this.grade).subscribe(() => this.goBack());
 }

goBack(): void {
  this.location.back();
 }

}
