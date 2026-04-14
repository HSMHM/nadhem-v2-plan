import { useEffect, useRef, useState } from 'react';

function CountUp({ end, duration = 1500 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function StatCard({ icon, value, label, color, suffix = '', glass = false }) {
  const numVal = typeof value === 'number' ? value : parseInt(value);
  const isNum = !isNaN(numVal);

  return (
    <div className={glass ? 'glass' : 'card'} style={{ textAlign: 'center' }}>
      <div className="ic" style={{ margin: '0 auto 10px', background: glass ? `${color}22` : undefined }}>
        <i className={`fa-thin fa-${icon}`} style={{ color }} aria-hidden="true" />
      </div>
      <div style={{ fontSize: '2rem', fontWeight: 700, color: glass ? '#fff' : 'var(--text-dark)', lineHeight: 1.2 }}>
        {isNum ? <CountUp end={numVal} /> : value}{suffix}
      </div>
      <div style={{ color: glass ? 'rgba(255,255,255,0.5)' : 'var(--text-muted)', fontSize: '0.78rem', marginTop: 4 }}>
        {label}
      </div>
    </div>
  );
}
