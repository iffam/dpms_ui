import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AclComponent } from './acl/acl.component';
import { ApplicationsComponent } from './applications/applications.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DepartmentService } from './departments/departments.service';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'applications',
        component: ApplicationsComponent,
      },
      {
        path: 'acl',
        component: AclComponent,
      },
      {
        path: 'departments',
        component: DepartmentsComponent,
        resolve: {
          departments: () => inject(DepartmentService).getDepartments(),
        },
      },
    ],
  },
];
