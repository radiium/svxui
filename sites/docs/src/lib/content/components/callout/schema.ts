import { SchemaPropType, type SchemaComponent } from '$lib/doc.types.js';
import { Colors, defaultCalloutProps, Radius, Sizes1To3, VariantsCallout } from 'svxui';

/**
 * Playground template
 */

export const template = `
<script lang="ts">
    import { Callout } from 'svxui';
</script>

<Callout:props>:slot<Callout>    
`;

/**
 * Callout schema
 */

export const calloutSchema: SchemaComponent = {
    extend: 'HTMLDivElement',
    props: [
        {
            name: 'elementRef',
            type: SchemaPropType.htmlElement,
            typeHtmlElement: 'HTMLDivElement'
        },
        {
            name: 'color',
            type: SchemaPropType.enum,
            values: Colors,
            default: defaultCalloutProps.color
        },
        {
            name: 'size',
            type: SchemaPropType.enum,
            values: Sizes1To3,
            default: defaultCalloutProps.size
        },
        {
            name: 'radius',
            type: SchemaPropType.enum,
            values: Radius,
            default: defaultCalloutProps.radius
        },
        {
            name: 'variant',
            type: SchemaPropType.enum,
            values: VariantsCallout,
            default: defaultCalloutProps.variant
        },
        {
            name: 'fullWidth',
            type: SchemaPropType.boolean,
            default: defaultCalloutProps.fullWidth
        }
    ],
    slots: [
        {
            name: 'icon'
        },
        {
            name: 'default'
        }
    ],
    events: []
};
