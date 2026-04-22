// Direction 1: Editorial — serif-led, asymmetric, lots of whitespace

import React from 'react';
import { useSite, Reveal, Portrait } from './shared.jsx';

function EditorialView() {
  const { t, lang } = useSite();
  const year = new Date().getFullYear();

  return (
    <main className="dir-editorial">
      {/* Hero */}
      <section className="ed-hero">
        <div className="ed-hero-meta">
          <span className="rule" />
          <span>{t.hero.kicker}</span>
        </div>

        <h1 className="ed-h1">
          <Reveal as="span" className="ed-line" delay={0}>
            <em>{t.hero.h1a}</em> {t.hero.h1b}
          </Reveal>
          <Reveal as="span" className="ed-line indent" delay={120}>
            {t.hero.h1c} <em>{t.hero.h1d}</em>
          </Reveal>
        </h1>

        <div className="ed-hero-foot">
          <Reveal delay={240}>
            <p className="ed-sub">{t.hero.sub}</p>
          </Reveal>
          <Reveal delay={320} className="ed-stamp">
            <div className="stamp-row"><span className="muted">№</span><span>01</span></div>
            <div className="stamp-row"><span className="muted">{lang === 'es' ? 'Edición' : 'Issue'}</span><span>{year}</span></div>
            <div className="stamp-row"><span className="muted">{lang === 'es' ? 'Lugar' : 'Place'}</span><span>CBA · AR</span></div>
          </Reveal>
        </div>
      </section>

      {/* About with portrait */}
      <section className="ed-section">
        <div className="ed-section-head">
          <span className="section-num">I</span>
          <span className="section-label">— {t.about.label}</span>
        </div>

        <div className="ed-about">
          <Reveal className="ed-about-portrait">
            <Portrait ratio="3/4" label={lang === 'es' ? 'retrato · casual' : 'portrait · casual'} />
            <div className="portrait-caption">
              <span className="muted">{lang === 'es' ? 'Fig. 1' : 'Fig. 1'}</span>
              <span>{t.name}, {t.location}</span>
            </div>
          </Reveal>

          <div className="ed-about-text">
            <Reveal delay={100}><p className="ed-lead">{t.about.lead}</p></Reveal>
            {t.about.body.map((p, i) => (
              <Reveal key={i} delay={200 + i * 120}><p className="ed-body">{p}</p></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="ed-section">
        <div className="ed-section-head">
          <span className="section-num">II</span>
          <span className="section-label">— {t.capabilities.label}</span>
        </div>

        <div className="ed-caps">
          {t.capabilities.items.map((c, i) => (
            <Reveal key={c.k} delay={i * 80} className="ed-cap" as="article">
              <div className="ed-cap-k">{c.k}</div>
              <h3 className="ed-cap-t">{c.t}</h3>
              <p className="ed-cap-d">{c.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="ed-section">
        <div className="ed-section-head">
          <span className="section-num">III</span>
          <span className="section-label">— {t.stack.label}</span>
        </div>
        <div className="ed-stack">
          {t.stack.groups.map((g, i) => (
            <Reveal key={g.t} delay={i * 80} className="ed-stack-col">
              <div className="ed-stack-t">{g.t}</div>
              <ul>
                {g.items.map(x => <li key={x} data-hover>{x}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Off-hours */}
      <section className="ed-section ed-section-wide">
        <div className="ed-section-head">
          <span className="section-num">IV</span>
          <span className="section-label">— {t.off.label}</span>
        </div>
        <Reveal><p className="ed-lead narrow">{t.off.lead}</p></Reveal>
        <div className="ed-off">
          {t.off.items.map((x, i) => (
            <Reveal key={x.t} delay={i * 60} className="ed-off-item">
              <div className="ed-off-n">{String(i + 1).padStart(2, '0')}</div>
              <div>
                <h4>{x.t}</h4>
                <p>{x.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="ed-section">
        <div className="ed-section-head">
          <span className="section-num">V</span>
          <span className="section-label">— {t.contact.label}</span>
        </div>
        <Reveal><p className="ed-contact-lead">{t.contact.lead}</p></Reveal>
        <div className="ed-contact">
          <a href={`mailto:${t.contact.email}`} className="ed-contact-primary" data-hover>
            <span>{t.contact.email}</span>
            <span className="arrow">↗</span>
          </a>
          <div className="ed-contact-links">
            <a href={`https://${t.contact.linkedin}`} target="_blank" rel="noreferrer" data-hover>LinkedIn ↗</a>
            <a href={`https://${t.contact.github}`} target="_blank" rel="noreferrer" data-hover>GitHub ↗</a>
            <a href={`https://${t.contact.telegram}`} target="_blank" rel="noreferrer" data-hover>Telegram ↗</a>
          </div>
        </div>
      </section>

      <footer className="ed-footer">
        <span>{t.footer.copy}</span>
        <span className="muted">{t.footer.colophon}</span>
      </footer>
    </main>
  );
}

export { EditorialView };
