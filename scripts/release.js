import { execFileSync, spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const repository = 'flippydisk/tools';
const { version } = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

function run(command, args) {
	return execFileSync(command, args, {
		encoding: 'utf8',
		stdio: ['ignore', 'pipe', 'inherit'],
	}).trim();
}

if (run('git', ['branch', '--show-current']) !== 'main') {
	throw new Error('Release dispatch must run from the main branch.');
}

if (run('git', ['status', '--porcelain']) !== '') {
	throw new Error('Release dispatch requires a clean working tree.');
}

run('git', ['fetch', 'upstream', 'main']);
const localCommit = run('git', ['rev-parse', 'HEAD']);
const upstreamCommit = run('git', ['rev-parse', 'upstream/main']);

if (localCommit !== upstreamCommit) {
	throw new Error('Local main must exactly match upstream/main before dispatching a release.');
}

const result = spawnSync('gh', [
	'workflow',
	'run',
	'publish.yml',
	'--repo',
	repository,
	'--ref',
	'main',
	'--field',
	`version=${version}`,
], {
	stdio: 'inherit',
});

if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);

console.log(`Dispatched the publish workflow for @flippydisk/tools@${version}.`);
