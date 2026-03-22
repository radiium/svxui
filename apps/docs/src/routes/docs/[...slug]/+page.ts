import { loadBaseEntries } from '$lib/content-utils/load-entries.js';
import { loadBasePage } from '$lib/content-utils/load-page.js';
import type { EntryGenerator, PageLoad } from './$types.js';

export const entries: EntryGenerator = () => {
    return loadBaseEntries();
};

export const load: PageLoad = async (event) => {
    return loadBasePage(event.params.slug);
};
