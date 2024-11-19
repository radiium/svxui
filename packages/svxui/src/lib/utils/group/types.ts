import type { WrapValue } from '../wrap.svelte.js';

/**
 * Shared
 */

export type GroupValue = string | string[] | undefined;
export type ItemAttrs = Record<string, string | boolean | number | undefined>;
export type ItemAttrsBuilder = (params: {
    id: string;
    value: string;
    active: boolean;
    disabled: boolean | undefined;
}) => Record<string, ItemAttrs>;

/**
 * Items
 */

export type GroupItemStateProps = {
    value: WrapValue<string>;
    disabled: WrapValue<boolean | undefined>;
    attributsBuilder?: ItemAttrsBuilder;
};

/**
 * Group
 */

export type GroupStateProps = {
    value: WrapValue<GroupValue>;
    multi: WrapValue<boolean | undefined>;
    disabled: WrapValue<boolean | undefined>;
};
