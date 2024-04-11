import { Component, Input } from '@angular/core';
import { Speaker } from '../../models/speaker.type';
import { SpeakerListItemComponent } from '../speaker-list-item/speaker-list-item.component';

@Component({
  selector: 'app-speaker-list',
  standalone: true,
  imports: [SpeakerListItemComponent],
  templateUrl: './speaker-list.component.html',
  styleUrl: './speaker-list.component.scss',
})
export class SpeakerListComponent {
  @Input({required: true }) speakers!: Speaker[] | null | undefined;
}
