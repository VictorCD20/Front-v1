import { Routes } from '@angular/router';

// Shared
import { LandingComponent } from './shared/landing/landing';
import { LoginComponent } from './shared/login/login';

// Cliente
import { ClienteRegistroComponent } from './cliente/registro/registro';
import { MarketplaceComponent } from './cliente/marketplace/marketplace';
import { ProveedorDetalleComponent } from './cliente/proveedor-detalle/proveedor-detalle';
import { CarritoComponent } from './cliente/carrito/carrito';
import { ClienteDashboardComponent } from './cliente/dashboard/dashboard';
import { CrearSolicitudComponent } from './cliente/solicitudes/crear-solicitud.component';
import { MisSolicitudesComponent } from './cliente/solicitudes/solicitudes.component';
import { ClienteSoporteComponent } from './cliente/soporte/soporte';
import { ClienteDireccionesComponent } from './cliente/direcciones/direcciones';
import { ClientePagosComponent } from './cliente/pagos/pagos';
import { ClientePagoAnticipoComponent } from './cliente/pagos/anticipo/anticipo';
import { ClientePagoLiquidarComponent } from './cliente/pagos/liquidar/liquidar';
import { ClienteRecordatorioPagoComponent } from './cliente/pagos/recordatorio/recordatorio';

// Proveedor
import { ProveedorRegistroComponent } from './proveedor/registro/registro';
import { ProveedorDashboardComponent } from './proveedor/dashboard/dashboard';
import { SolicitudesComponent } from './proveedor/solicitudes/solicitudes';
import { AgendaComponent } from './proveedor/agenda/agenda';
import { NotificacionesComponent } from './proveedor/notificaciones/notificaciones';
import { PaquetesComponent } from './proveedor/paquetes/paquetes';
import { ProveedorConfiguracionComponent } from './proveedor/configuracion/configuracion';

export const routes: Routes = [
    // General
    { path: '', component: LandingComponent },
    { path: 'login', component: LoginComponent },

    // Cliente
    { path: 'cliente/registro', component: ClienteRegistroComponent },
    { path: 'cliente/marketplace', component: MarketplaceComponent },
    { path: 'cliente/proveedor/:id', component: ProveedorDetalleComponent },
    { path: 'cliente/carrito', component: CarritoComponent },
    { path: 'cliente/dashboard', component: ClienteDashboardComponent },
    { path: 'cliente/solicitudes', component: MisSolicitudesComponent },
    { path: 'cliente/solicitudes/crear', component: CrearSolicitudComponent },
    { path: 'cliente/soporte', component: ClienteSoporteComponent },
    { path: 'cliente/direcciones', component: ClienteDireccionesComponent },
    { path: 'cliente/pagos', component: ClientePagosComponent },
    { path: 'cliente/pagos/anticipo', component: ClientePagoAnticipoComponent },
    { path: 'cliente/pagos/liquidar', component: ClientePagoLiquidarComponent },
    { path: 'cliente/pagos/recordatorio', component: ClienteRecordatorioPagoComponent },

    // Proveedor
    { path: 'proveedor/registro', component: ProveedorRegistroComponent },
    { path: 'proveedor/dashboard', component: ProveedorDashboardComponent },
    { path: 'proveedor/solicitudes', component: SolicitudesComponent },
    { path: 'proveedor/agenda', component: AgendaComponent },
    { path: 'proveedor/notificaciones', component: NotificacionesComponent },
    { path: 'proveedor/paquetes', component: PaquetesComponent },
    { path: 'proveedor/configuracion', component: ProveedorConfiguracionComponent },

    // Fallback
    { path: '**', redirectTo: '' }
];
