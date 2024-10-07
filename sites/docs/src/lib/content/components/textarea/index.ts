import type { DocPageProps } from '$lib/doc.types';
import playground from './playground.svelte';
import { textareaSchema } from './schema.js';

export default {
    title: 'Textarea',
    playground,
    schemas: [textareaSchema]
} satisfies DocPageProps;
