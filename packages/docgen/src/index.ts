import * as fs from "fs";
import * as path from "path";
import { AttachmentAnalyzer } from "./analyzers/attachment-analyzer";
import { ComponentAnalyzer } from "./analyzers/component-analyzer";
import { UtilityAnalyzer } from "./analyzers/utility-analyzer";
import { DocumentationBuilder } from "./builders/documentation-builder";
import { ProjectLoader } from "./project-loader";
import type { LibraryDocumentation } from "./types";
import { BuilderAnalyzer } from "./analyzers/builder-analyzer";

/**
 * Configuration for documentation generation
 */
interface GeneratorConfig {
  /**
   * Library source directory to analyze
   */
  libraryPath: string;
  /**
   * Output file path (default: library-doc.json at library root)
   */
  outputPath?: string;
  /**
   * Components directory pattern (default: src/lib/components)
   */
  componentsPattern?: string;
  /**
   * Attachments directory pattern (default: src/lib/attachments)
   */
  attachmentsPattern?: string;
  /**
   * Utilities directory pattern (default: src/lib/utilities)
   */
  utilitiesPattern?: string;
}

/**
 * Main documentation generator
 */
export class DocumentationGenerator {
  private config: Required<GeneratorConfig>;

  constructor(config: GeneratorConfig) {
    this.config = {
      libraryPath: path.resolve(config.libraryPath),
      outputPath:
        config.outputPath || path.join(config.libraryPath, "library-doc.json"),
      componentsPattern: config.componentsPattern || "src/lib/components/**/",
      attachmentsPattern:
        config.attachmentsPattern || "src/lib/attachments/**/",
      utilitiesPattern: config.utilitiesPattern || "src/lib/utilities/**/",
    };
  }

  /**
   * Generate documentation
   */
  async generate(): Promise<LibraryDocumentation> {
    console.log(`📚 Analyzing library at: ${this.config.libraryPath}`);

    // Load TypeScript project
    const projectLoader = new ProjectLoader(this.config.libraryPath);
    const project = projectLoader.load();

    // Initialize builder
    const builder = new DocumentationBuilder(this.config.libraryPath);

    // Find and analyze components
    const componentDirs = this.findComponentDirectories();
    console.log(`📦 Found ${componentDirs.length} component(s)`);

    for (const componentDir of componentDirs) {
      const analyzer = new ComponentAnalyzer(project, componentDir);
      const componentDocs = analyzer.analyze();

      for (const doc of componentDocs) {
        builder.addComponent(doc);
      }
    }

    // Find and analyze attachments
    const attachmentDirs = this.findAttachmentDirectories();
    console.log(`🔗 Found ${attachmentDirs.length} attachment(s)`);

    for (const attachmentDir of attachmentDirs) {
      const analyzer = new AttachmentAnalyzer(project, attachmentDir);
      const attachmentDoc = analyzer.analyze();

      if (attachmentDoc) {
        builder.addAttachment(attachmentDoc);
      }
    }

    // Find and analyze utilities
    const utilityDirs = this.findUtilityDirectories();
    console.log(`🛠️  Found ${utilityDirs.length} utility(ies)`);

    for (const utilityDir of utilityDirs) {
      const analyzer = new UtilityAnalyzer(project, utilityDir);
      const utilityDoc = analyzer.analyze();

      if (utilityDoc) {
        builder.addUtility(utilityDoc);
      }
    }

    // Find and analyze builders
    const builderDirs = this.findBuilderDirectories();
    console.log(`🛠️  Found ${builderDirs.length} builder(s)`);

    for (const builderDir of builderDirs) {
      const analyzer = new BuilderAnalyzer(project, builderDir);
      const builderDoc = analyzer.analyze();

      if (builderDoc) {
        builder.addBuilder(builderDoc);
      }
    }

    // Build final documentation
    const documentation = builder.build();
    // Write to file
    this.writeDocumentation(documentation);
    console.log(`✅ Documentation generated at: ${this.config.outputPath}`);

    return documentation;
  }

  /**
   * Find all component directories
   */
  private findComponentDirectories(): string[] {
    const componentsBase = path.join(
      this.config.libraryPath,
      "src/lib/components",
    );

    if (!fs.existsSync(componentsBase)) {
      console.warn(`⚠️  Components directory not found: ${componentsBase}`);
      return [];
    }

    const dirs: string[] = [];
    const entries = fs.readdirSync(componentsBase, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const componentDir = path.join(componentsBase, entry.name);
        // Verify it has a types.ts file
        const typesFile = path.join(componentDir, "types.ts");
        if (fs.existsSync(typesFile)) {
          dirs.push(componentDir);
        }
      }
    }

    return dirs;
  }

  /**
   * Find all attachment directories
   */
  private findAttachmentDirectories(): string[] {
    const attachmentsBase = path.join(
      this.config.libraryPath,
      "src/lib/attachments",
    );

    if (!fs.existsSync(attachmentsBase)) {
      console.warn(`⚠️  Attachments directory not found: ${attachmentsBase}`);
      return [];
    }

    const dirs: string[] = [];
    const entries = fs.readdirSync(attachmentsBase, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const attachmentDir = path.join(attachmentsBase, entry.name);
        // Verify it has a types.ts file
        const typesFile = path.join(attachmentDir, "types.ts");
        if (fs.existsSync(typesFile)) {
          dirs.push(attachmentDir);
        }
      }
    }

    return dirs;
  }

  /**
   * Find all utility directories
   */
  private findUtilityDirectories(): string[] {
    const utilitiesBase = path.join(
      this.config.libraryPath,
      "src/lib/utilities",
    );

    if (!fs.existsSync(utilitiesBase)) {
      console.warn(`⚠️  Utilities directory not found: ${utilitiesBase}`);
      return [];
    }

    const dirs: string[] = [];
    const entries = fs.readdirSync(utilitiesBase, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const utilityDir = path.join(utilitiesBase, entry.name);
        // Verify it has a utility file
        const utilityFile = path.join(utilityDir, `${entry.name}.svelte.ts`);
        if (fs.existsSync(utilityFile)) {
          dirs.push(utilityDir);
        }
      }
    }

    return dirs;
  }

  /**
   * Find all builder directories
   */
  private findBuilderDirectories(): string[] {
    const buildersBase = path.join(this.config.libraryPath, "src/lib/builders");

    if (!fs.existsSync(buildersBase)) {
      console.warn(`⚠️  Builders directory not found: ${buildersBase}`);
      return [];
    }

    const dirs: string[] = [];
    const entries = fs.readdirSync(buildersBase, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const builderDir = path.join(buildersBase, entry.name);
        // Verify it has a builder.svelte.ts file
        const builderFile = path.join(builderDir, "builder.svelte.ts");
        if (fs.existsSync(builderFile)) {
          dirs.push(builderDir);
        }
      }
    }

    return dirs;
  }

  /**
   * Write documentation to file
   */
  private writeDocumentation(documentation: LibraryDocumentation): void {
    const json = JSON.stringify(documentation, null, 2);
    fs.writeFileSync(this.config.outputPath, json, "utf-8");
  }
}

/**
 * Run generator
 */
async function main() {
  // TODO: Adapter selon votre structure
  const LIBRARY_PATH = path.resolve(__dirname, "../../svxui");
  const OUTPUT_PATH = path.resolve(__dirname, "..", "library-doc.json");

  const generator = new DocumentationGenerator({
    libraryPath: LIBRARY_PATH,
    outputPath: OUTPUT_PATH,
  });

  try {
    await generator.generate();
  } catch (error) {
    console.error("❌ Error generating documentation:", error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}
