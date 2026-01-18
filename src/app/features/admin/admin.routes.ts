import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
    {
    path: '',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'menu-master',
    loadComponent: () =>
      import('../admin/pages/menu-master/menu-master-list/menu-master-list.component')
        .then((m) => m.MenuMasterListComponent),
  },
  {
    path: 'menu-master/add',
    loadComponent: () =>
      import('../admin/pages/menu-master/menu-master-form/menu-master-form.component')
        .then((m) => m.MenuMasterFormComponent),
  },
  {
    path: 'menu-master/edit/:id',
    loadComponent: () =>
      import('../admin/pages/menu-master/menu-master-form/menu-master-form.component')
        .then((m) => m.MenuMasterFormComponent),
  },
  {
    path: 'users-master',
    loadComponent: () =>
      import('../admin/pages/user-master/user-master-list/user-master-list.component')
        .then((m) => m.UserMasterListComponent),
  },
  {
    path: 'users-master/add',
    loadComponent: () =>
      import('../admin/pages/user-master/user-master-form/user-master-form.component')
        .then((m) => m.UserMasterFormComponent),
  },
  {
    path: 'users-master/edit/:id',
    loadComponent: () =>
      import('../admin/pages/user-master/user-master-form/user-master-form.component')
        .then((m) => m.UserMasterFormComponent),
  },
];
