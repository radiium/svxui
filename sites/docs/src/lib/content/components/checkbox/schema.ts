import { defaultCheckboxProps, Radius } from 'svxui';
import { SchemaPropType, type SchemaComponent } from '$lib/doc.types.js';
import { Colors, Sizes1To3 } from 'svxui';

/**
 * Playground template
 */

export const template = `
<script lang="ts">
    import { Checkbox } from 'svxui';
</script>

<Checkbox:props />  
`;

/**
 * Checkbox schema
 */

export const checkboxSchema: SchemaComponent = {
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
            default: defaultCheckboxProps.color
        },
        {
            name: 'size',
            type: SchemaPropType.enum,
            values: Sizes1To3,
            default: defaultCheckboxProps.size
        },
        {
            name: 'radius',
            type: SchemaPropType.enum,
            values: Radius,
            default: defaultCheckboxProps.radius
        },
        {
            name: 'group',
            type: SchemaPropType.string,
            default: defaultCheckboxProps.group
        },
        {
            name: 'value',
            type: SchemaPropType.string,
            default: defaultCheckboxProps.value
        },
        {
            name: 'checked',
            type: SchemaPropType.boolean,
            default: defaultCheckboxProps.checked
        },
        {
            name: 'indeterminate',
            type: SchemaPropType.boolean,
            default: defaultCheckboxProps.indeterminate
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
