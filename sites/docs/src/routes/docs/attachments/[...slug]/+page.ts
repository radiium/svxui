import { loadAttachmentEntries } from '$lib/content-utils/load-entries';
import { loadAttachmentPage } from '$lib/content-utils/load-page';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => {
    return loadAttachmentEntries();
};

export const load: PageLoad = async (event) => {
    return loadAttachmentPage(event.params.slug);
};
