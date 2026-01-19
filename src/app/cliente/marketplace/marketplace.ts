import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/header/header';
import { MapaComponent } from '../../shared/mapa/mapa.component';
import { ApiService } from '../../services/api.service';
import { ProviderPackage } from '../../models';

@Component({
    selector: 'app-marketplace',
    standalone: true,
    imports: [RouterLink, FormsModule, HeaderComponent, MapaComponent],
    templateUrl: './marketplace.html'
})
export class MarketplaceComponent implements OnInit {
    searchQuery = '';
    selectedCategory = '';
    priceRange = '';

    private api = inject(ApiService);

    providers = signal<any[]>([]);
    categories = signal<string[]>([]);

    ngOnInit(): void {
        // TODO: Implement a real endpoint for categories in the backend
        const categoryList = ['DJ / Sonido', 'Catering', 'Fotografía', 'Decoración', 'Iluminación', 'Pastelería'];
        this.categories.set(categoryList);

        this.api.getProviderPackages().subscribe(packages => {
            const providersData = packages.map((p, index) => ({
                id: p.id,
                nombre: p.nombre,
                // Assign a category from the list cyclically for demonstration purposes
                categoria: categoryList[index % categoryList.length],
                precio: p.precio_base,
                rating: 4.5,
                ubicacion: 'CDMX',
                imagen: p.detalles_json?.imagen || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnSy6IARdd8wHEF_Ps8CaRlyhqB8SNcq5tCGwU0QC4h7aBIbE1e4vnqwd6xoGm2dJR9pGjhK6TKaCN359bbt65RpIAHgHvXUppFkUvMszWPvilDkiDtVL2TUpf4HhdNZiEaG3itGClvS6LLV91CkQPC4ynUx2bqOIQgROydpsWPK0Bugq1Cf_G_JBIr_JgCWn_phWoQ0Nyto8wQ0HAuU53PlFU_Nm08wTgrmcmx0VmV9CVDGPsMhWTcg4xGSHnXvd0mce1t9iI6GY'
            }));
            this.providers.set(providersData);
        });
    }

    get filteredProviders() {
        return this.providers().filter(p => {
            const matchesSearch = !this.searchQuery ||
                p.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                p.categoria.toLowerCase().includes(this.searchQuery.toLowerCase());
            const matchesCategory = !this.selectedCategory || p.categoria === this.selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }
}
