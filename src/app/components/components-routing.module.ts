import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { MispagosComponent } from './cliente/mispagos/mispagos.component';
import { MiInfoComponent } from './cliente/mi-info/mi-info.component';
import { DashboardComponent } from './administrador/dashboard/dashboard.component';
import { ProximosPagosComponent } from './administrador/proximos-pagos/proximos-pagos.component';
import { ListarClientesComponent } from './administrador/listar-clientes/listar-clientes.component';
import { RegistrarEditarClientesComponent } from './administrador/registrar-editar-clientes/registrar-editar-clientes.component';
import { CrearCreditoComponent } from './administrador/crear-credito/crear-credito.component';

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
        path: 'crearCredito',
        component: CrearCreditoComponent,
      },
      {
        path: 'proximosPagos',
        component: ProximosPagosComponent,
      },
      {
        path: 'listarClientes',
        component: ListarClientesComponent,
      },{
        path:'registrarClientes',
        component:RegistrarEditarClientesComponent
      }
    ],
  },
];

@NgModule({
  //Esto va y se copia
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule {}
