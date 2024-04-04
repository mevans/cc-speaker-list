import { TestBed } from '@angular/core/testing';

import { SpeakerDataService } from './speaker-data.service';

describe('SpeakerDataService', () => {
  let service: SpeakerDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeakerDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
