# Modernization Notes

## What changed
- Removed Babel and legacy Babel config
- Replaced the build step with a lightweight Node-based build script at `scripts/build.js`
- Added prebuilt dual outputs in `dist/esm` and `dist/cjs`
- Upgraded package metadata to publish modern ESM and CommonJS entry points
- Replaced legacy ESLint config with `eslint.config.js` using ESLint 9 flat config
- Updated Jest to use `@swc/jest`
- Removed the old root `index.js` shim that pointed at generated files before the build ran

## Source fixes included
- `src/debug/debug.js` now safely checks for `window` before reading it
- `src/json/ajax.js` now passes `promise(signature, response, true)` in the correct argument order

## Build outputs
- `dist/esm/**` contains ESM `.js` files
- `dist/cjs/**` contains CommonJS `.cjs` files

## Local verification to run
```bash
npm install
npm run lint
npm test
npm run build
```


Additional compatibility fix:
- Updated legacy Jest specs to stop using the removed global `jsdom.reconfigure(...)` pattern.
- Tests now set `window.location.search` via `window.history.replaceState(...)`, which works with modern `jest-environment-jsdom`.
