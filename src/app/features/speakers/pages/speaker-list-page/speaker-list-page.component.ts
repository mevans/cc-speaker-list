import { Component, inject, signal } from '@angular/core';
import { SpeakerApiService } from '../../services/speaker-api/speaker-api.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { SpeakerListComponent } from '../../components/speaker-list/speaker-list.component';
import { SpeakerDataService } from '../../services/speaker-data/speaker-data.service';

@Component({
  selector: 'app-speaker-list-page',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, SpeakerListComponent],
  templateUrl: './speaker-list-page.component.html',
  styleUrl: './speaker-list-page.component.scss'
})
export class SpeakerListPageComponent {
  private speakerDataService = inject(SpeakerDataService);

  speakers$ = this.speakerDataService.speakers$;

  onNextPage() {
    this.speakerDataService.nextPage();
  }
}
