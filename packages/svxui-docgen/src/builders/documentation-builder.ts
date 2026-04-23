import * as fs from 'node:fs';
import * as path from 'node:path';
import type {
    AttachmentDocumentation,
    BuilderDocumentation,
    ComponentDocumentation,
    LibraryDocumentation,
    LibraryMetadata,
    UtilityDocumentation
} from '../types.js';

/**
 * Documentation builder
 */
export class DocumentationBuilder {
    private libraryPath: string;
    private components: ComponentDocumentation[] = [];
    private attachments: AttachmentDocumentation[] = [];
    private utilities: UtilityDocumentation[] = [];
    private builders: BuilderDocumentation[] = [];
    private layouts: ComponentDocumentation[] = [];

    constructor(libraryPath: string) {
        this.libraryPath = libraryPath;
    }

    /**
     * Add a component documentation
     */
    addComponent(component: ComponentDocumentation): void {
        this.components.push(component);
    }

    /**
     * Add an attachment documentation
     */
    addAttachment(attachment: AttachmentDocumentation): void {
        this.attachments.push(attachment);
    }

    /**
     * Add a utility documentation
     */
    addUtility(utility: UtilityDocumentation): void {
        this.utilities.push(utility);
    }

    /**
     * Add a builder documentation
     */
    addBuilder(builder: BuilderDocumentation): void {
        this.builders.push(builder);
    }

    /**
     * Add a layout documentation
     */
    addLayout(layout: ComponentDocumentation): void {
        this.layouts.push(layout);
    }

    /**
     * Build final documentation
     */
    build(): LibraryDocumentation {
        const metadata = this.buildMetadata();

        return {
            metadata,
            components: this.components,
            attachments: this.attachments,
            utilities: this.utilities,
            builders: this.builders,
            layouts: this.layouts,
            generatedAt: new Date().toISOString()
        };
    }

    /**
     * Build library metadata
     */
    private buildMetadata(): LibraryMetadata {
        const metadata: LibraryMetadata = {
            name: this.getLibraryName(),
            sourceDirectory: this.libraryPath
        };

        const version = this.getLibraryVersion();
        if (version) {
            metadata.version = version;
        }

        return metadata;
    }

    /**
     * Get library name from package.json
     */
    private getLibraryName(): string {
        const packageJsonPath = path.join(this.libraryPath, 'package.json');

        if (fs.existsSync(packageJsonPath)) {
            try {
                const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
                return packageJson.name || 'unknown';
            } catch {
                return 'unknown';
            }
        }

        return 'unknown';
    }

    /**
     * Get library version from package.json
     */
    private getLibraryVersion(): string | undefined {
        const packageJsonPath = path.join(this.libraryPath, 'package.json');

        if (fs.existsSync(packageJsonPath)) {
            try {
                const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
                return packageJson.version;
            } catch {
                return undefined;
            }
        }

        return undefined;
    }
}
