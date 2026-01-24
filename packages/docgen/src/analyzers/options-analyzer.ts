import { Project, SourceFile, TypeAliasDeclaration, Node } from "ts-morph";
import * as path from "path";
import type { OptionDocumentation } from "../types";
import { TypeResolver } from "./type-resolver";
import { JSDocExtractor } from "../extractors/jsdoc-extractor";

/**
 * Options analyzer for attachments
 */
export class OptionsAnalyzer {
  private project: Project;
  private typesFile: SourceFile;
  private optionsType: TypeAliasDeclaration;
  private typeResolver: TypeResolver;
  private jsdocExtractor: JSDocExtractor;

  constructor(
    project: Project,
    typesFile: SourceFile,
    optionsType: TypeAliasDeclaration,
  ) {
    this.project = project;
    this.typesFile = typesFile;
    this.optionsType = optionsType;
    this.typeResolver = new TypeResolver();
    this.jsdocExtractor = new JSDocExtractor();
  }

  /**
   * Analyze options type
   */
  analyze(): OptionDocumentation[] {
    const typeNode = this.optionsType.getTypeNode();
    if (!typeNode) {
      return [];
    }

    // Handle object type literal
    if (Node.isTypeLiteral(typeNode)) {
      return this.analyzeObjectType(typeNode);
    }

    // Handle intersection types
    if (Node.isIntersectionTypeNode(typeNode)) {
      return this.analyzeIntersection(typeNode);
    }

    // Handle type reference
    if (Node.isTypeReference(typeNode)) {
      return this.analyzeTypeReference(typeNode);
    }

    return [];
  }

  /**
   * Analyze object type literal
   */
  private analyzeObjectType(typeNode: Node): OptionDocumentation[] {
    if (!Node.isTypeLiteral(typeNode)) {
      return [];
    }

    const options: OptionDocumentation[] = [];
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

        // Extract @default tag value
        const defaultValue = this.extractDefaultValue(jsdoc.tags || []);

        const option: OptionDocumentation = {
          name,
          type,
          optional,
          description: jsdoc.description,
          defaultValue,
          tags: jsdoc.tags,
        };

        options.push(option);
      }
    }

    return options;
  }

  /**
   * Analyze intersection type
   */
  private analyzeIntersection(typeNode: Node): OptionDocumentation[] {
    const options: OptionDocumentation[] = [];
    const types = (typeNode as any).getTypeNodes();

    for (const type of types) {
      if (Node.isTypeLiteral(type)) {
        const objOptions = this.analyzeObjectType(type);
        options.push(...objOptions);
      } else if (Node.isTypeReference(type)) {
        const refOptions = this.analyzeTypeReference(type);
        options.push(...refOptions);
      }
    }

    return options;
  }

  /**
   * Analyze type reference
   */
  private analyzeTypeReference(typeNode: Node): OptionDocumentation[] {
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
      return this.analyzeIntersection(typeDefNode);
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
   * Extract @default tag value from JSDoc tags
   */
  private extractDefaultValue(
    tags: Array<{ name: string; value?: string }>,
  ): string | undefined {
    const defaultTag = tags.find((tag) => tag.name === "default");
    return defaultTag?.value;
  }
}
