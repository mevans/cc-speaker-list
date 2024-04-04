import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApiUrl } from '../../../../core/tokens/base-api-url.token';
import { Speaker } from '../../models/speaker.type';
import { SpeakerResponse } from '../../models/speakers-response.type';

@Injectable({
  providedIn: 'root'
})
export class SpeakerApiService {
  private httpClient = inject(HttpClient);
  private baseUrl = inject(BaseApiUrl);

  getSpeakers(
    page: number = 1,
    results: number = 10
  ): Observable<Speaker[]> {
    return this.httpClient.get<SpeakerResponse>(
      this.baseUrl,
      {
        params: {
          page,
          results,
        }
      }      
    ).pipe(
      map((response) => response.results)
    );
  }
}