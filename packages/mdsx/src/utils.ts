/* eslint-disable @typescript-eslint/no-explicit-any */
import { print } from 'esrap';
import path from 'node:path';
import 'vfile';
import { walk } from 'zimmerframe';
import { VFile } from 'vfile';
import { MDSX_BLUEPRINT_NAME, MDSX_COMPONENT_NAME } from './constants';
import { Blueprint, MDSXConfig, VFileDataType } from './types';

export function toPOSIX(joinedPath: string) {
    const a = performance.now();
    const isExtendedLengthPath = /^\\\\\?\\/.test(joinedPath);
    const hasNonAscii = /[^\0-\x80]+/.test(joinedPath);
    if (isExtendedLengthPath || hasNonAscii) {
        return joinedPath;
    }
    logPerf('toPOSIX', a);
    return joinedPath.replace(/\\/g, '/');
}

export function getRelativeFilePath(from: string, to: string) {
    const transformedA = path.resolve(from, '..');
    const relativePath = toPOSIX(path.relative(transformedA, to));
    if (!relativePath.startsWith('.')) {
        return `./${relativePath}`;
    }
    return relativePath;
}
export function extractNamedExports(ast: any) {
    const a = performance.now();
    const exportedComponentNames: string[] = [];
    const state = {};
    walk(ast.content, state, {
        ExportNamedDeclaration(node) {
            for (const specifier of node.specifiers) {
                exportedComponentNames.push(specifier.exported.name);
            }
        }
    });
    logPerf('extractNamedExports', a);
    return exportedComponentNames;
}

export function updateOrCreateSvelteInstance(ast: any, filePath: string, blueprintPath: string) {
    const a = performance.now();
    const importStatement = `import ${MDSX_BLUEPRINT_NAME}, * as ${MDSX_COMPONENT_NAME} from "${getRelativeFilePath(filePath, blueprintPath)}"`;
    if (!ast) {
        const content2 = `<script>${importStatement}</script>`;
        logPerf('updateOrCreateSvelteInstance', a);
        return {
            start: 0,
            end: 0,
            content: content2
        };
    }
    const { code } = print(ast.content);
    const content = `<script>
${importStatement}
${code}
</script>`;
    logPerf('updateOrCreateSvelteInstance', a);
    return {
        start: ast.start,
        end: ast.end,
        content
    };
}

export function updateOrCreateSvelteModule(ast: any, data: VFileDataType) {
    const a = performance.now();
    const metadataStr = JSON.stringify(data.matter);
    const exportStatement = `export const metadata = ${metadataStr};
`;
    const metadataKeys = Object.keys(data.matter);
    let metadataDeclaration: string | undefined = undefined;
    if (metadataKeys.length > 0) {
        metadataDeclaration = `const { ${metadataKeys.join(', ')} } = metadata;`;
    }
    const statement = exportStatement + (metadataDeclaration ?? '');
    if (!ast) {
        const content2 = `<script module>${statement}</script>`;
        logPerf('updateOrCreateSvelteModule', a);
        return {
            start: 0,
            end: 0,
            content: content2
        };
    }
    const { code } = print(ast.content);
    const content = `<script module>
${statement}
${code}
</script>`;
    logPerf('updateOrCreateSvelteModule', a);
    return {
        start: ast.start,
        end: ast.end,
        content
    };
}
export function getBlueprintData(file: VFile, config?: MDSXConfig): Blueprint | undefined {
    if (!config?.blueprints) return;
    const a = performance.now();
    const data = file.data as VFileDataType;
    const blueprintName = data.matter?.blueprint ?? 'default';
    if (blueprintName === false) return;
    if (typeof blueprintName !== 'string') {
        throw new Error(`The "blueprint" name in the frontmatter must be a string in "${file.path}"`);
    }
    const blueprint = config.blueprints[blueprintName];
    if (blueprint === void 0) {
        throw Error(`Blueprint "${blueprintName}" is not defined in the blueprint map in the MDSX config`);
    }
    logPerf('getBlueprintData', a);
    return Object.assign(blueprint, {
        name: blueprintName,
        remarkPlugins: blueprint.remarkPlugins ?? [],
        rehypePlugins: blueprint.rehypePlugins ?? []
    });
}

export function logPerf(name: string, startTime: number) {
    if (process.env?.MDSX_LOG_LEVEL === 'debug') {
        console.log(`${name}: `, performance.now() - startTime);
    }
}
