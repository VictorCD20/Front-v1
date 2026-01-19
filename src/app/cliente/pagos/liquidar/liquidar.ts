import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../shared/header/header';

@Component({
    selector: 'app-cliente-pago-liquidar',
    standalone: true,
    imports: [CommonModule, RouterLink, HeaderComponent],
    templateUrl: './liquidar.html',
    styles: [`
    .bg-glacial-custom {
        background-color: #F8FFFF;
    }
  `]
})
export class ClientePagoLiquidarComponent { }
