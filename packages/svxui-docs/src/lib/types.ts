/**
 * Generated Docs
 */

import type { Component } from 'svelte';

export interface SharedTypeMetadata {
    name: string;
    text: string;
    kind?: string;
}

export interface ExtendedMetadata {
    type: string;
    isSvelteElement?: boolean;
}

export interface JsDocMetadata {
    text: string;
    commentText: string;
    tags: { name: string; text?: string; comment?: string }[];
}

export interface PropMetadata {
    name: string;
    isOptional: boolean;
    isBindable: boolean;
    isSnippet: boolean;
    type: string;
    aliasType?: string;
    values?: string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    defaultValue?: any;
    jsDoc?: JsDocMetadata[];
}

export interface ComponentMetadata {
    name: string;
    path: string;
    props: PropMetadata[];
    exports: PropMetadata[];
    extendeds: ExtendedMetadata[];
    jsDoc?: JsDocMetadata[];
}

export interface ComponentGroupMetadata {
    name: string;
    components: ComponentMetadata[];
    sharedTypes: SharedTypeMetadata[];
    sharedTypesText: string;
}

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
    metadata?: ComponentGroupMetadata;
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
