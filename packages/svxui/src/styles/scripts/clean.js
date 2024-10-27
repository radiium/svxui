import { existsSync, mkdirSync, rmSync } from 'node:fs';

/**
 * @param {string} outputDir
 */
export function clean(outputDir) {
    if (existsSync(outputDir)) {
        rmSync(outputDir, { recursive: true });
    }
    mkdirSync(outputDir);
}
