import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../student.service';
import { Student } from '../student';

@Component({
  selector: 'app-teacher-student',
  templateUrl: './teacher-student.component.html',
  styleUrls: ['./teacher-student.component.css']
})
export class TeacherStudentComponent implements OnInit {


  students: Student[];
  subjectId: number = +this.route.snapshot.paramMap.get('subId');
  teacherId: number = +this.route.snapshot.paramMap.get('tId');
  classId: number= +this.route.snapshot.paramMap.get('cId');;

  constructor(private route: ActivatedRoute, private location: Location, private studentService: StudentService) { }

  ngOnInit() {
    this.getStudentsForSubjectAndTeacher();
  }

getStudentsForSubjectAndTeacher(): void {
  this.studentService.getStudentsForSubjectAndTeacher(this.teacherId, this.subjectId, this.classId).subscribe(students => this.students = students)
}

goBack(): void {
  this.location.back();
}

}
