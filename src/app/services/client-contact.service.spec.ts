import { TestBed } from '@angular/core/testing';

import { ClientContactService } from './client-contact.service';

describe('ClientContactService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientContactService = TestBed.get(ClientContactService);
    expect(service).toBeTruthy();
  });
});
