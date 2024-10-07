import type { DocPageProps } from '$lib/doc.types';
import playground from './playground.svelte';
import { switchSchema } from './schema.js';

export default {
    title: 'Switch',
    playground,
    schemas: [switchSchema]
} satisfies DocPageProps;
