import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../../shared/header/header';

@Component({
    selector: 'app-crear-solicitud',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent],
    templateUrl: './crear-solicitud.component.html',
    styles: []
})
export class CrearSolicitudComponent implements OnInit {
    private fb = inject(FormBuilder);
    private api = inject(ApiService);
    private router = inject(Router);
    private auth = inject(AuthService);
    private route = inject(ActivatedRoute);

    // Estado de UI
    checkingAvailability = signal(false);
    isAvailable = signal<boolean | null>(null); // null: not checked, true: available, false: occupied
    targetProviderId = '9851a62f-92db-41e8-b430-b68a3d46b578'; // Default/Fallback

    // Calendar Generation
    currentMonth = 'Octubre 2024';
    daysInMonth: (number | string)[] = [];

    solicitudForm: FormGroup = this.fb.group({
        fecha_servicio: ['', Validators.required], // Store selected day
        hora_servicio: ['19:00 PM', Validators.required],
        ubicacion: ['', Validators.required]
    });

    ngOnInit() {
        this.generateCalendar();

        // Leer ID del proveedor de la URL
        this.route.queryParams.subscribe(params => {
            if (params['providerId']) {
                this.targetProviderId = params['providerId'];
            }
        });
    }

    generateCalendar() {
        // Mock simple calendar generation for UI demo
        // Start padding
        this.daysInMonth = [29, 30];
        // Days 1-31
        for (let i = 1; i <= 31; i++) {
            this.daysInMonth.push(i);
        }
    }

    checkAvailability() {
        if (this.solicitudForm.invalid) {
            this.solicitudForm.markAllAsTouched();
            return;
        }

        this.checkingAvailability.set(true);
        this.isAvailable.set(null);

        // Simulate API delay
        setTimeout(() => {
            this.checkingAvailability.set(false);
            this.isAvailable.set(true); // Mock success
        }, 1500);
    }

    submitRequest() {
        if (!this.isAvailable()) return;

        // Create the actual request
        const formValue = this.solicitudForm.value;
        const solicitudData = {
            cliente_usuario_id: this.auth.currentUser()?.id,
            proveedor_usuario_id: this.targetProviderId,
            titulo_evento: 'Solicitud de Disponibilidad', // Default title
            fecha_servicio: new Date().toISOString(), // In real app, parse the selected date
            direccion_servicio: formValue.ubicacion,
            estado: 'pendiente' // New initial state
        };


        // Simulate navigation
        this.router.navigate(['/cliente/solicitudes']);
    }

    selectDate(day: any) {
        if (typeof day === 'number') {
            this.solicitudForm.patchValue({ fecha_servicio: day });
        }
    }

    isNumber(val: any): boolean {
        return typeof val === 'number';
    }
}
