import { Component, inject, signal } from '@angular/core';
import { SpeakerApiService } from '../../services/speaker-api/speaker-api.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { SpeakerListComponent } from '../../components/speaker-list/speaker-list.component';
import { SpeakerDataService } from '../../services/speaker-data/speaker-data.service';
import {
  FormControl,
  FormControlDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { startWith } from 'rxjs';
import { controlValue$ } from '../../../../core/forms/utils/control-value$';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-speaker-list-page',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, SpeakerListComponent, ReactiveFormsModule, RouterOutlet],
  templateUrl: './speaker-list-page.component.html',
  styleUrl: './speaker-list-page.component.scss',
})
export class SpeakerListPageComponent {
  private speakerDataService = inject(SpeakerDataService);

  searchInput = new FormControl<string>('');
  speakers$ = this.speakerDataService.filteredSpeakers$(
    controlValue$(this.searchInput)
  );

  onNextPage() {
    this.speakerDataService.nextPage();
  }
}
