import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleRedirectGuard: CanActivateFn = () => {
  const router = inject(Router);

  // Example: get role from localStorage / service
  const role = localStorage.getItem('malvani_role'); // ADMIN / USER / etc
  console.log('role redirect guard:', role);

  debugger
  if (role === 'ADMIN') {
    router.navigate(['/admin']);
  } else if (role === 'USER') {
    router.navigate(['/dashboard']);
  } else {
    router.navigate(['/auth/login']);
  }

  return false; // IMPORTANT: stop current navigation
};
