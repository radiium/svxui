import * as path from "path";
import { Project, SourceFile } from "ts-morph";
import { JSDocExtractor } from "../extractors/jsdoc-extractor";
import type { GenericParameter, BuilderDocumentation } from "../types";
import { generateDTS, highlight } from "../utils/dts-helpers";

/**
 * Builder analyzer (minimaliste - pas de méthodes/propriétés)
 */
export class BuilderAnalyzer {
  private project: Project;
  private builderDir: string;

  constructor(project: Project, builderDir: string) {
    this.project = project;
    this.builderDir = builderDir;
  }

  /**
   * Analyze builder in the directory
   */
  analyze(): BuilderDocumentation | null {
    const builderFile = this.getBuilderFile();
    if (!builderFile) {
      console.warn(`⚠️  No core.svelte.ts found in ${this.builderDir}`);
      return null;
    }

    const typesFile = this.getTypesFile();
    if (!typesFile) {
      console.warn(`⚠️  No types.ts found in ${this.builderDir}`);
      //   return null;
    }

    const builderName = this.getBuilderName();

    // Find the main exported class
    const builderClass = this.findMainClass(builderFile);
    if (!builderClass) {
      console.warn(
        `⚠️  No exported class found in ${builderName}/builder.svelte.ts`,
      );
      return null;
    }

    const className = builderClass.getName() || "Unknown";
    const classDef = generateDTS(builderClass.getText());
    const typeDef = typesFile
      ? highlight(typesFile?.getFullText() ?? "")
      : undefined;

    // Extract generics from class
    const generics = this.extractGenerics(builderClass);
    // Find the Options type name
    const optionsTypeName = this.findOptionsTypeName(className);

    // Extract JSDoc from class
    const jsdocExtractor = new JSDocExtractor();
    const jsdoc = jsdocExtractor.extract(builderClass);

    const doc: BuilderDocumentation = {
      category: "builder",
      name: builderName,
      filePath: this.getRelativePath(
        path.join(this.builderDir, "core.svelte.ts"),
      ),
      description: jsdoc.description,
      className: className,
      classDef: classDef,
      generics: generics.length > 0 ? generics : undefined,
      typeName: optionsTypeName,
      typeDef: typeDef,
      typeSource: this.getRelativePath(path.join(this.builderDir, "types.ts")),
      tags: jsdoc.tags,
    };

    return doc;
  }

  /**
   * Get builder.svelte.ts source file
   */
  private getBuilderFile(): SourceFile | undefined {
    const builderPath = path.join(this.builderDir, "builder.svelte.ts");
    return this.project.getSourceFile(builderPath);
  }

  /**
   * Get types.ts source file
   */
  private getTypesFile(): SourceFile | undefined {
    const typesPath = path.join(this.builderDir, "types.ts");
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
   * Get builder name from directory
   */
  private getBuilderName(): string {
    return path.basename(this.builderDir);
  }

  /**
   * Get relative path from library root
   */
  private getRelativePath(filePath: string): string {
    const libraryRoot = this.project.getRootDirectories()[0]?.getPath() || "";
    return path.relative(libraryRoot, filePath);
  }
}
