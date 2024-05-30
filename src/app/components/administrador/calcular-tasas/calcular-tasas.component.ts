import { Component } from '@angular/core';

@Component({
  selector: 'app-calcular-tasas',
  templateUrl: './calcular-tasas.component.html',
  styleUrls: ['./calcular-tasas.component.css']
})
export class CalcularTasasComponent {
  isEffectiveRate: boolean = false;

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
  }
}
