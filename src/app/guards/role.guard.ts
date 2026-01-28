import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../features/auth/services/auth.service';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (!auth.isLoggedIn()) {
      router.navigate(['/auth/login']);
      return false;
    }

    const role = auth.getRole();

    if (!role || !allowedRoles.includes(role)) {
      router.navigate([
        role === 'ADMIN' ? '/admin/dashboard' : '/dashboard'
      ]);
      return false;
    }

    return true;
  };
};
