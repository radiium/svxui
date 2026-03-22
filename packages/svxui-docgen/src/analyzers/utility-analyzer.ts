import { Project } from 'ts-morph';
import { GenericsExtractor } from '../core/generics-extractor.js';
import { JSDocExtractor } from '../extractors/jsdoc-extractor.js';
import type { UtilityDocumentation } from '../types.js';
import { generateDTS } from '../utils/dts-helpers.js';
import { findMainClass } from '../utils/find-main-class.js';
import { findMainFunction } from '../utils/find-main-function.js';
import { highlight } from '../utils/highlight.js';
import { BaseAnalyzer, type ModuleFilesResolver } from './base-analyzer.js';
import { UtilityFilesResolver } from './module-resolvers.js';

/**
 * Utility analyzer
 */
export class UtilityAnalyzer extends BaseAnalyzer<UtilityDocumentation | null> {
    private readonly genericsExtractor: GenericsExtractor;

    constructor(project: Project, utilityDir: string) {
        super(project, utilityDir);
        this.genericsExtractor = new GenericsExtractor();
    }

    protected getModuleFilesResolver(): ModuleFilesResolver {
        return new UtilityFilesResolver();
    }

    /**
     * Analyze utility in the directory
     */
    analyze(): UtilityDocumentation | null {
        const { name, fileName, filePath, typeFileName, typeFilePath } = this.resolveModuleFiles();

        // Find utility file
        const utilityFile = this.getSourceFile(filePath);
        if (!utilityFile) {
            console.warn(`Warning: No ${fileName} found in ${this.moduleDir}`);
            return null;
        }

        // Find utility types file (optional)
        const typesFile = this.getSourceFile(typeFilePath);
        if (!typesFile) {
            console.warn(`Warning: No ${typeFileName} found in ${this.moduleDir}`);
        }

        // Find the main exported function or class
        const utilityDeclaration = findMainFunction(utilityFile) ?? findMainClass(utilityFile);
        if (!utilityDeclaration) {
            console.warn(`Warning: No exported function or class found in ${filePath}`);
            return null;
        }

        const className = utilityDeclaration.getName() ?? 'Unknown';
        const classDef = highlight(generateDTS(utilityDeclaration.getText(), `${name}.ts`));
        const typeDef = highlight(typesFile?.getFullText());

        // Extract generics
        const generics = this.genericsExtractor.extract(utilityDeclaration);

        // Find the Options type name
        const optionsTypeName = GenericsExtractor.getOptionsTypeName(className);

        // Extract JSDoc
        const jsdocExtractor = new JSDocExtractor();
        const jsdoc = jsdocExtractor.extract(utilityDeclaration);

        return {
            category: 'utility',
            name,
            filePath: this.getRelativePath(filePath),
            description: jsdoc.description,
            className,
            classDef,
            generics: generics.length > 0 ? generics : undefined,
            typeName: optionsTypeName,
            typeDef,
            typeSource: this.getRelativePath(typeFilePath),
            tags: jsdoc.tags
        };
    }
}
