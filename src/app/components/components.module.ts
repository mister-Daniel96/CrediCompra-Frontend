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
import { DashboardComponent } from './administrador/dashboard/dashboard.component';
import { CalcularTasasComponent } from './administrador/calcular-tasas/calcular-tasas.component';
import { ProximosPagosComponent } from './administrador/proximos-pagos/proximos-pagos.component';
import { RegistrarClientesComponent } from './administrador/registrar-clientes/registrar-clientes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarClientesComponent } from './administrador/listar-clientes/listar-clientes.component';
import { EditarClientesComponent } from './administrador/editar-clientes/editar-clientes.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
@NgModule({
  declarations: [
    AdministradorComponent,
    ClienteComponent,
    MispagosComponent,
    MiInfoComponent,
    DashboardComponent,
    CalcularTasasComponent,
    ProximosPagosComponent,
    RegistrarClientesComponent,
    ListarClientesComponent,
    EditarClientesComponent,
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    //me causaba problema sino lo importo es para el routerLink[]
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatNativeDateModule,
    FormsModule,
    MatInputModule,
    MatMenuModule
    
  ],
})
export class ComponentsModule {}
