// Shared primitives: cursor, scroll reveal, language pill, lang hook

import React, { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';

// ---------- Language + Content context ----------
const SiteContext = createContext(null);
const useSite = () => useContext(SiteContext);

// ---------- Custom cursor ----------
function CustomCursor({ direction }) {
  const dot = useRef(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    let rafId;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    const onOver = (e) => {
      const t = e.target;
      if (!t || !t.closest) return;
      setHover(!!t.closest('a, button, [data-hover], input, select'));
    };
    const tick = () => {
      if (dot.current) dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      rafId = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    tick();
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  const isTouch = typeof window !== 'undefined' && matchMedia('(pointer: coarse)').matches;
  if (isTouch) return null;

  return <div ref={dot} className={`cursor-dot ${hover ? 'hover' : ''}`} />;
}

// ---------- Reveal on scroll ----------
// Resilient: content visible by default (SSR/no-JS/iframe-safe).
// On mount we hide briefly, then animate in via IntersectionObserver,
// with a rAF safety net if IO never fires.
function Reveal({ children, delay = 0, className = '', as: Tag = 'div', style = {} }) {
  const ref = useRef(null);
  const [primed, setPrimed] = useState(false); // starts visible, then hidden for animation
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Prime: hide briefly so we can animate in
    setPrimed(true);

    // If it's already in the viewport (e.g. above the fold), show immediately
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh * 0.92) {
      requestAnimationFrame(() => setSeen(true));
      return;
    }

    let done = false;
    const reveal = () => { if (!done) { done = true; setSeen(true); } };

    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { reveal(); io.disconnect(); } },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);

    // Safety net: if IO hasn't fired in 2s, just show it.
    const t = setTimeout(reveal, 2000);

    return () => { io.disconnect(); clearTimeout(t); };
  }, []);

  const cls = primed ? `reveal ${seen ? 'seen' : ''} ${className}` : `reveal-idle ${className}`;
  return (
    <Tag
      ref={ref}
      className={cls}
      style={{ ...style, transitionDelay: primed ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  );
}

// ---------- Logo marks ----------
function LogoMark({ variant = 'mt' }) {
  const common = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (variant) {
    case 'mt':
      return <span className="mark mark-mt">M/T</span>;
    case 'monogram':
      return (
        <svg {...common} className="mark-svg" aria-label="MT monogram">
          <path d="M3 19V5l5 9 5-9v14" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <path d="M15 5h7M18.5 5v14" stroke="currentColor" strokeWidth="1.6" fill="none" />
        </svg>
      );
    case 'dot':
      return (
        <span className="mark mark-dot-wrap">
          <span className="mark-dot" />
          <span className="mark-dot-txt">mtissera</span>
        </span>
      );
    case 'glyph':
      return (
        <svg {...common} className="mark-svg" aria-label="circle glyph">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" fill="none" />
          <circle cx="12" cy="12" r="3" fill="var(--accent)" />
          <line x1="12" y1="3" x2="12" y2="7" stroke="currentColor" strokeWidth="1.2" />
          <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case 'sq':
      return (
        <svg {...common} className="mark-svg" aria-label="square sigil">
          <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.4" fill="none" />
          <path d="M7 15V9l2.5 4L12 9v6M14 9h4M16 9v6" stroke="currentColor" strokeWidth="1.3" fill="none" />
        </svg>
      );
    case 'arrow':
      return (
        <span className="mark mark-arrow">
          <span className="mark-arrow-sym">↳</span>
          <span>maxi.t</span>
        </span>
      );
    default:
      return <span className="mark mark-mt">M/T</span>;
  }
}

// ---------- Top bar (shared across directions) ----------
function TopBar({ direction, setDirection, lang, setLang, font, setFont, theme, setTheme, logo, setLogo }) {
  const logos = [
    { k: 'mt', label: 'M/T' },
    { k: 'monogram', label: 'MT·line' },
    { k: 'glyph', label: 'Glyph' },
    { k: 'sq', label: 'Sigil' },
    { k: 'dot', label: 'Dot' },
    { k: 'arrow', label: 'Arrow' },
  ];
  const [logoOpen, setLogoOpen] = useState(false);
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="logo-btn"
          onClick={() => setLogoOpen(o => !o)}
          aria-label="Change logo"
          data-hover
        >
          <LogoMark variant={logo} />
        </button>
        {logoOpen && (
          <div className="logo-menu" onMouseLeave={() => setLogoOpen(false)}>
            {logos.map(l => (
              <button
                key={l.k}
                className={`logo-menu-item ${logo === l.k ? 'on' : ''}`}
                onClick={() => { setLogo(l.k); setLogoOpen(false); }}
              >
                <LogoMark variant={l.k} />
                <span>{l.label}</span>
              </button>
            ))}
          </div>
        )}
        <span className="muted"> · mtissera.com</span>
      </div>
      <nav className="topbar-right">
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          aria-label="Toggle theme"
          data-hover
        >
          <span className="theme-icon" aria-hidden="true">
            {theme === 'light' ? '◐' : '◑'}
          </span>
          <span>{theme === 'light' ? 'Light' : 'Dark'}</span>
        </button>
        <button
          className="lang-pill"
          onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
          aria-label="Toggle language"
        >
          <span className={lang === 'es' ? 'on' : ''}>ES</span>
          <span className="sep">·</span>
          <span className={lang === 'en' ? 'on' : ''}>EN</span>
        </button>
      </nav>
    </header>
  );
}

// Portrait with Ken Burns animation
function Portrait({ ratio = '3/4', label = 'portrait' }) {
  return (
    <div className="portrait" style={{ aspectRatio: ratio }}>
      <img src="/photo_max_nobg.png" alt="Maximiliano Tissera" className="portrait-img" />
      <span className="portrait-tag">{label}</span>
    </div>
  );
}

export { SiteContext, useSite, CustomCursor, Reveal, LogoMark, TopBar, Portrait };
