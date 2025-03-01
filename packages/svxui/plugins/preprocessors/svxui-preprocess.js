/** @type {import('svelte/compiler').PreprocessorGroup} */
export const sxuiThemePreprocess = () => {
    return {
        name: 'svxui:theme',
        // /** @type {import('svelte/compiler').MarkupPreprocessor} */
        //         markup: ({ filename, content }) => {
        //             if (filename.includes('ThemeRoot.svelte')) {
        //                 console.log('[markup] filename', filename);
        //                 console.log('[markup] content', content);

        //                 return {
        //                     code: content?.replace(
        //                         '<style></style>',
        //                         `
        // <style global>

        // </style>
        //                         `
        //                     )
        //                 };
        //             }
        //         },
        style({ filename, content, attributes, markup }) {
            console.log('[STYLE] filename', filename);

            if (filename?.includes('ThemeRoot.svelte')) {
                console.log('filename', filename);
                // console.log('content', content);
                // console.log('attributes', attributes);
                // console.log('markup', markup);
            }
        }
    };
};
