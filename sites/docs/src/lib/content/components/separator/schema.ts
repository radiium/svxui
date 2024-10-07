import { Colors, defaultSeparatorProps } from 'svxui';
import { SchemaPropType, type SchemaComponent } from '$lib/doc.types.js';
import { Orientations, Sizes1To4 } from 'svxui';

/**
 * Playground template
 */

export const template = `
<script lang="ts">
    import { Separator } from 'svxui';
</script>

<Separator:props />   
`;

/**
 * Separator schema
 */

export const separatorSchema: SchemaComponent = {
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
            default: defaultSeparatorProps.color
        },
        {
            name: 'size',
            type: SchemaPropType.enum,
            values: Sizes1To4,
            default: defaultSeparatorProps.size
        },
        {
            name: 'orientation',
            type: SchemaPropType.enum,
            values: Orientations,
            default: defaultSeparatorProps.orientation
        }
    ],
    slots: [],
    events: []
};
