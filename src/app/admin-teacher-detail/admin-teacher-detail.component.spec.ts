import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeacherDetailComponent } from './admin-teacher-detail.component';

describe('AdminTeacherDetailComponent', () => {
  let component: AdminTeacherDetailComponent;
  let fixture: ComponentFixture<AdminTeacherDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTeacherDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTeacherDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
