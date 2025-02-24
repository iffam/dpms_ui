export interface Application {
  id?: string;
  permit_type?: string;
  status?: string;
  user: User;
  reviewed_by?: User | null;
  zones?: string[];
  status_remarks?: string;
  justification?: string;
  active_at?: string | null;
  expired_at?: string | null;
  deleted_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Link {
  url?: string | null;
  label?: string | null;
  active?: boolean | null;
}

export interface ApplicationPaginatedList {
  current_page?: string;
  data?: Application[];
  first_page_url?: string;
  from?: number;
  last_page?: number;
  last_page_url?: string | null;
  next_page_url?: string | null;
  path?: string | null;
  per_page?: number;
  prev_page_url?: string | null;
  to?: number;
  total?: number;
  links?: Link[];
}

export interface User {
  id?: string;
  name?: string;
  employee_number?: string;
  email?: string;
}
