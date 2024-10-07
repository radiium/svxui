import type { SchemaAction } from '$lib/doc.types';

export const focusTrapSchema: SchemaAction = {
    name: 'Focus trap',
    params: [],
    attributes: [
        {
            name: 'on:clickoutside',
            type: 'CustomEvent<HTMLElement>'
        }
    ]
};
