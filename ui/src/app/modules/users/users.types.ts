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
