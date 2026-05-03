import type { MDComponentMap } from '$lib/types';
import { getSlugFromPath } from '../utils/functions';

export type SearchEntry = {
    url: string;
    title: string;
    description: string;
};

function getUrl(path: string, slug: string): string {
    if (path.includes('/content/layouts/')) return `/docs/layouts/${slug}`;
    if (path.includes('/content/components/')) return `/docs/components/${slug}`;
    if (path.includes('/content/attachments/')) return `/docs/attachments/${slug}`;
    if (path.includes('/content/builders/')) return `/docs/builders/${slug}`;
    if (path.includes('/content/utilities/')) return `/docs/utilities/${slug}`;
    return `/docs/${slug}`;
}

export function getSearchEntries(): SearchEntry[] {
    const modules: MDComponentMap = import.meta.glob('../content/**/*.svx', { eager: true });

    return Object.entries(modules)
        .map(([path, mod]) => {
            const slug = getSlugFromPath(path);
            return {
                url: getUrl(path, slug),
                title: mod.metadata.title ?? slug,
                description: mod.metadata.description ?? ''
            };
        })
        .filter((entry) => entry.title);
}
