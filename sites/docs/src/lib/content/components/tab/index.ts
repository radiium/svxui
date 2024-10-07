import type { DocPageProps } from '$lib/doc.types';
import { tabGroupSchema, tabTriggerSchema, tabContentSchema } from './schema.js';

export default {
    title: 'Tab',
    schemas: [tabGroupSchema, tabTriggerSchema, tabContentSchema]
} satisfies DocPageProps;
