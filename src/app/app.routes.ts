import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { NoAuthGuard } from './auth/guards/noAuth.guard';
import { LayoutComponent } from './layout/layout.component';
import { AclComponent } from './modules/acl/acl.component';
import { ApplicationsComponent } from './modules/applications/applications.component';
import { ApplicationService } from './modules/applications/applications.service';
import { DepartmentsComponent } from './modules/departments/departments.component';
import { DepartmentService } from './modules/departments/departments.service';
import { LoginComponent } from './modules/login/login.component';
import { MyApplicationsComponent } from './modules/my-applications/my-applications.component';
import { MyApplicationService } from './modules/my-applications/my-applications.service';
import { MyPermitComponent } from './modules/my-permit/my-permit.component';
import { PermitsComponent } from './modules/permits/permits.component';
import { PermitService } from './modules/permits/permits.service';
import { ScanComponent } from './modules/scan/scan.component';
import { UsersComponent } from './modules/users/users.component';
import { UserService } from './modules/users/users.service';
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
        resolve: {
          applications: () => inject(ApplicationService).getApplications(),
        },
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
        resolve: {
          users: () => inject(UserService).getUsers(),
        },
      },
      {
        path: 'zones',
        component: ZonesComponent,
      },
      {
        path: 'permits',
        component: PermitsComponent,
        resolve: {
          permits: () => inject(PermitService).getPermits(),
        },
      },
      {
        path: 'scan',
        component: ScanComponent,
      },
      {
        path: 'my-permit',
        component: MyPermitComponent,
        resolve: {
          myPermit: () => inject(PermitService).get(),
        },
      },
      {
        path: 'my-applications',
        component: MyApplicationsComponent,
        resolve: {
          applications: () => inject(MyApplicationService).getMyApplications(),
        },
      },
    ],
  },
];
