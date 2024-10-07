import type { DocPageProps } from '$lib/doc.types';
import { themeProviderSchema } from './schema';

export default {
    title: 'Theme Provider',
    playground: undefined,
    schemas: [themeProviderSchema]
} satisfies DocPageProps;
