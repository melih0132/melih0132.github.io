// Copied from ascii-sharks (https://github.com/stackedlol/ascii-sharks, commit a0074c1),
// © 2026 drewdi, MIT licence: see LICENSE in this folder. Changes are marked "Adaptation:".
import { AsciiRenderer, type RendererOptions } from "./renderer.ts";
import { World, type Crossing, type SharkSpec } from "./world.ts";

const STEP = 1 / 60;
const MAX_STEPS = 4;

export interface OceanOptions extends RendererOptions {
  /** Adaptation: overrides the area-based fish population; 0 leaves the sharks alone. */
  fishCount?: number;
  /** Adaptation: one pass across the canvas, then onDone. */
  crossing?: Crossing;
  /** Adaptation: false ignores the pointer (fish don't flee, clicks don't splash). */
  interactive?: boolean;
  onDone?: () => void;
}

/**
 * Wires World + AsciiRenderer to a canvas: fixed-timestep loop, resize,
 * pointer input, pausing off-screen, and prefers-reduced-motion.
 */
export class OceanEngine {
  private world: World;
  private renderer: AsciiRenderer;
  private raf = 0;
  private last = 0;
  private acc = 0;
  private visible = true;
  private pageVisible = true;
  private reducedMotion: MediaQueryList;
  private resizeObserver: ResizeObserver;
  private intersectionObserver: IntersectionObserver;
  private disposed = false;
  private canvas: HTMLCanvasElement;
  private options: OceanOptions;
  /** Adaptation: user power-save / battery mode (still frame, no RAF). */
  private powerSave = false;

  constructor(canvas: HTMLCanvasElement, sharks?: SharkSpec[], options: OceanOptions = {}) {
    this.canvas = canvas;
    this.options = options;
    this.world = new World(sharks, {
      fishCount: options.fishCount,
      crossing: options.crossing,
    });
    this.renderer = new AsciiRenderer(canvas, options);
    this.renderer.setFontFamily(getComputedStyle(canvas).fontFamily);
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    this.pageVisible = document.visibilityState !== "hidden";

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas);
    this.intersectionObserver = new IntersectionObserver(([entry]) => {
      this.visible = entry.isIntersecting;
      this.schedule();
    });
    this.intersectionObserver.observe(canvas);

    this.reducedMotion.addEventListener("change", this.onMotionPreference);
    // Adaptation: fixed full-viewport canvases stay "intersecting"; pause when the tab is hidden.
    document.addEventListener("visibilitychange", this.onVisibilityChange);
    if (options.interactive ?? true) {
      window.addEventListener("pointermove", this.onPointerMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", this.onPointerLeave);
      window.addEventListener("blur", this.onPointerLeave);
      window.addEventListener("mouseout", this.onWindowMouseOut);
      window.addEventListener("pointerdown", this.onPointerDown, { passive: true });
    }

    this.resize();
    // Canvas text can't trigger a webfont load; once the mono face is in, redraw.
    document.fonts?.load(`600 16px ${getComputedStyle(canvas).fontFamily}`).then(() => {
      if (!this.disposed && this.isStill()) this.drawStill();
    });
    this.schedule();
  }

  destroy() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.resizeObserver.disconnect();
    this.intersectionObserver.disconnect();
    this.reducedMotion.removeEventListener("change", this.onMotionPreference);
    document.removeEventListener("visibilitychange", this.onVisibilityChange);
    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("pointerdown", this.onPointerDown);
    document.documentElement.removeEventListener("pointerleave", this.onPointerLeave);
    window.removeEventListener("blur", this.onPointerLeave);
    window.removeEventListener("mouseout", this.onWindowMouseOut);
  }

  /** Adaptation: clock-driven chromatic drift. */
  setPalette(opts: { accents?: string[]; bubble?: string; koiRgb?: [number, number, number][] }) {
    this.renderer.setPalette(opts);
    if (this.isStill()) this.drawStill();
  }

  /** Adaptation: dynamically adjust school size across pages (e.g. data-ocean-fish). */
  setFishCount(count?: number) {
    this.options.fishCount = count;
    this.world.setFishCount(count);
    if (this.isStill()) this.drawStill();
  }

  /** Adaptation: still frame for battery / performance. */
  setPowerSave(enabled: boolean) {
    this.powerSave = enabled;
    if (this.disposed) return;
    if (this.isStill()) {
      cancelAnimationFrame(this.raf);
      this.raf = 0;
      if (this.options.crossing) {
        this.renderer.clear();
        this.options.onDone?.();
        return;
      }
      this.drawStill();
    } else {
      this.schedule();
    }
  }

  isPowerSave(): boolean {
    return this.powerSave;
  }

  private isStill() {
    return this.powerSave || this.reducedMotion.matches;
  }

  private resize() {
    const rect = this.canvas.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.renderer.resize(rect.width, rect.height, dpr);
    this.world.resize(rect.width, rect.height, this.renderer.cellWidth, this.renderer.cellHeight);
    if (this.isStill()) this.drawStill();
  }

  private schedule() {
    cancelAnimationFrame(this.raf);
    if (this.disposed || !this.visible || !this.pageVisible || this.isStill()) return;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  private onVisibilityChange = () => {
    this.pageVisible = document.visibilityState !== "hidden";
    this.schedule();
  };

  private frame = (now: number) => {
    const dt = Math.min(0.1, (now - this.last) / 1000);
    this.last = now;
    this.acc += dt;
    let steps = 0;
    while (this.acc >= STEP && steps < MAX_STEPS) {
      this.world.step(STEP);
      this.acc -= STEP;
      steps++;
    }
    if (steps === MAX_STEPS) this.acc = 0;
    // Adaptation: a finished crossing stops the loop and hands over to the caller.
    if (this.world.done) {
      this.raf = 0;
      this.renderer.clear();
      this.options.onDone?.();
      return;
    }
    this.renderer.render(this.world, dt);
    this.raf = requestAnimationFrame(this.frame);
  };

  /** Reduced motion: let the ecosystem settle, then show a single frame. */
  private drawStill() {
    if (this.world.time < 4) {
      for (let i = 0; i < 240; i++) this.world.step(STEP);
    }
    this.renderer.render(this.world, STEP);
  }

  private onMotionPreference = () => {
    if (this.isStill()) {
      cancelAnimationFrame(this.raf);
      this.raf = 0;
      // Adaptation: a crossing in progress is cut short instead of freezing on a still frame.
      if (this.options.crossing) {
        this.renderer.clear();
        this.options.onDone?.();
        return;
      }
      this.drawStill();
    } else {
      this.schedule();
    }
  };

  private toLocal(e: PointerEvent) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
    return { x, y, inside };
  }

  private onPointerMove = (e: PointerEvent) => {
    const { x, y, inside } = this.toLocal(e);
    const p = this.world.pointer;
    const active = inside && e.pointerType !== "touch";
    p.x = x;
    p.y = y;
    p.active = active;
  };

  private onPointerDown = (e: PointerEvent) => {
    const { x, y, inside } = this.toLocal(e);
    if (!inside) return;
    if (!this.isStill()) this.world.splash(x, y);
  };

  private onPointerLeave = () => {
    this.world.pointer.active = false;
  };

  /** Adaptation: catch leaving the browser chrome (relatedTarget null). */
  private onWindowMouseOut = (e: MouseEvent) => {
    if (e.relatedTarget == null) this.onPointerLeave();
  };
}
