import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../shared/header/header';

@Component({
    selector: 'app-cliente-pago-anticipo',
    standalone: true,
    imports: [CommonModule, RouterLink, HeaderComponent],
    templateUrl: './anticipo.html',
    styles: [`
    .payment-card-active {
        border: 2px solid #e21d24;
        background-color: rgba(226, 29, 36, 0.05);
    }
  `]
})
export class ClientePagoAnticipoComponent { }
