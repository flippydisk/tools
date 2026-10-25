/**
 * Request JSON or text with the platform Fetch API.
 *
 * @param {string|URL|Request} endpoint Fetch-compatible request target.
 * @param {Function} cb Optional callback invoked with the parsed response body.
 * @param {RequestInit} options Fetch request options.
 * @return {Promise<unknown>} Parsed response data or the callback's return value.
 */
export default async function ajax(endpoint, cb, options = {}) {
	if (endpoint === undefined || endpoint === null || endpoint === '') {
		throw new TypeError('ajax requires an endpoint');
	}

	if (cb !== undefined && typeof cb !== 'function') {
		throw new TypeError(`ajax callback must be a function or undefined; received ${typeof cb}`);
	}

	if (typeof globalThis.fetch !== 'function') {
		throw new TypeError('ajax requires a global Fetch implementation');
	}

	const response = await globalThis.fetch(endpoint, options);
	const text = response.status === 204 ? '' : await response.text();
	let data = null;

	if (text !== '') {
		const contentType = response.headers.get('content-type') ?? '';
		data = contentType.includes('json') ? JSON.parse(text) : text;
	}

	if (!response.ok) {
		const error = new Error(`${response.status}: ${response.statusText || 'HTTP request failed'}`);
		error.name = 'HTTPError';
		error.status = response.status;
		error.statusText = response.statusText;
		error.url = response.url;
		error.response = response;
		error.data = data;
		throw error;
	}

	return cb ? cb(data) : data;
}
