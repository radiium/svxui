import BookOpenText from '$lib/components/icons/BookOpenText.svelte';
import ChefHatIcon from '$lib/components/icons/ChefHatIcon.svelte';
import DoorOpenIcon from '$lib/components/icons/DoorOpenIcon.svelte';
import FileCssIcon from '$lib/components/icons/FileCssIcon.svelte';
import PaletteIcon from '$lib/components/icons/PaletteIcon.svelte';
import SlidersIcon from '$lib/components/icons/SlidersIcon.svelte';
import type { MDComponentMap, NavSection } from '$lib/types';
import { getSlugFromPath, toPascalCase } from '../utils/functions';

export const loadNavigation = () => {
    const modules: MDComponentMap = import.meta.glob(`../content/**/*.svx`, { eager: true });

    const startSection: NavSection = {
        category: 'base',
        pages: [
            {
                slug: 'introduction',
                slugFull: '/docs/introduction',
                label: 'Introduction',
                IconComponent: BookOpenText
            },
            {
                slug: 'getting-started',
                slugFull: '/docs/getting-started',
                label: 'Getting started',
                IconComponent: DoorOpenIcon
            },
            {
                slug: 'styling',
                slugFull: '/docs/styling',
                label: 'Styling',
                IconComponent: FileCssIcon
            },
            {
                slug: 'theming',
                slugFull: '/docs/theming',
                label: 'Theming',
                IconComponent: SlidersIcon
            },
            {
                slug: 'colors',
                slugFull: '/docs/colors',
                label: 'Colors',
                IconComponent: PaletteIcon
            },
            {
                slug: 'recipes',
                slugFull: '/docs/recipes',
                label: 'Recipes',
                IconComponent: ChefHatIcon
            }
        ]
    };

    const layoutsSection: NavSection = {
        title: 'Layouts',
        category: 'layouts',
        pages: []
    };
    const componentsSection: NavSection = {
        title: 'Components',
        category: 'components',
        pages: []
    };
    const attachmentsSection: NavSection = {
        title: 'Attachments',
        category: 'attachments',
        pages: []
    };
    const buildersSection: NavSection = {
        title: 'Builders',
        category: 'builders',
        pages: []
    };
    const utilitiesSection: NavSection = {
        title: 'Utilities',
        category: 'utilities',
        pages: []
    };

    for (const path of Object.keys(modules)) {
        const slug = getSlugFromPath(path);

        if (path.includes('/content/layouts')) {
            layoutsSection.pages.push({
                slug,
                slugFull: `/docs/layouts/${slug}`,
                label: toPascalCase(slug)
            });
        } else if (path.includes('/content/components')) {
            componentsSection.pages.push({
                slug,
                slugFull: `/docs/components/${slug}`,
                label: toPascalCase(slug)
            });
        } else if (path.includes('/content/attachments')) {
            attachmentsSection.pages.push({
                slug,
                slugFull: `/docs/attachments/${slug}`,
                label: toPascalCase(slug)
            });
        } else if (path.includes('/content/builders')) {
            buildersSection.pages.push({
                slug,
                slugFull: `/docs/builders/${slug}`,
                label: toPascalCase(slug)
            });
        } else if (path.includes('/content/utilities')) {
            utilitiesSection.pages.push({
                slug,
                slugFull: `/docs/utilities/${slug}`,
                label: toPascalCase(slug)
            });
        }
    }

    return [
        startSection, //
        layoutsSection,
        componentsSection,
        buildersSection,
        attachmentsSection,
        utilitiesSection
    ];
};
