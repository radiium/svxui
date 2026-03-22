import { resolve } from 'path';
import { DocumentationGenerator } from 'svxui-docgen';

const LIBRARY_PATH = resolve(import.meta.dirname, '../../../packages/svxui');
const OUTPUT_PATH = resolve(import.meta.dirname, '../src/lib/content-utils/libdoc.json');

const generator = new DocumentationGenerator({
    libraryPath: LIBRARY_PATH,
    outputPath: OUTPUT_PATH
});

try {
    await generator.generate();
} catch (error) {
    console.error('❌ Error generating documentation:', error);
    process.exit(1);
}
