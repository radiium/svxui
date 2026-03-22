import { Project, SourceFile, TypeAliasDeclaration } from 'ts-morph';
import { TypeAnalysisContext, type PropAnalysisOptions } from '../core/type-analysis-context.js';
import type { PropDocumentation } from '../types.js';

/**
 * Analysis result containing extracted properties
 */
export interface PropsAnalysisResult {
    props: PropDocumentation[];
}

/**
 * Unified property analyzer for components and attachments.
 * Replaces ComponentPropsAnalyzer and AttachmentOptionsAnalyzer.
 */
export class PropsAnalyzer {
    private readonly analysisContext: TypeAnalysisContext;
    private readonly typeAlias: TypeAliasDeclaration;
    private readonly options: PropAnalysisOptions;

    constructor(
        project: Project,
        typesFile: SourceFile,
        typeAlias: TypeAliasDeclaration,
        options: PropAnalysisOptions = {}
    ) {
        this.analysisContext = new TypeAnalysisContext(project, typesFile);
        this.typeAlias = typeAlias;
        this.options = options;
    }

    /**
     * Analyze the type alias and return properties
     */
    analyze(): PropsAnalysisResult {
        const props = this.analysisContext.analyzeTypeAlias(this.typeAlias, this.options);
        return { props };
    }

    /**
     * Factory: Create analyzer for component props
     */
    static forComponent(
        project: Project,
        typesFile: SourceFile,
        propsType: TypeAliasDeclaration
    ): PropsAnalyzer {
        return new PropsAnalyzer(project, typesFile, propsType, {
            extractDefaultFromJSDoc: false,
            markAsNonBindable: true,
            checkForSnippet: true
        });
    }

    /**
     * Factory: Create analyzer for attachment options
     */
    static forAttachment(
        project: Project,
        typesFile: SourceFile,
        optionsType: TypeAliasDeclaration
    ): PropsAnalyzer {
        return new PropsAnalyzer(project, typesFile, optionsType, {
            extractDefaultFromJSDoc: true,
            markAsNonBindable: false,
            checkForSnippet: false
        });
    }
}
