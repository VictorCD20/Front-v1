import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'festeasy_token';
  private readonly USER_KEY = 'festeasy_user';

  isLoggedIn = signal(this.hasToken());
  currentUser = signal<any>(this.getStoredUser());

  private encrypt(data: string): string {
    return btoa(data); // Simple obfuscation (Base64) - For real security use HttpOnly cookies
  }

  private decrypt(data: string): string {
    try {
      return atob(data);
    } catch {
      return '';
    }
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  private getStoredUser(): any {
    const user = localStorage.getItem(this.USER_KEY);
    try {
      return user ? JSON.parse(this.decrypt(user)) : null;
    } catch (e) {
      return null;
    }
  }

  getToken(): string | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return token ? this.decrypt(token) : null;
  }

  login(token: string, user: any): void {
    localStorage.setItem(this.TOKEN_KEY, this.encrypt(token));
    localStorage.setItem(this.USER_KEY, this.encrypt(JSON.stringify(user)));
    this.isLoggedIn.set(true);
    this.currentUser.set(user);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.isLoggedIn.set(false);
    this.currentUser.set(null);
  }

  isClient(): boolean {
    return this.currentUser()?.rol === 'client';
  }

  isProvider(): boolean {
    return this.currentUser()?.rol === 'provider';
  }
}
