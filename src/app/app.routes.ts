import { Routes } from '@angular/router';

// Shared - Keep Landing and Login eager for LCP/FCP
import { LandingComponent } from './shared/landing/landing';
import { LoginComponent } from './shared/login/login';

export const routes: Routes = [
    // General
    { path: '', component: LandingComponent },
    { path: 'login', component: LoginComponent },

    // Cliente
    {
        path: 'cliente/registro',
        loadComponent: () => import('./cliente/registro/registro').then(m => m.ClienteRegistroComponent)
    },
    {
        path: 'cliente/marketplace',
        loadComponent: () => import('./cliente/marketplace/marketplace').then(m => m.MarketplaceComponent)
    },
    {
        path: 'cliente/proveedor/:id',
        loadComponent: () => import('./cliente/proveedor-detalle/proveedor-detalle').then(m => m.ProveedorDetalleComponent)
    },
    {
        path: 'cliente/carrito',
        loadComponent: () => import('./cliente/carrito/carrito').then(m => m.CarritoComponent)
    },
    {
        path: 'cliente/dashboard',
        loadComponent: () => import('./cliente/dashboard/dashboard').then(m => m.ClienteDashboardComponent)
    },
    {
        path: 'cliente/solicitudes',
        loadComponent: () => import('./cliente/solicitudes/solicitudes.component').then(m => m.MisSolicitudesComponent)
    },
    {
        path: 'cliente/solicitudes/crear',
        loadComponent: () => import('./cliente/solicitudes/crear-solicitud.component').then(m => m.CrearSolicitudComponent)
    },
    {
        path: 'cliente/soporte',
        loadComponent: () => import('./cliente/soporte/soporte').then(m => m.ClienteSoporteComponent)
    },
    {
        path: 'cliente/direcciones',
        loadComponent: () => import('./cliente/direcciones/direcciones').then(m => m.ClienteDireccionesComponent)
    },
    {
        path: 'cliente/pagos',
        loadComponent: () => import('./cliente/pagos/pagos').then(m => m.ClientePagosComponent)
    },
    {
        path: 'cliente/pagos/anticipo',
        loadComponent: () => import('./cliente/pagos/anticipo/anticipo').then(m => m.ClientePagoAnticipoComponent)
    },
    {
        path: 'cliente/pagos/liquidar',
        loadComponent: () => import('./cliente/pagos/liquidar/liquidar').then(m => m.ClientePagoLiquidarComponent)
    },
    {
        path: 'cliente/pagos/recordatorio',
        loadComponent: () => import('./cliente/pagos/recordatorio/recordatorio').then(m => m.ClienteRecordatorioPagoComponent)
    },

    // Proveedor
    {
        path: 'proveedor/registro',
        loadComponent: () => import('./proveedor/registro/registro').then(m => m.ProveedorRegistroComponent)
    },
    {
        path: 'proveedor/dashboard',
        loadComponent: () => import('./proveedor/dashboard/dashboard').then(m => m.ProveedorDashboardComponent)
    },
    {
        path: 'proveedor/solicitudes',
        loadComponent: () => import('./proveedor/solicitudes/solicitudes').then(m => m.SolicitudesComponent)
    },
    {
        path: 'proveedor/agenda',
        loadComponent: () => import('./proveedor/agenda/agenda').then(m => m.AgendaComponent)
    },
    {
        path: 'proveedor/notificaciones',
        loadComponent: () => import('./proveedor/notificaciones/notificaciones').then(m => m.NotificacionesComponent)
    },
    {
        path: 'proveedor/paquetes',
        loadComponent: () => import('./proveedor/paquetes/paquetes').then(m => m.PaquetesComponent)
    },
    {
        path: 'proveedor/configuracion',
        loadComponent: () => import('./proveedor/configuracion/configuracion').then(m => m.ProveedorConfiguracionComponent)
    },

    // Fallback
    { path: '**', redirectTo: '' }
];
