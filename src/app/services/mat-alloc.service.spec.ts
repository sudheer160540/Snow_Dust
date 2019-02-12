import { TestBed } from '@angular/core/testing';

import { MatAllocService } from './mat-alloc.service';

describe('MatAllocService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatAllocService = TestBed.get(MatAllocService);
    expect(service).toBeTruthy();
  });
});
