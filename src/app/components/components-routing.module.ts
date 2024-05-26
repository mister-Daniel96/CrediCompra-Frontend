import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { MispagosComponent } from './cliente/mispagos/mispagos.component';
import { MiInfoComponent } from './cliente/mi-info/mi-info.component';
import { DashboardComponent } from './administrador/dashboard/dashboard.component';
import { CalcularTasasComponent } from './administrador/calcular-tasas/calcular-tasas.component';
import { ProximosPagosComponent } from './administrador/proximos-pagos/proximos-pagos.component';
import { RegistrarClientesComponent } from './administrador/registrar-clientes/registrar-clientes.component';

const routes: Routes = [
  {
    path: 'cliente/:id',
    component: ClienteComponent,
    children: [
      {
        path: 'mispagos',
        component: MispagosComponent,
      },
      {
        path: 'miInfo',
        component: MiInfoComponent,
      },
    ],
  },
  {
    path: 'administrador/:id',
    component: AdministradorComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'calcularTasas',
        component: CalcularTasasComponent,
      },
      {
        path: 'proximosPagos',
        component: ProximosPagosComponent,
      },
      {
        path: 'registrarCliente',
        component: RegistrarClientesComponent,
      },
    ],
  },
];

@NgModule({
  //Esto va y se copia
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule {}
