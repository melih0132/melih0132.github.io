(() => {
  const TRACKS = [
    { id: 'lovesong', label: 'lovesong', src: '/assets/mp3/lovesong.mp3' },
    { id: 'lovely', label: 'lovely', src: '/assets/mp3/lovely.mp3' }
  ];

  const LOOP_GAP = 0.25;
  const STORAGE_KEY = 'koi-chamber';
  const HINT_KEY = 'koi-hint-seen';

  const DAY_ACCENTS = ['#7eb8e8', '#c5e4f7', '#4a90c8', '#e8f4fc'];
  const NIGHT_ACCENTS = ['#5a8ab0', '#9ec4dc', '#3a6a90', '#c8dce8'];
  const DAY_KOI = [
    [90, 150, 220],
    [200, 225, 245],
    [36, 50, 70],
    [120, 180, 230],
    [160, 200, 235]
  ];
  const NIGHT_KOI = [
    [60, 110, 170],
    [150, 180, 210],
    [24, 34, 48],
    [80, 130, 180],
    [110, 155, 195]
  ];

  const pad = (n) => String(n).padStart(2, '0');
  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
    const total = Math.floor(seconds);
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${pad(s)}`;
  };

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const lerp = (a, b, t) => a + (b - a) * t;

  const lerpRgb = (a, b, t) => [
    Math.round(lerp(a[0], b[0], t)),
    Math.round(lerp(a[1], b[1], t)),
    Math.round(lerp(a[2], b[2], t))
  ];

  const mixHex = (a, b, t) => {
    const parse = (hex) => {
      const h = hex.replace('#', '');
      return [
        parseInt(h.slice(0, 2), 16),
        parseInt(h.slice(2, 4), 16),
        parseInt(h.slice(4, 6), 16)
      ];
    };
    const [ar, ag, ab] = parse(a);
    const [br, bg, bb] = parse(b);
    const r = Math.round(lerp(ar, br, t));
    const g = Math.round(lerp(ag, bg, t));
    const bl = Math.round(lerp(ab, bb, t));
    return `#${[r, g, bl].map((n) => n.toString(16).padStart(2, '0')).join('')}`;
  };

  /** 0 at midnight, 1 at noon. */
  const dayFactor = (date = new Date()) => {
    const h = date.getHours() + date.getMinutes() / 60;
    return 0.5 + 0.5 * Math.cos(((h - 12) / 12) * Math.PI);
  };

  const loadStore = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (!data || typeof data !== 'object') return null;
      return data;
    } catch {
      return null;
    }
  };

  const saveStore = (data) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* ignore quota / private mode */
    }
  };

  const clock = document.querySelector('[data-clock]');
  const panel = document.querySelector('[data-audio-panel]');
  const hint = document.querySelector('[data-audio-hint]');
  const excerptToggle = document.querySelector('[data-audio-excerpt-toggle]');
  const audio = document.querySelector('[data-koi-audio]');
  const toggle = document.querySelector('[data-audio-toggle]');
  const volume = document.querySelector('[data-audio-volume]');
  const trackSelect = document.querySelector('[data-audio-track]');
  const loopBtn = document.querySelector('[data-audio-loop]');
  const resetBtn = document.querySelector('[data-audio-reset]');
  const timeline = document.querySelector('[data-audio-timeline]');
  const rangeEl = document.querySelector('[data-audio-range]');
  const progressEl = document.querySelector('[data-audio-progress]');
  const handleA = document.querySelector('[data-handle="a"]');
  const handleB = document.querySelector('[data-handle="b"]');
  const playhead = document.querySelector('[data-handle="playhead"]');
  const timeCurrent = document.querySelector('[data-audio-time-current]');
  const timeA = document.querySelector('[data-audio-time-a]');
  const timeB = document.querySelector('[data-audio-time-b]');
  const timeDuration = document.querySelector('[data-audio-time-duration]');
  const canvas = document.querySelector('[data-ocean]');

  /** @type {null | { setPulse: Function, setPalette: Function, softRipple: Function, getCompanionHead: Function }} */
  let ocean = null;
  let audioCtx = null;
  let analyser = null;
  let analyserData = null;
  let smoothPulse = 0;
  let lastCompanionRipple = 0;
  let lastCompanionPos = null;
  let nextRareAt = 0;
  let lastPaletteMinute = -1;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const stored = loadStore() || {};
  if (!stored.excerpts || typeof stored.excerpts !== 'object') stored.excerpts = {};

  if (clock instanceof HTMLTimeElement) {
    const tick = () => {
      const now = new Date();
      const label = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      clock.textContent = label;
      clock.dateTime = now.toISOString();
      if (ocean && typeof ocean.setPalette === 'function') {
        const minute = now.getHours() * 60 + now.getMinutes();
        if (minute !== lastPaletteMinute) {
          lastPaletteMinute = minute;
          applyPalette(now);
        }
      }
    };
    tick();
    setInterval(tick, 1000);
  }

  const applyPalette = (now = new Date()) => {
    if (!ocean || typeof ocean.setPalette !== 'function') return;
    const t = dayFactor(now);
    const accents = DAY_ACCENTS.map((hex, i) => mixHex(NIGHT_ACCENTS[i], hex, t));
    const koiRgb = DAY_KOI.map((rgb, i) => lerpRgb(NIGHT_KOI[i], rgb, t));
    const br = Math.round(lerp(120, 160, t));
    const bg = Math.round(lerp(155, 195, t));
    const bb = Math.round(lerp(190, 230, t));
    ocean.setPalette({
      accents,
      bubble: `rgb(${br},${bg},${bb})`,
      koiRgb
    });
  };

  const updateUiAwake = (clientX, clientY) => {
    const nearClock =
      clientY < Math.min(120, window.innerHeight * 0.18) &&
      Math.abs(clientX - window.innerWidth / 2) < Math.min(220, window.innerWidth * 0.35);
    const nearPanel =
      clientX > window.innerWidth - Math.min(420, window.innerWidth * 0.55) &&
      clientY > window.innerHeight - Math.min(280, window.innerHeight * 0.45);
    const awake = nearClock || nearPanel;
    if (clock) clock.classList.toggle('is-awake', awake || nearClock);
    if (panel) panel.classList.toggle('is-awake', awake);
  };

  window.addEventListener(
    'pointermove',
    (event) => {
      updateUiAwake(event.clientX, event.clientY);
    },
    { passive: true }
  );

  requestAnimationFrame(() => {
    document.body.classList.add('is-ready');
  });

  if (excerptToggle instanceof HTMLButtonElement && panel) {
    const mobile = window.matchMedia('(max-width: 640px)');
    const syncExcerpt = () => {
      const open = !mobile.matches || panel.classList.contains('is-excerpt-open');
      excerptToggle.setAttribute('aria-expanded', open && mobile.matches ? 'true' : 'false');
    };
    excerptToggle.addEventListener('click', () => {
      panel.classList.toggle('is-excerpt-open');
      syncExcerpt();
    });
    mobile.addEventListener('change', () => {
      if (!mobile.matches) panel.classList.remove('is-excerpt-open');
      syncExcerpt();
    });
    syncExcerpt();
  }

  const showHintOnce = () => {
    if (!(hint instanceof HTMLElement)) return;
    try {
      if (localStorage.getItem(HINT_KEY) === '1') return;
      localStorage.setItem(HINT_KEY, '1');
    } catch {
      /* ignore */
    }
    hint.classList.add('is-visible');
    hint.setAttribute('aria-hidden', 'false');
    window.setTimeout(() => {
      hint.classList.remove('is-visible');
      hint.setAttribute('aria-hidden', 'true');
    }, 4000);
  };

  if (panel) {
    panel.addEventListener(
      'focusin',
      () => {
        showHintOnce();
      },
      { once: true }
    );
  }

  if (
    audio instanceof HTMLAudioElement &&
    toggle instanceof HTMLButtonElement &&
    volume instanceof HTMLInputElement &&
    trackSelect instanceof HTMLSelectElement &&
    loopBtn instanceof HTMLButtonElement &&
    resetBtn instanceof HTMLButtonElement &&
    timeline instanceof HTMLElement &&
    rangeEl instanceof HTMLElement &&
    progressEl instanceof HTMLElement &&
    handleA instanceof HTMLButtonElement &&
    handleB instanceof HTMLButtonElement &&
    playhead instanceof HTMLElement
  ) {
    let trackIndex = 0;
    let loopEnabled = true;
    let loopStart = 0;
    let loopEnd = 0;
    let duration = 0;
    let dragTarget = null;
    let pendingExcerpt = null;

    audio.loop = false;
    audio.preload = 'metadata';

    TRACKS.forEach((track, index) => {
      const option = document.createElement('option');
      option.value = String(index);
      option.textContent = track.label;
      trackSelect.appendChild(option);
    });
    trackSelect.disabled = TRACKS.length <= 1;

    const persist = () => {
      const track = TRACKS[trackIndex];
      if (!track) return;
      stored.trackId = track.id;
      stored.volume = clamp(Number(volume.value) || 0, 0, 1);
      stored.loopEnabled = loopEnabled;
      if (duration > 0) {
        stored.excerpts[track.id] = { a: loopStart, b: loopEnd };
      }
      saveStore(stored);
    };

    const applyVolume = () => {
      const level = clamp(Number(volume.value) || 0, 0, 1);
      audio.volume = level;
      volume.value = String(level);
      volume.setAttribute('aria-valuenow', String(level));
      persist();
    };

    const syncToggle = () => {
      const on = !audio.paused;
      toggle.setAttribute('aria-pressed', on ? 'true' : 'false');
      toggle.setAttribute('aria-label', on ? 'Pause' : 'Lecture');
      toggle.textContent = on ? '⏸' : '▶';
    };

    const syncLoopBtn = () => {
      loopBtn.setAttribute('aria-pressed', loopEnabled ? 'true' : 'false');
      loopBtn.setAttribute('aria-label', loopEnabled ? 'Boucle activée' : 'Boucle désactivée');
    };

    const play = () => {
      if (duration > 0 && audio.currentTime >= loopEnd - 0.02) {
        audio.currentTime = loopStart;
      }
      const start = audio.play();
      if (start && typeof start.then === 'function') {
        start.then(syncToggle).catch(() => syncToggle());
      } else {
        syncToggle();
      }
    };

    const syncTimeline = () => {
      const safeDuration = duration > 0 ? duration : 1;
      const startPct = (loopStart / safeDuration) * 100;
      const endPct = (loopEnd / safeDuration) * 100;
      const nowPct = (clamp(audio.currentTime || 0, 0, safeDuration) / safeDuration) * 100;

      rangeEl.style.left = `${startPct}%`;
      rangeEl.style.width = `${Math.max(0, endPct - startPct)}%`;
      progressEl.style.left = `${startPct}%`;
      progressEl.style.width = `${Math.max(0, Math.min(nowPct, endPct) - startPct)}%`;
      handleA.style.left = `${startPct}%`;
      handleB.style.left = `${endPct}%`;
      playhead.style.left = `${nowPct}%`;

      timeline.setAttribute('aria-valuemax', String(Math.round(safeDuration)));
      timeline.setAttribute('aria-valuenow', String(Math.round(audio.currentTime || 0)));

      if (timeCurrent) timeCurrent.textContent = formatTime(audio.currentTime || 0);
      if (timeA) timeA.textContent = `A ${formatTime(loopStart)}`;
      if (timeB) timeB.textContent = `B ${formatTime(loopEnd)}`;
      if (timeDuration) timeDuration.textContent = formatTime(duration);
    };

    const setLoopBounds = (start, end, { persistBounds = true } = {}) => {
      if (!(duration > 0)) {
        loopStart = 0;
        loopEnd = 0;
        syncTimeline();
        return;
      }
      const minGap = Math.min(LOOP_GAP, duration);
      loopStart = clamp(start, 0, Math.max(0, duration - minGap));
      loopEnd = clamp(end, loopStart + minGap, duration);
      if (audio.currentTime < loopStart || audio.currentTime > loopEnd) {
        audio.currentTime = loopStart;
      }
      syncTimeline();
      if (persistBounds) persist();
    };

    const resetExcerpt = () => {
      setLoopBounds(0, duration || 0);
    };

    const loadTrack = (index, { autoplay = false } = {}) => {
      const next = TRACKS[index];
      if (!next) return;
      const wasPlaying = !audio.paused || autoplay;
      trackIndex = index;
      trackSelect.value = String(index);
      audio.src = next.src;
      audio.load();
      loopStart = 0;
      loopEnd = 0;
      duration = 0;
      const saved = stored.excerpts[next.id];
      pendingExcerpt =
        saved && Number.isFinite(saved.a) && Number.isFinite(saved.b)
          ? { a: saved.a, b: saved.b }
          : null;
      syncTimeline();
      persist();
      if (wasPlaying) {
        const resume = () => {
          audio.removeEventListener('loadedmetadata', resume);
          play();
        };
        audio.addEventListener('loadedmetadata', resume);
      }
    };

    const ratioFromEvent = (event) => {
      const rect = timeline.getBoundingClientRect();
      if (rect.width <= 0) return 0;
      const clientX = 'clientX' in event ? event.clientX : 0;
      return clamp((clientX - rect.left) / rect.width, 0, 1);
    };

    const timeFromEvent = (event) => ratioFromEvent(event) * (duration || 0);

    const beginDrag = (target, event) => {
      if (!(duration > 0)) return;
      dragTarget = target;
      timeline.setPointerCapture?.(event.pointerId);
      event.preventDefault();
    };

    const onPointerMove = (event) => {
      if (!dragTarget || !(duration > 0)) return;
      const t = timeFromEvent(event);
      if (dragTarget === 'a') setLoopBounds(t, loopEnd, { persistBounds: false });
      else if (dragTarget === 'b') setLoopBounds(loopStart, t, { persistBounds: false });
      else if (dragTarget === 'seek') {
        audio.currentTime = clamp(t, loopStart, loopEnd);
        syncTimeline();
      }
    };

    const endDrag = (event) => {
      if (!dragTarget) return;
      if (event && timeline.hasPointerCapture?.(event.pointerId)) {
        timeline.releasePointerCapture(event.pointerId);
      }
      if (dragTarget === 'a' || dragTarget === 'b') persist();
      dragTarget = null;
    };

    if (typeof stored.volume === 'number') {
      volume.value = String(clamp(stored.volume, 0, 1));
    }
    if (typeof stored.loopEnabled === 'boolean') {
      loopEnabled = stored.loopEnabled;
    }
    const initialTrack = TRACKS.findIndex((t) => t.id === stored.trackId);
    trackIndex = initialTrack >= 0 ? initialTrack : 0;

    applyVolume();
    syncLoopBtn();
    volume.addEventListener('input', applyVolume);

    toggle.addEventListener('click', () => {
      if (audio.paused) play();
      else {
        audio.pause();
        syncToggle();
      }
    });

    loopBtn.addEventListener('click', () => {
      loopEnabled = !loopEnabled;
      syncLoopBtn();
      persist();
    });

    resetBtn.addEventListener('click', () => {
      resetExcerpt();
    });

    trackSelect.addEventListener('change', () => {
      const index = Number(trackSelect.value) || 0;
      loadTrack(index, { autoplay: !audio.paused });
    });

    handleA.addEventListener('pointerdown', (event) => beginDrag('a', event));
    handleB.addEventListener('pointerdown', (event) => beginDrag('b', event));

    timeline.addEventListener('pointerdown', (event) => {
      if (event.target === handleA || event.target === handleB) return;
      if (!(duration > 0)) return;
      const t = timeFromEvent(event);
      const distA = Math.abs(t - loopStart);
      const distB = Math.abs(t - loopEnd);
      const grab = Math.min(duration * 0.03, 0.35);
      if (distA <= grab && distA <= distB) beginDrag('a', event);
      else if (distB <= grab) beginDrag('b', event);
      else {
        audio.currentTime = clamp(t, loopStart, loopEnd);
        syncTimeline();
        beginDrag('seek', event);
      }
    });

    timeline.addEventListener('pointermove', onPointerMove);
    timeline.addEventListener('pointerup', endDrag);
    timeline.addEventListener('pointercancel', endDrag);
    timeline.addEventListener('lostpointercapture', () => {
      dragTarget = null;
    });

    timeline.addEventListener('keydown', (event) => {
      if (!(duration > 0)) return;
      const step = event.shiftKey ? 5 : 1;
      if (event.key === 'ArrowLeft') {
        audio.currentTime = clamp(audio.currentTime - step, loopStart, loopEnd);
        syncTimeline();
        event.preventDefault();
      } else if (event.key === 'ArrowRight') {
        audio.currentTime = clamp(audio.currentTime + step, loopStart, loopEnd);
        syncTimeline();
        event.preventDefault();
      }
    });

    audio.addEventListener('loadedmetadata', () => {
      duration = Number.isFinite(audio.duration) ? audio.duration : 0;
      if (pendingExcerpt && duration > 0) {
        setLoopBounds(pendingExcerpt.a, pendingExcerpt.b);
        pendingExcerpt = null;
      } else {
        setLoopBounds(0, duration);
      }
      syncTimeline();
    });

    audio.addEventListener('timeupdate', () => {
      if (!(duration > 0)) {
        syncTimeline();
        return;
      }
      if (audio.currentTime < loopStart) {
        audio.currentTime = loopStart;
      }
      if (audio.currentTime >= loopEnd - 0.02) {
        if (loopEnabled) {
          audio.currentTime = loopStart;
          if (audio.paused) play();
        } else {
          audio.pause();
          audio.currentTime = loopEnd;
          syncToggle();
        }
      }
      syncTimeline();
    });

    audio.addEventListener('ended', () => {
      if (loopEnabled) {
        audio.currentTime = loopStart;
        play();
      } else {
        syncToggle();
        syncTimeline();
      }
    });

    audio.addEventListener('play', syncToggle);
    audio.addEventListener('pause', syncToggle);

    const ensureAnalyser = () => {
      if (analyser || reducedMotion.matches) return;
      try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return;
        audioCtx = new Ctx();
        const source = audioCtx.createMediaElementSource(audio);
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.85;
        analyserData = new Uint8Array(analyser.frequencyBinCount);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
      } catch {
        analyser = null;
      }
    };

    const nudgeBound = (which, delta) => {
      if (!(duration > 0)) return;
      if (which === 'a') setLoopBounds(loopStart + delta, loopEnd);
      else setLoopBounds(loopStart, loopEnd + delta);
    };

    window.addEventListener('keydown', (event) => {
      const tag = event.target && event.target.tagName;
      if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
      if (event.key === ' ' || event.code === 'Space') {
        event.preventDefault();
        if (audio.paused) play();
        else {
          audio.pause();
          syncToggle();
        }
      } else if (event.key === '[') {
        event.preventDefault();
        nudgeBound('a', event.shiftKey ? -5 : -1);
      } else if (event.key === ']') {
        event.preventDefault();
        nudgeBound('b', event.shiftKey ? 5 : 1);
      }
    });

    const wakePond = () => {
      document.body.classList.add('is-woken');
      if (!ocean || typeof ocean.softRipple !== 'function') return;
      const head = typeof ocean.getCompanionHead === 'function' ? ocean.getCompanionHead() : null;
      const cx = head ? head.x : (canvas instanceof HTMLCanvasElement ? canvas.clientWidth / 2 : 0);
      const cy = head ? head.y : (canvas instanceof HTMLCanvasElement ? canvas.clientHeight / 2 : 0);
      ocean.softRipple(cx, cy);
      ocean.softRipple(cx + 40, cy - 20);
      ocean.softRipple(cx - 30, cy + 25);
    };

    const unlock = () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      ensureAnalyser();
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
      }
      if (audio.paused) play();
      wakePond();
    };
    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });

    loadTrack(trackIndex);
    syncToggle();
  }

  if (canvas instanceof HTMLCanvasElement && typeof OceanEngine === 'function') {
    ocean = new OceanEngine(
      canvas,
      [{ kind: 'sora', size: 1.08 }],
      {
        companion: true,
        interactive: false,
        fishCount: 160,
        accents: DAY_ACCENTS.slice(),
        bubble: 'rgb(160,195,230)',
        koiRgb: DAY_KOI.map((c) => c.slice())
      }
    );
    applyPalette();
    nextRareAt = performance.now() + (45000 + Math.random() * 45000);

    const atmosphereFrame = (now) => {
      if (ocean && typeof ocean.setPulse === 'function') {
        let level = 0;
        if (analyser && analyserData && !reducedMotion.matches) {
          analyser.getByteFrequencyData(analyserData);
          let sum = 0;
          for (let i = 0; i < analyserData.length; i++) sum += analyserData[i];
          const rms = sum / (analyserData.length * 255);
          level = clamp(rms * 1.6, 0, 1);
        }
        smoothPulse += (level - smoothPulse) * 0.12;
        ocean.setPulse(smoothPulse);
      }

      if (ocean && typeof ocean.softRipple === 'function' && typeof ocean.getCompanionHead === 'function') {
        const head = ocean.getCompanionHead();
        if (head) {
          const moved =
            !lastCompanionPos ||
            Math.hypot(head.x - lastCompanionPos.x, head.y - lastCompanionPos.y) > 12;
          if (moved && now - lastCompanionRipple > 2200) {
            lastCompanionRipple = now;
            ocean.softRipple(head.x, head.y);
          }
          lastCompanionPos = { x: head.x, y: head.y };
        }
        if (now >= nextRareAt && canvas instanceof HTMLCanvasElement) {
          nextRareAt = now + (45000 + Math.random() * 45000);
          const w = canvas.clientWidth;
          const h = canvas.clientHeight;
          const x = w * (0.2 + Math.random() * 0.6);
          const y = h * (0.2 + Math.random() * 0.6);
          ocean.softRipple(x, y);
          ocean.softRipple(x + 28, y - 18);
          ocean.softRipple(x - 22, y + 16);
        }
      }

      requestAnimationFrame(atmosphereFrame);
    };
    requestAnimationFrame(atmosphereFrame);
  }
})();
