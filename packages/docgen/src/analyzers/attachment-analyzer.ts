import { Project, SourceFile } from "ts-morph";
import * as path from "path";
import * as fs from "fs";
import type { AttachmentDocumentation } from "../types";
import { JSDocExtractor } from "../extractors/jsdoc-extractor";
import { OptionsAnalyzer } from "./options-analyzer";

/**
 * Attachment analyzer
 */
export class AttachmentAnalyzer {
  private project: Project;
  private attachmentDir: string;

  constructor(project: Project, attachmentDir: string) {
    this.project = project;
    this.attachmentDir = attachmentDir;
  }

  /**
   * Analyze attachment in the directory
   */
  analyze(): AttachmentDocumentation | null {
    const typesFile = this.getTypesFile();
    if (!typesFile) {
      console.warn(`⚠️  No types.ts found in ${this.attachmentDir}`);
      return null;
    }

    const attachmentFile = this.getAttachmentFile();
    if (!attachmentFile) {
      console.warn(
        `⚠️  No attachment.svelte.ts found in ${this.attachmentDir}`,
      );
      return null;
    }

    const attachmentName = this.getAttachmentName();

    // Find the Options type
    const optionsTypeName = `${this.capitalize(attachmentName)}Options`;
    const optionsType = typesFile.getTypeAlias(optionsTypeName);

    if (!optionsType) {
      console.warn(
        `⚠️  Options type ${optionsTypeName} not found for ${attachmentName}`,
      );

      return null;
    }

    // Analyze options
    const optionsAnalyzer = new OptionsAnalyzer(
      this.project,
      typesFile,
      optionsType,
    );
    const options = optionsAnalyzer.analyze();

    // Extract JSDoc from attachment function
    const attachmentFunc = this.findAttachmentFunction(attachmentFile);
    const jsdocExtractor = new JSDocExtractor();
    const jsdoc = attachmentFunc
      ? jsdocExtractor.extract(attachmentFunc)
      : { tags: [] };

    const doc: AttachmentDocumentation = {
      name: attachmentName,
      filePath: this.getRelativePath(
        path.join(this.attachmentDir, "attachment.svelte.ts"),
      ),
      description: jsdoc.description,
      optionsTypeName: optionsTypeName,
      options: options,
      tags: jsdoc.tags,
    };

    return doc;
  }

  /**
   * Get types.ts source file
   */
  private getTypesFile(): SourceFile | undefined {
    const typesPath = path.join(this.attachmentDir, "types.ts");
    return this.project.getSourceFile(typesPath);
  }

  /**
   * Get attachment.svelte.ts source file
   */
  private getAttachmentFile(): SourceFile | undefined {
    const attachmentPath = path.join(
      this.attachmentDir,
      "attachment.svelte.ts",
    );
    return this.project.getSourceFile(attachmentPath);
  }

  /**
   * Find attachment function in file
   */
  private findAttachmentFunction(file: SourceFile) {
    const functions = file.getFunctions();

    // Find exported function (usually the attachment function)
    for (const func of functions) {
      if (func.isExported()) {
        return func;
      }
    }

    return null;
  }

  /**
   * Get attachment name from directory
   */
  private getAttachmentName(): string {
    return path.basename(this.attachmentDir);
  }

  /**
   * Capitalize first letter
   */
  private capitalize(str: string): string {
    return str
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
}
