import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  menuItemsPersonal: any[] = [
    {
      title: 'My  Permit',
      icon: 'workspace_premium',
      link: 'my-permit',
    },
    {
      title: 'My Applications',
      icon: 'folder_open',
      link: 'my-applications',
    },
  ];

  menuItemsSecurity: any[] = [
    {
      title: 'Scan',
      icon: 'qr_code_scanner',
      link: 'scan',
    },
  ];

  menuItemsAdmin: any[] = [
    {
      title: 'Applications',
      icon: 'apps',
      link: 'applications',
    },
    {
      title: 'ACL',
      icon: 'lock',
      link: 'acl',
    },
    {
      title: 'Departments',
      icon: 'business',
      link: 'departments',
    },
    {
      title: 'Users',
      icon: 'group',
      link: 'users',
    },
    {
      title: 'Zones',
      icon: 'pin_drop',
      link: 'zones',
    },
    {
      title: 'Permits',
      icon: 'folder_shared',
      link: 'permits',
    },
  ];

  /**
   * Constructor
   */
  constructor() {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
