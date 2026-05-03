import type { MDComponentMap } from '$lib/types';
import { getSlugFromPath } from '../utils/functions';

export const loadEntries = (): Record<string, { slug: string }[]> => {
    const modules: MDComponentMap = import.meta.glob(`../content/**/*.svx`, { eager: true });

    const entries: Record<string, { slug: string }[]> = {
        base: [],
        layouts: [],
        components: [],
        attachments: [],
        builders: [],
        utilities: []
    };
    for (const path of Object.keys(modules)) {
        const slug = getSlugFromPath(path);

        if (path.includes('/content/layouts')) {
            entries.layouts.push({ slug });
        } else if (path.includes('/content/components')) {
            entries.components.push({ slug });
        } else if (path.includes('/content/attachments')) {
            entries.attachments.push({ slug });
        } else if (path.includes('/content/builders')) {
            entries.builders.push({ slug });
        } else if (path.includes('/content/utilities')) {
            entries.utilities.push({ slug });
        } else {
            entries.base.push({ slug });
        }
    }

    return entries;
};

export const loadBaseEntries = () => loadEntries().base;
export const loadLayoutEntries = () => loadEntries().layouts;
export const loadComponentEntries = () => loadEntries().components;
export const loadUtilityEntries = () => loadEntries().utilities;
export const loadBuilderEntries = () => loadEntries().builders;
export const loadAttachmentEntries = () => loadEntries().attachments;
