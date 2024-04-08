import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
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
  private speakerApiService = inject(SpeakerApiService);

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

  getSpeaker(id: number): Observable<Speaker | undefined> {
    return this.speakerApiService.getSpeaker(id);
  }

  private speakerIsSearched(speaker: Speaker, search: string): boolean {
    return (
      speaker.name.first.includes(search) || speaker.name.last.includes(search)
    );
  }
}
