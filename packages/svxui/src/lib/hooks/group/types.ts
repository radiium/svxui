/**
 * Shared
 */

import type { WrapValue } from '$lib/utils/wrap.svelte.js';

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

export type GroupItemProps = {
    value: WrapValue<string>;
    disabled: WrapValue<boolean | undefined>;
    attributsBuilder?: ItemAttrsBuilder;
};

/**
 * Group
 */

export type GroupProps = {
    value: WrapValue<GroupValue>;
    multi: WrapValue<boolean | undefined>;
    disabled: WrapValue<boolean | undefined>;
};
