import type { DocPageProps } from '$lib/doc.types';
import playground from './playground.svelte';
import { accordionGroupSchema, accordionItemSchema } from './schema.js';

export default {
    title: 'Accordion',
    playground,
    schemas: [accordionGroupSchema, accordionItemSchema]
} satisfies DocPageProps;
