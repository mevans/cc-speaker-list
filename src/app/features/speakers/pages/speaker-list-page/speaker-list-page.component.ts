import { Component, inject, signal } from '@angular/core';
import { SpeakerApiService } from '../../services/speaker-api/speaker-api.service';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-speaker-list-page',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './speaker-list-page.component.html',
  styleUrl: './speaker-list-page.component.scss'
})
export class SpeakerListPageComponent {
  private speakerApiService = inject(SpeakerApiService);

  speakers$ = this.speakerApiService.getSpeakers();
}
