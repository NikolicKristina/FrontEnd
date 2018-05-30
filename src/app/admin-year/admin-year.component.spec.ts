import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminYearComponent } from './admin-year.component';

describe('AdminYearComponent', () => {
  let component: AdminYearComponent;
  let fixture: ComponentFixture<AdminYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
