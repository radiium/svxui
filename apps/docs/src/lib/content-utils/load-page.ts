import type { MDComponentMap } from '$lib/types';
import { error } from '@sveltejs/kit';
import { loadNavigation } from './load-navigation';

export const loadPage = async (category: string, slug: string) => {
    const modules: MDComponentMap = import.meta.glob(`../content/**/*.svx`, { eager: true });
    const path = category ? `../content/${category}/${slug}/index.svx` : `../content/${slug}.svx`;
    const slugFull = '/' + ['docs', category, slug].filter(Boolean).join('/');

    const page = modules[path];
    if (page) {
        return {
            slug,
            slugFull,
            path,
            Component: page.default,
            frontmatter: page.metadata,
            navigation: loadNavigation()
        };
    } else {
        return error(404, `Page not found: ${slug}`);
    }
};

export const loadBasePage = (slug: string) => loadPage('', slug);
export const loadComponentPage = (slug: string) => loadPage('components', slug);
export const loadUtilityPage = (slug: string) => loadPage('utilities', slug);
export const loadBuilderPage = (slug: string) => loadPage('builders', slug);
export const loadAttachmentPage = (slug: string) => loadPage('attachments', slug);
export const loadRecipePage = (slug: string) => loadPage('recipes', slug);
