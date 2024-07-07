import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, map, switchMap, tap } from 'rxjs';
import { credito } from 'src/app/models/credito';
import { pago } from 'src/app/models/pago';
import { Usuario } from 'src/app/models/usuario';
import { CreditoService } from 'src/app/services/credito.service';
import { PagoService } from 'src/app/services/pago.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-crear-credito',
  templateUrl: './crear-credito.component.html',
  styleUrls: ['./crear-credito.component.css'],
})
export class CrearCreditoComponent {
  form: FormGroup = new FormGroup({});
  creditoRecuperado: credito = new credito();
  pagoCredito: pago = new pago();
  cred: credito = new credito();
  mensaje: string = '';
  listaUsuarios: Usuario[] = [];
  listaPagos: pago[] = [];
  maxFecha: Date = moment().add(+1, 'days').toDate();
  dataSource: MatTableDataSource<credito> = new MatTableDataSource();
  displayedColumns: string[] = [
    'currentValue',
    'nameUsuario',
    'dateRecorded',
    'numeroCuotas',
    'pagar',
  ];

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
  gracePeriods: { value: number; viewValue: string }[] = [
    { value: 0, viewValue: '0' },
    { value: 1, viewValue: '1' },
    { value: 2, viewValue: '2' },
  ];

  checked = false;

  showDatePicker: boolean = false;
  showDuration: boolean = true;
  showGracePeriod: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuarioService,
    private cS: CreditoService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private pS: PagoService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nameUsuario: ['', Validators.required],
      interestRate: ['', Validators.required],
      duration: ['', Validators.required],
      currentValue: ['', Validators.required],
      annuities: [true, Validators.required], // Valor por defecto: true (Con Anualidad)
      dateExpiration: [null], // Inicialmente null
      gracePeriod: [null], // Inicialmente null
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data; // Paso todos los datos a la data
    });

    // Subscribirse a cambios en el campo de 'annuities'
    this.form.get('annuities')?.valueChanges.subscribe((value) => {
      this.onAnnuityChange(value);
    });

    // Configurar el formulario según el valor inicial de 'annuities'
    this.onAnnuityChange(this.form.get('annuities')?.value);

    this.dataload();
  }

  onAnnuityChange(value: boolean): void {
    if (value) {
      // Con Anualidad
      this.showDatePicker = false;
      this.form.get('dateExpiration')?.setValue(null); // Asignar null a dateExpiration
      this.form.get('dateExpiration')?.clearValidators();
      this.form.get('dateExpiration')?.updateValueAndValidity();

      this.showDuration = true;
      this.form.get('duration')?.setValidators(Validators.required);
      this.form.get('duration')?.updateValueAndValidity();

      this.showGracePeriod = true;
      this.form.get('gracePeriod')?.setValidators(Validators.required);
      this.form.get('gracePeriod')?.updateValueAndValidity();
    } else {
      // Sin Anualidad
      this.showDatePicker = true;
      this.form.get('dateExpiration')?.setValidators(Validators.required);
      this.form.get('dateExpiration')?.updateValueAndValidity();

      this.showDuration = false;
      this.form.get('duration')?.setValue(null); // Asignar null a duration
      this.form.get('duration')?.clearValidators();
      this.form.get('duration')?.updateValueAndValidity();

      this.showGracePeriod = false;
      this.form.get('gracePeriod')?.setValue(0); // Asignar 0 a gracePeriod
      this.form.get('gracePeriod')?.clearValidators();
      this.form.get('gracePeriod')?.updateValueAndValidity();
    }
  }

  aceptar(): void {
    if (this.form.valid) {
      this.cred.usuario.idUsuario = this.form.value.nameUsuario;
      this.cred.interestRate = this.form.value.interestRate;
      this.cred.duration = this.form.value.duration;
      this.cred.dateRecorded = new Date(Date.now()); // No importa porque sera mandado por el backend
      this.cred.dateExpiration = this.form.value.dateExpiration; // Asegúrate de acceder correctamente a este valor
      this.cred.currentValue = this.form.value.currentValue;
      this.cred.remainingAmount = this.form.value.currentValue;
      this.cred.annuities = this.form.value.annuities;
      this.cred.enableCredito = true;
      this.cred.gracePeriod = this.form.value.gracePeriod;

      console.log(this.cred);
      this.cS.insert(this.cred).subscribe((data) => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
        });
      });
      /*  this.router.navigate(['components/administrador/:id']);  */
    } else {
      this.mensaje = 'Ingrese todos los campos!!';
    }
  }

  fileName = 'ExcelSheet.xlsx';
  exportarExcel() {
    let data = document.getElementById('table-data');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fileName);
  }

  dataload() {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      console.log(this.dataSource);
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    console.log(this.dataSource);
  }
  //=======================================================
  pagarTodo(id: number) {
    this.cS.listId(id).pipe(
      tap(data => {
        this.creditoRecuperado = data;
        this.crearPago(this.creditoRecuperado);
        this.creditoRecuperado.enableCredito = false;
      }),
      switchMap(credito => this.cS.update(credito)),
      switchMap(() => this.cS.list())
    ).subscribe(data => {
      this.cS.setList(data);
    });
  }

  crearPago(credito: any) { // Asegúrate de ajustar el tipo adecuadamente
    this.recuperarPagos(credito.idCredito).subscribe(data => {
      this.listaPagos = data;

      let vna: number = 0;
      this.listaPagos.forEach((x, index) => {
        let calculo = x.amountPago / Math.pow((1 + (x.credito.interestRate / 100)), index);
        vna += calculo;
      });

      this.pagoCredito.amountPago = vna;
      this.pagoCredito.credito.idCredito = credito.idCredito;
      this.pagoCredito.enablePago = false;
      this.pagoCredito.dateExpiration = credito.dateExpiration;
      this.pagoCredito.dateRecorded = credito.dateRecorded;

      this.pS.insert(this.pagoCredito).pipe(
        switchMap(() => this.pS.list())
      ).subscribe(data => {
        this.pS.setList(data);
        
        // Para eliminar los pagos después de insertar el nuevo pago
        this.listaPagos.forEach(x => {
          this.pS.delete(x.idPago).pipe(
            switchMap(() => this.pS.list())
          ).subscribe(data => {
            this.pS.setList(data);
          });
        });
      });
    });
  }

  recuperarPagos(id: number): Observable<pago[]> {
    return this.pS.list().pipe(
      map((data) => {
        return data.filter((x) => x.credito.idCredito === id && x.credito.enableCredito === true);
      })
    );
  }
}

