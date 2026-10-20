import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import "./FilmRollReviews.css";

const DEFAULT_REVIEWS = [
  { n: "Aarav M.", s: 5, t: "Absolutely loved it. Setup took minutes and everything just worked." },
  { n: "Priya S.", s: 5, t: "Beautiful design and super friendly support. I had a small question on day two and got a thoughtful reply within the hour. They even followed up a week later to make sure everything was running smoothly. Highly recommended to anyone who cares about the details!" },
  { n: "Rohan K.", s: 4, t: "Great value for the price. A couple of small tweaks and it’s perfect." },
  { n: "Neha D.", s: 5, t: "Our whole team switched in a week. The onboarding was clear, the dashboards are easy to read, and reporting that used to take us an entire afternoon now takes a few minutes. We can’t imagine going back to the old way of doing things." },
  { n: "Karan P.", s: 5, t: "Fast, simple and reliable. Exactly what I was looking for." },
];

/**
 * Scrolling film-strip review carousel with a Yashica-style camera.
 *
 * Props:
 *  - reviews:  [{ n: name, s: stars (1-5), t: text }]
 *  - title:    heading text
 *  - subtitle: small helper text under the heading
 *  - theme:    "light" | "dark" | undefined (undefined follows the OS setting)
 *  - autoCloseMs: an opened review closes itself after this many ms and the
 *                 roll resumes (default 5000, 0 = never auto-close)
 */
export default function FilmRollReviews({
  reviews = DEFAULT_REVIEWS,
  title = "What people are saying",
  subtitle = "Tap “Read more” to open a long review",
  theme,
  autoCloseMs = 5000,
}) {
  const stageRef = useRef(null);
  const stripRef = useRef(null);
  const [openIdx, setOpenIdx] = useState(null);
  const [ratio, setRatio] = useState(1);
  const [overflowing, setOverflowing] = useState({});
  const [mobile, setMobile] = useState(false);
  const [panel, setPanel] = useState(null); // mobile: index of the review shown in the reading panel

  // Duplicate the list so the CSS loop is seamless
  const frames = [...reviews, ...reviews];

  /* show "Read more" only where the text is actually cut off */
  const checkOverflow = useCallback(() => {
    const strip = stripRef.current;
    if (!strip) return;
    setOverflowing((prev) => {
      const next = { ...prev };
      strip.querySelectorAll(".fr-frame:not(.fr-open)").forEach((f) => {
        const q = f.querySelector("q");
        next[f.dataset.i] = q.scrollHeight > q.clientHeight + 1;
      });
      return next;
    });
  }, []);

  // Measure on mount, when reviews change, and once fonts are ready
  useLayoutEffect(() => {
    checkOverflow();
  }, [checkOverflow, reviews]);

  useEffect(() => {
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(checkOverflow);
  }, [checkOverflow]);

  // Collapse and re-measure on resize
  useEffect(() => {
    const onResize = () => {
      setOpenIdx(null);
      setRatio(1);
      requestAnimationFrame(checkOverflow);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [checkOverflow]);

  // When a card opens, grow the camera + film to fit its text
  useLayoutEffect(() => {
    const stage = stageRef.current;
    const strip = stripRef.current;
    if (!stage || !strip) return;

    if (openIdx === null) {
      setRatio(1);
      checkOverflow();
      return;
    }
    const f = strip.querySelector(`.fr-frame[data-i="${openIdx}"]`);
    if (!f) return;
    const cs = getComputedStyle(stage);
    const base = parseFloat(cs.getPropertyValue("--bfh"));
    const bcw = parseFloat(cs.getPropertyValue("--bcw"));
    const pv = parseFloat(getComputedStyle(f).paddingTop);
    const card = f.querySelector(".fr-card");
    const rmax = Math.max(1, (stage.clientWidth * (window.innerWidth > 620 ? 0.5 : 0.75)) / bcw);
    setRatio(Math.min(rmax, Math.max(1, (card.scrollHeight + pv * 2 + 4) / base)));
  }, [openIdx, checkOverflow]);

  // Auto-close an opened review so the roll starts moving again
  useEffect(() => {
    if (openIdx === null || !autoCloseMs) return;
    const id = setTimeout(() => setOpenIdx(null), autoCloseMs);
    return () => clearTimeout(id);
  }, [openIdx, autoCloseMs]);

  // Mobile uses a reading panel under the roll instead of growing the film
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 620px)");
    const sync = () => {
      setMobile(mq.matches);
      setOpenIdx(null);
      setPanel(null);
    };
    setMobile(mq.matches);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const toggle = (i) => {
    if (mobile) {
      const k = i % reviews.length;
      setPanel((cur) => (cur === k ? null : k));
    } else {
      setOpenIdx((cur) => (cur === i ? null : i));
    }
  };
  const shown = panel !== null ? reviews[panel] : null;

  return (
    <div className="fr" data-theme={theme}>
      <h1>{title}</h1>
      <p className="fr-sub">{subtitle}</p>

      <div className="fr-stage" ref={stageRef} style={{ "--r": ratio }}>
        <div className="fr-film">
          <div className={`fr-strip${openIdx !== null ? " fr-hold" : ""}`} ref={stripRef}>
            {frames.map((r, i) => {
              const open = !mobile && openIdx === i;
              return (
                <div className={`fr-frame${open ? " fr-open" : ""}`} data-i={i} key={i}>
                  <div className="fr-card">
                    <div>
                      <div className="fr-stars">
                        {"★".repeat(r.s)}
                        {"☆".repeat(5 - r.s)}
                      </div>
                      <q>“{r.t}”</q>
                      <button
                        className="fr-more"
                        type="button"
                        hidden={!open && !overflowing[i]}
                        aria-expanded={open || (mobile && panel === i % reviews.length)}
                        onClick={() => toggle(i)}
                      >
                        {open ? "Show less" : "Read more"}
                      </button>
                    </div>
                    <div className="fr-who">
                      <span className="fr-av">{r.n[0]}</span>
                      {r.n}
                    </div>
                  </div>
                  <span className="fr-num">
                    {11 + (i % reviews.length)} ▸ {12 + (i % reviews.length)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="fr-slot" />

        <div className="fr-camera">
          <div className="fr-leather" />
          <div className="fr-top">
            <div className="fr-knob" />
            <div className="fr-shoe" />
            <div className="fr-dial" />
            <div className="fr-meter" />
            <div className="fr-badge">
              <b>G</b>YASHICA
            </div>
            <div className="fr-vf">
              <i />
              <i />
            </div>
          </div>
          <div className="fr-lens">
            <div className="fr-knurl" />
            <div className="fr-glass" />
          </div>
          <div className="fr-gsn">GSN</div>
        </div>
      </div>

      {mobile && shown && (
        <div className="fr-panel" role="dialog" aria-label="Full review" key={panel}>
          <button className="fr-panel-x" type="button" aria-label="Close review" onClick={() => setPanel(null)}>
            ×
          </button>
          <div className="fr-stars">
            {"★".repeat(shown.s)}
            {"☆".repeat(5 - shown.s)}
          </div>
          <p className="fr-panel-text">“{shown.t}”</p>
          <div className="fr-who">
            <span className="fr-av">{shown.n[0]}</span>
            {shown.n}
          </div>
        </div>
      )}
    </div>
  );
}