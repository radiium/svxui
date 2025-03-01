import type { Orientation } from '$lib/shared.types.js';
import type { Snippet } from 'svelte';

/**
 * Tab common
 */

export type TabsValue = string | number;
export type TabsSelectionValue = TabsValue | null | undefined;
export type TabsSelectionValueChange = (value: TabsSelectionValue) => void;

/**
 * Tab root
 */

export type TabsRootSnippetProps = {
    readonly orientation: Orientation;
    readonly attrs: Record<string, unknown>;
};

export type TabRootProps = {
    /**
     * Current active tab value
     */
    value?: TabsSelectionValue;
    /**
     * Callback when value change
     */
    onValueChange?: TabsSelectionValueChange;
    /**
     * Disable all tabs
     */
    disabled?: boolean;
    /**
     * Tabs orientation
     */
    orientation?: Orientation;
    /**
     * Activate tabs when focused
     */
    selectWhenFocused?: boolean;
    /**
     * Loop when navigating with the keyboard
     */
    loop?: boolean | undefined;
    /**
     * Tab Root content to render
     */
    children?: Snippet<[TabsRootSnippetProps]>;
};

/**
 * Props Tab list
 */

export type TabsListSnippetProps = {
    readonly orientation: Orientation;
    readonly attrs: Record<string, unknown>;
};

export type TabListProps = {
    /**
     * Tab List content to render
     */
    children?: Snippet<[TabsListSnippetProps]>;
};

/**
 * Props Tab trigger
 */

export type TabsTriggerSnippetProps = {
    readonly active: boolean;
    readonly disabled: boolean;
    readonly orientation: Orientation;
    readonly attrs: Record<string, unknown>;
};

export type TabTriggerProps = {
    /**
     * Unique Tab identifier. Must be the same as TabContent value
     */
    value: TabsValue;
    /**
     * Disable tab
     */
    disabled?: boolean;
    /**
     * Tab trigger content to render
     */
    children?: Snippet<[TabsTriggerSnippetProps]>;
};

/**
 * Props Tab content
 */

export type TabsContentSnippetProps = {
    readonly active: boolean;
    readonly disabled: boolean;
    readonly orientation: Orientation;
    readonly attrs: Record<string, unknown>;
};

export type TabContentProps = {
    /**
     * Unique Tab identifier. Must be the same as TabTrigger value
     */
    value: TabsValue;
    /**
     * Tab content to render
     */
    children?: Snippet<[TabsContentSnippetProps]>;
};
