import fs from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Project } from 'ts-morph';
import { ComponentGroupParser } from './lib/components/component-group-parser';
import { ComponentGroupMetadata } from './types';
import { logger } from './utils/logger';

// Configuration
const _DIRNAME = dirname(fileURLToPath(import.meta.url));
const COMPONENTS_SRC_DIR = join(_DIRNAME, '../../svxui/dist/components');
const OUTPUT_FILE = join(_DIRNAME, '../../svxui-docs/src/lib/content-utils/component-metadata.json');

/**
 * Main
 *
 * Read components directories
 * and build metadata json for each components
 */
function generateComponentsMetadata() {
    const project = new Project({
        tsConfigFilePath: './tsconfig.json'
    });

    // Find components directories
    const componentGroupsDir = fs.readdirSync(COMPONENTS_SRC_DIR);

    const componentGroups: ComponentGroupMetadata[] = componentGroupsDir
        .map((name) => {
            logger.lines(3);
            logger.blue(`> PROCESS GROUP => ${name}`);

            const group = new ComponentGroupParser(project, COMPONENTS_SRC_DIR, name);
            return group.metadata();
        })
        .sort((a, b) => a.name.localeCompare(b.name));

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(componentGroups, null, 2), {});
    console.log(`Generated metadata for ${componentGroups.length} components.`);
}

generateComponentsMetadata();
