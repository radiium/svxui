import { SchemaPropType, type SchemaComponent } from '$lib/doc.types.js';
import { AlignItems, defaultFlexboxProps, Directions, FlexDisplays, Gaps, Justifys, Wraps } from 'sveltr';

/**
 * Playground template
 */

export const template = `
<Flexbox:props>
    <div>1</div>
    <div>2</div>
    <div>3</div>
<Flexbox>    
`;

/**
 * Flexbox schema
 */

export const flexboxSchema: SchemaComponent = {
    extend: 'HTMLElement',
    props: [
        {
            name: 'elementRef',
            type: SchemaPropType.htmlElement,
            typeHtmlElement: 'HTMLElement'
        },
        {
            name: 'as',
            type: SchemaPropType.asElement,
            typeAsElement: 'keyof SvelteHTMLElements',
            default: defaultFlexboxProps.as
        },
        {
            name: 'display',
            type: SchemaPropType.enum,
            values: FlexDisplays,
            default: defaultFlexboxProps.display
        },
        {
            name: 'justify',
            type: SchemaPropType.enum,
            values: Justifys,
            default: defaultFlexboxProps.justify
        },
        {
            name: 'direction',
            type: SchemaPropType.enum,
            values: Directions,
            default: defaultFlexboxProps.direction
        },
        {
            name: 'align',
            type: SchemaPropType.enum,
            values: AlignItems,
            default: defaultFlexboxProps.align
        },
        {
            name: 'wrap',
            type: SchemaPropType.enum,
            values: Wraps,
            default: defaultFlexboxProps.wrap
        },
        {
            name: 'gap',
            type: SchemaPropType.enum,
            values: Gaps,
            default: defaultFlexboxProps.gap
        }
        // {
        //     name: 'grow',
        //     type: SchemaPropType.enum,
        //     values: Grows,
        //     default: defaultFlexboxProps.grow
        // },
        // {
        //     name: 'shrink',
        //     type: SchemaPropType.enum,
        //     values: Shrinks,
        //     default: defaultFlexboxProps.shrink
        // }
    ],
    slots: [
        {
            name: 'default'
        }
    ],
    events: []
};
