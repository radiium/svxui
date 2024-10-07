import type { DocPageProps } from '$lib/doc.types';
import playground from './playground.svelte';
import { calloutSchema } from './schema.js';

export default {
    title: 'Callout',
    playground,
    schemas: [calloutSchema]
} satisfies DocPageProps;
