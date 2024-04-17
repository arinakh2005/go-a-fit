import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { UserService } from '../sevices/user.service';
import { SystemRole } from '../enums/system-role.enum';

@Injectable()
export class SystemRoleGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
  ) { }

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    const user = this.userService.user;
    const requiredRoles: SystemRole[] = route.data.roles;
    const isUserHasRequiredRoles = requiredRoles.some((role) => user?.systemRole === role);

    if (isUserHasRequiredRoles) {
        return true;
    } else {
        this.router.navigate(['/home']);
        return false;
    }
  }
}
