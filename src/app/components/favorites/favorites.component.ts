import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  standalone: true,
  selector: 'app-favorites',
  imports: [CommonModule, RouterModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  items: Product[] = [];

  constructor(private svc: ProductService) {
    this.items = this.svc.getFavorites();
  }

  remove(p: Product) {
    this.svc.toggleFavorite(p.id);
    this.items = this.svc.getFavorites();
  }
}
