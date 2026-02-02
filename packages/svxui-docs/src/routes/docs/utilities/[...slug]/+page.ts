import { loadUtilityEntries } from '$lib/content-utils/load-entries.js';
import { loadUtilityPage } from '$lib/content-utils/load-page.js';
import type { EntryGenerator, PageLoad } from './$types.js';

export const entries: EntryGenerator = () => {
    return loadUtilityEntries();
};

export const load: PageLoad = async (event) => {
    return loadUtilityPage(event.params.slug);
};
