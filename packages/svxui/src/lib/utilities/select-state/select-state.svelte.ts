import { ListboxState } from '../listbox-state/listbox-state.svelte.js';
import type {
    ListboxGetItemOptions,
    ListboxGetItemReturn,
    SelectAttributes,
    SelectStateOptions
} from './types.js';

export const LISTBOX_ROOT_KEY = 'listbox-root' as const;
export const LISTBOX_ITEM_KEY = 'listbox-item' as const;

/**
 *
 */
export class SelectState<Value, Multiple extends boolean> extends ListboxState<Value, Multiple> {
    constructor(options: SelectStateOptions<Value, Multiple>) {
        super(options);
    }

    /**
     * Listbox root attributes
     */
    get attrs(): SelectAttributes {
        return {
            ...super.attrs
        } as const;
    }

    getItem = (value: Value, options?: ListboxGetItemOptions): ListboxGetItemReturn => {
        const item = this.getItem(value, options);
        return { ...item } as const;
    };
}
