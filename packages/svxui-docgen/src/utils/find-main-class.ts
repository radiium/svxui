import { SourceFile } from 'ts-morph';

/**
 * Find the main exported class
 */
export function findMainClass(file: SourceFile) {
    const classes = file.getClasses();

    // Find exported class
    for (const cls of classes) {
        if (cls.isExported()) {
            return cls;
        }
    }

    return null;
}
