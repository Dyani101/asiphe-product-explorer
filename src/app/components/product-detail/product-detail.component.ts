import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  product: Product | null = null;
  isFav = false;

  constructor(private route: ActivatedRoute, private svc: ProductService) {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.product = this.svc.getById(id);
    if (this.product) this.isFav = this.svc.isFavorite(this.product.id);
  }

  toggleFav() {
    if (!this.product) return;
    this.svc.toggleFavorite(this.product.id);
    this.isFav = this.svc.isFavorite(this.product.id);
  }
}
