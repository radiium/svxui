import { IntersectionTypeNode, Node, Project, SourceFile, TypeAliasDeclaration } from 'ts-morph';
import { JSDocExtractor } from '../extractors/jsdoc-extractor.js';
import type { JSDocTag, PropDocumentation } from '../types.js';
import { TypeResolver } from '../analyzers/type-resolver.js';
import { SourceFileContext } from './source-file-context.js';

/**
 * Customization options for property analysis
 */
export interface PropAnalysisOptions {
    /** Extract @default tag from JSDoc (used for options, not component props) */
    extractDefaultFromJSDoc?: boolean;
    /** Mark all props as non-bindable (components handle bindable via Svelte analysis) */
    markAsNonBindable?: boolean;
    /** Check for Snippet types */
    checkForSnippet?: boolean;
}

const DEFAULT_OPTIONS: PropAnalysisOptions = {
    extractDefaultFromJSDoc: false,
    markAsNonBindable: true,
    checkForSnippet: true
};

/**
 * Context for TypeScript type analysis operations.
 * Handles type resolution, import tracking, and property extraction.
 */
export class TypeAnalysisContext {
    private readonly context: SourceFileContext;
    private readonly typeResolver: TypeResolver;
    private readonly jsdocExtractor: JSDocExtractor;

    constructor(
        project: Project,
        private readonly typesFile: SourceFile
    ) {
        this.context = new SourceFileContext(project);
        this.typeResolver = new TypeResolver();
        this.jsdocExtractor = new JSDocExtractor();
    }

    /**
     * Find a type declaration by name, searching local file and imports
     */
    findTypeDeclaration(typeName: string): TypeAliasDeclaration | undefined {
        // First check current file
        let typeAlias = this.typesFile.getTypeAlias(typeName);
        if (typeAlias) {
            return typeAlias;
        }

        // Check imports
        const importSource = this.findImportDeclaration(typeName);
        if (importSource) {
            const importedFile = this.context.resolveModuleSpecifier(this.typesFile, importSource);
            if (importedFile) {
                typeAlias = importedFile.getTypeAlias(typeName);
                if (typeAlias) {
                    return typeAlias;
                }
            }
        }

        return undefined;
    }

    /**
     * Find import declaration for a type name
     */
    findImportDeclaration(typeName: string): string | null {
        const imports = this.typesFile.getImportDeclarations();

        for (const imp of imports) {
            const namedImports = imp.getNamedImports();
            for (const named of namedImports) {
                if (named.getName() === typeName) {
                    return imp.getModuleSpecifierValue();
                }
            }
        }

        return null;
    }

    /**
     * Analyze a type alias and extract its properties
     */
    analyzeTypeAlias(
        typeAlias: TypeAliasDeclaration,
        options: PropAnalysisOptions = DEFAULT_OPTIONS
    ): PropDocumentation[] {
        const typeNode = typeAlias.getTypeNode();
        if (!typeNode) {
            return [];
        }

        return this.analyzeTypeNode(typeNode, options);
    }

    /**
     * Analyze a type node and extract properties
     */
    analyzeTypeNode(typeNode: Node, options: PropAnalysisOptions = DEFAULT_OPTIONS): PropDocumentation[] {
        // Handle intersection types
        if (Node.isIntersectionTypeNode(typeNode)) {
            return this.analyzeIntersection(typeNode, options);
        }

        // Handle object type literal
        if (Node.isTypeLiteral(typeNode)) {
            return this.analyzeObjectType(typeNode, options);
        }

        // Handle type reference
        if (Node.isTypeReference(typeNode)) {
            return this.analyzeTypeReference(typeNode, options);
        }

        return [];
    }

    /**
     * Analyze intersection type
     */
    private analyzeIntersection(
        typeNode: IntersectionTypeNode,
        options: PropAnalysisOptions
    ): PropDocumentation[] {
        const props: PropDocumentation[] = [];
        const types = typeNode.getTypeNodes();

        for (const type of types) {
            if (Node.isTypeLiteral(type)) {
                props.push(...this.analyzeObjectType(type, options));
            } else if (Node.isTypeReference(type)) {
                props.push(...this.analyzeTypeReference(type, options));
            }
        }

        return props;
    }

    /**
     * Analyze object type literal
     */
    private analyzeObjectType(typeNode: Node, options: PropAnalysisOptions): PropDocumentation[] {
        if (!Node.isTypeLiteral(typeNode)) {
            return [];
        }

        const props: PropDocumentation[] = [];
        const members = typeNode.getMembers();

        for (const member of members) {
            if (Node.isPropertySignature(member)) {
                const name = member.getName();
                const isOptional = member.hasQuestionToken();
                const memberTypeNode = member.getTypeNode();

                if (!memberTypeNode) {
                    continue;
                }

                const type = this.typeResolver.resolve(memberTypeNode.getType(), isOptional);
                const jsdoc = this.jsdocExtractor.extract(member);

                const prop: PropDocumentation = {
                    name,
                    type,
                    isOptional,
                    description: jsdoc.description,
                    tags: jsdoc.tags
                };

                // Apply options
                if (options.extractDefaultFromJSDoc) {
                    prop.defaultValue = this.extractDefaultValue(jsdoc.tags ?? []);
                }

                if (options.markAsNonBindable) {
                    prop.isBindable = false;
                }

                if (options.checkForSnippet) {
                    prop.isSnippet = this.isSnippetType(memberTypeNode);
                }

                props.push(prop);
            }
        }

        return props;
    }

    /**
     * Analyze type reference
     */
    private analyzeTypeReference(typeNode: Node, options: PropAnalysisOptions): PropDocumentation[] {
        if (!Node.isTypeReference(typeNode)) {
            return [];
        }

        const typeName = typeNode.getTypeName().getText();
        const typeDecl = this.findTypeDeclaration(typeName);

        if (!typeDecl) {
            return [];
        }

        const typeDefNode = typeDecl.getTypeNode();
        if (!typeDefNode) {
            return [];
        }

        return this.analyzeTypeNode(typeDefNode, options);
    }

    /**
     * Extract @default tag value from JSDoc tags
     */
    private extractDefaultValue(tags: JSDocTag[]): string | undefined {
        const defaultTag = tags.find((tag) => tag.name === 'default');
        return defaultTag?.value;
    }

    /**
     * Check if type is Snippet
     */
    private isSnippetType(typeNode: Node): boolean {
        if (Node.isTypeReference(typeNode)) {
            return typeNode.getTypeName().getText() === 'Snippet';
        }
        return false;
    }
}
