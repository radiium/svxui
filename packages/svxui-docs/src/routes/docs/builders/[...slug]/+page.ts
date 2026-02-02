import { loadBuilderEntries } from '$lib/content-utils/load-entries.js';
import { loadBuilderPage } from '$lib/content-utils/load-page.js';
import type { EntryGenerator, PageLoad } from './$types.js';

export const entries: EntryGenerator = () => {
    return loadBuilderEntries();
};

export const load: PageLoad = async (event) => {
    return loadBuilderPage(event.params.slug);
};
