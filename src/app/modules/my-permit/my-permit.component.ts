import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PermitService } from '../permits/permits.service';
import { MyPermit } from '../permits/permits.types';

@Component({
  selector: 'app-my-permit',
  imports: [],
  templateUrl: './my-permit.component.html',
  styleUrl: './my-permit.component.scss',
})
export class MyPermitComponent implements OnInit, OnDestroy {
  showQrCode: boolean = false;
  permit: MyPermit | undefined;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(private _permitService: PermitService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Selected department
    this._permitService.myPermit$.pipe(takeUntil(this._unsubscribeAll)).subscribe((permit: MyPermit | null) => {
      this.permit = permit as MyPermit;
      this.showQrCode = this.permit.message === 'No permit found';
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

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
