import {
    RadiusMedium,
    ThemeColorDark,
    ThemeColorLight,
    ThemeDark,
    ThemeLight,
    ThemeSystem
} from '$lib/shared.types.js';
import { isBrowser } from '$lib/utils/is-browser.js';
import { derived, writable, type Readable } from 'svelte/store';
import {
    getPrefersColorSchemeLight,
    getStorageRadius,
    getStorageStrategy,
    isValidRadius,
    isValidStrategy,
    listenStorageChange,
    setStorageRadius,
    setStorageStrategy,
    storageKeyRadius,
    storageKeyStrategy
} from './theme.utils.js';
import { type RadiusType, type StrategyType, type ThemeType } from './types.js';

/**
 * Create systeme theme store and listen system theme change
 *
 * @param defaultSystemTheme
 * @returns
 */
function createSystemThemeStore() {
    const { subscribe, set } = writable<ThemeType>(undefined, (set) => {
        if (!isBrowser()) return;

        const onChange = (event: Partial<MediaQueryListEvent>) => {
            if (!tracking) return;
            set(getSystemTheme(event?.matches));
        };

        getPrefersColorSchemeLight().addEventListener('change', onChange);
        return () => {
            getPrefersColorSchemeLight().removeEventListener('change', onChange);
        };
    });

    let tracking = false;
    const track = (value: boolean) => (tracking = value);
    const getSystemTheme = (matches: boolean | undefined) => (matches === true ? ThemeLight : ThemeDark);
    const update = () => {
        if (!isBrowser()) return;
        set(getSystemTheme(getPrefersColorSchemeLight().matches));
    };
    return { subscribe, track, update };
}
export const systemThemeStore = createSystemThemeStore();

/**
 * Create theme provider stores
 *
 * @param param
 * @returns
 */
export function createThemeProvider({
    isRoot,
    defaultStrategy = ThemeSystem,
    defaultRadius = RadiusMedium,
    systemeTheme
}: {
    isRoot: boolean;
    defaultStrategy: StrategyType | undefined;
    defaultRadius: RadiusType | undefined;
    systemeTheme: Readable<ThemeType>;
}) {
    /**
     * Theme Strategy
     */
    let initialStrategy: StrategyType;
    if (isRoot) {
        initialStrategy = getStorageStrategy() ?? defaultStrategy;
    } else {
        initialStrategy = defaultStrategy;
    }
    const strategy = writable<StrategyType>(initialStrategy, (_set) => {
        if (!isRoot || !isBrowser()) return;
        return listenStorageChange(storageKeyStrategy, (event) => {
            if (isValidStrategy(event.newValue)) {
                _set(event.newValue);
            } else {
                _set(initialStrategy);
            }
        });
    });

    /**
     * Theme
     */
    const theme = derived([strategy, systemeTheme], ([$strategy, $systemeTheme]) => {
        const derivedMode = $strategy === ThemeSystem ? $systemeTheme : $strategy;

        if (isRoot && isBrowser()) {
            const htmlEl = document.documentElement;
            const themeColorEl = document.querySelector('meta[name="theme-color"]');

            if (derivedMode === ThemeLight) {
                htmlEl.classList.remove(ThemeDark);
                htmlEl.classList.add(ThemeLight);
                htmlEl.style.colorScheme = ThemeLight;
                themeColorEl?.setAttribute('content', ThemeColorLight);
            } else {
                htmlEl.classList.remove(ThemeLight);
                htmlEl.classList.add(ThemeDark);
                htmlEl.style.colorScheme = ThemeDark;
                themeColorEl?.setAttribute('content', ThemeColorDark);
            }
        }

        return derivedMode;
    });

    /**
     * Radius
     */
    let initialRadius: RadiusType;
    if (isRoot) {
        initialRadius = getStorageRadius() ?? defaultRadius;
    } else {
        initialRadius = defaultRadius;
    }
    const radius = writable<RadiusType>(initialRadius, (_set) => {
        if (!isRoot || !isBrowser()) return;
        return listenStorageChange(storageKeyRadius, (event) => {
            if (isValidRadius(event.newValue)) {
                _set(event.newValue);
            } else {
                _set(initialRadius);
            }
        });
    });

    return {
        theme,
        strategy: {
            subscribe: strategy.subscribe,
            set(value: StrategyType) {
                if (isValidStrategy(value)) {
                    if (isRoot) {
                        setStorageStrategy(value);
                    }
                    strategy.set(value);
                }
            }
        },
        radius: {
            subscribe: radius.subscribe,
            set(value: RadiusType) {
                if (isValidRadius(value)) {
                    if (isRoot) {
                        setStorageRadius(value);
                    }
                    radius.set(value);
                }
            }
        }
    };
}
