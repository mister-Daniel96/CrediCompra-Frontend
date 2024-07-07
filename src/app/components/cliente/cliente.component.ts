import { Component, ViewChild, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent {
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
    { texto: 'Proximos pagos', ruta: 'mispagos', icon: './assets/images/pagos.png' }  ];

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
