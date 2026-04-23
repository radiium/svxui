/* eslint-disable no-console */
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

const SRC = 'src/lib';
const DIST = './dist';

const GROUPS = ['layouts', 'components', 'builders', 'attachments', 'utilities'];

function isDirectory(p) {
    return existsSync(p) && statSync(p).isDirectory();
}

function getSubDirs(dir) {
    return readdirSync(dir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
        .filter((name) => !name.startsWith('_'));
}

function entry(distPath) {
    return {
        types: `${distPath}/index.d.ts`,
        svelte: `${distPath}/index.js`,
        default: `${distPath}/index.js`
    };
}

// ---- load package.json
const pkgPath = resolve('package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

// ---- preserve manual exports
const preservedExports = {};
for (const [key, value] of Object.entries(pkg.exports ?? {})) {
    if (key === '.' || key.endsWith('.css') || key.includes('*')) {
        preservedExports[key] = value;
    }
}

const generatedExports = {};

// ---- generate sub-exports only (no group-level entry)
for (const group of GROUPS) {
    const srcGroupPath = join(SRC, group);

    if (!isDirectory(srcGroupPath)) continue;

    for (const name of getSubDirs(srcGroupPath)) {
        const key = `./${group}/${name}`;
        generatedExports[key] = entry(`${DIST}/${group}/${name}`);
        console.log('generated:', key);
    }
}

// ---- write back
pkg.exports = {
    ...preservedExports,
    ...generatedExports
};

writeFileSync(pkgPath, JSON.stringify(pkg, null, 4));
console.log('✅ exports generated :', Object.keys(generatedExports).length);
