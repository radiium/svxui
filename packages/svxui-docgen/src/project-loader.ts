import * as fs from 'node:fs';
import * as path from 'node:path';
import { Project } from 'ts-morph';

/**
 * Project loader using ts-morph
 */
export class ProjectLoader {
    private libraryPath: string;

    constructor(libraryPath: string) {
        this.libraryPath = libraryPath;
    }

    /**
     * Load TypeScript project
     */
    load(): Project {
        const tsconfigPath = this.findTsConfig();

        const project = new Project({
            tsConfigFilePath: tsconfigPath,
            skipAddingFilesFromTsConfig: false,
            compilerOptions: {
                declaration: true,
                emitDeclarationOnly: false,
                skipLibCheck: true
            }
        });

        // Ensure all source files are added
        const srcPath = path.join(this.libraryPath, 'src');
        if (fs.existsSync(srcPath)) {
            project.addSourceFilesAtPaths(`${srcPath}/**/*.ts`);
            project.addSourceFilesAtPaths(`${srcPath}/**/*.svelte`);
        }

        return project;
    }

    /**
     * Find tsconfig.json
     */
    private findTsConfig(): string {
        const candidates = [
            path.join(this.libraryPath, 'tsconfig.json'),
            path.join(this.libraryPath, 'tsconfig.app.json'),
            path.join(this.libraryPath, 'tsconfig.lib.json')
        ];

        for (const candidate of candidates) {
            if (fs.existsSync(candidate)) {
                return candidate;
            }
        }

        throw new Error(`tsconfig.json not found in library path: ${this.libraryPath}`);
    }
}
