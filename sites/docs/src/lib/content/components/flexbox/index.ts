import type { DocPageProps } from '$lib/doc.types';
import playground from './playground.svelte';
import { flexboxSchema } from './schema.js';

export default {
    title: 'Flexbox',
    playground,
    schemas: [flexboxSchema]
} satisfies DocPageProps;
