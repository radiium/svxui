import { SchemaPropType, type SchemaAction } from '$lib/doc.types';

export const lockscrollSchema: SchemaAction = {
    name: 'Lockscroll',
    params: [
        {
            name: 'initialState',
            type: SchemaPropType.boolean
        }
    ],
    attributes: [
        {
            name: 'on:blockscrollchange',
            type: 'CustomEvent<{ blocked: boolean }>'
        }
    ]
};
