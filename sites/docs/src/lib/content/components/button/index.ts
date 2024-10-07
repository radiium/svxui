import type { DocPageProps } from '$lib/doc.types';
import playground from './playground.svelte';
import { buttonSchema } from './schema.js';

export default {
    title: 'Button',
    playground,
    schemas: [buttonSchema]
} satisfies DocPageProps;
