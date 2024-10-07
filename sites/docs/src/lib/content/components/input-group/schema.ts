import { SchemaPropType, type SchemaComponent } from '$lib/doc.types.js';

export const inputGroupSchema: SchemaComponent = {
    extend: 'HTMLDivElement',
    props: [
        {
            name: 'elementRef',
            type: SchemaPropType.htmlElement,
            typeHtmlElement: 'HTMLDivElement'
        }
    ],
    slots: [
        {
            name: 'default'
        }
    ],
    events: []
};
