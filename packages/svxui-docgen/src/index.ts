import * as fs from 'node:fs';
import * as path from 'node:path';
import { AttachmentAnalyzer } from './analyzers/attachment-analyzer.js';
import { BuilderAnalyzer } from './analyzers/builder-analyzer.js';
import { ComponentAnalyzer } from './analyzers/component-analyzer.js';
import { UtilityAnalyzer } from './analyzers/utility-analyzer.js';
import { DocumentationBuilder } from './builders/documentation-builder.js';
import { DirectoryScanner } from './core/directory-scanner.js';
import { ProjectLoader } from './project-loader.js';
import type { LibraryDocumentation } from './types.js';

export type * from './types.js';

/**
 * Configuration for documentation generation
 */
export interface GeneratorConfig {
    /**
     * Library source directory to analyze
     */
    libraryPath: string;
    /**
     * Output file path (default: library-doc.json at library root)
     */
    outputPath?: string;
}

/**
 * Main documentation generator
 */
export class DocumentationGenerator {
    private config: Required<GeneratorConfig>;

    constructor(config: GeneratorConfig) {
        this.config = {
            libraryPath: path.resolve(config.libraryPath),
            outputPath: config.outputPath ?? path.join(config.libraryPath, 'library-doc.json')
        };
    }

    /**
     * Generate documentation
     */
    async generate(): Promise<LibraryDocumentation> {
        console.log(`Analyzing library at: ${this.config.libraryPath}`);

        // Load TypeScript project
        const projectLoader = new ProjectLoader(this.config.libraryPath);
        const project = projectLoader.load();

        // Initialize builder
        const builder = new DocumentationBuilder(this.config.libraryPath);

        // Find and analyze components
        const componentDirs = DirectoryScanner.forComponents(this.config.libraryPath);
        console.log(`Found ${componentDirs.length} component(s)`);

        for (const componentDir of componentDirs) {
            const analyzer = new ComponentAnalyzer(project, componentDir);
            const componentDocs = analyzer.analyze();

            for (const doc of componentDocs) {
                builder.addComponent(doc);
            }
        }

        // Find and analyze attachments
        const attachmentDirs = DirectoryScanner.forAttachments(this.config.libraryPath);
        console.log(`Found ${attachmentDirs.length} attachment(s)`);

        for (const attachmentDir of attachmentDirs) {
            const analyzer = new AttachmentAnalyzer(project, attachmentDir);
            const attachmentDoc = analyzer.analyze();

            if (attachmentDoc) {
                builder.addAttachment(attachmentDoc);
            }
        }

        // Find and analyze utilities
        const utilityDirs = DirectoryScanner.forUtilities(this.config.libraryPath);
        console.log(`Found ${utilityDirs.length} utility(ies)`);

        for (const utilityDir of utilityDirs) {
            const analyzer = new UtilityAnalyzer(project, utilityDir);
            const utilityDoc = analyzer.analyze();

            if (utilityDoc) {
                builder.addUtility(utilityDoc);
            }
        }

        // Find and analyze builders
        const builderDirs = DirectoryScanner.forBuilders(this.config.libraryPath);
        console.log(`Found ${builderDirs.length} builder(s)`);

        for (const builderDir of builderDirs) {
            const analyzer = new BuilderAnalyzer(project, builderDir);
            const builderDoc = analyzer.analyze();

            if (builderDoc) {
                builder.addBuilder(builderDoc);
            }
        }

        // Build final documentation
        const documentation = builder.build();

        // Write to file
        this.writeDocumentation(documentation);
        console.log(`Documentation generated at: ${this.config.outputPath}`);

        return documentation;
    }

    /**
     * Write documentation to file
     */
    private writeDocumentation(documentation: LibraryDocumentation): void {
        const json = JSON.stringify(documentation, null, 2);
        fs.writeFileSync(this.config.outputPath, json, 'utf-8');
    }
}
