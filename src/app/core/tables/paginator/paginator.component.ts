import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  matChevronRightSharp,
  matChevronLeftSharp,
} from '@ng-icons/material-icons/sharp';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  providers: [
    provideIcons({
      chevronRight: matChevronRightSharp,
      chevronLeft: matChevronLeftSharp,
    }),
  ],
})
export class PaginatorComponent {
  @Input({ required: true }) page!: number;
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  onPrevious(): void {
    this.previous.emit();
  }

  onNext(): void {
    this.next.emit();
  }
}
