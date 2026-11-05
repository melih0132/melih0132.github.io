(() => {
  // Official YouTube embeds only (IFrame API). No audio files hosted.
  const TRACKS = [
    { id: 'lovesong', label: 'lovesong', youtube: '0wPhbmeNSOs' },
    { id: 'lovely', label: 'lovely', youtube: '8VLXHyHRXjc' }
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
  const fsToggle = document.querySelector('[data-fs-toggle]');
  const panel = document.querySelector('[data-audio-panel]');
  const hint = document.querySelector('[data-audio-hint]');
  const excerptToggle = document.querySelector('[data-audio-excerpt-toggle]');
  const audio = document.querySelector('[data-koi-audio]');
  const toggle = document.querySelector('[data-audio-toggle]');
  const volume = document.querySelector('[data-audio-volume]');
  const trackLabel = document.querySelector('[data-audio-track-label]');
  const trackMeta = document.querySelector('[data-audio-track-meta]');
  const prevBtn = document.querySelector('[data-audio-prev]');
  const nextBtn = document.querySelector('[data-audio-next]');
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
    const nearFs =
      clientY < Math.min(100, window.innerHeight * 0.16) &&
      clientX > window.innerWidth - Math.min(120, window.innerWidth * 0.22);
    const nearPanel =
      clientX > window.innerWidth - Math.min(420, window.innerWidth * 0.55) &&
      clientY > window.innerHeight - Math.min(280, window.innerHeight * 0.45);
    const awake = nearClock || nearPanel || nearFs;
    if (clock) clock.classList.toggle('is-awake', awake || nearClock);
    if (fsToggle) fsToggle.classList.toggle('is-awake', awake || nearFs);
    if (panel) panel.classList.toggle('is-awake', awake);
  };

  if (fsToggle instanceof HTMLButtonElement) {
    const fsElement = () =>
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement ||
      null;

    const syncFs = () => {
      const on = !!fsElement();
      fsToggle.setAttribute('aria-pressed', on ? 'true' : 'false');
      fsToggle.setAttribute('aria-label', on ? 'Quitter le plein écran' : 'Plein écran');
      fsToggle.title = on ? 'Quitter le plein écran' : 'Plein écran';
      fsToggle.textContent = on ? '✕' : '⛶';
    };

    const enterFs = () => {
      const root = document.documentElement;
      const req =
        root.requestFullscreen ||
        root.webkitRequestFullscreen ||
        root.msRequestFullscreen;
      if (req) return req.call(root);
      return Promise.reject();
    };

    const exitFs = () => {
      const exit =
        document.exitFullscreen ||
        document.webkitExitFullscreen ||
        document.msExitFullscreen;
      if (exit) return exit.call(document);
      return Promise.reject();
    };

    fsToggle.addEventListener('click', () => {
      const go = fsElement() ? exitFs() : enterFs();
      if (go && typeof go.catch === 'function') go.catch(() => {});
    });

    document.addEventListener('fullscreenchange', syncFs);
    document.addEventListener('webkitfullscreenchange', syncFs);
    syncFs();
  }

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
    trackLabel instanceof HTMLElement &&
    trackMeta instanceof HTMLElement &&
    prevBtn instanceof HTMLButtonElement &&
    nextBtn instanceof HTMLButtonElement &&
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
    /** @type {'off' | 'one' | 'all'} */
    let loopMode = 'one';
    let loopStart = 0;
    let loopEnd = 0;
    let duration = 0;
    let dragTarget = null;
    let pendingExcerpt = null;
    let advancingPlaylist = false;
    let mediaPaused = true;
    /** @type {any} */
    let ytPlayer = null;
    let ytReady = false;
    let ytPoll = 0;
    let ytLoadToken = 0;
    let playWhenReady = false;
    const ytHost = document.querySelector('[data-koi-yt]');

    audio.loop = false;
    audio.preload = 'metadata';

    const multiTrack = TRACKS.length > 1;
    prevBtn.disabled = !multiTrack;
    nextBtn.disabled = !multiTrack;

    const LOOP_ORDER = /** @type {const} */ (['off', 'one', 'all']);
    const LOOP_UI = {
      off: { label: 'Sans boucle', title: 'Sans boucle', text: '→', pressed: 'false' },
      one: { label: 'Boucle piste', title: 'Boucle piste', text: '∞', pressed: 'true' },
      all: { label: 'Boucle playlist', title: 'Boucle playlist', text: '≡', pressed: 'true' }
    };

    const currentTrack = () => TRACKS[trackIndex] || null;
    const isYoutube = (track = currentTrack()) => !!(track && track.youtube);

    const waitYtApi = () =>
      new Promise((resolve) => {
        if (window.YT && window.YT.Player) {
          resolve();
          return;
        }
        const prev = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
          if (typeof prev === 'function') prev();
          resolve();
        };
        const poll = window.setInterval(() => {
          if (window.YT && window.YT.Player) {
            window.clearInterval(poll);
            resolve();
          }
        }, 50);
      });

    const getTime = () => {
      if (isYoutube()) {
        if (!ytReady || !ytPlayer || typeof ytPlayer.getCurrentTime !== 'function') return 0;
        try {
          return ytPlayer.getCurrentTime() || 0;
        } catch {
          return 0;
        }
      }
      return audio.currentTime || 0;
    };

    const setTime = (t) => {
      if (isYoutube()) {
        if (ytReady && ytPlayer && typeof ytPlayer.seekTo === 'function') {
          try {
            ytPlayer.seekTo(t, true);
          } catch {
            /* player not ready */
          }
        }
        return;
      }
      audio.currentTime = t;
    };

    const persist = () => {
      const track = currentTrack();
      if (!track) return;
      stored.trackId = track.id;
      stored.volume = clamp(Number(volume.value) || 0, 0, 1);
      stored.loopMode = loopMode;
      delete stored.loopEnabled;
      if (duration > 0) {
        stored.excerpts[track.id] = { a: loopStart, b: loopEnd };
      }
      saveStore(stored);
    };

    const applyVolume = () => {
      const level = clamp(Number(volume.value) || 0, 0, 1);
      audio.volume = level;
      if (ytPlayer && typeof ytPlayer.setVolume === 'function') {
        ytPlayer.setVolume(Math.round(level * 100));
      }
      volume.value = String(level);
      volume.setAttribute('aria-valuenow', String(level));
      persist();
    };

    const syncToggle = () => {
      const on = !mediaPaused;
      toggle.setAttribute('aria-pressed', on ? 'true' : 'false');
      toggle.setAttribute('aria-label', on ? 'Pause' : 'Lecture');
      toggle.textContent = on ? '⏸' : '▶';
    };

    const syncLoopBtn = () => {
      const ui = LOOP_UI[loopMode];
      loopBtn.dataset.loopMode = loopMode;
      loopBtn.setAttribute('aria-pressed', ui.pressed);
      loopBtn.setAttribute('aria-label', ui.label);
      loopBtn.title = ui.title;
      loopBtn.textContent = ui.text;
    };

    const stopYtPoll = () => {
      if (ytPoll) {
        window.clearInterval(ytPoll);
        ytPoll = 0;
      }
    };

    const startYtPoll = () => {
      stopYtPoll();
      ytPoll = window.setInterval(() => {
        if (!isYoutube()) return;
        tickMedia();
      }, 250);
    };

    const pauseMedia = () => {
      playWhenReady = false;
      if (isYoutube()) {
        if (ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
          try {
            ytPlayer.pauseVideo();
          } catch {
            /* ignore */
          }
        }
      } else {
        audio.pause();
      }
      mediaPaused = true;
      syncToggle();
    };

    const play = () => {
      if (duration > 0 && getTime() >= loopEnd - 0.02) setTime(loopStart);
      if (isYoutube()) {
        if (!ytReady || !ytPlayer || typeof ytPlayer.playVideo !== 'function') {
          playWhenReady = true;
          return;
        }
        playWhenReady = false;
        try {
          ytPlayer.playVideo();
          mediaPaused = false;
          syncToggle();
        } catch {
          playWhenReady = true;
        }
        return;
      }
      playWhenReady = false;
      const start = audio.play();
      if (start && typeof start.then === 'function') {
        start
          .then(() => {
            mediaPaused = false;
            syncToggle();
          })
          .catch(() => {
            mediaPaused = true;
            syncToggle();
          });
      } else {
        mediaPaused = false;
        syncToggle();
      }
    };

    const onExcerptEnd = () => {
      if (loopMode === 'one') {
        setTime(loopStart);
        if (mediaPaused) play();
        return;
      }
      if (loopMode === 'all') {
        if (TRACKS.length <= 1) {
          setTime(loopStart);
          if (mediaPaused) play();
          return;
        }
        if (advancingPlaylist) return;
        advancingPlaylist = true;
        pauseMedia();
        const next = (trackIndex + 1) % TRACKS.length;
        loadTrack(next, { autoplay: true });
        return;
      }
      pauseMedia();
      setTime(loopEnd);
    };

    const syncTimeline = () => {
      const safeDuration = duration > 0 ? duration : 1;
      const now = getTime();
      const startPct = (loopStart / safeDuration) * 100;
      const endPct = (loopEnd / safeDuration) * 100;
      const nowPct = (clamp(now, 0, safeDuration) / safeDuration) * 100;

      rangeEl.style.left = `${startPct}%`;
      rangeEl.style.width = `${Math.max(0, endPct - startPct)}%`;
      progressEl.style.left = `${startPct}%`;
      progressEl.style.width = `${Math.max(0, Math.min(nowPct, endPct) - startPct)}%`;
      handleA.style.left = `${startPct}%`;
      handleB.style.left = `${endPct}%`;
      playhead.style.left = `${nowPct}%`;

      timeline.setAttribute('aria-valuemax', String(Math.round(safeDuration)));
      timeline.setAttribute('aria-valuenow', String(Math.round(now)));

      if (timeCurrent) timeCurrent.textContent = formatTime(now);
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
      const now = getTime();
      if (now < loopStart || now > loopEnd) setTime(loopStart);
      syncTimeline();
      if (persistBounds) persist();
    };

    const resetExcerpt = () => {
      setLoopBounds(0, duration || 0);
    };

    const applyPendingOrFull = () => {
      if (pendingExcerpt && duration > 0) {
        setLoopBounds(pendingExcerpt.a, pendingExcerpt.b);
        pendingExcerpt = null;
      } else {
        setLoopBounds(0, duration);
      }
      syncTimeline();
    };

    const tickMedia = () => {
      if (!(duration > 0)) {
        syncTimeline();
        return;
      }
      const now = getTime();
      if (now < loopStart) setTime(loopStart);
      if (now >= loopEnd - 0.25) {
        if (!(loopMode === 'off' && mediaPaused)) onExcerptEnd();
      }
      syncTimeline();
    };

    const syncTrackUi = () => {
      const track = currentTrack();
      trackLabel.textContent = track ? track.label : '—';
      trackMeta.textContent = TRACKS.length ? `${trackIndex + 1}/${TRACKS.length}` : '0/0';
    };

    const markYtReady = (player) => {
      ytReady = true;
      applyVolume();
      try {
        const d = player.getDuration?.() || 0;
        if (Number.isFinite(d) && d > 0) duration = d;
      } catch {
        /* ignore */
      }
      applyPendingOrFull();
      advancingPlaylist = false;
      startYtPoll();
      if (playWhenReady) play();
    };

    const ensureYtPlayer = async (videoId) => {
      await waitYtApi();
      if (!(ytHost instanceof HTMLElement)) throw new Error('yt host missing');

      if (ytPlayer && typeof ytPlayer.cueVideoById === 'function') {
        ytReady = false;
        return new Promise((resolve) => {
          try {
            ytPlayer.cueVideoById({ videoId, startSeconds: 0 });
          } catch {
            resolve();
            return;
          }
          window.setTimeout(() => {
            markYtReady(ytPlayer);
            resolve();
          }, 500);
        });
      }

      ytReady = false;
      return new Promise((resolve, reject) => {
        try {
          ytPlayer = new window.YT.Player(ytHost, {
            width: '480',
            height: '270',
            videoId,
            host: 'https://www.youtube.com',
            playerVars: {
              autoplay: 0,
              controls: 0,
              disablekb: 1,
              fs: 0,
              modestbranding: 1,
              playsinline: 1,
              rel: 0,
              enablejsapi: 1
            },
            events: {
              onReady: (event) => {
                markYtReady(event.target);
                resolve();
              },
              onError: () => {
                ytReady = false;
                mediaPaused = true;
                syncToggle();
                resolve();
              },
              onStateChange: (event) => {
                const YT = window.YT;
                if (!YT || !YT.PlayerState) return;
                if (event.data === YT.PlayerState.PLAYING) {
                  mediaPaused = false;
                  try {
                    const d = event.target.getDuration?.() || duration;
                    if (d > 0) duration = d;
                  } catch {
                    /* ignore */
                  }
                  syncToggle();
                } else if (
                  event.data === YT.PlayerState.PAUSED ||
                  event.data === YT.PlayerState.CUED
                ) {
                  mediaPaused = true;
                  syncToggle();
                } else if (event.data === YT.PlayerState.ENDED) {
                  mediaPaused = true;
                  onExcerptEnd();
                }
              }
            }
          });
        } catch (err) {
          reject(err);
        }
      });
    };

    const stepTrack = (delta) => {
      if (TRACKS.length <= 1) return;
      const next = (trackIndex + delta + TRACKS.length) % TRACKS.length;
      loadTrack(next, { autoplay: !mediaPaused });
    };

    const loadTrack = (index, { autoplay = false } = {}) => {
      const next = TRACKS[index];
      if (!next) {
        advancingPlaylist = false;
        return;
      }
      const wasPlaying = !mediaPaused || autoplay;
      trackIndex = index;
      syncTrackUi();
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

      if (next.youtube) {
        audio.pause();
        audio.removeAttribute('src');
        audio.load();
        stopYtPoll();
        playWhenReady = !!wasPlaying;
        const token = ++ytLoadToken;
        ensureYtPlayer(next.youtube)
          .then(() => {
            if (token !== ytLoadToken) return;
            if (wasPlaying) play();
            else {
              playWhenReady = false;
              advancingPlaylist = false;
              mediaPaused = true;
              syncToggle();
            }
          })
          .catch(() => {
            playWhenReady = false;
            advancingPlaylist = false;
            mediaPaused = true;
            syncToggle();
          });
        return;
      }

      stopYtPoll();
      if (ytPlayer && typeof ytPlayer.pauseVideo === 'function') ytPlayer.pauseVideo();
      audio.src = next.src;
      audio.load();
      if (wasPlaying) {
        const resume = () => {
          audio.removeEventListener('loadedmetadata', resume);
          advancingPlaylist = false;
          play();
        };
        audio.addEventListener('loadedmetadata', resume);
      } else {
        advancingPlaylist = false;
        mediaPaused = true;
        syncToggle();
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
        setTime(clamp(t, loopStart, loopEnd));
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
    if (stored.loopMode === 'off' || stored.loopMode === 'one' || stored.loopMode === 'all') {
      loopMode = stored.loopMode;
    } else if (typeof stored.loopEnabled === 'boolean') {
      loopMode = stored.loopEnabled ? 'one' : 'off';
    }
    const initialTrack = TRACKS.findIndex((t) => t.id === stored.trackId);
    trackIndex = initialTrack >= 0 ? initialTrack : 0;

    applyVolume();
    syncLoopBtn();
    volume.addEventListener('input', applyVolume);

    toggle.addEventListener('click', () => {
      if (mediaPaused) play();
      else pauseMedia();
    });

    loopBtn.addEventListener('click', () => {
      const i = LOOP_ORDER.indexOf(loopMode);
      loopMode = LOOP_ORDER[(i + 1) % LOOP_ORDER.length];
      syncLoopBtn();
      persist();
    });

    resetBtn.addEventListener('click', () => {
      resetExcerpt();
    });

    prevBtn.addEventListener('click', () => stepTrack(-1));
    nextBtn.addEventListener('click', () => stepTrack(1));

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
        setTime(clamp(t, loopStart, loopEnd));
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
        setTime(clamp(getTime() - step, loopStart, loopEnd));
        syncTimeline();
        event.preventDefault();
      } else if (event.key === 'ArrowRight') {
        setTime(clamp(getTime() + step, loopStart, loopEnd));
        syncTimeline();
        event.preventDefault();
      }
    });

    audio.addEventListener('loadedmetadata', () => {
      if (isYoutube()) return;
      duration = Number.isFinite(audio.duration) ? audio.duration : 0;
      applyPendingOrFull();
    });

    audio.addEventListener('timeupdate', () => {
      if (isYoutube()) return;
      tickMedia();
    });

    audio.addEventListener('ended', () => {
      if (isYoutube()) return;
      onExcerptEnd();
      syncTimeline();
    });

    audio.addEventListener('play', () => {
      if (isYoutube()) return;
      mediaPaused = false;
      syncToggle();
    });
    audio.addEventListener('pause', () => {
      if (isYoutube()) return;
      mediaPaused = true;
      syncToggle();
    });

    const ensureAnalyser = () => {
      if (analyser || reducedMotion.matches || isYoutube()) return;
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
        if (mediaPaused) play();
        else pauseMedia();
      } else if (event.key === ',' || event.key === '<') {
        event.preventDefault();
        stepTrack(-1);
      } else if (event.key === '.' || event.key === '>') {
        event.preventDefault();
        stepTrack(1);
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
      playWhenReady = true;
      play();
      wakePond();
    };
    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });

    // YouTube: wait for gesture (autoplay policies). Load cued, play on first interaction.
    loadTrack(trackIndex, { autoplay: false });
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
