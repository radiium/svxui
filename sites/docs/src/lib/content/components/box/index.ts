import type { DocPageProps } from '$lib/doc.types';
import playground from './playground.svelte';
import { boxSchema } from './schema.js';

export default {
    title: 'Box',
    playground,
    schemas: [boxSchema]
} satisfies DocPageProps;
