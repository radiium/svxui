import { Colors, defaultInputProps, Radius } from 'svxui';
import { SchemaPropType, type SchemaComponent } from '$lib/doc.types.js';
import { Aligns, InputTypes, Sizes1To3 } from 'svxui';

/**
 * Playground template
 */

export const template = `
<script lang="ts">
    import { Input } from 'svxui';
</script>

<Input:props />    
`;

/**
 * Input schema
 */

export const inputSchema: SchemaComponent = {
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
            default: defaultInputProps.color
        },
        {
            name: 'size',
            type: SchemaPropType.enum,
            values: Sizes1To3,
            default: defaultInputProps.size
        },
        {
            name: 'radius',
            type: SchemaPropType.enum,
            values: Radius,
            default: defaultInputProps.radius
        },
        {
            name: 'value',
            type: SchemaPropType.string,
            default: defaultInputProps.value
        },
        {
            name: 'type',
            type: SchemaPropType.enum,
            values: InputTypes,
            default: defaultInputProps.type
        },
        {
            name: 'align',
            type: SchemaPropType.enum,
            values: Aligns,
            default: defaultInputProps.align
        },
        {
            name: 'fullWidth',
            type: SchemaPropType.boolean,
            default: defaultInputProps.fullWidth
        },
        {
            name: 'disabled',
            type: SchemaPropType.boolean,
            default: defaultInputProps.disabled
        },
        {
            name: 'required',
            type: SchemaPropType.boolean,
            default: defaultInputProps.required
        },
        {
            name: 'readonly',
            type: SchemaPropType.boolean,
            default: defaultInputProps.readonly
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
