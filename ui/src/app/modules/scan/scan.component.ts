import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { LOAD_WASM, NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
LOAD_WASM('assets/wasm/ngx-scanner-qrcode.wasm').subscribe();

@Component({
  selector: 'app-scan',
  imports: [NgxScannerQrcodeModule, JsonPipe, AsyncPipe],
  templateUrl: './scan.component.html',
  styleUrl: './scan.component.scss',
})
export class ScanComponent {}
