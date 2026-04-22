import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { SiteContext, CustomCursor, TopBar } from './shared.jsx';
import { EditorialView } from './direction-editorial.jsx';
import { SystemView } from './direction-system.jsx';
import { ModularView } from './direction-modular.jsx';
import { SITE_CONTENT } from './content.js';
import './styles.css';

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "direction": "modular",
  "language": "en",
  "font": "serif",
  "theme": "dark",
  "logo": "mt"
}/*EDITMODE-END*/;

function App() {
  const [direction, setDirection] = useState(TWEAK_DEFAULTS.direction);
  const [lang, setLang]           = useState(TWEAK_DEFAULTS.language);
  const [font, setFont]           = useState(TWEAK_DEFAULTS.font);
  const [theme, setTheme]         = useState(TWEAK_DEFAULTS.theme || 'light');
  const [logo, setLogo]           = useState(TWEAK_DEFAULTS.logo || 'mt');

  useEffect(() => {
    document.documentElement.setAttribute('data-font', font);
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('lang', lang);
  }, [font, lang, theme]);

  useEffect(() => {
    const onMsg = (e) => {
      const d = e.data || {};
      if (d.type === '__activate_edit_mode' || d.type === '__deactivate_edit_mode') {
        // controls are always visible; no-op
      }
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const push = (edits) => {
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
  };

  const setDirPersist   = (v) => { setDirection(v); push({ direction: v }); };
  const setLangPersist  = (v) => { setLang(v);      push({ language: v }); };
  const setFontPersist  = (v) => { setFont(v);      push({ font: v }); };
  const setThemePersist = (v) => { setTheme(v);     push({ theme: v }); };
  const setLogoPersist  = (v) => { setLogo(v);      push({ logo: v }); };

  const t = SITE_CONTENT[lang];

  return (
    <SiteContext.Provider value={{ lang, t, direction, font, theme }}>
      <CustomCursor direction={direction} />
      <TopBar
        direction={direction} setDirection={setDirPersist}
        lang={lang} setLang={setLangPersist}
        font={font} setFont={setFontPersist}
        theme={theme} setTheme={setThemePersist}
        logo={logo} setLogo={setLogoPersist}
      />
      {direction === 'editorial' && <EditorialView />}
      {direction === 'console'   && <SystemView />}
      {direction === 'modular'   && <ModularView />}
    </SiteContext.Provider>
  );
}

if (matchMedia('(pointer: coarse)').matches) document.body.classList.add('touch');

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
