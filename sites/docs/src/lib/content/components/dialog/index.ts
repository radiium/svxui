import type { DocPageProps } from '$lib/doc.types';
import playground from './playground.svelte';
import { dialogSchema } from './schema.js';

export default {
    title: 'Dialog',
    playground,
    schemas: [dialogSchema]
} satisfies DocPageProps;
