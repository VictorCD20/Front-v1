import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
    selector: 'app-cliente-recordatorio-pago',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './recordatorio.html',
    styles: [`
    .bg-glacial-white {
        background-color: #F8FFFF;
    }
  `]
})
export class ClienteRecordatorioPagoComponent implements OnInit {
    api = inject(ApiService);
    reminder = signal<any>(null);

    ngOnInit() {
        this.api.getPaymentReminder().subscribe({
            next: (data) => this.reminder.set(data)
        });
    }
}
