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
  /** Adaptation: temporary freeze for reading (keeps current frame). */
  private paused = false;
  /** Adaptation: long-press lure tracking on empty ocean areas. */
  private holdTimer = 0;
  private holdX = 0;
  private holdY = 0;
  private holdFired = false;

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
      window.addEventListener("pointerup", this.onPointerUp, { passive: true });
      window.addEventListener("pointercancel", this.clearHold, { passive: true });
      window.addEventListener("dblclick", this.onDblClick, { passive: true });
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
    this.clearHold();
    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("pointerdown", this.onPointerDown);
    window.removeEventListener("pointerup", this.onPointerUp);
    window.removeEventListener("pointercancel", this.clearHold);
    window.removeEventListener("dblclick", this.onDblClick);
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

  /** Adaptation: pause RAF without settling a new still frame. */
  setPaused(enabled: boolean) {
    this.paused = enabled;
    if (this.disposed) return;
    if (this.paused || this.isStill()) {
      cancelAnimationFrame(this.raf);
      this.raf = 0;
    } else {
      this.schedule();
    }
  }

  isPaused(): boolean {
    return this.paused;
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
    if (this.disposed || !this.visible || !this.pageVisible || this.isStill() || this.paused) return;
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

  /** Adaptation: drop a golden lure that gently draws koi toward (x, y). */
  dropLure(x: number, y: number) {
    if (this.disposed || this.isStill() || this.paused) return;
    this.world.dropLure(x, y);
  }

  private isInteractiveUiTarget(target: EventTarget | null): boolean {
    if (!(target instanceof Element)) return false;
    return !!target.closest(
      'a, button, input, select, textarea, label, [role="button"], .header, .project-card, .contact-panel, .contact-aside, .cmd-palette, .quick-peek, .spotlight, .arch-diagram'
    );
  }

  private clearHold = () => {
    if (this.holdTimer) {
      window.clearTimeout(this.holdTimer);
      this.holdTimer = 0;
    }
    this.holdFired = false;
  };

  private onPointerMove = (e: PointerEvent) => {
    const { x, y, inside } = this.toLocal(e);
    const p = this.world.pointer;
    const active = inside && e.pointerType !== "touch";
    p.x = x;
    p.y = y;
    p.active = active;
    if (this.holdTimer && Math.hypot(x - this.holdX, y - this.holdY) > 16) {
      this.clearHold();
    }
  };

  private onPointerDown = (e: PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    const { x, y, inside } = this.toLocal(e);
    if (!inside || this.isStill() || this.paused) return;
    this.clearHold();
    if (this.isInteractiveUiTarget(e.target)) {
      this.world.splash(x, y);
      return;
    }
    this.holdX = x;
    this.holdY = y;
    this.holdTimer = window.setTimeout(() => {
      this.holdTimer = 0;
      this.holdFired = true;
      if (!this.disposed && !this.isStill() && !this.paused) {
        this.world.dropLure(this.holdX, this.holdY);
      }
    }, 260);
  };

  private onPointerUp = (e: PointerEvent) => {
    const hadPending = !!this.holdTimer;
    const fired = this.holdFired;
    this.clearHold();
    if (fired || !hadPending) return;
    const { x, y, inside } = this.toLocal(e);
    if (inside && !this.isStill() && !this.paused) {
      this.world.splash(x, y);
    }
  };

  private onDblClick = (e: MouseEvent) => {
    if (this.isStill() || this.paused || this.isInteractiveUiTarget(e.target)) return;
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
      this.world.dropLure(x, y);
    }
  };

  private onPointerLeave = () => {
    this.world.pointer.active = false;
  };

  /** Adaptation: catch leaving the browser chrome (relatedTarget null). */
  private onWindowMouseOut = (e: MouseEvent) => {
    if (e.relatedTarget == null) this.onPointerLeave();
  };
}
