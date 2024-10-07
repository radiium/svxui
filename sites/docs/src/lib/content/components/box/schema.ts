import { SchemaPropType, type SchemaComponent } from '$lib/doc.types.js';
import { BlockDisplays, defaultBoxProps } from 'svxui';

/**
 * Playground template
 */

export const template = `
<script lang="ts">
    import { Badge } from 'svxui';
</script>

<Badge:props>Badge</Badge>    
`;

/**
 * Box schema
 */

export const boxSchema: SchemaComponent = {
    extend: 'HTMLDivElement',
    props: [
        {
            name: 'elementRef',
            type: SchemaPropType.htmlElement,
            typeHtmlElement: 'HTMLElement'
        },
        {
            name: 'as',
            type: SchemaPropType.asElement,
            typeAsElement: 'keyof SvelteHTMLElements',
            default: defaultBoxProps.as
        },
        {
            name: 'display',
            type: SchemaPropType.enum,
            values: BlockDisplays,
            default: defaultBoxProps.display
        }
    ],
    slots: [
        {
            name: 'default'
        }
    ],
    events: []
};
