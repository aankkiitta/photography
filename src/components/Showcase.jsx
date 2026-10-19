import { useEffect, useRef } from "react";
import "./Showcase.css";

const SCALES = {
  3: [0.78, 1, 0.78],
  5: [0.62, 0.8, 1, 0.8, 0.62],
  7: [0.53, 0.68, 0.81, 1, 0.81, 0.68, 0.53],
};
const defaultItems = [
  { name: "Superpower", image: "https://picsum.photos/seed/sc1/400/540" },
  { name: "Girlfriend", image: "https://picsum.photos/seed/sc2/400/540" },
  { name: "Character.AI", image: "https://picsum.photos/seed/sc3/400/540" },
  { name: "Bastion Boss", image: "https://picsum.photos/seed/sc4/400/540" },
  { name: "Eliza Dolittle", image: "https://picsum.photos/seed/sc5/400/540" },
  { name: "Waverly", image: "https://picsum.photos/seed/sc6/400/540" },
  { name: "Timeless", image: "https://picsum.photos/seed/sc7/400/540" },
  { name: "Lumen", image: "https://picsum.photos/seed/sc8/400/540" },
  { name: "Aster", image: "https://picsum.photos/seed/sc9/400/540" },
  { name: "Noor", image: "https://picsum.photos/seed/sc10/400/540" },
];
 
const lerp = (a, b, u) => a + (b - a) * u;
 
export default function Showcase({ items = defaultItems, ratio = 0.74, maxHeight = 520, onSelect }) {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const slotRefs = useRef([]);
  const api = useRef({ step: () => {}, toSlot: () => {} });
 
  useEffect(() => {
    const stage = stageRef.current;
    const slots = slotRefs.current.slice(0, items.length);
    const N = items.length;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pos = 0, target = 0, raf = 0, pitch = 90, G = [], half = 3;
    let wheelTimer, startX = 0, startPos = 0, dragging = false, moved = false;
 
    const measure = () => {
      const W = rootRef.current.clientWidth;
      const C = W < 600 ? 3 : W < 900 ? 5 : 7;
      half = (C - 1) / 2;
      const scales = SCALES[C];
      const gap = Math.min(12, Math.max(6, W * 0.012));
      const usable = C === 3 ? W * 1.25 : W - 24; 
      const sum = scales.reduce((a, b) => a + b, 0);
      let wc = (usable - gap * (C - 1)) / sum;
      let hc = wc / ratio;
      if (hc > maxHeight) { hc = maxHeight; wc = hc * ratio; }
      const hs = scales.map((f) => hc * f);
      const ws = hs.map((h) => h * ratio);
      const tot = ws.reduce((a, b) => a + b, 0) + gap * (C - 1);
      let x = (W - tot) / 2;
      G = [];
      for (let i = 0; i < C; i++) {
        G[i + 1] = { x, w: ws[i], h: hs[i] };
        x += ws[i] + gap;
      }
      G[0] = { x: G[1].x - ws[0] - gap, w: ws[0], h: hs[0] };
      G[C + 1] = { x: G[C].x + ws[C - 1] + gap, w: ws[C - 1], h: hs[C - 1] };
      pitch = ws[half] + gap;
      stage.style.height = Math.round(hc + 22 + 16) + "px";
    };
 
    const render = () => {
      const lim = half + 0.999;
      slots.forEach((el, i) => {
        if (!el) return;
        let t = (((i - pos) % N) + N) % N;
        if (t >= N / 2) t -= N;
        const c = Math.max(-lim, Math.min(lim, t)) + half + 1;
        const lo = Math.floor(c);
        const u = c - lo;
        const a = G[lo], b = G[lo + 1];
        let x = lerp(a.x, b.x, u);
        if (Math.abs(t) > lim) x += (t > 0 ? 1 : -1) * (Math.abs(t) - lim) * pitch * 0.6;
        const at = Math.abs(t);
        const op = at <= half ? 1 : Math.max(0, 1 - (at - half) / 0.8);
        el.style.left = x + "px";
        el.style.width = lerp(a.w, b.w, u) + "px";
        el.style.opacity = op;
        el.style.zIndex = 20 - Math.round(at);
        el.style.pointerEvents = op < 0.1 ? "none" : "auto";
        el.querySelector(".sc-card").style.height = lerp(a.h, b.h, u) + "px";
        el.dataset.t = t.toFixed(2);
      });
    };
 
    const tick = () => {
      const d = target - pos;
      pos = reduce || Math.abs(d) < 0.001 ? target : pos + d * 0.14;
      render();
      raf = pos === target ? 0 : requestAnimationFrame(tick);
    };
    const go = (v) => {
      target = v;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const snap = () => go(Math.round(target));
    api.current = {
      step: (n) => go(Math.round(target) + n),
      toSlot: (t) => { if (!moved) go(Math.round(target + t)); },
    };
 
    const onWheel = (e) => {
      e.preventDefault();
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      go(target + d / 90);
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(snap, 140);
    };
    const onDown = (e) => {
      dragging = true; moved = false; startX = e.clientX; startPos = target;
      stage.setPointerCapture(e.pointerId);
    };
    const onMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) { moved = true; stage.classList.add("is-dragging"); }
      if (moved) go(startPos - dx / pitch);
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      stage.classList.remove("is-dragging");
      if (moved) snap();
    };
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(Math.round(target) + 1);
      if (e.key === "ArrowLeft") go(Math.round(target) - 1);
    };
    const onResize = () => { measure(); render(); };
 
    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerup", onUp);
    stage.addEventListener("pointercancel", onUp);
    stage.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    measure();
    render();
 
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(wheelTimer);
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("pointerdown", onDown);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerup", onUp);
      stage.removeEventListener("pointercancel", onUp);
      stage.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [items, ratio, maxHeight]);
 
  return (
    /* WRAPPER ADDED HERE */
    <div className="showcase-container-wrapper">
      
      {/* TITLE SECTION */}
      <div className="sc-header">
        <h2 className="sc-title">A LITTLE BIT OF EVERYTHING</h2>
        <p className="sc-subtitle">Curated Photography</p>
      </div>

      <section ref={rootRef} style={{ position: "relative", width: "100%" }}>
        <div className="sc-stage" ref={stageRef}>
          {items.map((item, i) => (
            <div
              key={item.name + i}
              className="sc-slot"
              tabIndex={0}
              ref={(el) => (slotRefs.current[i] = el)}
              onClick={(e) => {
                api.current.toSlot(parseFloat(e.currentTarget.dataset.t));
                if (onSelect) onSelect(item, i);
              }}
            >
              <span className="sc-name">{item.name}</span>
              <div className="sc-card">
                <img src={item.image} alt={item.name} draggable={false} />
                {item.badge && <span className="sc-badge">{item.badge}</span>}
              </div>
            </div>
          ))}
        </div>
   
        <div className="sc-tools">
          <button className="sc-tool" aria-label="Previous" onClick={() => api.current.step(-1)}>
            <svg viewBox="0 0 24 24"><path d="m15 5-7 7 7 7" /></svg>
          </button>
          <button className="sc-tool" aria-label="Next" onClick={() => api.current.step(1)}>
            <svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7" /></svg>
          </button>
        </div>
      </section>

    </div>
  );
}