import { loadRecipeEntries } from '$lib/content-utils/load-entries.js';
import { loadRecipePage } from '$lib/content-utils/load-page.js';
import type { EntryGenerator, PageLoad } from './$types.js';

// export const entries: EntryGenerator = () => {
//     return loadRecipeEntries();
// };

export const load: PageLoad = async (event) => {
    return loadRecipePage(event.params.slug);
};
