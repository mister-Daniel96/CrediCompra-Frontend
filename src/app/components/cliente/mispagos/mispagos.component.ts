import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pago } from 'src/app/models/pago';
import { PagoService } from 'src/app/services/pago.service';

@Component({
  selector: 'app-mispagos',
  templateUrl: './mispagos.component.html',
  styleUrls: ['./mispagos.component.css']
})
export class MispagosComponent {
  listaPagos: pago[] = [];
  id=0;
  pagoRecuperado: pago = new pago();
  constructor(private pS: PagoService,
    public route: ActivatedRoute, private router: Router
  ) {}
  ngOnInit(): void {

    this.route.params.subscribe((data) => {
      this.id = +data['id'];
    });
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
        this.ngOnInit()
      });
    });
  }
}
