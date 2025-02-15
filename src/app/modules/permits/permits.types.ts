export interface MyPermit {
  name?: string;
  message?: string;
  employee_number?: string;
  qrCode?: string;
  zones?: string[];
}

export interface ScanData {
  permit_no?: number;
  name?: string;
  employee_number?: string;
  zones?: string[];
}
