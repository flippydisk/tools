# @flippydisk/tools

Small, framework-independent JavaScript utilities for browsers and Node.js. Version 2 uses native platform APIs, publishes ESM and CommonJS, and has no runtime dependencies.

## Requirements

- Node.js 22 or newer for Node consumers and development
- A modern browser with ES modules, `URLSearchParams`, and Fetch for browser use

The library has no React, Vue, Svelte, Next.js, or bundler dependency. Those tools consume the same package exports as plain JavaScript.

## Install

```sh
npm install @flippydisk/tools
```

## Debug

```js
import { Debug } from '@flippydisk/tools';

const debug = new Debug({
	debug: true,
	control: 'Application',
});

debug.log('Started');
debug.info('Ready');
debug.warn('Slow response');
debug.error('Request failed');
debug.debug({ state: 'active' });
debug.table([{ name: 'item' }]);
debug.trace('Trace point');
```

The direct ESM and CommonJS entry points preserve the established constructor shape:

```js
import Debug from '@flippydisk/tools/debug';
const { Debug } = require('@flippydisk/tools');
const DebugDirect = require('@flippydisk/tools/debug');
```

Set `debug: false` and activate a control from the browser URL:

```text
?debug=Application
?debug=All
?debug=Application&debug=AnotherControl
```

Explicit debugging works in Node.js and server-rendered applications without browser globals.

## Disable

`Disable` provides a small URL-controlled feature switch and is safe to construct in Node.js:

```js
import { Disable } from '@flippydisk/tools';

const feature = new Disable({ control: 'ExperimentalPanel' });
if (!feature.isDisabled()) {
	// Run the feature.
}
```

Use `?disable=ExperimentalPanel` to disable it in a browser, or pass `disable: true` explicitly.

## Fetch helper

`ajax` uses the platform Fetch implementation. It forwards request options and `AbortSignal`, parses JSON responses by content type, returns text for other content types, and returns `null` for empty responses.

```js
import { ajax } from '@flippydisk/tools/json';

const controller = new AbortController();
const data = await ajax('/api/items', undefined, {
	method: 'GET',
	signal: controller.signal,
});
```

HTTP failures reject with an `HTTPError` containing `status`, `statusText`, `url`, `response`, and parsed `data`. Network, abort, and malformed JSON errors also reject normally. An optional callback remains supported and its return value becomes the resolved result.

## Language utilities

```js
import * as Lang from '@flippydisk/tools/lang';

Lang.getPropertySafely({ user: { name: 'Ada' } }, 'user.name');
Lang.isNullish(value);
Lang.isValidObject(value);
```

`filterHTMLTags` strips tag-shaped text. It is not an HTML sanitizer and must not be used as a security boundary for untrusted markup.

## Native browser modules

Serve the ESM distribution from a valid module URL. Browsers do not resolve bare npm package names without an import map or bundler.

```html
<script type="module">
	import Debug from '/node_modules/@flippydisk/tools/dist/esm/debug/debug.js';

	const debug = new Debug({ debug: true, control: 'BrowserApp' });
	debug.log('Native browser module loaded');
</script>
```

Vite, Next.js, Rollup, webpack, React, Vue, and Svelte can use the package-name imports shown above.

## Development

```sh
npm run lint
npm run lint:fix
npm test
npm run build
npm run check
```

`npm run check` runs lint, tests, the build, package export tests, and an npm package dry run. Builds copy native ESM and use esbuild only for CommonJS compatibility.

## Documentation

The README, source comments, [migration guide](./MIGRATION.md), and [changelog](./CHANGELOG.md) are the maintained documentation in this repository. Longer-form project documentation belongs in the [GitHub Wiki](https://github.com/flippydisk/tools/wiki). The repository does not commit generated documentation websites.

## Releasing

Update the version locally without committing, tagging, pushing, or publishing:

```sh
npm run bump -- patch
```

The argument may be an npm version increment such as `major`, `minor`, `patch`, or `prerelease`, or an exact semantic version. Review the changed package files, update the changelog, run the required checks, and check the release into `main` normally.

Add the `NPM Release` label to a complete release pull request. After that pull request merges, `.github/workflows/publish.yml` checks out `main` and checks whether the version in `package.json` is available on npm. If it is already published, the workflow selects the next available patch version, updates `package.json`, `package-lock.json`, and the matching changelog heading, and commits that bump to `main`.

The workflow can also be dispatched manually from GitHub Actions with an exact version. From a clean local `main` that exactly matches `upstream/main`, this command dispatches that manual workflow for the version in `package.json`:

```sh
npm run release
```

Both paths repeat the complete validation for the selected version and refuse version mismatches or conflicting tags. The workflow then creates the matching Git tag and GitHub Release before publishing that version to npm. A rerun can finish npm publication when the workflow already created a matching release during an earlier attempt.

The npm package must configure `flippydisk/tools` and `publish.yml` as an npm trusted publisher with direct publishing enabled. An npm package owner can perform that one-time setup after this workflow exists on the default branch:

```sh
npm trust github @flippydisk/tools --repo flippydisk/tools --file publish.yml --allow-publish
```

The workflow uses GitHub OIDC rather than a long-lived npm token and npm automatically records provenance for the public package.
