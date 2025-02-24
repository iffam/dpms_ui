import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { LOAD_WASM, NgxScannerQrcodeModule, ScannerQRCodeConfig, ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { Subject } from 'rxjs';
import { PermitService } from '../permits/permits.service';
import { ScanData } from '../permits/permits.types';
LOAD_WASM('assets/wasm/ngx-scanner-qrcode.wasm').subscribe();

@Component({
  selector: 'app-scan',
  imports: [NgxScannerQrcodeModule, MatIconModule, MatButtonModule, MatSelectModule, FormsModule],
  templateUrl: './scan.component.html',
  styleUrl: './scan.component.scss',
})
export class ScanComponent implements OnDestroy {
  selectedZone: string = 'ZONE-A';
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
  status: string = 'pending';
  scanData: ScanData = {};
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    e && action && action.pause();
    this.scanData = JSON.parse(action.data.value[0].value);
    console.log(this.scanData.permit_no);
  }

  /**
   * Constructor
   */
  constructor(private _permitService: PermitService) {}

  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth,
      },
    },
    // symbolType: [
    //   ScannerQRCodeSymbolType.ScannerQRCode_QRCODE,
    //   ScannerQRCodeSymbolType.ScannerQRCode_I25,
    //   ScannerQRCodeSymbolType.ScannerQRCode_DATABAR,
    //   ScannerQRCodeSymbolType.ScannerQRCode_CODE39,
    // ],
    // isMasked: false,
    // unScan: true,
    isBeep: true,
    vibrate: 200,
    canvasStyles: [
      {
        /* layer */ lineWidth: 1,
        fillStyle: '#00950685',
        strokeStyle: '#00950685',
      },
      {
        /* text */ font: '17px serif',
        fillStyle: '#ff0000',
        strokeStyle: '#ff0000',
      },
    ],
  };

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
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

  validate(): void {
    this._permitService.Validate(this.scanData, this.selectedZone).subscribe((response) => {
      this.status = response.message === 'Invalid permit' ? 'invalid' : 'valid';
    });
  }
}
