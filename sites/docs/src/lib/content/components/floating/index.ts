import type { DocPageProps } from '$lib/doc.types';
import playground from './playground.svelte';
import { floatingSchema } from './schema.js';

export default {
    title: 'Floating',
    playground,
    schemas: [floatingSchema]
} satisfies DocPageProps;
