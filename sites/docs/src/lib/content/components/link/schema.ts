import { defaultLinkProps } from 'sveltr';
import { SchemaPropType, type SchemaComponent } from '$lib/doc.types.js';
import { textSchema } from '../text/schema';
import { Aligns, Colors, Sizes1To9, TextUnderlines, TextWraps, Transforms, Weights } from 'sveltr';

/**
 * Playground template
 */

export const template = `
<script lang="ts">
    import { Link } from 'sveltr';
</script>

<Link href="#" target="_self":props>Link</Link>     
`;

/**
 * Link schema
 */

export const linkSchema: SchemaComponent = {
    extend: 'HTMLAnchorElement',
    props: [
        ...textSchema.props,
        {
            name: 'underline',
            type: SchemaPropType.boolean,
            default: defaultLinkProps.underline
        }
    ],
    slots: [
        {
            name: 'default'
        }
    ],
    events: []
};
