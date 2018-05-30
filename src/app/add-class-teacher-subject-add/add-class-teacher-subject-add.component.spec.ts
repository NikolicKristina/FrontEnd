import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClassTeacherSubjectAddComponent } from './add-class-teacher-subject-add.component';

describe('AddClassTeacherSubjectAddComponent', () => {
  let component: AddClassTeacherSubjectAddComponent;
  let fixture: ComponentFixture<AddClassTeacherSubjectAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClassTeacherSubjectAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClassTeacherSubjectAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
