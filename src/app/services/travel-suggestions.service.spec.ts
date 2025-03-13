import { TestBed } from '@angular/core/testing';

import { TravelSuggestionsService } from './travel-suggestions.service';

describe('TravelSuggestionsService', () => {
  let service: TravelSuggestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelSuggestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
