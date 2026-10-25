import { spawnSync } from 'node:child_process';

const requestedVersion = process.argv[2] ?? 'patch';
const versionOptions = process.argv.slice(3);
const validVersions = /^(major|minor|patch|premajor|preminor|prepatch|prerelease|from-git|v?\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?)$/;
const validOption = /^--preid=[0-9A-Za-z.-]+$/;

if (requestedVersion === '--help' || requestedVersion === '-h') {
	console.log('Usage: npm run bump -- <major|minor|patch|premajor|preminor|prepatch|prerelease|from-git|version> [--preid=name]');
	console.log('Defaults to patch. Updates package files locally without committing, tagging, pushing, or publishing.');
	process.exit(0);
}

if (!validVersions.test(requestedVersion)) {
	console.error(`Invalid version: ${requestedVersion}`);
	process.exit(1);
}

if (!versionOptions.every(option => validOption.test(option))) {
	console.error(`Invalid version option: ${versionOptions.join(' ')}`);
	process.exit(1);
}

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const result = spawnSync(npmCommand, ['version', requestedVersion, '--no-git-tag-version', ...versionOptions], {
	stdio: 'inherit',
});

if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);

console.log('Version files updated locally. Review and check in the release changes before running npm run release.');
