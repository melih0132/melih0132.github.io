// Copied from ascii-sharks (https://github.com/stackedlol/ascii-sharks, commit a0074c1),
// © 2026 drewdi, MIT licence: see LICENSE in this folder. Changes are marked "Adaptation:".
export interface Species {
  name: string;
  cruise: number;
  maxSpeed: number;
  minSpeed: number;
  /** Relative odds of a new school being this species. */
  weight: number;
  schoolSize: [number, number];
  /** Personal space in grid cells (x, y), so every fish gets its own glyph. */
  spacing: [number, number];
  // Behaviour weights. Different mixes produce different collective shapes
  // (Couzin et al. 2002): strong alignment gives polarised schools and
  // ribbons, low alignment gives swarms, and a tangential pull gives a mill.
  align: number;
  cohesion: number;
  jitter: number;
  /** Tangential pull around the local centre: >0 makes a rotating bait ball. */
  mill: number;
  /** Damps vertical speed; real fish mostly cruise level. */
  verticalDrag: number;
}

// Adaptation: pond-like schools (smaller groups, more milling) instead of bait ribbons.
export const SPECIES: Species[] = [
  {
    name: "kohaku",
    cruise: 28, maxSpeed: 52, minSpeed: 12, weight: 3,
    schoolSize: [6, 12], spacing: [2.2, 1.3],
    align: 0.9, cohesion: 1.5, jitter: 45, mill: 85, verticalDrag: 0.4,
  },
  {
    name: "showa",
    cruise: 32, maxSpeed: 58, minSpeed: 14, weight: 3,
    schoolSize: [5, 10], spacing: [2.4, 1.4],
    align: 1.2, cohesion: 1.1, jitter: 40, mill: 55, verticalDrag: 0.8,
  },
  {
    name: "asagi",
    cruise: 36, maxSpeed: 62, minSpeed: 16, weight: 2,
    schoolSize: [4, 9], spacing: [2.6, 1.4],
    align: 1.8, cohesion: 0.8, jitter: 35, mill: 0, verticalDrag: 1.2,
  },
  {
    name: "ogon",
    cruise: 24, maxSpeed: 48, minSpeed: 10, weight: 2,
    schoolSize: [4, 8], spacing: [2.8, 1.5],
    align: 0.7, cohesion: 1.3, jitter: 50, mill: 40, verticalDrag: 0.5,
  },
  {
    name: "bekko",
    cruise: 22, maxSpeed: 50, minSpeed: 8, weight: 1,
    schoolSize: [3, 7], spacing: [2, 1.2],
    align: 0.4, cohesion: 1.2, jitter: 90, mill: 0, verticalDrag: 0.35,
  },
];

const TOTAL_WEIGHT = SPECIES.reduce((sum, s) => sum + s.weight, 0);

export function pickSpecies() {
  let r = Math.random() * TOTAL_WEIGHT;
  for (let i = 0; i < SPECIES.length; i++) {
    r -= SPECIES[i].weight;
    if (r <= 0) return i;
  }
  return 0;
}

/** Adaptation: koi skin index count (beni, shiro, sumi, orange, kin). */
export const KOI_COLOR_COUNT = 5;

// Weighted toward classic pond mixes: red and white dominate, gold rarer.
const KOI_COLOR_WEIGHTS = [3, 3, 2, 2, 1];
const KOI_COLOR_TOTAL = KOI_COLOR_WEIGHTS.reduce((s, w) => s + w, 0);

/** Adaptation: independent of species so schools stay mixed like a koi pond. */
export function pickKoiColor() {
  let r = Math.random() * KOI_COLOR_TOTAL;
  for (let i = 0; i < KOI_COLOR_WEIGHTS.length; i++) {
    r -= KOI_COLOR_WEIGHTS[i];
    if (r <= 0) return i;
  }
  return 0;
}
