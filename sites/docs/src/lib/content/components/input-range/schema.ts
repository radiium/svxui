import { SchemaPropType, type SchemaComponent } from '$lib/doc.types.js';
import { Colors, defaultInputRangeProps, Radius, Sizes1To3 } from 'svxui';

/**
 * Playground template
 */

export const template = `
<script lang="ts">
    import { InputRange } from 'svxui';
</script>

<InputRange:props />   
`;

/**
 * InputRange schema
 */

export const inputRangeSchema: SchemaComponent = {
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
            default: defaultInputRangeProps.color
        },
        {
            name: 'size',
            type: SchemaPropType.enum,
            values: Sizes1To3,
            default: defaultInputRangeProps.size
        },
        {
            name: 'radius',
            type: SchemaPropType.enum,
            values: Radius,
            default: defaultInputRangeProps.radius
        },
        {
            name: 'value',
            type: SchemaPropType.number,
            default: defaultInputRangeProps.value
        },
        {
            name: 'min',
            type: SchemaPropType.number,
            default: defaultInputRangeProps.min
        },
        {
            name: 'max',
            type: SchemaPropType.number,
            default: defaultInputRangeProps.max
        },
        {
            name: 'step',
            type: SchemaPropType.number,
            default: defaultInputRangeProps.step
        },
        {
            name: 'fullWidth',
            type: SchemaPropType.boolean,
            default: defaultInputRangeProps.fullWidth
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
