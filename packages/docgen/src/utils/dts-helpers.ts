import { ModuleKind, Project, ScriptTarget } from "ts-morph";

import { createHighlighterCoreSync } from "shiki/dist/core.mjs";
import { createJavaScriptRegexEngine } from "shiki/dist/engine-javascript.mjs";
import javascriptLang from "shiki/dist/langs/javascript.mjs";
import svelteLang from "shiki/dist/langs/svelte.mjs";
import typescriptLang from "shiki/dist/langs/typescript.mjs";
import darkPlusTheme from "shiki/dist/themes/dark-plus.mjs";
import lightPlusTheme from "shiki/dist/themes/light-plus.mjs";

const highlighter = createHighlighterCoreSync({
  themes: [darkPlusTheme, lightPlusTheme],
  langs: [svelteLang, javascriptLang, typescriptLang],
  engine: createJavaScriptRegexEngine(),
});

export function highlight(code: string): string {
  return highlighter.codeToHtml(code, {
    lang: "typescript",
    themes: {
      dark: "dark-plus",
      light: "light-plus",
    },
  });
}

export function generateDTS(
  tsSourceText: string,
  virtualFileName = "utility.ts",
): string | undefined {
  const project = new Project({
    useInMemoryFileSystem: true,
    compilerOptions: {
      target: ScriptTarget.ESNext,
      module: ModuleKind.ESNext,
      declaration: true,
      emitDeclarationOnly: true,
      noEmitOnError: false,
      skipLibCheck: true,
    },
  });

  // Inject the raw TS as a virtual file
  const sourceFile = project.createSourceFile(virtualFileName, tsSourceText, {
    overwrite: true,
  });

  const dtsFile = project
    // Emit virtual DTS file in memory
    .emitToMemory()
    // Find virtual DTS file
    .getFiles()
    .find((f) => f.filePath.endsWith(".d.ts"));

  if (dtsFile?.text) {
    const result = dtsFile.text
      // 1. Remove #private;
      .replace(/^\s*#private;\s*\n/m, "")
      // 2. Add a blank line between documented methods
      .replace(/;\n(\s*\/\*\*)/g, ";\n\n$1");

    return highlight(result.trim());
  }

  return undefined;
}
