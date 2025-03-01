import path from 'node:path';
import { SourceFile, SyntaxKind, Type } from 'ts-morph';
import { ComponentMetadata, ComponentTypeArguments } from '../../types';
import { extractJsDocMetadata } from '../../utils/extract-js-doc-metadata';
import { ComponentPropsParser } from './component-props-parser';

export class ComponentParser {
    public typeName: string;
    public typeArguments: ComponentTypeArguments;
    public defaultProps: Record<string, any> | null;

    get filePath(): string {
        return this.sourceFile.getFilePath();
    }
    get propsTypeName(): string {
        return `${this.typeName}Props`;
    }
    get defaultPropsName(): string {
        return `default${this.typeName}Props`;
    }

    constructor(
        public readonly sourceFile: SourceFile,
        public readonly sourceFileType: SourceFile | null,
        public readonly defaultPropsModule: Record<string, any> | null
    ) {
        this.typeName = this.#resolveTypeName(this.filePath);
        this.typeArguments = this.#resolveTypeArguments(this.sourceFile);
        this.defaultProps = this.#resolveDefaultProps(this.defaultPropsModule);
    }

    /**
     * Generate props metadata
     * @returns
     */
    metadata(): ComponentMetadata {
        const componentPropsParser = new ComponentPropsParser(this.typeArguments, this.defaultProps);

        return {
            name: this.typeName,
            path: this.filePath.replace(/\.d\.ts$/, ''),
            extendeds: componentPropsParser.extendeds.sort((a, b) => a.type.localeCompare(b.type)),
            props: componentPropsParser.props.sort((a, b) => a.name.localeCompare(b.name)),
            exports: componentPropsParser.exports.sort((a, b) => a.name.localeCompare(b.name)),
            jsDoc: this.typeArguments.jsDoc
        };
    }

    /**
     * Resolve real component type name from filePath
     * @param filePath
     * @returns
     */
    #resolveTypeName(filePath: string): string {
        return path
            .basename(filePath, '.svelte.d.ts')
            .split('-')
            .map((val) => String(val).charAt(0).toUpperCase() + String(val).slice(1))
            .join('');
    }

    /**
     * Resolve generic type arguments from Svelte Component type declaration
     *      Extract => `Props, Exports, Bindings`
     *      From => `declare const ComponentName: import("svelte").Component<Props, Exports, Bindings>`
     * @param sourceFile
     * @returns
     */
    #resolveTypeArguments(sourceFile: SourceFile): ComponentTypeArguments {
        let propsType: Type | undefined;
        let exportsType: Type | undefined;
        let bindingsNames: string[] = [];
        let jsDoc: any | undefined;

        // Find component declaration
        const componentDecls = sourceFile
            .getDescendantsOfKind(SyntaxKind.VariableDeclaration)
            .filter((decl) => decl.getName() === this.typeName);

        if (componentDecls.length > 0) {
            // Find and resolve generic type arguments
            const componentDecl = componentDecls[0];
            const componentType = componentDecl.getType();
            const typeArgs = componentType.getTypeArguments();

            // Argument 1 => Props
            if (typeArgs.length >= 1) {
                propsType = typeArgs[0];
            }
            // Argument 2 => Exports
            if (typeArgs.length >= 2) {
                exportsType = typeArgs[1];
            }
            // Argument 3 => Bindings (literal or union of literals type)
            if (typeArgs.length >= 3) {
                const bindingsType = typeArgs[2];
                if (bindingsType.isStringLiteral()) {
                    bindingsNames = [(bindingsType as any).getLiteralValue()];
                } else if (bindingsType.isUnion()) {
                    bindingsNames = bindingsType
                        .getUnionTypes()
                        .filter((t) => t.isStringLiteral())
                        .map((t) => t.getLiteralValue()) as string[];
                }
            }

            // Extract js doc
            jsDoc = extractJsDocMetadata(componentDecl.getParent().getParent());
        }

        return { propsType, exportsType, bindingsNames, jsDoc };
    }

    /**
     * Resolve default props from filePath and typeName
     * @param defaultPropsModule
     * @returns
     */
    #resolveDefaultProps(defaultPropsModule: Record<string, any> | null = {}): Record<string, any> | null {
        return defaultPropsModule ? defaultPropsModule[this.defaultPropsName] : null;
    }
}
