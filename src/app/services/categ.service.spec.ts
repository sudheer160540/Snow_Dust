import { TestBed } from '@angular/core/testing';

import { CategService } from './categ.service';

describe('CategService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategService = TestBed.get(CategService);
    expect(service).toBeTruthy();
  });
});
