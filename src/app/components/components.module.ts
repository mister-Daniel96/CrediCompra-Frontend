import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsRoutingModule } from './components-routing.module';
import { RouterModule } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { AdministradorComponent } from './administrador/administrador.component';



@NgModule({
  declarations: [
    ClienteComponent,
    AdministradorComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    RouterModule, //me causaba problema sino lo importo es para el routerLink[]
  

    
  ],
})
export class ComponentsModule {}
