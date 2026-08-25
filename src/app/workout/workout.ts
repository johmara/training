import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { map } from 'rxjs';
import { Exercise } from '../models/session.model';
import { sessionBySlug } from '../data/schedule.data';
import { exerciseVideoIds } from '../data/exercise-video-ids';
import { DarkModeToggle } from '../dark-mode-toggle/dark-mode-toggle';

@Component({
  selector: 'app-workout',
  imports: [RouterLink, DarkModeToggle],
  templateUrl: './workout.html',
  styleUrl: './workout.scss'
})
export class Workout {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly sanitizer = inject(DomSanitizer);

  private readonly slug = toSignal(this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')), {
    initialValue: this.route.snapshot.paramMap.get('slug') ?? ''
  });

  readonly session = computed(() => sessionBySlug.get(this.slug()));

  constructor() {
    effect(() => {
      if (!this.session()) {
        this.router.navigateByUrl('/');
      }
    });
  }

  readonly circuitExercises = computed(() => this.session()?.exercises.filter((e) => e.type === 'circuit') ?? []);
  readonly finisherExercises = computed(() => this.session()?.exercises.filter((e) => e.type === 'finisher') ?? []);
  readonly otherExercises = computed(() => this.session()?.exercises.filter((e) => !e.type) ?? []);

  readonly openVideoFor = signal<Exercise | null>(null);

  hasVideo(exercise: Exercise): boolean {
    return !!exerciseVideoIds[exercise.name];
  }

  videoEmbedUrl(exercise: Exercise): SafeResourceUrl {
    const id = exerciseVideoIds[exercise.name];
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube-nocookie.com/embed/${id}`);
  }

  videoSearchUrl(exercise: Exercise): string {
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.name + ' exercise')}`;
  }

  toggleVideo(exercise: Exercise): void {
    this.openVideoFor.set(this.openVideoFor() === exercise ? null : exercise);
  }
}
