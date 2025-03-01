import * as glob from 'glob';
import importSync from 'import-sync';
import fs from 'node:fs';
import path from 'node:path';
import { Project, SourceFile } from 'ts-morph';
import { ComponentGroupMetadata } from '../../types';
import { extractSharedTypeMetadata } from '../../utils/extract-shared-type-metadata';
import { logger } from '../../utils/logger';
import { sortByNameWithPriority } from '../../utils/sorter';
import { ComponentParser } from './component-parser';

export class ComponentGroupParser {
    public sourceFileComponents: SourceFile[] = [];
    public sourceFileType: SourceFile | null;
    public defaultPropsModule: Record<string, any> | null = null;

    get groupDir(): string {
        return `${this.rootDir}/${this.groupName}`;
    }

    constructor(
        public readonly project: Project,
        public readonly rootDir: string,
        public readonly groupName: string
    ) {
        this.sourceFileComponents = this.#resolveSourceFileComponents();
        this.sourceFileType = this.#resolveSourceFileType();
        this.defaultPropsModule = this.#resolveDefaultProps();
    }

    metadata(): ComponentGroupMetadata {
        const components = this.sourceFileComponents
            .map((sourceFile) => {
                const component = new ComponentParser(
                    sourceFile,
                    this.sourceFileType,
                    this.defaultPropsModule
                );
                return component.metadata();
            })
            .sort(sortByNameWithPriority);

        const { sharedTypes, sharedTypesText } = extractSharedTypeMetadata(this.sourceFileType, components);

        return {
            name: this.groupName,
            components,
            sharedTypes: sharedTypes.sort((a, b) => a.name.localeCompare(b.name)),
            sharedTypesText
        };
    }

    /**
     * Resolve source files of components
     * @returns
     */
    #resolveSourceFileComponents(): SourceFile[] {
        return glob
            .sync(`${this.groupDir}/components/*.d.ts`)
            .map((componentFilePath) => this.#resolveSourceFile(componentFilePath))
            .filter((value) => value !== null);
    }

    /**
     * Resolve source file of shared types
     * @returns
     */
    #resolveSourceFileType(): SourceFile | null {
        const filePathResolved = path.resolve(this.groupDir, 'types.d.ts');
        return this.#resolveSourceFile(filePathResolved);
    }

    /**
     * Resolve shared default props
     * @param dirname
     * @returns
     */
    #resolveDefaultProps(): Record<string, any> | null {
        const filePathResolved = path.resolve(this.groupDir, 'props.js');

        try {
            if (fs.existsSync(filePathResolved)) {
                return importSync(filePathResolved);
            }
        } catch (err) {
            logger.error(
                `[ERROR][ComponentGroupParser] resolveDefaultProps, file not fount at ${filePathResolved}`
            );
            logger.error(`[ERROR][ComponentGroupParser] resolveDefaultProps`, err);
        }
        return null;
    }

    /**
     * Resolve any source file
     * @param filePath
     * @returns
     */
    #resolveSourceFile(filePath: string) {
        if (fs.existsSync(filePath)) {
            return this.project.addSourceFileAtPath(filePath);
        }
        return null;
    }
}
