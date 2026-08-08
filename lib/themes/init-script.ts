import { THEMES, THEME_STORAGE_KEY } from './index';

/**
 * Inline script for `<head>`, run before the first paint.
 *
 * The server has no way to know which theme this browser chose, so it renders
 * the default. Without this, a returning Spider-Man visitor would see a navy
 * flash on every load while waiting for React to hydrate.
 *
 * It only sets an attribute — all the color blocks are already in the
 * stylesheet from `themeStyleSheet()`. And because it mutates <html>, which
 * React does not own, it causes no hydration mismatch.
 */
export function themeInitScript(): string {
  const ids = THEMES.map((theme) => theme.id);

  return (
    `(function(){try{` +
    `var v=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});` +
    `if(v&&${JSON.stringify(ids)}.indexOf(v)>-1)` +
    `document.documentElement.setAttribute('data-theme',v);` +
    `}catch(e){}})()`
  );
}
