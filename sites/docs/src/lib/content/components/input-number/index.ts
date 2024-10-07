import type { DocPageProps } from '$lib/doc.types';
import playground from './playground.svelte';
import { inputNumberSchema } from './schema.js';

export default {
    title: 'Input Number',
    playground,
    schemas: [inputNumberSchema]
} satisfies DocPageProps;
