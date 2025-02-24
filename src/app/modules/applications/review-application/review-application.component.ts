import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MAT_SLIDE_PANEL_DATA, MatSlidePanelRef } from 'ngx-mat-slide-panel';
import { Application } from '../../applications/applications.types';
import { ApplicationService } from '../applications.service';

@Component({
  selector: 'app-review-application',
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatButtonModule,
    MatInputModule,
    UpperCasePipe,
    NgFor,
    NgIf,
  ],
  templateUrl: './review-application.component.html',
  styleUrl: './review-application.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewApplicationComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  applicationForm!: UntypedFormGroup;

  statusList: { label: string; value: string }[] = [
    { label: 'Approved', value: 'approved' },
    { label: 'Rejected', value: 'rejected' },
  ];
  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _applicationService: ApplicationService,
    private panelRef: MatSlidePanelRef,
    @Inject(MAT_SLIDE_PANEL_DATA) public data: { application: Application }
  ) {}

  ngOnInit(): void {
    // Create the form
    this.applicationForm = this._formBuilder.group({
      status: ['', [Validators.required]],
      justification: ['', [Validators.required]],
    });
  }

  closePanel(): void {
    this.panelRef.dismiss();
  }

  reviewApplication(): void {
    this._applicationService
      .reviewStaffApplication(this.applicationForm.value as Application, this.data.application.id!)
      .subscribe({
        next: (response) => {
          console.log(response);
          this._snackBar.open('Application reviewed successfully', 'Close', {
            duration: 2000,
          });
          this._applicationService.getApplications().subscribe();
          this.closePanel();
          this.applicationForm.markAsPristine();
        },
        error: () => {
          this._snackBar.open('Failed to review Application', 'Close', {
            duration: 2000,
          });
        },
      });
  }
}
