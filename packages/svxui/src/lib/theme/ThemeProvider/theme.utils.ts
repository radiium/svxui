import { Radius } from '$lib/shared.types.js';
import { isBrowser } from '$lib/utils/is-browser.js';
import { storageKeyRadius, storageKeyStrategy, storageKeyTheme } from '../theme.constant.js';
import { Strategies, Themes, type RadiusType, type StrategyType, type ThemeType } from '../theme.types.js';

/**
 * Create ssr safe MediaQueryList
 *
 * @returns {MediaQueryList} MediaQueryList
 */
export const getPrefersColorSchemeLight = () =>
    isBrowser()
        ? window.matchMedia('(prefers-color-scheme: light)')
        : { matches: true, addEventListener: () => {}, removeEventListener: () => {} };

/**
 * Create ssr safe LocalStorage
 *
 * @returns {Storage} localStorage
 */
export const getLocalStorage = () =>
    isBrowser()
        ? localStorage
        : {
              getItem: (_key: string) => null,
              setItem: (_key: string, _value: string) => {}
          };

export function isValidString(value: unknown): value is string {
    return typeof value === 'string' && Themes.includes(value as ThemeType);
}

/**
 * Theme store utils
 */
export const getStorageTheme = () => getLocalStorage().getItem(storageKeyTheme) as ThemeType | null;
export const setStorageTheme = (value: ThemeType) => getLocalStorage().setItem(storageKeyTheme, value);
export const isValidTheme = (value: unknown): value is ThemeType => Themes.includes(value as ThemeType);

/**
 * Strategy store utils
 */
export const getStorageStrategy = () => getLocalStorage().getItem(storageKeyStrategy) as StrategyType | null;
export const setStorageStrategy = (value: StrategyType) =>
    getLocalStorage().setItem(storageKeyStrategy, value);
export const isValidStrategy = (value: unknown): value is StrategyType =>
    Strategies.includes(value as StrategyType);

/**
 * Radius store utils
 */
export const getStorageRadius = () => getLocalStorage().getItem(storageKeyRadius) as RadiusType | null;
export const setStorageRadius = (value: RadiusType) => getLocalStorage().setItem(storageKeyRadius, value);
export const isValidRadius = (value: unknown): value is RadiusType => Radius.includes(value as RadiusType);

/**
 * Create ssr safe storage change listener
 *
 * @param {string} key
 * @param {Function} onChangeCallback
 * @returns {Function} remove listener function
 */
export const listenStorageChange = (key: string, onChangeCallback: (event: StorageEvent) => void) => {
    const onChange = (event: StorageEvent) => {
        if (event.key === key && event.oldValue !== event.newValue) {
            onChangeCallback(event);
        }
    };
    isBrowser() && addEventListener('storage', onChange);
    return () => {
        if (isBrowser()) {
            removeEventListener('storage', onChange);
        }
    };
};

/**
 * Disable animation
 *
 * @returns calback for enable animation
 */
export const disableAnimation = () => {
    const css = document.createElement('style');
    css.appendChild(
        document.createTextNode(
            `*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
        )
    );
    document.head.appendChild(css);

    return function enableAnimation(): void {
        // Force restyle
        (() => window.getComputedStyle(document.body))();

        // Wait for next tick before removing
        setTimeout(() => {
            document.head.removeChild(css);
        }, 1);
    };
};
