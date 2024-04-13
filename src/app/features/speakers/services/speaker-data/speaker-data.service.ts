import { Injectable, inject } from '@angular/core';
import {
  Observable,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  merge,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { debounceDuration } from '../../../../core/forms/constants/debounce-duration.constant';
import { Speaker } from '../../models/speaker.type';
import { SpeakerApiService } from '../speaker-api/speaker-api.service';

@Injectable({
  providedIn: 'root',
})
export class SpeakerDataService {
  private readonly speakerApiService = inject(SpeakerApiService);

  filteredSpeakers$(
    searchInput: Observable<string>,
    page: Observable<number>
  ): Observable<Speaker[] | undefined> {
    return combineLatest([
      page.pipe(
        switchMap((page) =>
          merge(
            // 'Loading state' between each page change
            of(undefined),
            this.speakerApiService.getSpeakers(page)
          )
        )
      ),
      searchInput.pipe(
        startWith(''),
        debounceTime(debounceDuration),
        distinctUntilChanged()
      ),
    ]).pipe(
      map(([speakers, search]) =>
        speakers?.filter((speaker) => this.speakerIsSearched(speaker, search))
      )
    );
  }

  // Could use a cache system in this service to avoid fetching the same speaker multiple times
  getSpeaker(id: number): Observable<Speaker | undefined> {
    return this.speakerApiService.getSpeaker(id);
  }

  private speakerIsSearched(speaker: Speaker, search: string): boolean {
    const normalizedSearch = search.trim().toLocaleLowerCase();
    const fields = [speaker.name.first, speaker.name.last, speaker.email].map(
      (field) => field.toLocaleLowerCase()
    );
    return fields.some((field) => field.includes(normalizedSearch));
  }
}
