import { SchemaPropType, type SchemaComponent } from '$lib/doc.types.js';
import { Colors, defaultFloatingProps, Placements, Radius, Sizes0To5, VariantsCard } from 'svxui';

/**
 * Playground template
 */

export const template = `
<script lang="ts">
    import { Floating, Button } from 'svxui';

    let isOpen = false;
</script>

<Floating:props bind:isOpen>
    {#snippet trigger()}
        <Button variant="soft" onclick={() => (isOpen = false)}>Open</Button>
    {/snippet}

    {#snippet content()}
        <div>Floating content</div>
    {/snippet}
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
            name: 'color',
            type: SchemaPropType.enum,
            values: Colors,
            default: defaultFloatingProps.color
        },
        {
            name: 'variant',
            type: SchemaPropType.enum,
            values: VariantsCard,
            default: defaultFloatingProps.variant
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
            name: 'autoUpdate',
            type: SchemaPropType.boolean,
            default: defaultFloatingProps.autoUpdate
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
            name: 'flip',
            type: SchemaPropType.boolean,
            default: defaultFloatingProps.flip
        },
        {
            name: 'shift',
            type: SchemaPropType.boolean,
            default: defaultFloatingProps.shift
        },
        {
            name: 'hide',
            type: SchemaPropType.boolean,
            default: defaultFloatingProps.hide
        },
        {
            name: 'backdrop',
            type: SchemaPropType.boolean,
            default: defaultFloatingProps.backdrop
        },
        {
            name: 'portal',
            type: SchemaPropType.boolean,
            default: defaultFloatingProps.portal
        },
        {
            name: 'portalTarget',
            type: SchemaPropType.string,
            default: defaultFloatingProps.portalTarget
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
            name: 'transitionDelay',
            type: SchemaPropType.number,
            default: defaultFloatingProps.transitionDelay
        },
        {
            name: 'transitionDuration',
            type: SchemaPropType.number,
            default: defaultFloatingProps.transitionDuration
        }
    ],
    snippets: [
        {
            name: 'trigger',
            description: 'Reference of trigger element',
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
