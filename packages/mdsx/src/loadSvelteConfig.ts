import path3 from 'node:path';
import fs2 from 'node:fs';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { logPerf } from './utils';

// let __require = /* @__PURE__ */ ((x) =>
// 	typeof require !== 'undefined'
// 		? require
// 		: typeof Proxy !== 'undefined'
// 			? new Proxy(x, {
// 					get: (a, b) => (typeof require !== 'undefined' ? require : a)[b]
// 				})
// 			: x)(function (x) {
// 	if (typeof require !== 'undefined') return require.apply(this, arguments);
// 	throw Error('Dynamic require of "' + x + '" is not supported');
// });

const svelteConfigNames = ['svelte.config.js', 'svelte.config.cjs', 'svelte.config.mjs'];

export async function dynamicImportDefault(filePath: string, timestamp: number) {
    return await import(filePath + '?t=' + timestamp).then((m) => m.default);
}

export async function loadSvelteConfig(svelteConfigPath?: string | false) {
    if (svelteConfigPath === false) {
        return;
    }
    const a = performance.now();
    const configFile = findConfigToLoad(svelteConfigPath);
    if (configFile) {
        let err;
        if (configFile.endsWith('.js') || configFile.endsWith('.mjs')) {
            try {
                const result = await dynamicImportDefault(
                    pathToFileURL(configFile).href,
                    fs2.statSync(configFile).mtimeMs
                );
                if (result != null) {
                    logPerf('loadSvelteConfig', a);
                    return {
                        ...result,
                        configFile
                    };
                } else {
                    throw new Error(`invalid export in ${configFile}`);
                }
            } catch (e) {
                console.error(`failed to import config ${configFile}`, e);
                err = e;
            }
        }
        if (!configFile.endsWith('.mjs')) {
            try {
                const _require = createRequire(import.meta.url);
                // const _require = import.meta.url
                // 	? (esmRequire ?? (esmRequire = createRequire(import.meta.url)))
                // 	: __require;
                delete _require.cache[_require.resolve(configFile)];
                const result = _require(configFile);
                if (result != null) {
                    logPerf('loadSvelteConfig', a);
                    return {
                        ...result,
                        configFile
                    };
                } else {
                    throw new Error(`invalid export in ${configFile}`);
                }
            } catch (e) {
                console.error(`failed to require config ${configFile}`, e);
                if (!err) {
                    err = e;
                }
            }
        }
        throw err;
    }
}

export function findConfigToLoad(svelteConfigPath?: string | false) {
    const a = performance.now();
    const root = process.cwd();
    if (svelteConfigPath) {
        const absolutePath = path3.isAbsolute(svelteConfigPath)
            ? svelteConfigPath
            : path3.resolve(root, svelteConfigPath);
        if (!fs2.existsSync(absolutePath)) {
            throw new Error(`failed to find svelte config file ${absolutePath}.`);
        }
        logPerf('findConfigToLoad', a);
        return absolutePath;
    } else {
        const existingKnownConfigFiles = svelteConfigNames
            .map((candidate) => path3.resolve(root, candidate))
            .filter((file) => fs2.existsSync(file));
        if (existingKnownConfigFiles.length === 0) {
            console.debug(`no svelte config found at ${root}`, void 0, 'config');
            return;
        } else if (existingKnownConfigFiles.length > 1) {
            console.warn(
                `found more than one svelte config file, using ${existingKnownConfigFiles[0]}. you should only have one!`,
                existingKnownConfigFiles
            );
        }
        logPerf('findConfigToLoad', a);
        return existingKnownConfigFiles[0];
    }
}
