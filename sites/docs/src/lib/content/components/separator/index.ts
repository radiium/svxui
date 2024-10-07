import type { DocPageProps } from '$lib/doc.types';
import playground from './playground.svelte';
import { separatorSchema } from './schema.js';

export default {
    title: 'Separator',
    playground,
    schemas: [separatorSchema]
} satisfies DocPageProps;
