import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsRoutingModule } from './components-routing.module';
import { RouterModule } from '@angular/router';
import { AdministradorComponent } from './administrador/administrador.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ClienteComponent } from './cliente/cliente.component';
import { MispagosComponent } from './cliente/mispagos/mispagos.component';
import { MiInfoComponent } from './cliente/mi-info/mi-info.component';



@NgModule({
  declarations: [
    AdministradorComponent,
    ClienteComponent,
    MispagosComponent,
    MiInfoComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule, //me causaba problema sino lo importo es para el routerLink[]
  

    
  ],
})
export class ComponentsModule {}
