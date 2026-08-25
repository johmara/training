import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly pin = signal('');
  readonly error = signal(false);

  digit(n: string): void {
    if (this.pin().length < 4) {
      this.pin.update((p) => p + n);
      this.error.set(false);
    }
  }

  clear(): void {
    this.pin.set('');
    this.error.set(false);
  }

  submit(): void {
    if (this.auth.tryLogin(this.pin())) {
      this.router.navigateByUrl('/');
    } else {
      this.pin.set('');
      this.error.set(true);
    }
  }
}
