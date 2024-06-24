import { Component, OnInit } from '@angular/core';
import { credito } from 'src/app/models/credito';
import { pago } from 'src/app/models/pago';
import { CreditoService } from 'src/app/services/credito.service';
import { PagoService } from 'src/app/services/pago.service';

@Component({
  selector: 'app-proximos-pagos',
  templateUrl: './proximos-pagos.component.html',
  styleUrls: ['./proximos-pagos.component.css'],
})
export class ProximosPagosComponent implements OnInit {
  listaPagos: pago[] = [];
  pagoRecuperado: pago = new pago();
  constructor(private pS: PagoService) {}
  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.listaPagos = data.sort(
        (a, b) =>
          new Date(a.dateExpiration).getTime() -
          new Date(b.dateExpiration).getTime()
      );
    });
  }

  realizarPago(id: number) {
    this.pS.listId(id).subscribe((data) => {
      this.pagoRecuperado = data;

      this.pagoRecuperado.enablePago = false;
      console.log(this.pagoRecuperado);
      this.pS.update(this.pagoRecuperado).subscribe(() => {
        this.pS.list().subscribe((data) => {
          this.pS.setList(data);
        });
      });
    });
  }
}
