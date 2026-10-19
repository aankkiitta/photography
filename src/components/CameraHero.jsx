




import React, { useEffect, useRef } from 'react';
import './CameraHero.css';

const CameraHero = () => {
  const sceneRef = useRef(null);
  const camRef = useRef(null);
  const insideRef = useRef(null);
  const clRef = useRef(null);
  const crRef = useRef(null);
  const frameRef = useRef(null);
  const frameImgRef = useRef(null);
  const capRef = useRef(null);
  const ringRef = useRef(null);
  const whereRef = useRef(null);
  const bgTextRef = useRef(null);
  const stripRef = useRef(null);
  const reelRef = useRef(null);
// Initial camera rotation
const initialRotation = 7;
useEffect(() => {
    const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const ease = t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    let vw, vh, W, lx, ly, sMax, fs, mobile;

    const measure = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
      mobile = vw < 760;
      
      if (!camRef.current || !frameRef.current) return;

      // Camera size adjust
      W = mobile ? Math.min(vw * .85, 400) : Math.min(vw * .45, 600);
      camRef.current.style.width = W + 'px';
      
      lx = W * 330 / 560; 
      ly = W * 238 / 560;
      camRef.current.style.transformOrigin = `${lx}px ${ly}px`;
      
      sMax = Math.hypot(vw, vh) / 2 / (W * 112 / 560) * 1.1; 
      const fw = frameRef.current.offsetWidth;
      const fh = fw * 2 / 3;
      fs = Math.max(vw / fw, vh / fh) * 1.04;
    };

    const prog = el => {
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      return clamp(-r.top / (r.height - vh));
    };

    const frame = () => {
      if (!sceneRef.current || !camRef.current) return;

      const p = prog(sceneRef.current);
      const blades = [...document.querySelectorAll('.blade')];

      // Text Fade out
      if (bgTextRef.current) {
        bgTextRef.current.style.opacity = 1 - clamp(p / 0.2); 
      }

      // Camera Rotate & Zoom
      const rotateProgress = ease(clamp(p / 0.3)); 
      const rotation = initialRotation + rotateProgress * 15; 

      const zoomProgress = ease(clamp((p - 0.1) / 0.35)); 

      // Perfect Center Position
      const x = vw * .5; 
      const y = vh * .5; 
      
      camRef.current.style.transform = `
        translate(${x - lx}px, ${y - ly}px) 
        rotate(${rotation}deg) 
        scale(${1 + (sMax - 1) * zoomProgress})
      `;
      
      camRef.current.style.visibility = p > 0.5 ? 'hidden' : 'visible';

      if (ringRef.current) ringRef.current.setAttribute('transform', `rotate(${-480 * p} 330 238)`);
      const k = ease(clamp((p - 0.2) / 0.25)) * 62;
      blades.forEach(b => b.setAttribute('transform', `translate(0,${-k})`));

      if (insideRef.current) insideRef.current.style.opacity = clamp((p - 0.5) / 0.1);

      const c = ease(clamp((p - 0.6) / 0.1));
      if (clRef.current) clRef.current.style.transform = `translateX(${-c * 101}%)`;
      if (crRef.current) crRef.current.style.transform = `translateX(${c * 101}%)`;

      const d = ease(clamp((p - 0.65) / 0.15));
      if (frameImgRef.current) {
        frameImgRef.current.style.filter = `brightness(${.1 + .9 * d}) saturate(${.2 + .8 * d}) blur(${6 * (1 - d)}px)`;
      }
      
      const g = ease(clamp((p - 0.8) / 0.15));
      if (frameRef.current) {
        frameRef.current.style.transform = `translate(-50%,-50%) scale(${1 + (fs - 1) * g})`;
      }

      const t = clamp((p - 0.9) / 0.06);
      if (capRef.current) {
        capRef.current.style.opacity = t;
        capRef.current.style.transform = `translateY(${(1 - t) * 30}px)`;
      }

      if (whereRef.current) {
        whereRef.current.textContent = p < 0.4 ? 'Rotate' : p < 0.55 ? 'Lens' : p < 0.65 ? 'Shutter' : 'Exposed';
      }

      if (stripRef.current && reelRef.current) {
        const q = prog(stripRef.current);
        reelRef.current.style.transform = `translateX(${-q * (reelRef.current.scrollWidth - vw)}px)`;
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) { 
        ticking = true; 
        requestAnimationFrame(() => { frame(); ticking = false; }); 
      }
    };

    const onResize = () => { measure(); frame(); };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    
    measure(); 
    frame();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);
  
  return (
    <>
      <section className="scene" id="scene" ref={sceneRef}>
        <div className="pin">
          
          {/* BACKGROUND TEXT (FUS - CAMERA - ION) */}
          <div className="bg-text" ref={bgTextRef}>
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
                  <stop offset="0" stopColor="#fdfcf8"/><stop offset=".2" stopColor="#d2cec5"/><stop offset=".48" stopColor="#8c8880"/>
                  <stop offset=".58" stopColor="#dcd8cf"/><stop offset=".85" stopColor="#a29d94"/><stop offset="1" stopColor="#6d6962"/>
                </linearGradient>
                <linearGradient id="chromeH" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#6c6862"/><stop offset=".25" stopColor="#ece9e2"/><stop offset=".5" stopColor="#8b877f"/>
                  <stop offset=".75" stopColor="#f4f2ec"/><stop offset="1" stopColor="#7a766f"/>
                </linearGradient>
                <pattern id="leather" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#161513"/><circle cx="3" cy="3" r=".8" fill="#2a2825"/></pattern>
                <pattern id="grooves" width="7" height="10" patternUnits="userSpaceOnUse"><rect width="7" height="10" fill="#1b1a18"/><rect width="2.4" height="10" fill="#070706"/><rect x="3" width="1" height="10" fill="#34322e"/></pattern>
                <pattern id="knurl" width="5" height="10" patternUnits="userSpaceOnUse"><rect width="5" height="10" fill="#21201d"/><rect width="2" height="10" fill="#57544e"/></pattern>
                <radialGradient id="glass" cx=".38" cy=".34" r=".8"><stop offset="0" stopColor="#9cc2cd"/><stop offset=".4" stopColor="#26404c"/><stop offset="1" stopColor="#05080a"/></radialGradient>
                <radialGradient id="coat" cx=".5" cy=".5" r=".5"><stop offset=".55" stopColor="#000" stopOpacity="0"/><stop offset=".8" stopColor="#a55cff" stopOpacity=".38"/><stop offset=".95" stopColor="#3dffa8" stopOpacity=".3"/></radialGradient>
                <radialGradient id="win" cx=".35" cy=".3" r=".9"><stop offset="0" stopColor="#4a6b78"/><stop offset="1" stopColor="#07090b"/></radialGradient>
                <filter id="soft"><feGaussianBlur stdDeviation="12"/></filter>
                <clipPath id="irisClip"><circle cx="330" cy="238" r="58"/></clipPath>
                <path id="tp" d="M330 238 m-86 0 a86 86 0 1 1 172 0 a86 86 0 1 1 -172 0"/>
              </defs>
              <ellipse cx="280" cy="392" rx="250" ry="9" fill="#000" opacity=".35" filter="url(#soft)"/>
              <circle cx="12" cy="122" r="8" fill="url(#chrome)"/><circle cx="548" cy="122" r="8" fill="url(#chrome)"/>
              <rect x="20" y="92" width="520" height="262" rx="20" fill="url(#leather)"/>
              <rect x="42" y="136" width="150" height="180" rx="12" fill="url(#grooves)" stroke="#000" strokeOpacity=".6"/>
              <rect x="64" y="214" width="9" height="40" rx="4" fill="url(#chrome)"/>
              <circle cx="58" cy="184" r="8" fill="url(#chromeH)" stroke="#555"/>
              <circle cx="520" cy="206" r="7" fill="url(#chromeH)" stroke="#555"/>
              <rect x="20" y="326" width="520" height="30" rx="12" fill="url(#chrome)"/>
              <rect x="42" y="30" width="64" height="38" rx="5" fill="url(#knurl)"/><rect x="38" y="24" width="72" height="9" rx="4" fill="url(#chromeH)"/>
              <rect x="438" y="32" width="86" height="36" rx="6" fill="url(#knurl)"/><rect x="434" y="26" width="94" height="9" rx="4" fill="url(#chromeH)"/>
              <path d="M176 70 L196 28 H392 L412 70Z" fill="url(#chrome)"/>
              <rect x="14" y="64" width="532" height="70" rx="14" fill="url(#chrome)"/>
              <path d="M30 76H530" stroke="#fff" strokeOpacity=".6" strokeWidth="1.5"/>
              <circle cx="400" cy="58" r="12" fill="url(#chromeH)" stroke="#6d6962"/><circle cx="400" cy="58" r="6" fill="#2a2926"/>
              <circle cx="228" cy="106" r="13" fill="url(#chromeH)"/><circle cx="228" cy="106" r="9" fill="url(#win)"/>
              <rect x="258" y="96" width="66" height="22" rx="5" fill="#0d1113" stroke="#bdb9af" strokeWidth="2"/>
              <circle cx="330" cy="238" r="112" fill="url(#chrome)"/>
              <circle cx="330" cy="238" r="106" fill="#0e0e0d"/>
              <g id="ring" ref={ringRef}>
                <circle cx="330" cy="238" r="100" fill="#1a1917"/>
                <circle cx="330" cy="238" r="95" fill="none" stroke="#57544e" strokeWidth="9" strokeDasharray="3 6"/>
                <text fontFamily="Manrope,sans-serif" fontWeight="600" fontSize="11" fill="#ece7da" dominantBaseline="middle">
                  <textPath href="#tp" textLength="530" lengthAdjust="spacing">50mm 1:2 &#183; 0.7 &#183; 1 &#183; 1.5 &#183; 2 &#183; 3 &#183; 5 &#183; &#8734; &#183; 50mm 1:2 &#183; 0.7 &#183; 1 &#183; 2 &#183; 5 &#183; &#8734; &#183;</textPath>
                </text>
              </g>
              <path d="M323 126h14l-7 12z" fill="#ece7da"/>
              <circle cx="330" cy="238" r="70" fill="#0a0a09" stroke="#4a4741" strokeWidth="2"/>
              <circle cx="330" cy="238" r="58" fill="url(#glass)"/>
              <circle cx="330" cy="238" r="58" fill="url(#coat)"/>
              <g clipPath="url(#irisClip)">
                <g transform="rotate(0 330 238)"><path className="blade" d="M298 180L362 180L344 234Z"/></g>
                <g transform="rotate(60 330 238)"><path className="blade" d="M298 180L362 180L344 234Z"/></g>
                <g transform="rotate(120 330 238)"><path className="blade" d="M298 180L362 180L344 234Z"/></g>
                <g transform="rotate(180 330 238)"><path className="blade" d="M298 180L362 180L344 234Z"/></g>
                <g transform="rotate(240 330 238)"><path className="blade" d="M298 180L362 180L344 234Z"/></g>
                <g transform="rotate(300 330 238)"><path className="blade" d="M298 180L362 180L344 234Z"/></g>
              </g>
              <ellipse cx="308" cy="214" rx="16" ry="9" fill="#fff" opacity=".28" transform="rotate(-35 308 214)"/>
            </svg>
          </div>

          <div className="inside" id="inside" ref={insideRef}>
            <div className="frame" id="frame" ref={frameRef}>
              <i className="base"></i><i className="sp t"></i><i className="sp b"></i>
              <img id="frameImg" ref={frameImgRef} src="https://picsum.photos/seed/innerlight/1800/1200" alt="Exposed film frame"/>
              <span className="edge">&#9656; 24A &nbsp;&nbsp; &#9656; 25</span>
            </div>
            <div className="curtain l" id="cl" ref={clRef}></div>
            <div className="curtain r" id="cr" ref={crRef}></div>
            <div className="cap" id="cap" ref={capRef}>
              <h2>Exposed.</h2>
              <p>50mm f/2 &middot; 1/125 &middot; Portra 400</p>
            </div>
          </div>

          <div className="where"><i></i><span id="where" ref={whereRef}>Rotate</span></div>
        </div>
      </section>

      {/* contact sheet (Film Strip) */}
      <section className="strip" id="film" ref={stripRef}>
        <div className="strip-pin">
          <header><h2>Six frames from this month</h2><p>Keep scrolling. The film moves, you don't.</p></header>
          <div className="film" id="reel" ref={reelRef}>
            <figure><img src="https://picsum.photos/seed/gg1/900/600" alt=""/><figcaption><b>01</b> f/1.8 &middot; 1/250 &middot; ISO 100</figcaption></figure>
            <figure><img src="https://picsum.photos/seed/gg2/900/600" alt=""/><figcaption><b>02</b> f/2.8 &middot; 1/500 &middot; ISO 200</figcaption></figure>
            <figure><img src="https://picsum.photos/seed/gg3/900/600" alt=""/><figcaption><b>03</b> f/4 &middot; 1/125 &middot; ISO 400</figcaption></figure>
            <figure><img src="https://picsum.photos/seed/gg4/900/600" alt=""/><figcaption><b>04</b> f/1.4 &middot; 1/1000 &middot; ISO 100</figcaption></figure>
            <figure><img src="https://picsum.photos/seed/gg5/900/600" alt=""/><figcaption><b>05</b> f/5.6 &middot; 1/60 &middot; ISO 800</figcaption></figure>
            <figure><img src="https://picsum.photos/seed/gg6/900/600" alt=""/><figcaption><b>06</b> f/2 &middot; 1/320 &middot; ISO 200</figcaption></figure>
          </div>
        </div>
      </section>
    </>
  );
};

export default CameraHero;



