import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Teacher } from '../teacher';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  constructor(private teacherService: TeacherService, private location: Location) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

}
