import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { ProductService } from './app/services/product.service';
import { AuthService } from './app/services/auth.service';
import 'zone.js';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    ProductService,
    AuthService
  ]
}).catch(err => console.error(err));
