import { useEffect, useRef } from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';

const TAG_STYLE = [
  'display:inline-flex',
  'align-items:center',
  'gap:6px',
  'padding:4px 10px',
  'margin:8px 0',
  'border-radius:8px',
  'background:var(--ifm-color-emphasis-100)',
  'border:1px dashed var(--ifm-color-emphasis-300)',
  'cursor:pointer',
  'font-size:13px',
  'font-family:var(--ifm-font-family-monospace)',
  'user-select:all',
  'transition:background 0.15s',
].join(';');

const USED_KEY = 'push_invite_codes_used';

let codesCache: string[] | null = null;

async function loadCodes(): Promise<string[]> {
  if (codesCache) return codesCache;
  const res = await fetch('/invite-codes.json', { cache: 'no-store' });
  if (!res.ok) return [];
  const json = await res.json();
  codesCache = Array.isArray(json)
    ? json.filter((c: unknown) => typeof c === 'string')
    : [];
  return codesCache;
}

function randInt(max: number): number {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return arr[0] % max;
}

function pickCode(codes: string[]): string | null {
  if (codes.length === 0) return null;

  let used: Set<string>;
  try {
    const raw = localStorage.getItem(USED_KEY);
    used = new Set(raw ? JSON.parse(raw) : []);
  } catch {
    used = new Set();
  }

  let available = codes.filter((c) => !used.has(c));
  if (available.length === 0) {
    used.clear();
    localStorage.removeItem(USED_KEY);
    available = codes;
  }

  const picked = available[randInt(available.length)];
  used.add(picked);
  localStorage.setItem(USED_KEY, JSON.stringify([...used]));
  return picked;
}

function createTag(code: string): HTMLElement {
  const el = document.createElement('div');
  el.setAttribute('style', TAG_STYLE);
  el.setAttribute('title', 'Click to copy invite code');
  el.setAttribute('data-invite-code', 'true');
  el.textContent = `🎟️ Invite: ${code}`;
  el.addEventListener('click', () => {
    navigator.clipboard.writeText(code);
    el.textContent = '✅ Copied!';
    setTimeout(() => (el.textContent = `🎟️ Invite: ${code}`), 2000);
  });
  return el;
}

/**
 * Injects a random invite code tag into the content.
 * - Unique code per page (no repeats across tabs via localStorage)
 * - Placed randomly in the top ~70% of content elements
 * - Re-injects on SPA navigation (uses pathname as dep)
 */
export function useInjectInviteCode(
  containerRef: React.RefObject<HTMLElement | null>
) {
  const isBrowser = useIsBrowser();
  const pathname = isBrowser ? window.location.pathname : '';
  const elRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    // clean up previous injection
    elRef.current?.remove();
    elRef.current = null;

    let observer: MutationObserver | null = null;
    let done = false;

    async function inject() {
      if (done) return;

      // skip any previously injected tags when counting
      const spots = Array.from(
        root.querySelectorAll('p, h2, h3, li, blockquote')
      ).filter((el) => !el.hasAttribute('data-invite-code'));
      if (spots.length < 3) return;

      done = true;
      observer?.disconnect();

      const codes = await loadCodes();
      const code = pickCode(codes);
      if (!code) return;

      const upperBound = Math.max(2, Math.floor(spots.length * 0.7));
      const lower = 1; // never the very first element
      const idx = lower + randInt(Math.max(1, upperBound - lower));
      const target = spots[idx];

      const el = createTag(code);
      target.parentNode?.insertBefore(el, target);
      elRef.current = el;
    }

    observer = new MutationObserver(inject);
    observer.observe(root, { childList: true, subtree: true });
    inject();

    return () => {
      done = true;
      observer?.disconnect();
    };
  }, [containerRef, pathname]);

  // cleanup on unmount
  useEffect(() => {
    return () => elRef.current?.remove();
  }, []);
}
