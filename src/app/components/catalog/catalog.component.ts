import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  standalone: true,
  selector: 'app-catalog',
  imports: [CommonModule, RouterModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {
  products: Product[] = [];
  private q = '';

  constructor(private svc: ProductService) {
    this.load();
  }

  load() {
    this.products = this.svc.list(this.q);
  }

  onSearch(value: string) {
    this.q = value;
    this.load();
  }

  toggleFav(p: Product) {
    this.svc.toggleFavorite(p.id);
    this.load();
  }

  isFav(p: Product) {
    return this.svc.isFavorite(p.id);
  }
}
