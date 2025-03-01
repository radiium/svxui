import { createHighlighterCoreSync } from 'shiki/dist/core.mjs';
import { createJavaScriptRegexEngine } from 'shiki/dist/engine-javascript.mjs';
import javascriptLang from 'shiki/dist/langs/javascript.mjs';
import svelteLang from 'shiki/dist/langs/svelte.mjs';
import typescriptLang from 'shiki/dist/langs/typescript.mjs';
import darkPlusTheme from 'shiki/dist/themes/dark-plus.mjs';
import lightPlusTheme from 'shiki/dist/themes/light-plus.mjs';
import { Node, SourceFile, ts, TypeAliasDeclaration } from 'ts-morph';
import { ComponentMetadata, SharedTypeMetadata } from '../types';

const highlighter = createHighlighterCoreSync({
    themes: [darkPlusTheme, lightPlusTheme],
    langs: [svelteLang, javascriptLang, typescriptLang],
    engine: createJavaScriptRegexEngine()
});

function highlight(code: string): string {
    return highlighter.codeToHtml(code, {
        lang: 'typescript',
        themes: {
            dark: 'dark-plus',
            light: 'light-plus'
        }
    });
}

/**
 * Try all type il source file
 * @param valueDeclaration
 * @returns
 */
export function extractSharedTypeMetadata(
    sourceFile?: SourceFile | null,
    components: ComponentMetadata[] = []
): {
    sharedTypes: SharedTypeMetadata[];
    sharedTypesText: string;
} {
    let sharedTypes: SharedTypeMetadata[] = [];
    let sharedTypesText: string = '';
    if (sourceFile) {
        const statements = sourceFile.getStatements();
        if (statements.length > 0) {
            const items = statements
                .filter((statement) => statement.getSymbol() && Node.isTypeAliasDeclaration(statement))
                .filter(
                    (statement) =>
                        (statement as TypeAliasDeclaration).getTypeNode()?.getKind() !==
                        ts.SyntaxKind.UnionType
                )
                .filter(
                    (statement) =>
                        !components.some((comp) => comp.name + 'Props' === statement.getSymbol()!.getName())
                );

            sharedTypes = items.map((statement) => ({
                name: statement.getSymbol()!.getName(),
                // text: highlight(statement.getText()),
                text: statement.getText(),
                kind: (statement as TypeAliasDeclaration).getTypeNode()?.getKindName()
            }));

            sharedTypesText = highlight(sharedTypes.map((st) => st.text).join('\n\n'));
        }
    }
    return { sharedTypes, sharedTypesText };
}
