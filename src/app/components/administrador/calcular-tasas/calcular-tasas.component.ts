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
    time: 'diario',
    customTime: null,
    capitalization: 'diario',
    customCapitalization: null,
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

  onSelectChange(selectType: string) {
    if (selectType === 'time' && this.formData.time !== 'especial') {
      this.formData.customTime = null;
    }
    if (selectType === 'capitalization' && this.formData.capitalization !== 'especial') {
      this.formData.customCapitalization = null;
    }
  }

  onSubmit() {
    // Lógica para manejar el envío del formulario
    console.log('Datos del formulario:', this.formData);
  }
}
