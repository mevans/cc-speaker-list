import { Component, Input } from '@angular/core';
import { Speaker } from '../../models/speaker.type';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matPhoneSharp, matEmailSharp } from '@ng-icons/material-icons/sharp';

@Component({
  selector: 'app-speaker-details',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './speaker-details.component.html',
  styleUrl: './speaker-details.component.scss',
  providers: [
    provideIcons({
      phone: matPhoneSharp,
      email: matEmailSharp,
    }),
  ],
})
export class SpeakerDetailsComponent {
  @Input({ required: true }) speaker!: Speaker | null | undefined;
}
