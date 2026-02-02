import { loadComponentEntries } from '$lib/content-utils/load-entries.js';
import { loadComponentPage } from '$lib/content-utils/load-page.js';
import type { EntryGenerator, PageLoad } from './$types.js';

export const entries: EntryGenerator = () => {
    return loadComponentEntries();
};

export const load: PageLoad = async (event) => {
    return loadComponentPage(event.params.slug);
};
