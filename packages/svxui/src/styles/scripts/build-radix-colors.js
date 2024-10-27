import { copyFileSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { parse, resolve } from 'node:path';

/**
 * @param {string} inputDir
 * @param {string} radixDir
 * @param {string} outputDir
 */
export function buildRadixColors(inputDir, radixDir, outputDir) {
    console.log('Build radix colors');

    // Copy theme colors css
    copyFileSync(resolve(inputDir, 'colors.css'), resolve(outputDir, 'colors.css'));

    const inputDirColors = resolve(inputDir, 'colors');
    const outputDirColors = resolve(outputDir, 'colors');

    // Create output dir colors
    mkdirSync(outputDirColors);

    // Copy black and white alpha
    copyFileSync(resolve(radixDir, 'black-alpha.css'), resolve(outputDirColors, 'black-alpha.css'));
    copyFileSync(resolve(radixDir, 'white-alpha.css'), resolve(outputDirColors, 'white-alpha.css'));

    // Build radix colors css files
    readdirSync(inputDirColors)
        .filter((f) => f.includes('.css'))
        .map((file) => {
            const { name } = parse(file);
            return {
                file,
                name,
                base: resolve(inputDirColors, file),
                light: resolve(radixDir, `${name}.css`),
                lightA: resolve(radixDir, `${name}-alpha.css`),
                dark: resolve(radixDir, `${name}-dark.css`),
                darkA: resolve(radixDir, `${name}-dark-alpha.css`),
                output: resolve(outputDirColors, file)
            };
        })
        .forEach((data) => {
            writeFileSync(
                data.output,
                `
/*****************************************************************************/
/*                                                                           */
/* Svxui theme colors: ${data.name}                                                       */
/*                                                                           */
/* Credits: Radix colors                                                     */
/* https://www.radix-ui.com/                                                 */
/*                                                                           */
/*****************************************************************************/

/*
 * ${data.name} light
 */
${readFileSync(data.light)}

/*
 * ${data.name} alpha
 */
${readFileSync(data.lightA)}

/*
 * ${data.name} dark
 */
${readFileSync(data.dark)}

/*
 * ${data.name} dark alpha
 */
${readFileSync(data.darkA)}

/*
 * ${data.name} common
 */
${readFileSync(data.base)}
    `.trim()
            );
        });
}
