import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const distEsmDir = path.join(rootDir, 'dist', 'esm');
const distCjsDir = path.join(rootDir, 'dist', 'cjs');

const shouldInclude = filePath => filePath.endsWith('.js')
    && !filePath.endsWith('.spec.js')
    && !filePath.endsWith('.mocks.js');

async function getSourceFiles(dir) {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const nested = await Promise.all(dirents.map(async dirent => {
        const resolved = path.join(dir, dirent.name);
        if (dirent.isDirectory()) {
            return getSourceFiles(resolved);
        }

        return shouldInclude(resolved) ? [resolved] : [];
    }));

    return nested.flat();
}

function rewriteRelativeSpecifiers(code, extension) {
    return code.replace(/(from\s+['"])(\.{1,2}\/[^'"]+?)(['"])/g, (match, before, specifier, after) => {
        if (path.extname(specifier)) return `${before}${specifier}${after}`;
        return `${before}${specifier}${extension}${after}`;
    });
}

function toEsm(code) {
    return rewriteRelativeSpecifiers(code, '.js');
}

function toCjs(code) {
    let output = rewriteRelativeSpecifiers(code, '.cjs');

    output = output.replace(/import\s+\*\s+as\s+([A-Za-z_$][\w$]*)\s+from\s+['"]([^'"]+)['"];?/g, 'const $1 = require("$2");');
    output = output.replace(/import\s+([A-Za-z_$][\w$]*)\s+from\s+['"]([^'"]+)['"];?/g, 'const $1 = require("$2");');

    output = output.replace(/export\s+default\s+class\s+([A-Za-z_$][\w$]*)/g, 'class $1');
    output = output.replace(/export\s+default\s+function\s+([A-Za-z_$][\w$]*)/g, 'function $1');

    const exportNames = [];
    const defaultClassMatch = code.match(/export\s+default\s+class\s+([A-Za-z_$][\w$]*)/);
    const defaultFunctionMatch = code.match(/export\s+default\s+function\s+([A-Za-z_$][\w$]*)/);
    const defaultIdentifierMatch = code.match(/export\s+default\s+([A-Za-z_$][\w$]*)\s*;?/);
    const namedExportMatch = code.match(/export\s*\{\s*([\s\S]*?)\s*\};?/m);

    if (namedExportMatch) {
        output = output.replace(/export\s*\{\s*[\s\S]*?\s*\};?/m, `module.exports = { ${namedExportMatch[1].replace(/\s+/g, ' ').trim()} };`);
        return output;
    }

    if (defaultClassMatch) {
        exportNames.push(defaultClassMatch[1]);
    } else if (defaultFunctionMatch) {
        exportNames.push(defaultFunctionMatch[1]);
    } else if (defaultIdentifierMatch && !defaultIdentifierMatch[0].includes('class') && !defaultIdentifierMatch[0].includes('function')) {
        output = output.replace(/export\s+default\s+([A-Za-z_$][\w$]*)\s*;?/g, 'module.exports = $1;\nmodule.exports.default = $1;');
        return output;
    }

    if (exportNames.length) {
        output += `\nmodule.exports = ${exportNames[0]};\nmodule.exports.default = ${exportNames[0]};\n`;
    }

    return output;
}

async function cleanDir(targetDir) {
    await fs.rm(targetDir, { recursive: true, force: true });
    await fs.mkdir(targetDir, { recursive: true });
}

async function writeBuild(filePath) {
    const relativePath = path.relative(srcDir, filePath);
    const esmTarget = path.join(distEsmDir, relativePath);
    const cjsTarget = path.join(distCjsDir, relativePath.replace(/\.js$/, '.cjs'));
    const code = await fs.readFile(filePath, 'utf8');

    await fs.mkdir(path.dirname(esmTarget), { recursive: true });
    await fs.mkdir(path.dirname(cjsTarget), { recursive: true });
    await fs.writeFile(esmTarget, toEsm(code));
    await fs.writeFile(cjsTarget, toCjs(code));
}

async function runBuild() {
    const files = await getSourceFiles(srcDir);

    await Promise.all([
        cleanDir(distEsmDir),
        cleanDir(distCjsDir),
    ]);

    await Promise.all(files.map(writeBuild));
}

runBuild().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
