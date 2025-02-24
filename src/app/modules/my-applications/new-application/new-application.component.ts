import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlidePanelRef } from 'ngx-mat-slide-panel';
import { Application } from '../../applications/applications.types';
import { MyApplicationService } from '../my-applications.service';

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
export class NewApplicationComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  applicationForm!: UntypedFormGroup;

  zoneList: { label: string; value: string }[] = [
    { label: 'International Terminal', value: 'ZONE-A' },
    { label: 'Domestic Terminal', value: 'ZONE-B' },
    { label: 'Cargo Terminal', value: 'ZONE-C' },
    { label: 'Seaplane Terminal', value: 'ZONE-D' },
    { label: 'VIP Terminal', value: 'ZONE-E' },
    { label: 'Aircraft Maintenance', value: 'ZONE-F' },
    { label: 'Fuel Farm', value: 'ZONE-G' },
    { label: 'Air Traffic Control', value: 'ZONE-H' },
  ];
  typeList: { label: string; value: string }[] = [
    { label: 'Permanent', value: 'permanent' },
    { label: 'Restricted', value: 'restricted' },
    { label: 'Temporary', value: 'temporary' },
  ];
  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _myApplicationService: MyApplicationService,
    private panelRef: MatSlidePanelRef
  ) {}

  ngOnInit(): void {
    // Create the form
    this.applicationForm = this._formBuilder.group({
      permit_type: ['permanent', [Validators.required]],
      zones: ['', [Validators.required]],
      active_at: [''],
      expired_at: [''],
    });

    this.applicationForm.get('expired_at')?.disable();
    this.applicationForm.get('active_at')?.disable();

    this.applicationForm.get('permit_type')?.valueChanges.subscribe((value) => {
      if (value === 'temporary') {
        this.applicationForm.get('active_at')?.setValidators([Validators.required]);
        this.applicationForm.get('expired_at')?.setValidators([Validators.required]);
        this.applicationForm.get('expired_at')?.enable();
        this.applicationForm.get('active_at')?.enable();
      } else {
        this.applicationForm.get('active_at')?.clearValidators();
        this.applicationForm.get('expired_at')?.clearValidators();
        this.applicationForm.get('expired_at')?.disable();
        this.applicationForm.get('active_at')?.disable();
      }
      this.applicationForm.get('active_at')?.updateValueAndValidity();
      this.applicationForm.get('expired_at')?.updateValueAndValidity();
    });
  }

  closePanel(): void {
    this.panelRef.dismiss();
  }

  saveApplication(): void {
    this._myApplicationService.saveStaffApplication(this.applicationForm.value as Application).subscribe({
      next: (response) => {
        console.log(response);
        this._snackBar.open('Application saved successfully', 'Close', {
          duration: 2000,
        });
        this._myApplicationService.getMyApplications().subscribe();
        this.closePanel();
        this.applicationForm.markAsPristine();
      },
      error: () => {
        this._snackBar.open('Failed to save Application', 'Close', {
          duration: 2000,
        });
      },
    });
  }
}
