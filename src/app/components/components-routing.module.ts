import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { MispagosComponent } from './cliente/mispagos/mispagos.component';
import { MiInfoComponent } from './cliente/mi-info/mi-info.component';

const routes: Routes = [
  {
    path: 'cliente/:id',
    component: ClienteComponent,
    children:[
      {
        path:'mispagos',component:MispagosComponent
      },
      {
        path:'miInfo',component:MiInfoComponent
      }
    ]
  },
  {
    path: 'administrador/:id',
    component: AdministradorComponent,
  },
];

@NgModule({
  //Esto va y se copia
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule {}
