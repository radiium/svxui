import { derived } from 'svelte/store';
import { useMediaQuery } from 'svxui';

export const isMobile = useMediaQuery('(max-width: 520px)');
export const isTablet = useMediaQuery('(max-width: 825px)');

export const breakpoints = derived([isMobile, isTablet], ([$isMobile, $isTablet]) => ({
    mobile: $isMobile,
    tablet: $isTablet
}));

export function responsiveClass(data: Partial<{ default: string; tablet: string; mobile: string }>) {
    return derived([isMobile, isTablet], ([$mobile, $tablet]) => {
        if ($mobile) {
            return data.mobile ?? '';
        } else if ($tablet) {
            return data.tablet ?? '';
        } else {
            return data.default ?? '';
        }
    });
}
