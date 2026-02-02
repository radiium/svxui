import * as fs from "fs";
import * as path from "path";
import { Project, SourceFile } from "ts-morph";
import { JSDocExtractor } from "../extractors/jsdoc-extractor";
import type { ComponentDocumentation, PropDocumentation } from "../types";
import { ComponentPropsAnalyzer } from "./component-props-analyzer";
import {
  ComponentSvelteAnalyzer,
  SveltePropInfo,
} from "./component-svelte-analyzer";

/**
 * Component analyzer
 */
export class ComponentAnalyzer {
  private project: Project;
  private componentDir: string;

  constructor(project: Project, componentDir: string) {
    this.project = project;
    this.componentDir = componentDir;
  }

  /**
   * Analyze all components in the directory
   */
  analyze(): ComponentDocumentation[] {
    const typesFile = this.getTypesFile();
    if (!typesFile) {
      console.warn(`⚠️  No types.ts found in ${this.componentDir}`);
      return [];
    }

    const componentFiles = this.getComponentFiles();
    if (componentFiles.length === 0) {
      console.warn(`⚠️  No .svelte files found in ${this.componentDir}`);
      return [];
    }

    const docs: ComponentDocumentation[] = [];

    // Extract all exported Props types
    const propsTypes = this.extractPropsTypes(typesFile);

    for (const componentFile of componentFiles) {
      const componentBaseName = this.getComponentBaseName(componentFile);
      const componentName = this.getComponentName(componentFile);

      // Find corresponding props type
      const propsTypeName = `${componentName}Props`;
      const propsType = propsTypes.get(propsTypeName);

      if (!propsType) {
        console.warn(
          `⚠️  Props type ${propsTypeName} not found for ${componentName}`,
        );
        continue;
      }

      // Analyze TypeScript props
      const propsAnalyzer = new ComponentPropsAnalyzer(
        this.project,
        typesFile,
        propsType,
      );
      const propsDoc = propsAnalyzer.analyze();

      // Analyze Svelte component for $bindable and default values
      const svelteAnalyzer = new ComponentSvelteAnalyzer(componentFile);
      const svelteAnalysis = svelteAnalyzer.analyze();

      // Merge Svelte analysis into props documentation
      this.mergeSvelteAnalysis(propsDoc.props, svelteAnalysis.props);

      const jsdocExtractor = new JSDocExtractor();
      const jsdoc = jsdocExtractor.extract(propsType);

      const doc: ComponentDocumentation = {
        category: "component",
        name: componentBaseName,
        filePath: this.getRelativePath(componentFile),
        description: jsdoc.description,
        typeName: propsTypeName,
        props: propsDoc.props,
        tags: jsdoc.tags,
      };

      docs.push(doc);
    }

    return docs;
  }

  /**
   * Get types.ts source file
   */
  private getTypesFile(): SourceFile | undefined {
    const typesPath = path.join(this.componentDir, "types.ts");
    return this.project.getSourceFile(typesPath);
  }

  /**
   * Get all .svelte component files
   */
  private getComponentFiles(): string[] {
    const componentsDir = path.join(this.componentDir, "components");

    if (!fs.existsSync(componentsDir)) {
      return [];
    }

    const files = fs.readdirSync(componentsDir);
    return files
      .filter((f) => f.endsWith(".svelte"))
      .map((f) => path.join(componentsDir, f));
  }

  /**
   * Extract component name from file path
   */
  private getComponentBaseName(filePath: string): string {
    return path.basename(filePath, ".svelte");
  }

  private getComponentName(filePath: string): string {
    const basename = path.basename(filePath, ".svelte");
    // Capitalize first letter and handle kebab-case
    return basename
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("");
  }

  /**
   * Get relative path from library root
   */
  private getRelativePath(filePath: string): string {
    const libraryRoot = this.project.getRootDirectories()[0]?.getPath() || "";
    return path.relative(libraryRoot, filePath);
  }

  /**
   * Merge Svelte analysis (bindable, default values) into props documentation
   */
  private mergeSvelteAnalysis(
    props: PropDocumentation[],
    svelteProps: Map<string, SveltePropInfo>,
  ): void {
    for (const prop of props) {
      const svelteProp = svelteProps.get(prop.name);

      if (svelteProp) {
        // Set isBindable from Svelte analysis
        prop.isBindable = svelteProp.isBindable;

        // Set default value if found
        if (svelteProp.defaultValue !== undefined) {
          prop.defaultValue = svelteProp.defaultValue;
        }
      }
    }
  }

  /**
   * Extract all Props type aliases from types.ts
   */
  private extractPropsTypes(
    typesFile: SourceFile,
  ): Map<string, ReturnType<SourceFile["getTypeAlias"]>> {
    const propsTypes = new Map();

    const typeAliases = typesFile.getTypeAliases();

    for (const typeAlias of typeAliases) {
      const name = typeAlias.getName();
      if (name.endsWith("Props")) {
        propsTypes.set(name, typeAlias);
      }
    }

    return propsTypes;
  }
}
