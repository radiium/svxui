import type { DocPageProps } from '$lib/doc.types';
import playground from './playground.svelte';
import { checkboxSchema } from './schema.js';

export default {
    title: 'Checkbox',
    playground,
    schemas: [checkboxSchema]
} satisfies DocPageProps;
