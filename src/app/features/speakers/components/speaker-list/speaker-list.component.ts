import { Component, Input } from '@angular/core';
import { Speaker } from '../../models/speaker.type';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-speaker-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './speaker-list.component.html',
  styleUrl: './speaker-list.component.scss'
})
export class SpeakerListComponent {
  @Input({ required: true }) speakers!: Speaker[];
}
