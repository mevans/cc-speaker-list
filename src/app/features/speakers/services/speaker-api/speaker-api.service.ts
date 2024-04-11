import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, tap, delay } from 'rxjs/operators';
import { BaseApiUrl } from '../../../../core/tokens/base-api-url.token';
import { Speaker } from '../../models/speaker.type';
import { SpeakerResponse } from '../../models/speakers-response.type';
import { ApiSeed } from '../../../../core/tokens/api-seed.token';

@Injectable({
  providedIn: 'root',
})
export class SpeakerApiService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = inject(BaseApiUrl);
  private readonly apiSeed = inject(ApiSeed);
  private readonly pageSize = 10;

  getSpeakers(page: number): Observable<Speaker[]> {
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

  getSpeaker(id: number): Observable<Speaker | undefined> {
    // The API doesn't support fetching a specific speaker by ID
    // So we need to fetch the page they are on, and then find the speaker by ID
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
