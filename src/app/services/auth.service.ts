import { Injectable, signal } from '@angular/core';

const CORRECT_PIN = '2121';
const STORAGE_KEY = 'hybrid-training-logged-in';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly isLoggedIn = signal<boolean>(localStorage.getItem(STORAGE_KEY) === 'true');

  tryLogin(pin: string): boolean {
    if (pin === CORRECT_PIN) {
      localStorage.setItem(STORAGE_KEY, 'true');
      this.isLoggedIn.set(true);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.isLoggedIn.set(false);
  }
}
