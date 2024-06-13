import { Usuario } from './../../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-calcular-tasas',
  templateUrl: './calcular-tasas.component.html',
  styleUrls: ['./calcular-tasas.component.css'],
})
export class CalcularTasasComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  listaUsuarios: Usuario[] = [];

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

  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuarioService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute
  ) {}
  /* isEffectiveRate: boolean = false;

  formData = {
    capital: '',
    time: '',
    capitalization: '',
    currency: 'USD',
    interestRate: '',
    loanDuration: '',
    clientType: ''
  };

  toggleRateType() {
    if (this.isEffectiveRate) {
      this.formData.capitalization = '';
    }
  }

  onSubmit() {
    // Lógica para manejar el envío del formulario
    console.log('Datos del formulario:', this.formData);
  } */
  ngOnInit(): void {
    console.log(this.listaUsuarios);
    this.form = this.formBuilder.group({
      nameUsuario: ['',Validators.required],
      interestRate: [Validators.required],
      duration: [Validators.required],
      currentValue: [Validators.required],
      annuities: [Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data; //paso todos los datos a la data
    });
  }
  aceptar() {}
}
