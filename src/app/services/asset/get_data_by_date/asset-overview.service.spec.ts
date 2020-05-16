import { TestBed } from '@angular/core/testing';

import { AssetOverviewService } from './asset-overview.service';

describe('AssetOverviewService', () => {
  let service: AssetOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
