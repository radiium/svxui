import { loadNavigation } from '$lib/content-utils/load-navigation';
import type { LayoutLoad } from './$types';

export const prerender = true;

export const load: LayoutLoad = () => {
    return { navigation: loadNavigation() };
};
