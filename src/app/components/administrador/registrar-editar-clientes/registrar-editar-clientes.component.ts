import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as bcrypt from 'bcryptjs';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registrar-editar-clientes',
  templateUrl: './registrar-editar-clientes.component.html',
  styleUrls: ['./registrar-editar-clientes.component.css']
})
export class RegistrarEditarClientesComponent {
  form: FormGroup = new FormGroup({});
  mensaje: string = '';

  nuevoCliente: Usuario = new Usuario();
  constructor(
    private ref: MatDialogRef<RegistrarEditarClientesComponent>,
    private formBuilder: FormBuilder,
    private uS: UsuarioService,
    private snackbar: MatSnackBar
  ) {}

  /* closeDialog(){
    this.dialog.closeAll();
  }
    */

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idUsuario: [],
      nameUsuario: ['',Validators.required],
      passwordUsuario: [''],
      emailUsuario: ['',Validators.required],
      enabledUsuario: [],
      streetUsuario: ['',Validators.required],
      ageUsuario: ['',[Validators.required,Validators.min(18),Validators.max(70)]],
      dniUsuario: ['',[Validators.required, Validators.pattern('^[0-9]{8}$')]],
      creditUsuario: ['',Validators.required],
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.nuevoCliente.nameUsuario = this.form.value.nameUsuario.trim();
      this.nuevoCliente.passwordUsuario = bcrypt.hashSync(
        this.form.value.dniUsuario.trim(),
        12
      );
      this.nuevoCliente.emailUsuario = this.form.value.emailUsuario.trim();
      this.nuevoCliente.enabledUsuario = true;
      this.nuevoCliente.streetUsuario = this.form.value.streetUsuario.trim();
      this.nuevoCliente.ageUsuario = parseInt(this.form.value.ageUsuario.trim());
      this.nuevoCliente.dniUsuario = parseInt(this.form.value.dniUsuario.trim());
      this.nuevoCliente.creditUsuario = parseInt(this.form.value.creditUsuario);

      console.log(this.nuevoCliente)
      this.uS.insert(this.nuevoCliente).subscribe((data) => {
        this.uS.list().subscribe((data) => {
          this.uS.setList(data);
        });
      });
      this.snackbar.open('Usted fue registrado con exito!!! ', 'Aviso', {
        duration: 2000,
      });
      this.closeDialog();// CERRAMOS EL FORM
    } else {
      this.mensaje = 'Ingrese los datos correctos ! ! !';
      this.snackbar.open(this.mensaje, 'Aviso', {
        duration: 2000,
      })
    }
  }
  closeDialog() {
    this.ref.close();
  }

  registrar() {}
}
