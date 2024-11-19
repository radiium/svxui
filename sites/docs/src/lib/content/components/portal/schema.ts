import { defaultPortalProps } from 'svxui';
import { SchemaPropType, type SchemaComponent } from '$lib/doc.types.js';

export const portalSchema: SchemaComponent = {
    props: [
        {
            name: 'target',
            type: SchemaPropType.htmlElement,
            typeHtmlElement: 'HTMLElement | string',
            default: defaultPortalProps.target
        },
        {
            name: 'disabled',
            type: SchemaPropType.boolean,
            default: defaultPortalProps.disabled
        }
    ],
    snippets: [
        {
            name: 'default'
        }
    ],
    events: []
};
