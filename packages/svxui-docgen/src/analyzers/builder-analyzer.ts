import { Project } from 'ts-morph';
import { GenericsExtractor } from '../core/generics-extractor.js';
import { JSDocExtractor } from '../extractors/jsdoc-extractor.js';
import type { BuilderDocumentation } from '../types.js';
import { generateDTS } from '../utils/dts-helpers.js';
import { findMainClass } from '../utils/find-main-class.js';
import { highlight } from '../utils/highlight.js';
import { BaseAnalyzer, type ModuleFilesResolver } from './base-analyzer.js';
import { BuilderFilesResolver } from './module-resolvers.js';

/**
 * Builder analyzer
 */
export class BuilderAnalyzer extends BaseAnalyzer<BuilderDocumentation | null> {
    private readonly genericsExtractor: GenericsExtractor;

    constructor(project: Project, builderDir: string) {
        super(project, builderDir);
        this.genericsExtractor = new GenericsExtractor();
    }

    protected getModuleFilesResolver(): ModuleFilesResolver {
        return new BuilderFilesResolver();
    }

    /**
     * Analyze builder in the directory
     */
    analyze(): BuilderDocumentation | null {
        const { name, fileName, filePath, typeFileName, typeFilePath } = this.resolveModuleFiles();

        // Find builder file
        const builderFile = this.getSourceFile(filePath);
        if (!builderFile) {
            console.warn(`Warning: No ${fileName} found in ${this.moduleDir}`);
            return null;
        }

        // Find builder types file (optional)
        const typesFile = this.getSourceFile(typeFilePath);
        if (!typesFile) {
            console.warn(`Warning: No ${typeFileName} found in ${this.moduleDir}`);
        }

        // Find the main exported class
        const builderClass = findMainClass(builderFile);
        if (!builderClass) {
            console.warn(`Warning: No exported class found in ${filePath}`);
            return null;
        }

        const className = builderClass.getName() ?? 'Unknown';

        // Build class definitions
        const classDef = highlight(generateDTS(builderClass.getText(), `${name}.ts`));
        const typeDef = highlight(typesFile?.getFullText());

        // Extract generics from class
        const generics = this.genericsExtractor.extract(builderClass);

        // Find the Options type name
        const optionsTypeName = GenericsExtractor.getOptionsTypeName(className);

        // Extract JSDoc from class
        const jsdocExtractor = new JSDocExtractor();
        const jsdoc = jsdocExtractor.extract(builderClass);

        return {
            category: 'builder',
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
