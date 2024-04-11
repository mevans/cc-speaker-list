import { Component, Input } from '@angular/core';
import { Speaker } from '../../models/speaker.type';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matChevronRightSharp } from '@ng-icons/material-icons/sharp';

@Component({
  selector: 'app-speaker-list-item',
  standalone: true,
  imports: [RouterLink, NgIconComponent],
  templateUrl: './speaker-list-item.component.html',
  styleUrl: './speaker-list-item.component.scss',
  providers: [
    provideIcons({
      chevronRight: matChevronRightSharp,
    }),
  ],
})
export class SpeakerListItemComponent {
  @Input({ required: true }) speaker!: Speaker | null;
}
