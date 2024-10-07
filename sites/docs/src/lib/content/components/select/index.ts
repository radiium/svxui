import type { DocPageProps } from '$lib/doc.types';
import playground from './playground.svelte';
import { selectSchema } from './schema.js';

export default {
    title: 'Select',
    playground,
    schemas: [selectSchema]
} satisfies DocPageProps;
