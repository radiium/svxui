import { SourceFile } from 'ts-morph';

/**
 * Find the main exported function
 */
export function findMainFunction(file: SourceFile) {
    const functions = file.getFunctions();

    // Find exported function
    for (const func of functions) {
        if (func.isExported()) {
            return func;
        }
    }

    return null;
}
