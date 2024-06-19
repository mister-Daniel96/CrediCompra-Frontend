import { credito } from './../../../models/credito';
import { Usuario } from './../../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { CreditoService } from 'src/app/services/credito.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-calcular-tasas',
  templateUrl: './calcular-tasas.component.html',
  styleUrls: ['./calcular-tasas.component.css'],
})
export class CalcularTasasComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  cred: credito = new credito();
  mensaje: string = '';
  listaUsuarios: Usuario[] = [];
  maxFecha: Date = moment().add(+1, 'days').toDate();

  typesAnnuities: { value: Boolean; viewValue: string }[] = [
    { value: true, viewValue: 'Con Anualidad' },
    { value: false, viewValue: 'Sin Anualidad' },
  ];
  NroMonth: { value: number; viewValue: string }[] = [
    { value: 1, viewValue: '1' },
    { value: 2, viewValue: '2' },
    { value: 3, viewValue: '3' },
    { value: 4, viewValue: '4' },
    { value: 5, viewValue: '5' },
    { value: 6, viewValue: '6' },
  ];
  checked = false;
  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuarioService,
    private cS: CreditoService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    console.log(this.listaUsuarios);
    this.form = this.formBuilder.group({
      nameUsuario: ['', Validators.required],
      interestRate: [Validators.required],
      duration: [Validators.required],
      currentValue: [Validators.required],
      annuities: [Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data; //paso todos los datos a la data
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.cred.usuario.idUsuario = this.form.value.nameUsuario;
      this.cred.interestRate = this.form.value.interestRate;
      this.cred.duration = this.form.value.duration;
      this.cred.dateRecorder = new Date(Date.now()); //no importa porque sera mandado por el backend
      this.cred.dateExpiration = this.form.value.dateExpiration;
      this.cred.currentValue = this.form.value.currentValue;
      this.cred.remainingAmount = this.form.value.currentValue;
      this.cred.annuities = this.form.value.annuities;
      this.cred.enableCredito = true;
      this.cred.annuities = this.form.value.annuities;

      console.log(this.cred);
      this.cS.insert(this.cred).subscribe((data) => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
        });
      });
      this.router.navigate(['components/administrador/:id']);
    } else {
      this.mensaje = 'Ingrese todos los campos!!';
    }
  }

  toggle(){
    
  }
}
