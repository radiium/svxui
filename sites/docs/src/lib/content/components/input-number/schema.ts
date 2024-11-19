import { SchemaPropType, type SchemaComponent } from '$lib/doc.types.js';
import { Aligns, Colors, defaultInputNumberProps, Radius, Sizes1To3, Variants, VariantsBadge } from 'svxui';

/**
 * Playground template
 */

export const template = `
<script lang="ts">
    import { InputNumber } from 'svxui';
</script>

<InputNumber:props />    
`;

/**
 * InputNumber schema
 */

export const inputNumberSchema: SchemaComponent = {
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
            default: defaultInputNumberProps.color
        },
        {
            name: 'size',
            type: SchemaPropType.enum,
            values: Sizes1To3,
            default: defaultInputNumberProps.size
        },
        {
            name: 'radius',
            type: SchemaPropType.enum,
            values: Radius,
            default: defaultInputNumberProps.radius
        },
        {
            name: 'variant',
            type: SchemaPropType.enum,
            values: VariantsBadge,
            default: defaultInputNumberProps.variant
        },
        {
            name: 'align',
            type: SchemaPropType.enum,
            values: Aligns,
            default: defaultInputNumberProps.align
        },
        {
            name: 'value',
            type: SchemaPropType.number,
            default: defaultInputNumberProps.value
        },
        {
            name: 'step',
            type: SchemaPropType.number,
            default: defaultInputNumberProps.step
        },
        {
            name: 'min',
            type: SchemaPropType.number,
            default: defaultInputNumberProps.min
        },
        {
            name: 'max',
            type: SchemaPropType.number,
            default: defaultInputNumberProps.max
        },
        {
            name: 'fullWidth',
            type: SchemaPropType.boolean,
            default: defaultInputNumberProps.fullWidth
        },
        {
            name: 'disabled',
            type: SchemaPropType.boolean,
            default: defaultInputNumberProps.disabled
        },
        {
            name: 'required',
            type: SchemaPropType.boolean,
            default: defaultInputNumberProps.required
        },
        {
            name: 'readonly',
            type: SchemaPropType.boolean,
            default: defaultInputNumberProps.readonly
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
