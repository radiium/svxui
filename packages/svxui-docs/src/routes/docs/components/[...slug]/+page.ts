import { docPageContent } from '$lib/content-utils/doc-page-content.js';
import type { PageLoad } from './$types.js';

export const load: PageLoad = async (event) => {
    return docPageContent.components.find((p) => p.slug === event.params.slug);
};
