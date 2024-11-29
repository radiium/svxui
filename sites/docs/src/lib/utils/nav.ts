import {
    allActions,
    allHooks,
    allComponents,
    allExamples,
    allStarts,
    allThemes,
    type DocumentTypes
} from '../../../.contentlayer/generated';

export type NavItem = {
    slug: string;
    slugFull: string;
    title: string;
    description?: string;
    href: string;
};

export type NavSection = {
    title?: string;
    pages: NavItem[];
};

function buildNavItems(items: DocumentTypes[]): NavItem[] {
    return items.map((item) => {
        const { title, description, slug, slugFull } = item;
        return { title, description, slug, slugFull, href: `/docs${slugFull}` };
    });
}

export const nav = [
    {
        title: 'Start',
        pages: buildNavItems(allStarts.reverse())
    },
    {
        title: 'Theme',
        pages: buildNavItems(allThemes).sort((a, b) => {
            // prettier-ignore
            return a.slug === 'theme-provider' 
                ? -1 
                : a.slug === 'theme-context' 
                    ? -1 
                    : 1;
        })
    },
    {
        title: 'Components',
        pages: buildNavItems(allComponents).filter((item) => item.slug !== 'box')
    },
    {
        title: 'Actions',
        pages: buildNavItems(allActions)
    },
    {
        title: 'Hooks',
        pages: buildNavItems(allHooks)
    },
    {
        title: 'Examples',
        pages: buildNavItems(allExamples)
    }
];
