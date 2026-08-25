export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  load: string;
  notes: string;
  type?: 'circuit' | 'finisher';
}

export interface Session {
  name: string;
  slug: string;
  description: string;
  strengthBased: boolean;
  exercises: Exercise[];
}

export type Block = 'all' | 'base' | 'build' | 'peak';

export interface Day {
  name: string;
  sessionSlugs: string[];
}

export interface Week {
  week: number;
  block: Exclude<Block, 'all'>;
  days: Day[];
}
