import { Project, SourceFile } from 'ts-morph';
import { SourceFileContext } from '../core/source-file-context.js';

/**
 * Configuration for module file resolution.
 * Each analyzer type defines its own naming conventions.
 */
export interface ModuleFilesConfig {
    /** Base name derived from directory name */
    name: string;
    /** Main implementation file name */
    fileName: string;
    /** Full path to implementation file */
    filePath: string;
    /** Type definition file name */
    typeFileName: string;
    /** Full path to type definition file */
    typeFilePath: string;
    /** Expected type name in types file */
    typeName?: string;
}

/**
 * Strategy for resolving module files.
 * Implement this interface for each analyzer type.
 */
export interface ModuleFilesResolver {
    resolve(moduleDir: string): ModuleFilesConfig;
}

/**
 * Abstract base class for all analyzers.
 * Provides common source file operations and extensibility points.
 */
export abstract class BaseAnalyzer<TResult> {
    protected readonly context: SourceFileContext;
    protected readonly project: Project;
    protected readonly moduleDir: string;

    constructor(project: Project, moduleDir: string) {
        this.project = project;
        this.context = new SourceFileContext(project);
        this.moduleDir = moduleDir;
    }

    /**
     * Main entry point - template method pattern
     */
    abstract analyze(): TResult;

    /**
     * Get module files configuration - override for custom naming
     */
    protected abstract getModuleFilesResolver(): ModuleFilesResolver;

    /**
     * Resolve module files using the configured resolver
     */
    protected resolveModuleFiles(): ModuleFilesConfig {
        return this.getModuleFilesResolver().resolve(this.moduleDir);
    }

    /**
     * Get source file by path
     */
    protected getSourceFile(filePath: string): SourceFile | undefined {
        return this.context.getSourceFile(filePath);
    }

    /**
     * Get relative path from library root
     */
    protected getRelativePath(filePath: string): string {
        return this.context.getRelativePath(filePath);
    }
}
