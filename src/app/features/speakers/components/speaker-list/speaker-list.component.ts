import { Component, Input } from '@angular/core';
import { Speaker } from '../../models/speaker.type';

@Component({
  selector: 'app-speaker-list',
  standalone: true,
  imports: [],
  templateUrl: './speaker-list.component.html',
  styleUrl: './speaker-list.component.scss'
})
export class SpeakerListComponent {
  @Input({ required: true }) speakers!: Speaker[];
}
