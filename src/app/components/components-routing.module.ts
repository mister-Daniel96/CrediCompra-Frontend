import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { AdministradorComponent } from './administrador/administrador.component';

const routes: Routes = [
  {
    path: 'cliente/:id',
    component: ClienteComponent,
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
