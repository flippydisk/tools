# Changelog

## 2.0.0

### Changed

- Require Node.js 22 or newer.
- Replace Jest, SWC, and DOM test infrastructure with native `node:test`.
- Replace handwritten regular-expression module conversion with native ESM copying and esbuild CommonJS output.
- Make Ajax use the global Fetch API and reject HTTP, network, abort, and parsing failures.
- Parse response bodies by content type and support empty responses.
- Separate non-mutating lint from `lint:fix` and add a comprehensive `check` command.
- Reduce npm package contents to the runtime distribution.

### Fixed

- Make Debug and Disable safe without browser globals.
- Route `Debug.trace()` through `console.trace`.
- Correct URL-wide Debug activation when repeated parameters are present.
- Avoid duplicate string conversion work in `isEmptyString`.

### Removed

- Remove the public internal `Tests` namespace and `@flippydisk/tools/tests` export.
- Remove `Json.promise`, `Json.responder`, and their subpath exports.
- Remove Travis CI and legacy shell release scripts.
- Replace the legacy workstation publisher with cross-platform local versioning and an OIDC-backed GitHub Actions npm release workflow.
- Remove the unused DocumentJS configuration, JSDoc generator, stale module guides, and generated `docs/` website in favor of maintained Markdown and the GitHub Wiki.
- Remove all runtime dependencies.
