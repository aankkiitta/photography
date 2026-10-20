import { useEffect, useRef } from 'react';
import './FusionProduction.css';

/* ====== APNI IMAGES YAHAN BADLO ====== */
const IMAGES = [1, 2, 3, 4, 5, 6].map(
  (i) => `https://picsum.photos/seed/roll${i}/1500/1000`
);
/* ====================================== */

const HDIRS = [-1, 1, -1];

const VCOLS = [
  { cls: 'side s-l', dir: +1, rep: 2, shift: 2 },
  { cls: 'mid', dir: -1, rep: 1, shift: 0 },
  { cls: 'side s-r', dir: +1, rep: 2, shift: 4 },
];

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const rotated = (n) => IMAGES.map((_, i) => IMAGES[(i + n) % IMAGES.length]);

export default function FusionProduction() {
  const sceneRef = useRef(null);
  const pinRef = useRef(null);
  const camRef = useRef(null);
  const ringRef = useRef(null);
  const wLRef = useRef(null);
  const wRRef = useRef(null);
  const prodRef = useRef(null);
  const stageRef = useRef(null);
  const hwrapRef = useRef(null);
  const vfadeRef = useRef(null);
  const fstageRef = useRef(null);
  const frameRef = useRef(null);
  const frameImgRef = useRef(null);
  const capRef = useRef(null);
  const whereRef = useRef(null);

  /* Build strips once */
  const rowsRef = useRef([]);
  const colsRef = useRef([]);

  useEffect(() => {
    const scene = sceneRef.current;
    const pin = pinRef.current;
    const cam = camRef.current;
    const ring = ringRef.current;
    const wL = wLRef.current;
    const wR = wRRef.current;
    const prod = prodRef.current;
    const stage = stageRef.current;
    const hwrap = hwrapRef.current;
    const vfade = vfadeRef.current;
    const fstage = fstageRef.current;
    const frameEl = frameRef.current;
    const frameImg = frameImgRef.current;
    const cap = capRef.current;
    const where = whereRef.current;

    const LY = 0.595;

    /* --- Build horizontal strips --- */
    hwrap.innerHTML = '';
    rowsRef.current = HDIRS.map((dir, r) => {
      const strip = document.createElement('div');
      strip.className = 'hstrip';
      const o = rotated(r * 2);
      o.concat(o).forEach((src) => {
        const f = document.createElement('figure');
        const img = document.createElement('img');
        img.alt = '';
        img.src = src;
        f.appendChild(img);
        strip.appendChild(f);
      });
      hwrap.appendChild(strip);
      return { strip, dir };
    });

    /* --- Build vertical strips --- */
    vfade.innerHTML = '';
    colsRef.current = VCOLS.map((c) => {
      const strip = document.createElement('div');
      strip.className = 'vstrip ' + c.cls;
      let o = rotated(c.shift);
      if (c.cls === 'mid') o = IMAGES.slice();
      for (let k = 0; k < c.rep; k++) {
        o.forEach((src) => {
          const f = document.createElement('figure');
          const img = document.createElement('img');
          img.alt = '';
          img.src = src;
          f.appendChild(img);
          strip.appendChild(f);
        });
      }
      vfade.appendChild(strip);
      return { strip, dir: c.dir };
    });

    frameImg.src = IMAGES[IMAGES.length - 1];

    const prog = () => {
      const r = scene.getBoundingClientRect();
      return clamp(-r.top / (r.height - pin.clientHeight));
    };

    function frame(p) {
      const vw = pin.clientWidth;
      const vh = pin.clientHeight;

      /* 1. Camera */
      const W = cam.offsetWidth;
      const rot = -8 + 12 * ease(clamp(p / 0.25));
      const z = ease(clamp((p - 0.03) / 0.27));
      const sMax = (Math.hypot(vw, vh) / 2 / ((56 / 560) * W)) * 1.1;
      cam.style.transform = `translate(-50%,-${LY * 100}%) rotate(${rot}deg) scale(${Math.pow(sMax, z)})`;
      ring.setAttribute('transform', `rotate(${-360 * p} 280 238)`);

      const tf = 1 - clamp((p - 0.08) / 0.14);
      wL.style.opacity = wR.style.opacity = tf;
      wL.style.transform = `translateX(${-z * 25}vw)`;
      wR.style.transform = `translateX(${z * 25}vw)`;
      prod.style.opacity = tf;

      /* 2. Stage fade in */
      stage.style.opacity = clamp((p - 0.28) / 0.05);

      /* 3. Horizontal rolls */
      const q = clamp((p - 0.34) / 0.22);
      rowsRef.current.forEach(({ strip, dir }) => {
        const travel = strip.scrollWidth - vw * 0.8;
        const x = dir < 0 ? vw * 0.2 - q * travel : vw * 0.2 - travel + q * travel;
        strip.style.transform = `translateX(${x}px)`;
      });

      /* 4. Horizontal -> vertical rotate */
      const m = ease(clamp((p - 0.56) / 0.07));
      hwrap.style.transform = `translateY(-50%) rotate(${90 * m}deg) scale(${1 - 0.3 * m})`;
      hwrap.style.opacity = 1 - clamp((m - 0.35) / 0.4);

      vfade.style.opacity =
        clamp((m - 0.55) / 0.45) * (1 - clamp((p - 0.8) / 0.04));
      vfade.style.transform = `rotate(${-90 * (1 - m)}deg) scale(${0.7 + 0.3 * m})`;

      /* 5. Vertical rolls */
      const v = ease(clamp((p - 0.62) / 0.16));
      colsRef.current.forEach(({ strip, dir }) => {
        const figs = strip.children;
        const a = figs[0];
        const b = figs[figs.length - 1];
        if (!strip.offsetHeight) return;
        const c1 = a.offsetTop + a.offsetHeight / 2;
        const c2 = b.offsetTop + b.offsetHeight / 2;
        const c = dir < 0 ? c1 + (c2 - c1) * v : c2 + (c1 - c2) * v;
        strip.style.transform = `translate(-50%,${vh / 2 - c}px)`;
      });

      /* 6. Last frame full screen */
      fstage.style.opacity = clamp((p - 0.78) / 0.05);
      const fw = frameEl.offsetWidth;
      const fh = (fw * 2) / 3;
      const fs = Math.max(vw / fw, vh / fh) * 1.04;
      const g = ease(clamp((p - 0.84) / 0.12));
      frameEl.style.transform = `translate(-50%,-50%) scale(${1 + (fs - 1) * g})`;

      const t = clamp((p - 0.95) / 0.05);
      cap.style.opacity = t;
      cap.style.transform = `translateY(${(1 - t) * 30}px)`;

      where.textContent =
        p < 0.3 ? 'Rotate' : p < 0.56 ? 'Roll' : p < 0.8 ? 'Vertical' : 'Exposed';
    }

    /* ---- smooth, fully reversible scroll-linked progress ---- */
    let cur = prog();
    let raf = 0;

    function loop() {
      const target = prog();
      cur += (target - cur) * 0.16;
      if (Math.abs(target - cur) < 0.0004) cur = target;
      frame(cur);
      raf = cur !== target ? requestAnimationFrame(loop) : 0;
    }
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const snap = () => {
      cur = prog();
      frame(cur);
    };

    addEventListener('scroll', kick, { passive: true });
    addEventListener('resize', snap);
    addEventListener('load', snap);
    snap();

    return () => {
      removeEventListener('scroll', kick);
      removeEventListener('resize', snap);
      removeEventListener('load', snap);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <section className="scene" id="scene" ref={sceneRef}>
        <div className="pin" ref={pinRef}>
          {/* FUS [camera] ION */}
          <div className="bg-text">
            <span ref={wLRef}>FUS</span>
            <span ref={wRRef}>ION</span>
          </div>
     <div className="production" ref={prodRef}>
  <h2 className="desk-only">PRODUCTION</h2>
  <div className="mob-only">
    <span className="mp-fusion">FUSION</span>
    <span className="mp-story">STORY</span>
    <span className="mp-production">PRODUCTION</span>
  </div>
</div>

          {/* CAMERA */}
          <div className="cam" ref={camRef}>
            <svg viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#fdfcf8" />
                  <stop offset=".25" stopColor="#d2cec5" />
                  <stop offset=".5" stopColor="#8c8880" />
                  <stop offset=".6" stopColor="#dcd8cf" />
                  <stop offset="1" stopColor="#6d6962" />
                </linearGradient>
                <linearGradient id="chromeH" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#6c6862" />
                  <stop offset=".3" stopColor="#ece9e2" />
                  <stop offset=".55" stopColor="#8b877f" />
                  <stop offset=".8" stopColor="#f4f2ec" />
                  <stop offset="1" stopColor="#7a766f" />
                </linearGradient>
                <pattern id="leather" width="6" height="6" patternUnits="userSpaceOnUse">
                  <rect width="6" height="6" fill="#1a1917" />
                  <circle cx="3" cy="3" r=".9" fill="#34312d" />
                </pattern>
                <pattern id="knurl" width="5" height="10" patternUnits="userSpaceOnUse">
                  <rect width="5" height="10" fill="#232220" />
                  <rect width="2" height="10" fill="#6a665f" />
                </pattern>
                <radialGradient id="glass" cx=".38" cy=".34" r=".8">
                  <stop offset="0" stopColor="#8fb4c0" />
                  <stop offset=".4" stopColor="#22394a" />
                  <stop offset="1" stopColor="#04070a" />
                </radialGradient>
                <radialGradient id="coat" cx=".5" cy=".5" r=".5">
                  <stop offset=".55" stopColor="#000" stopOpacity="0" />
                  <stop offset=".8" stopColor="#a55cff" stopOpacity=".4" />
                  <stop offset=".95" stopColor="#3dffa8" stopOpacity=".3" />
                </radialGradient>
                <path id="tp" d="M280 238 m-86 0 a86 86 0 1 1 172 0 a86 86 0 1 1 -172 0" />
              </defs>

              <circle cx="12" cy="124" r="8" fill="url(#chrome)" />
              <circle cx="548" cy="124" r="8" fill="url(#chrome)" />
              <rect x="22" y="94" width="516" height="264" rx="16" fill="url(#leather)" />
              <rect x="22" y="326" width="516" height="32" rx="12" fill="url(#chrome)" />
              <rect x="190" y="356" width="26" height="14" rx="3" fill="#2a2926" />
              <rect x="344" y="356" width="26" height="14" rx="3" fill="#2a2926" />
              <rect x="52" y="36" width="66" height="30" rx="4" fill="url(#knurl)" />
              <rect x="48" y="28" width="74" height="10" rx="4" fill="url(#chromeH)" />
              <rect x="438" y="38" width="84" height="28" rx="5" fill="url(#knurl)" />
              <rect x="434" y="30" width="92" height="10" rx="4" fill="url(#chromeH)" />
              <path d="M196 72 L220 26 H340 L364 72Z" fill="url(#chrome)" />
              <rect x="240" y="34" width="80" height="10" rx="3" fill="#b9b5ab" opacity=".7" />
              <rect x="14" y="64" width="532" height="70" rx="12" fill="url(#chrome)" />
              <path d="M30 76H530" stroke="#fff" strokeOpacity=".7" strokeWidth="1.5" />
              <circle cx="152" cy="98" r="9" fill="url(#chromeH)" stroke="#6d6962" />
              <circle cx="152" cy="98" r="4" fill="#2a2926" />
              <circle cx="408" cy="98" r="13" fill="url(#chromeH)" stroke="#6d6962" />
              <circle cx="408" cy="98" r="6" fill="#2a2926" />
              <circle cx="58" cy="200" r="8" fill="url(#chromeH)" stroke="#555" />
              <rect x="446" y="188" width="16" height="64" rx="8" fill="#e9e6df" stroke="#444" strokeWidth="2" />
              <rect x="451" y="198" width="6" height="42" rx="3" fill="#b9b5ab" />
              <circle cx="454" cy="268" r="9" fill="url(#chromeH)" stroke="#555" />

              <circle cx="280" cy="238" r="118" fill="url(#chrome)" />
              <circle cx="280" cy="238" r="111" fill="#0e0e0d" />
              <g ref={ringRef}>
                <circle cx="280" cy="238" r="104" fill="#1a1917" />
                <circle cx="280" cy="238" r="95" fill="none" stroke="#57544e" strokeWidth="9" strokeDasharray="3 6" />
                <text fontFamily="Arial,sans-serif" fontWeight="600" fontSize="11" fill="#ece7da" dominantBaseline="middle">
                  <textPath href="#tp" textLength="530" lengthAdjust="spacing">
                    50mm 1:2 · 0.7 · 1 · 1.5 · 2 · 3 · 5 · ∞ · 50mm 1:2 · 0.7 · 1 · 2 · 5 · ∞ ·
                  </textPath>
                </text>
              </g>
              <path d="M273 122h14l-7 12z" fill="#ece7da" />
              <circle cx="280" cy="238" r="72" fill="#0a0a09" stroke="#4a4741" strokeWidth="2" />
              <circle cx="280" cy="238" r="56" fill="url(#glass)" />
              <circle cx="280" cy="238" r="56" fill="url(#coat)" />
              <ellipse cx="258" cy="214" rx="16" ry="9" fill="#fff" opacity=".28" transform="rotate(-35 258 214)" />
            </svg>
          </div>

          {/* FILM ROLL stage */}
          <div className="stage" ref={stageRef}>
            <div className="hwrap" ref={hwrapRef} />
            <div className="vfade" ref={vfadeRef} />
          </div>

          {/* LAST IMAGE: single frame goes full screen */}
          <div className="fstage" ref={fstageRef}>
            <div className="frame" ref={frameRef}>
              <i className="base" />
              <i className="sp t" />
              <i className="sp b" />
              <img ref={frameImgRef} alt="Exposed film frame" />
              <span className="edge">▸ 24A &nbsp;&nbsp; ▸ 25</span>
            </div>
            <div className="cap" ref={capRef}>
              <h2>Exposed.</h2>
              <p>50mm f/2 &middot; 1/125 &middot; Portra 400</p>
            </div>
          </div>

          
        </div>
      </section>

    </>
  );
}








