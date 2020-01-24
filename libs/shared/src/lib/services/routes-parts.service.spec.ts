import { TestBed } from '@angular/core/testing';

import { RoutesPartsService } from './routes-parts.service';

describe('RoutesPartsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoutesPartsService = TestBed.get(RoutesPartsService);
    expect(service).toBeTruthy();
  });
});
