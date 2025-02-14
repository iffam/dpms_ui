import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AclComponent } from './modules/acl/acl.component';
import { ApplicationsComponent } from './modules/applications/applications.component';
import { LayoutComponent } from './layout/layout.component';
import { DepartmentsComponent } from './modules/departments/departments.component';
import { DepartmentService } from './modules/departments/departments.service';
import { LoginComponent } from './modules/login/login.component';

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
