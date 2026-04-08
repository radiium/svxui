import type { Snippet } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';
import type { FlexProps } from '../flex/types.js';

// ─── COMMON ────────────────────────────────────────────────────────

export type LayoutSpacing = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | (string & {});

// ─── CENTER ────────────────────────────────────────────────────────

/**
 * Extends native HTML attributes inferred from the rendered element `as`.
 */
export type CenterProps<ElementTag extends keyof SvelteHTMLElements = 'div'> =
    Omit<SvelteHTMLElements[ElementTag], 'children'> & {
        /**
         * HTML element to render as.
         */
        as?: ElementTag;
        /**
         * Maximum width of the centered content.
         */
        maxWidth?: string;
        /**
         * Horizontal padding on both sides. Accepts a space scale token or an arbitrary CSS value.
         */
        gutters?: LayoutSpacing;
        /**
         * Centers content intrinsically using `fit-content` instead of a hard max-width.
         */
        intrinsic?: boolean;
        /**
         * Content to render inside the center container.
         */
        children?: Snippet<[void]>;
    };

// ─── SIDEBAR ────────────────────────────────────────────────────────

/**
 * Extends native HTML attributes inferred from the rendered element `as`.
 */
export type SidebarProps<ElementTag extends keyof SvelteHTMLElements = 'div'> =
    Omit<SvelteHTMLElements[ElementTag], 'children'> & {
        /**
         * HTML element to render as.
         */
        as?: ElementTag;
        /**
         * Which side the sidebar is on.
         */
        side?: 'left' | 'right';
        /**
         * Width of the sidebar. The content area fills the remaining space.
         */
        sideWidth?: string;
        /**
         * Minimum width the content area must maintain before the layout wraps to a stacked column.
         */
        contentMin?: string;
        /**
         * Gap between the sidebar and the content area.
         */
        gap?: LayoutSpacing;
        /**
         * The fixed-width sidebar region.
         */
        sidebar?: Snippet;
        /**
         * The fluid content area.
         */
        children?: Snippet<[void]>;
    };

// ─── SWITCHER ────────────────────────────────────────────────────────

/**
 * Extends native HTML attributes inferred from the rendered element `as`.
 */
export type SwitcherProps<ElementTag extends keyof SvelteHTMLElements = 'div'> =
    Omit<SvelteHTMLElements[ElementTag], 'children'> & {
        /**
         * HTML element to render as.
         */
        as?: ElementTag;
        /**
         * Container width below which items switch from a row to a stacked column.
         */
        threshold?: string;
        /**
         * Gap between items.
         */
        gap?: LayoutSpacing;
        /**
         * Content to render inside the switcher.
         */
        children?: Snippet<[void]>;
    };

// ─── CLUSTER ────────────────────────────────────────────────────────

/**
 * Extends native HTML attributes inferred from the rendered element `as`.
 */
export type ClusterProps<ElementTag extends keyof SvelteHTMLElements = 'div'> = Omit<
    FlexProps<ElementTag>,
    'wrap' | 'direction'
>;

// ─── STACK ────────────────────────────────────────────────────────

/**
 * Extends native HTML attributes inferred from the rendered element `as`.
 */
export type StackProps<ElementTag extends keyof SvelteHTMLElements = 'div'> = Omit<
    FlexProps<ElementTag>,
    'direction' | 'wrap'
>;
