import { getDoc } from '$lib/utils/docs.js';
import type { PageLoad } from './$types.js';

export const load: PageLoad = async (event) => {
    const { component, title, metadata } = await getDoc('index');
    return {
        component,
        title,
        metadata
    };
};
