import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MAT_SLIDE_PANEL_DATA, MatSlidePanelRef } from 'ngx-mat-slide-panel';
import { Permit } from '../permits.types';

@Component({
  selector: 'app-permit-usage',
  imports: [MatIconModule, MatToolbarModule],
  templateUrl: './permit-usage.component.html',
  styleUrl: './permit-usage.component.scss',
})
export class PermitUsageComponent {
  constructor(
    private panelRef: MatSlidePanelRef,
    @Inject(MAT_SLIDE_PANEL_DATA) public data: { permit: Permit }
  ) {}

  closePanel(): void {
    this.panelRef.dismiss();
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
