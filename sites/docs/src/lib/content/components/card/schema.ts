import { defaultCardProps, Radius } from 'sveltr';
import { SchemaPropType, type SchemaComponent } from '$lib/doc.types.js';
import { Sizes0To5, VariantsCard } from 'sveltr';

/**
 * Playground template
 */

export const template = `
<script lang="ts">
    import { Card } from 'sveltr';
</script>

<Card:props>Card content<Card>    
`;

/**
 * Card schema
 */

export const cardSchema: SchemaComponent = {
    extend: 'HTMLDivElement',
    props: [
        {
            name: 'elementRef',
            type: SchemaPropType.htmlElement,
            typeHtmlElement: 'HTMLDivElement'
        },
        {
            name: 'size',
            type: SchemaPropType.enum,
            values: Sizes0To5,
            default: defaultCardProps.size
        },
        {
            name: 'radius',
            type: SchemaPropType.enum,
            values: Radius,
            default: defaultCardProps.radius
        },
        {
            name: 'variant',
            type: SchemaPropType.enum,
            values: VariantsCard,
            default: defaultCardProps.variant
        },
        {
            name: 'translucent',
            type: SchemaPropType.boolean,
            default: defaultCardProps.translucent
        }
    ],
    slots: [
        {
            name: 'default'
        }
    ],
    events: []
};
