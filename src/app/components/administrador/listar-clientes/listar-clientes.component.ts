import { UsuarioService } from 'src/app/services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from 'src/app/models/usuario';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { RegistrarEditarClientesComponent } from '../registrar-editar-clientes/registrar-editar-clientes.component';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css'],
})
export class ListarClientesComponent implements OnInit {
  isLoadingResults = true; // o falso según la lógica de tu aplicación
  isRateLimitReached = false;
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  displayedColumns: string[] = [
    /* 'codigo', */
    'nombre',
    'email',
    'estado',
    'direccion',
    'edad',
    'dni',
    'creditoMaximo',
    'saldoActual',
    'accion01',
  ];

  id: number = 1;
  constructor(private uS: UsuarioService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      console.log(this.dataSource);
    });
    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  openDialog() {
    this.dialog.open(RegistrarEditarClientesComponent, {
      width: '50%',
      height: '400px',
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  removeClient(id: number) {
    this.uS.delete(id).subscribe((data) => {
      console.log('error');
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
    });
  }
  openDialog2(id: number) {
    this.dialog.open(RegistrarEditarClientesComponent, {
      enterAnimationDuration: '1000',
      exitAnimationDuration: '1100',
      width: '50%',
      height: '500px',
      data: {
        id: id,
      },
    });
  }
  editClient(id: number) {
    this.openDialog2(id);
  }
  fileName = 'ExcelSheet.xlsx';
  exportarExcel() {
    let data = document.getElementById('table-data');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fileName);
  }
}
