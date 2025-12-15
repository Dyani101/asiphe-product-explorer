# Product Explorer (Angular)

Hello! Please follow the steps below to run the app

A modern Angular application for browsing, searching, and managing products. The app includes a catalog view, product detail pages, favorites persistence, and a protected admin area.

---

## ▶️ Running the Application

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npx ng serve
```

Once running, open your browser and navigate to:

```
http://localhost:4200
```

The app runs in **development mode** with hot reload enabled. Any changes to the source code will automatically refresh the browser.

---

## 🧭 Application Routes

The application is structured around the following routes:

| Route          | Description                                |
| -------------- | ------------------------------------------ |
| `/`            | Product catalog (default landing page)     |
| `/product/:id` | Product detail view for a selected product |
| `/favorites`   | List of user-favorited products            |
| `/admin`       | Admin dashboard (protected by auth guard)  |
| `**`           | Redirects to catalog      |

### Route Configuration

```ts
export const routes: Routes = [
  { path: '', component: CatalogComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'admin', component: AdminCom
```
