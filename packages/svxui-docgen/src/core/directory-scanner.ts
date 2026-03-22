import * as fs from 'node:fs';
import * as path from 'node:path';

/**
 * Validation function to check if a directory is valid for analysis
 */
export type DirectoryValidator = (dirPath: string, dirName: string) => boolean;

/**
 * Configuration for directory scanning
 */
export interface DirectoryScannerConfig {
    /** Base path to scan */
    basePath: string;
    /** Category name for logging */
    categoryName: string;
    /** Function to validate each directory */
    validator: DirectoryValidator;
}

/**
 * Pre-built validators for common patterns
 */
export const DirectoryValidators = {
    /**
     * Validates directory has a types.ts file
     */
    hasTypesFile: (dirPath: string): boolean => {
        return fs.existsSync(path.join(dirPath, 'types.ts'));
    },

    /**
     * Validates directory has a specific file pattern
     * @param pattern - File pattern with {name} placeholder
     */
    hasFile:
        (pattern: string): DirectoryValidator =>
        (dirPath: string, dirName: string): boolean => {
            const fileName = pattern.replace('{name}', dirName);
            return fs.existsSync(path.join(dirPath, fileName));
        },

    /**
     * Combines multiple validators with AND logic
     */
    all:
        (...validators: DirectoryValidator[]): DirectoryValidator =>
        (dirPath: string, dirName: string): boolean => {
            return validators.every((v) => v(dirPath, dirName));
        }
};

/**
 * Scans directories for analysis targets.
 * Replaces the duplicate findXxxDirectories() methods.
 */
export class DirectoryScanner {
    /**
     * Scan a base path for valid module directories
     */
    static scan(config: DirectoryScannerConfig): string[] {
        const { basePath, categoryName, validator } = config;

        if (!fs.existsSync(basePath)) {
            console.warn(`Warning: ${categoryName} directory not found: ${basePath}`);
            return [];
        }

        const dirs: string[] = [];
        const entries = fs.readdirSync(basePath, { withFileTypes: true });

        for (const entry of entries) {
            if (entry.isDirectory()) {
                const dirPath = path.join(basePath, entry.name);
                if (validator(dirPath, entry.name)) {
                    dirs.push(dirPath);
                }
            }
        }

        return dirs;
    }

    /**
     * Pre-configured scanner for components (has types.ts)
     */
    static forComponents(libraryPath: string): string[] {
        return this.scan({
            basePath: path.join(libraryPath, 'src/lib/components'),
            categoryName: 'Components',
            validator: DirectoryValidators.hasTypesFile
        });
    }

    /**
     * Pre-configured scanner for attachments (has types.ts)
     */
    static forAttachments(libraryPath: string): string[] {
        return this.scan({
            basePath: path.join(libraryPath, 'src/lib/attachments'),
            categoryName: 'Attachments',
            validator: DirectoryValidators.hasTypesFile
        });
    }

    /**
     * Pre-configured scanner for utilities (has {name}.svelte.ts)
     */
    static forUtilities(libraryPath: string): string[] {
        return this.scan({
            basePath: path.join(libraryPath, 'src/lib/utilities'),
            categoryName: 'Utilities',
            validator: DirectoryValidators.hasFile('{name}.svelte.ts')
        });
    }

    /**
     * Pre-configured scanner for builders (has {name}-builder.svelte.ts)
     */
    static forBuilders(libraryPath: string): string[] {
        return this.scan({
            basePath: path.join(libraryPath, 'src/lib/builders'),
            categoryName: 'Builders',
            validator: DirectoryValidators.hasFile('{name}-builder.svelte.ts')
        });
    }
}
