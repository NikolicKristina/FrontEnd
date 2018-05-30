import { Component, OnInit } from '@angular/core';
import { Parent } from '../parent';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-parent-student',
  templateUrl: './parent-student.component.html',
  styleUrls: ['./parent-student.component.css']
})
export class ParentStudentComponent implements OnInit {

  students: Student[];

  constructor(private studentService: StudentService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.getStudentsForParent();
  }

  getStudentsForParent(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.studentService.getStudentsForParent(id).subscribe(students => this.students = students);
  }

  goBack(): void {
    this.location.back();
  }

}
