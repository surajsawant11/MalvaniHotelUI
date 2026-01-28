import { Routes } from '@angular/router';
import { roleGuard } from './guards/role.guard';
import { roleRedirectGuard } from './guards/role-redirect.guard';


export const routes: Routes = [

  // Root → auto redirect based on role
  {
    path: '',
    canActivate: [roleGuard(['USER'])],
    loadComponent: () =>
      import('./layouts/main-layout/main-layout.component')
        .then(m => m.MainLayoutComponent),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/public/public.routes')
            .then(m => m.PUBLIC_ROUTES),
      },
    ],
  },

  // Auth
  {
    path: 'auth',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout.component')
        .then(m => m.AuthLayoutComponent),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/auth/auth.routes')
            .then(m => m.AUTH_ROUTES),
      },
    ],
  },

  // Admin (ADMIN only)
  {
    path: 'admin',
    canActivate: [roleGuard(['ADMIN'])],
    loadComponent: () =>
      import('./layouts/admin-layout/admin-layout.component')
        .then(m => m.AdminLayoutComponent),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/admin/admin.routes')
            .then(m => m.ADMIN_ROUTES),
      },
    ],
  },

  {
    path: '**',
    loadComponent: () =>
      import('./guards/role-redirect.component')
        .then(m => m.RoleRedirectComponent),
    canActivate: [roleRedirectGuard],
  },
];
