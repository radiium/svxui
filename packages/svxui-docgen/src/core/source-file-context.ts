import * as path from 'node:path';
import { Project, SourceFile } from 'ts-morph';

/**
 * Context for source file operations within a ts-morph Project.
 * Provides consistent file resolution and path operations.
 */
export class SourceFileContext {
    constructor(private readonly project: Project) {}

    /**
     * Get the library root directory from the project
     */
    getLibraryRoot(): string {
        return this.project.getRootDirectories()[0]?.getPath() ?? '';
    }

    /**
     * Get a source file by absolute path
     */
    getSourceFile(filePath: string): SourceFile | undefined {
        return this.project.getSourceFile(filePath);
    }

    /**
     * Get path relative to library root
     */
    getRelativePath(filePath: string): string {
        return path.relative(this.getLibraryRoot(), filePath);
    }

    /**
     * Resolve a module specifier to a source file
     */
    resolveModuleSpecifier(fromFile: SourceFile, moduleSpecifier: string): SourceFile | undefined {
        // Handle relative imports
        if (moduleSpecifier.startsWith('.')) {
            const currentDir = fromFile.getDirectoryPath();
            const resolvedPath = path.resolve(currentDir, moduleSpecifier);
            return (
                this.project.getSourceFile(resolvedPath + '.ts') ||
                this.project.getSourceFile(resolvedPath)
            );
        }

        // Handle $lib alias
        if (moduleSpecifier.startsWith('$lib/')) {
            const libPath = moduleSpecifier.replace('$lib/', 'src/lib/');
            for (const sf of this.project.getSourceFiles()) {
                if (sf.getFilePath().includes(libPath)) {
                    return sf;
                }
            }
        }

        return undefined;
    }
}
