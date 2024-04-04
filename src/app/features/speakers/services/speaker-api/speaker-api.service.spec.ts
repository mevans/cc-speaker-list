import { TestBed } from '@angular/core/testing';

import { SpeakerApiService } from './speaker-api.service';

describe('SpeakerApiService', () => {
  let service: SpeakerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeakerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
