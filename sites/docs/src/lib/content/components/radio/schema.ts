import { defaultRadioProps } from 'svxui';
import { SchemaPropType, type SchemaComponent } from '$lib/doc.types.js';
import { Colors, Sizes1To3 } from 'svxui';

/**
 * Playground template
 */

export const template = `
<script lang="ts">
    import { Radio } from 'svxui';
</script>

<Radio:props />   
`;

/**
 * Radio schema
 */

export const radioSchema: SchemaComponent = {
    extend: 'HTMLInputElement',
    props: [
        {
            name: 'elementRef',
            type: SchemaPropType.htmlElement,
            typeHtmlElement: 'HTMLInputElement'
        },
        {
            name: 'color',
            type: SchemaPropType.enum,
            values: Colors,
            default: defaultRadioProps.color
        },
        {
            name: 'size',
            type: SchemaPropType.enum,
            values: Sizes1To3,
            default: defaultRadioProps.size
        },
        {
            name: 'group',
            type: SchemaPropType.string,
            default: defaultRadioProps.group
        },
        {
            name: 'value',
            type: SchemaPropType.string,
            default: defaultRadioProps.value
        },
        {
            name: 'disabled',
            type: SchemaPropType.boolean,
            default: defaultRadioProps.disabled
        }
    ],
    snippets: [],
    events: [
        {
            name: 'on:input'
        },
        {
            name: 'on:change'
        },
        {
            name: 'on:focus'
        },
        {
            name: 'on:blur'
        },
        {
            name: 'on:keydown'
        },
        {
            name: 'on:keypress'
        },
        {
            name: 'on:keyup'
        }
    ]
};
