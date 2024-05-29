import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registrar-clientes',
  templateUrl: './registrar-clientes.component.html',
  styleUrls: ['./registrar-clientes.component.css'],
})
export class RegistrarClientesComponent {
  constructor(private ref: MatDialogRef<RegistrarClientesComponent>) {}

  /* closeDialog(){
    this.dialog.closeAll();
  }
    */

  closeDialog() {
    this.ref.close();
  }
}
