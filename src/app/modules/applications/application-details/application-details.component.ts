import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MAT_SLIDE_PANEL_DATA, MatSlidePanelRef } from 'ngx-mat-slide-panel';
import { Application } from '../applications.types';

@Component({
  selector: 'app-application-details',
  imports: [MatIconModule, MatToolbarModule, UpperCasePipe, NgFor, NgIf],
  templateUrl: './application-details.component.html',
  styleUrl: './application-details.component.scss',
})
export class ApplicationDetailsComponent {
  constructor(
    private panelRef: MatSlidePanelRef,
    @Inject(MAT_SLIDE_PANEL_DATA) public data: { application: Application }
  ) {}

  closePanel(): void {
    this.panelRef.dismiss();
  }
}
