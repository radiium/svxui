import type { SchemaAction } from '$lib/doc.types';

export const clickoutsideSchema: SchemaAction = {
    name: 'Clickoutside',
    params: [],
    attributes: [
        {
            name: 'on:clickoutside',
            type: 'CustomEvent<HTMLElement>'
        }
    ]
};
