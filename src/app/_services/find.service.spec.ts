import { TestBed } from '@angular/core/testing';

import { FindService } from './find.service';

describe('ItemService', () => {
  let service: FindService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
