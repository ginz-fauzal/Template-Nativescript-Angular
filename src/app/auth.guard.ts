import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { ServicesService } from './services.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor( private router: Router,private services: ServicesService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.services.getAuth()){
      return true;
    }else{
      this.router.navigate(["/login"]);
      return false;
    }
  }
}