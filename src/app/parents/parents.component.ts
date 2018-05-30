import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Parent } from '../parent';
import { ParentService } from '../parent.service';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css']
})
export class ParentsComponent implements OnInit {

  constructor(private parentService: ParentService, private location: Location ) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

}
