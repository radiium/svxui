import type { DocPageProps } from '$lib/doc.types';
import playground from './playground.svelte';
import { cardSchema } from './schema.js';

export default {
    title: 'Card',
    playground,
    schemas: [cardSchema]
} satisfies DocPageProps;
