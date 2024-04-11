import { AfterViewInit, Component, EventEmitter, Output, ViewChild, inject } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { ViewEncapsulation } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matCloseSharp } from '@ng-icons/material-icons/sharp';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CdkPortal, NgIconComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [provideIcons({
    close: matCloseSharp,
  })]
})
export class DialogComponent implements AfterViewInit {
  private readonly overlay = inject(Overlay);
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
