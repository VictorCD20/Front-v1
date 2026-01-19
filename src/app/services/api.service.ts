import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import {
    User, ClientProfile, ProviderProfile, Cart, CartItem,
    ServiceRequest, Quote, Payment, ProviderPackage
} from '../models';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private readonly API_URL = environment.apiUrl;

    private http = inject(HttpClient);
    private auth = inject(AuthService);

    private getHeaders(): HttpHeaders {
        const token = this.auth.getToken();
        return new HttpHeaders({
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        });
    }

    // ==========================================
    // 1. Autenticación (/users)
    // ==========================================
    register(data: { correo_electronico: string; contrasena: string; rol: string }): Observable<any> {
        return this.http.post(`${this.API_URL}/users/register`, data);
    }

    login(correo_electronico: string, contrasena: string): Observable<any> {
        return this.http.post(`${this.API_URL}/users/login`, { correo_electronico, contrasena });
    }

    getUser(id: string): Observable<User> {
        return this.http.get<User>(`${this.API_URL}/users/${id}`, { headers: this.getHeaders() });
    }

    updateUser(id: string, data: Partial<User>): Observable<User> {
        return this.http.put<User>(`${this.API_URL}/users/${id}`, data, { headers: this.getHeaders() });
    }

    // ==========================================
    // 1B. Autenticación Proveedores Independientes
    // ==========================================
    registerProvider(data: {
        correo_electronico: string;
        contrasena: string;
        nombre_negocio: string;
        descripcion?: string;
        telefono?: string;
        direccion_formato?: string;
        categoria_principal_id?: string;
    }): Observable<any> {
        return this.http.post(`${this.API_URL}/perfil-proveedor/register`, data);
    }

    loginProvider(correo_electronico: string, contrasena: string): Observable<any> {
        return this.http.post(`${this.API_URL}/perfil-proveedor/login`, { correo_electronico, contrasena });
    }

    // ==========================================
    // 2. Perfil Cliente (/perfil-cliente)
    // ==========================================
    createClientProfile(data: Partial<ClientProfile>): Observable<ClientProfile> {
        return this.http.post<ClientProfile>(`${this.API_URL}/perfil-cliente`, data, { headers: this.getHeaders() });
    }

    getClientProfiles(): Observable<ClientProfile[]> {
        return this.http.get<ClientProfile[]>(`${this.API_URL}/perfil-cliente`, { headers: this.getHeaders() });
    }

    getClientProfile(id: string): Observable<ClientProfile> {
        return this.http.get<ClientProfile>(`${this.API_URL}/perfil-cliente/${id}`, { headers: this.getHeaders() });
    }

    updateClientProfile(id: string, data: Partial<ClientProfile>): Observable<ClientProfile> {
        return this.http.put<ClientProfile>(`${this.API_URL}/perfil-cliente/${id}`, data, { headers: this.getHeaders() });
    }

    // ==========================================
    // 3. Perfil Proveedor (/perfil-proveedor)
    // ==========================================
    createProviderProfile(data: Partial<ProviderProfile>): Observable<ProviderProfile> {
        return this.http.post<ProviderProfile>(`${this.API_URL}/perfil-proveedor`, data, { headers: this.getHeaders() });
    }

    getProviderProfiles(): Observable<ProviderProfile[]> {
        return this.http.get<ProviderProfile[]>(`${this.API_URL}/perfil-proveedor`, { headers: this.getHeaders() });
    }

    getProviderProfile(id: string): Observable<ProviderProfile> {
        return this.http.get<ProviderProfile>(`${this.API_URL}/perfil-proveedor/${id}`, { headers: this.getHeaders() });
    }

    updateProviderProfile(id: string, data: Partial<ProviderProfile>): Observable<ProviderProfile> {
        return this.http.put<ProviderProfile>(`${this.API_URL}/perfil-proveedor/${id}`, data, { headers: this.getHeaders() });
    }

    // ==========================================
    // 4. Carrito (/carrito)
    // ==========================================
    updateCart(id: string, data: Partial<Cart>): Observable<Cart> {
        return this.http.put<Cart>(`${this.API_URL}/carrito/${id}`, data, { headers: this.getHeaders() });
    }

    getCart(): Observable<Cart> {
        return this.http.get<Cart>(`${this.API_URL}/carrito`, { headers: this.getHeaders() });
    }

    // ==========================================
    // 5. Items Carrito (/items-carrito)
    // ==========================================
    addItemToCart(data: Partial<CartItem>): Observable<CartItem> {
        return this.http.post<CartItem>(`${this.API_URL}/items-carrito`, data, { headers: this.getHeaders() });
    }

    getCartItems(): Observable<CartItem[]> {
        return this.http.get<CartItem[]>(`${this.API_URL}/items-carrito`, { headers: this.getHeaders() });
    }

    deleteCartItem(id: string): Observable<any> {
        return this.http.delete(`${this.API_URL}/items-carrito/${id}`, { headers: this.getHeaders() });
    }

    // ==========================================
    // 6. Solicitudes (/solicitudes)
    // ==========================================
    createRequest(data: Partial<ServiceRequest>): Observable<ServiceRequest> {
        return this.http.post<ServiceRequest>(`${this.API_URL}/solicitudes`, data, { headers: this.getHeaders() });
    }

    getClientRequests(): Observable<ServiceRequest[]> {
        return this.http.get<ServiceRequest[]>(`${this.API_URL}/solicitudes/client`, { headers: this.getHeaders() });
    }

    getProviderRequests(): Observable<ServiceRequest[]> {
        return this.http.get<ServiceRequest[]>(`${this.API_URL}/solicitudes/provider`, { headers: this.getHeaders() });
    }

    updateRequestStatus(id: string, status: string): Observable<ServiceRequest> {
        return this.http.put<ServiceRequest>(`${this.API_URL}/solicitudes/${id}/status`, { status }, { headers: this.getHeaders() });
    }

    getRequests(): Observable<ServiceRequest[]> {
        return this.http.get<ServiceRequest[]>(`${this.API_URL}/solicitudes`, { headers: this.getHeaders() });
    }

    getRequest(id: string): Observable<ServiceRequest> {
        return this.http.get<ServiceRequest>(`${this.API_URL}/solicitudes/${id}`, { headers: this.getHeaders() });
    }

    updateRequest(id: string, data: Partial<ServiceRequest>): Observable<ServiceRequest> {
        return this.http.put<ServiceRequest>(`${this.API_URL}/solicitudes/${id}`, data, { headers: this.getHeaders() });
    }

    // ==========================================
    // 7. Cotizaciones (/cotizaciones)
    // ==========================================
    createQuote(data: Partial<Quote>): Observable<Quote> {
        return this.http.post<Quote>(`${this.API_URL}/cotizaciones`, data, { headers: this.getHeaders() });
    }

    getQuotes(): Observable<Quote[]> {
        return this.http.get<Quote[]>(`${this.API_URL}/cotizaciones`, { headers: this.getHeaders() });
    }

    updateQuote(id: string, data: Partial<Quote>): Observable<Quote> {
        return this.http.put<Quote>(`${this.API_URL}/cotizaciones/${id}`, data, { headers: this.getHeaders() });
    }

    // ==========================================
    // 8. Pagos (/pagos)
    // ==========================================
    createPayment(data: Partial<Payment>): Observable<Payment> {
        return this.http.post<Payment>(`${this.API_URL}/pagos`, data, { headers: this.getHeaders() });
    }

    getPayments(): Observable<Payment[]> {
        return this.http.get<Payment[]>(`${this.API_URL}/pagos`, { headers: this.getHeaders() });
    }

    updatePayment(id: string, data: Partial<Payment>): Observable<Payment> {
        return this.http.put<Payment>(`${this.API_URL}/pagos/${id}`, data, { headers: this.getHeaders() });
    }

    // ==========================================
    // 9. Paquetes Proveedor (/paquetes-proveedor)
    // ==========================================
    createProviderPackage(data: Partial<ProviderPackage>): Observable<ProviderPackage> {
        return this.http.post<ProviderPackage>(`${this.API_URL}/paquetes-proveedor`, data, { headers: this.getHeaders() });
    }

    getProviderPackages(): Observable<ProviderPackage[]> {
        return this.http.get<ProviderPackage[]>(`${this.API_URL}/paquetes-proveedor`, { headers: this.getHeaders() });
    }

    getProviderPackage(id: string): Observable<ProviderPackage> {
        return this.http.get<ProviderPackage>(`${this.API_URL}/paquetes-proveedor/${id}`);
    }

    updateProviderPackage(id: string, data: Partial<ProviderPackage>): Observable<ProviderPackage> {
        return this.http.put<ProviderPackage>(`${this.API_URL}/paquetes-proveedor/${id}`, data, { headers: this.getHeaders() });
    }

    deleteProviderPackage(id: string): Observable<any> {
        return this.http.delete(`${this.API_URL}/paquetes-proveedor/${id}`, { headers: this.getHeaders() });
    }

    // ==========================================
    // 10. Reseñas (/resenas)
    // ==========================================
    getReviews(proveedorId?: string): Observable<any[]> {
        let params = new HttpParams();
        if (proveedorId) {
            params = params.append('proveedor_id', proveedorId);
        }
        return this.http.get<any[]>(`${this.API_URL}/resenas`, { headers: this.getHeaders(), params });
    }

    // ==========================================
    // 11. Bloqueo Calendario (/bloqueos-calendario)
    // ==========================================
    getCalendarBlocks(): Observable<any[]> {
        return this.http.get<any[]>(`${this.API_URL}/bloqueos-calendario`, { headers: this.getHeaders() });
    }

    createCalendarBlock(data: { fecha: string; motivo?: string }): Observable<any> {
        return this.http.post<any>(`${this.API_URL}/bloqueos-calendario`, data, { headers: this.getHeaders() });
    }

    deleteCalendarBlock(id: string): Observable<any> {
        return this.http.delete(`${this.API_URL}/bloqueos-calendario/${id}`, { headers: this.getHeaders() });
    }

    // ==========================================
    // 12. Dashboard Proveedor
    // ==========================================
    getProviderDashboardMetrics(): Observable<any> {
        // Retorna KPIs: solicitudes nuevas, cotizaciones activas, ingresos mensuales
        return this.http.get<any>(`${this.API_URL}/dashboard/proveedor/metrics`, { headers: this.getHeaders() });
    }

    getRecentRequests(): Observable<ServiceRequest[]> {
        return this.http.get<ServiceRequest[]>(`${this.API_URL}/dashboard/proveedor/recent-requests`, { headers: this.getHeaders() });
    }

    getRecentPayments(): Observable<Payment[]> {
        return this.http.get<Payment[]>(`${this.API_URL}/dashboard/proveedor/recent-payments`, { headers: this.getHeaders() });
    }

    // ==========================================
    // 13. Categorías (/categorias-servicio)
    // ==========================================
    getServiceCategories(): Observable<any[]> {
        return this.http.get<any[]>(`${this.API_URL}/categorias-servicio`);
    }
    // ==========================================
    // 14. Direcciones (Mock for now)
    // ==========================================
    getAddresses(): Observable<any[]> {
        // Simulating backend response
        return new Observable(observer => {
            setTimeout(() => {
                observer.next([
                    {
                        id: '1',
                        nombre: 'Casa',
                        principal: true,
                        direccion: 'Calle de la Reforma 450, Interior 4B',
                        colonia: 'Col. Juárez, Ciudad de México, CP 06600'
                    },
                    {
                        id: '2',
                        nombre: 'Oficina',
                        principal: false,
                        direccion: 'Av. Insurgentes Sur 1602, Piso 12',
                        colonia: 'San Ángel, Ciudad de México, CP 01020'
                    },
                    {
                        id: '3',
                        nombre: 'Hacienda',
                        principal: false,
                        direccion: 'Carretera Federal Cuernavaca KM 24.5',
                        colonia: 'San Pedro Mártir, Tlalpan, CP 14650'
                    }
                ]);
            }, 500);
        });
    }

    // ==========================================
    // 15. Métodos de Pago (Mock for now)
    // ==========================================
    getPaymentMethods(): Observable<any[]> {
        return new Observable(observer => {
            setTimeout(() => {
                observer.next([
                    {
                        id: '1',
                        tipo: 'visa',
                        nombre: 'Visa acabada en 4242',
                        expiracion: '12/26',
                        principal: true,
                        icono: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbqXmWTcLpoNeI7ncm_Ne0FovYY5PIi6DwEAJqkfbvjaUVjkbpoREu9ba8XAsVmifJDvo2pF_O1rQZhF-tdVtcnFW4MhNtAY4ME3lqh-0_7Q1Hyv3dIU6f0ewBlD-xAhHcLj_TSGQNHVmBj_D-56hVM2sbCnbNkWK4QTQyIloPK6xIgwXGVlrFnuSjSopWKTkD9qMMF6JS1HCDEeQW9saxMWW98XDT3sqa_MNWerXoR9_8jO2rxseQd0XNQ0AM1shNpER1eRMS6cc'
                    },
                    {
                        id: '2',
                        tipo: 'mastercard',
                        nombre: 'Mastercard acabada en 8890',
                        expiracion: '05/25',
                        principal: false,
                        icono: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBnWNfdDrxXN7equpAcDkWLSlK72-Ucb8JIcoGia9QAxTJ-vWxs854OesFawLXekVZBg58Uft2Viz4Vgw5bNqiY-ARPpun3ZgxSY8NtYmmC5O2UymF6Xc3nNs2KYgfR5xOGwO8zh_cz-yDPWD75nm0wppCB4itVKKN2tQmAzb4Mv26V7Vu6cUO5CTD2opX9s8nkRYq6tf8QJDD963rcPixeSt3G6Og18wGkUGZIo6pptRNX6lIRJBP07cAw0uUfIZtFqoVqIgAD_c'
                    }
                ]);
                observer.complete();
            }, 500);
        });
    }
    // ==========================================
    // 16. Recordatorio de Pago (Mock)
    // ==========================================
    getPaymentReminder(): Observable<any> {
        return new Observable(observer => {
            setTimeout(() => {
                observer.next({
                    evento: 'Boda Martínez',
                    diasRestantes: 15,
                    proveedor: {
                        nombre: 'Sonic Audio Visuals',
                        descripcion: 'Paquete Premium de Iluminación y Sonido',
                        estado: 'Confirmado'
                    },
                    saldoPendiente: 12500.00,
                    fechaLimite: '05 de Octubre'
                });
                observer.complete();
            }, 500);
        });
    }
}

