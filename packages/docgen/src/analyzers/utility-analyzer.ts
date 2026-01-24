import * as path from "path";
import { Project, SourceFile } from "ts-morph";
import { JSDocExtractor } from "../extractors/jsdoc-extractor";
import type { GenericParameter, UtilityDocumentation } from "../types";

/**
 * Utility analyzer (minimaliste - pas de méthodes/propriétés)
 */
export class UtilityAnalyzer {
  private project: Project;
  private utilityDir: string;

  constructor(project: Project, utilityDir: string) {
    this.project = project;
    this.utilityDir = utilityDir;
  }

  /**
   * Analyze utility in the directory
   */
  analyze(): UtilityDocumentation | null {
    const coreFile = this.getCoreFile();
    if (!coreFile) {
      console.warn(`⚠️  No core.svelte.ts found in ${this.utilityDir}`);
      return null;
    }

    const typesFile = this.getTypesFile();
    if (!typesFile) {
      console.warn(`⚠️  No types.ts found in ${this.utilityDir}`);
      //   return null;
    }

    const utilityName = this.getUtilityName();

    // Find the main exported class
    const utilityClass = this.findMainClass(coreFile);
    if (!utilityClass) {
      console.warn(
        `⚠️  No exported class found in ${utilityName}/core.svelte.ts`,
      );

      // const utilityFunction = this.findMainFunction(coreFile);
      // console.log("utilityFunction found", utilityFunction?.getName());
      return null;
    }

    const className = utilityClass.getName() || "Unknown";
    // Extract generics from class
    const generics = this.extractGenerics(utilityClass);
    // Find the Options type name
    const optionsTypeName = this.findOptionsTypeName(className);

    // Extract JSDoc from class
    const jsdocExtractor = new JSDocExtractor();
    const jsdoc = jsdocExtractor.extract(utilityClass);

    const doc: UtilityDocumentation = {
      name: utilityName,
      filePath: this.getRelativePath(
        path.join(this.utilityDir, "core.svelte.ts"),
      ),
      description: jsdoc.description,
      className: className,
      generics: generics.length > 0 ? generics : undefined,
      optionsTypeName: optionsTypeName,
      optionsTypeSource: this.getRelativePath(
        path.join(this.utilityDir, "types.ts"),
      ),
      tags: jsdoc.tags,
    };

    return doc;
  }

  /**
   * Get core.svelte.ts source file
   */
  private getCoreFile(): SourceFile | undefined {
    const corePath = path.join(this.utilityDir, "core.svelte.ts");
    return this.project.getSourceFile(corePath);
  }

  /**
   * Get types.ts source file
   */
  private getTypesFile(): SourceFile | undefined {
    const typesPath = path.join(this.utilityDir, "types.ts");
    return this.project.getSourceFile(typesPath);
  }

  /**
   * Find the main exported class
   */
  private findMainClass(file: SourceFile) {
    const classes = file.getClasses();

    // Find exported class
    for (const cls of classes) {
      if (cls.isExported()) {
        return cls;
      }
    }

    return null;
  }

  /**
   * Find the main exported class
   */
  private findMainFunction(file: SourceFile) {
    const functions = file.getFunctions();

    // Find exported class
    for (const func of functions) {
      if (func.isExported()) {
        return func;
      }
    }

    return null;
  }

  /**
   * Extract generic parameters from class
   */
  private extractGenerics(classDecl: any): GenericParameter[] {
    const typeParams = classDecl.getTypeParameters();
    const generics: GenericParameter[] = [];

    for (const typeParam of typeParams) {
      const generic: GenericParameter = {
        name: typeParam.getName(),
      };

      const constraint = typeParam.getConstraint();
      if (constraint) {
        generic.constraint = {
          kind: "unknown" as any,
          raw: constraint.getText(),
        };
      }

      const defaultType = typeParam.getDefault();
      if (defaultType) {
        generic.default = {
          kind: "unknown" as any,
          raw: defaultType.getText(),
        };
      }

      generics.push(generic);
    }

    return generics;
  }

  /**
   * Find options type name (convention: ClassNameOptions or ClassNameStateOptions)
   */
  private findOptionsTypeName(className: string): string {
    // Convention: AccordionState → AccordionStateOptions
    // ou ListboxState → ListboxStateOptions
    return `${className}Options`;
  }

  /**
   * Get utility name from directory
   */
  private getUtilityName(): string {
    return path.basename(this.utilityDir);
  }

  /**
   * Get relative path from library root
   */
  private getRelativePath(filePath: string): string {
    const libraryRoot = this.project.getRootDirectories()[0]?.getPath() || "";
    return path.relative(libraryRoot, filePath);
  }
}
