import { TestBed } from '@angular/core/testing';

import { UpdateOService } from './update-o.service';

describe('UpdateOService', () => {
  let service: UpdateOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
