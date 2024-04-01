import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types.js';

export const load: PageLoad = async ({ params, parent }) => {
    const { slug } = params;
    const {
        nav: [root]
    } = await parent();

    const page = root.pages.find((page) => page.slug === slug);
    if (!page) {
        error(404, '"/docs/' + slug + '" not fount');
    }
    return page;
};
