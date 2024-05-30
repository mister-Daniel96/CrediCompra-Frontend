import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  displayedColumnsHPagos: string[] = [ 'fecha', 'cliente', 'monto'];
  displayedColumnsPPagos: string[] = [ 'cliente', 'fecha', 'monto'];
  dataSourceHPagos = DataHistorialPagos;
}
  export interface HistorialdePagos {
    fecha: string;
    cliente: string;
    monto: number;
  }

const DataHistorialPagos: HistorialdePagos[] = [
  { fecha: '15/05/2023', cliente: 'Juan Pérez', monto: 500 },
  { fecha: '28/11/2022', cliente: 'María García', monto: 1200 },
  { fecha: '03/09/2023', cliente: 'Pedro Martínez', monto: 800 },
  { fecha: '10/12/2022', cliente: 'Luisa Rodríguez', monto: 300 },
  { fecha: '21/07/2023', cliente: 'Carlos Sánchez', monto: 1500 },
  { fecha: '09/04/2022', cliente: 'Ana López', monto: 600 },
  { fecha: '18/08/2022', cliente: 'Diego González', monto: 700 },
  { fecha: '05/06/2023', cliente: 'Laura Díaz', monto: 900 },
  { fecha: '30/10/2022', cliente: 'José Romero', monto: 1100 },
  { fecha: '14/02/2023', cliente: 'Sofía Hernández', monto: 1000 },
];
