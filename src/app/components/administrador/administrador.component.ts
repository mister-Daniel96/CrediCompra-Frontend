import { Component, ViewChild, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent {
  id: number = 0;
  private breakpointObserver = inject(BreakpointObserver);
  @ViewChild('drawer') drawer!: MatSidenav;
  constructor(public route: ActivatedRoute) {}
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.id = data['id'];
    });
  }

  cerrar() {
    sessionStorage.clear();
  }
  toggleSidenav(): void {
    if (window.innerWidth < 960) {
      // Verifica si el ancho de la ventana es menor que 960px
      this.drawer.toggle(); // Si es menor, toggla el sidenav
    }
  }
  // Declara drawer como ViewChild de MatSidenav
  //Se crea la funcion toggleSidenav y se agrega en cada boton
}
