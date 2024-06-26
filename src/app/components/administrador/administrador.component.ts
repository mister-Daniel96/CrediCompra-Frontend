import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  id: number = 0;
  private breakpointObserver = inject(BreakpointObserver);
  @ViewChild('drawer') drawer!: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  botones = [
    { texto: 'Dashboard', ruta: 'dashboard', icon: './assets/images/dashboard.png' },
    { texto: 'Registrar credito', ruta: 'crearCredito', icon: './assets/images/calculadora.png' },
    { texto: 'Proximos pagos', ruta: 'proximosPagos', icon: './assets/images/pagos.png' },
    { texto: 'Listar Clientes', ruta: 'listarClientes', icon: './assets/images/cuentas.png' }
  ];

  constructor(public route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.id = +data['id'];
    });
  }

  cerrar() {
    sessionStorage.clear();
  }

  toggleSidenav(): void {
    if (window.innerWidth < 960) {
      this.drawer.toggle();
    }
  }

  isLinkActive(ruta: string): boolean {
    return this.router.url.includes(ruta);
  }
}
