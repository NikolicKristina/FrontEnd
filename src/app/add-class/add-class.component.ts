import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { SchoolClass } from '../class';
import { StudentService } from '../student.service';
import { ActivatedRoute } from '@angular/router';
import { ClassService }  from '../class.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {

  @Input() schoolClass: SchoolClass;

  constructor(private route: ActivatedRoute, private location: Location,
    private studentService: StudentService, private classService: ClassService,) { }

  ngOnInit() {
    this.getClass();
  }

  addClassToStudent(schoolClass: SchoolClass): void {
    const id = +this.route.snapshot.paramMap.get('sId');
    this.studentService.addClassToStudent(id, schoolClass.id).subscribe(() => this.goBack());
  }

  getClass(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.classService.getClass(id).subscribe(schoolClass => this.schoolClass = schoolClass);
  }

  goBack(): void {
    this.location.back();
  }

}
