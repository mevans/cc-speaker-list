import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApiUrl } from '../../../../core/tokens/base-api-url.token';
import { Speaker } from '../../models/speaker.type';
import { SpeakerResponse } from '../../models/speakers-response.type';
import { ApiSeed } from '../../../../core/tokens/api-seed.token';

@Injectable({
  providedIn: 'root'
})
export class SpeakerApiService {
  private httpClient = inject(HttpClient);
  private baseUrl = inject(BaseApiUrl);
  private apiSeed = inject(ApiSeed);

  getSpeakers(
    page: number = 1,
    results: number = 1,
  ): Observable<Speaker[]> {
    return this.httpClient.get<SpeakerResponse>(
      this.baseUrl,
      {
        params: {
          page,
          results,
          seed: this.apiSeed,
        }
      }      
    ).pipe(
      map((response) => response.results)
    );
  }

  // As the API doesn't support fetching a single speaker by ID, we can treat the index of the speaker as the ID
  // This way we can fetch a single speaker by 
  getSpeaker(
    index: number,
  ): Observable<Speaker> {
    return this.getSpeakers(index, 1).pipe(
      map((speakers) => speakers[0])
    );
  }
}