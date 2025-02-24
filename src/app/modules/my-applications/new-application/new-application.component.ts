import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlidePanelRef } from 'ngx-mat-slide-panel';

@Component({
  selector: 'app-new-application',
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './new-application.component.html',
  styleUrl: './new-application.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewApplicationComponent {
  application = new FormControl('');
  zoneList: { label: string; value: string }[] = [
    { label: 'International Terminal', value: '1' },
    { label: 'Domestic Terminal', value: '2' },
    { label: 'Cargo Terminal', value: '3' },
    { label: 'Seaplane Terminal', value: '4' },
    { label: 'VIP Terminal', value: '5' },
    { label: 'Aircraft Maintenance', value: '6' },
    { label: 'Fuel Farm', value: '7' },
    { label: 'Air Traffic Control', value: '8' },
  ];
  typeList: { label: string; value: string }[] = [
    { label: 'Permanent', value: 'permanent' },
    { label: 'Restricted', value: 'restricted' },
    { label: 'Temporary', value: 'temporary' },
  ];
  constructor(private panelRef: MatSlidePanelRef) {}

  closePanel(): void {
    this.panelRef.dismiss();
  }
}
