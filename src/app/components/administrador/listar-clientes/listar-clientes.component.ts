import { UsuarioService } from 'src/app/services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistrarClientesComponent } from '../registrar-clientes/registrar-clientes.component';
import { Usuario } from 'src/app/models/usuario';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css'],
})
export class ListarClientesComponent implements OnInit{
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'nombre',
    'email',
    'estado',
    'direccion',
    'edad',
    'dni',
    'creditoMaximo',
     'accion01' 
  ];
  
  id:number=1;
  constructor(private uS: UsuarioService, private dialog: MatDialog) {}


  ngOnInit(): void {

    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      console.log(this.dataSource)
    });
    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
   
  }
  openDialog() {
    this.dialog.open(RegistrarClientesComponent, {
      width: '50%',
      height: '400px',
    });
  }
}
