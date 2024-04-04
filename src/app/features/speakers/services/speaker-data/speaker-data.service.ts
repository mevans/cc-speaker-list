import { Injectable } from '@angular/core';
import { Speaker } from '../../models/speaker.type';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  map,
  pairwise,
  reduce,
  scan,
  startWith,
  switchMap,
} from 'rxjs';
import { SpeakerApiService } from '../speaker-api/speaker-api.service';
import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SpeakerDataService {
  private speakerApiService = inject(SpeakerApiService);

  private _page$ = new BehaviorSubject<number>(1);

  private _allSpeakers$ = this._page$.pipe(
    switchMap((page) => this.speakerApiService.getSpeakers(page)),
    // Accumulates speakers from all naviga
    scan((acc, speakers) => [...acc, ...speakers], [] as Speaker[])
  );

  filteredSpeakers$(searchInput: Observable<string>): Observable<Speaker[]> {
    return combineLatest([this._allSpeakers$, searchInput]).pipe(
      map(([speakers, search]) =>
        speakers.filter((speaker) => this.speakerIsSearched(speaker, search))
      )
    );
  }

  nextPage() {
    this._page$.next(this._page$.value + 1);
  }

  private speakerIsSearched(speaker: Speaker, search: string): boolean {
    return (
      speaker.name.first.includes(search) || speaker.name.last.includes(search)
    );
  }
}
