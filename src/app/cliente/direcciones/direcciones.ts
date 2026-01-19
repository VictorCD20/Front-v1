import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-cliente-direcciones',
    standalone: true,
    imports: [CommonModule, HeaderComponent],
    templateUrl: './direcciones.html',
    styles: [`
    .map-placeholder {
        background-image: radial-gradient(circle at 2px 2px, #e5e7eb 1px, transparent 0);
        background-size: 24px 24px;
    }
  `]
})
export class ClienteDireccionesComponent implements OnInit {
    api = inject(ApiService);
    direcciones = signal<any[]>([]);
    loading = signal(true);

    ngOnInit() {
        this.api.getAddresses().subscribe({
            next: (data) => {
                this.direcciones.set(data);
                this.loading.set(false);
            },
            error: () => this.loading.set(false)
        });
    }
}
