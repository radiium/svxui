import { Node, Type, TypeFormatFlags } from "ts-morph";
import type { TypeDocumentation } from "../types";

/**
 * Type resolver - converts ts-morph Type to TypeDocumentation
 */
export class TypeResolver {
  /**
   * Resolve a Type to TypeDocumentation
   */
  resolve(type: Type, isOptional: boolean = false): TypeDocumentation {
    const raw = type.getText(
      undefined,
      TypeFormatFlags.UseAliasDefinedOutsideCurrentScope,
    );

    // String type
    if (type.isString()) {
      return { raw, kind: "string" };
    }

    // Number type
    if (type.isNumber()) {
      return { raw, kind: "number" };
    }

    // Boolean type
    if (type.isBoolean()) {
      return { raw, kind: "boolean" };
    }

    // Undefined
    if (type.isUndefined()) {
      return { raw, kind: "undefined" };
    }

    // Null
    if (type.isNull()) {
      return { raw, kind: "null" };
    }

    // String literal
    if (type.isStringLiteral()) {
      return {
        raw,
        kind: "literal",
        literalValue: type.getLiteralValue() as string,
      };
    }

    // Number literal
    if (type.isNumberLiteral()) {
      return {
        raw,
        kind: "literal",
        literalValue: type.getLiteralValue() as number,
      };
    }

    // Boolean literal
    if (type.isBooleanLiteral()) {
      return {
        raw,
        kind: "literal",
        literalValue: raw === "true",
      };
    }

    // Union type
    if (type.isUnion()) {
      let unionTypes = type.getUnionTypes();

      // If prop is optional, filter out undefined from union
      if (isOptional) {
        unionTypes = unionTypes.filter((t) => !t.isUndefined());
      }

      // If after filtering there's only one type left, return it directly
      if (unionTypes.length === 1) {
        return this.resolve(unionTypes[0], false);
      }

      // Otherwise return as union
      const resolvedUnionTypes = unionTypes.map((t) => this.resolve(t, false));
      return {
        raw: this.rebuildUnionRaw(resolvedUnionTypes),
        kind: "union",
        unionTypes: resolvedUnionTypes,
      };
    }

    // Intersection type
    if (type.isIntersection()) {
      const intersectionTypes = type
        .getIntersectionTypes()
        .map((t) => this.resolve(t, false));
      return {
        raw,
        kind: "intersection",
        intersectionTypes,
      };
    }

    // Array type
    if (type.isArray()) {
      const elementType = type.getArrayElementType();
      if (elementType) {
        return {
          raw,
          kind: "array",
          typeArguments: [this.resolve(elementType, false)],
        };
      }
    }

    // Tuple type
    if (type.isTuple()) {
      const tupleElements = type
        .getTupleElements()
        .map((t) => this.resolve(t, false));
      return {
        raw,
        kind: "tuple",
        typeArguments: tupleElements,
      };
    }

    // Object type
    if (type.isObject()) {
      // Check if it's a reference type (generic, interface, etc.)
      const symbol = type.getSymbol();
      if (symbol) {
        const typeName = symbol.getName();

        // Check for Snippet
        if (typeName === "Snippet") {
          const typeArgs = type.getTypeArguments();

          // Unwrap tuple: Snippet<[MyType]> => MyType
          // const typeArguments = typeArgs.map((t) => this.resolve(t, false))
          const typeArguments =
            typeArgs && typeArgs.length > 0
              ? typeArgs[0]
                  .getTupleElements()
                  .map((t) => this.resolve(t, false))
              : undefined;

          return {
            raw,
            kind: "snippet",
            typeName,
            typeArguments,
          };
        }

        // Generic type reference
        const typeArgs = type.getTypeArguments();
        if (typeArgs.length > 0) {
          return {
            raw,
            kind: "reference",
            typeName,
            typeArguments: typeArgs.map((t) => this.resolve(t, false)),
            sourceFile: this.getTypeSourceFile(type),
          };
        }

        // Function type reference
        if (type.getCallSignatures().length > 0) {
          return {
            raw,
            kind: "function",
            typeName,
            sourceFile: this.getTypeSourceFile(type),
          };
        }

        // Simple reference type
        return {
          raw,
          kind: "reference",
          typeName,
          sourceFile: this.getTypeSourceFile(type),
        };
      }

      // Anonymous object type
      return {
        raw,
        kind: "object",
      };
    }

    // Function type
    if (type.getCallSignatures().length > 0) {
      return {
        raw,
        kind: "function",
      };
    }

    // Generic contraint
    if (raw !== "void") {
      const declarations = type.getSymbol()?.getDeclarations() ?? [];
      const typeParamDecl = declarations.find(Node.isTypeParameterDeclaration);
      const contraintTypeName = typeParamDecl?.getConstraint()?.getText();
      if (contraintTypeName) {
        return {
          raw: contraintTypeName,
          kind: "generic",
        };
      }
    }

    // Unknown/any
    return {
      raw,
      kind: "unknown",
    };
  }

  /**
   * Rebuild union raw string after filtering undefined
   */
  private rebuildUnionRaw(unionTypes: TypeDocumentation[]): string {
    return unionTypes.map((t) => t.raw).join(" | ");
  }

  /**
   * Get source file where type is defined
   */
  private getTypeSourceFile(type: Type): string | undefined {
    const symbol = type.getSymbol();
    if (!symbol) {
      return undefined;
    }

    const declarations = symbol.getDeclarations();
    if (declarations.length === 0) {
      return undefined;
    }

    const sourceFile = declarations[0].getSourceFile();
    return sourceFile.getFilePath();
  }
}
