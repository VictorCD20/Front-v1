import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from '../../services/api.service';

export interface SolicitudCliente {
    id: string;
    titulo_evento: string;
    categoria: string;
    fecha_evento: string;
    hora_evento?: string; // New
    ubicacion?: string; // New
    creada_en: string;
    estado: 'pendiente' | 'cotizando' | 'contratado' | 'finalizado' | 'rechazada' | 'cancelada'; // Updated states
    cotizaciones_count: number;
    imagen_url?: string;
    proveedor_nombre?: string; // New
    proveedor_logo?: string; // New
    paquete_nombre?: string; // New
}

@Injectable({
    providedIn: 'root'
})
export class SolicitudesService {
    private api = inject(ApiService);

    getMisSolicitudes(): Observable<SolicitudCliente[]> {
        return this.api.getClientRequests().pipe(
            map((requests: any[]) => {
                return requests.map(req => ({
                    id: req.id,
                    titulo_evento: req.titulo_evento || 'Evento Sin Título',
                    categoria: this.inferirCategoria(req),
                    fecha_evento: req.fecha_servicio,
                    hora_evento: '19:00', // Mock/Default since not in DB yet
                    ubicacion: req.ubicacion || 'Ubicación por definir',
                    creada_en: req.creado_en,
                    estado: this.mapearEstado(req.estado),
                    cotizaciones_count: req.cotizaciones ? req.cotizaciones[0]?.count || 0 : 0,
                    imagen_url: this.getImagenCategoria(this.inferirCategoria(req)),
                    // These would come from a joined Provider/Package query in a real scenario
                    proveedor_nombre: 'Proveedor FestEasy',
                    proveedor_logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBV3oUk6sYAMVng-pOMSgE2HO2GeJh3JDol7-rXp98-eyNOyD-0jRLXXkk9M2eShoSeoEaIJdi9Nhjjqd--_n_LyLbCYLUbJvh7wtzHNryMtks1WiLWPgRR7Den5qASbnoIrmvkMxLBYjVVug2mFdEm16xw_SDkozfFAuRCdUQvBzQwB9e4knWjXY6rcdP36SMM90_M-LdCydMSCDr8ylMiP6uSS0X4bOvYlqmbgZ0bnj6U0iHWdpGJIqxGtAeLoXFD3cLLhFqrqK4',
                    paquete_nombre: 'Paquete Estándar'
                }));
            })
        );
    }

    private inferirCategoria(req: any): string {
        const keywords = (req.titulo_evento || '').toLowerCase();
        if (keywords.includes('boda') || keywords.includes('dj')) return 'Música';
        if (keywords.includes('cena') || keywords.includes('comida') || keywords.includes('banquete')) return 'Catering';
        if (keywords.includes('foto') || keywords.includes('sesion')) return 'Fotografía';
        return 'General';
    }

    private mapearEstado(estadoDb: string): 'pendiente' | 'cotizando' | 'contratado' | 'finalizado' | 'rechazada' | 'cancelada' {
        switch (estadoDb) {
            case 'pendiente_aprobacion': return 'pendiente';
            case 'esperando_anticipo': return 'cotizando';
            case 'reservado':
            case 'en_progreso':
            case 'entregado_pendiente_liq':
                return 'contratado';
            case 'finalizado': return 'finalizado';
            case 'rechazada': return 'rechazada';
            case 'cancelada':
            case 'abandonada':
                return 'cancelada';
            default: return 'pendiente';
        }
    }

    private getImagenCategoria(cat: string): string {
        switch (cat) {
            case 'Música': return 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtcJUr-JtW20cyMFS3aDbjGtFWcEY_FTC0yyJeTCHRAZFj2Z67t3rOsxHkAkkIYj_5dexFQ3MeXRg8_s9aw74uckME30X6r3tGU-gn2a6NGvdroChex_0Q4-tFyAQL2qMjRKwWeJQ4lwILM9VrfQK-wRPF7ida3UaFA33B15sIVwCCg7nN1RvsJIfxxVYEYUXCUpSJsBT0uX2sLpULVchJxzpYRJS4BsX1AnqOSfOj_E_hZiadJ6xU8YNXnCcT7571ExIYAkjENs4';
            case 'Catering': return 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMJLULNeLIXTUPeGlrwCzZ82n3QaVbg-mVNPbkimhIH_pSUXqRVX_mBQ6bdNvryBmKfucZmrs-5nYilSE4sHa2OkyDXUCnhZJeYAjB3b7wc0oX-t9oqVZcVvFgMWp8wkOgmd7kJCL6EtF79-Gt-NkTQzL_grnXoJuKOFfN7ugn5PfZsKpZ7w2B4LhC5ZOqS_i3Dx2-vizmURkH2zdEnf4z27Gv3RgfRRv7Q9LENBFXqCc8p-c9LxC2ZkRbyjmv5-B_qhfm55iseOM';
            case 'Fotografía': return 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPmDm_sv6R0mOW2exX5R_Ycv8cAfwUXBHfVj1Fgp_L9BK1OJDr8JGNHY3_1-VQ7Am4W0Q-iB5Wl79f7j81aTPvPSayDiw_Dm56_oBlgnl8JwcVRdHyb9CM4rOL1BDxNjyuGt5JGACu5rgD_YzJhbUJaXOvb3LaRcybq5BBCuU8Ek_62Ej-lLNwyxEiPZO-vnLB5Q1rtRnGEnWfBpJdkalnRyPuX8R2td2rShxy5mR1JeVuuD6GF74TYIj4fbP9rTecr11iIs5N-hU';
            default: return 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
        }
    }
}
