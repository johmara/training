import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Block } from '../models/session.model';
import { schedule, sessionBySlug } from '../data/schedule.data';
import { AuthService } from '../services/auth.service';
import { DarkModeToggle } from '../dark-mode-toggle/dark-mode-toggle';

@Component({
  selector: 'app-schedule',
  imports: [RouterLink, DarkModeToggle],
  templateUrl: './schedule.html',
  styleUrl: './schedule.scss'
})
export class Schedule {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly blocks: { key: Block; label: string }[] = [
    { key: 'all', label: 'All Weeks' },
    { key: 'base', label: 'Base (1-3)' },
    { key: 'build', label: 'Build (4-6)' },
    { key: 'peak', label: 'Peak (7-9)' }
  ];

  readonly selectedBlock = signal<Block>('all');
  private readonly expandedWeeks = signal<Set<number>>(new Set());

  readonly weeks = computed(() => {
    const block = this.selectedBlock();
    return schedule.filter((w) => block === 'all' || w.block === block);
  });

  readonly sessionBySlug = sessionBySlug;

  selectBlock(block: Block): void {
    this.selectedBlock.set(block);
  }

  isExpanded(week: number): boolean {
    return this.expandedWeeks().has(week);
  }

  toggleWeek(week: number): void {
    const next = new Set(this.expandedWeeks());
    if (next.has(week)) {
      next.delete(week);
    } else {
      next.add(week);
    }
    this.expandedWeeks.set(next);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
