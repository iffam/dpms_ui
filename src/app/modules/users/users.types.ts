export interface Role {
  id?: string;
  name?: string;
  guard_name?: string;
}

export interface Department {
  id?: string;
  name?: string;
}

export interface User {
  id?: string;
  name?: string;
  employee_number?: string;
  email?: string;
  roles?: Role[];
  department?: Department;
}

export interface Link {
  url?: string | null;
  label?: string | null;
  active?: boolean | null;
}

export interface UserPaginatedList {
  current_page?: string;
  data?: User[];
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

export interface Pagination {
  length: number;
  size: number;
  page: number;
  lastPage: number;
  startIndex: number;
  endIndex: number;
}
