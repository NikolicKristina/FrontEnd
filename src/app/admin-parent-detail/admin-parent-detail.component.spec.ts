import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminParentDetailComponent } from './admin-parent-detail.component';

describe('AdminParentDetailComponent', () => {
  let component: AdminParentDetailComponent;
  let fixture: ComponentFixture<AdminParentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminParentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminParentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
