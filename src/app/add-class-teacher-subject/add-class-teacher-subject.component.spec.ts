import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClassTeacherSubjectComponent } from './add-class-teacher-subject.component';

describe('AddClassTeacherSubjectComponent', () => {
  let component: AddClassTeacherSubjectComponent;
  let fixture: ComponentFixture<AddClassTeacherSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClassTeacherSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClassTeacherSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
