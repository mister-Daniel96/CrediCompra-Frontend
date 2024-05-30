import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsRoutingModule } from './components-routing.module';
import { RouterModule } from '@angular/router';
import {FormsModule} from "@angular/forms";
import { AdministradorComponent } from './administrador/administrador.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ClienteComponent } from './cliente/cliente.component';
import { MispagosComponent } from './cliente/mispagos/mispagos.component';
import { MiInfoComponent } from './cliente/mi-info/mi-info.component';
import { DashboardComponent } from './administrador/dashboard/dashboard.component';
import { CalcularTasasComponent } from './administrador/calcular-tasas/calcular-tasas.component';
import { ProximosPagosComponent } from './administrador/proximos-pagos/proximos-pagos.component';
import { RegistrarClientesComponent } from './administrador/registrar-clientes/registrar-clientes.component';
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";



@NgModule({
  declarations: [
    AdministradorComponent,
    ClienteComponent,
    MispagosComponent,
    MiInfoComponent,
    DashboardComponent,
    CalcularTasasComponent,
    ProximosPagosComponent,
    RegistrarClientesComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    FormsModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    //me causaba problema sino lo importo es para el routerLink[]


  ],
})
export class ComponentsModule {}
