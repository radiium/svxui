import { Node, SyntaxKind, ts, Type, TypeFormatFlags } from 'ts-morph';
import { ComponentTypeArguments, ExtendedMetadata, PropMetadata } from '../../types';
import { extractJsDocMetadata } from '../../utils/extract-js-doc-metadata';
import { logger } from '../../utils/logger';
import { matchesGlob } from 'node:path/posix';

export class ComponentPropsParser {
    public extendeds: ExtendedMetadata[] = [];
    public props: PropMetadata[] = [];
    public exports: PropMetadata[] = [];

    constructor(
        public readonly typeArguments: ComponentTypeArguments,
        public readonly defaultProps: Record<string, any> | null
    ) {
        this.extendeds = this.#resolveExtendedsProps(
            this.typeArguments.propsType //
        );

        this.props = this.#resolveLitteralsProps(
            this.typeArguments.propsType,
            this.typeArguments.bindingsNames
        ).map((prop) => {
            return {
                ...prop,
                defaultValue: this.#resolveDefaultValue(prop.name, defaultProps)
            };
        });

        this.exports = this.#resolveLitteralsProps(
            this.typeArguments.exportsType,
            this.typeArguments.bindingsNames
        );
    }

    /**
     * Find and resolve extended types from intersection
     *
     * @param type
     * @returns
     */
    #resolveExtendedsProps(type: Type | undefined): ExtendedMetadata[] {
        const extendeds: ExtendedMetadata[] = [];

        if (type) {
            const typeList = type.isIntersection()
                ? type.getIntersectionTypes() //
                : type.isUnion()
                  ? type
                        .getUnionTypes()
                        .reduce((acc, u) => [...acc, ...u.getIntersectionTypes()], [] as Type[])
                  : [type];

            // logger.error('[resolveExtendedsProps]', {
            //     isIntersection: type.isIntersection(),
            //     isUnion: type.isUnion(),
            //     typeInfo: this.#getTypeInfos(type)
            // });

            for (const currentType of typeList) {
                const typeInfo = this.#getTypeInfos(currentType);

                if (
                    typeInfo.typeText &&
                    (typeInfo.isReference ||
                        typeInfo.isOmit ||
                        typeInfo.isPick ||
                        typeInfo.isSvelteElement) &&
                    !typeInfo.isAnonymous
                ) {
                    // If
                    // Type is direct reference to another type    => type MyType = AnotherType
                    // Type is Omit with reference to another type => type MyType = Omit<AnotherType, ...>
                    // Type is Pick with reference to another type => type MyType = Pick<AnotherType, ...>
                    // Type is imported from svelte/elements
                    extendeds.push({
                        type: typeInfo.typeText,
                        isSvelteElement: typeInfo.isSvelteElement
                    });
                } else if (!typeInfo.isAnonymous) {
                    // Else If
                    // Try to find local alias declaration
                    const aliasTypeText = this.#extractAliasTypeText(currentType);
                    if (aliasTypeText) {
                        extendeds.push({
                            type: aliasTypeText,
                            isSvelteElement: false
                        });
                    }
                }
            }
        }

        return extendeds;
    }

    /**
     * Find and resolve extended types from intersection
     *
     * @param type
     * @param bindingsNames
     * @returns
     */
    #resolveLitteralsProps(type: Type | undefined, bindingsNames: string[] = []): PropMetadata[] {
        const props: PropMetadata[] = [];

        if (type) {
            const typeList = type.isIntersection()
                ? type.getIntersectionTypes() //
                : [type];

            for (const currentType of typeList) {
                const typeInfo = this.#getTypeInfos(currentType);

                if (
                    !typeInfo.typeText ||
                    (!typeInfo.isReference &&
                        !typeInfo.isOmit &&
                        !typeInfo.isPick &&
                        !typeInfo.isSvelteElement) ||
                    typeInfo.isAnonymous
                ) {
                    this.#parseProps(currentType, bindingsNames).forEach((item) => {
                        props.push(item);
                    });
                }
            }
        }

        return props;
    }

    /**
     * Parse and resolve properties of type
     * @param type
     * @param bindingsNames
     * @returns
     */
    #parseProps(type: Type, bindingsNames: string[] = []): PropMetadata[] {
        const props: PropMetadata[] = [];

        const properties = type.getProperties();
        properties.forEach((prop) => {
            const propName = prop.getName();

            const valueDeclaration = prop.getValueDeclaration();
            let propTypeNode = valueDeclaration?.getType();

            if (propTypeNode) {
                logger.green(`prop => ${propName}`);
                logger.gray('textShort =>', propTypeNode.getText(undefined, TypeFormatFlags.None));
                logger.gray('textFull =>', propTypeNode.getText());

                const propMetadata = this.#extractPropMetadata(propTypeNode);
                const aliasTypeText = this.#extractAliasTypeText(propTypeNode);
                const jsDoc = extractJsDocMetadata(valueDeclaration);

                if (this.#getTypeInfos(propTypeNode).isSnippet) {
                    const customTypeName = propTypeNode
                        ?.getUnionTypes()
                        ?.filter((unionType) => !unionType.isUndefined())?.[0]
                        ?.getTypeArguments()?.[0]
                        ?.getTypeArguments()?.[0]
                        ?.getAliasSymbol()
                        ?.getName();

                    logger.blue('customTypeName', customTypeName);
                }

                props.push({
                    name: propName,
                    isOptional: prop.isOptional(),
                    isBindable: bindingsNames.includes(propName),
                    isSnippet: this.#getTypeInfos(propTypeNode).isSnippet,
                    aliasType: aliasTypeText,
                    jsDoc,
                    ...propMetadata
                });
            }
        });

        return props;
    }

    #extractPropMetadata(propTypeNode: Type): { type: string; values?: string[] } {
        let typeName = propTypeNode.getText(undefined, TypeFormatFlags.None).replace(/import\(.+\)\./g, '');

        let type: string = '';
        let values: string[] | undefined;

        // Check if type is an enum or union
        if (propTypeNode.isUnion() || typeName.includes('|')) {
            const enumValues = this.#resolveEnumValues(propTypeNode);
            if (enumValues.length > 0) {
                type = 'union';
                values = enumValues;
            }
            /* Check if union types contain Function
            else {
                const isFunction =
                    propTypeNode
                        .getUnionTypes()
                        ?.filter(
                            (u) => u.getFlags() === ts.TypeFlags.Object && u.getCallSignatures()?.length > 0
                        )?.length > 0;
                if (isFunction) {
                    type = 'Function';
                }
            }*/
        }

        // If type is not enum or union
        if (!type) {
            type = propTypeNode.getText(undefined, TypeFormatFlags.None);
        }

        // Remove 'undefined' and enclosing parenthesis
        if (type.endsWith(' | undefined')) {
            type = type.replace(' | undefined', '');
            if (type.startsWith('(') && type.endsWith(')')) {
                type = type.slice(1, -1);
            }
        }

        if (!type) {
            logger.error('type not found', this.#getTypeInfos(propTypeNode));
        }

        return { type, values };
    }

    #resolveEnumValues(type: Type): string[] {
        // If union type, resolve literal values
        if (type.isUnion()) {
            return type
                .getUnionTypes()
                .filter((t) => t.isStringLiteral() || t.isNumberLiteral() || t.isBooleanLiteral())
                .map((t) => t?.getLiteralValue()?.toString())
                .filter(Boolean) as string[];
        }

        // Check if its a reference to another type (like Colors, Sizes, etc.)
        const symbol = type.getSymbol();
        if (!symbol) return [];

        const declarations = symbol.getDeclarations();
        if (!declarations || declarations.length === 0) return [];

        // Try find type definition
        for (const decl of declarations) {
            // For enums
            if (decl.getKind() === SyntaxKind.EnumDeclaration) {
                return (decl as any).getMembers().map((member: any) => {
                    const initializer = member.getInitializer();
                    if (initializer) {
                        return initializer.getText().replace(/['"]/g, '');
                    }
                    return member.getName();
                });
            }

            // For unions alias types
            if (decl.getKind() === SyntaxKind.TypeAliasDeclaration) {
                const typeAlias = decl.asKindOrThrow(SyntaxKind.TypeAliasDeclaration);
                const typeNode = typeAlias.getTypeNode();

                if (typeNode && typeNode.getKind() === SyntaxKind.UnionType) {
                    return typeNode
                        .getChildrenOfKind(SyntaxKind.LiteralType)
                        .map((lt) => lt.getText().replace(/['"]/g, ''));
                }
            }
        }

        return [];
    }

    #resolveFunctionValue(type: Type) {
        return type.getUnionTypes().map((u) => {
            return [
                u.getText(),
                u.getSymbol()?.getName(),
                ...(u
                    .getSymbol()
                    ?.getDeclarations()
                    .map((d) => Node.isFunctionTypeNode(d)) ?? [])
            ];
        });
    }

    /**
     * Try to find local alias type declaration
     * @param type
     * @returns
     */
    #extractAliasTypeText(type: Type): string | undefined {
        if (this.#getTypeInfos(type).isSnippet) {
            const customTypeName = type
                ?.getUnionTypes()
                ?.filter(
                    (unionType) => !unionType.isUndefined() && !unionType.isNull() && !unionType.isVoid()
                )?.[0]
                ?.getTypeArguments()?.[0]
                ?.getTypeArguments()?.[0]
                ?.getAliasSymbol()
                ?.getName();

            logger.grayAlt(`aliasTypeText (Snippet) =>`, customTypeName);

            return customTypeName;
        }

        const aliasTypeTexts = type
            .getAliasSymbol()
            ?.getDeclarations()
            .map((aliasDecl) => aliasDecl.asKind(ts.SyntaxKind.TypeAliasDeclaration))
            .map((aliasDecl) => aliasDecl?.getTypeNode()?.getText())
            .filter((value) => value !== undefined);

        if (aliasTypeTexts?.length) {
            logger.grayAlt(`aliasTypeText =>`, aliasTypeTexts);
        }

        return aliasTypeTexts?.length ? aliasTypeTexts[0] : undefined;
    }

    #getTypeInfos(type: Type) {
        return {
            FLAG: '==============================================================',
            flags: type.getFlags() ? ts.TypeFlags[type.getFlags()] : null,
            objectFlags: type.isObject() ? ts.ObjectFlags[type.getObjectFlags()] : null,
            symbolFlags: type.getSymbol()?.getFlags() ? ts.SymbolFlags[type.getSymbol()!.getFlags()] : null,
            symbolAliasFlags: type.getAliasSymbol()?.getFlags()
                ? ts.SymbolFlags[type.getAliasSymbol()!.getFlags()]
                : null,

            IS: '==============================================================',
            isReference: type.getObjectFlags() === ts.ObjectFlags.Reference,
            isAnonymous: type.getObjectFlags() === ts.ObjectFlags.Anonymous,
            isOmit: type.getAliasSymbol()?.getName() === 'Omit',
            isPick: type.getAliasSymbol()?.getName() === 'Pick',
            isSvelteElement: type.getText().includes('svelte/elements'),
            isSnippet: type.getText().startsWith('import("svelte").Snippet'),
            islias: type.getSymbol()?.isAlias(),
            isOptional: type.getSymbol()?.isOptional(),

            OTHERS: '==============================================================',
            unionTypesFlags: type
                .getUnionTypes()
                ?.map((u) => (u.getFlags() ? ts.TypeFlags[u.getFlags()] : null)),
            unionTypesObjectFlags: type
                .getUnionTypes()
                ?.map((u) => (u.getObjectFlags() ? ts.ObjectFlags[u.getObjectFlags()] : null)),

            NAME: '==============================================================',
            symbolName: type.getSymbol()?.getName(),
            symbolAliasName: type.getAliasSymbol()?.getName(),
            typeText: type.getText(undefined, TypeFormatFlags.None),
            text: type.getText()
        };
    }

    /**
     * Try extract default props
     * @param propName
     * @param defaultProps
     * @returns
     */
    #resolveDefaultValue(propName: string, defaultProps?: Record<string, any> | null): any | undefined {
        if (defaultProps) {
            const defaultPropValue = defaultProps[propName];
            if (typeof defaultPropValue === 'object' && defaultPropValue !== null) {
                return JSON.stringify(defaultPropValue);
            }
            return defaultPropValue;
        }
        return undefined;
    }
}
