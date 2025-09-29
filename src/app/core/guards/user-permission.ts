import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';

export const UserPermission: CanActivateFn = async (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const routeId = +route.params['id'];

  if (routeId === 3) {
    const password = prompt('შეიყვანეთ პაროლი');

    if (password === '1234') {
      return true; 
    } else {
      alert('პაროლი არასწორია');
      router.navigate(['/']); 
      return false; 
    }
  }

  return true; 
};
