import { defaultTextProps } from 'sveltr';
import { SchemaPropType, type SchemaComponent } from '$lib/doc.types.js';
import { Aligns, Colors, Sizes1To9, TextWraps, Transforms, Weights } from 'sveltr';

/**
 * Playground template
 */

export const template = `
<script lang="ts">
    import { Text } from 'sveltr';
</script>

<Text:props>Super sample text !</Text>   
`;

/**
 * Text schema
 */

export const textSchema: SchemaComponent = {
    extend: 'HTMLElement',
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
            default: defaultTextProps.as
        },
        {
            name: 'color',
            type: SchemaPropType.enum,
            values: Colors,
            default: defaultTextProps.color
        },
        {
            name: 'size',
            type: SchemaPropType.enum,
            values: Sizes1To9,
            default: defaultTextProps.size
        },
        {
            name: 'weight',
            type: SchemaPropType.enum,
            values: Weights,
            default: defaultTextProps.weight
        },
        {
            name: 'transform',
            type: SchemaPropType.enum,
            values: Transforms,
            default: defaultTextProps.transform
        },
        {
            name: 'align',
            type: SchemaPropType.enum,
            values: Aligns,
            default: defaultTextProps.align
        },
        {
            name: 'wrap',
            type: SchemaPropType.enum,
            values: TextWraps,
            default: defaultTextProps.wrap
        },
        {
            name: 'truncate',
            type: SchemaPropType.boolean,
            default: defaultTextProps.truncate
        },
        {
            name: 'disabled',
            type: SchemaPropType.boolean,
            default: defaultTextProps.disabled
        }
    ],
    slots: [
        {
            name: 'default'
        }
    ],
    events: []
};
