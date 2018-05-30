import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminYearDetailComponent } from './admin-year-detail.component';

describe('AdminYearDetailComponent', () => {
  let component: AdminYearDetailComponent;
  let fixture: ComponentFixture<AdminYearDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminYearDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminYearDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
