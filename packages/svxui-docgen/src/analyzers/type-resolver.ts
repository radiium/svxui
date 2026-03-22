import { Node, SyntaxKind, Type, TypeFormatFlags } from 'ts-morph';
import type { TypeDocumentation } from '../types.js';

/**
 * Type resolver - converts ts-morph Type to TypeDocumentation
 */
export class TypeResolver {
    /**
     * Resolve a Type to TypeDocumentation
     */
    resolve(type: Type, isOptional = false): TypeDocumentation {
        const raw = type.getText(undefined, TypeFormatFlags.UseAliasDefinedOutsideCurrentScope);

        // String type
        if (type.isString()) {
            return {
                kind: 'string',
                text: raw,
                raw
            };
        }

        // Number type
        if (type.isNumber()) {
            return {
                kind: 'number',
                text: raw,
                raw
            };
        }

        // Boolean type
        if (type.isBoolean()) {
            return {
                kind: 'boolean',
                text: raw,
                raw
            };
        }

        // Undefined
        if (type.isUndefined()) {
            return {
                kind: 'undefined',
                text: raw,
                raw
            };
        }

        // Null
        if (type.isNull()) {
            return {
                kind: 'null',
                text: raw,
                raw
            };
        }

        // String literal
        if (type.isStringLiteral()) {
            return {
                kind: 'literal',
                text: raw,
                raw,
                literalValue: type.getLiteralValue() as string
            };
        }

        // Number literal
        if (type.isNumberLiteral()) {
            return {
                kind: 'literal',
                text: raw,
                raw,
                literalValue: type.getLiteralValue() as number
            };
        }

        // Boolean literal
        if (type.isBooleanLiteral()) {
            return {
                kind: 'literal',
                text: raw,
                raw,
                literalValue: raw === 'true'
            };
        }

        // Union type
        if (type.isUnion()) {
            // Try to get the UnionTypeNode from the type alias declaration.
            // Using the AST allows us to preserve the original order
            // of union members as written in the source code.
            const unionNode = type
                .getAliasSymbol()
                ?.getDeclarations()[0]
                ?.getFirstChildByKind(SyntaxKind.UnionType);

            // If we found a UnionTypeNode, extract its type nodes in source order.
            // Otherwise, fall back to type.getUnionTypes(), which uses the TypeScript
            // type checker and does NOT guarantee the original order.
            let unionTypes: Type[] = unionNode
                ? unionNode.getTypeNodes().map((n) => n.getType())
                : type.getUnionTypes();

            // If prop is optional, filter out undefined from union
            if (isOptional) {
                unionTypes = unionTypes.filter((t) => !t.isUndefined());
            }

            // If after filtering there's only one type left, return it directly
            if (unionTypes.length === 1) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                return this.resolve(unionTypes[0]!, false);
            }

            // Otherwise return as union
            const resolvedUnionTypes = unionTypes.map((t) => this.resolve(t, false));
            return {
                kind: 'union',
                text: 'union',
                hint: this.rebuildUnionRaw(resolvedUnionTypes),
                //
                raw: this.rebuildUnionRaw(resolvedUnionTypes),
                unionTypes: resolvedUnionTypes
            };
        }

        // Intersection type
        if (type.isIntersection()) {
            const intersectionTypes = type.getIntersectionTypes().map((t) => this.resolve(t, false));
            return {
                kind: 'intersection',
                text: raw,
                hint: intersectionTypes.map((t) => t.raw).join(' & '),
                //
                raw,
                intersectionTypes
            };
        }

        // Array type
        if (type.isArray()) {
            const elementType = type.getArrayElementType();
            if (elementType) {
                return {
                    text: 'array',
                    hint: this.resolve(elementType, false).raw,
                    //
                    raw,
                    kind: 'array',
                    typeArguments: [this.resolve(elementType, false)]
                };
            }
        }

        // Tuple type
        if (type.isTuple()) {
            // const tupleElements = type.getTupleElements().map((t) => this.resolve(t, false));
            return {
                raw,
                kind: 'tuple'
                //typeArguments: tupleElements
            };
        }

        // Object type
        if (type.isObject()) {
            // Check if it's a reference type (generic, interface, etc.)
            const symbol = type.getSymbol();
            if (symbol) {
                const typeName = symbol.getName();

                // Check for Snippet
                if (typeName === 'Snippet') {
                    // const [firstTypeArgs] = type.getTypeArguments();

                    // Unwrap tuple: Snippet<[MyType]> => MyType
                    // const typeArguments = typeArgs.map((t) => this.resolve(t, false))
                    // const typeArguments = firstTypeArgs
                    //     ? firstTypeArgs.getTupleElements().map((t) => this.resolve(t, false))
                    //     : undefined;

                    return {
                        text: 'Snippet',
                        hint: raw === 'Snippet<[void]>' ? undefined : raw,
                        //
                        raw,
                        kind: 'snippet',
                        typeName
                        // typeArguments
                    };
                }

                // Generic type reference
                const typeArgs = type.getTypeArguments();
                if (typeArgs.length > 0) {
                    return {
                        text: 'generic reference',
                        hint: typeArgs.map((t) => this.resolve(t, false).raw).join(' '),
                        //
                        raw,
                        kind: 'reference',
                        typeName
                        // typeArguments: typeArgs.map((t) => this.resolve(t, false)),
                        // sourceFile: this.getTypeSourceFile(type)
                    };
                }

                // Function type reference
                if (type.getCallSignatures().length > 0) {
                    return {
                        kind: 'function',
                        text: 'function',
                        hint: raw,
                        //
                        raw,
                        typeName
                        // sourceFile: this.getTypeSourceFile(type)
                    };
                }

                // Simple reference type
                return {
                    text: raw,
                    // hint: raw,
                    //
                    raw,
                    kind: 'reference',
                    typeName
                    // sourceFile: this.getTypeSourceFile(type)
                };
            }

            // Anonymous object type
            return {
                text: '??',
                hint: raw,
                //
                raw,
                kind: 'object'
            };
        }

        // Generic constraint
        if (raw !== 'void') {
            const symbol = type.getSymbol();
            if (symbol) {
                const contraintText = symbol
                    .getDeclarations()
                    .find(Node.isTypeParameterDeclaration)
                    ?.getConstraint()
                    ?.getText();

                if (contraintText) {
                    return {
                        text: raw,
                        hint: `${raw} extends ${contraintText}`,
                        //
                        raw: raw,
                        kind: 'generic',
                        typeName: `${raw} extends ${contraintText}`
                    };
                }
            }

            // Generic "ref" prop
            if (raw.includes('RefFromHTMLAttributes')) {
                return {
                    text: 'HTMLElement',
                    hint: raw,
                    //
                    raw: '',
                    kind: 'generic',
                    typeName: raw
                };
            }
        }

        // Unknown/any
        return {
            text: 'unknown',
            hint: raw,
            //
            raw,
            kind: 'unknown'
        };
    }

    /**
     * Rebuild union raw string after filtering undefined
     */
    private rebuildUnionRaw(unionTypes: TypeDocumentation[]): string {
        return unionTypes.map((t) => t.raw).join(' | ');
    }

    /**
     * Get source file where type is defined
     */
    // private getTypeSourceFile(type: Type): string | undefined {
    //     const symbol = type.getSymbol();
    //     if (!symbol) {
    //         return undefined;
    //     }

    //     const [firstDeclaration] = symbol.getDeclarations();
    //     if (firstDeclaration) {
    //         const sourceFile = firstDeclaration.getSourceFile();
    //         return sourceFile.getFilePath();
    //     }
    //     return undefined;
    // }
}
