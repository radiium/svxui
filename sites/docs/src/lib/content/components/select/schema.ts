import { SchemaPropType, type SchemaComponent } from '$lib/doc.types.js';
import { Colors, defaultSelectProps, Radius, Sizes1To3 } from 'sveltr';

/**
 * Playground template
 */

export const template = `
<script lang="ts">
    import { Select } from 'sveltr';
</script>

<Select options={["opt1", "opt2", "opt3"]}:props />    
`;

/**
 * Select schema
 */

export const selectSchema: SchemaComponent = {
    extend: 'HTMLSelectElement',
    props: [
        {
            name: 'elementRef',
            type: SchemaPropType.htmlElement,
            typeHtmlElement: 'HTMLSelectElement'
        },
        {
            name: 'size',
            type: SchemaPropType.enum,
            values: Sizes1To3,
            default: defaultSelectProps.size
        },
        {
            name: 'color',
            type: SchemaPropType.enum,
            values: Colors,
            default: defaultSelectProps.color
        },
        {
            name: 'radius',
            type: SchemaPropType.enum,
            values: Radius,
            default: defaultSelectProps.radius
        },
        {
            name: 'value',
            type: SchemaPropType.stringOrNumber,
            default: defaultSelectProps.value
        },
        {
            name: 'options',
            type: SchemaPropType.custom,
            typeCustom: 'Array<SelectOption | string | number | boolean>',
            default: defaultSelectProps.options
        },
        {
            name: 'resolveValue',
            type: SchemaPropType.custom,
            typeCustom: '<T>(item: T) => string | number',
            default: defaultSelectProps.resolveValue
        },
        {
            name: 'resolveLabel',
            type: SchemaPropType.custom,
            typeCustom: '<T>(item: T) => string | number',
            default: defaultSelectProps.resolveLabel
        },
        {
            name: 'fullWidth',
            type: SchemaPropType.boolean,
            default: defaultSelectProps.fullWidth
        },
        {
            name: 'multiple',
            type: SchemaPropType.boolean,
            default: defaultSelectProps.multiple
        },
        {
            name: 'disabled',
            type: SchemaPropType.boolean,
            default: defaultSelectProps.disabled
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
