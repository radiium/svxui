import { defaultButtonProps, Radius, Transforms } from 'sveltr';
import { SchemaPropType, type SchemaComponent } from '$lib/doc.types.js';
import { Aligns, Colors, Sizes1To4, Variants } from 'sveltr';

/**
 * Playground template
 */

export const template = `
<script lang="ts">
    import { Button } from 'sveltr';
</script>

<Button:props>:slot<Button>    
`;

/**
 * Button schema
 */

export const buttonSchema: SchemaComponent = {
    extend: 'HTMLButtonElement',
    props: [
        {
            name: 'elementRef',
            type: SchemaPropType.htmlElement,
            typeHtmlElement: 'HTMLButtonElement'
        },
        {
            name: 'color',
            type: SchemaPropType.enum,
            values: Colors,
            default: defaultButtonProps.color
        },
        {
            name: 'size',
            type: SchemaPropType.enum,
            values: Sizes1To4,
            default: defaultButtonProps.size
        },
        {
            name: 'radius',
            type: SchemaPropType.enum,
            values: Radius,
            default: defaultButtonProps.radius
        },
        {
            name: 'variant',
            type: SchemaPropType.enum,
            values: Variants,
            default: defaultButtonProps.variant
        },
        {
            name: 'transform',
            type: SchemaPropType.enum,
            values: Transforms,
            default: defaultButtonProps.transform
        },
        {
            name: 'align',
            type: SchemaPropType.enum,
            values: Aligns,
            default: defaultButtonProps.align
        },
        {
            name: 'active',
            type: SchemaPropType.boolean,
            default: defaultButtonProps.active
        },
        {
            name: 'iconOnly',
            type: SchemaPropType.boolean,
            default: defaultButtonProps.iconOnly
        },
        {
            name: 'fullWidth',
            type: SchemaPropType.boolean,
            default: defaultButtonProps.fullWidth
        },
        {
            name: 'disabled',
            type: SchemaPropType.boolean,
            default: defaultButtonProps.disabled
        }
    ],
    slots: [
        {
            name: 'default'
        }
    ],
    events: [
        {
            name: 'on:click'
        },
        {
            name: 'on:submit'
        },
        {
            name: 'on:focus'
        },
        {
            name: 'on:blur'
        }
    ]
};
