import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (private auth: AuthService, private rute: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.auth.authorize().subscribe(value => {
      console.log(next.data.roles[0], value.role)
      if (next.data.roles[0] === value.role || next.data.roles[2] === value.role || next.data.roles[1] === value.role) return;

      this.rute.navigate(['']);
    });

    return true;
  }
  
}
