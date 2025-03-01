import BookOpenText from '$lib/icons/BookOpenText.svelte';
import DoorOpenIcon from '$lib/icons/DoorOpenIcon.svelte';
import FileCssIcon from '$lib/icons/FileCssIcon.svelte';
import PaletteIcon from '$lib/icons/PaletteIcon.svelte';
import SlidersIcon from '$lib/icons/SlidersIcon.svelte';
import type { NavItem, NavSection } from '../types.js';
import { docComponentMetadataList } from './doc-component-metadata.js';
import { toPascalCase } from './functions.js';

const startSection: NavSection = {
    category: 'base',
    pages: [
        {
            slug: 'introduction',
            slugFull: '/docs/base/introduction',
            label: 'Introduction',
            IconComponent: BookOpenText
        },
        {
            slug: 'getting-started',
            slugFull: '/docs/base/getting-started',
            label: 'Getting started',
            IconComponent: DoorOpenIcon
        },
        {
            slug: 'theme-provider',
            slugFull: '/docs/base/theme-provider',
            label: 'Theme Provider',
            IconComponent: SlidersIcon
        },
        {
            slug: 'global-style',
            slugFull: '/docs/base/global-style',
            label: 'Global Style',
            IconComponent: FileCssIcon
        },

        {
            slug: 'color',
            slugFull: '/docs/base/color',
            label: 'Color',
            IconComponent: PaletteIcon
        }
    ]
};

const componentSection: NavSection = {
    title: 'Components',
    category: 'components',
    pages: docComponentMetadataList.map<NavItem>((item) => ({
        slug: item.name,
        slugFull: `/docs/components/${item.name}`,
        label: toPascalCase(item.name)
    }))
};

export const docNavigation: NavSection[] = [
    startSection, //
    componentSection
];
