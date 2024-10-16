import { SchemaPropType, type SchemaComponent } from '$lib/doc.types.js';
import { defaultFloatingProps, Placements, Radius, Sizes0To5 } from 'svxui';

/**
 * Playground template
 */

export const template = `
<script lang="ts">
    import { Floating, Button } from 'svxui';

    let isOpen = false;
</script>

<Floating:props bind:isOpen>
    <Button slot="trigger" variant="soft" on:click={() => (isOpen = false)}>Open</Button>
    <div slot="content">Floating content</div>
</Floating>    
`;

/**
 * Floating schema
 */

export const floatingSchema: SchemaComponent = {
    extend: '',
    props: [
        {
            name: 'elementRef',
            type: SchemaPropType.htmlElement,
            typeHtmlElement: 'HTMLDivElement'
        },
        {
            name: 'isOpen',
            type: SchemaPropType.boolean,
            default: defaultFloatingProps.isOpen
        },
        {
            name: 'size',
            type: SchemaPropType.enum,
            values: Sizes0To5,
            default: defaultFloatingProps.size
        },
        {
            name: 'radius',
            type: SchemaPropType.enum,
            values: Radius,
            default: defaultFloatingProps.radius
        },
        {
            name: 'placement',
            type: SchemaPropType.enum,
            values: Placements,
            default: defaultFloatingProps.placement
        },
        {
            name: 'transitionDelay',
            type: SchemaPropType.number,
            default: defaultFloatingProps.transitionDelay
        },
        {
            name: 'transitionDuration',
            type: SchemaPropType.number,
            default: defaultFloatingProps.transitionDuration
        },
        {
            name: 'offset',
            type: SchemaPropType.number,
            default: defaultFloatingProps.offset
        },
        {
            name: 'arrow',
            type: SchemaPropType.boolean,
            default: defaultFloatingProps.arrow
        },
        {
            name: 'outline',
            type: SchemaPropType.boolean,
            default: defaultFloatingProps.outline
        },
        {
            name: 'backdrop',
            type: SchemaPropType.boolean,
            default: defaultFloatingProps.backdrop
        },
        {
            name: 'autoUpdate',
            type: SchemaPropType.boolean,
            default: defaultFloatingProps.autoUpdate
        },
        {
            name: 'closeOnClickBackdrop',
            type: SchemaPropType.boolean,
            default: defaultFloatingProps.closeOnClickBackdrop
        },
        {
            name: 'closeOnClickOutside',
            type: SchemaPropType.boolean,
            default: defaultFloatingProps.closeOnClickOutside
        },
        {
            name: 'closeOnEscape',
            type: SchemaPropType.boolean,
            default: defaultFloatingProps.closeOnEscape
        },
        {
            name: 'closeOnResize',
            type: SchemaPropType.boolean,
            default: defaultFloatingProps.closeOnResize
        },
        {
            name: 'closeOnScroll',
            type: SchemaPropType.boolean,
            default: defaultFloatingProps.closeOnScroll
        },
        {
            name: 'portal',
            type: SchemaPropType.boolean,
            default: defaultFloatingProps.portal
        }
    ],
    slots: [
        {
            name: 'Reference',
            description: 'Reference of floating element',
            props: []
        },
        {
            name: 'content',
            description: 'Content of floating element',
            props: []
        }
    ],
    events: []
};
