import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';

const root = process.cwd();
const port = 4173;

createServer(async (request, response) => {
	const requestPath = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
	const relativePath = requestPath === '/' ? 'test/fixtures/browser/index.html' : requestPath.slice(1);
	const filePath = path.resolve(root, relativePath);

	if (!filePath.startsWith(`${root}${path.sep}`)) {
		response.writeHead(403).end('Forbidden');
		return;
	}

	try {
		const info = await stat(filePath);
		if (!info.isFile()) throw new Error('Not a file');
		response.setHeader('Content-Type', filePath.endsWith('.js') ? 'text/javascript' : 'text/html');
		createReadStream(filePath).pipe(response);
	} catch {
		response.writeHead(404).end('Not found');
	}
}).listen(port, '127.0.0.1', () => {
	console.log(`Browser fixture available at http://127.0.0.1:${port}`);
});
