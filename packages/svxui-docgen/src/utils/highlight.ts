import { createHighlighterCoreSync } from 'shiki/dist/core.mjs';
import { createJavaScriptRegexEngine } from 'shiki/dist/engine-javascript.mjs';
import javascriptLang from 'shiki/dist/langs/javascript.mjs';
import svelteLang from 'shiki/dist/langs/svelte.mjs';
import typescriptLang from 'shiki/dist/langs/typescript.mjs';
import darkPlusTheme from 'shiki/dist/themes/dark-plus.mjs';
import lightPlusTheme from 'shiki/dist/themes/light-plus.mjs';

const highlighter = createHighlighterCoreSync({
    themes: [darkPlusTheme, lightPlusTheme],
    langs: [svelteLang, javascriptLang, typescriptLang],
    engine: createJavaScriptRegexEngine()
});

export function highlight(code?: string): string | undefined {
    if (!code) return undefined;

    return highlighter.codeToHtml(code, {
        lang: 'typescript',
        themes: {
            dark: 'dark-plus',
            light: 'light-plus'
        }
    });
}
