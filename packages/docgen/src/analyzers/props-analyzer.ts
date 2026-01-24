import * as path from "path";
import { Node, Project, SourceFile, TypeAliasDeclaration } from "ts-morph";
import { JSDocExtractor } from "../extractors/jsdoc-extractor";
import type {
  GenericParameter,
  HTMLElementExtension,
  PropDocumentation,
  TypeExtension,
} from "../types";
import { TypeResolver } from "./type-resolver";

/**
 * Props analyzer result
 */
export interface PropsAnalysisResult {
  props: PropDocumentation[];
  generics?: GenericParameter[];
  extendsElement?: HTMLElementExtension;
  extendsTypes?: TypeExtension[];
}

/**
 * Props analyzer
 */
export class PropsAnalyzer {
  private project: Project;
  private typesFile: SourceFile;
  private propsType: TypeAliasDeclaration;
  private typeResolver: TypeResolver;
  private jsdocExtractor: JSDocExtractor;

  constructor(
    project: Project,
    typesFile: SourceFile,
    propsType: TypeAliasDeclaration,
  ) {
    this.project = project;
    this.typesFile = typesFile;
    this.propsType = propsType;
    this.typeResolver = new TypeResolver();
    this.jsdocExtractor = new JSDocExtractor();
  }

  /**
   * Analyze props type
   */
  analyze(): PropsAnalysisResult {
    const result: PropsAnalysisResult = {
      props: [],
    };

    // Extract generics
    const generics = this.extractGenerics();
    if (generics.length > 0) {
      result.generics = generics;
    }

    // Get the type node
    const typeNode = this.propsType.getTypeNode();
    if (!typeNode) {
      return result;
    }

    // Handle intersection types (most common case)
    if (Node.isIntersectionTypeNode(typeNode)) {
      const { props, extendsElement, extendsTypes } =
        this.analyzeIntersection(typeNode);

      result.props = props;
      result.extendsElement = extendsElement;
      if (extendsTypes && extendsTypes.length > 0) {
        result.extendsTypes = extendsTypes;
      }
    }
    // Handle direct object type
    else if (Node.isTypeLiteral(typeNode)) {
      result.props = this.analyzeObjectType(typeNode);
    }
    // Handle type reference (e.g., extending utility class)
    else if (Node.isTypeReference(typeNode)) {
      const typeExtension = this.extractTypeExtension(typeNode);
      if (typeExtension) {
        result.extendsTypes = [typeExtension];
      }
      result.props = this.analyzeTypeReference(typeNode);
    }

    return result;
  }

  /**
   * Extract generic parameters
   */
  private extractGenerics(): GenericParameter[] {
    const typeParams = this.propsType.getTypeParameters();
    const generics: GenericParameter[] = [];

    for (const typeParam of typeParams) {
      const generic: GenericParameter = {
        name: typeParam.getName(),
      };

      const constraint = typeParam.getConstraint();
      if (constraint) {
        generic.raw = constraint.getText();
        generic.constraint = this.typeResolver.resolve(constraint.getType());
      }

      const defaultType = typeParam.getDefault();
      if (defaultType) {
        generic.default = this.typeResolver.resolve(defaultType.getType());
      }

      generics.push(generic);
    }

    return generics;
  }

  /**
   * Analyze intersection type
   */
  private analyzeIntersection(typeNode: Node): {
    props: PropDocumentation[];
    extendsElement?: HTMLElementExtension;
    extendsTypes?: TypeExtension[];
  } {
    const props: PropDocumentation[] = [];
    let extendsElement: HTMLElementExtension | undefined;
    const extendsTypes: TypeExtension[] = [];

    const types = (typeNode as any).getTypeNodes();

    for (const type of types) {
      // Check for HTML element extension (Omit<HTMLInputAttributes, ...>)
      if (Node.isTypeReference(type)) {
        const typeName = type.getTypeName().getText();

        if (typeName === "Omit") {
          const htmlExtension = this.extractHTMLExtension(type);
          if (htmlExtension) {
            extendsElement = htmlExtension;
            continue;
          }
        }

        // Check for PolymorphicProps
        if (typeName === "PolymorphicProps") {
          const polyProps = this.analyzePolymorphicProps(type);
          props.push(...polyProps);
          continue;
        }

        // Check for internal type extension (utility classes, state options, etc.)
        const typeExtension = this.extractTypeExtension(type);
        if (typeExtension) {
          extendsTypes.push(typeExtension);
          // Also extract props from this type
          const refProps = this.analyzeTypeReference(type);
          props.push(...refProps);
          continue;
        }

        // Other type references (utility classes, etc.)
        const refProps = this.analyzeTypeReference(type);
        props.push(...refProps);
      }
      // Object type literal
      else if (Node.isTypeLiteral(type)) {
        const objProps = this.analyzeObjectType(type);
        props.push(...objProps);
      }
    }

    return {
      props,
      extendsElement,
      extendsTypes: extendsTypes.length > 0 ? extendsTypes : undefined,
    };
  }

  /**
   * Extract HTML element extension info
   */
  private extractHTMLExtension(typeNode: Node): HTMLElementExtension | null {
    if (!Node.isTypeReference(typeNode)) {
      return null;
    }

    const typeArgs = typeNode.getTypeArguments();
    if (typeArgs.length < 1) {
      return null;
    }

    const firstArg = typeArgs[0];
    if (!Node.isTypeReference(firstArg)) {
      return null;
    }

    // Get the full type name with generics (e.g., "HTMLAttributes<HTMLSpanElement>")
    const htmlTypeName = firstArg.getText();

    // Get base type name (e.g., "HTMLAttributes")
    const baseTypeName = firstArg.getTypeName().getText();

    // Check if it's from svelte/elements
    const importDecl = this.findImportDeclaration(baseTypeName);
    if (!importDecl || !importDecl.includes("svelte/elements")) {
      return null;
    }

    // Extract omitted props
    const omittedProps: string[] = [];
    if (typeArgs.length > 1) {
      const secondArg = typeArgs[1];
      if (Node.isUnionTypeNode(secondArg)) {
        const literals = (secondArg as any).getTypeNodes();
        for (const lit of literals) {
          if (Node.isLiteralTypeNode(lit)) {
            const literal = lit.getLiteral();
            if (Node.isStringLiteral(literal)) {
              omittedProps.push(literal.getLiteralValue());
            }
          }
        }
      } else if (Node.isLiteralTypeNode(secondArg)) {
        const literal = secondArg.getLiteral();
        if (Node.isStringLiteral(literal)) {
          omittedProps.push(literal.getLiteralValue());
        }
      }
    }

    // Infer element type from HTML type name
    const elementType = this.inferElementType(htmlTypeName);

    return {
      elementType,
      source: "svelte/elements",
      typeName: htmlTypeName, // Full type with generics
      omittedProps: omittedProps.length > 0 ? omittedProps : undefined,
    };
  }

  /**
   * Infer HTML element type from type name
   */
  private inferElementType(typeName: string): string {
    // HTMLInputAttributes -> input
    // HTMLButtonAttributes -> button
    // HTMLAttributes<HTMLSpanElement> -> span
    // HTMLAttributes<HTMLDivElement> -> div
    // SVGAttributes<SVGElement> -> svg

    // First try pattern: HTMLXxxAttributes
    const directMatch = typeName.match(/^HTML(\w+)Attributes$/);
    if (directMatch) {
      return directMatch[1].toLowerCase();
    }

    // Second try pattern: HTMLAttributes<HTMLXxxElement>
    const genericMatch = typeName.match(/^HTMLAttributes<HTML(\w+)Element>/);
    if (genericMatch) {
      return genericMatch[1].toLowerCase();
    }

    // Third try pattern: SVGAttributes<XxxElement>
    const svgMatch = typeName.match(/^SVGAttributes<(\w+)Element>/);
    if (svgMatch) {
      return svgMatch[1].toLowerCase();
    }

    return "unknown";
  }

  /**
   * Extract internal type extension info
   */
  private extractTypeExtension(typeNode: Node): TypeExtension | null {
    if (!Node.isTypeReference(typeNode)) {
      return null;
    }

    const typeName = typeNode.getTypeName().getText();

    // Skip known patterns that are not extensions
    if (typeName === "Omit" || typeName === "PolymorphicProps") {
      return null;
    }

    // Find where this type is defined
    const importDecl = this.findImportDeclaration(typeName);

    // Only consider types from the library itself
    if (
      !importDecl ||
      importDecl.includes("svelte/elements") ||
      importDecl.includes("svelte")
    ) {
      return null;
    }

    // Check if it's from $lib (internal library type)
    if (!importDecl.startsWith("$lib/")) {
      return null;
    }

    // Get type arguments if any
    const typeArgs = typeNode.getTypeArguments();
    const typeArguments =
      typeArgs.length > 0
        ? typeArgs.map((arg) => this.typeResolver.resolve(arg.getType()))
        : undefined;

    // Get full type text with generics
    const fullTypeName = typeNode.getText();

    // Resolve source file path
    let sourcePath = importDecl;
    if (importDecl.startsWith("$lib/")) {
      sourcePath = importDecl.replace("$lib/", "src/lib/");
    }

    return {
      typeName: fullTypeName,
      source: sourcePath,
      typeArguments,
    };
  }

  /**
   * Find import declaration for a type
   */
  private findImportDeclaration(typeName: string): string | null {
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
   * Analyze PolymorphicProps type
   */
  private analyzePolymorphicProps(typeNode: Node): PropDocumentation[] {
    if (!Node.isTypeReference(typeNode)) {
      return [];
    }

    const typeArgs = typeNode.getTypeArguments();
    if (typeArgs.length < 2) {
      return [];
    }

    // Second argument is the OwnProps
    const ownPropsArg = typeArgs[1];

    if (Node.isTypeLiteral(ownPropsArg)) {
      return this.analyzeObjectType(ownPropsArg);
    } else if (Node.isTypeReference(ownPropsArg)) {
      return this.analyzeTypeReference(ownPropsArg);
    }

    return [];
  }

  /**
   * Analyze object type literal
   */
  private analyzeObjectType(typeNode: Node): PropDocumentation[] {
    if (!Node.isTypeLiteral(typeNode)) {
      return [];
    }

    const props: PropDocumentation[] = [];
    const members = typeNode.getMembers();

    for (const member of members) {
      if (Node.isPropertySignature(member)) {
        const name = member.getName();
        const optional = member.hasQuestionToken();
        const typeNode = member.getTypeNode();

        if (!typeNode) {
          continue;
        }

        // Pass optional flag to TypeResolver to normalize unions with undefined
        const type = this.typeResolver.resolve(typeNode.getType(), optional);
        const jsdoc = this.jsdocExtractor.extract(member);

        const prop: PropDocumentation = {
          name,
          type,
          optional,
          description: jsdoc.description,
          isBindable: this.isBindableType(typeNode),
          isSnippet: this.isSnippetType(typeNode),
          tags: jsdoc.tags,
        };

        props.push(prop);
      }
    }

    return props;
  }

  /**
   * Analyze type reference
   */
  private analyzeTypeReference(typeNode: Node): PropDocumentation[] {
    if (!Node.isTypeReference(typeNode)) {
      return [];
    }

    const typeName = typeNode.getTypeName().getText();

    // Find the type declaration
    const typeDecl = this.findTypeDeclaration(typeName);
    if (!typeDecl) {
      return [];
    }

    const typeDefNode = typeDecl.getTypeNode();
    if (!typeDefNode) {
      return [];
    }

    if (Node.isTypeLiteral(typeDefNode)) {
      return this.analyzeObjectType(typeDefNode);
    } else if (Node.isIntersectionTypeNode(typeDefNode)) {
      const { props } = this.analyzeIntersection(typeDefNode);
      return props;
    }

    return [];
  }

  /**
   * Find type declaration in project
   */
  private findTypeDeclaration(
    typeName: string,
  ): TypeAliasDeclaration | undefined {
    // First check current file
    let typeAlias = this.typesFile.getTypeAlias(typeName);
    if (typeAlias) {
      return typeAlias;
    }

    // Check imports
    const importSource = this.findImportDeclaration(typeName);
    if (importSource) {
      // Resolve imported file
      const importedFile = this.resolveImportedFile(importSource);
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
   * Resolve imported file
   */
  private resolveImportedFile(moduleSpecifier: string): SourceFile | undefined {
    // Handle relative imports
    if (moduleSpecifier.startsWith(".")) {
      const currentDir = this.typesFile.getDirectoryPath();
      const resolvedPath = path.resolve(currentDir, moduleSpecifier);

      return (
        this.project.getSourceFile(resolvedPath + ".ts") ||
        this.project.getSourceFile(resolvedPath)
      );
    }

    // Handle alias imports (e.g., $lib/...)
    if (moduleSpecifier.startsWith("$lib/")) {
      const libPath = moduleSpecifier.replace("$lib/", "src/lib/");
      const sourceFiles = this.project.getSourceFiles();

      for (const sf of sourceFiles) {
        if (sf.getFilePath().includes(libPath)) {
          return sf;
        }
      }
    }

    return undefined;
  }

  /**
   * Check if type is bindable
   * Note: Now handled by SvelteAnalyzer, but kept for fallback
   */
  private isBindableType(typeNode: Node): boolean {
    // Bindable detection is now done via Svelte AST analysis
    // This is a fallback that always returns false
    return false;
  }

  /**
   * Check if type is Snippet
   */
  private isSnippetType(typeNode: Node): boolean {
    if (Node.isTypeReference(typeNode)) {
      const typeName = typeNode.getTypeName().getText();
      return typeName === "Snippet";
    }
    return false;
  }
}
