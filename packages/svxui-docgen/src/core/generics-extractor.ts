import { ClassDeclaration, FunctionDeclaration, TypeParameterDeclaration } from 'ts-morph';
import type { GenericParameter, TypeDocumentation } from '../types.js';

type DeclarationWithTypeParams = ClassDeclaration | FunctionDeclaration;

/**
 * Extracts generic type parameters from class or function declarations.
 */
export class GenericsExtractor {
    /**
     * Extract generic parameters from a declaration
     */
    extract(declaration: DeclarationWithTypeParams): GenericParameter[] {
        const typeParams = declaration.getTypeParameters();
        return typeParams.map((param) => this.extractParameter(param));
    }

    /**
     * Extract a single type parameter
     */
    private extractParameter(typeParam: TypeParameterDeclaration): GenericParameter {
        const generic: GenericParameter = {
            name: typeParam.getName()
        };

        const constraint = typeParam.getConstraint();
        if (constraint) {
            generic.constraint = this.createTypeDoc(constraint.getText());
        }

        const defaultType = typeParam.getDefault();
        if (defaultType) {
            generic.default = this.createTypeDoc(defaultType.getText());
        }

        return generic;
    }

    /**
     * Create a minimal TypeDocumentation for constraint/default
     */
    private createTypeDoc(raw: string): TypeDocumentation {
        return {
            raw,
            kind: 'unknown'
        };
    }

    /**
     * Generate options type name from class/function name
     */
    static getOptionsTypeName(declarationName: string): string {
        return `${declarationName}Options`;
    }
}
