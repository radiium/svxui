import fs from 'node:fs';
import { Project } from 'ts-morph';
import { ComponentGroupParser } from './lib/components/component-group-parser';
import { ComponentGroupMetadata } from './types';
import { logger } from './utils/logger';

// Configuration
const SRC_DIR = '/Users/amigamac/workspace/testapp/svelte/svxui/packages/svxui/dist/components'; // Répertoire source de votre projet
const OUTPUT_FILE = './component-metadata.json'; // Fichier de sortie

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
    const componentGroupsDir = fs.readdirSync(SRC_DIR); //
    // .filter((d) => d === 'accordion');
    // .filter((d) => d === 'badge');
    // .filter((d) => d === 'button');
    // .filter((d) => d === 'checkbox');
    // .filter((d) => d === 'dialog');
    // .filter((d) => d === 'flexbox');
    // .filter((d) => d === 'floating');
    // .filter((d) => d === 'input');
    // .filter((d) => d === 'input-group');
    // .filter((d) => d === 'input-number');
    // .filter((d) => d === 'input-range');
    //.filter((d) => d === 'link');
    // .filter((d) => d === 'panel');
    // .filter((d) => d === 'portal');
    // .filter((d) => d === 'radio');
    // .filter((d) => d === 'select');
    // .filter((d) => d === 'separator');
    // .filter((d) => d === 'switch');
    // .filter((d) => d === 'tabs');
    // .filter((d) => d === 'text');
    // .filter((d) => d === 'textarea');
    // .filter((d) => d === 'badge' || d === 'text');

    const componentGroups: ComponentGroupMetadata[] = componentGroupsDir
        .map((name) => {
            logger.lines(3);
            logger.blue(`> PROCESS GROUP => ${name}`);

            const group = new ComponentGroupParser(project, SRC_DIR, name);
            return group.metadata();
        })
        .sort((a, b) => a.name.localeCompare(b.name));

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(componentGroups, null, 2));
    console.log(`Generated metadata for ${componentGroups.length} components.`);
}
generateComponentsMetadata();
