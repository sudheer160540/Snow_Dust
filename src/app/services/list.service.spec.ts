import { TestBed } from '@angular/core/testing';

import { ListService } from './list.service';
import { from } from 'rxjs';

describe('ListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListService = TestBed.get(ListService);
    expect(service).toBeTruthy();
  });
});
