import { SchemaPropType, type SchemaComponent } from '$lib/doc.types.js';
import { Colors, defaultSwitchProps, Radius, Sizes1To3 } from 'svxui';

/**
 * Playground template
 */

export const template = `
<script lang="ts">
    import { Switch } from 'svxui';
</script>

<Switch:props />    
`;

/**
 * Switch schema
 */

export const switchSchema: SchemaComponent = {
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
            default: defaultSwitchProps.color
        },
        {
            name: 'size',
            type: SchemaPropType.enum,
            values: Sizes1To3,
            default: defaultSwitchProps.size
        },
        {
            name: 'radius',
            type: SchemaPropType.enum,
            values: Radius,
            default: defaultSwitchProps.radius
        },
        {
            name: 'disabled',
            type: SchemaPropType.boolean,
            default: defaultSwitchProps.disabled
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
