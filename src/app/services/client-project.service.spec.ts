import { TestBed } from '@angular/core/testing';

import { ClientProjectService } from './client-project.service';

describe('ClientProjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientProjectService = TestBed.get(ClientProjectService);
    expect(service).toBeTruthy();
  });
});
