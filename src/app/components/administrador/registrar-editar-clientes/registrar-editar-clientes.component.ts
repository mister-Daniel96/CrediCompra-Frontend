import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import * as bcrypt from 'bcryptjs';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registrar-editar-clientes',
  templateUrl: './registrar-editar-clientes.component.html',
  styleUrls: ['./registrar-editar-clientes.component.css'],
})
export class RegistrarEditarClientesComponent {
  form: FormGroup = new FormGroup({});
  mensaje: string = '';

  nuevoCliente: Usuario = new Usuario();
  edicion: boolean = false;
  id: number = 0;
  constructor(
    private ref: MatDialogRef<RegistrarEditarClientesComponent>,
    private formBuilder: FormBuilder,
    private uS: UsuarioService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    /* this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] !== null;
      this.init();
    }); */
    if (this.data != null && this.data.id != null && this.data.id != '') {
      this.edicion = true;
      this.id = this.data.id;
      this.init();
    }

    this.form = this.formBuilder.group({
      idUsuario: [],
      nameUsuario: ['', Validators.required],
      emailUsuario: ['', Validators.required],
      enabledUsuario: [],
      streetUsuario: ['', Validators.required],
      ageUsuario: [
        '',
        [Validators.required, Validators.min(18), Validators.max(70)],
      ],
      dniUsuario: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      creditUsuario: ['', [Validators.required]],
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.nuevoCliente.nameUsuario = this.form.value.nameUsuario.trim();
      const password: string = String(this.form.value.dniUsuario);
      const saltRounds: number = 12; // Número de rondas de sal

      // Hasheamos la contraseña
      this.nuevoCliente.passwordUsuario = bcrypt.hashSync(password, saltRounds);

      this.nuevoCliente.emailUsuario = this.form.value.emailUsuario.trim();
      this.nuevoCliente.enabledUsuario = true;
      this.nuevoCliente.streetUsuario = this.form.value.streetUsuario.trim();
      this.nuevoCliente.ageUsuario = parseInt(this.form.value.ageUsuario);
      this.nuevoCliente.dniUsuario = parseInt(this.form.value.dniUsuario);
      this.nuevoCliente.creditUsuario = parseFloat(
        this.form.value.creditUsuario
      );
      this.nuevoCliente.creditUsuarioAvailable = parseFloat(
        this.form.value.creditUsuario
      );

      if (this.edicion) {
        this.nuevoCliente.idUsuario = this.id;
        this.uS.update(this.nuevoCliente).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      } else {
        this.uS.insert(this.nuevoCliente).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
        this.snackbar.open('Usted fue registrado con exito!!! ', 'Aviso', {
          duration: 2000,
        });
      }

      this.closeDialog(); // CERRAMOS EL FORM
    } else {
      this.mensaje = 'Ingrese los datos correctos ! ! !';
      this.snackbar.open(this.mensaje, 'Aviso', {
        duration: 2000,
      });
    }
  }

  closeDialog() {
    this.ref.close();
  }

  registrar() {}
  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          idUsuario: data.idUsuario,
          nameUsuario: data.nameUsuario,
          emailUsuario: data.emailUsuario,
          streetUsuario: data.streetUsuario,
          ageUsuario: data.ageUsuario,
          dniUsuario: data.dniUsuario,
          creditUsuario: data.creditUsuario,
        });
      });
    }
  }
}
