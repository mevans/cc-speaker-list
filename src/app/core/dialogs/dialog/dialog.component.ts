import { AfterViewInit, Component, EventEmitter, Output, ViewChild, inject } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { ViewEncapsulation } from '@angular/core';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CdkPortal],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DialogComponent implements AfterViewInit {
  private readonly overlay = inject(Overlay);
  private readonly router = inject(Router);
  @ViewChild(CdkPortal) private readonly portal: CdkPortal | undefined;

  private overlayConfig = new OverlayConfig({
    positionStrategy: this.overlay.position().global(),
    hasBackdrop: true,
    backdropClass: 'backdrop',
    panelClass: 'dialog',
    scrollStrategy: this.overlay.scrollStrategies.block(),
  });

  private overlayRef = this.overlay.create(this.overlayConfig);

  @Output() close = new EventEmitter<void>();

  ngAfterViewInit() {
    this.overlayRef.attach(this.portal);
    this.overlayRef.backdropClick().subscribe(() => this.onClose());
  }

  onClose(): void {
    this.close.emit();
  }

  ngOnDestroy() {
    this.overlayRef.detach();
    this.overlayRef.dispose();
  }
}
