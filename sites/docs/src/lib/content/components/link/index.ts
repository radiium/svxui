import type { DocPageProps } from '$lib/doc.types';
import playground from './playground.svelte';
import { linkSchema } from './schema.js';

export default {
    title: 'Link',
    playground,
    schemas: [linkSchema]
} satisfies DocPageProps;
