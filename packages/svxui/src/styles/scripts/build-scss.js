import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { compile } from 'sass';

/**
 * @param {string} inputDir
 * @param {string} outputDir
 */
export function buildScss(inputDir, outputDir) {
    console.log('Build scss');
    const inputScss = resolve(inputDir, 'index.scss');
    const outputCss = resolve(outputDir, 'index.css');

    const index = compile(inputScss);
    writeFileSync(outputCss, index.css);
}
