import { Colors, defaultCardProps, defaultPanelProps, Radius } from 'svxui';
import { SchemaPropType, type SchemaComponent } from '$lib/doc.types.js';
import { Sizes0To5, VariantsCard } from 'svxui';

/**
 * Playground template
 */

export const template = `
<script lang="ts">
    import { Panel } from 'svxui';
</script>

<Panel:props>Panel content<Panel>    
`;

/**
 * Panel schema
 */

export const panelSchema: SchemaComponent = {
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
            default: defaultPanelProps.size
        },
        {
            name: 'size',
            type: SchemaPropType.enum,
            values: Sizes0To5,
            default: defaultPanelProps.size
        },
        {
            name: 'radius',
            type: SchemaPropType.enum,
            values: Radius,
            default: defaultPanelProps.radius
        },
        {
            name: 'variant',
            type: SchemaPropType.enum,
            values: VariantsCard,
            default: defaultPanelProps.variant
        },
        {
            name: 'translucent',
            type: SchemaPropType.boolean,
            default: defaultPanelProps.translucent
        },
        {
            name: 'fullWidth',
            type: SchemaPropType.boolean,
            default: defaultPanelProps.fullWidth
        }
    ],
    snippets: [
        {
            name: 'default'
        }
    ],
    events: []
};
