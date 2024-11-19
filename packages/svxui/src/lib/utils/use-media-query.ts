import { on } from 'svelte/events';
import { readable, type Readable } from 'svelte/store';

/**
 * Return readable store of matchMedia query
 *
 * @param query
 * @returns
 */
export const useMediaQuery = (query: string): Readable<boolean | undefined> => {
    const matches = readable<boolean | undefined>(undefined, (set) => {
        const mql: MediaQueryList = window.matchMedia(query);
        set(mql.matches);

        const mediaQueryChange = (mqlEvent: MediaQueryListEvent) => set(mqlEvent.matches);
        const off = on(mql, 'change', mediaQueryChange);

        return () => {
            off();
        };
    });

    return matches;
};
