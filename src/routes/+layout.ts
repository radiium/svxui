import type { ComponentType } from 'svelte';
import type { LayoutData } from './$types.js';

export const prerender = false;
export const ssr = false;

interface DocPage {
    path: string;
    slug: string;
    href: string;
    page: ComponentType;
    metadata: {
        title: string;
        description: string;
    };
}

interface DocNavSection {
    title?: string;
    pages: DocPage[];
}

interface DocNav {
    nav: DocNavSection[];
}

const DOCS_DIR = '../lib-doc/contents/';
const basename = (path: string) => path.split('/').pop()?.split('.').shift() ?? '';
const fileDir = (path: string) => path.split('/').slice(0, -1).pop();

async function parseModule([path, resolver]): Promise<DocPage> {
    const basepath = path.replace(DOCS_DIR, '');
    const dir = fileDir(basepath);
    const slug = basename(basepath);
    const href = ['/docs', dir, slug].filter(Boolean).join('/');

    const pageResult = await resolver();
    const { default: page, metadata } = pageResult;
    return { path, slug, href, page, metadata };
}

export const load: LayoutData = async ({ params }): Promise<DocNav> => {
    const modulesRoot = import.meta.glob('../lib-doc/contents/*.md');
    const modulesTheme = import.meta.glob('../lib-doc/contents/theme/*.md');
    const modulesComponents = import.meta.glob('../lib-doc/contents/components/*.md');
    const modulesRecipes = import.meta.glob('../lib-doc/contents/recipes/*.md');

    const pagesRoot = await Promise.all(Object.entries(modulesRoot).map(parseModule));
    const pagesTheme = await Promise.all(Object.entries(modulesTheme).map(parseModule));
    const pagesComponents = await Promise.all(Object.entries(modulesComponents).map(parseModule));
    const pagesRecipes = await Promise.all(Object.entries(modulesRecipes).map(parseModule));

    return {
        nav: [
            {
                pages: pagesRoot
            },
            {
                title: 'Theme',
                pages: pagesTheme.sort((a: DocPage, b: DocPage) => (a.slug === 'theme-provider' ? -1 : 1))
            },
            {
                title: 'Components',
                pages: pagesComponents
            },
            {
                title: 'Recipes',
                pages: pagesRecipes
            }
        ]
        // findFirst(pages)
    };
};
