# Migrating to 2.0

Version 2 modernizes error handling, supported runtimes, package exports, and development tooling. Debug's established API remains compatible.

## Runtime requirement

Node.js 22 or newer is required. Browser consumers need modern ES-module and Fetch support.

## Removed exports

The following internal or error-prone exports were removed:

- `@flippydisk/tools/tests` and the root `Tests` namespace
- `@flippydisk/tools/json/promise` and `Json.promise`
- `@flippydisk/tools/json/responder` and `Json.responder`

Application tests should use their own test framework. Handle request errors with ordinary Promise rejection and `try`/`catch`.

## Ajax behavior

Version 1 converted HTTP, network, and parsing failures into resolved error-shaped objects. Version 2 rejects failures:

```js
try {
	const data = await ajax('/api/items');
} catch (error) {
	if (error.name === 'HTTPError') {
		console.error(error.status, error.data);
	}
}
```

Additional changes:

- Uses `globalThis.fetch` rather than `window.fetch`.
- Does not force a JSON content-type header.
- Parses JSON according to the response content type and otherwise returns text.
- Returns `null` for empty responses.
- Forwards all Fetch options, including `AbortSignal`.
- Rejects invalid endpoints and callbacks with `TypeError`.

The optional callback signature remains available.

## Debug fixes

- Explicit Debug configuration works without `window` or `location`.
- Normal server construction no longer emits a missing-location error.
- `trace()` now calls `console.trace`.
- `?debug=All` takes precedence when repeated parameters also name a control.

Constructor options, methods, prefixes, argument forwarding, activation parameters, and method return values remain supported.

## Package contents

The npm package now contains the runtime distribution rather than source tests and generated website documentation. Supported root and subpath imports remain available for Debug, Disable, JSON Ajax, and Lang.
