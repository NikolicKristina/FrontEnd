import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { ActivatedRoute } from '@angular/router';
import { ParentService }  from '../parent.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  @Input() student: Student;

  constructor(private route: ActivatedRoute, private location: Location,
    private studentService: StudentService, private parentService: ParentService) { }

  ngOnInit() {
    this.getStudent();
  }

  addStudentToParent(student: Student): void {
    const id = +this.route.snapshot.paramMap.get('pId');
    this.parentService.addStudentToParent(id, student.id).subscribe(() => this.goBack());
  }

  getStudent(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.studentService.getStudentById(id).subscribe(student => this.student = student);
  }

  goBack(): void {
    this.location.back();
  }

}
