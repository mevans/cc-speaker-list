import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { BaseApiUrl } from '../../../../core/tokens/base-api-url.token';
import { Speaker } from '../../models/speaker.type';
import { SpeakerResponse } from '../../models/speakers-response.type';
import { ApiSeed } from '../../../../core/tokens/api-seed.token';

@Injectable({
  providedIn: 'root',
})
export class SpeakerApiService {
  private httpClient = inject(HttpClient);
  private baseUrl = inject(BaseApiUrl);
  private apiSeed = inject(ApiSeed);
  private readonly pageSize = 50;

  getSpeakers(
    page: number = 1,
  ): Observable<Speaker[]> {
    return this.httpClient
      .get<SpeakerResponse>(this.baseUrl, {
        params: {
          page,
          results: this.pageSize,
          seed: this.apiSeed,
        },
      })
      .pipe(
        map((response) => response.results.map((speaker, index) => ({
          ...speaker,
          // Global API doesn't provide an ID, so we can use the index of the speaker as the ID
          id: this.determineId(page, this.pageSize, index),
        }))),
      );
  }

  // The API doesn't support fetching a specific speaker by ID
  // So we need to fetch the initial page they are on, and then find the speaker by ID
  getSpeaker(id: number): Observable<Speaker | undefined> {
    const containingPage = this.determinePage(id, this.pageSize);
    
    return this.getSpeakers(containingPage).pipe(
      map((speakers) => speakers.find((speaker) => speaker.id === id)),
    );
  }

  private determineId(page: number, pageSize: number, index: number): number {
    return (page - 1) * pageSize + index;
  }

  private determinePage(id: number, pageSize: number): number {
    return Math.floor(id / pageSize) + 1;
  }
}
