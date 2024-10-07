import type { DocPageProps } from '$lib/doc.types';
import playground from './playground.svelte';
import { inputSchema } from './schema.js';

export default {
    title: 'Input',
    playground,
    schemas: [inputSchema]
} satisfies DocPageProps;
