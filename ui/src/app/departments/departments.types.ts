export interface Department {
  id?: string;
  name?: string;
  deleted_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Link {
  url?: string | null;
  label?: string | null;
  active?: boolean | null;
}

export interface DepartmentPaginatedList {
  current_page?: string;
  data?: Department[];
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
