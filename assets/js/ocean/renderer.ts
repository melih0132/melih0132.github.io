// Copied from ascii-sharks (https://github.com/stackedlol/ascii-sharks, commit a0074c1),
// © 2026 drewdi, MIT licence: see LICENSE in this folder. Changes are marked "Adaptation:".
/**
 * Draws the World as a grid of ASCII cells:
 *   1. a pure black cell grid
 *   2. a wake field that diffuses where things swim, lighting the dots cyan
 *   3. fish as minimal ASCII dashes, one per cell, glinting on hard turns
 *   4. sharks rasterised cell-by-cell with supersampled edges: grey blocks
 *      shaded by the light, dense glyphs, and shimmering accent colours
 */
import { labelCells } from "./label.ts";
import { clamp, hash3, smoothstep } from "./math.ts";
import { KOI_COLOR_COUNT } from "./species.ts";
import { SHARK_NODES, type Shark, type SharkKind, type World } from "./world.ts";

const ALPHA_LEVELS = 6;
const FISH_ALPHAS = [0.28, 0.42, 0.58, 0.74, 0.9];
const FISH_GLYPHS = ["-", ">", "<", "~"];

/** Adaptation: koi skins - beni, shiro, sumi, orange, kin. */
const KOI_RGB: [number, number, number][] = [
  [220, 56, 42],
  [240, 236, 228],
  [36, 34, 38],
  [232, 140, 36],
  [210, 168, 58],
];


// Dot colour classes: blue, green, red, pale; the last entry is the cyan wake.
const DOT_RGB: [number, number, number][] = [
  [48, 52, 235],
  [52, 205, 60],
  [228, 50, 44],
  [190, 212, 255],
  // Adaptation: warm amber wake to match the koi pond mood.
  [190, 160, 110],
];
const DOT_BASE_ALPHA = [1, 1, 1, 1, 1];
const WAKE = DOT_RGB.length - 1;

// Adaptation: warm Japanese accents (vermillion, cream, gold) for koi shimmer.
const ACCENTS = ["#c43c2c", "#e8dcc8", "#d4a84b", "#e89040"];

/** Adaptation: soft warm bubbles instead of cool grey-blue. */
const BUBBLE = "rgb(200,175,140)";

/** Adaptation: red hi patch on koi skin. */
const FLAG_HI = 8;

export interface RendererOptions {
  /** Adaptation: no black fill nor grid, for drawing over a page. */
  transparent?: boolean;
  /** Adaptation: accent colours are injectable, to follow the site theme. */
  accents?: string[];
  /** Adaptation: bubble colour is injectable, to follow the site theme. */
  bubble?: string;
  /** Adaptation: 5 koi fish RGB triples; falls back to KOI_RGB. */
  koiRgb?: [number, number, number][];
  /** Adaptation: optional foreground overlay canvas (z-index above content) for closest bubbles & fish. */
  fgCanvas?: HTMLCanvasElement;
}

// Sparse glyphs on bright skin, dense glyphs in shadow, so the texture
// reinforces the shading instead of fighting it.
const SKIN_RAMP = ":;t%SX8#@";
const FIN_GLYPHS = "%;tS:";
const RIDGE_GLYPHS = "@8%";
const EDGE_HEAVY = ":;";
const EDGE_LIGHT = ".',`";


const FLAG_BODY = 1;
const FLAG_EDGE = 2;
const FLAG_FIN = 3;
const FLAG_RIDGE = 4;
const FLAG_EYE = 5;
/** Dark skin markings: tiger bars, zebra-shark spots. */
const FLAG_MARK = 6;
const MARK_GLYPHS = "#%@";
/** Adaptation: cells of a label written across the body, light on dark so it reads on any skin. */
const FLAG_LABEL = 7;
/** Where along the body (snout 0 → tail 1) the label sits: the widest stretch of the back. */
const LABEL_S = 0.42;

// Sub-cell sample offsets for anti-aliased silhouettes.
const SUBSAMPLES = [0.25, 0.3, 0.75, 0.3, 0.25, 0.72, 0.75, 0.72];

/** Classic top-down half-width at s ∈ [0, 1] (snout → tail), as a fraction of length. */
function classicHalfWidth(s: number) {
  if (s < 0.13) return 0.09 * Math.pow(Math.sin(((s / 0.13) * Math.PI) / 2), 0.95);
  if (s < 0.3) return 0.09 + 0.016 * smoothstep(0.13, 0.3, s);
  if (s < 0.84) return 0.019 + 0.087 * Math.pow(1 - (s - 0.3) / 0.54, 1.25);
  const k = (s - 0.84) / 0.16;
  return 0.019 * (1 - k) + 0.012 * Math.sin(k * Math.PI);
}

/** Adaptation: blunt oval carp body with a flaring koi tail. */
function carpHalfWidth(s: number) {
  if (s < 0.12) return 0.11 * Math.pow(Math.sin(((s / 0.12) * Math.PI) / 2), 0.5);
  if (s < 0.38) return 0.11 + 0.025 * smoothstep(0.12, 0.38, s);
  if (s < 0.76) return 0.028 + 0.107 * Math.pow(1 - (s - 0.38) / 0.38, 1.05);
  const k = (s - 0.76) / 0.24;
  return 0.028 * (1 - k) + 0.05 * Math.sin(k * Math.PI);
}

/** Adaptation: side-profile koi body height (arched back, rounded belly, narrow peduncle + tall flowing caudal veil). */
function carpSideHalfHeight(s: number, isUpper: boolean) {
  if (isUpper) {
    if (s < 0.14) return 0.116 * Math.pow(Math.sin(((s / 0.14) * Math.PI) / 2), 0.62);
    if (s < 0.42) return 0.116 + 0.026 * smoothstep(0.14, 0.42, s);
    if (s < 0.77) return 0.028 + 0.114 * Math.pow(1 - (s - 0.42) / 0.35, 1.18);
    const k = (s - 0.77) / 0.23;
    return 0.028 * (1 - k * 0.55) + 0.156 * Math.pow(Math.sin(k * Math.PI * 0.84), 0.82);
  }
  if (s < 0.14) return 0.098 * Math.pow(Math.sin(((s / 0.14) * Math.PI) / 2), 0.7);
  if (s < 0.44) return 0.098 + 0.048 * smoothstep(0.14, 0.44, s);
  if (s < 0.77) return 0.027 + 0.119 * Math.pow(1 - (s - 0.44) / 0.33, 1.14);
  const k = (s - 0.77) / 0.23;
  return 0.027 * (1 - k * 0.55) + 0.142 * Math.pow(Math.sin(k * Math.PI * 0.84), 0.82);
}

/** Body outline and fin layout per species. All values are fractions of length. */
interface SharkShape {
  halfWidth: (s: number) => number;
  /** Pectoral fin: leading root, trailing root, tip position along the body, and reach. */
  pectoral: [number, number, number, number];
  /** Notched (falcate) trailing edge on the pectorals. */
  falcate: boolean;
  /** Pelvic fins: leading root, trailing root, tip, reach. */
  pelvic: [number, number, number, number];
  /** Forked caudal fin reach, or 0 when the tail is a ribbon (zebra shark). */
  caudal: number;
  dorsal: [number, number];
  secondDorsal: [number, number];
  /**
   * Hammerheads' cephalofoil: half-span, how far its tips sweep back, its depth, and the
   * notch in the middle of the front edge. All fractions of length; absent for other sharks.
   */
  head?: { span: number; sweep: number; depth: number; notch: number };
  /** null when the eyes sit somewhere else (hammerhead: on the cephalofoil tips). */
  eye: [number, number] | null;
  gills: [number, number];
  /** Skin colour multipliers (r, g, b). */
  tint: [number, number, number];
}

const CARP_SHAPE: Omit<SharkShape, "tint"> = {
  halfWidth: carpHalfWidth,
  pectoral: [0.14, 0.36, 0.44, 0.2],
  falcate: false,
  pelvic: [0.5, 0.58, 0.62, 0.07],
  caudal: 0.12,
  dorsal: [0.38, 0.52],
  secondDorsal: [0.62, 0.68],
  eye: [0.07, 0.11],
  gills: [0.16, 0.24],
};

const SHAPES: Record<SharkKind, SharkShape> = {
  classic: {
    halfWidth: classicHalfWidth,
    pectoral: [0.15, 0.43, 0.55, 0.26],
    falcate: true,
    pelvic: [0.57, 0.65, 0.69, 0.085],
    caudal: 0.085,
    dorsal: [0.33, 0.47],
    secondDorsal: [0.71, 0.76],
    eye: [0.1, 0.14],
    gills: [0.19, 0.29],
    tint: [0.92, 0.97, 1.05],
  },
  // Slim neck under a wide, swept-back cephalofoil (drawn in sampleShark),
  // tall first dorsal, long upper tail lobe. Bronze-olive grey.
  hammerhead: {
    halfWidth: (s) => {
      if (s < 0.06) return 0.045;
      if (s < 0.3) return 0.045 + 0.061 * smoothstep(0.06, 0.3, s);
      return classicHalfWidth(s) * 0.92;
    },
    head: { span: 0.17, sweep: 0.035, depth: 0.09, notch: 0 },
    pectoral: [0.17, 0.4, 0.5, 0.22],
    falcate: true,
    pelvic: [0.56, 0.63, 0.67, 0.075],
    caudal: 0.11,
    dorsal: [0.28, 0.44],
    secondDorsal: [0.7, 0.74],
    eye: null,
    gills: [0.16, 0.26],
    tint: [0.96, 0.98, 0.9],
  },
  // Blunt, square snout on a heavy body; barred back. Warm grey-brown.
  tiger: {
    halfWidth: (s) => {
      if (s < 0.13) return 0.1 * Math.pow(Math.sin(((s / 0.13) * Math.PI) / 2), 0.45);
      if (s < 0.3) return 0.1 + 0.014 * smoothstep(0.13, 0.3, s);
      if (s < 0.84) return 0.019 + 0.095 * Math.pow(1 - (s - 0.3) / 0.54, 1.2);
      const k = (s - 0.84) / 0.16;
      return 0.019 * (1 - k) + 0.012 * Math.sin(k * Math.PI);
    },
    pectoral: [0.15, 0.42, 0.53, 0.25],
    falcate: true,
    pelvic: [0.57, 0.65, 0.69, 0.085],
    caudal: 0.095,
    dorsal: [0.33, 0.46],
    secondDorsal: [0.71, 0.75],
    eye: [0.08, 0.12],
    gills: [0.19, 0.28],
    tint: [1.02, 0.95, 0.84],
  },
  // Short rounded head, body done by half-length, then a long ribbon of a
  // tail fin. Broad rounded pectorals, spotted sandy skin.
  zebra: {
    halfWidth: (s) => {
      if (s < 0.1) return 0.075 * Math.pow(Math.sin(((s / 0.1) * Math.PI) / 2), 0.7);
      if (s < 0.28) return 0.075 + 0.025 * smoothstep(0.1, 0.28, s);
      if (s < 0.55) return 0.022 + 0.078 * Math.pow(1 - (s - 0.28) / 0.27, 1.1);
      const k = (s - 0.55) / 0.45;
      return 0.022 * (1 - k * k) + 0.012 * Math.sin(k * Math.PI);
    },
    pectoral: [0.12, 0.3, 0.36, 0.19],
    falcate: false,
    pelvic: [0.42, 0.48, 0.51, 0.065],
    caudal: 0,
    dorsal: [0.36, 0.44],
    secondDorsal: [0.49, 0.53],
    eye: [0.06, 0.09],
    gills: [0.13, 0.2],
    tint: [1.08, 0.97, 0.74],
  },
  // Great hammerhead: a broader, nearly straight-edged cephalofoil with a notch at the centre,
  // a towering sickle first dorsal (drawn long and bright from above), and a cooler slate skin.
  greathammer: {
    halfWidth: (s) => {
      if (s < 0.05) return 0.04;
      if (s < 0.3) return 0.04 + 0.07 * smoothstep(0.05, 0.3, s);
      return classicHalfWidth(s) * 0.95;
    },
    head: { span: 0.21, sweep: 0.006, depth: 0.085, notch: 0.014 },
    pectoral: [0.16, 0.38, 0.49, 0.24],
    falcate: true,
    pelvic: [0.55, 0.62, 0.67, 0.085],
    caudal: 0.13,
    dorsal: [0.24, 0.45],
    secondDorsal: [0.68, 0.74],
    eye: null,
    gills: [0.15, 0.25],
    tint: [0.86, 0.93, 1.02],
  },
  // Shortfin mako: a long conical snout, a torpedo body that narrows hard to the tail stalk,
  // and a tall crescent tail. Metallic indigo back.
  mako: {
    halfWidth: (s) => {
      if (s < 0.17) return 0.088 * Math.pow(Math.sin(((s / 0.17) * Math.PI) / 2), 1.5);
      if (s < 0.32) return 0.088 + 0.012 * smoothstep(0.17, 0.32, s);
      if (s < 0.86) return 0.014 + 0.086 * Math.pow(1 - (s - 0.32) / 0.54, 1.45);
      const k = (s - 0.86) / 0.14;
      return 0.014 * (1 - k) + 0.01 * Math.sin(k * Math.PI);
    },
    pectoral: [0.18, 0.4, 0.5, 0.21],
    falcate: true,
    pelvic: [0.58, 0.64, 0.68, 0.06],
    caudal: 0.13,
    dorsal: [0.34, 0.45],
    secondDorsal: [0.76, 0.79],
    eye: [0.11, 0.15],
    gills: [0.2, 0.3],
    tint: [0.78, 0.9, 1.2],
  },
  // Thresher: a compact body over the front half, then the upper tail lobe as a long whip
  // that's as long as the shark itself. Big eyes, long sickle pectorals, bronze-violet skin.
  thresher: {
    halfWidth: (s) => {
      if (s < 0.08) return 0.07 * Math.pow(Math.sin(((s / 0.08) * Math.PI) / 2), 0.75);
      if (s < 0.2) return 0.07 + 0.02 * smoothstep(0.08, 0.2, s);
      if (s < 0.48) return 0.012 + 0.078 * Math.pow(1 - (s - 0.2) / 0.28, 1.3);
      // The whip: thin, with a slight sickle swell before it tapers out.
      const k = (s - 0.48) / 0.52;
      return 0.012 * (1 - k) + 0.006 * Math.sin(k * Math.PI * 0.9) + 0.002;
    },
    pectoral: [0.12, 0.27, 0.36, 0.2],
    falcate: true,
    pelvic: [0.37, 0.41, 0.44, 0.045],
    caudal: 0,
    dorsal: [0.24, 0.32],
    secondDorsal: [0.45, 0.47],
    eye: [0.05, 0.1],
    gills: [0.11, 0.18],
    tint: [1.0, 0.9, 1.08],
  },
  // Nurse shark: a blunt, broad head, a heavy flattened body with both dorsals set far back,
  // rounded paddle pectorals, and a long low tail with no lower lobe. Tawny brown.
  nurse: {
    halfWidth: (s) => {
      if (s < 0.08) return 0.085 * Math.pow(Math.sin(((s / 0.08) * Math.PI) / 2), 0.4);
      if (s < 0.3) return 0.085 + 0.02 * smoothstep(0.08, 0.3, s);
      if (s < 0.72) return 0.022 + 0.083 * Math.pow(1 - (s - 0.3) / 0.42, 1.1);
      const k = (s - 0.72) / 0.28;
      return 0.022 * (1 - k * k) + 0.014 * Math.sin(k * Math.PI);
    },
    pectoral: [0.16, 0.34, 0.4, 0.17],
    falcate: false,
    pelvic: [0.45, 0.52, 0.55, 0.075],
    caudal: 0,
    dorsal: [0.5, 0.58],
    secondDorsal: [0.63, 0.69],
    eye: [0.05, 0.075],
    gills: [0.14, 0.22],
    tint: [1.1, 0.96, 0.76],
  },
  // Adaptation: kohaku - cream body, vermillion hi patches.
  kohaku: {
    ...CARP_SHAPE,
    tint: [1.12, 1.05, 0.92],
  },
  // Adaptation: showa - cream body, vermillion + sumi (black) patches.
  showa: {
    ...CARP_SHAPE,
    tint: [1.08, 1.02, 0.94],
  },
  // Adaptation: ogon - metallic gold body, sparse darker flecks.
  ogon: {
    ...CARP_SHAPE,
    tint: [1.2, 1.05, 0.55],
  },
};

const KINDS = Object.keys(SHAPES) as SharkKind[];

function inTriangle(
  px: number, py: number,
  ax: number, ay: number, bx: number, by: number, cx: number, cy: number,
) {
  const d1 = (px - bx) * (ay - by) - (ax - bx) * (py - by);
  const d2 = (px - cx) * (by - cy) - (bx - cx) * (py - cy);
  const d3 = (px - ax) * (cy - ay) - (cx - ax) * (py - ay);
  const neg = d1 < 0 || d2 < 0 || d3 < 0;
  const pos = d1 > 0 || d2 > 0 || d3 > 0;
  return !(neg && pos);
}

/** Visible dark-grey cell grid, snapped to device pixels. Shared with the sidebar backdrop. */
export function paintGrid(g: CanvasRenderingContext2D, W: number, H: number, cw: number, ch: number, dpr: number) {
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.strokeStyle = "rgba(255,255,255,0.055)";
  g.lineWidth = 1;
  g.beginPath();
  for (let c = 0; c <= Math.ceil(W / cw); c++) {
    const x = Math.round(c * cw * dpr) + 0.5;
    g.moveTo(x, 0);
    g.lineTo(x, H * dpr);
  }
  for (let r = 0; r <= Math.ceil(H / ch); r++) {
    const y = Math.round(r * ch * dpr) + 0.5;
    g.moveTo(0, y);
    g.lineTo(W * dpr, y);
  }
  g.stroke();
}

export class AsciiRenderer {
  private ctx: CanvasRenderingContext2D;
  private fgCanvas: HTMLCanvasElement | null = null;
  private fgCtx: CanvasRenderingContext2D | null = null;
  private fgHasContent = false;
  private bg: HTMLCanvasElement;
  private dpr = 1;
  private width = 0;
  private height = 0;
  private cw = 12;
  private ch = 18;
  private cols = 0;
  private rows = 0;
  private fontFamily = "ui-monospace, Menlo, monospace";
  // Adaptation: options kept as fields (transparent mode, accent and bubble colours).
  private transparent: boolean;
  private accents: string[];
  private bubble: string;

  private dotKind = new Uint8Array(0); // 0 none, 1 blue, 2 green, 3 red, 4 pale
  private dotPhase = new Float32Array(0);
  private dotFreq = new Float32Array(0);
  private energy = new Float32Array(0);
  private energyTmp = new Float32Array(0);
  private heat = new Float32Array(0);
  private bucketOf = new Uint8Array(0);
  private bucketOrder = new Int32Array(0);
  private bucketCounts = new Int32Array(DOT_RGB.length * ALPHA_LEVELS + 1);
  private dotStyles: string[] = [];

  private sharkFlag = new Uint8Array(0);
  private sharkShade = new Float32Array(0);
  private sharkKey = new Uint32Array(0);
  private sharkDepth = new Float32Array(0);
  private sharkKind = new Uint8Array(0);
  /** Cells darkened by a shark's depth-projected shadow on the seabed (0..1). */
  private sharkShadow = new Float32Array(0);
  /** Adaptation: smooth 3D camera parallax tilt driven by pointer (-1..1). */
  private camX = 0;
  private camY = 0;
  /** Adaptation: 4-act camera POV weights derived from world.dive (0 top, 1/3 surface side, 2/3 pond bed, 1 bottom-up). */
  private dive = 0;
  private prevDive = 0;
  private diveVel = 0;
  private diveActivity = 0;
  private surfaceY = 0;
  private waterlineAlpha = 0;
  private bedVis = 0;
  private bedOffsetY = 0;
  private topW = 1;
  private sideW = 0;
  private bedW = 0;
  private profileW = 0;
  private bottomW = 0;
  private upSign = 1;
  private spine = new Float32Array(SHARK_NODES * 2);
  private arc = new Float32Array(SHARK_NODES);
  private arcTotal = 1;
  private shape = SHAPES.classic;
  private sharkId = 0;
  private finTipLeft = 0;
  private finTipRight = 0;
  // Scratch outputs of sampleShark(), to avoid allocating per sample.
  private hitFlag = 0;
  private hitShade = 0;
  private hitS = 0;
  private hitV = 0;
  private hitDist = 0;

  /** Cells holding a fish this frame (frame stamp); dots skip them. */
  private fishStamp = new Uint32Array(0);
  /** Adaptation: per-cell fish glyph index (0:'-', 1:'>', 2:'<', 3:'~') for directional side-view schools. */
  private fishGlyphs = new Uint8Array(0);
  private frameId = 0;
  /** Adaptation: fish cells bucketed by koi colour × brightness (one fillStyle each). */
  private fishBuckets: number[][] = Array.from(
    { length: KOI_COLOR_COUNT * FISH_ALPHAS.length },
    () => [],
  );
  private fishStyles: string[] = [];
  /** Adaptation: current koi RGB palette for setPalette rebuilds. */
  private koiRgb: [number, number, number][];

  constructor(private canvas: HTMLCanvasElement, options: RendererOptions = {}) {
    // Adaptation: options with the original defaults (opaque canvas, built-in colours).
    this.transparent = options.transparent ?? false;
    this.accents = options.accents ?? ACCENTS;
    this.bubble = options.bubble ?? BUBBLE;
    this.koiRgb =
      options.koiRgb && options.koiRgb.length === KOI_COLOR_COUNT
        ? options.koiRgb.map((c) => [c[0], c[1], c[2]] as [number, number, number])
        : KOI_RGB.map((c) => [c[0], c[1], c[2]] as [number, number, number]);
    this.rebuildFishStyles();
    // Adaptation: the canvas keeps an alpha channel only in transparent mode.
    const ctx = canvas.getContext("2d", { alpha: this.transparent });
    if (!ctx) throw new Error("2D canvas unavailable");
    this.ctx = ctx;
    if (options.fgCanvas) {
      this.fgCanvas = options.fgCanvas;
      this.fgCtx = options.fgCanvas.getContext("2d", { alpha: true });
    }
    this.bg = document.createElement("canvas");

    for (let c = 0; c < DOT_RGB.length; c++) {
      const [r, g, b] = DOT_RGB[c];
      for (let l = 0; l < ALPHA_LEVELS; l++) {
        const a = (DOT_BASE_ALPHA[c] * (l + 1)) / ALPHA_LEVELS;
        this.dotStyles.push(`rgba(${r},${g},${b},${a.toFixed(3)})`);
      }
    }
  }

  get cellWidth() {
    return this.cw;
  }

  get cellHeight() {
    return this.ch;
  }

  /** Adaptation: wipe the canvas once a crossing is over. */
  clear() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.fgCtx && this.fgCanvas) {
      this.fgCtx.setTransform(1, 0, 0, 1, 0, 0);
      this.fgCtx.clearRect(0, 0, this.fgCanvas.width, this.fgCanvas.height);
      this.fgHasContent = false;
    }
  }

  setFontFamily(family: string) {
    if (family) this.fontFamily = family;
  }

  /** Adaptation: live palette swap for clock-driven chromatic drift. */
  setPalette(opts: { accents?: string[]; bubble?: string; koiRgb?: [number, number, number][] }) {
    if (opts.accents && opts.accents.length) this.accents = opts.accents.slice();
    if (opts.bubble) this.bubble = opts.bubble;
    if (opts.koiRgb && opts.koiRgb.length === KOI_COLOR_COUNT) {
      this.koiRgb = opts.koiRgb.map((c) => [c[0], c[1], c[2]] as [number, number, number]);
      this.rebuildFishStyles();
    }
  }

  private rebuildFishStyles() {
    this.fishStyles = this.koiRgb.flatMap(([r, g, b]) =>
      FISH_ALPHAS.map((a) => `rgba(${r},${g},${b},${a})`),
    );
  }

  resize(width: number, height: number, dpr: number) {
    const prevCols = this.cols;
    const prevRows = this.rows;
    this.width = width;
    this.height = height;
    this.dpr = dpr;
    this.cw = clamp(Math.round(width / 124), 8, 13);
    this.ch = Math.round(this.cw * 1.45);
    this.cols = Math.ceil(width / this.cw);
    this.rows = Math.ceil(height / this.ch);

    this.canvas.width = Math.round(width * dpr);
    this.canvas.height = Math.round(height * dpr);
    if (this.fgCanvas) {
      this.fgCanvas.width = this.canvas.width;
      this.fgCanvas.height = this.canvas.height;
      this.fgHasContent = false;
    }
    // Adaptation: the background buffer is only needed when the black fill is drawn.
    if (!this.transparent) {
      this.bg.width = this.canvas.width;
      this.bg.height = this.canvas.height;
    }

    const n = this.cols * this.rows;
    if (this.cols !== prevCols || this.rows !== prevRows) {
      this.dotKind = new Uint8Array(n);
      this.dotPhase = new Float32Array(n);
      this.dotFreq = new Float32Array(n);
      this.energy = new Float32Array(n);
      this.energyTmp = new Float32Array(n);
      this.heat = new Float32Array(n);
      this.bucketOf = new Uint8Array(n);
      this.bucketOrder = new Int32Array(n);
      this.sharkFlag = new Uint8Array(n);
      this.sharkShade = new Float32Array(n);
      this.sharkKey = new Uint32Array(n);
      this.sharkDepth = new Float32Array(n);
      this.sharkKind = new Uint8Array(n);
      this.sharkShadow = new Float32Array(n);
      this.fishStamp = new Uint32Array(n);
      this.fishGlyphs = new Uint8Array(n);
    }

    for (let i = 0; i < n; i++) {
      const col = i % this.cols;
      const row = (i / this.cols) | 0;
      // No ambient dots: the grid stays black. Only the cyan wake lights cells.
      this.dotKind[i] = 0;
      this.dotPhase[i] = hash3(col, row, 23) * Math.PI * 2;
      this.dotFreq[i] = 0.3 + hash3(col, row, 37) * 1.1;
    }
    this.paintBackground();
  }

  private paintBackground() {
    // Adaptation: transparent mode draws neither the black fill nor the grid.
    if (this.transparent) return;
    const g = this.bg.getContext("2d");
    if (!g) return;
    const { width: W, height: H, dpr, cw, ch } = this;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.fillStyle = "#000";
    g.fillRect(0, 0, W, H);
    paintGrid(g, W, H, cw, ch, dpr);
  }

  render(world: World, dt: number) {
    const { ctx, dpr, cols, ch, width: W, height: H } = this;
    if (cols === 0) return;
    const t = world.time;

    // Adaptation: gentle 3D camera parallax tracking pointer on desktop.
    const targetCamX = world.pointer.active && W > 0 ? clamp((world.pointer.x / W - 0.5) * 2, -1, 1) : 0;
    const targetCamY = world.pointer.active && H > 0 ? clamp((world.pointer.y / H - 0.5) * 2, -1, 1) : 0;
    const camEase = Math.min(1, dt * 2.4);
    this.camX += (targetCamX - this.camX) * camEase;
    this.camY += (targetCamY - this.camY) * camEase;

    // Adaptation: 4-act POV weights:
    // 0.00 = Hero (top-down over pond)
    // 0.33 = Projects (upper water column side-view beneath top waterline)
    // 0.67 = About (deep pond-bed side-view with rocky floor & swaying Sumi-e reeds)
    // 1.00 = Contact (bottom-up looking straight up into Snell's Window)
    const nextDive = clamp(world.dive, 0, 1);
    const safeDt = Math.max(0.008, dt);
    const rawVel = clamp((nextDive - this.prevDive) / safeDt, -2.4, 2.4);
    this.prevDive = nextDive;
    this.dive = nextDive;
    this.diveVel += (rawVel - this.diveVel) * Math.min(1, safeDt * 6.5);
    const targetAct = clamp(Math.abs(this.diveVel) * 1.45, 0, 1);
    this.diveActivity += (targetAct - this.diveActivity) * Math.min(1, safeDt * (targetAct > this.diveActivity ? 8 : 3.2));

    this.topW = clamp(1 - this.dive * 3, 0, 1);
    this.sideW = clamp(1 - Math.abs(this.dive - 1 / 3) * 3, 0, 1);
    this.bedW = clamp(1 - Math.abs(this.dive - 2 / 3) * 3, 0, 1);
    this.bottomW = clamp((this.dive - 2 / 3) * 3, 0, 1);
    this.profileW = clamp(this.sideW + this.bedW, 0, 1);

    const restSurfaceY = Math.max(66, Math.min(H * 0.105, 76));
    const subSweep = smoothstep(0.012, 0.31, this.dive);
    const deepExit = smoothstep(0.37, 0.54, this.dive);
    this.surfaceY = H * 0.98 + (restSurfaceY - H * 0.98) * subSweep - deepExit * 34;
    this.waterlineAlpha = smoothstep(0.01, 0.055, this.dive) * (1 - deepExit);

    const bedEnter = smoothstep(0.41, 0.65, this.dive);
    const bedExit = smoothstep(0.71, 0.92, this.dive);
    this.bedVis = bedEnter * (1 - bedExit);
    this.bedOffsetY = (1 - bedEnter) * H * 0.24 + bedExit * H * 0.28;

    this.consumeEvents(world);
    this.rasterizeSharks(world.sharks, t);
    this.depositWake(world);
    this.diffuse(dt);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    // Adaptation: transparent mode clears the canvas instead of drawing the background.
    if (this.transparent) ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    else ctx.drawImage(this.bg, 0, 0);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    this.markFish(world);

    this.drawAtmosphere(t);

    ctx.font = `600 ${Math.round(ch * 0.74)}px ${this.fontFamily}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    this.drawFloorCausticsAndShadows(t);
    this.drawDots(t);

    this.drawHeat();
    this.drawLures(world, t);
    this.drawPondBedAndReeds(world, t);
    this.drawFish();
    this.drawSharks(t);
    this.drawWaterline(t);
    this.drawForeground(world, t);
  }

  // ── simulation → field ──────────────────────────────────────────────

  private cellIndex(x: number, y: number) {
    const c = Math.floor(x / this.cw);
    const r = Math.floor(y / this.ch);
    if (c < 0 || r < 0 || c >= this.cols || r >= this.rows) return -1;
    return r * this.cols + c;
  }

  private stamp(field: Float32Array, x: number, y: number, radius: number, amount: number) {
    const c0 = Math.floor(x / this.cw);
    const r0 = Math.floor(y / this.ch);
    for (let r = r0 - radius; r <= r0 + radius; r++) {
      for (let c = c0 - radius; c <= c0 + radius; c++) {
        if (c < 0 || r < 0 || c >= this.cols || r >= this.rows) continue;
        const d = Math.hypot(c - c0, (r - r0) * 1.4);
        if (d > radius + 0.5) continue;
        const i = r * this.cols + c;
        field[i] = Math.min(1.6, field[i] + amount * (1 - d / (radius + 1)));
      }
    }
  }

  private consumeEvents(world: World) {
    for (const e of world.events) {
      if (e.kind === "eat") {
        this.stamp(this.heat, e.x, e.y, 2, 1);
        this.stamp(this.energy, e.x, e.y, 3, 0.9);
      } else if (e.kind === "lure") {
        this.stamp(this.energy, e.x, e.y, 4, 0.95);
      } else if (e.kind === "surface") {
        this.stamp(this.energy, e.x, e.y, 4, 0.85);
      } else {
        this.stamp(this.energy, e.x, e.y, 6, 1.4);
      }
    }
    world.events.length = 0;
  }

  private depositWake(world: World) {
    const { energy } = this;
    for (const f of world.fish) {
      if (!f.alive) continue;
      const i = this.cellIndex(f.x, f.y);
      if (i >= 0) energy[i] = Math.min(1.6, energy[i] + (0.012 + f.alarm * 0.03) * f.depth);
    }
    for (const sh of world.sharks) {
      // Surface koi disturb the water much more than deep koi.
      const surfaceWeight = 0.22 + 0.95 * sh.depth;
      const pxOff = this.camX * (sh.depth - 0.5) * 34;
      const pyOff = this.camY * (sh.depth - 0.5) * 22;
      for (let k = SHARK_NODES - 6; k < SHARK_NODES; k++) {
        const i = this.cellIndex(sh.nodes[k * 2] + pxOff, sh.nodes[k * 2 + 1] + pyOff);
        if (i >= 0) energy[i] = Math.min(1.6, energy[i] + (0.05 + sh.speed * 0.0012) * surfaceWeight);
      }
    }
    if (world.pointer.active) {
      this.stamp(energy, world.pointer.x, world.pointer.y, 1, 0.08);
    }
  }

  /** Blur + decay so wakes spread out like ripples and fade. */
  private diffuse(dt: number) {
    const { cols, rows, energy, energyTmp: tmp, heat } = this;
    const decay = Math.exp(-dt * 1.5);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const i = r * cols + c;
        const l = c > 0 ? energy[i - 1] : energy[i];
        const rt = c < cols - 1 ? energy[i + 1] : energy[i];
        const u = r > 0 ? energy[i - cols] : energy[i];
        const d = r < rows - 1 ? energy[i + cols] : energy[i];
        tmp[i] = (energy[i] * 4 + l + rt + u + d) * 0.125 * decay;
      }
    }
    this.energy = tmp;
    this.energyTmp = energy;
    const heatDecay = Math.exp(-dt * 2.2);
    for (let i = 0; i < heat.length; i++) heat[i] *= heatDecay;
  }

  // ── sharks ──────────────────────────────────────────────────────────

  /**
   * Classify one point against the current shark (spine/arc already built).
   * Body coordinates: s along the spine (0 snout → 1 tail), v across it.
   * Writes hit* fields and returns whether the point is on the shark.
   */
  private sampleShark(px: number, py: number, L: number) {
    const { spine, arc } = this;
    const N = SHARK_NODES;
    let best = Infinity;
    let bestS = 0;
    let bestSign = 1;
    let bestNx = 0;
    let bestNy = 0;
    for (let k = 0; k < N - 1; k++) {
      const ax = spine[k * 2];
      const ay = spine[k * 2 + 1];
      const sx = spine[(k + 1) * 2] - ax;
      const sy = spine[(k + 1) * 2 + 1] - ay;
      const len2 = sx * sx + sy * sy || 1;
      const u = clamp(((px - ax) * sx + (py - ay) * sy) / len2, 0, 1);
      const qx = ax + sx * u;
      const qy = ay + sy * u;
      const d2 = (px - qx) ** 2 + (py - qy) ** 2;
      if (d2 < best) {
        best = d2;
        const len = Math.sqrt(len2);
        bestS = (arc[k] + u * len) / this.arcTotal;
        bestSign = sx * (py - ay) - sy * (px - ax) >= 0 ? 1 : -1;
        bestNx = (-sy / len) * bestSign;
        bestNy = (sx / len) * bestSign;
      }
    }

    const a = Math.sqrt(best);
    const s = bestS;
    const u = s * L;
    const shape = this.shape;
    const isKoiShape = shape === SHAPES.kohaku || shape === SHAPES.showa || shape === SHAPES.ogon;
    const sideW = isKoiShape ? this.sideW : 0;
    const bedW = isKoiShape ? this.bedW : 0;
    const profileW = isKoiShape ? this.profileW : 0;
    const bottomW = isKoiShape ? this.bottomW : 0;
    const topW = isKoiShape ? this.topW : 1;
    const isUpper = bestSign === this.upSign;

    const planHalfW = shape.halfWidth(s) * L;
    const sideHalfW = profileW > 0.01 ? carpSideHalfHeight(s, isUpper) * L : planHalfW;
    const w = planHalfW * (1 - profileW) + sideHalfW * profileW;
    this.hitDist = a;
    this.hitS = s;
    this.hitV = a * bestSign;

    const head = this.shape.head;
    if (head && u < L * (head.sweep + head.depth + head.notch)) {
      const span = L * head.span;
      const r = a / span;
      const front = L * head.sweep * r * r + L * head.notch * Math.max(0, 1 - r / 0.14);
      const depth = L * head.depth * (1 - 0.2 * r * r * r * r);
      if (r <= 1 && u >= front && u <= front + depth) {
        this.hitFlag = r > 0.84 ? FLAG_EYE : FLAG_BODY;
        this.hitShade = r > 0.84 ? 0 : 0.62 - 0.2 * r + (u < front + L * 0.012 ? 0.1 : 0);
        return true;
      }
    }

    if (a <= w) {
      const across = a / (w || 1);
      // Lighting adapts to the 4 camera POVs:
      // - Top (Hero): rounded back lit from top-left
      // - Side (Projects): bright surface light from above
      // - Pond Bed (About): deeper moody ambient light with soft golden rim along back & gentle floor bounce
      // - Bottom (Contact): backlit silhouette (dark center belly, bright warm sunlit outer rim)
      const facing = (bestNx * -0.6 + bestNy * -0.8) * across;
      const topShade = 0.58 - across * across * 0.42 + facing * 0.26;
      const sideShade = isUpper
        ? 0.74 + (1 - across) * 0.22 - across * across * 0.14
        : 0.45 - across * 0.28;
      const bedShade = isUpper
        ? 0.62 + (1 - across) * 0.18 - across * across * 0.18
        : 0.34 + across * across * 0.16;
      const bottomShade = 0.11 + across * across * 0.8;
      let shade = topShade * topW + sideShade * sideW + bedShade * bedW + bottomShade * bottomW;
      let flag = FLAG_BODY;

      if (topW > 0.45 && s > shape.dorsal[0] && s < shape.dorsal[1] && across < 0.3) {
        flag = FLAG_RIDGE;
        shade = 1;
      } else if (topW > 0.45 && s > shape.secondDorsal[0] && s < shape.secondDorsal[1] && across < 0.4) {
        shade = Math.max(shade, 0.82);
      } else if (profileW >= 0.45 && isUpper && s > 0.075 && s < 0.12 && across > 0.18 && across < 0.54) {
        // Side-profile eye on the upper head.
        flag = FLAG_EYE;
        shade = 0;
      } else if (profileW >= 0.45 && s > 0.165 && s < 0.205 && across < 0.74) {
        // Subtle curved gill plate in side profile.
        shade *= 0.58;
      } else if (topW > 0.45 && shape.eye && s > shape.eye[0] && s < shape.eye[1] && across > 0.6) {
        flag = FLAG_EYE;
        shade = 0;
      } else if (bottomW > 0.45 && shape.eye && s > shape.eye[0] && s < shape.eye[1] && across > 0.76) {
        flag = FLAG_EYE;
        shade = 0;
      } else if (topW > 0.45 && s > shape.gills[0] && s < shape.gills[1] && across > 0.58) {
        if (Math.floor(((s - shape.gills[0]) / (shape.gills[1] - shape.gills[0])) * 5) % 2 === 0) shade *= 0.45;
      } else if (s < 0.05 && bottomW < 0.5) {
        shade = Math.max(shade, 0.7);
      } else if (shape === SHAPES.zebra && s > 0.08 && s < 0.55 && (across < 0.1 || Math.abs(across - 0.6) < 0.08)) {
        shade = Math.max(shade, 0.8);
      } else {
        // Koi markings: full across back in top view, upper back/flanks in side & pond-bed views, outer rim in bottom view.
        const allowPatch =
          topW >= 0.5 ||
          (profileW >= 0.5 && (isUpper || across < 0.35)) ||
          (bottomW >= 0.5 && across > 0.52);
        if (allowPatch) {
          const patch = this.koiPatch(s, a * bestSign, L, across);
          if (patch === 1) flag = FLAG_HI;
          else if (patch === 2) flag = FLAG_MARK;
          else if (this.marked(s, a * bestSign, L, across)) flag = FLAG_MARK;
        }
      }
      this.hitFlag = flag;
      this.hitShade = clamp(shade, 0, 1);
      return true;
    }

    // Side-profile fins (Projects & About): tall flowing dorsal fin rising above back + ventral pectoral/pelvic/anal fins.
    if (profileW > 0.25) {
      if (isUpper) {
        const dorsalReach = w + L * 0.146 * profileW;
        if (inTriangle(u, a, L * 0.27, w * 0.84, L * 0.68, w * 0.84, L * 0.56, dorsalReach)) {
          this.hitFlag = a > dorsalReach * 0.8 ? FLAG_RIDGE : FLAG_FIN;
          this.hitShade = 0.58 + 0.36 * clamp((a - w) / Math.max(1, dorsalReach - w), 0, 1);
          return true;
        }
      } else {
        const pecReach = w + L * 0.136 * profileW;
        const pelvReach = w + L * 0.08 * profileW;
        const analReach = w + L * 0.068 * profileW;
        if (
          inTriangle(u, a, L * 0.18, w * 0.78, L * 0.36, w * 0.82, L * 0.46, pecReach) ||
          inTriangle(u, a, L * 0.47, w * 0.84, L * 0.59, w * 0.84, L * 0.63, pelvReach) ||
          inTriangle(u, a, L * 0.67, w * 0.84, L * 0.77, w * 0.84, L * 0.8, analReach)
        ) {
          this.hitFlag = FLAG_FIN;
          this.hitShade = 0.36 + 0.2 * (1 - clamp((a - w) / Math.max(1, pecReach - w), 0, 1));
          return true;
        }
      }
    }

    // Plan-view fins (top & bottom POVs): outstretched left/right pectorals, pelvics, forked caudal.
    const planFactor = 1 - profileW;
    if (planFactor > 0.15) {
      const tip = (bestSign > 0 ? this.finTipRight : this.finTipLeft) * planFactor;
      const [p0, p1, p2] = shape.pectoral;
      if (
        inTriangle(u, a, L * p0, 0, L * p1, 0, L * p2, tip) &&
        !(shape.falcate && inTriangle(u, a, L * p1, 0, L * (p1 + (p2 - p1) * 0.33), tip * 0.55, L * p2, tip))
      ) {
        const finPatch = bottomW > 0.5 ? 0 : this.koiPatch(s, a * bestSign, L, 0);
        this.hitFlag =
          finPatch === 1 ? FLAG_HI : finPatch === 2 || this.marked(s, a * bestSign, L, 0) ? FLAG_MARK : FLAG_FIN;
        this.hitShade = bottomW > 0.5
          ? 0.64 + 0.34 * clamp(a / Math.max(1, tip), 0, 1)
          : 0.38 + 0.22 * (1 - clamp(a / Math.max(1, tip), 0, 1));
        return true;
      }
      const [v0, v1, v2, vr] = shape.pelvic;
      if (
        inTriangle(u, a, L * v0, 0, L * v1, 0, L * v2, L * vr * planFactor) ||
        (shape.caudal > 0 && inTriangle(u, a, L * 0.86, 0, L * 0.95, 0, L, L * shape.caudal * planFactor))
      ) {
        this.hitFlag = FLAG_FIN;
        this.hitShade = bottomW > 0.5 ? 0.74 : 0.36;
        return true;
      }
    }
    return false;
  }

  /** Whether a body point (s along, v across) falls on a dark marking. */
  private marked(s: number, v: number, L: number, across: number) {
    if (this.shape === SHAPES.tiger) {
      // Wavy vertical bars over the back half, fading out toward the head.
      if (s < 0.2 || s > 0.9 || across > 0.85) return false;
      const wobble = 0.35 * Math.sin((v / L) * 25 + s * 5);
      const bar = Math.sin(s * Math.PI * 2 * 9 + wobble);
      return bar > 0.65 - 0.5 * smoothstep(0.2, 0.42, s) + 0.4 * smoothstep(0.8, 0.9, s);
    }
    if (this.shape === SHAPES.zebra) {
      // Leopard spots on a jittered grid, so they ride along with the skin.
      if (s < 0.07) return false;
      const gu = (s * L) / (L * 0.06);
      const gv = v / (L * 0.045);
      const cu = Math.floor(gu);
      const cv = Math.floor(gv);
      const jx = hash3(cu, cv, this.sharkId) * 0.5 + 0.25;
      const jy = hash3(cu, cv, this.sharkId + 11) * 0.5 + 0.25;
      return (gu - cu - jx) ** 2 + (gv - cv - jy) ** 2 < 0.08;
    }
    return false;
  }

  /**
   * Adaptation: koi blotches that ride with the skin.
   * 0 = base, 1 = hi (vermillion), 2 = sumi / fleck (black or dark gold).
   */
  private koiPatch(s: number, v: number, L: number, across: number): 0 | 1 | 2 {
    if (this.shape !== SHAPES.kohaku && this.shape !== SHAPES.showa && this.shape !== SHAPES.ogon) {
      return 0;
    }
    if (s < 0.05 || s > 0.93 || across > 0.92) return 0;
    const gu = s * 5.2;
    const gv = (v / L) * 4;
    const cu = Math.floor(gu);
    const cv = Math.floor(gv);
    const jx = hash3(cu, cv, this.sharkId) * 0.55 + 0.2;
    const jy = hash3(cu, cv, this.sharkId + 17) * 0.55 + 0.2;
    const d2 = (gu - cu - jx) ** 2 + (gv - cv - jy) ** 2;
    const roll = hash3(cu, cv, this.sharkId + 3);
    const roll2 = hash3(cu + 1, cv, this.sharkId + 5);

    if (this.shape === SHAPES.ogon) {
      return d2 < 0.05 && roll < 0.2 ? 2 : 0;
    }
    if (this.shape === SHAPES.kohaku) {
      if (d2 < 0.18 && roll < 0.58) return 1;
      if (d2 < 0.3 && roll2 < 0.32) return 1;
      return 0;
    }
    // showa
    if (d2 < 0.15) {
      if (roll < 0.3) return 2;
      if (roll < 0.68) return 1;
    }
    if (d2 < 0.27 && roll2 > 0.55 && roll2 < 0.82) return 1;
    return 0;
  }

  /**
   * Build a smooth, undulating render spine from the sim spine, then
   * supersample every cell in the shark's bounding box against the shape.
   * Fully covered cells become solid skin; partial cells become edge glyphs.
   */
  private rasterizeSharks(sharks: Shark[], t: number) {
    const { sharkFlag, sharkShade, sharkKey, sharkDepth, sharkKind, sharkShadow, spine, arc, cw, ch, cols, rows } = this;
    sharkFlag.fill(0);
    sharkShadow.fill(0);

    const visualDepthOf = (d: number) => {
      const z = clamp(d, 0.18, 1);
      // In bottom-up POV, deep koi (near the pond floor) are closest to the camera.
      return z * (1 - this.bottomW) + clamp(1.22 - z, 0.2, 1) * this.bottomW;
    };

    // Adaptation: render farthest koi first so nearer koi visibly swim over them in all 3 POVs.
    const ordered =
      sharks.length > 1
        ? sharks.slice().sort((a, b) => visualDepthOf(a.depth) - visualDepthOf(b.depth))
        : sharks;
    const floorOx = -this.camX * 16;
    const floorOy = -this.camY * 11;

    for (const sh of ordered) {
      const z = visualDepthOf(sh.depth);
      const depthScale = 0.72 + 0.34 * z;
      const L = sh.length * depthScale;
      const N = SHARK_NODES;
      const n = sh.nodes;
      const swim = clamp(sh.speed / 60, 0.4, 1.4);
      this.shape = SHAPES[sh.kind];
      this.sharkId = sh.id;
      const kindIndex = KINDS.indexOf(sh.kind);

      const pxOff = this.camX * (z - 0.5) * 34;
      const pitchY = clamp(this.diveVel * 38, -28, 28);
      const pyOff = this.camY * (z - 0.5) * 22 - pitchY * (0.35 + z * 0.95);
      const midIdx = (N >> 1) * 2;
      const midX = n[midIdx];
      const midY = n[midIdx + 1];
      // Side-profile undulation is gentler vertically since tail sweeps move toward/away from camera.
      const waveScale = 1 - 0.58 * this.profileW;

      // Travelling body wave, growing toward the tail, perspective-scaled by 3D depth.
      for (let k = 0; k < N; k++) {
        const s = k / (N - 1);
        const a = Math.max(0, k - 1);
        const b = Math.min(N - 1, k + 1);
        let tx = n[a * 2] - n[b * 2];
        let ty = n[a * 2 + 1] - n[b * 2 + 1];
        const tl = Math.hypot(tx, ty) || 1;
        tx /= tl;
        ty /= tl;
        const amp = L * 0.05 * (0.1 + 0.9 * Math.pow(s, 1.8)) * swim * waveScale;
        const off = amp * Math.sin(sh.phase - s * 5.2);
        const sx = midX + (n[k * 2] - midX) * depthScale + pxOff;
        const sy = midY + (n[k * 2 + 1] - midY) * depthScale + pyOff;
        spine[k * 2] = sx - ty * off;
        spine[k * 2 + 1] = sy + tx * off;
      }
      // Determine which normal side points upward toward the water surface for side-view fins.
      this.upSign = spine[(N - 1) * 2] - spine[0] <= 0 ? 1 : -1;

      arc[0] = 0;
      for (let k = 1; k < N; k++) {
        arc[k] =
          arc[k - 1] +
          Math.hypot(spine[k * 2] - spine[(k - 1) * 2], spine[k * 2 + 1] - spine[(k - 1) * 2 + 1]);
      }
      this.arcTotal = arc[N - 1] || 1;

      // Bank into turns: the inside fin foreshortens, the outside one spreads.
      const bank = clamp(sh.turn * 0.45, -0.35, 0.35);
      const flex = 1 + 0.06 * Math.sin(sh.phase * 0.5);
      const reachFin = this.shape.pectoral[3];
      this.finTipRight = L * reachFin * flex * (1 - bank);
      this.finTipLeft = L * reachFin * flex * (1 + bank);

      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      for (let k = 0; k < N; k++) {
        minX = Math.min(minX, spine[k * 2]);
        maxX = Math.max(maxX, spine[k * 2]);
        minY = Math.min(minY, spine[k * 2 + 1]);
        maxY = Math.max(maxY, spine[k * 2 + 1]);
      }
      const reach = L * 0.38;
      const c0 = Math.max(0, Math.floor((minX - reach) / cw));
      const c1 = Math.min(cols - 1, Math.floor((maxX + reach) / cw));
      const r0 = Math.max(0, Math.floor((minY - reach) / ch));
      const r1 = Math.min(rows - 1, Math.floor((maxY + reach) / ch));
      if (c0 > c1 || r0 > r1) continue;

      const skipBeyond = reach + Math.hypot(cw, ch);
      // Cast shadows only appear on the pond floor in top-down view (fade smoothly with topW).
      const castShadows = this.topW > 0.06;
      const altitude = 0.22 + 1.05 * z;
      const shadowDc = Math.round((L * 0.115 * altitude + (floorOx - pxOff)) / cw);
      const shadowDr = Math.round((L * 0.075 * altitude + (floorOy - pyOff)) / ch);
      const shadowStrength = clamp(0.88 - z * 0.34, 0.46, 0.88) * this.topW;
      const penumbra = shadowStrength * 0.48;

      for (let r = r0; r <= r1; r++) {
        for (let c = c0; c <= c1; c++) {
          const x = c * cw;
          const y = r * ch;
          const centerHit = this.sampleShark(x + cw / 2, y + ch / 2, L);
          if (!centerHit && this.hitDist > skipBeyond) continue;
          const flag = this.hitFlag;
          const shade = this.hitShade;
          const s = this.hitS;
          const v = this.hitV;

          let hits = centerHit ? 1 : 0;
          for (let k = 0; k < SUBSAMPLES.length; k += 2) {
            if (this.sampleShark(x + SUBSAMPLES[k] * cw, y + SUBSAMPLES[k + 1] * ch, L)) hits++;
          }
          if (hits === 0) continue;
          const coverage = hits / 5;

          const i = r * cols + c;
          const key = (hash3(Math.round(s * 52), Math.round(v / (cw * 0.9)), sh.id) * 4294967295) >>> 0;
          sharkKey[i] = key;
          sharkDepth[i] = z;
          sharkKind[i] = kindIndex;

          if (centerHit && coverage >= 0.6) {
            sharkFlag[i] = flag;
            const flicker = (hash3(c, r, Math.floor(t * 6)) - 0.5) * 0.06;
            sharkShade[i] = clamp(shade + flicker, 0, 1);
            if (castShadows) {
              const sc = c + shadowDc;
              const sr = r + shadowDr;
              if (sc >= 0 && sc < cols && sr >= 0 && sr < rows) {
                const si = sr * cols + sc;
                if (shadowStrength > sharkShadow[si]) sharkShadow[si] = shadowStrength;
                if (z > 0.55) {
                  if (sc + 1 < cols && penumbra > sharkShadow[si + 1]) sharkShadow[si + 1] = penumbra;
                  if (sr + 1 < rows && penumbra > sharkShadow[si + cols]) sharkShadow[si + cols] = penumbra;
                }
              }
            }
          } else {
            sharkFlag[i] = FLAG_EDGE;
            sharkShade[i] = coverage;
          }
        }
      }

      if (sh.label) this.stampLabel(sh.label);
    }
  }

  /** Writes a label on the thickest part of the body, on cells the shark already covers. */
  private stampLabel(text: string) {
    const { spine, arc, arcTotal, sharkFlag, sharkKey, cw, ch, cols, rows } = this;
    const target = arcTotal * LABEL_S;
    let k = 0;
    while (k < SHARK_NODES - 2 && arc[k + 1] < target) k++;
    const span = arc[k + 1] - arc[k] || 1;
    const u = clamp((target - arc[k]) / span, 0, 1);
    const x = spine[k * 2] + (spine[(k + 1) * 2] - spine[k * 2]) * u;
    const y = spine[k * 2 + 1] + (spine[(k + 1) * 2 + 1] - spine[k * 2 + 1]) * u;
    for (const { col, row, char } of labelCells(x, y, cw, ch, cols, rows, text)) {
      const i = row * cols + col;
      if (sharkFlag[i] !== FLAG_BODY && sharkFlag[i] !== FLAG_RIDGE) continue;
      sharkFlag[i] = FLAG_LABEL;
      sharkKey[i] = char.charCodeAt(0);
    }
  }

  private drawSharks(t: number) {
    const { ctx, cols, rows, cw, ch, sharkFlag, sharkShade, sharkKey, sharkDepth, sharkKind } = this;
    const n = cols * rows;
    for (let i = 0; i < n; i++) {
      const flag = sharkFlag[i];
      if (!flag) continue;
      const col = i % cols;
      const row = (i / cols) | 0;
      const x = col * cw;
      const y = row * ch;
      const key = sharkKey[i];
      const shade = sharkShade[i];
      const z = sharkDepth[i];
      // Adaptation: underwater atmospheric light falloff (deep koi fade softly into dark ink).
      const dim = 0.26 + 0.74 * Math.pow(z, 0.85);
      const kind = KINDS[sharkKind[i]];
      const [tr, tg, tb] = SHAPES[kind].tint;
      const isKoi = kind === "kohaku" || kind === "showa" || kind === "ogon";

      // Colours re-roll on a staggered clock so the hide shimmers.
      const tick = Math.floor(t * 2.4 + (key % 997) / 97);
      const roll = hash3(key, tick, 7);

      if (flag === FLAG_LABEL) {
        ctx.fillStyle = "#0b0c10";
        ctx.fillRect(x + 1, y + 1, cw - 1, ch - 1);
        ctx.fillStyle = "#ffffff";
        ctx.fillText(String.fromCharCode(key), x + cw / 2, y + ch / 2 + 1);
        continue;
      }

      if (flag === FLAG_EDGE) {
        // Soft, anti-aliased silhouette; glows softly in warm backlit rim light when viewed from below.
        const set = shade >= 0.5 ? EDGE_HEAVY : EDGE_LIGHT;
        if (isKoi) {
          const base = kind === "ogon" ? [210, 170, 62] : [232, 214, 184];
          const rimBoost = 1 + 0.56 * this.bottomW;
          const g = Math.min(1.22, (0.45 + shade * 0.55) * dim * rimBoost);
          ctx.fillStyle =
            roll < 0.1 + 0.2 * this.bottomW
              ? this.accents[key % this.accents.length]
              : `rgb(${Math.min(255, Math.round(base[0] * g))},${Math.min(255, Math.round(base[1] * g))},${Math.min(255, Math.round(base[2] * g))})`;
        } else {
          const g = (70 + shade * 80) * dim;
          ctx.fillStyle =
            roll < 0.07
              ? this.accents[key % this.accents.length]
              : `rgb(${Math.round(g * tr)},${Math.round(g * tg)},${Math.min(255, Math.round(g * tb + 6))})`;
        }
        ctx.fillText(set[(key >>> 8) % set.length], x + cw / 2, y + ch / 2 + 1);
        continue;
      }

      let level: number;
      let glyph: string;
      if (flag === FLAG_RIDGE) {
        level = 226;
        glyph = RIDGE_GLYPHS[(key >>> 8) % RIDGE_GLYPHS.length];
      } else if (flag === FLAG_EYE) {
        level = 12;
        glyph = "o";
      } else if (flag === FLAG_HI || flag === FLAG_MARK) {
        level = 24 + shade * 22;
        glyph = MARK_GLYPHS[(key >>> 8) % MARK_GLYPHS.length];
      } else if (flag === FLAG_FIN) {
        level = 40 + shade * 120;
        glyph = FIN_GLYPHS[(key >>> 8) % FIN_GLYPHS.length];
      } else {
        level = 46 + shade * 160;
        const jitter = ((key >>> 4) % 3) - 1;
        glyph = SKIN_RAMP[clamp(Math.floor((1 - shade) * 8.99) + jitter, 0, SKIN_RAMP.length - 1)];
      }
      level *= dim;

      // Adaptation: koi fill cells with cream / vermillion / sumi / gold;
      // in bottom-up POV (bottomW), darken belly center into a warm backlit silhouette with glowing flanks/fins.
      if (isKoi) {
        let fr: number;
        let fg: number;
        let fb: number;
        if (flag === FLAG_HI) {
          fr = 210 * dim;
          fg = 48 * dim;
          fb = 36 * dim;
        } else if (flag === FLAG_MARK) {
          if (kind === "ogon") {
            fr = 120 * dim;
            fg = 90 * dim;
            fb = 30 * dim;
          } else {
            fr = 22 * dim;
            fg = 20 * dim;
            fb = 24 * dim;
          }
        } else if (kind === "ogon") {
          const lift = 0.55 + shade * 0.45;
          fr = 220 * lift * dim;
          fg = 175 * lift * dim;
          fb = 55 * lift * dim;
        } else {
          const lift = 0.7 + shade * 0.3;
          fr = 235 * lift * dim;
          fg = 225 * lift * dim;
          fb = 205 * lift * dim;
        }
        if (this.bottomW > 0.05) {
          // Contre-jour: deep charcoal-ink belly center vs glowing sunlit rim & translucent outstretched fins.
          const backlit = flag === FLAG_FIN ? 0.64 + shade * 0.38 : 0.15 + shade * 0.72;
          const k = 1 - this.bottomW + this.bottomW * backlit;
          fr *= k;
          fg *= k;
          fb *= k;
        }
        ctx.fillStyle = `rgb(${Math.min(255, Math.round(fr))},${Math.min(255, Math.round(fg))},${Math.min(255, Math.round(fb))})`;
      } else {
        ctx.fillStyle = `rgb(${Math.min(255, Math.round(level * tr))},${Math.min(255, Math.round(level * tg))},${Math.min(255, Math.round(level * tb + 4))})`;
      }
      ctx.fillRect(x + 1, y + 1, cw - 1, ch - 1);

      let color: string;
      if (flag === FLAG_EYE) color = isKoi ? "#2a2218" : "#9aa0ad";
      else if (flag === FLAG_RIDGE && z > 0.76) color = roll < 0.45 ? "#fff6e5" : (this.accents[2] || "#d4a84b");
      else if (flag === FLAG_HI) color = roll < 0.2 && z > 0.5 ? "#fff4e8" : "#6a1810";
      else if (flag === FLAG_MARK) {
        color =
          kind === "ogon"
            ? "#3a2a10"
            : `rgb(${Math.round(70 * tr)},${Math.round(70 * tg)},${Math.round(70 * tb)})`;
      } else if (roll < 0.09) color = this.accents[key % this.accents.length];
      else if (roll < 0.13) color = "#ffffff";
      else if (isKoi && kind === "ogon") color = shade > 0.55 ? "#5a4010" : "#7a5820";
      else if (isKoi) color = shade > 0.55 ? "#4a3a28" : "#6a5848";
      else color = shade > 0.55 ? "#0e0f13" : "#1b1d24";
      ctx.fillStyle = color;
      ctx.fillText(glyph, x + cw / 2, y + ch / 2 + 1);
    }
  }

  // ── fish, dots, heat ────────────────────────────────────────────────

  /**
   * Snap each fish to a cell and bucket it by koi colour × brightness: far fish
   * are dim, near fish brighter, and turning or panicking fish glint. Nearer
   * fish claim a cell first when two land in the same one.
   */
  private markFish(world: World) {
    const { fishStamp, fishGlyphs, fishBuckets, sharkFlag, camX, camY } = this;
    const splitFg = !!(this.fgCtx && this.dive > 0.14);
    const sideDir = this.profileW > 0.42;
    const pitchY = clamp(this.diveVel * 38, -28, 28);
    const frame = ++this.frameId;
    for (const bucket of fishBuckets) bucket.length = 0;
    for (let pass = 0; pass < 2; pass++) {
      for (const f of world.fish) {
        if (!f.alive || (f.depth > 0.78 ? 0 : 1) !== pass) continue;
        if (splitFg && f.depth > 0.89) continue;
        const px = f.x + camX * (f.depth - 0.5) * 34;
        const py = f.y + camY * (f.depth - 0.5) * 22 - pitchY * (0.35 + f.depth * 0.95);
        const i = this.cellIndex(px, py);
        if (i < 0 || fishStamp[i] === frame || sharkFlag[i]) continue;
        fishStamp[i] = frame;
        if (sideDir) {
          if (Math.abs(f.turn) > 2.1) fishGlyphs[i] = 3;
          else if (f.depth > 0.7) fishGlyphs[i] = f.vx >= 0 ? 1 : 2;
          else fishGlyphs[i] = 0;
        } else {
          fishGlyphs[i] = 0;
        }
        const glint = clamp(Math.abs(f.turn) / 3.5, 0, 1);
        const v = 0.24 + (0.46 * (f.depth - 0.55)) / 0.45 + 0.3 * Math.max(glint, f.alarm);
        const alpha = clamp(Math.floor(v * FISH_ALPHAS.length), 0, FISH_ALPHAS.length - 1);
        const color = clamp(f.color | 0, 0, KOI_COLOR_COUNT - 1);
        fishBuckets[color * FISH_ALPHAS.length + alpha].push(i);
      }
    }
  }

  /**
   * Adaptation: optical water-column lighting strictly within the dark Sumi-e Koi palette:
   * - Act 2 (Projects — Upper Side): soft surface luminance + delicate slanted sunbeams below waterline
   * - Act 3 (About — Pond Bed): calm deep ambient ground glow rising subtly from the pond floor
   * - Act 4 (Contact — Bottom-up): warm overhead Snell's Window glow surrounded by deep black water
   */
  private drawAtmosphere(t: number) {
    const { ctx, width: W, height: H, sideW, bedVis, bedOffsetY, bottomW, surfaceY, waterlineAlpha, camX, camY } = this;
    if (W <= 0 || H <= 0) return;

    // Act 2: subtle underwater luminance & slanted volumetric shafts descending from the waterline.
    const subStrength = Math.max(sideW, waterlineAlpha * (this.dive < 0.34 ? 0.85 : 0));
    if (subStrength > 0.03) {
      const sy = clamp(surfaceY, 0, H);
      if (sy < H - 4) {
        const bandH = Math.max(90, (H - sy) * 0.52);
        const grad = ctx.createLinearGradient(0, sy, 0, sy + bandH);
        grad.addColorStop(0, `rgba(226,202,154,${(0.062 * subStrength).toFixed(4)})`);
        grad.addColorStop(0.32, `rgba(212,184,132,${(0.022 * subStrength).toFixed(4)})`);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, sy, W, bandH);

        if (sideW > 0.08) {
          const beamCount = W < 640 ? 3 : 4;
          const beamDepth = Math.min(H - sy, H * 0.74);
          for (let k = 0; k < beamCount; k++) {
            const u = (k + 0.5) / beamCount;
            const sway = Math.sin(t * 0.24 + k * 2.1) * W * 0.035;
            const topX = W * (0.14 + u * 0.72) + sway - camX * 18;
            const topW = Math.max(26, W * (0.045 + (k % 2) * 0.018));
            const slant = beamDepth * 0.24;
            const botW = topW * 1.9;
            const alpha = (0.028 + 0.01 * Math.sin(t * 0.42 + k * 1.7)) * sideW;
            const bGrad = ctx.createLinearGradient(topX, sy, topX - slant * 0.6, sy + beamDepth);
            bGrad.addColorStop(0, `rgba(232,208,162,${alpha.toFixed(4)})`);
            bGrad.addColorStop(0.55, `rgba(214,186,136,${(alpha * 0.42).toFixed(4)})`);
            bGrad.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = bGrad;
            ctx.beginPath();
            ctx.moveTo(topX - topW * 0.5, sy);
            ctx.lineTo(topX + topW * 0.5, sy);
            ctx.lineTo(topX - slant + botW * 0.5, sy + beamDepth);
            ctx.lineTo(topX - slant - botW * 0.5, sy + beamDepth);
            ctx.closePath();
            ctx.fill();
          }
        }
      }
    }

    // Act 3: Deep pond-bed mood — quiet warm ground luminance rising softly from the sandy/stone bed.
    if (bedVis > 0.02) {
      const floorTop = clamp(H * 0.68 + bedOffsetY, 0, H);
      if (floorTop < H - 4) {
        const g = ctx.createLinearGradient(0, H, 0, floorTop);
        g.addColorStop(0, `rgba(196,166,118,${(0.068 * bedVis).toFixed(4)})`);
        g.addColorStop(0.42, `rgba(168,140,98,${(0.028 * bedVis).toFixed(4)})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, floorTop, W, H - floorTop);
      }
    }

    // Act 4: Snell's Window — warm sunlit wide elliptical aperture overhead framing #contact.
    if (bottomW > 0.03) {
      const cx = W * 0.5 - camX * 28;
      const cy = H * 0.27 - camY * 18;
      const rx = Math.min(W * 0.58, Math.max(W * 0.44, Math.min(W, H) * (0.42 + 0.24 * bottomW)));
      const ry = rx * 0.62;
      const pulse = 1 + 0.03 * Math.sin(t * 0.75);
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, ry / Math.max(1, rx));
      const r = rx * pulse;
      const g = ctx.createRadialGradient(0, 0, r * 0.08, 0, 0, r);
      g.addColorStop(0, `rgba(236,212,164,${(0.095 * bottomW).toFixed(4)})`);
      g.addColorStop(0.55, `rgba(216,184,126,${(0.048 * bottomW).toFixed(4)})`);
      g.addColorStop(0.86, `rgba(232,206,158,${(0.026 * bottomW).toFixed(4)})`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  /**
   * Adaptation: Act 3 (About — Deep Pond Bed) sculpted ASCII floor, cast koi ground shadows,
   * swaying Sumi-e aquatic reeds along the left/right margins, and calm drifting sediment motes.
   */
  private drawPondBedAndReeds(world: World, t: number) {
    const { ctx, cols, rows, cw, ch, width: W, height: H, bedVis, bedOffsetY, camX, camY, sharkFlag } = this;
    if (bedVis <= 0.015 || cols === 0 || rows === 0) return;

    const compact = W < 640;
    const baseFloorY = H * (compact ? 0.9 : 0.87) + bedOffsetY - camY * 14;
    const floorRowAt = (c: number) => {
      const undul =
        Math.sin(c * 0.085 + 0.6) * ch * 1.15 +
        Math.sin(c * 0.21 - 1.2) * ch * 0.55;
      return Math.floor((baseFloorY + undul) / ch);
    };

    // 1. Undulating sandy/stone pond-bed contour & quiet ink pebble texture.
    const contourGlyphs = ["_", "_", "-", "~", "_", "."];
    for (let c = 0; c < cols; c++) {
      const r0 = floorRowAt(c);
      if (r0 >= rows) continue;
      if (r0 >= 0) {
        const gIdx = Math.abs(c + Math.floor(Math.sin(c * 0.19) * 3)) % contourGlyphs.length;
        ctx.fillStyle = `rgba(206,180,134,${(0.36 * bedVis).toFixed(3)})`;
        ctx.fillText(contourGlyphs[gIdx], c * cw + cw / 2, r0 * ch + ch / 2 + 1);
      }
      const startR = Math.max(0, r0 + 1);
      for (let r = startR; r < rows; r++) {
        const roll = hash3(c, r, 91);
        if (roll > 0.34) continue;
        const depthK = clamp((r - r0) / 5, 0, 1);
        const alpha = (0.14 + 0.1 * (1 - depthK)) * bedVis;
        ctx.fillStyle = roll < 0.055
          ? `rgba(218,192,144,${(alpha * 1.15).toFixed(3)})`
          : `rgba(164,142,106,${alpha.toFixed(3)})`;
        const glyph = roll < 0.03 ? "o" : roll < 0.11 ? "," : roll < 0.2 ? ":" : "·";
        ctx.fillText(glyph, c * cw + cw / 2, r * ch + ch / 2 + 1);
      }
    }

    // 2. Soft ground shadows projected straight down onto the pond bed beneath each koi.
    for (const sh of world.sharks) {
      let minX = Infinity;
      let maxX = -Infinity;
      let avgY = 0;
      for (let k = 0; k < SHARK_NODES; k++) {
        const x = sh.nodes[k * 2];
        const y = sh.nodes[k * 2 + 1];
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        avgY += y;
      }
      avgY /= SHARK_NODES;
      const heightAbove = clamp((baseFloorY - avgY) / Math.max(1, H * 0.72), 0, 1);
      const proximity = 1 - heightAbove * 0.68;
      if (proximity <= 0.1) continue;
      const cStart = clamp(Math.floor(minX / cw), 0, cols - 1);
      const cEnd = clamp(Math.floor(maxX / cw), 0, cols - 1);
      const span = Math.max(1, cEnd - cStart);
      for (let c = cStart; c <= cEnd; c++) {
        const u = (c - cStart) / span;
        const arch = Math.sin(u * Math.PI);
        const r = floorRowAt(c) + 1;
        if (r < 0 || r >= rows) continue;
        const a = (0.42 * arch * proximity * bedVis).toFixed(3);
        ctx.fillStyle = `rgba(0,0,0,${a})`;
        ctx.fillRect(c * cw, r * ch, cw, ch);
        if (arch > 0.35) {
          ctx.fillStyle = `rgba(112,96,74,${(0.24 * arch * proximity * bedVis).toFixed(3)})`;
          ctx.fillText(":", c * cw + cw / 2, r * ch + ch / 2 + 1);
        }
      }
    }

    // 3. Delicate swaying Sumi-e aquatic reeds rooted along left & right pond margins (clear of #about center frame).
    const stalks = compact
      ? [
          { xFrac: 0.03, h: 6, seed: 1.1 },
          { xFrac: 0.075, h: 4, seed: 2.7 },
          { xFrac: 0.925, h: 5, seed: 4.3 },
          { xFrac: 0.97, h: 7, seed: 5.8 },
        ]
      : [
          { xFrac: 0.025, h: 16, seed: 0.7 },
          { xFrac: 0.055, h: 11, seed: 1.9 },
          { xFrac: 0.088, h: 14, seed: 3.1 },
          { xFrac: 0.12, h: 8, seed: 4.4 },
          { xFrac: 0.15, h: 6, seed: 5.2 },
          { xFrac: 0.85, h: 7, seed: 2.3 },
          { xFrac: 0.885, h: 12, seed: 3.8 },
          { xFrac: 0.915, h: 17, seed: 0.4 },
          { xFrac: 0.948, h: 10, seed: 5.5 },
          { xFrac: 0.975, h: 15, seed: 1.5 },
        ];
    const reedAmp = compact ? 0.55 : 1;
    for (const st of stalks) {
      const baseCol = Math.floor(st.xFrac * cols);
      const rootRow = floorRowAt(baseCol);
      let prevSway = 0;
      for (let k = 0; k < st.h; k++) {
        const frac = (k + 1) / st.h;
        const sway =
          Math.pow(frac, 1.45) *
          (2.1 * Math.sin(t * 0.82 + st.seed + frac * 1.7) + 0.55 * camX);
        const dx = sway - prevSway;
        prevSway = sway;
        const c = Math.round(baseCol + sway);
        const r = rootRow - k;
        if (c < 0 || c >= cols || r < 4 || r >= rows) continue;
        if (sharkFlag[r * cols + c]) continue;
        const alpha = (0.32 - 0.14 * frac) * bedVis * reedAmp;
        ctx.fillStyle = k === st.h - 1
          ? `rgba(224,200,154,${(alpha * 1.1).toFixed(3)})`
          : `rgba(182,158,118,${alpha.toFixed(3)})`;
        let glyph = "|";
        if (k === st.h - 1) glyph = dx >= 0 ? "," : "'";
        else if (dx > 0.18) glyph = "/";
        else if (dx > 0.08) glyph = ")";
        else if (dx < -0.18) glyph = "\\";
        else if (dx < -0.08) glyph = "(";
        ctx.fillText(glyph, c * cw + cw / 2, r * ch + ch / 2 + 1);
      }
    }

    // 4. Slow horizontally-drifting deep-water sediment motes suspended lazily above the pond bed.
    const moteCount = compact ? 14 : 24;
    ctx.fillStyle = this.bubble;
    for (let m = 0; m < moteCount; m++) {
      const seedY = 0.22 + hash3(m, 53, 9) * 0.64;
      const speedX = 0.45 + hash3(m, 67, 15) * 0.75;
      const phaseX = hash3(m, 83, 21) * cols;
      const mc = Math.floor((t * speedX + phaseX + camX * 2) % cols);
      const bob = Math.sin(t * 0.7 + m * 1.7) * 0.8;
      const mr = Math.floor(seedY * rows + bob);
      if (mc < 0 || mc >= cols || mr < 4 || mr >= rows) continue;
      if (mr >= floorRowAt(mc)) continue;
      if (sharkFlag[mr * cols + mc]) continue;
      ctx.globalAlpha = bedVis * (compact ? 0.16 : 0.24) * (0.65 + 0.35 * Math.sin(t * 1.2 + m));
      ctx.fillText(m % 4 === 0 ? "." : "·", mc * cw + cw / 2, mr * ch + ch / 2 + 1);
    }
    ctx.globalAlpha = 1;
  }

  /**
   * Adaptation: undulating ASCII water meniscus that physically sweeps upward across the screen
   * as you submerge from Hero → Projets, then rests calmly beneath the sticky header as a
   * shimmering underwater ceiling horizon.
   */
  private drawWaterline(t: number) {
    const { ctx, cols, rows, cw, ch, surfaceY, waterlineAlpha, diveActivity } = this;
    if (waterlineAlpha <= 0.015 || cols === 0 || rows === 0) return;

    const crossingBoost = this.dive < 0.31 ? 1 : 0;
    const compactDamp = this.width < 640 && !crossingBoost ? 0.68 : 1;
    const waveAmp = (4.2 + 4.4 * diveActivity * crossingBoost) * (ch / 15);
    const crestAlpha = waterlineAlpha * compactDamp * (0.24 + 0.28 * crossingBoost + 0.16 * diveActivity);
    const sprayAlpha = waterlineAlpha * compactDamp * (0.1 + 0.15 * crossingBoost + 0.1 * diveActivity);
    const glyphs = ["~", "≈", "~", "-", "≈", "~"];

    ctx.fillStyle = `rgba(238,218,178,${clamp(crestAlpha, 0, 0.72).toFixed(3)})`;
    for (let c = 0; c < cols; c++) {
      const wave =
        Math.sin(c * 0.23 + t * 1.55) * waveAmp +
        Math.sin(c * 0.1 - t * 0.95) * (waveAmp * 0.58);
      const y = surfaceY + wave;
      const r = Math.floor(y / ch);
      if (r < 0 || r >= rows) continue;
      const glyphIdx = Math.abs(Math.floor(c * 0.5 + t * 1.4)) % glyphs.length;
      ctx.fillText(glyphs[glyphIdx], c * cw + cw / 2, r * ch + ch / 2 + 1);
    }

    ctx.fillStyle = `rgba(216,188,136,${clamp(sprayAlpha, 0, 0.42).toFixed(3)})`;
    for (let c = 0; c < cols; c += 2) {
      const wave =
        Math.sin(c * 0.23 + t * 1.55) * waveAmp +
        Math.sin(c * 0.1 - t * 0.95) * (waveAmp * 0.58);
      const r = Math.floor((surfaceY + wave) / ch) + 1;
      if (r < 0 || r >= rows) continue;
      const shimmer = hash3(c, r, Math.floor(t * 4));
      if (shimmer > 0.62) continue;
      ctx.fillText(shimmer < 0.22 ? "°" : "·", c * cw + cw / 2, r * ch + ch / 2 + 1);
    }
  }

  /**
   * Adaptation: 3-act underwater atmosphere:
   * - Top (Hero): pond floor caustics + depth-projected cast shadows beneath every koi
   * - Side (Projects): slanted underwater sunbeams + calmly rising bubbles below the waterline
   * - Bottom (About/Contact): Snell's Window sunlit overhead surface ripples seen from below
   */
  private drawFloorCausticsAndShadows(t: number) {
    const {
      ctx, cols, rows, cw, ch, width: W, height: H,
      sharkFlag, sharkShadow, fishStamp, frameId,
      camX, camY, topW, sideW, bottomW, surfaceY, waterlineAlpha,
    } = this;
    const shiftC = (-camX * 16) / cw;
    const shiftR = (-camY * 11) / ch;

    const causticLow: number[] = [];
    const causticHigh: number[] = [];
    const rayCells: number[] = [];
    const shadowSoft: number[] = [];
    const shadowDeep: number[] = [];

    const crossing = waterlineAlpha > 0.04 && this.dive < 0.32;
    const snellCx = (W * 0.5 - camX * 28) / cw;
    const snellCy = (H * 0.27 - camY * 18) / ch;
    const snellRx = Math.max(8, Math.min(W * 0.58, Math.max(W * 0.44, Math.min(W, H) * (0.42 + 0.24 * bottomW))) / cw);
    const snellRy = Math.max(6, (snellRx * cw * 0.62) / ch);

    const causticStrength = Math.max(topW, bottomW * 1.35);
    const subRayStrength = Math.max(sideW, crossing ? 0.55 : 0);

    for (let r = 0; r < rows; r++) {
      const rr = r - shiftR;
      const cellY = r * ch + ch * 0.5;
      const belowWater = !crossing || cellY > surfaceY + ch * 0.5;
      const aboveWater = !crossing || cellY < surfaceY - ch * 0.4;
      const depthFade = clamp(1 - (cellY - (crossing ? surfaceY : 0)) / Math.max(1, H - (crossing ? surfaceY : 0)), 0, 1);

      for (let c = 0; c < cols; c++) {
        const i = r * cols + c;
        if (sharkFlag[i]) continue;

        if (topW > 0.06 && aboveWater) {
          const sh = sharkShadow[i];
          if (sh > 0.05) {
            if (sh >= 0.62) shadowDeep.push(i);
            else shadowSoft.push(i);
            continue;
          }
        }

        if (fishStamp[i] === frameId) continue;
        const cc = c - shiftC;

        // Act 1 (pond floor above waterline) & Act 3 (Snell's Window sunlit overhead ripples).
        if (causticStrength > 0.06) {
          let allow = true;
          let snellBoost = 1;
          if (bottomW > 0.35) {
            const dx = (c - snellCx) / snellRx;
            const dy = (r - snellCy) / snellRy;
            const dist2 = dx * dx + dy * dy;
            if (dist2 > 1.18) {
              allow = false;
            } else {
              snellBoost = 1 - smoothstep(0.68, 1.18, dist2);
            }
          } else if (!aboveWater) {
            allow = false;
          }

          if (allow && snellBoost > 0.12) {
            const speed = bottomW > 0.4 ? 0.74 : 0.52;
            const w1 = Math.sin(cc * 0.22 + rr * 0.14 + t * speed);
            const w2 = Math.sin(cc * 0.13 - rr * 0.27 - t * (speed * 0.74));
            const w3 = Math.sin((cc + rr) * 0.09 + t * 0.24);
            const band = (w1 * w2 + 1) * 0.5 * (0.72 + 0.28 * w3) * (bottomW > 0.35 ? 0.85 + 0.22 * snellBoost : 1);
            const hiThresh = bottomW > 0.4 ? 0.8 : 0.86;
            const loThresh = bottomW > 0.4 ? 0.7 : 0.77;
            if (band > hiThresh) {
              causticHigh.push(i);
            } else if (band > loThresh && ((c + r) & 1) === 0) {
              causticLow.push(i);
            }
          }
        }

        // Act 2 (inside water / side POV): delicate slanted light flecks descending below the waterline.
        if (subRayStrength > 0.12 && belowWater && depthFade > 0.2 && ((c + r) & 1) === 0) {
          const ray = Math.sin((cc * 0.16 - rr * 0.09) + t * 0.26) * Math.sin((cc * 0.07 - rr * 0.04) - t * 0.15);
          if (ray * depthFade > 0.44) {
            rayCells.push(i);
          }
        }
      }
    }

    if (causticLow.length && causticStrength > 0.06) {
      const a = (0.095 * topW + 0.175 * bottomW).toFixed(3);
      ctx.fillStyle = `rgba(198,172,124,${a})`;
      for (let k = 0; k < causticLow.length; k++) {
        const i = causticLow[k];
        ctx.fillText("·", (i % cols) * cw + cw / 2, ((i / cols) | 0) * ch + ch / 2 + 1);
      }
    }
    if (causticHigh.length && causticStrength > 0.06) {
      const a = (0.175 * topW + 0.31 * bottomW).toFixed(3);
      ctx.fillStyle = `rgba(236,212,166,${a})`;
      for (let k = 0; k < causticHigh.length; k++) {
        const i = causticHigh[k];
        const glyph = bottomW > 0.45 ? ((i % 7) === 0 ? "≈" : (i % 3) === 0 ? "~" : ",") : (i % 3) === 0 ? "," : "·";
        ctx.fillText(glyph, (i % cols) * cw + cw / 2, ((i / cols) | 0) * ch + ch / 2 + 1);
      }
    }
    if (rayCells.length && subRayStrength > 0.12) {
      const a = (0.145 * subRayStrength).toFixed(3);
      ctx.fillStyle = `rgba(226,200,152,${a})`;
      for (let k = 0; k < rayCells.length; k++) {
        const i = rayCells[k];
        ctx.fillText((i % 3) === 0 ? "/" : "·", (i % cols) * cw + cw / 2, ((i / cols) | 0) * ch + ch / 2 + 1);
      }
    }

    // Rising ambient bubbles across submerged acts (livelier near surface & during POV transitions, quieter on the pond bed).
    const bubbleVis = clamp(sideW * 0.92 + this.bedW * 0.32 + bottomW * 0.68 + this.diveActivity * 0.45, 0, 1);
    if (bubbleVis > 0.08 && cols > 8 && rows > 6) {
      const count = 24 + Math.round(this.diveActivity * 10);
      const minBubbleY = crossing ? surfaceY + ch : ch * 2;
      ctx.fillStyle = this.bubble;
      for (let b = 0; b < count; b++) {
        const seedX = hash3(b, 11, 3);
        const speed = 1.4 + hash3(b, 29, 7) * 2.2;
        const phase = hash3(b, 43, 13) * rows;
        const rawRow = rows - ((t * speed + phase) % rows);
        const br = Math.floor(rawRow);
        const by = br * ch + ch / 2 + 1;
        if (by < minBubbleY) continue;
        const sway = Math.sin(t * 1.1 + b * 1.9) * 1.4;
        const bc = Math.floor(seedX * cols + sway + shiftC * 0.4);
        if (bc < 0 || bc >= cols || br < 0 || br >= rows) continue;
        const bi = br * cols + bc;
        if (sharkFlag[bi]) continue;
        const edgeFade = Math.min(1, (by - minBubbleY) / 32, (rows - br) / 3);
        ctx.globalAlpha = bubbleVis * edgeFade * (0.22 + (b % 3) * 0.09);
        ctx.fillText(b % 3 === 0 ? "°" : "·", bc * cw + cw / 2, by);
      }
      ctx.globalAlpha = 1;
    }

    if (shadowSoft.length && topW > 0.06) {
      ctx.fillStyle = `rgba(0,0,0,${(0.52 * topW).toFixed(3)})`;
      for (let k = 0; k < shadowSoft.length; k++) {
        const i = shadowSoft[k];
        ctx.fillRect((i % cols) * cw, ((i / cols) | 0) * ch, cw, ch);
      }
      ctx.fillStyle = `rgba(130,114,92,${(0.14 * topW).toFixed(3)})`;
      for (let k = 0; k < shadowSoft.length; k++) {
        const i = shadowSoft[k];
        ctx.fillText("·", (i % cols) * cw + cw / 2, ((i / cols) | 0) * ch + ch / 2 + 1);
      }
    }
    if (shadowDeep.length && topW > 0.06) {
      ctx.fillStyle = `rgba(0,0,0,${(0.82 * topW).toFixed(3)})`;
      for (let k = 0; k < shadowDeep.length; k++) {
        const i = shadowDeep[k];
        ctx.fillRect((i % cols) * cw, ((i / cols) | 0) * ch, cw, ch);
      }
      ctx.fillStyle = `rgba(116,100,80,${(0.22 * topW).toFixed(3)})`;
      for (let k = 0; k < shadowDeep.length; k++) {
        const i = shadowDeep[k];
        ctx.fillText(":", (i % cols) * cw + cw / 2, ((i / cols) | 0) * ch + ch / 2 + 1);
      }
    }
  }

  /**
   * Adaptation: lightweight foreground aquatic layer passing IN FRONT of submerged UI cards
   * (closest directional fish + rising micro-bubbles + subtle meniscus spray when crossing POVs,
   * always skipping the top sticky header band).
   */
  private drawForeground(world: World, t: number) {
    const g = this.fgCtx;
    const canvas = this.fgCanvas;
    if (!g || !canvas) return;

    const fgAlpha = clamp((this.dive - 0.1) / 0.22, 0, 1);
    const crossingMeniscus = this.dive > 0.018 && this.dive < 0.31 ? this.waterlineAlpha * (0.35 + 0.65 * this.diveActivity) : 0;
    const transBubbles = this.diveActivity > 0.08 && this.dive > 0.02 ? this.diveActivity : 0;

    if (fgAlpha <= 0.01 && crossingMeniscus <= 0.01 && transBubbles <= 0.01) {
      if (this.fgHasContent) {
        g.setTransform(1, 0, 0, 1, 0, 0);
        g.clearRect(0, 0, canvas.width, canvas.height);
        this.fgHasContent = false;
      }
      return;
    }

    const { dpr, cw, ch, cols, rows, camX, camY, surfaceY } = this;
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.clearRect(0, 0, canvas.width, canvas.height);
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.font = `600 ${Math.round(ch * 0.74)}px ${this.fontFamily}`;
    g.textAlign = "center";
    g.textBaseline = "middle";
    this.fgHasContent = true;

    const headerSafeY = 62;
    const compact = this.width < 640;
    const pitchY = clamp(this.diveVel * 38, -28, 28);
    const sideDir = this.profileW > 0.42;

    // 1. Closest small fish gliding subtly in front of the floating cards (softer on compact mobile for effortless reading).
    if (fgAlpha > 0.01) {
      const fishBaseAlpha = compact ? 0.28 : 0.56;
      for (const f of world.fish) {
        if (!f.alive || f.depth <= 0.89) continue;
        const px = f.x + camX * (f.depth - 0.5) * 44;
        const py = f.y + camY * (f.depth - 0.5) * 28 - pitchY * (0.45 + f.depth * 0.95);
        if (py < headerSafeY || py > this.height - 8 || px < 0 || px > this.width) continue;
        if (crossingMeniscus > 0.05 && py < surfaceY + ch) continue;
        const col = Math.floor(px / cw);
        const row = Math.floor(py / ch);
        if (col < 0 || col >= cols || row < 0 || row >= rows) continue;
        const rgb = this.koiRgb[clamp(f.color | 0, 0, KOI_COLOR_COUNT - 1)];
        g.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${(fishBaseAlpha * fgAlpha).toFixed(3)})`;
        const glyph = sideDir ? (f.vx >= 0 ? ">" : "<") : "-";
        g.fillText(glyph, col * cw + cw / 2, row * ch + ch / 2 + 1);
      }
    }

    // 2. Delicate rising foreground bubbles (amplified gently during section POV transitions).
    const bubbleVis = Math.max(fgAlpha, transBubbles * 0.85);
    if (bubbleVis > 0.02 && cols > 8 && rows > 6) {
      const bubbleCount = (compact ? 10 : 14) + Math.round(transBubbles * (compact ? 10 : 16));
      const bubbleScale = compact ? 0.72 : 1;
      g.fillStyle = this.bubble;
      const shiftC = (camX * 22) / cw;
      const minY = crossingMeniscus > 0.05 ? Math.max(headerSafeY, surfaceY + ch * 0.6) : headerSafeY;
      for (let b = 0; b < bubbleCount; b++) {
        const seedX = hash3(b, 71, 5);
        const speed = 1.9 + hash3(b, 89, 11) * 2.5 + transBubbles * 1.4;
        const phase = hash3(b, 103, 17) * rows;
        const rawRow = rows - ((t * speed + phase) % rows);
        const br = Math.floor(rawRow);
        const y = br * ch + ch / 2 + 1;
        if (y < minY || br < 0 || br >= rows) continue;
        const sway = Math.sin(t * 1.25 + b * 2.3) * 1.8;
        const bc = Math.floor(seedX * cols + sway + shiftC);
        if (bc < 0 || bc >= cols) continue;
        const edgeFade = Math.min(1, (y - minY) / 40, (rows - br) / 3);
        const isExtra = b >= (compact ? 10 : 14);
        const baseA = (isExtra ? transBubbles * 0.34 : fgAlpha * (b % 3 === 0 ? 0.36 : 0.24)) * bubbleScale;
        g.globalAlpha = edgeFade * baseA;
        g.fillText(b % 4 === 0 ? "°" : b % 7 === 0 ? "o" : "·", bc * cw + cw / 2, y);
      }
      g.globalAlpha = 1;
    }

    // 3. Subtle sweeping foreground meniscus crest when breaching the water surface (Hero ↔ Projets).
    if (crossingMeniscus > 0.04 && surfaceY > headerSafeY + 6 && surfaceY < this.height - 6) {
      const waveAmp = (4.2 + 4.4 * this.diveActivity) * (ch / 15);
      g.fillStyle = `rgba(240,220,182,${(0.32 * crossingMeniscus).toFixed(3)})`;
      for (let c = 0; c < cols; c += 3) {
        const wave =
          Math.sin(c * 0.23 + t * 1.55) * waveAmp +
          Math.sin(c * 0.1 - t * 0.95) * (waveAmp * 0.58);
        const y = surfaceY + wave;
        if (y < headerSafeY) continue;
        const r = Math.floor(y / ch);
        if (r < 0 || r >= rows) continue;
        const glyph = (c + Math.floor(t * 3)) % 2 === 0 ? "~" : "≈";
        g.fillText(glyph, c * cw + cw / 2, r * ch + ch / 2 + 1);
      }
    }
  }

  private drawFish() {
    const { ctx, cw, ch, cols, fishBuckets, fishGlyphs } = this;
    for (let b = 0; b < fishBuckets.length; b++) {
      const bucket = fishBuckets[b];
      if (!bucket.length) continue;
      ctx.fillStyle = this.fishStyles[b];
      for (const i of bucket) {
        ctx.fillText(FISH_GLYPHS[fishGlyphs[i]], (i % cols) * cw + cw / 2, ((i / cols) | 0) * ch + ch / 2 + 1);
      }
    }
  }

  /** Adaptation: bubbles in one colour where a fish was eaten, instead of red splashes. */
  private drawHeat() {
    const { ctx, heat, cols, cw, ch } = this;
    ctx.fillStyle = this.bubble;
    for (let i = 0; i < heat.length; i++) {
      const h = heat[i];
      if (h < 0.08) continue;
      ctx.globalAlpha = Math.min(1, h * 1.4);
      const col = i % cols;
      const row = (i / cols) | 0;
      ctx.fillText(h > 0.6 ? "o" : "°", col * cw + cw / 2, row * ch + ch / 2 + 1);
    }
    ctx.globalAlpha = 1;
  }

  /** Adaptation: softly pulsing golden lure glyph on the ASCII grid. */
  private drawLures(world: World, t: number) {
    if (!world.lures.length) return;
    const { ctx, cols, rows, cw, ch } = this;
    const gold = this.accents[2] || "#d4a84b";
    ctx.fillStyle = gold;
    for (const lure of world.lures) {
      const col = Math.floor(lure.x / cw);
      const row = Math.floor(lure.y / ch);
      if (col < 0 || row < 0 || col >= cols || row >= rows) continue;
      const fade = clamp(lure.life / 1.1, 0, 1);
      const pulse = 0.6 + 0.4 * Math.sin(t * 5.2 + lure.x * 0.05);
      const cx = col * cw + cw / 2;
      const cy = row * ch + ch / 2 + 1;
      ctx.globalAlpha = fade * (0.55 + 0.4 * pulse);
      ctx.fillText(pulse > 0.72 ? "✦" : "·", cx, cy);
      // Subtle cardinal shimmer dots
      ctx.globalAlpha = fade * 0.28 * pulse;
      if (col > 0) ctx.fillText("·", (col - 1) * cw + cw / 2, cy);
      if (col + 1 < cols) ctx.fillText("·", (col + 1) * cw + cw / 2, cy);
    }
    ctx.globalAlpha = 1;
  }

  /**
   * Every cell's dot twinkles on its own clock, is modulated by slow
   * caustic light bands, and flares cyan where the wake field is strong.
   * Dots are bucketed by colour/alpha so each bucket is one fillStyle.
   */
  private drawDots(t: number) {
    const { ctx, cols, rows, cw, ch, dotKind, dotPhase, dotFreq, energy, sharkFlag, sharkShadow, fishStamp, frameId } = this;
    const { bucketOf, bucketOrder, bucketCounts } = this;
    const n = cols * rows;
    const SKIP = bucketCounts.length - 1;
    bucketCounts.fill(0);

    for (let i = 0; i < n; i++) {
      const e = energy[i];
      const kind = dotKind[i];
      if (sharkFlag[i] || fishStamp[i] === frameId || (kind === 0 && e < 0.45)) {
        bucketOf[i] = SKIP;
        continue;
      }
      let bucket: number;
      if (e > 0.45) {
        const level = clamp(Math.floor((e - 0.45) * 5), 0, ALPHA_LEVELS - 1);
        bucket = WAKE * ALPHA_LEVELS + level;
      } else {
        const col = i % cols;
        const row = (i / cols) | 0;
        // Dots stay bright and crisp; the twinkle is a gentle breathe, not a fade.
        const twinkle = 0.5 + 0.5 * Math.sin(t * dotFreq[i] + dotPhase[i]);
        const caustic = 0.85 + 0.15 * Math.sin(col * 0.11 + t * 0.35) * Math.sin(row * 0.17 - t * 0.27);
        let v = clamp((0.55 + 0.45 * twinkle) * caustic + e * 2, 0, 1);
        if (sharkShadow[i]) v *= 0.2;
        bucket = (kind - 1) * ALPHA_LEVELS + clamp(Math.floor(v * ALPHA_LEVELS), 0, ALPHA_LEVELS - 1);
      }
      bucketOf[i] = bucket;
      bucketCounts[bucket]++;
    }

    // Counting sort cells by bucket.
    const starts = new Int32Array(bucketCounts.length);
    for (let b = 1; b < bucketCounts.length; b++) starts[b] = starts[b - 1] + bucketCounts[b - 1];
    const cursor = starts.slice();
    for (let i = 0; i < n; i++) {
      const b = bucketOf[i];
      if (b !== SKIP) bucketOrder[cursor[b]++] = i;
    }

    const small = Math.max(2, Math.round(cw * 0.19));
    const large = small + 1;
    for (let b = 0; b < SKIP; b++) {
      const count = bucketCounts[b];
      if (!count) continue;
      ctx.fillStyle = this.dotStyles[b];
      const size = b >= WAKE * ALPHA_LEVELS ? large : small;
      const start = starts[b];
      for (let k = start; k < start + count; k++) {
        const i = bucketOrder[k];
        const col = i % cols;
        const row = (i / cols) | 0;
        // Sit the dot low-right in its cell, as in the reference.
        ctx.fillRect(Math.round(col * cw + cw * 0.66 - size / 2), Math.round(row * ch + ch * 0.64 - size / 2), size, size);
      }
    }
  }
}
