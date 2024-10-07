import { SchemaPropType, type SchemaComponent } from '$lib/doc.types.js';
import { defaultBadgeProps, Radius } from 'sveltr';

import { Colors, Sizes1To3, VariantsBadge } from 'sveltr';

/**
 * Playground template
 */

export const template = `
<script lang="ts">
    import { Badge } from 'sveltr';
</script>

<Badge:props>Badge</Badge>    
`;

export const badgeSchema: SchemaComponent = {
    extend: 'HTMLSpanElement',
    props: [
        {
            name: 'elementRef',
            type: SchemaPropType.htmlElement,
            typeHtmlElement: 'HTMLSpanElement'
        },
        {
            name: 'color',
            type: SchemaPropType.enum,
            values: Colors,
            default: defaultBadgeProps.color
        },
        {
            name: 'size',
            type: SchemaPropType.enum,
            values: Sizes1To3,
            default: defaultBadgeProps.size
        },
        {
            name: 'radius',
            type: SchemaPropType.enum,
            values: Radius,
            default: defaultBadgeProps.radius
        },
        {
            name: 'variant',
            type: SchemaPropType.enum,
            values: VariantsBadge,
            default: defaultBadgeProps.variant
        },
        {
            name: 'disabled',
            type: SchemaPropType.boolean,
            default: defaultBadgeProps.disabled
        }
    ],
    slots: [
        {
            name: 'default'
        }
    ],
    events: []
};
