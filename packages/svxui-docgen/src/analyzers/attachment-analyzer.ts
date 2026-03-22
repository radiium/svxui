import { Project } from 'ts-morph';
import { JSDocExtractor } from '../extractors/jsdoc-extractor.js';
import type { AttachmentDocumentation } from '../types.js';
import { BaseAnalyzer, type ModuleFilesResolver } from './base-analyzer.js';
import { AttachmentFilesResolver } from './module-resolvers.js';
import { PropsAnalyzer } from './props-analyzer.js';

/**
 * Attachment analyzer
 */
export class AttachmentAnalyzer extends BaseAnalyzer<AttachmentDocumentation | null> {
    constructor(project: Project, attachmentDir: string) {
        super(project, attachmentDir);
    }

    protected getModuleFilesResolver(): ModuleFilesResolver {
        return new AttachmentFilesResolver();
    }

    /**
     * Analyze attachment in the directory
     */
    analyze(): AttachmentDocumentation | null {
        const { name, fileName, filePath, typeName, typeFileName, typeFilePath } = this.resolveModuleFiles();

        // Find attachment file
        const attachmentFile = this.getSourceFile(filePath);
        if (!attachmentFile) {
            console.warn(`Warning: No ${fileName} found in ${this.moduleDir}`);
            return null;
        }

        // Find attachment types file
        const typesFile = this.getSourceFile(typeFilePath);
        if (!typesFile) {
            console.warn(`Warning: No ${typeFileName} found in ${this.moduleDir}`);
            return null;
        }

        // Find the Options type
        if (!typeName) {
            console.warn(`Warning: No typeName defined for ${name}`);
            return null;
        }

        const optionsType = typesFile.getTypeAlias(typeName);
        if (!optionsType) {
            console.warn(`Warning: Options type ${typeName} not found for ${name}`);
            return null;
        }

        // Analyze options using unified PropsAnalyzer
        const optionsAnalyzer = PropsAnalyzer.forAttachment(this.project, typesFile, optionsType);
        const { props: options } = optionsAnalyzer.analyze();

        // Extract JSDoc from options type
        const jsdocExtractor = new JSDocExtractor();
        const jsdoc = jsdocExtractor.extract(optionsType);

        return {
            category: 'attachment',
            name,
            filePath: this.getRelativePath(filePath),
            description: jsdoc.description,
            typeName,
            options,
            tags: jsdoc.tags
        };
    }
}
