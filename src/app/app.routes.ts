import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Schedule } from './schedule/schedule';
import { Workout } from './workout/workout';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: '', component: Schedule, canActivate: [authGuard] },
  { path: ':slug', component: Workout, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
