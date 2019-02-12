import { TestBed } from '@angular/core/testing';

import { MomentregisterService } from './momentregister.service';

describe('MomentregisterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MomentregisterService = TestBed.get(MomentregisterService);
    expect(service).toBeTruthy();
  });
});
