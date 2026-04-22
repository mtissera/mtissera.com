// Direction 3: Modular — hero reworked; no name; interactive hover type

import React from 'react';
import { useSite, Reveal, Portrait } from './shared.jsx';

function HoverType({ text, mode = 'lift', className = '' }) {
  const parts = React.useMemo(() => {
    let idx = 0;
    return text.split(' ').map((word, wi) => ({
      wi,
      chars: Array.from(word).map(c => ({ c, i: idx++ })),
    }));
  }, [text]);
  const n = text.replace(/ /g, '').length;
  return (
    <span className={`htype htype-${mode} ${className}`} aria-label={text}>
      {parts.map(({ wi, chars }) => (
        <React.Fragment key={wi}>
          {wi > 0 && ' '}
          <span className="htype-word">
            {chars.map(({ c, i }) => (
              <span
                key={i}
                className="htype-char"
                style={{ '--i': i, '--n': n }}
                aria-hidden="true"
              >{c}</span>
            ))}
          </span>
        </React.Fragment>
      ))}
    </span>
  );
}

function ModularView() {
  const { t, lang } = useSite();
  const [hoverMode, setHoverMode] = React.useState(() => {
    try { return localStorage.getItem('mt_hover_mode') || 'lift'; } catch { return 'lift'; }
  });
  const setHover = (m) => { setHoverMode(m); try { localStorage.setItem('mt_hover_mode', m); } catch {} };

  const line1 = lang === 'es' ? 'Haz que las' : 'Make things';
  const line2 = lang === 'es' ? 'cosas pasen' : 'happen';

  const modes = [
    { k: 'lift',   label: lang === 'es' ? 'Elevar' : 'Lift' },
    { k: 'stagger', label: lang === 'es' ? 'Escalonado' : 'Stagger' },
    { k: 'color',  label: lang === 'es' ? 'Color'  : 'Color' },
    { k: 'split',  label: lang === 'es' ? 'Dividir' : 'Split' },
  ];

  return (
    <main className="dir-modular">
      {/* Hero: statement + mode picker */}
      <section className="md-hero">
        <div className="md-hero-top">
          <span className="md-hero-kicker">{t.hero.kicker}</span>
          <div className="md-hover-picker" role="tablist" aria-label="Hover effect">
            <span className="md-hover-picker-label">{lang === 'es' ? 'Efecto ·' : 'Hover ·'}</span>
            {modes.map(m => (
              <button
                key={m.k}
                className={`md-hover-chip ${hoverMode === m.k ? 'on' : ''}`}
                onClick={() => setHover(m.k)}
              >{m.label}</button>
            ))}
          </div>
        </div>

        <Reveal as="h1" className="md-statement">
          <span className="md-statement-line">
            <HoverType text={line1} mode={hoverMode} />
          </span>
          <span className="md-statement-line md-statement-alt">
            <HoverType text={line2} mode={hoverMode} />
            <span className="md-dot">.</span>
          </span>
        </Reveal>

        <div className="md-hero-grid">
          <Reveal delay={80} className="md-card md-card-lead">
            <div className="md-card-label">{lang === 'es' ? 'Resumen' : 'Summary'}</div>
            <p>{t.hero.sub}</p>
          </Reveal>

          <Reveal delay={140} className="md-card md-card-role">
            <div className="md-card-label">{lang === 'es' ? 'Rol actual' : 'Current role'}</div>
            <div className="md-role-title">{t.roleShort}</div>
            <div className="md-role-sub">Escala 24x7</div>
            <div className="md-badge-row">
              <span className="md-badge md-badge-accent">★ {t.badges.ambassador}</span>
            </div>
          </Reveal>

          <Reveal delay={200} className="md-card md-card-loc">
            <div className="md-card-label">{lang === 'es' ? 'Base' : 'Based in'}</div>
            <div className="md-big">CBA</div>
            <div className="md-role-sub">Córdoba · AR · GMT-3</div>
          </Reveal>

          <Reveal delay={260} className="md-card md-card-portrait">
            <Portrait ratio="1/1" label={lang === 'es' ? 'retrato' : 'portrait'} />
          </Reveal>

          <Reveal delay={320} className="md-card md-card-years">
            <div className="md-card-label">{lang === 'es' ? 'Certificaciones AWS' : 'AWS Certifications'}</div>
            <ul className="md-certs">
              <li><span className="md-cert-k">SAP</span> <span>{t.badges.sap}</span></li>
              <li><span className="md-cert-k">SAA</span> <span>{t.badges.saa}</span></li>
            </ul>
            <div className="md-role-sub">{lang === 'es' ? 'Vigentes · 15+ años en la industria' : 'Active · 15+ years in the industry'}</div>
          </Reveal>

          <Reveal delay={380} className="md-card md-card-status">
            <div className="md-card-label">{lang === 'es' ? 'Contacto' : 'Contact'}</div>
            <a href="mailto:me@mtissera.com" className="md-status" data-hover>
              <span className="md-dot-live" /> me@mtissera.com
            </a>
          </Reveal>
        </div>
      </section>

      {/* About */}
      <section className="md-section">
        <header className="md-section-head">
          <span className="md-tag">{lang === 'es' ? '01 · Perfil' : '01 · Profile'}</span>
          <h2 className="md-section-title">
            <HoverType text={t.about.label} mode={hoverMode} />
          </h2>
        </header>
        <div className="md-about">
          <Reveal><p className="md-lead">{t.about.lead}</p></Reveal>
          <div className="md-about-body">
            {t.about.body.map((p, i) => (
              <Reveal key={i} delay={i * 80}><p>{p}</p></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="md-section">
        <header className="md-section-head">
          <span className="md-tag">{lang === 'es' ? '02 · Capacidades' : '02 · Capabilities'}</span>
          <h2 className="md-section-title">
            <HoverType text={t.capabilities.label} mode={hoverMode} />
          </h2>
        </header>
        <div className="md-caps">
          {t.capabilities.items.map((c, i) => (
            <Reveal key={c.k} delay={i * 60} className="md-cap" data-hover>
              <div className="md-cap-top">
                <span className="md-cap-k">{c.k}</span>
                <span className="md-cap-arrow">↗</span>
              </div>
              <h3><HoverType text={c.t} mode={hoverMode} /></h3>
              <p>{c.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="md-section">
        <header className="md-section-head">
          <span className="md-tag">{lang === 'es' ? '03 · Ecosistema' : '03 · Ecosystem'}</span>
          <h2 className="md-section-title">
            <HoverType text={t.stack.label} mode={hoverMode} />
          </h2>
        </header>
        <div className="md-stack">
          {t.stack.groups.map((g, gi) => (
            <Reveal key={g.t} delay={gi * 60} className="md-stack-group">
              <div className="md-stack-title">
                <span className="md-stack-n">{String(gi + 1).padStart(2, '0')}</span>
                <span>{g.t}</span>
              </div>
              <ul className="md-stack-list">
                {g.items.map(x => (
                  <li key={x} data-hover>
                    <HoverType text={x} mode={hoverMode} />
                    <span className="md-stack-plus">+</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Off hours */}
      <section className="md-section md-section-off">
        <header className="md-section-head">
          <span className="md-tag">{lang === 'es' ? '04 · Intereses' : '04 · Interests'}</span>
          <h2 className="md-section-title">
            <HoverType text={t.off.label} mode={hoverMode} />
          </h2>
        </header>
        <Reveal><p className="md-lead">{t.off.lead}</p></Reveal>
        <div className="md-off">
          {t.off.items.map((x, i) => (
            <Reveal key={x.t} delay={i * 60} className={`md-off-card md-off-${i}`} data-hover>
              <div className="md-off-label">/{String(i + 1).padStart(2, '0')}</div>
              <h3><HoverType text={x.t} mode={hoverMode} /></h3>
              <p>{x.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="md-section md-contact-section">
        <header className="md-section-head">
          <span className="md-tag">{lang === 'es' ? '05 · Contacto' : '05 · Contact'}</span>
          <h2 className="md-section-title">
            <HoverType text={t.contact.label} mode={hoverMode} />
          </h2>
        </header>
        <Reveal className="md-contact-card">
          <p className="md-contact-lead">{t.contact.lead}</p>
          <a href={`mailto:${t.contact.email}`} className="md-contact-email" data-hover>
            <HoverType text={t.contact.email} mode={hoverMode} /> <span>→</span>
          </a>
          <div className="md-contact-links">
            <a href={`https://${t.contact.linkedin}`} target="_blank" rel="noreferrer" data-hover>LinkedIn ↗</a>
            <a href={`https://${t.contact.github}`} target="_blank" rel="noreferrer" data-hover>GitHub ↗</a>
            <a href={`https://${t.contact.kit}`} target="_blank" rel="noreferrer" data-hover>Kit ↗</a>
            <a href={`https://${t.contact.soundcloud}`} target="_blank" rel="noreferrer" data-hover>SoundCloud ↗</a>
          </div>
        </Reveal>
      </section>

      <footer className="md-footer">
        <span className="md-footer-mark">M/T</span>
        <span>{t.footer.copy}</span>
        <span className="muted">{t.footer.colophon}</span>
      </footer>
    </main>
  );
}

export { ModularView };
