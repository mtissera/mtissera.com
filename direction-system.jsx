// Direction 2: System — monospace, modular, "architect's notebook" feel.
// Clean, luminous, technical. Hints of diagrams, coordinates, blueprint, but elegant.

import React, { useState, useEffect } from 'react';
import { useSite, Reveal, Portrait } from './shared.jsx';

function SystemView() {
  const { t, lang } = useSite();
  const [clock, setClock] = useState('');

  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const opts = { hour: '2-digit', minute: '2-digit', timeZone: 'America/Argentina/Cordoba', hour12: false };
      setClock(d.toLocaleTimeString(lang === 'es' ? 'es-AR' : 'en-US', opts));
    };
    fmt();
    const id = setInterval(fmt, 30000);
    return () => clearInterval(id);
  }, [lang]);

  return (
    <main className="dir-console">
      {/* Status strip */}
      <div className="cn-status">
        <span>● {lang === 'es' ? 'en línea' : 'online'}</span>
        <span>·</span>
        <span>CBA/AR · {clock}</span>
        <span>·</span>
        <span>{lang === 'es' ? 'abierto a conversar' : 'open to chat'}</span>
      </div>

      {/* Hero */}
      <section className="cn-hero">
        <div className="cn-hero-grid">
          <div className="cn-hero-meta">
            <div className="kv"><span className="k">file</span><span>index.html</span></div>
            <div className="kv"><span className="k">name</span><span>{t.name}</span></div>
            <div className="kv"><span className="k">role</span><span>{t.roleLong}</span></div>
            <div className="kv"><span className="k">loc</span><span>{t.location}</span></div>
            <div className="kv"><span className="k">lang</span><span>es · en</span></div>
          </div>

          <div className="cn-hero-title">
            <Reveal as="h1" className="cn-h1">
              <span className="cn-h-line"><span className="cn-bracket">[</span>{t.hero.h1a}<span className="cn-dot"> </span>{t.hero.h1b}<span className="cn-bracket">]</span></span>
              <span className="cn-h-line cn-h-alt">{t.hero.h1c} {t.hero.h1d}</span>
            </Reveal>
            <Reveal delay={200}><p className="cn-sub">{t.hero.sub}</p></Reveal>
          </div>

          {/* decorative "diagram" */}
          <div className="cn-diagram" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="cn-diagram-svg">
              <defs>
                <pattern id="cn-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M10 0 L0 0 0 10" fill="none" stroke="var(--ink-6)" strokeWidth="0.4" />
                </pattern>
              </defs>
              <rect width="200" height="200" fill="url(#cn-grid)" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="var(--accent)" strokeWidth="0.6" />
              <circle cx="100" cy="100" r="40" fill="none" stroke="var(--ink-4)" strokeWidth="0.6" strokeDasharray="2 2" />
              <circle cx="100" cy="100" r="3" fill="var(--accent)" />
              <line x1="100" y1="40" x2="100" y2="160" stroke="var(--ink-5)" strokeWidth="0.5" />
              <line x1="40" y1="100" x2="160" y2="100" stroke="var(--ink-5)" strokeWidth="0.5" />
              <text x="105" y="38" fontSize="6" fill="var(--ink-3)" fontFamily="var(--font-mono)">N</text>
              <text x="162" y="103" fontSize="6" fill="var(--ink-3)" fontFamily="var(--font-mono)">E</text>
              <text x="62" y="62" fontSize="5" fill="var(--accent)" fontFamily="var(--font-mono)">solutions</text>
              <text x="105" y="108" fontSize="5" fill="var(--ink-3)" fontFamily="var(--font-mono)">· you</text>
            </svg>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="cn-section" id="about">
        <div className="cn-section-head">
          <span className="cn-num">§01</span>
          <span className="cn-label">{t.about.label.toUpperCase()}</span>
          <span className="cn-rule" />
        </div>
        <div className="cn-about">
          <div className="cn-about-text">
            <Reveal><p className="cn-lead">{t.about.lead}</p></Reveal>
            {t.about.body.map((p, i) => (
              <Reveal key={i} delay={80 + i * 80}><p className="cn-body">{p}</p></Reveal>
            ))}
          </div>
          <Reveal delay={120} className="cn-about-side">
            <Portrait ratio="1/1" label={lang === 'es' ? 'retrato' : 'portrait'} />
          </Reveal>
        </div>
      </section>

      {/* Capabilities */}
      <section className="cn-section">
        <div className="cn-section-head">
          <span className="cn-num">§02</span>
          <span className="cn-label">{t.capabilities.label.toUpperCase()}</span>
          <span className="cn-rule" />
        </div>
        <div className="cn-caps">
          {t.capabilities.items.map((c, i) => (
            <Reveal key={c.k} delay={i * 60} className="cn-cap">
              <span className="cn-cap-k">/{c.k}</span>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="cn-section">
        <div className="cn-section-head">
          <span className="cn-num">§03</span>
          <span className="cn-label">{t.stack.label.toUpperCase()}</span>
          <span className="cn-rule" />
        </div>
        <div className="cn-stack">
          {t.stack.groups.map((g, gi) => (
            <Reveal key={g.t} delay={gi * 60} className="cn-stack-group">
              <div className="cn-stack-head">
                <span>{String(gi + 1).padStart(2, '0')}</span>
                <span>{g.t}</span>
              </div>
              <div className="cn-chips">
                {g.items.map(x => <span key={x} className="cn-chip" data-hover>{x}</span>)}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Off hours */}
      <section className="cn-section">
        <div className="cn-section-head">
          <span className="cn-num">§04</span>
          <span className="cn-label">{t.off.label.toUpperCase()}</span>
          <span className="cn-rule" />
        </div>
        <Reveal><p className="cn-lead narrow">{t.off.lead}</p></Reveal>
        <div className="cn-off">
          {t.off.items.map((x, i) => (
            <Reveal key={x.t} delay={i * 60} className="cn-off-row" data-hover>
              <span className="cn-off-n">{String(i + 1).padStart(2, '0')}</span>
              <span className="cn-off-t">{x.t}</span>
              <span className="cn-off-d">{x.d}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="cn-section">
        <div className="cn-section-head">
          <span className="cn-num">§05</span>
          <span className="cn-label">{t.contact.label.toUpperCase()}</span>
          <span className="cn-rule" />
        </div>
        <div className="cn-contact">
          <Reveal><p className="cn-lead">{t.contact.lead}</p></Reveal>
          <Reveal delay={120} className="cn-contact-grid">
            <a href={`mailto:${t.contact.email}`} className="cn-contact-card primary" data-hover>
              <span className="muted">email</span>
              <strong>{t.contact.email}</strong>
              <span className="arrow">→</span>
            </a>
            <a href={`https://${t.contact.linkedin}`} target="_blank" rel="noreferrer" className="cn-contact-card" data-hover>
              <span className="muted">linkedin</span>
              <strong>maximiliano-tissera</strong>
              <span className="arrow">↗</span>
            </a>
            <a href={`https://${t.contact.github}`} target="_blank" rel="noreferrer" className="cn-contact-card" data-hover>
              <span className="muted">github</span>
              <strong>mtissera</strong>
              <span className="arrow">↗</span>
            </a>
            <a href={`https://${t.contact.telegram}`} target="_blank" rel="noreferrer" className="cn-contact-card" data-hover>
              <span className="muted">telegram</span>
              <strong>@beloas</strong>
              <span className="arrow">↗</span>
            </a>
          </Reveal>
        </div>
      </section>

      <footer className="cn-footer">
        <span>{t.footer.copy}</span>
        <span className="muted">{t.footer.colophon}</span>
      </footer>
    </main>
  );
}

export { SystemView };
