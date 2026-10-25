# Flippydisk Tools project instructions

Flippydisk Tools is a general-purpose, framework-independent JavaScript utility library for browsers and Node.js. It publishes native ESM and CommonJS output and should have no runtime dependencies whenever practical.

At the beginning of work in this repository, read `AGENTS.local.md` if it exists. It contains optional, git-ignored workstation-specific context. Never fail a task merely because that file is absent.

Before editing code, read this repository's `eslint.config.js` and follow the applicable rules while writing JavaScript, tests, and tooling. Reading the rules does not change when lint jobs should run; follow the validation timing below.

Every agent working in this repository, including delegated agents, must apply the lint rules from the first edit. Reading the configuration without following it is insufficient. The current configuration requires tabs for indentation, semicolons, multiline trailing commas where appropriate, and the other rules declared in `eslint.config.js`.

Before handing off an edit, review the diff against the applicable rules, including newly written test callbacks. Do not weaken lint rules, add suppression comments, or rely on a later autofix pass to make newly written code conform. If work is delegated, include these requirements in the task and review the returned changes against them. An explicit request to fix lint failures authorizes the lint runs needed to verify that fix, without authorizing check-in.

## Architecture and compatibility

- Use JavaScript. Prefer `.js`; use `.cjs` only where CommonJS requires it and avoid `.mjs` unless technically justified.
- Prefer modern native JavaScript, clear code, and minimal abstractions.
- Do not introduce framework-specific dependencies, unnecessary polyfills, Babel, or heavy transformation pipelines.
- Keep imports safe when `window`, `document`, `navigator`, `location`, or other browser globals are unavailable.
- Support native browser modules, Node.js ESM, CommonJS, and standards-compliant frameworks and bundlers through the same library implementation.
- Treat `Debug` as a critical compatibility contract. Preserve its documented constructor, options, methods, prefixes, argument handling, activation rules, and return values unless the user explicitly approves a breaking change.
- Preserve other documented public APIs and package exports unless a breaking change is intentional, approved, and documented.
- Prefer zero runtime dependencies. Use current supported development dependencies and remove obsolete tooling rather than retaining it only to avoid refactoring.
- Test the actual built and packed package, including root and public subpath exports. Do not rely only on source imports.
- `filterHTMLTags` performs tag stripping, not secure HTML sanitization. Never describe or use it as a security boundary.
- Reuse existing utilities and data flows when they remain clear and correct. Avoid premature abstraction.

## Quality requirements

- Add or update `node:test` tests whenever behavior changes.
- New functionality requires meaningful tests. Aim for coverage as close to 100% as practical and keep changed-file coverage above 90% where possible.
- Protect Debug with regression tests covering browser URL activation, Node.js/SSR initialization, all console methods, prefixes, arguments, and return values.
- Keep browser-specific tests separate from pure Node.js tests.
- Keep passing test output free of unintended console logs, warnings, and errors. When a test intentionally triggers logging, use a test-scoped spy or replacement, assert the expected output when practical, and restore the original method in reliable cleanup. Do not suppress console output globally.
- Do not weaken tests to accommodate implementation or dependency changes.
- During implementation, write or update the required tests but do not run tests, lint jobs, builds, package checks, or consumer builds. Run validation only when the work is ready for the check-in process, unless the user explicitly requests an earlier validation run. Avoid repeated validation while code is still changing.
- Before check-in, run `npm run check`. When packaging, export resolution, browser behavior, or runtime compatibility changes, also run the relevant native-browser, tarball-install, Vite, and Next.js consumer checks.
- When a change cannot affect runtime code or build inputs, the full build and test suite may be skipped. Run the focused validation appropriate to the changed documentation or tooling before committing.
- Review `npm audit`, package contents, and runtime dependency count when dependencies or packaging change.

## Working conventions

- Search the repository for existing or similar functionality before implementing a task.
- Inspect existing code and tests before changing behavior. Preserve unrelated worktree changes.
- Update documentation when behavior changes and document every intentional breaking change in the changelog and migration guide.
- Read `MODERNIZATION_PROGRESS.md` when modernization work remains unfinished and update it after significant stages.
- Do not create a Git branch, commit changes, push changes, or open a pull request unless the user explicitly asks. In an IDE or other local development session, a request to implement or handle an issue or task does not authorize any of those actions. Keep changes local so the user can preview them and wait for an explicit “check in,” “ship,” or equivalent instruction.
- The sole exception is remote development initiated from, or explicitly working on, a GitHub issue when the user has no shared IDE or local workspace in which to preview changes. In that remote issue workflow, authenticated repository access plus a request to implement the issue authorizes a feature branch, commits, a push, and a review pull request. Never push directly to `main` or merge without explicit instruction.
- A request to “check in,” “ship,” or equivalent wording authorizes committing completed changes, pushing the feature branch, and creating or updating the pull request. Complete the required validation first, link the originating issue with a closing keyword, and leave the pull request unmerged unless explicitly told to merge.
- Do not publish to npm, create release tags or GitHub releases, merge pull requests, or create persistent external services without explicit approval.
- Applying or retaining the `NPM Release` label means the pull request is a complete npm release. Before adding it, synchronize the intended package version, lockfile, changelog, and release documentation and complete the required validation. Merging a pull request with that label selects the intended version when it is available, or commits the next available patch version to `main`, then creates the GitHub tag and release and publishes the package.
- After opening or updating a pull request, do not wait for or repeatedly poll remote checks. Complete required local validation before check-in, then hand off the pull request and mention checks that remain pending.
- Keep commits coherent and reviewable. Do not include temporary files, generated local consumer output, credentials, or unrelated changes.
- When asked to clean up branches, compare local and `origin` branches with the latest `main`. Always keep `main`. Keep any branch whose work is not incorporated into `main`; delete only branches whose changes are already present in `main`.
- Treat other projects and development environments on a shared machine as hands-off. Do not inspect, reuse, modify, move, delete, or disclose unrelated repositories, credentials, configuration, caches, logs, or running processes. If ownership or purpose is ambiguous, stop and ask.
- Do not put secrets, tokens, credentials, private connection strings, or workstation-specific details in this file or `AGENTS.local.md`. Use ignored environment files or an appropriate secret manager.
- Issues and pull requests for this project live in `flippydisk/tools` on GitHub. The local `origin` may be a fork; verify remotes before performing explicitly authorized GitHub operations.
