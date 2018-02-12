
import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    let user = this.authService.currentUser;
    if (user && user.admin) {
      return true;
    }
    this.router.navigate(['/no-access']);
    return false;
  }

}

