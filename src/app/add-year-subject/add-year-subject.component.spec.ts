import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddYearSubjectComponent } from './add-year-subject.component';

describe('AddYearSubjectComponent', () => {
  let component: AddYearSubjectComponent;
  let fixture: ComponentFixture<AddYearSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddYearSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddYearSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
