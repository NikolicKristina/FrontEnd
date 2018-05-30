import { TestBed, inject } from '@angular/core/testing';

import { ScSubjectService } from './scSubject.service';

describe('ScSubjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScSubjectService]
    });
  });

  it('should be created', inject([ScSubjectService], (service: ScSubjectService) => {
    expect(service).toBeTruthy();
  }));
});
