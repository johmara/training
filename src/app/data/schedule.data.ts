import { Day, Exercise, Session, Week } from '../models/session.model';
import { slugify } from '../utils/slug';

interface RawSession {
  name: string;
  description: string;
  strengthBased: boolean;
  exercises: Exercise[];
}

const rawSessions: RawSession[] = [
  {
    name: 'Power Circuit W1',
    description: '<strong>Format: Circuit</strong> 10 rounds, 60s work / 30s rest (~20 min). Explosive power development. Focus: jump mechanics, pulling power, and anti-rotation core stability. Warm-up with Runna Easy Run before circuit.',
    strengthBased: true,
    exercises: [
      { name: 'Pull-Ups', sets: '3', reps: 'reps', load: 'Bodyweight (band-assisted if fatigued)', notes: 'Tall chest, elbows down, full ROM', type: 'circuit' },
      { name: 'Box Jump', sets: '4-6', reps: 'reps', load: 'Base height / 50-60 cm', notes: 'Soft landing, step down, max intent not height', type: 'circuit' },
      { name: 'Anti-Rotation Core', sets: '10-12', reps: 's hold', load: 'Pallof hold / band press / cable iso', notes: 'Brace like a sideways push', type: 'finisher' },
      { name: 'Achilles Elasticity', sets: '10', reps: 'reps', load: 'Pogo hops or line hops', notes: 'Light, snappy, pain-free', type: 'finisher' }
    ]
  },
  {
    name: 'Power Circuit W2',
    description: '<strong>Format: Circuit</strong> 10 rounds, 60s work / 30s rest (~20 min). Olympic lifting power. Focus: clean pulls, lateral explosiveness, rotational control. Warm-up with Runna Easy Run before circuit.',
    strengthBased: true,
    exercises: [
      { name: 'Power Clean Pull', sets: '3', reps: 'reps', load: 'Light-moderate load', notes: 'Fast triple extension, reset each rep', type: 'circuit' },
      { name: 'Lateral Box Jump', sets: '4-6', reps: 'reps', load: 'Base height / 50-60 cm', notes: 'Explosive sideways takeoff, soft landing', type: 'circuit' },
      { name: 'Pallof Hold', sets: '10-12', reps: 's hold', load: 'Band or cable', notes: 'Brace like a sideways push', type: 'finisher' },
      { name: 'Achilles Elasticity', sets: '10', reps: 'reps', load: 'Pogo hops or line hops', notes: 'Light, snappy, pain-free', type: 'finisher' }
    ]
  },
  {
    name: 'Power Circuit W3',
    description: '<strong>Format: Circuit</strong> 10 rounds, 60s work / 30s rest (~20 min). Max intent power. Focus: landmine explosiveness, broad jump distance, core tension. Warm-up with Runna Easy Run before circuit.',
    strengthBased: true,
    exercises: [
      { name: 'Explosive Landmine Press', sets: '3', reps: 'reps', load: 'Light-moderate load', notes: 'Max bar speed, controlled catch', type: 'circuit' },
      { name: 'Broad Jump', sets: '4-6', reps: 'reps', load: 'Base height / 50-60 cm', notes: 'Full recovery between reps', type: 'circuit' },
      { name: 'RKC Plank', sets: '10-12', reps: 's hold', load: 'Bodyweight, max tension', notes: 'Glutes + abs squeezed hard', type: 'finisher' },
      { name: 'Achilles Elasticity', sets: '10', reps: 'reps', load: 'Pogo hops or line hops', notes: 'Light, snappy, pain-free', type: 'finisher' }
    ]
  },
  {
    name: 'Core + Achilles W1',
    description: '<strong>Format: Straight Sets</strong>. Foundation tendon work. Focus: anti-rotation pressing, eccentric Achilles loading, adductor stability.',
    strengthBased: true,
    exercises: [
      { name: 'Pallof Press', sets: '3x12', reps: '', load: 'Band or cable', notes: 'Slow press out, resist rotation' },
      { name: 'Hollow Hold', sets: '3x20', reps: 's', load: 'Bodyweight', notes: 'Ribs down, lower back flat' },
      { name: 'Eccentric Heel Drop', sets: '3x15', reps: '', load: 'Bodyweight', notes: 'Slow eccentric, 3s down' },
      { name: 'Tibialis Raise', sets: '3x20', reps: '', load: 'Bodyweight', notes: 'Full range' },
      { name: 'Copenhagen Plank', sets: '2x20', reps: 's', load: 'Bodyweight', notes: 'Hips level, brace through adductors' }
    ]
  },
  {
    name: 'Core + Achilles W2',
    description: '<strong>Format: Straight Sets</strong>. Extended isometric holds. Focus: max tension planks, single-leg balance, heavier eccentric Achilles.',
    strengthBased: true,
    exercises: [
      { name: 'RKC Plank', sets: '3x20-30', reps: 's', load: 'Bodyweight, max tension', notes: 'Glutes + abs squeezed hard' },
      { name: 'Dead Bug', sets: '3x10', reps: '', load: 'Bodyweight', notes: 'Slow, opposite arm/leg, ribs down' },
      { name: 'Bent-Knee Heel Drop', sets: '3x15', reps: '', load: 'Bodyweight', notes: 'Slow eccentric, knee soft' },
      { name: 'Tibialis Raise', sets: '3x20', reps: '', load: 'Bodyweight', notes: 'Full range' },
      { name: 'Single-Leg Balance Reach', sets: '2x10', reps: '/side', load: 'Bodyweight', notes: 'Slow, controlled reach' }
    ]
  },
  {
    name: 'Core + Achilles W3',
    description: '<strong>Format: Straight Sets</strong>. Single-leg stability & intrinsic foot work. Focus: rotational chops, hip stability, foot mechanics.',
    strengthBased: true,
    exercises: [
      { name: 'Cable / Band Chop', sets: '3x10', reps: '/side', load: 'Light-moderate load', notes: 'Rotate from hips, not lower back' },
      { name: 'Hip Airplane', sets: '3x5', reps: '/side', load: 'Bodyweight', notes: 'Slow, controlled, stable stance leg' },
      { name: 'Eccentric Heel Drop', sets: '3x15', reps: '', load: 'Bodyweight', notes: 'Slow eccentric, 3s down' },
      { name: 'Tibialis Raise', sets: '3x20', reps: '', load: 'Bodyweight', notes: 'Full range' },
      { name: 'Foot Intrinsic Work', sets: '2x20', reps: 's', load: 'Bodyweight', notes: 'Short-foot hold, toes relaxed' }
    ]
  },
  {
    name: 'Strength + Press W1',
    description: '<strong>Format: Straight Sets</strong>. Strength baseline. Focus: trap-bar deadlift, landmine press, accessory work at 60-70% 1RM. Follow with Extended Cycling (45 min Zone 2) for active recovery.',
    strengthBased: true,
    exercises: [
      { name: 'Trap-Bar Deadlift', sets: '3x5', reps: '', load: '60-70% 1RM', notes: 'Establish baseline load' },
      { name: 'Single-Leg RDL', sets: '3x6', reps: '/side', load: 'Light DB', notes: 'Establish baseline load' },
      { name: 'Landmine Press', sets: '3x8', reps: '', load: 'Establish baseline', notes: 'Controlled tempo' },
      { name: 'Push-Ups', sets: '2x12', reps: '', load: 'Bodyweight', notes: 'Full lockout, tight core' },
      { name: 'Cable Chops', sets: '3x10', reps: '', load: 'Light-moderate', notes: 'Rotate from hips' },
      { name: 'Eccentric Heel Drop', sets: '3x15', reps: '', load: 'Bodyweight', notes: 'Slow eccentric, 3s down' },
      { name: 'Tibialis Raise', sets: '2x20', reps: '', load: 'Bodyweight', notes: 'Full range' }
    ]
  },
  {
    name: 'Cleans + Overhead Press W2',
    description: '<strong>Format: Straight Sets</strong>. Olympic lifting strength. Focus: power cleans, overhead pressing, dynamic power transfer. Follow with Extended Cycling (45 min Zone 2) for active recovery.',
    strengthBased: true,
    exercises: [
      { name: 'Power Clean', sets: '5x3', reps: '', load: '40-50% 1RM', notes: 'Focus on triple extension' },
      { name: 'Dumbbell Overhead Press', sets: '3x8', reps: '', load: 'Base load', notes: 'Strict press, no lean-back' },
      { name: 'Push Press', sets: '2x5', reps: '', load: 'Moderate load', notes: 'Drive from legs, punch overhead' },
      { name: 'Hollow Hold', sets: '3x20', reps: 's', load: 'Bodyweight', notes: 'Ribs down, lower back flat' },
      { name: 'Bent-Knee Heel Drop', sets: '3x15', reps: '', load: 'Bodyweight', notes: 'Slow eccentric, knee soft' },
      { name: 'Tibialis Raise', sets: '2x20', reps: '', load: 'Bodyweight', notes: 'Full range' }
    ]
  },
  {
    name: 'Bench + Rotation Power W3',
    description: '<strong>Format: Straight Sets</strong>. Upper body pressing + rotational power. Focus: bench press, med ball throws, landmine twists. Follow with Extended Cycling (45 min Zone 2) for active recovery.',
    strengthBased: true,
    exercises: [
      { name: 'Bench Press', sets: '3x5', reps: '', load: '65-70% 1RM', notes: 'Establish baseline' },
      { name: 'Single-Arm Row', sets: '3x8', reps: '', load: 'Moderate DB', notes: 'Full stretch, no torso rotation' },
      { name: 'Med Ball Rotational Throw', sets: '4x6', reps: '', load: 'Moderate intent', notes: 'Explosive, full recovery' },
      { name: 'Landmine Twist', sets: '3x8', reps: '/side', load: 'Light-moderate', notes: 'Controlled rotation, braced core' },
      { name: 'Eccentric Heel Drop', sets: '3x15', reps: '', load: 'Bodyweight', notes: 'Slow eccentric, 3s down' },
      { name: 'Tibialis Raise', sets: '2x20', reps: '', load: 'Bodyweight', notes: 'Full range' }
    ]
  },
  {
    name: 'Runna Intervals',
    description: '<strong>Format: Follow App</strong>. High-intensity aerobic power intervals for aerobic capacity building.',
    strengthBased: false,
    exercises: [
      { name: 'High-Intensity Running Intervals', sets: 'Per app', reps: '', load: 'Per app', notes: 'Follow Runna plan' }
    ]
  },
  {
    name: 'Runna Easy Run',
    description: '<strong>Format: Steady State, Zone 2</strong>. Aerobic base building. Warm-up before circuits or standalone conditioning.',
    strengthBased: false,
    exercises: [
      { name: 'Easy Run', sets: 'Per app', reps: '', load: 'Zone 2', notes: 'Aerobic base building' }
    ]
  },
  {
    name: 'Handball',
    description: '<strong>Format: Sport-Specific</strong>. Team training for agility, coordination, and sport conditioning.',
    strengthBased: false,
    exercises: [
      { name: 'Team Training', sets: '--', reps: '', load: '--', notes: 'Skill & conditioning' }
    ]
  },
  {
    name: 'Extended Cycling',
    description: '<strong>Format: Steady Ride, Zone 2</strong> 45 minutes. Active recovery cycling after strength work to support aerobic base without fatigue.',
    strengthBased: false,
    exercises: [
      { name: 'Steady Ride', sets: '45 min', reps: '', load: 'Zone 2', notes: 'Active recovery' }
    ]
  },
  {
    name: 'Long Run',
    description: '<strong>Format: Steady State, Zone 2</strong>. Aerobic development for endurance adaptation and weekly volume.',
    strengthBased: false,
    exercises: [
      { name: 'Endurance Run', sets: '--', reps: '', load: 'Zone 2', notes: 'Steady aerobic pace' }
    ]
  },
  {
    name: 'Power Circuit W3 (Deload)',
    description: '<strong>Format: Circuit Deload</strong> 6-7 rounds, 60s work / 30s rest (~12-14 min, -40% volume). Max intent, sharpen not fatigue. Deload week emphasis on movement quality.',
    strengthBased: true,
    exercises: [
      { name: 'Explosive Landmine Press', sets: '3', reps: 'reps', load: 'Light-moderate load', notes: 'Max bar speed, controlled catch', type: 'circuit' },
      { name: 'Broad Jump', sets: '4-6', reps: 'reps', load: 'Max intent, -40% volume', notes: 'Full recovery between reps', type: 'circuit' },
      { name: 'RKC Plank', sets: '10-12', reps: 's hold', load: 'Bodyweight, max tension', notes: 'Glutes + abs squeezed hard', type: 'finisher' },
      { name: 'Achilles Elasticity', sets: '10', reps: 'reps', load: 'Pogo hops or line hops', notes: 'Light, snappy, pain-free', type: 'finisher' }
    ]
  },
  {
    name: 'Explosive + Tendon Testing',
    description: '<strong>Format: Testing</strong>. Max effort testing day. Measure: countermovement jump, broad jump, lateral jump, shot speed/wall impact, single-leg heel raise, tibialis endurance. Record all results.',
    strengthBased: true,
    exercises: [
      { name: 'Countermovement Jump', sets: 'Max', reps: 'attempt', load: '--', notes: 'Record result' },
      { name: 'Broad Jump', sets: 'Max', reps: 'attempt', load: '--', notes: 'Record result' },
      { name: 'Lateral Jump', sets: 'Max', reps: 'attempt', load: '--', notes: 'Record result' },
      { name: 'Shot Speed / Wall Impact Test', sets: 'Max', reps: 'attempt', load: '--', notes: 'Record result' },
      { name: 'Single-Leg Heel Raise Test', sets: 'Max', reps: 'reps', load: '--', notes: 'Record result' },
      { name: 'Tibialis Endurance Test', sets: 'Max', reps: 'reps', load: '--', notes: 'Record result' }
    ]
  },
  {
    name: 'Strength + Power Testing',
    description: '<strong>Format: Testing</strong>. Max effort strength testing day. Measure: trap-bar deadlift 3RM, bench press 3RM, landmine press 5RM, power clean best single, med ball rotational throw max distance, landmine twist peak load. Record all results. Follow with easy cycling (Zone 1-2) for recovery.',
    strengthBased: true,
    exercises: [
      { name: 'Trap-Bar Deadlift', sets: '3RM', reps: '', load: '--', notes: 'Record result' },
      { name: 'Bench Press', sets: '3RM', reps: '', load: '--', notes: 'Record result' },
      { name: 'Landmine Press', sets: '5RM', reps: '', load: '--', notes: 'Record result' },
      { name: 'Power Clean', sets: 'Best', reps: 'crisp single', load: '--', notes: 'Record result' },
      { name: 'Med Ball Rotational Throw', sets: 'Max', reps: 'distance', load: '--', notes: 'Record result' },
      { name: 'Landmine Twist', sets: 'Peak', reps: 'load', load: '--', notes: 'Record result' }
    ]
  }
];

export const sessions: Session[] = rawSessions.map((s) => ({
  name: s.name,
  slug: slugify(s.name),
  description: s.description,
  strengthBased: s.strengthBased,
  exercises: s.exercises
}));

export const sessionBySlug: Map<string, Session> = new Map(sessions.map((s) => [s.slug, s]));

function day(name: string, ...sessionNames: string[]): Day {
  return { name, sessionSlugs: sessionNames.map(slugify) };
}

export const schedule: Week[] = [
  { week: 1, block: 'base', days: [
    day('Mon', 'Handball'), day('Tue', 'Runna Easy Run', 'Power Circuit W1'), day('Wed', 'Runna Intervals'),
    day('Thu', 'Core + Achilles W1'), day('Fri', 'Strength + Press W1', 'Extended Cycling'), day('Sat', 'Long Run'), day('Sun')
  ]},
  { week: 2, block: 'base', days: [
    day('Mon', 'Handball'), day('Tue', 'Runna Easy Run', 'Power Circuit W2'), day('Wed', 'Runna Intervals'),
    day('Thu', 'Core + Achilles W2'), day('Fri', 'Cleans + Overhead Press W2', 'Extended Cycling'), day('Sat', 'Long Run'), day('Sun')
  ]},
  { week: 3, block: 'base', days: [
    day('Mon', 'Handball'), day('Tue', 'Runna Easy Run', 'Power Circuit W3'), day('Wed', 'Runna Intervals'),
    day('Thu', 'Core + Achilles W3'), day('Fri', 'Bench + Rotation Power W3', 'Extended Cycling'), day('Sat', 'Long Run'), day('Sun')
  ]},
  { week: 4, block: 'build', days: [
    day('Mon', 'Handball'), day('Tue', 'Runna Easy Run', 'Power Circuit W1'), day('Wed', 'Runna Intervals'),
    day('Thu', 'Core + Achilles W1'), day('Fri', 'Strength + Press W1', 'Extended Cycling'), day('Sat', 'Long Run'), day('Sun')
  ]},
  { week: 5, block: 'build', days: [
    day('Mon', 'Handball'), day('Tue', 'Runna Easy Run', 'Power Circuit W2'), day('Wed', 'Runna Intervals'),
    day('Thu', 'Core + Achilles W2'), day('Fri', 'Cleans + Overhead Press W2', 'Extended Cycling'), day('Sat', 'Long Run'), day('Sun')
  ]},
  { week: 6, block: 'build', days: [
    day('Mon', 'Handball'), day('Tue', 'Runna Easy Run', 'Power Circuit W3'), day('Wed', 'Runna Intervals'),
    day('Thu', 'Core + Achilles W3'), day('Fri', 'Bench + Rotation Power W3', 'Extended Cycling'), day('Sat', 'Long Run'), day('Sun')
  ]},
  { week: 7, block: 'peak', days: [
    day('Mon', 'Handball'), day('Tue', 'Runna Easy Run', 'Power Circuit W1'), day('Wed', 'Runna Intervals'),
    day('Thu', 'Core + Achilles W1'), day('Fri', 'Strength + Press W1', 'Extended Cycling'), day('Sat', 'Long Run'), day('Sun')
  ]},
  { week: 8, block: 'peak', days: [
    day('Mon', 'Handball'), day('Tue', 'Runna Easy Run', 'Power Circuit W2'), day('Wed', 'Runna Intervals'),
    day('Thu', 'Core + Achilles W2'), day('Fri', 'Cleans + Overhead Press W2', 'Extended Cycling'), day('Sat', 'Long Run'), day('Sun')
  ]},
  { week: 9, block: 'peak', days: [
    day('Mon', 'Handball'), day('Tue', 'Power Circuit W3 (Deload)'), day('Wed', 'Runna Intervals'),
    day('Thu', 'Explosive + Tendon Testing'), day('Fri', 'Strength + Power Testing', 'Extended Cycling'), day('Sat', 'Long Run'), day('Sun')
  ]}
];
