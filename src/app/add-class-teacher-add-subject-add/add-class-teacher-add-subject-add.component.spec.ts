import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClassTeacherAddSubjectAddComponent } from './add-class-teacher-add-subject-add.component';

describe('AddClassTeacherAddSubjectAddComponent', () => {
  let component: AddClassTeacherAddSubjectAddComponent;
  let fixture: ComponentFixture<AddClassTeacherAddSubjectAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClassTeacherAddSubjectAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClassTeacherAddSubjectAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
