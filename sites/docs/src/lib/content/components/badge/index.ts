import type { DocPageProps } from '$lib/doc.types';
import playground from './playground.svelte';
import { badgeSchema } from './schema.js';

export default {
    title: 'Badge',
    playground,
    schemas: [badgeSchema]
} satisfies DocPageProps;
