import { SchemaPropType, type SchemaComponent } from '$lib/doc.types.js';
import { defaultDialogProps, Radius, Sizes0To4 } from 'sveltr';

/**
 * Playground template
 */

export const template = `
<script lang="ts">
    import { Dialog, Button } from 'sveltr';

    let isOpen = false;
</script>

<Button variant="soft" on:click={() => (isOpen = true)}>open</Button>

<Dialog:props bind:isOpen>
    <h1>Title</h1>
    <p class="my-3">Content</p>
    <Button color="primary" variant="soft" fullWidth on:click={() => (isOpen = false)}>
        close
    </Button>
</Dialog>    
`;

/**
 * Box schema
 */

export const dialogSchema: SchemaComponent = {
    extend: 'HTMLDivElement',
    props: [
        {
            name: 'elementRef',
            type: SchemaPropType.htmlElement,
            typeHtmlElement: 'HTMLDivElement'
        },
        {
            name: 'isOpen',
            type: SchemaPropType.boolean,
            default: defaultDialogProps.isOpen
        },
        {
            name: 'size',
            type: SchemaPropType.enum,
            values: Sizes0To4,
            default: defaultDialogProps.size
        },
        {
            name: 'radius',
            type: SchemaPropType.enum,
            values: Radius,
            default: defaultDialogProps.radius
        },
        {
            name: 'width',
            type: SchemaPropType.string,
            default: defaultDialogProps.width
        },
        {
            name: 'minWidth',
            type: SchemaPropType.string,
            default: defaultDialogProps.minWidth
        },
        {
            name: 'maxWidth',
            type: SchemaPropType.string,
            default: defaultDialogProps.maxWidth
        },
        {
            name: 'height',
            type: SchemaPropType.string,
            default: defaultDialogProps.height
        },
        {
            name: 'minHeight',
            type: SchemaPropType.string,
            default: defaultDialogProps.minHeight
        },
        {
            name: 'maxHeight',
            type: SchemaPropType.string,
            default: defaultDialogProps.maxHeight
        },
        {
            name: 'noPadding',
            type: SchemaPropType.boolean,
            default: defaultDialogProps.noPadding
        },
        {
            name: 'fullScreen',
            type: SchemaPropType.boolean,
            default: defaultDialogProps.fullScreen
        },
        {
            name: 'closeOnBackdropClick',
            type: SchemaPropType.boolean,
            default: defaultDialogProps.closeOnBackdropClick
        },
        {
            name: 'closeOnEscape',
            type: SchemaPropType.boolean,
            default: defaultDialogProps.closeOnEscape
        },
        {
            name: 'lockScroll',
            type: SchemaPropType.boolean,
            default: defaultDialogProps.lockScroll
        }
    ],
    slots: [
        {
            name: 'default'
        }
    ],
    events: []
};
