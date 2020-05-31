import { TestBed } from '@angular/core/testing';

import { AListService } from './a-list.service';

describe('AListService', () => {
  let service: AListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
