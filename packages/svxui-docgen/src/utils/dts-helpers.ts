import { ModuleKind, Project, ScriptTarget } from 'ts-morph';

export function generateDTS(tsSourceText: string, virtualFileName = 'utility.ts'): string | undefined {
    const project = new Project({
        useInMemoryFileSystem: true,
        compilerOptions: {
            target: ScriptTarget.ESNext,
            module: ModuleKind.ESNext,
            declaration: true,
            emitDeclarationOnly: true,
            noEmitOnError: false,
            skipLibCheck: true
        }
    });

    // Inject the raw TS as a virtual file
    project.createSourceFile(virtualFileName, tsSourceText, {
        overwrite: true
    });

    const dtsFile = project
        // Emit virtual DTS file in memory
        .emitToMemory()
        // Find virtual DTS file
        .getFiles()
        .find((f) => f.filePath.endsWith('.d.ts'));

    if (dtsFile?.text) {
        const result = dtsFile.text
            // 1. Remove #private;
            .replace(/^\s*#private;\s*\n/m, '')
            // 2. Add a blank line between documented methods
            .replace(/;\n(\s*\/\*\*)/g, ';\n\n$1');

        return result.trim();
    }

    return undefined;
}
