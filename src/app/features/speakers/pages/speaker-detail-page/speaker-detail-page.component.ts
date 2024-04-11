import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { DialogComponent } from '../../../../core/dialogs/dialog/dialog.component';
import { SpeakerDetailsComponent } from '../../components/speaker-details/speaker-details.component';
import { SpeakerDataService } from '../../services/speaker-data/speaker-data.service';

@Component({
  selector: 'app-speaker-detail-page',
  standalone: true,
  imports: [DialogComponent, AsyncPipe, SpeakerDetailsComponent],
  templateUrl: './speaker-detail-page.component.html',
  styleUrl: './speaker-detail-page.component.scss'
})
export class SpeakerDetailPageComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly speakerDataService = inject(SpeakerDataService);

  speaker$ = this.route.paramMap.pipe(
    map((params) => params.get('id')),
    filter(Boolean),
    switchMap((id) => this.speakerDataService.getSpeaker(+id))
  );

  onClose(): void {
    this.router.navigate(['../']);
  }
}
