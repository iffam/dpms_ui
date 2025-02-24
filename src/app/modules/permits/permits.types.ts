import { User } from '../users/users.types';

export interface MyPermit {
  name?: string;
  message?: string;
  employee_number?: string;
  qrCode?: string;
  zones?: string[];
  expire_alert?: number | null;
}

export interface ScanData {
  permit_no?: number;
  name?: string;
  employee_number?: string;
  zones?: string[];
}

export interface Zone {
  id?: string;
  name?: string;
  description?: string;
  code?: string;
  color?: string;
}

export interface Usage {
  id?: string;
  zone?: Zone;
  created_at?: string;
}

export interface Permit {
  id?: string;
  permit_type?: string;
  active_at?: string;
  expired_at?: string;
  suspended_at?: string;
  usages?: Usage[];
  user?: User;
}
