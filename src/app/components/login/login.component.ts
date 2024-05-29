import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtRequest } from 'src/app/models/jwtRequest';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  username: string = '';
  password: string = '';
  mensaje: string = '';
  form: FormGroup = new FormGroup({});
  id: number = 1;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private uS: UsuarioService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nameUsuario: [],
      passwordUsuario: [],
    });
  }
  login() {
    let request = new JwtRequest();
    request.nameUsuario = this.form.value.nameUsuario.trim();
    request.passwordUsuario = this.form.value.passwordUsuario.trim();
    console.log(request.nameUsuario);
    console.log(request.passwordUsuario);

    this.loginService.login(request).subscribe(
      (data: any) => {
        sessionStorage.setItem('token', data.jwttoken);

        this.captureId(request.nameUsuario).then((data) => {
          if (data != null) {
            this.id = data;
            console.log(this.id);
          }

          if (this.loginService.showRole() == 'CLIENTE') {
            this.router.navigate([`components/cliente/${this.id}`]);
          } else if (this.loginService.showRole() == 'ADMINISTRADOR') {
            this.router.navigate([`components/administrador/${this.id}`]);
          }
        });
      },
      (error) => {
        this.mensaje = 'Credenciales incorrectas ! ! !';
        //this.mensaje+=this.username+this.password;
        this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
      }
    );
  }

  captureId(username: string) {
    return new Promise<number | null>((resolve, reject) => {
      this.uS.list().subscribe(
        (data: Usuario[]) => {
          const user = data.find(
            (usuario: Usuario) => usuario.nameUsuario === username
          );

          if (user) {
            resolve(user.idUsuario);
          } else {
            resolve(null); // Retorna null si no se encuentra el usuario
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
