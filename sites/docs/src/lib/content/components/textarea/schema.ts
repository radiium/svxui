import { SchemaPropType, type SchemaComponent } from '$lib/doc.types.js';
import { Colors, defaultTextareaProps, Radius, Sizes1To3 } from 'svxui';

/**
 * Playground template
 */

export const template = `
<script lang="ts">
    import { Textarea } from 'svxui';
</script>

<Textarea:props />   
`;

/**
 * Textarea schema
 */

export const textareaSchema: SchemaComponent = {
    extend: 'HTMLTextAreaElement',
    props: [
        {
            name: 'elementRef',
            type: SchemaPropType.htmlElement,
            typeHtmlElement: 'HTMLTextAreaElement'
        },
        {
            name: 'color',
            type: SchemaPropType.enum,
            values: Colors,
            default: defaultTextareaProps.color
        },
        {
            name: 'size',
            type: SchemaPropType.enum,
            values: Sizes1To3,
            default: defaultTextareaProps.size
        },
        {
            name: 'radius',
            type: SchemaPropType.enum,
            values: Radius,
            default: defaultTextareaProps.radius
        },
        {
            name: 'value',
            type: SchemaPropType.string,
            default: defaultTextareaProps.value
        },
        {
            name: 'fullWidth',
            type: SchemaPropType.boolean,
            default: defaultTextareaProps.fullWidth
        },
        {
            name: 'disabled',
            type: SchemaPropType.boolean,
            default: defaultTextareaProps.disabled
        }
    ],
    slots: [],
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
