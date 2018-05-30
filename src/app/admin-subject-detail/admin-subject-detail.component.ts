import { Component, OnInit, Input } from '@angular/core';
import { ScSubject } from '../scSubject';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ScSubjectService }  from '../scSubject.service';

@Component({
  selector: 'app-admin-subject-detail',
  templateUrl: './admin-subject-detail.component.html',
  styleUrls: ['./admin-subject-detail.component.css']
})
export class AdminSubjectDetailComponent implements OnInit {

  @Input() subject: ScSubject;
  subjects: ScSubject[];

  constructor(private route: ActivatedRoute, private scSubjectService: ScSubjectService,
    private location: Location) { }

  ngOnInit() {
    this.getSubject();
  }

  getSubject(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.scSubjectService.getSubjectById(id).subscribe(subject => this.subject = subject);
  }

  save(): void {
    this.scSubjectService.updateSubject(this.subject).subscribe(() => this.goBack());
   }

   deleteSubject(subject: ScSubject): void {
     this.scSubjectService.deleteSubject(subject).subscribe(() => this.goBack());
   }

  goBack(): void {
    this.location.back();
  }

}
