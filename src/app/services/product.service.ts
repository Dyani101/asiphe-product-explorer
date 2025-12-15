import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';

type SortMode = 'none' | 'price-asc' | 'price-desc';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly storageKey = 'asiphe_favs';

  private readonly initialProducts: Product[] = [
    { id: 'p1', title: 'Compact Headphones', description: 'Lightweight, noise-isolating', price: 79, category: 'Audio' },
    { id: 'p2', title: 'Travel Backpack', description: 'Compact with laptop sleeve', price: 119, category: 'Bags' },
    { id: 'p3', title: 'Wireless Mouse', description: 'Ergonomic, long battery', price: 39, category: 'Peripherals' },
    { id: 'p4', title: '4K Monitor', description: '27-inch, HDR', price: 329, category: 'Displays' },
    { id: 'p5', title: 'Mechanical Keyboard', description: 'RGB, tactile switches', price: 99, category: 'Peripherals' }
  ];

  private productsSubject = new BehaviorSubject<Product[]>(this.initialProducts.slice());
  readonly products$: Observable<Product[]> = this.productsSubject.asObservable();

  private searchSubject = new BehaviorSubject<string>('');
  readonly search$ = this.searchSubject.asObservable();

  private categorySubject = new BehaviorSubject<string | null>(null);
  readonly category$ = this.categorySubject.asObservable();

  private sortSubject = new BehaviorSubject<SortMode>('none');
  readonly sort$ = this.sortSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  readonly loading$ = this.loadingSubject.asObservable();

  private errorSubject = new BehaviorSubject<string | null>(null);
  readonly error$ = this.errorSubject.asObservable();

  private favoritesSubject = new BehaviorSubject<Set<string>>(this.loadFavoritesFromStorage());
  readonly favorites$ = this.favoritesSubject.asObservable();

  readonly filteredProducts$: Observable<Product[]> = combineLatest([
    this.products$,
    this.search$,
    this.category$,
    this.sort$
  ]).pipe(
    map(([products, search, category, sort]) => {
      const q = (search || '').trim().toLowerCase();
      let list = products.slice();

      if (category) {
        const cat = category.toLowerCase();
        list = list.filter(p => (p.category || '').toLowerCase() === cat);
      }

      if (q) {
        list = list.filter(p =>
          p.title.toLowerCase().includes(q) ||
          (p.description || '').toLowerCase().includes(q) ||
          (p.category || '').toLowerCase().includes(q)
        );
      }

      if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
      else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);

      return list;
    })
  );

  constructor() {}

  list(query?: string): Product[] {
    const q = (query || '').trim().toLowerCase();
    const snapshot = this.productsSubject.getValue();
    if (!q && this.categorySubject.getValue() === null && this.sortSubject.getValue() === 'none') {
      return snapshot.slice();
    }
    return snapshot.filter(p =>
      (!q || p.title.toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q) || (p.category || '').toLowerCase().includes(q)) &&
      (!this.categorySubject.getValue() || (p.category || '').toLowerCase() === (this.categorySubject.getValue() || '').toLowerCase())
    ).sort((a, b) => {
      const s = this.sortSubject.getValue();
      if (s === 'price-asc') return a.price - b.price;
      if (s === 'price-desc') return b.price - a.price;
      return 0;
    });
  }

  getById(id: string): Product | null {
    return this.productsSubject.getValue().find(p => p.id === id) || null;
  }

  getFavorites(): Product[] {
    const ids = Array.from(this.favoritesSubject.getValue());
    return this.productsSubject.getValue().filter(p => ids.includes(p.id));
  }

  toggleFavorite(id: string) {
    const favs = new Set(this.favoritesSubject.getValue());
    if (favs.has(id)) favs.delete(id); else favs.add(id);
    this.favoritesSubject.next(favs);
    this.persistFavoritesToStorage(favs);
  }

  isFavorite(id: string): boolean {
    return this.favoritesSubject.getValue().has(id);
  }

  setSearch(q: string) { this.searchSubject.next(q); }
  setCategory(cat: string | null) { this.categorySubject.next(cat); }
  setSort(s: SortMode) { this.sortSubject.next(s); }

  load(simulateErrorRate = 0.05, minDelay = 300, maxDelay = 900): Promise<void> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);
    return new Promise((resolve, reject) => {
      const delayMs = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
      setTimeout(() => {
        if (Math.random() < simulateErrorRate) {
          const err = 'Failed to load products (simulated)';
          this.errorSubject.next(err);
          this.loadingSubject.next(false);
          reject(new Error(err));
          return;
        }
        this.productsSubject.next(this.initialProducts.slice());
        this.loadingSubject.next(false);
        resolve();
      }, delayMs);
    });
  }

  private loadFavoritesFromStorage(): Set<string> {
    try {
      const raw = localStorage.getItem(this.storageKey);
      const ids: string[] = raw ? JSON.parse(raw) : [];
      return new Set(ids);
    } catch {
      return new Set<string>();
    }
  }

  private persistFavoritesToStorage(favs: Set<string>) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(Array.from(favs)));
    } catch (err) {
      console.error('ProductService: failed to persist favorites to localStorage:', err);
    }
  }
}
