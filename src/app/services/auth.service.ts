import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private key = 'asiphe_isAdmin';
  isAdmin() { return localStorage.getItem(this.key) === 'true'; }
  toggleAdmin() { const next = !this.isAdmin(); localStorage.setItem(this.key, String(next)); }
}
