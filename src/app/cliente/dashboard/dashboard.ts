import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { HeaderComponent } from '../../shared/header/header';

@Component({
    selector: 'app-cliente-dashboard',
    standalone: true,
    imports: [RouterLink, HeaderComponent],
    templateUrl: './dashboard.html'
})
export class ClienteDashboardComponent implements OnInit {
    auth = inject(AuthService);
    api = inject(ApiService);
    router = inject(Router);

    // Métricas
    metricas = signal({
        eventosActivos: 0,
        cotizacionesPendientes: 0,
        inversionTotal: 0
    });

    // Evento activo (el más próximo)
    eventoActivo = signal<any>(null);

    // Actividad reciente (solicitudes)
    actividades = signal<any[]>([]);

    loading = signal(true);

    ngOnInit(): void {
        this.cargarDatos();
    }

    cargarDatos(): void {
        this.api.getClientRequests().subscribe({
            next: (requests) => {
                // Mapear solicitudes a actividades
                const actividades = requests.slice(0, 5).map(req => ({
                    id: req.id,
                    proveedor: 'Proveedor',
                    servicio: req.titulo_evento || 'Servicio',
                    fecha: new Date(req.fecha_servicio).toLocaleDateString('es-MX'),
                    estado: req.estado,
                    estadoLabel: this.formatEstado(req.estado),
                    monto: 0,
                    icono: '📋'
                }));
                this.actividades.set(actividades);

                // Métricas
                const pendientes = requests.filter(r => r.estado === 'pendiente_aprobacion').length;
                this.metricas.set({
                    eventosActivos: requests.filter(r => ['aceptada', 'negociacion'].includes(r.estado)).length,
                    cotizacionesPendientes: pendientes,
                    inversionTotal: 0
                });

                this.loading.set(false);
            },
            error: () => this.loading.set(false)
        });
    }

    private formatEstado(estado: string): string {
        const estados: Record<string, string> = {
            'pendiente': 'Pendiente',
            'negociacion': 'En negociación',
            'reservado': 'Reservado',
            'rechazada': 'Rechazado',
            'completada': 'Completado',
            'cancelada': 'Cancelado'
        };
        return estados[estado] || estado;
    }

    getUserName(): string {
        const user = this.auth.currentUser();
        return user?.nombre || user?.correo_electronico?.split('@')[0] || 'Usuario';
    }

    getUserEmail(): string {
        const user = this.auth.currentUser();
        return user?.correo_electronico || 'usuario@example.com';
    }

    logout() {
        this.auth.logout();
        this.router.navigate(['/login']);
    }
}
