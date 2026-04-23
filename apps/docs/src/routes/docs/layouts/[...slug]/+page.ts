import { loadLayoutEntries } from '$lib/content-utils/load-entries.js';
import { loadLayoutPage } from '$lib/content-utils/load-page.js';
import type { EntryGenerator, PageLoad } from './$types.js';

export const entries: EntryGenerator = () => {
    return loadLayoutEntries();
};

export const load: PageLoad = async (event) => {
    return loadLayoutPage(event.params.slug);
};
