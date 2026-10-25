import { build } from 'esbuild';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = path.join(rootDir, 'src');
const esmDir = path.join(rootDir, 'dist', 'esm');
const cjsDir = path.join(rootDir, 'dist', 'cjs');

const commonJsEntries = [
	{ source: 'index.js', output: 'index.cjs' },
	{ source: 'debug/debug.js', output: 'debug/debug.cjs', unwrapDefault: true },
	{ source: 'disable/disable.js', output: 'disable/disable.cjs', unwrapDefault: true },
	{ source: 'json/json.js', output: 'json/json.cjs' },
	{ source: 'json/ajax.js', output: 'json/ajax.cjs', unwrapDefault: true },
	{ source: 'lang/lang.js', output: 'lang/lang.cjs' },
];

async function copyEsm(source = sourceDir, target = esmDir) {
	const entries = await fs.readdir(source, { withFileTypes: true });

	await Promise.all(entries.map(async entry => {
		const sourcePath = path.join(source, entry.name);
		const targetPath = path.join(target, entry.name);

		if (entry.isDirectory()) {
			if (entry.name === 'tests') return;
			await copyEsm(sourcePath, targetPath);
			return;
		}

		if (!entry.name.endsWith('.js') || entry.name.endsWith('.spec.js') || entry.name.endsWith('.mocks.js')) return;
		await fs.mkdir(target, { recursive: true });
		await fs.copyFile(sourcePath, targetPath);
	}));
}

async function buildCommonJs({ source, output, unwrapDefault = false }) {
	const outputPath = path.join(cjsDir, output);

	await fs.mkdir(path.dirname(outputPath), { recursive: true });
	await build({
		bundle: true,
		entryPoints: [path.join(sourceDir, source)],
		format: 'cjs',
		logLevel: 'warning',
		outfile: outputPath,
		platform: 'neutral',
		target: 'es2022',
	});

	if (unwrapDefault) {
		await fs.appendFile(outputPath, '\nmodule.exports = module.exports.default;\nmodule.exports.default = module.exports;\n');
	}
}

await fs.rm(path.join(rootDir, 'dist'), { recursive: true, force: true });
await Promise.all([
	copyEsm(),
	...commonJsEntries.map(buildCommonJs),
]);
