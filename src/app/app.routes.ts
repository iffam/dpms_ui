import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { NoAuthGuard } from './auth/guards/noAuth.guard';
import { LayoutComponent } from './layout/layout.component';
import { AclComponent } from './modules/acl/acl.component';
import { ApplicationsComponent } from './modules/applications/applications.component';
import { DepartmentsComponent } from './modules/departments/departments.component';
import { DepartmentService } from './modules/departments/departments.service';
import { LoginComponent } from './modules/login/login.component';
import { MyApplicationsComponent } from './modules/my-applications/my-applications.component';
import { MyPermitComponent } from './modules/my-permit/my-permit.component';
import { PermitsComponent } from './modules/permits/permits.component';
import { ScanComponent } from './modules/scan/scan.component';
import { UsersComponent } from './modules/users/users.component';
import { ZonesComponent } from './modules/zones/zones.component';

export const routes: Routes = [
  {
    path: 'sign-in',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    component: LoginComponent,
  },
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
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
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'zones',
        component: ZonesComponent,
      },
      {
        path: 'permits',
        component: PermitsComponent,
      },
      {
        path: 'scan',
        component: ScanComponent,
      },
      {
        path: 'my-permit',
        component: MyPermitComponent,
      },
      {
        path: 'my-applications',
        component: MyApplicationsComponent,
      },
    ],
  },
];
