import React, { useEffect, useRef } from 'react';
import './CameraHero.css';

const FRAME_META = [
  'f/1.8 · 1/250 · ISO 100',
  'f/2.8 · 1/500 · ISO 200',
  'f/4 · 1/125 · ISO 400',
  'f/1.4 · 1/1000 · ISO 100',
  'f/5.6 · 1/60 · ISO 800',
  'f/2 · 1/320 · ISO 200',
];

// Offers / content that slide along the film roll (edit freely)
const ROLL_PHRASE = 'FLAT 20% OFF  \u2726  WEDDING FILMS  \u2726  PRE-WEDDING  \u2726  CINEMATIC REELS  \u2726  ';
const ROLL_TEXT = ROLL_PHRASE + ROLL_PHRASE + ROLL_PHRASE;

const CameraHero = () => {
  const sceneRef = useRef(null);
  const camRef = useRef(null);
  const insideRef = useRef(null);
  const clRef = useRef(null);
  const crRef = useRef(null);
  const frameRef = useRef(null);
  const shadeRef = useRef(null);
  const capRef = useRef(null);
  const ringRef = useRef(null);
  const bgTextRef = useRef(null);
  const rollRef = useRef(null);
  const rollTextRef = useRef(null);
  const stripRef = useRef(null);
  const reelRef = useRef(null);

  const initialRotation = 7;

  useEffect(() => {
    const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const ease = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    // cached values (measured once, NOT every frame)
    let vw = 0, vh = 0, W = 0, lx = 0, ly = 0, sMax = 1, fs = 1;
    let sceneTop = 0, sceneH = 1, stripTop = 0, stripH = 1, reelW = 0;
    let mobile = false;
    let blades = [];

    // smoothing state
    let targetY = window.scrollY;
    let currentY = targetY;
    let raf = 0;

    const measure = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
      mobile = vw < 760;

      if (!camRef.current || !frameRef.current || !sceneRef.current) return;

      W = mobile ? Math.min(vw * 0.85, 400) : Math.min(vw * 0.45, 600);
      camRef.current.style.width = W + 'px';

      lx = (W * 330) / 560;
      ly = (W * 238) / 560;
      camRef.current.style.transformOrigin = `${lx}px ${ly}px`;

      sMax = (Math.hypot(vw, vh) / 2 / ((W * 112) / 560)) * 1.1;
      const fw = frameRef.current.offsetWidth;
      const fh = (fw * 2) / 3;
      fs = Math.max(vw / fw, vh / fh) * 1.04;

      const sy = window.scrollY;
      const sr = sceneRef.current.getBoundingClientRect();
      sceneTop = sr.top + sy;
      sceneH = sr.height;

      if (stripRef.current && reelRef.current) {
        const tr = stripRef.current.getBoundingClientRect();
        stripTop = tr.top + sy;
        stripH = tr.height;
        reelW = reelRef.current.scrollWidth;
      }

      blades = [...sceneRef.current.querySelectorAll('.blade')];
    };

    const render = (y) => {
      if (!camRef.current) return;

      const p = clamp((y - sceneTop) / (sceneH - vh));

      // background text + mobile film roll fade out
      if (bgTextRef.current) {
        bgTextRef.current.style.opacity = 1 - clamp(p / 0.2);
      }
      if (rollRef.current && p < 0.25) {
        rollRef.current.style.transform =
          `translate3d(${-p * 50}px, ${-p * 40}px, 0)`;
        // offers / content slide along the film roll
        if (rollTextRef.current) {
          rollTextRef.current.setAttribute('startOffset', String(-p * 1800));
        }
      }

      // camera rotate + zoom
      const rotation = initialRotation + ease(clamp(p / 0.3)) * 15;
      const zoom = ease(clamp((p - 0.1) / 0.35));
      const scale = 1 + (sMax - 1) * zoom;

      // mobile: camera starts lower, glides to center while zooming
      const camY = mobile ? vh * 0.64 + (vh * 0.5 - vh * 0.64) * zoom : vh * 0.5;

      camRef.current.style.transform =
        `translate3d(${vw * 0.5 - lx}px, ${camY - ly}px, 0) rotate(${rotation}deg) scale(${scale})`;

      const camVisible = p <= 0.5;
      camRef.current.style.visibility = camVisible ? 'visible' : 'hidden';

      // only touch the SVG while the camera is visible
      if (camVisible) {
        if (ringRef.current) {
          ringRef.current.setAttribute('transform', `rotate(${-480 * p} 330 238)`);
        }
        const k = ease(clamp((p - 0.2) / 0.25)) * 62;
        const bt = `translate(0,${-k})`;
        for (let i = 0; i < blades.length; i++) blades[i].setAttribute('transform', bt);
      }

      if (insideRef.current) {
        insideRef.current.style.opacity = clamp((p - 0.5) / 0.1);
      }

      // shutter curtains
      const c = ease(clamp((p - 0.6) / 0.1));
      if (clRef.current) clRef.current.style.transform = `translate3d(${-c * 101}%,0,0)`;
      if (crRef.current) crRef.current.style.transform = `translate3d(${c * 101}%,0,0)`;

      // cheap "exposure": fade a dark overlay instead of animating blur/brightness
      const d = ease(clamp((p - 0.65) / 0.15));
      if (shadeRef.current) shadeRef.current.style.opacity = 0.9 * (1 - d);

      // frame zoom
      const g = ease(clamp((p - 0.8) / 0.15));
      if (frameRef.current) {
        frameRef.current.style.transform =
          `translate3d(-50%,-50%,0) scale(${1 + (fs - 1) * g})`;
      }

      // caption
      const t = clamp((p - 0.9) / 0.06);
      if (capRef.current) {
        capRef.current.style.opacity = t;
        capRef.current.style.transform = `translate3d(0,${(1 - t) * 30}px,0)`;
      }

      // film strip horizontal scroll
      if (reelRef.current) {
        const q = clamp((y - stripTop) / (stripH - vh));
        reelRef.current.style.transform =
          `translate3d(${-q * Math.max(0, reelW - vw)}px,0,0)`;
      }
    };

    // smooth loop: eases toward real scroll position, stops itself when settled
    const loop = () => {
      const diff = targetY - currentY;
      if (Math.abs(diff) < 0.4) {
        currentY = targetY;
        raf = 0;
      } else {
        currentY += diff * 0.16;
        raf = requestAnimationFrame(loop);
      }
      render(currentY);
    };

    const onScroll = () => {
      targetY = window.scrollY;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    let lastW = window.innerWidth;
    const onResize = () => {
      // ignore mobile address-bar show/hide (small height-only changes)
      if (window.innerWidth === lastW && Math.abs(window.innerHeight - vh) < 120) return;
      lastW = window.innerWidth;
      measure();
      targetY = currentY = window.scrollY;
      render(currentY);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('load', onResize);

    measure();
    render(currentY);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <section className="scene" id="scene" ref={sceneRef}>
        <div className="pin">
          {/* BACKGROUND TEXT (FUS - CAMERA - ION) + mobile film roll */}
          <div className="bg-text" ref={bgTextRef}>
            <div className="roll" ref={rollRef}>
              <svg viewBox="0 0 480 150" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <path
                    id="wave"
                    d="M-40 110 C 40 130, 90 70, 170 70 S 300 110, 380 60 S 470 20, 520 30"
                  />
                </defs>
                {/* film body */}
                <use href="#wave" fill="none" stroke="#4a3a3f" strokeWidth="76" />
                {/* sprocket holes */}
                <use href="#wave" fill="none" stroke="#f5f2ed" strokeWidth="68" strokeDasharray="8 11" />
                <use href="#wave" fill="none" stroke="#4a3a3f" strokeWidth="50" />
                {/* photo area */}
                <use href="#wave" fill="none" stroke="#8b7378" strokeWidth="44" />
                {/* offers / content moving inside the roll */}
                <text
                  fontFamily="Manrope, Arial, sans-serif"
                  fontWeight="700"
                  fontSize="15"
                  letterSpacing="1.5"
                  fill="#fff"
                  dominantBaseline="central"
                >
                  <textPath href="#wave" ref={rollTextRef} startOffset="0">
                    {ROLL_TEXT}
                  </textPath>
                </text>
              </svg>
            </div>

            <div className="text-row">
              <span className="text-fusion-left">FUS</span>
              <span className="text-fusion-right">ION</span>
            </div>
          </div>

          <div className="text-production-wrapper">
            <h2 className="text-production">PRODUCTION</h2>
          </div>

          <div className="cam" id="cam" ref={camRef}>
            <svg viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#fdfcf8" /><stop offset=".2" stopColor="#d2cec5" /><stop offset=".48" stopColor="#8c8880" />
                  <stop offset=".58" stopColor="#dcd8cf" /><stop offset=".85" stopColor="#a29d94" /><stop offset="1" stopColor="#6d6962" />
                </linearGradient>
                <linearGradient id="chromeH" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#6c6862" /><stop offset=".25" stopColor="#ece9e2" /><stop offset=".5" stopColor="#8b877f" />
                  <stop offset=".75" stopColor="#f4f2ec" /><stop offset="1" stopColor="#7a766f" />
                </linearGradient>
                <pattern id="leather" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#161513" /><circle cx="3" cy="3" r=".8" fill="#2a2825" /></pattern>
                <pattern id="grooves" width="7" height="10" patternUnits="userSpaceOnUse"><rect width="7" height="10" fill="#1b1a18" /><rect width="2.4" height="10" fill="#070706" /><rect x="3" width="1" height="10" fill="#34322e" /></pattern>
                <pattern id="knurl" width="5" height="10" patternUnits="userSpaceOnUse"><rect width="5" height="10" fill="#21201d" /><rect width="2" height="10" fill="#57544e" /></pattern>
                <radialGradient id="glass" cx=".38" cy=".34" r=".8"><stop offset="0" stopColor="#9cc2cd" /><stop offset=".4" stopColor="#26404c" /><stop offset="1" stopColor="#05080a" /></radialGradient>
                <radialGradient id="coat" cx=".5" cy=".5" r=".5"><stop offset=".55" stopColor="#000" stopOpacity="0" /><stop offset=".8" stopColor="#a55cff" stopOpacity=".38" /><stop offset=".95" stopColor="#3dffa8" stopOpacity=".3" /></radialGradient>
                <radialGradient id="win" cx=".35" cy=".3" r=".9"><stop offset="0" stopColor="#4a6b78" /><stop offset="1" stopColor="#07090b" /></radialGradient>
                <filter id="soft"><feGaussianBlur stdDeviation="12" /></filter>
                <clipPath id="irisClip"><circle cx="330" cy="238" r="58" /></clipPath>
                <path id="tp" d="M330 238 m-86 0 a86 86 0 1 1 172 0 a86 86 0 1 1 -172 0" />
              </defs>
              <ellipse cx="280" cy="392" rx="250" ry="9" fill="#000" opacity=".35" filter="url(#soft)" />
              <circle cx="12" cy="122" r="8" fill="url(#chrome)" /><circle cx="548" cy="122" r="8" fill="url(#chrome)" />
              <rect x="20" y="92" width="520" height="262" rx="20" fill="url(#leather)" />
              <rect x="42" y="136" width="150" height="180" rx="12" fill="url(#grooves)" stroke="#000" strokeOpacity=".6" />
              <rect x="64" y="214" width="9" height="40" rx="4" fill="url(#chrome)" />
              <circle cx="58" cy="184" r="8" fill="url(#chromeH)" stroke="#555" />
              <circle cx="520" cy="206" r="7" fill="url(#chromeH)" stroke="#555" />
              <rect x="20" y="326" width="520" height="30" rx="12" fill="url(#chrome)" />
              <rect x="42" y="30" width="64" height="38" rx="5" fill="url(#knurl)" /><rect x="38" y="24" width="72" height="9" rx="4" fill="url(#chromeH)" />
              <rect x="438" y="32" width="86" height="36" rx="6" fill="url(#knurl)" /><rect x="434" y="26" width="94" height="9" rx="4" fill="url(#chromeH)" />
              <path d="M176 70 L196 28 H392 L412 70Z" fill="url(#chrome)" />
              <rect x="14" y="64" width="532" height="70" rx="14" fill="url(#chrome)" />
              <path d="M30 76H530" stroke="#fff" strokeOpacity=".6" strokeWidth="1.5" />
              <circle cx="400" cy="58" r="12" fill="url(#chromeH)" stroke="#6d6962" /><circle cx="400" cy="58" r="6" fill="#2a2926" />
              <circle cx="228" cy="106" r="13" fill="url(#chromeH)" /><circle cx="228" cy="106" r="9" fill="url(#win)" />
              <rect x="258" y="96" width="66" height="22" rx="5" fill="#0d1113" stroke="#bdb9af" strokeWidth="2" />
              <circle cx="330" cy="238" r="112" fill="url(#chrome)" />
              <circle cx="330" cy="238" r="106" fill="#0e0e0d" />
              <g id="ring" ref={ringRef}>
                <circle cx="330" cy="238" r="100" fill="#1a1917" />
                <circle cx="330" cy="238" r="95" fill="none" stroke="#57544e" strokeWidth="9" strokeDasharray="3 6" />
                <text fontFamily="Manrope,sans-serif" fontWeight="600" fontSize="11" fill="#ece7da" dominantBaseline="middle">
                  <textPath href="#tp" textLength="530" lengthAdjust="spacing">50mm 1:2 &#183; 0.7 &#183; 1 &#183; 1.5 &#183; 2 &#183; 3 &#183; 5 &#183; &#8734; &#183; 50mm 1:2 &#183; 0.7 &#183; 1 &#183; 2 &#183; 5 &#183; &#8734; &#183;</textPath>
                </text>
              </g>
              <path d="M323 126h14l-7 12z" fill="#ece7da" />
              <circle cx="330" cy="238" r="70" fill="#0a0a09" stroke="#4a4741" strokeWidth="2" />
              <circle cx="330" cy="238" r="58" fill="url(#glass)" />
              <circle cx="330" cy="238" r="58" fill="url(#coat)" />
              <g clipPath="url(#irisClip)">
                <g transform="rotate(0 330 238)"><path className="blade" d="M298 180L362 180L344 234Z" /></g>
                <g transform="rotate(60 330 238)"><path className="blade" d="M298 180L362 180L344 234Z" /></g>
                <g transform="rotate(120 330 238)"><path className="blade" d="M298 180L362 180L344 234Z" /></g>
                <g transform="rotate(180 330 238)"><path className="blade" d="M298 180L362 180L344 234Z" /></g>
                <g transform="rotate(240 330 238)"><path className="blade" d="M298 180L362 180L344 234Z" /></g>
                <g transform="rotate(300 330 238)"><path className="blade" d="M298 180L362 180L344 234Z" /></g>
              </g>
              <ellipse cx="308" cy="214" rx="16" ry="9" fill="#fff" opacity=".28" transform="rotate(-35 308 214)" />
            </svg>
          </div>

          <div className="inside" id="inside" ref={insideRef}>
            <div className="frame" id="frame" ref={frameRef}>
              <i className="base"></i><i className="sp t"></i><i className="sp b"></i>
              <img
                src="https://picsum.photos/seed/innerlight/1800/1200"
                alt="Exposed film frame"
                decoding="async"
              />
              <div className="shade" ref={shadeRef}></div>
              <span className="edge">&#9656; 24A &nbsp;&nbsp; &#9656; 25</span>
            </div>
            <div className="curtain l" id="cl" ref={clRef}></div>
            <div className="curtain r" id="cr" ref={crRef}></div>
            <div className="cap" id="cap" ref={capRef}>
              <h2>Exposed.</h2>
              <p>50mm f/2 &middot; 1/125 &middot; Portra 400</p>
            </div>
          </div>
        </div>
      </section>

      {/* contact sheet (Film Strip) */}
      <section className="strip" id="film" ref={stripRef}>
        <div className="strip-pin">
          <header>
            <h2>Six frames from this month</h2>
            <p>Keep scrolling. The film moves, you don't.</p>
          </header>
          <div className="film" id="reel" ref={reelRef}>
            {FRAME_META.map((meta, i) => (
              <figure key={i}>
                <img
                  src={`https://picsum.photos/seed/gg${i + 1}/900/600`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <figcaption><b>0{i + 1}</b> {meta}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CameraHero;