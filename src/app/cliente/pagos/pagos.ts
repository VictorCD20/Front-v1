import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-cliente-pagos',
    standalone: true,
    imports: [CommonModule, RouterLink, HeaderComponent],
    templateUrl: './pagos.html'
})
export class ClientePagosComponent implements OnInit {
    api = inject(ApiService);
    pagos = signal<any[]>([]);

    ngOnInit() {
        this.api.getPaymentMethods().subscribe({
            next: (data) => this.pagos.set(data)
        });
    }
}
