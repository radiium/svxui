import type { DocPageProps } from '$lib/doc.types';
import { themeSelectSchema } from './schema';

export default {
    title: 'Theme Select',
    playground: undefined,
    schemas: [themeSelectSchema]
} satisfies DocPageProps;
