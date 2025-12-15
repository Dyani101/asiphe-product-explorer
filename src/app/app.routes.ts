import { Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', component: CatalogComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];
