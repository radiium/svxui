import * as path from "path";
import { Node, Project, SourceFile, TypeAliasDeclaration } from "ts-morph";
import { JSDocExtractor } from "../extractors/jsdoc-extractor";
import type { PropDocumentation } from "../types";
import { TypeResolver } from "./type-resolver";

/**
 * Props analyzer result
 */
export interface PropsAnalysisResult {
  props: PropDocumentation[];
}

/**
 * Props analyzer
 */
export class ComponentPropsAnalyzer {
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

    // Get the type node
    const typeNode = this.propsType.getTypeNode();
    if (!typeNode) {
      return result;
    }

    // Handle intersection types (most common case)
    if (Node.isIntersectionTypeNode(typeNode)) {
      const { props } = this.analyzeIntersection(typeNode);
      result.props = props;
    }
    // Handle direct object type
    else if (Node.isTypeLiteral(typeNode)) {
      result.props = this.analyzeObjectType(typeNode);
    }
    // Handle type reference (e.g., extending utility class)
    else if (Node.isTypeReference(typeNode)) {
      result.props = this.analyzeTypeReference(typeNode);
    }

    return result;
  }

  /**
   * Analyze intersection type
   */
  private analyzeIntersection(typeNode: Node): {
    props: PropDocumentation[];
  } {
    const props: PropDocumentation[] = [];

    const types = (typeNode as any).getTypeNodes();

    for (const type of types) {
      // Check for HTML element extension (Omit<HTMLInputAttributes, ...>)
      if (Node.isTypeReference(type)) {
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

    return { props };
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
        const isOptional = member.hasQuestionToken();
        const typeNode = member.getTypeNode();

        if (!typeNode) {
          continue;
        }

        // Pass optional flag to TypeResolver to normalize unions with undefined
        const type = this.typeResolver.resolve(typeNode.getType(), isOptional);
        const jsdoc = this.jsdocExtractor.extract(member);

        const prop: PropDocumentation = {
          name,
          type,
          isOptional,
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
