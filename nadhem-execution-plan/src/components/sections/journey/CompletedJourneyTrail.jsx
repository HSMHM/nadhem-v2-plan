import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { completedMilestones } from '../../../data/completedMilestones';

const VB_WIDTH = 2000;
const X_RIGHT = 1880;
const X_LEFT = 120;
const TOP_Y = 460;
const V_LENGTH = 520;
const REF_VIEWPORT_W = 1920;
const REF_VIEWPORT_H = 1080;

const BRAND_GRADIENTS = [
  'linear-gradient(135deg,#A61C61 0%,#452059 100%)',
  'linear-gradient(135deg,#2A848A 0%,#452059 100%)',
  'linear-gradient(135deg,#BA5A31 0%,#A61C61 100%)',
  'linear-gradient(135deg,#A78BFA 0%,#A61C61 100%)',
];
const BRAND_ACCENTS = ['#F9A8D4', '#5EEAD4', '#FDBA74', '#C4B5FD'];

function getMilestones() {
  return completedMilestones.map((m, i) => ({
    ...m,
    gradient: BRAND_GRADIENTS[i % BRAND_GRADIENTS.length],
    accent: BRAND_ACCENTS[i % BRAND_ACCENTS.length],
  }));
}

function buildLayout(count) {
  const segments = [];
  const dots = [];
  let cursor = { x: X_RIGHT, y: TOP_Y };
  let pathLen = 0;
  let maxY = TOP_Y;
  let remaining = count;
  let segIdx = 0;

  while (remaining > 0) {
    const isVertical = segIdx % 2 === 0;
    if (isVertical) {
      const endY = cursor.y + V_LENGTH;
      const start = pathLen;
      segments.push({ from: { ...cursor }, to: { x: cursor.x, y: endY } });
      dots.push({
        x: cursor.x,
        y: cursor.y + V_LENGTH / 2,
        pathPos: start + V_LENGTH / 2,
        segType: 'V',
        segSide: cursor.x === X_RIGHT ? 'right' : 'left',
      });
      pathLen += V_LENGTH;
      remaining -= 1;
      cursor = { x: cursor.x, y: endY };
      maxY = Math.max(maxY, endY);
    } else {
      const endX = cursor.x === X_RIGHT ? X_LEFT : X_RIGHT;
      const dir = endX > cursor.x ? 1 : -1;
      const span = Math.abs(endX - cursor.x);
      const dotCount = Math.min(2, remaining);
      const start = pathLen;
      segments.push({ from: { ...cursor }, to: { x: endX, y: cursor.y } });
      const offsets = dotCount === 2 ? [span / 3, (2 * span) / 3] : [span / 2];
      offsets.forEach((o) => {
        dots.push({
          x: cursor.x + dir * o,
          y: cursor.y,
          pathPos: start + o,
          segType: 'H',
        });
      });
      pathLen += span;
      remaining -= dotCount;
      cursor = { x: endX, y: cursor.y };
    }
    segIdx++;
  }

  return { segments, dots, totalLen: pathLen, totalHeight: maxY + 60 };
}

function segmentsToPathD(segs) {
  if (!segs.length) return '';
  let d = `M ${segs[0].from.x} ${segs[0].from.y}`;
  for (const s of segs) d += ` L ${s.to.x} ${s.to.y}`;
  return d;
}

function posClass(dot) {
  if (dot.segType === 'V') return dot.segSide === 'right' ? 'is-v-right' : 'is-v-left';
  return 'is-h';
}

export default function CompletedJourneyTrail() {
  const milestones = useMemo(() => getMilestones(), []);
  const layout = useMemo(() => buildLayout(milestones.length), [milestones.length]);
  const pathD = useMemo(() => segmentsToPathD(layout.segments), [layout.segments]);
  const stageHeightPct = useMemo(() => {
    const scale = REF_VIEWPORT_W / VB_WIDTH;
    const requiredPx = scale * layout.totalHeight;
    const pct = (requiredPx / REF_VIEWPORT_H) * 100;
    return Math.max(170, Math.ceil(pct + 4));
  }, [layout.totalHeight]);

  const rootRef = useRef(null);
  const pinRef = useRef(null);
  const sceneRef = useRef(null);
  const stageRef = useRef(null);
  const svgRef = useRef(null);
  const progressRef = useRef(null);
  const dotRef = useRef(null);
  const nodeRefs = useRef([]);
  const startNodeRef = useRef(null);
  const logoPosRef = useRef(null);
  const itemPosRefs = useRef([]);
  const itemInnerRefs = useRef([]);
  const progressBarRef = useRef(null);

  useEffect(() => {
    if (!milestones.length || !progressRef.current) return;
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const positionItems = () => {
      const stageEl = stageRef.current;
      if (!stageEl) return;
      const stageRect = stageEl.getBoundingClientRect();
      nodeRefs.current.forEach((node, i) => {
        if (!node) return;
        const r = node.getBoundingClientRect();
        const cx = r.left + r.width / 2 - stageRect.left;
        const cy = r.top + r.height / 2 - stageRect.top;
        const pos = itemPosRefs.current[i];
        if (pos) {
          pos.style.left = `${cx}px`;
          pos.style.top = `${cy}px`;
        }
      });
      if (startNodeRef.current && logoPosRef.current) {
        const r = startNodeRef.current.getBoundingClientRect();
        const cx = r.left + r.width / 2 - stageRect.left;
        const cy = r.top + r.height / 2 - stageRect.top;
        logoPosRef.current.style.left = `${cx}px`;
        logoPosRef.current.style.top = `${cy}px`;
      }
    };

    positionItems();

    const ctx = gsap.context(() => {
      const path = progressRef.current;
      const fullLen = path.getTotalLength();
      const fracs = layout.dots.map((d) => d.pathPos / layout.totalLen);

      path.style.strokeDasharray = String(fullLen);
      path.style.strokeDashoffset = String(fullLen);

      gsap.set(itemInnerRefs.current, { opacity: 0, scale: 0.6, y: 40 });
      gsap.set(dotRef.current, { opacity: 1 });

      if (reduceMotion) {
        gsap.set(itemInnerRefs.current, { opacity: 1, scale: 1, y: 0 });
        path.style.strokeDashoffset = '0';
        return;
      }

      const MOVE = 1.0;
      const DWELL = 0.2;
      const REVEAL = 0.5;
      const stepDuration = MOVE + DWELL;
      const scrollDistance = milestones.length * 500 + 200;

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: pinRef.current,
          pin: true,
          start: 'top top',
          end: `+=${scrollDistance}`,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: positionItems,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      const totalDuration = milestones.length * stepDuration + MOVE * 0.6;
      const pinEl = pinRef.current;
      const stageEl = stageRef.current;
      const stageScrollMax = stageEl && pinEl
        ? Math.max(0, stageEl.offsetHeight - pinEl.offsetHeight)
        : 0;
      if (stageScrollMax > 0) {
        tl.to(
          stageEl,
          { y: -stageScrollMax, ease: 'none', duration: totalDuration },
          0,
        );
      }

      let prev = 0;
      fracs.forEach((frac, i) => {
        const tStart = i * stepDuration;
        tl.to(
          dotRef.current,
          {
            motionPath: {
              path,
              align: path,
              alignOrigin: [0.5, 0.5],
              start: prev,
              end: frac,
            },
            ease: 'sine.inOut',
            duration: MOVE,
          },
          tStart,
        );
        tl.to(
          path,
          {
            strokeDashoffset: (1 - frac) * fullLen,
            ease: 'sine.inOut',
            duration: MOVE,
          },
          tStart,
        );
        tl.fromTo(
          itemInnerRefs.current[i],
          { opacity: 0, scale: 0.6, y: 40 },
          { opacity: 1, scale: 1, y: 0, ease: 'back.out(1.6)', duration: REVEAL },
          tStart + MOVE * 0.55,
        );
        if (i > 0) {
          tl.to(
            itemInnerRefs.current[i - 1],
            { opacity: 0, scale: 0.5, ease: 'power2.in', duration: 0.4 },
            tStart + MOVE * 0.25,
          );
        }
        prev = frac;
      });

      const endT = milestones.length * stepDuration;
      tl.to(
        dotRef.current,
        {
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.5],
            start: prev,
            end: 1,
          },
          ease: 'power1.in',
          duration: MOVE * 0.6,
        },
        endT,
      );
      tl.to(
        path,
        {
          strokeDashoffset: 0,
          ease: 'power1.in',
          duration: MOVE * 0.6,
        },
        endT,
      );
    }, rootRef);

    const handleResize = () => {
      positionItems();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, [milestones.length, layout, pathD]);

  if (!milestones.length) return null;

  return (
    <section className="ctrail-root" ref={rootRef} aria-label="رحلة الإنجازات">
      <div className="ctrail-pin" ref={pinRef}>
        <div className="ctrail-scene" ref={sceneRef}>
          <div className="ctrail-scene-bg-a" />
          <div className="ctrail-scene-bg-b" />
          <div className="ctrail-scene-bg-c" />
          <div className="ctrail-scene-grid" />

          <div className="ctrail-scene-header">
            <div className="ctrail-progress-bar">
              <div className="ctrail-progress-fill" ref={progressBarRef} />
            </div>
          </div>

          <div
            className="ctrail-stage"
            ref={stageRef}
            style={{ height: `${stageHeightPct}%` }}
          >
          <header className="ctrail-hero">
            <div className="ctrail-badge">
              <i className="fa-thin fa-flag-checkered" aria-hidden="true" />
              <span>ما تم إنجازه حتى اليوم</span>
            </div>
            <h2 className="ctrail-title">رحلة الإنجاز</h2>
          </header>

          <svg
            ref={svgRef}
            className="ctrail-svg"
            viewBox={`0 0 ${VB_WIDTH} ${layout.totalHeight}`}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="ctrail-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#A78BFA" />
                <stop offset="50%" stopColor="#A61C61" />
                <stop offset="100%" stopColor="#BA5A31" />
              </linearGradient>
              <filter id="ctrail-line-glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d={pathD}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              ref={progressRef}
              d={pathD}
              fill="none"
              stroke="url(#ctrail-grad)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#ctrail-line-glow)"
            />
            <circle
              ref={startNodeRef}
              cx={X_RIGHT}
              cy={TOP_Y}
              r="12"
              fill="rgba(10,4,20,0.95)"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.5"
            />
            <circle cx={X_RIGHT} cy={TOP_Y} r="4" fill="url(#ctrail-grad)" />
            {layout.dots.map((p, i) => (
              <g key={i}>
                <circle
                  ref={(el) => (nodeRefs.current[i] = el)}
                  cx={p.x}
                  cy={p.y}
                  r="9"
                  fill="rgba(10,4,20,0.95)"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.5"
                />
                <circle cx={p.x} cy={p.y} r="3.5" fill="url(#ctrail-grad)" />
              </g>
            ))}
          </svg>

          <div ref={dotRef} className="ctrail-dot" aria-hidden="true">
            <span className="ctrail-dot-pulse" />
            <span className="ctrail-dot-pulse ctrail-dot-pulse-delay" />
            <span className="ctrail-dot-core" />
          </div>

          <div ref={logoPosRef} className="ctrail-logo-pos">
            <div className="ctrail-logo-offset">
              <img
                src="/nathem-logo.png"
                alt="نظم"
                className="ctrail-logo-img"
                draggable="false"
              />
            </div>
          </div>

          <div className="ctrail-items-layer">
            {milestones.map((m, i) => {
              const p = layout.dots[i];
              return (
                <div
                  key={m.id}
                  ref={(el) => (itemPosRefs.current[i] = el)}
                  className="ctrail-item-pos"
                >
                  <div className={`ctrail-item-offset ${posClass(p)}`}>
                    <div
                      ref={(el) => (itemInnerRefs.current[i] = el)}
                      className={`ctrail-item ${m.partial ? 'is-partial' : ''}`}
                      style={{ '--accent': m.accent }}
                    >
                    <div
                      className={`ctrail-img ${m.image ? 'has-image' : 'icon-only'}`}
                      style={{
                        backgroundImage: m.image ? `url(${m.image})` : m.gradient,
                      }}
                    >
                      <span className="ctrail-img-num">{String(i + 1).padStart(2, '0')}</span>
                      {!m.image && (
                        <i className={`fa-thin fa-${m.icon || 'circle-check'} ctrail-img-icon`} aria-hidden="true" />
                      )}
                      <span className="ctrail-img-flag">
                        {m.partial ? (
                          <>
                            <i className="fa-solid fa-hourglass-half" aria-hidden="true" /> جزئي
                          </>
                        ) : (
                          <>
                            <i className="fa-solid fa-check" aria-hidden="true" /> مكتمل
                          </>
                        )}
                      </span>
                    </div>
                    <h3 className="ctrail-item-title">{m.title}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          </div>

          <div className="ctrail-scroll-hint">
            <i className="fa-thin fa-arrow-down-long" aria-hidden="true" />
            <span>مرّر للمتابعة</span>
          </div>
        </div>
      </div>
    </section>
  );
}
