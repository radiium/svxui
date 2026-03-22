import * as path from 'node:path';
import type { ModuleFilesConfig, ModuleFilesResolver } from './base-analyzer.js';
import { toPascalCase } from '../utils/to-pascal-case.js';

/**
 * Resolver for attachment modules: {name}.svelte.ts + types.ts
 * Type name convention: {PascalName}Options
 */
export class AttachmentFilesResolver implements ModuleFilesResolver {
    resolve(moduleDir: string): ModuleFilesConfig {
        const name = path.basename(moduleDir);
        return {
            name,
            fileName: `${name}.svelte.ts`,
            filePath: path.join(moduleDir, `${name}.svelte.ts`),
            typeFileName: 'types.ts',
            typeFilePath: path.join(moduleDir, 'types.ts'),
            typeName: `${toPascalCase(name)}Options`
        };
    }
}

/**
 * Resolver for builder modules: {name}-builder.svelte.ts + types.ts
 * Type name derived from class name + Options
 */
export class BuilderFilesResolver implements ModuleFilesResolver {
    resolve(moduleDir: string): ModuleFilesConfig {
        const name = path.basename(moduleDir);
        return {
            name,
            fileName: `${name}-builder.svelte.ts`,
            filePath: path.join(moduleDir, `${name}-builder.svelte.ts`),
            typeFileName: 'types.ts',
            typeFilePath: path.join(moduleDir, 'types.ts')
            // typeName determined dynamically from class name
        };
    }
}

/**
 * Resolver for utility modules: {name}.svelte.ts + types.ts
 * Type name derived from class/function name + Options
 */
export class UtilityFilesResolver implements ModuleFilesResolver {
    resolve(moduleDir: string): ModuleFilesConfig {
        const name = path.basename(moduleDir);
        return {
            name,
            fileName: `${name}.svelte.ts`,
            filePath: path.join(moduleDir, `${name}.svelte.ts`),
            typeFileName: 'types.ts',
            typeFilePath: path.join(moduleDir, 'types.ts')
            // typeName determined dynamically from class/function name
        };
    }
}

/**
 * Resolver for component modules: components/*.svelte + types.ts
 */
export class ComponentFilesResolver implements ModuleFilesResolver {
    resolve(moduleDir: string): ModuleFilesConfig {
        const name = path.basename(moduleDir);
        return {
            name,
            fileName: '', // Components have multiple .svelte files
            filePath: path.join(moduleDir, 'components'),
            typeFileName: 'types.ts',
            typeFilePath: path.join(moduleDir, 'types.ts')
        };
    }
}
