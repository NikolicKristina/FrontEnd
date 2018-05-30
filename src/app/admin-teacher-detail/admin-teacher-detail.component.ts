import { Component, OnInit, Input } from '@angular/core';
import { Teacher } from '../teacher';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TeacherService }  from '../teacher.service';

@Component({
  selector: 'app-admin-teacher-detail',
  templateUrl: './admin-teacher-detail.component.html',
  styleUrls: ['./admin-teacher-detail.component.css']
})
export class AdminTeacherDetailComponent implements OnInit {

  @Input() teacher: Teacher;
  teachers: Teacher[];

  constructor(private route: ActivatedRoute, private teacherService: TeacherService,
    private location: Location) { }

  ngOnInit() {
    this.getTeacher();
  }

  getTeacher(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.teacherService.getTeacherById(id).subscribe(teacher => this.teacher = teacher);
  }

  save(): void {
    this.teacherService.updateTeacher(this.teacher).subscribe(() => this.goBack());
   }

   deleteTeacher(teacher: Teacher): void {
     this.teacherService.deleteTeacher(teacher).subscribe(() => this.goBack());
   }

  goBack(): void {
    this.location.back();
  }

}
