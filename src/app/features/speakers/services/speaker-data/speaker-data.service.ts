import { Injectable } from '@angular/core';
import { Speaker } from '../../models/speaker.type';
import { BehaviorSubject, map, pairwise, reduce, scan, startWith, switchMap } from 'rxjs';
import { SpeakerApiService } from '../speaker-api/speaker-api.service';
import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SpeakerDataService {
  private speakerApiService = inject(SpeakerApiService);
  
  private _page = new BehaviorSubject<number>(1);

  speakers$ = this._page.pipe(
    switchMap((page) => this.speakerApiService.getSpeakers(page)),
    // Creates the infinite scroll effect
    scan((acc, speakers) => [...acc, ...speakers], [] as Speaker[]),
  );

  nextPage() {
    this._page.next(this._page.value + 1);
  }
}

