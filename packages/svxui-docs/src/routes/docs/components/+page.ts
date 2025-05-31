import { docNavigation } from '$lib/content-utils/doc-navigation.js';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types.js';

export const load: PageLoad = async () => {
    redirect(303, docNavigation[1].pages[0].slugFull);
};
