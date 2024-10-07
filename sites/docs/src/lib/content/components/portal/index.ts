import type { DocPageProps } from '$lib/doc.types';
import SamplePortal from './SamplePortal.svelte';
import { portalSchema } from './schema.js';

export default {
    title: 'Portal',
    playground: undefined,
    schemas: [portalSchema],
    samples: [
        {
            component: SamplePortal
        }
    ]
} satisfies DocPageProps;
