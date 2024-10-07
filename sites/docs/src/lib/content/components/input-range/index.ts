import type { DocPageProps } from '$lib/doc.types';
import playground from './playground.svelte';
import { inputRangeSchema } from './schema.js';

export default {
    title: 'Input Range',
    playground,
    schemas: [inputRangeSchema]
} satisfies DocPageProps;
