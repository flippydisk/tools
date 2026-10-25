# Modernization Progress

## Status

Current phase: Complete — Draft PR #14 is ready for review

Overall status: Implementation and validation complete on `modernization/v2`.

## Objectives

- [x] Modernize source, packaging, dependencies, tests, CI, and documentation.
- [x] Keep the package framework-independent with native browser, ESM, Node.js, and CommonJS support.
- [x] Preserve the established Debug API while correcting documented bugs.
- [x] Use native JavaScript, zero runtime dependencies, and minimal build tooling.
- [x] Validate the packed artifact and representative consumers.

## Phases

- [x] Phase 0 — Project instructions and progress tracking
- [x] Phase 1 — Audit and baseline
- [x] Phase 2 — Characterization and regression tests
- [x] Phase 3 — Debug modernization
- [x] Phase 4 — Disable and utility modernization
- [x] Phase 5 — JSON and Fetch redesign
- [x] Phase 6 — Dependency and test-tool modernization
- [x] Phase 7 — Build and package modernization
- [x] Phase 8 — Runtime and consumer compatibility
- [x] Phase 9 — Security review
- [x] Phase 10 — CI/CD and development scripts
- [x] Phase 11 — Documentation and migration guide
- [x] Phase 12 — Release-candidate verification and PR

## Audit and Utility Decisions

| Area | Decision | Result |
|---|---|---|
| Debug | Modernize | Preserved API; fixed SSR configuration, URL-wide activation, and `trace()` routing. |
| Disable | Modernize | Preserved API and URL behavior; removed browser-global requirement. |
| Ajax | Modernize | Uses native Fetch, forwards options, parses by content type, and rejects failures. |
| JSON promise/responder | Remove | Removed error-swallowing internal helpers and their public exports for 2.0. |
| Tests utility | Remove | Removed internal test helper from the production API. |
| `filterHTMLTags` | Keep/document | Retained tag stripping and explicitly documented that it is not sanitization. |
| `getPropertySafely` | Keep | Retained own-property traversal and prototype-safe lookup. |
| `getStringSafely` | Modernize | Retained coercion behavior and now returns `null` for circular or throwing objects. |
| Empty/null/type helpers | Simplify | Retained public distinctions; use native object, array, and number operations. |
| Build conversion | Replace | Native ESM copy plus esbuild-generated CommonJS entry points. |
| Documentation | Simplify | Removed DocumentJS, JSDoc, stale module guides, and generated HTML; maintain Markdown and use the GitHub Wiki for longer-form material. |

## Architectural Decisions

- Target 2.0.0 because request failures now reject, Node.js 22 is required, and obsolete public exports were removed.
- Publish the same framework-independent implementation to all consumers.
- Preserve direct CommonJS constructor/function shapes for Debug, Disable, and Ajax subpaths.
- Use explicit `.js` relative imports so the ESM distribution runs directly in Node.js and browsers.
- Use native `node:test` and controlled platform stubs; the library does not require DOM emulation.
- Ship only the runtime distribution, README, license, and package metadata in the npm tarball.

## Dependency Changes

- Removed `@swc/core`, `@swc/jest`, `cross-env`, Jest, jsdom/Jest DOM environment, fetch mocking, and raw-loader tooling.
- Added esbuild solely for CommonJS generation.
- Retained ESLint and globals at current supported versions.
- Reduced the installed dependency tree from approximately 570 packages to 114 packages.
- Runtime dependencies: zero.

## Public Compatibility and Breaking Changes

- Debug constructor options, methods, prefixes, arguments, activation modes, and return values remain supported.
- `Debug.trace()` intentionally calls `console.trace` instead of the prior accidental `console.log` fallback.
- Ajax HTTP, network, abort, and parsing failures reject rather than resolve error-shaped data.
- Ajax no longer forces a JSON request header and returns response text when content is not JSON.
- Removed `Tests`, `Json.promise`, `Json.responder`, and their package subpaths.
- Node.js support begins at version 22.

See `MIGRATION.md` and `CHANGELOG.md` for consumer guidance.

## Validation Results

- `npm run lint`: pass.
- `npm test`: pass, 19 tests with 98%+ aggregate line coverage before the final utility assertions.
- `npm run build`: pass.
- ESM root and subpath imports: pass.
- CommonJS root and direct subpath requires: pass.
- Actual npm tarball installation in an isolated project: pass for ESM and CommonJS root/debug imports.
- Native Chrome import from the real `dist/esm` files through an HTTP server: pass.
- Vite 7 production build: pass.
- Next.js 16 production build with server-side Debug construction: pass.
- `npm audit`: 0 known vulnerabilities.
- `npm pack --dry-run`: 28 files, 12.8 kB compressed, 73.2 kB unpacked.

## Files and Infrastructure

- Added durable instructions, this progress record, changelog, migration guide, native tests, consumer fixtures, and GitHub Actions.
- Reworked source modules, package exports, package scripts, ESLint, build output, and Markdown documentation.
- Removed obsolete DocumentJS and JSDoc configuration, generated HTML documentation, and stale per-module README files.
- Restored cross-platform `bump` and `release` commands; npm publication now runs through a manually dispatched or `NPM Release`-labeled pull request workflow with trusted publishing and provenance.
- Removed Travis CI, Jest/SWC configuration, internal test exports, old JSON error helpers, and shell release scripts.
- Incorporated the pre-existing user changes that removed runtime jsdom and updated the Jest DOM environment before Jest was removed.

## Known Issues

- The local Next.js fixture reports an expected workspace-root warning because it sits below the repository lockfile; its production build succeeds.
- The native browser check records a harmless missing-favicon request; the module fixture itself reports `pass` with no module error.
- Publication, tagging, merging, and release creation remain intentionally unperformed pending explicit approval.

## Next Action

Review draft PR #14. After approval, apply the `NPM Release` label and merge to publish through GitHub Actions; no merge, tag, or publication has been performed.
