import { THEMES, THEME_STORAGE_KEY } from './index';

/**
 * Inline script for `<head>`, run before the first paint.
 *
 * The server has no way to know which theme this browser chose, so it renders
 * the default. Without this, a returning visitor who picked a non-default theme
 * would see a navy flash on every load while waiting for React to hydrate.
 *
 * It only sets an attribute — all the color blocks are already in the
 * stylesheet from `themeStyleSheet()`.
 *
 * Because this runs before hydration, `<html>` carries an attribute the server
 * did not render, which React reports as a mismatch. `suppressHydrationWarning`
 * on the `<html>` element in `app/layout.tsx` is what makes that legal; do not
 * remove it while this script exists.
 *
 * The stored value is checked against the live theme list, so an id left in
 * localStorage by a retired theme is ignored rather than applied as a
 * `data-theme` with no matching CSS block.
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
