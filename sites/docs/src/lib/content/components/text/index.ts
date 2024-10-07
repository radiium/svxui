import type { DocPageProps } from '$lib/doc.types';
import playground from './playground.svelte';
import { textSchema } from './schema.js';

export default {
    title: 'Text',
    playground,
    schemas: [textSchema]
} satisfies DocPageProps;
