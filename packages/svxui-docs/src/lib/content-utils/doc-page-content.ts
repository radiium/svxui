import type { MDComponent, MDComponentMap, PageContentData } from '$lib/types';
import { getDocComponentMetadata } from './doc-component-metadata';
import { slugFromPath, slugFromPathname } from './functions';

const modules: MDComponentMap = import.meta.glob(`../content/**/*.svx`, { eager: true });

const docPageContent: Record<'base' | 'components', PageContentData[]> = {
    base: [],
    components: []
};

for (const [path, mdData] of Object.entries(modules)) {
    const pageContent = parseModule(path, mdData);
    if (path.includes('/content/base')) {
        docPageContent.base.push(pageContent);
    } else if (path.includes('/content/components')) {
        docPageContent.components.push(pageContent);
    }
}

function parseModule(path: string, page: MDComponent): PageContentData {
    const slug = slugFromPathname(slugFromPath(path));
    return {
        slug,
        slugFull: `/docs/${page.metadata.category}/${slug}`,
        path,
        Component: page.default,
        frontmatter: page.metadata,
        metadata: getDocComponentMetadata(slug)
    };
}

export { docPageContent };
