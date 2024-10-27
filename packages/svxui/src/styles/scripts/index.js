import { resolve } from 'node:path';
import { buildRadixColors } from './build-radix-colors.js';
import { buildScss } from './build-scss.js';
import { clean } from './clean.js';

const outputDir = resolve(import.meta.dirname, '../../lib/styles/');

/**
 * Clean output dirs
 */
clean(outputDir);

/**
 * Build radix colors css
 */
const inputDirColors = resolve(import.meta.dirname, '../radix-colors');
const radixDirColors = resolve(import.meta.dirname, '../../../node_modules/@radix-ui/colors');
buildRadixColors(inputDirColors, radixDirColors, outputDir);
/**
 * Build scss
 */
const inputDirScss = resolve(import.meta.dirname, '../scss');
buildScss(inputDirScss, outputDir);
