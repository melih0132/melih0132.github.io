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
  /** Adaptation: one koi gently follows the pointer; school stays calm. */
  companion?: boolean;
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
  /** Adaptation: last pointer sample for companion idle detection. */
  private lastPointer = { x: 0, y: 0, movedAt: 0 };

  constructor(canvas: HTMLCanvasElement, sharks?: SharkSpec[], options: OceanOptions = {}) {
    this.canvas = canvas;
    this.options = options;
    this.world = new World(sharks, {
      fishCount: options.fishCount,
      crossing: options.crossing,
      companion: options.companion,
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
    // Adaptation: companion always tracks the pointer, even if interactive is false for splashes.
    if ((options.interactive ?? true) || options.companion) {
      window.addEventListener("pointermove", this.onPointerMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", this.onPointerLeave);
      window.addEventListener("blur", this.onPointerLeave);
      window.addEventListener("mouseout", this.onWindowMouseOut);
    }
    if (options.interactive ?? true) {
      window.addEventListener("pointerdown", this.onPointerDown, { passive: true });
    }

    this.resize();
    // Canvas text can't trigger a webfont load; once the mono face is in, redraw.
    document.fonts?.load(`600 16px ${getComputedStyle(canvas).fontFamily}`).then(() => {
      if (!this.disposed && this.reducedMotion.matches) this.drawStill();
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

  private resize() {
    const rect = this.canvas.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.renderer.resize(rect.width, rect.height, dpr);
    this.world.resize(rect.width, rect.height, this.renderer.cellWidth, this.renderer.cellHeight);
    if (this.reducedMotion.matches) this.drawStill();
  }

  private schedule() {
    cancelAnimationFrame(this.raf);
    if (this.disposed || !this.visible || !this.pageVisible || this.reducedMotion.matches) return;
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
    // Adaptation: idle must be refreshed every frame; pointermove stops when the cursor rests.
    if (this.options.companion) {
      const p = this.world.pointer;
      p.idle = p.active && now - this.lastPointer.movedAt >= 900;
    }
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
    if (this.reducedMotion.matches) {
      cancelAnimationFrame(this.raf);
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
    const now = performance.now();
    // Adaptation: touch counts as an active lure in companion mode.
    const active = inside && (e.pointerType !== "touch" || !!this.options.companion);
    if (active) {
      const moved = Math.hypot(x - this.lastPointer.x, y - this.lastPointer.y);
      if (moved > 2.5 || !p.active) this.lastPointer.movedAt = now;
      this.lastPointer.x = x;
      this.lastPointer.y = y;
    }
    p.x = x;
    p.y = y;
    p.active = active;
    p.idle = active && now - this.lastPointer.movedAt >= 900;
  };

  private onPointerDown = (e: PointerEvent) => {
    const { x, y, inside } = this.toLocal(e);
    if (inside && !this.reducedMotion.matches) this.world.splash(x, y);
  };

  private onPointerLeave = () => {
    this.world.pointer.active = false;
    this.world.pointer.idle = false;
  };

  /** Adaptation: catch leaving the browser chrome (relatedTarget null). */
  private onWindowMouseOut = (e: MouseEvent) => {
    if (e.relatedTarget == null) this.onPointerLeave();
  };
}
