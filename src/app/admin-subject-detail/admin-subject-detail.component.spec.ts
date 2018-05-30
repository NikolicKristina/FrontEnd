import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubjectDetailComponent } from './admin-subject-detail.component';

describe('AdminSubjectDetailComponent', () => {
  let component: AdminSubjectDetailComponent;
  let fixture: ComponentFixture<AdminSubjectDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSubjectDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
