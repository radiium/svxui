import { defineMDSveXConfig as defineConfig } from 'mdsvex'
import examples from './src/lib/remark.js'
import { createHighlighter } from 'shiki';


const highlighter = await createHighlighter({
    themes: ['dark-plus', 'light-plus'],
    langs: [
        'plaintext',
        import('shiki/langs/javascript.mjs'),
        import('shiki/langs/typescript.mjs'),
        import('shiki/langs/css.mjs'),
        import('shiki/langs/svelte.mjs'),
        import('shiki/langs/shellscript.mjs'),
        import('shiki/langs/markdown.mjs')
    ]
});

const config = defineConfig({
    extensions: ['.svelte.md', '.md', '.svx'],

    smartypants: {
        dashes: 'oldschool'
    },

    remarkPlugins: [
        [
            examples,
            {
                defaults: {
                    highlighter(code, meta) {
                        return highlighter.codeToHtml(code, {
                            lang: 'svelte',
                            themes: {
                                dark: 'dark-plus',
                                light: 'light-plus'
                            }
                        });
                    }
                }
            }
        ]
    ],
    rehypePlugins: []
})

export default config
