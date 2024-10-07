import type { DocPageProps } from '$lib/doc.types';
import playground from './playground.svelte';
import { radioSchema } from './schema.js';

export default {
    title: 'Radio',
    playground,
    schemas: [radioSchema]
} satisfies DocPageProps;
