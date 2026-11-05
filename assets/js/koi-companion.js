(() => {
  const TRACKS = [
    { id: 'lovesong', label: 'lovesong', src: '/assets/mp3/lovesong.mp3' }
  ];

  const LOOP_GAP = 0.25;

  const pad = (n) => String(n).padStart(2, '0');
  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
    const total = Math.floor(seconds);
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${pad(s)}`;
  };

  const clock = document.querySelector('[data-clock]');
  if (clock instanceof HTMLTimeElement) {
    const tick = () => {
      const now = new Date();
      const label = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      clock.textContent = label;
      clock.dateTime = now.toISOString();
    };
    tick();
    setInterval(tick, 1000);
  }

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

  if (
    !(audio instanceof HTMLAudioElement) ||
    !(toggle instanceof HTMLButtonElement) ||
    !(volume instanceof HTMLInputElement) ||
    !(trackSelect instanceof HTMLSelectElement) ||
    !(loopBtn instanceof HTMLButtonElement) ||
    !(resetBtn instanceof HTMLButtonElement) ||
    !(timeline instanceof HTMLElement) ||
    !(rangeEl instanceof HTMLElement) ||
    !(progressEl instanceof HTMLElement) ||
    !(handleA instanceof HTMLButtonElement) ||
    !(handleB instanceof HTMLButtonElement) ||
    !(playhead instanceof HTMLElement)
  ) {
    // Fall through to ocean init below.
  } else {
    let trackIndex = 0;
    let loopEnabled = true;
    let loopStart = 0;
    let loopEnd = 0;
    let duration = 0;
    let dragTarget = null;

    audio.loop = false;
    audio.preload = 'metadata';

    TRACKS.forEach((track, index) => {
      const option = document.createElement('option');
      option.value = String(index);
      option.textContent = track.label;
      trackSelect.appendChild(option);
    });
    trackSelect.disabled = TRACKS.length <= 1;

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

    const applyVolume = () => {
      const level = clamp(Number(volume.value) || 0, 0, 1);
      audio.volume = level;
      volume.value = String(level);
      volume.setAttribute('aria-valuenow', String(level));
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

    const setLoopBounds = (start, end) => {
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
      syncTimeline();
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
      if (dragTarget === 'a') setLoopBounds(t, loopEnd);
      else if (dragTarget === 'b') setLoopBounds(loopStart, t);
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
      dragTarget = null;
    };

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
      setLoopBounds(0, duration);
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

    // Autoplay policies require a gesture; first pointer/key gesture unlocks audio.
    const unlock = () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      if (audio.paused) play();
    };
    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });

    loadTrack(0);
    syncToggle();
  }

  const canvas = document.querySelector('[data-ocean]');
  if (!(canvas instanceof HTMLCanvasElement) || typeof OceanEngine !== 'function') return;

  new OceanEngine(
    canvas,
    [{ kind: 'sora', size: 1.08 }],
    {
      companion: true,
      interactive: false,
      fishCount: 160,
      accents: ['#7eb8e8', '#c5e4f7', '#4a90c8', '#e8f4fc'],
      bubble: 'rgb(160,195,230)',
      koiRgb: [
        [90, 150, 220],
        [200, 225, 245],
        [36, 50, 70],
        [120, 180, 230],
        [160, 200, 235]
      ]
    }
  );
})();
