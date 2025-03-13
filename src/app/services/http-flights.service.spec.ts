import { TestBed } from '@angular/core/testing';

import { HttpFlightsService } from './http-flights.service';

describe('HttpFlightsService', () => {
  let service: HttpFlightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpFlightsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
