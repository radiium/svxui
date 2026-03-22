/**
 * Generated Docs
 */

import type { Component } from 'svelte';

/**
 * Doc page content
 */

export type MDComponent = {
    default: Component;
    metadata: {
        title?: string;
        description?: string;
        category?: string;
    };
};

export type MDComponentMap = Record<string, MDComponent>;

export type PageContentData = {
    slug: string;
    slugFull: string;
    path?: string;
    Component?: MDComponent['default'];
    frontmatter?: MDComponent['metadata'];
    navigation: NavSection[];
};

export type SectionDemoProps = {
    title?: string;
    description?: string;
    column?: boolean;
    hideCode?: boolean;
    Component: Component;
    raw: string;
    filtered: string;
    highlighted: string;
    config: string;
};

export type ExamplesConfig = {
    overview?: SectionDemoProps;
    items?: SectionDemoProps[];
};

/**
 * Doc navigation
 */

export type NavItem = {
    slug: string;
    slugFull: string;
    label: string;
    IconComponent?: Component;
};

export type NavSection = {
    title?: string;
    category?: string;
    pages: NavItem[];
};
