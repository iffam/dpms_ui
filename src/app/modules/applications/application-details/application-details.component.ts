import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlidePanelRef } from 'ngx-mat-slide-panel';

@Component({
  selector: 'app-application-details',
  imports: [MatIconModule, MatToolbarModule],
  templateUrl: './application-details.component.html',
  styleUrl: './application-details.component.scss',
})
export class ApplicationDetailsComponent {
  constructor(private panelRef: MatSlidePanelRef) {}

  closePanel(): void {
    this.panelRef.dismiss();
  }
}
