import { useCallback, useEffect, useState } from 'react';

/**
 * Hash asosidagi oddiy router: #/<tab>/<sub>
 * Masalan: #/course/rsa, #/classical/vigenere, #/quiz
 * Statik hostingda (GitHub Pages, Netlify) server sozlamasiz ishlaydi,
 * brauzerning "Orqaga" tugmasi va havolalarni ulashish qo'llab-quvvatlanadi.
 */
function parse(hash) {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
  return { tab: parts[0] || 'home', sub: parts[1] || null };
}

export function buildHash(tab, sub) {
  if (!tab || tab === 'home') return '#/';
  return `#/${encodeURIComponent(tab)}${sub ? `/${encodeURIComponent(sub)}` : ''}`;
}

export default function useHashRoute() {
  const [route, setRoute] = useState(() => parse(window.location.hash));

  useEffect(() => {
    const onChange = () => {
      setRoute(parse(window.location.hash));
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const navigate = useCallback((tab, sub = null) => {
    const next = buildHash(tab, sub);
    if (window.location.hash === next || (next === '#/' && !window.location.hash)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.location.hash = next;
  }, []);

  return [route, navigate];
}
