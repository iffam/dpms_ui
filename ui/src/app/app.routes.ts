import { Routes } from '@angular/router';
import { ApplicationsComponent } from './applications/applications.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { AclComponent } from './acl/acl.component';

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
    ],
  },
];
