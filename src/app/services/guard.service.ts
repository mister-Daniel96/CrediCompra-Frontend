import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class GuardService {
  constructor(private lService: LoginService, private router: Router) {}
  //siempre se usa esta funcion para la activacion de la ruta y retorna un boolean
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const rpta = this.lService.verificar();
    if (!rpta) {
      this.router.navigate(['/login']); //sino existe un sessionStorage con 'token' retorna a login
      return false;
    }
    return rpta;
  }
  nuevo() {}
  //sino es valido te retorna al mismo login
}
