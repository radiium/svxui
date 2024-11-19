import { defaultLinkProps } from 'svxui';
import { SchemaPropType, type SchemaComponent } from '$lib/doc.types.js';
import { textSchema } from '../text/schema';
import { Aligns, Colors, Sizes1To9, TextUnderlines, TextWraps, Transforms, Weights } from 'svxui';

/**
 * Playground template
 */

export const template = `
<script lang="ts">
    import { Link } from 'svxui';
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
    snippets: [
        {
            name: 'default'
        }
    ],
    events: []
};
