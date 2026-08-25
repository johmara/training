import { Injectable, effect, signal } from '@angular/core';

const THEME_KEY = 'theme-preference';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly isDarkMode = signal<boolean>(this.readInitialTheme());

  constructor() {
    effect(() => this.applyTheme(this.isDarkMode()));

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        this.isDarkMode.set(e.matches);
      }
    });
  }

  toggleTheme(): void {
    const next = !this.isDarkMode();
    this.isDarkMode.set(next);
    localStorage.setItem(THEME_KEY, next ? 'dark' : 'light');
  }

  private readInitialTheme(): boolean {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private applyTheme(isDark: boolean): void {
    document.documentElement.classList.toggle('dark-mode', isDark);
  }
}
