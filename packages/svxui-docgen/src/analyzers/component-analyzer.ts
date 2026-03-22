import * as fs from 'node:fs';
import * as path from 'node:path';
import { Project, SourceFile, TypeAliasDeclaration } from 'ts-morph';
import { SourceFileContext } from '../core/source-file-context.js';
import { JSDocExtractor } from '../extractors/jsdoc-extractor.js';
import type { ComponentDocumentation, PropDocumentation } from '../types.js';
import { toPascalCase } from '../utils/to-pascal-case.js';
import { PropsAnalyzer } from './props-analyzer.js';
import { SvelteAnalyzer, type SveltePropInfo } from './svelte-analyzer.js';

/**
 * Component analyzer
 */
export class ComponentAnalyzer {
    private readonly project: Project;
    private readonly context: SourceFileContext;
    private readonly componentDir: string;

    constructor(project: Project, componentDir: string) {
        this.project = project;
        this.context = new SourceFileContext(project);
        this.componentDir = componentDir;
    }

    /**
     * Analyze all components in the directory
     */
    analyze(): ComponentDocumentation[] {
        const { componentsPath, typeFileName, typeFilePath } = this.resolveModuleFiles();

        const typesFile = this.context.getSourceFile(typeFilePath);
        if (!typesFile) {
            console.warn(`Warning: No ${typeFileName} found in ${this.componentDir}`);
            return [];
        }

        const componentFiles = this.getComponentFiles(componentsPath);
        if (componentFiles.length === 0) {
            console.warn(`Warning: No .svelte files found in ${this.componentDir}`);
            return [];
        }

        const docs: ComponentDocumentation[] = [];

        // Extract all exported Props types
        const propsTypes = this.extractPropsTypes(typesFile);

        for (const componentFile of componentFiles) {
            const doc = this.analyzeComponent(componentFile, typesFile, propsTypes);
            if (doc) {
                docs.push(doc);
            }
        }

        return docs;
    }

    /**
     * Analyze a single component
     */
    private analyzeComponent(
        componentFile: string,
        typesFile: SourceFile,
        propsTypes: Map<string, TypeAliasDeclaration>
    ): ComponentDocumentation | null {
        const componentBaseName = path.basename(componentFile, '.svelte');
        const componentName = toPascalCase(componentBaseName);

        // Find corresponding props type
        const propsTypeName = `${componentName}Props`;
        const propsType = propsTypes.get(propsTypeName);

        if (!propsType) {
            console.warn(`Warning: Props type ${propsTypeName} not found for ${componentName}`);
            return null;
        }

        // Analyze TypeScript props
        const propsAnalyzer = PropsAnalyzer.forComponent(this.project, typesFile, propsType);
        const { props } = propsAnalyzer.analyze();

        // Analyze Svelte component for $bindable and default values
        const svelteAnalyzer = new SvelteAnalyzer(componentFile);
        const svelteAnalysis = svelteAnalyzer.analyze();

        // Merge Svelte analysis into props documentation
        this.mergeSvelteAnalysis(props, svelteAnalysis.props);

        // Extract JSDoc
        const jsdocExtractor = new JSDocExtractor();
        const jsdoc = jsdocExtractor.extract(propsType);

        return {
            category: 'component',
            name: componentBaseName,
            filePath: this.context.getRelativePath(componentFile),
            description: jsdoc.description,
            typeName: propsTypeName,
            props,
            tags: jsdoc.tags
        };
    }

    /**
     * Resolve module files path
     */
    private resolveModuleFiles() {
        const componentsPath = path.join(this.componentDir, 'components');
        const typeFileName = 'types.ts';
        const typeFilePath = path.join(this.componentDir, typeFileName);

        return {
            componentsPath,
            typeFileName,
            typeFilePath
        };
    }

    /**
     * Get all .svelte component files
     */
    private getComponentFiles(componentsPath: string): string[] {
        if (!fs.existsSync(componentsPath)) {
            return [];
        }

        const files = fs.readdirSync(componentsPath);
        return files.filter((f) => f.endsWith('.svelte')).map((f) => path.join(componentsPath, f));
    }

    /**
     * Merge Svelte analysis (bindable, default values) into props documentation
     */
    private mergeSvelteAnalysis(props: PropDocumentation[], svelteProps: Map<string, SveltePropInfo>): void {
        for (const prop of props) {
            const svelteProp = svelteProps.get(prop.name);

            if (svelteProp) {
                prop.isBindable = svelteProp.isBindable;

                if (svelteProp.defaultValue !== undefined) {
                    prop.defaultValue = svelteProp.defaultValue;
                }
            }
        }
    }

    /**
     * Extract all Props type aliases from types.ts
     */
    private extractPropsTypes(typesFile: SourceFile): Map<string, TypeAliasDeclaration> {
        const propsTypes = new Map<string, TypeAliasDeclaration>();

        for (const typeAlias of typesFile.getTypeAliases()) {
            const name = typeAlias.getName();
            if (name.endsWith('Props')) {
                propsTypes.set(name, typeAlias);
            }
        }

        return propsTypes;
    }
}
