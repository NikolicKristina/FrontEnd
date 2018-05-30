import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Teacher } from '../teacher';
import { TeacherService } from '../teacher.service';
import { ScSubjectService } from '../scSubject.service';

@Component({
  selector: 'app-add-class-teacher-add-subject-add',
  templateUrl: './add-class-teacher-add-subject-add.component.html',
  styleUrls: ['./add-class-teacher-add-subject-add.component.css']
})
export class AddClassTeacherAddSubjectAddComponent implements OnInit {

  @Input() teacher: Teacher;
  subjectId: number = +this.route.snapshot.paramMap.get('sId');
  classId: number = +this.route.snapshot.paramMap.get('cId');
  teacherId: number = +this.route.snapshot.paramMap.get('id');

  constructor(private teacherService: TeacherService, private location: Location,
    private route: ActivatedRoute, private scSubjectService: ScSubjectService) { }

  ngOnInit() {
    this.getTeacherById();
  }

  getTeacherById(): void {
    this.teacherService.getTeacherById(this.teacherId).subscribe(teacher => this.teacher = teacher);
  }

  addTeacherAndClassToSubject(teacher): void {
    this.scSubjectService.addTeacherAndClassToSubject(this.subjectId, teacher.id, this.classId).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
