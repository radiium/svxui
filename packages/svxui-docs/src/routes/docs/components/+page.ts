import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types.js';
import { docPageContent } from '$lib/content-utils/doc-page-content.js';

export const load: PageLoad = async () => {
    redirect(303, docPageContent.components[0].slugFull);
};
