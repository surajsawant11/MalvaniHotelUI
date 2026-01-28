import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../features/auth/services/auth.service';

export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    const role = auth.getRole();
    router.navigate([
      role === 'ADMIN' ? '/admin/dashboard' : '/dashboard'
    ]);
    return false;
  }

  return true;
};
