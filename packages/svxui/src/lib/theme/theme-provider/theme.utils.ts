import { Radius, Strategies, Themes } from '$lib/shared.types.js';
import { isBrowser } from '$lib/utils/is-browser.js';
import { type RadiusType, type StrategyType, type ThemeType } from './types.js';

/**
 * Storage keys
 */

export const storageKeyStrategy = 'svxui-theme-strategy';
export const storageKeyTheme = 'svxui-theme';
export const storageKeyRadius = 'svxui-radius';

/**
 * Create ssr safe MediaQueryList
 *
 * @returns MediaQueryList
 */
export function getPrefersColorSchemeLight(): Pick<
    MediaQueryList,
    'matches' | 'addEventListener' | 'removeEventListener'
> {
    return isBrowser()
        ? window.matchMedia('(prefers-color-scheme: light)')
        : { matches: true, addEventListener: () => {}, removeEventListener: () => {} };
}

/**
 * Create ssr safe LocalStorage
 *
 * @returns localStorage
 */
export function getLocalStorage(): Pick<Storage, 'getItem' | 'setItem'> {
    return isBrowser()
        ? localStorage
        : {
              getItem: (_key: string) => null,
              setItem: (_key: string, _value: string) => {}
          };
}
export function isValidString(value: unknown): value is string {
    return typeof value === 'string' && Themes.includes(value as ThemeType);
}

/**
 * Theme store utils
 */
export function getStorageTheme() {
    return getLocalStorage().getItem(storageKeyTheme) as ThemeType | null;
}
export function setStorageTheme(value: ThemeType) {
    getLocalStorage().setItem(storageKeyTheme, value);
}
export function isValidTheme(value: unknown): value is ThemeType {
    return Themes.includes(value as ThemeType);
}

/**
 * Strategy store utils
 */
export function getStorageStrategy() {
    return getLocalStorage().getItem(storageKeyStrategy) as StrategyType | null;
}
export function setStorageStrategy(value: StrategyType) {
    getLocalStorage().setItem(storageKeyStrategy, value);
}

export function isValidStrategy(value: unknown): value is StrategyType {
    return Strategies.includes(value as StrategyType);
}

/**
 * Radius store utils
 */
export function getStorageRadius() {
    return getLocalStorage().getItem(storageKeyRadius) as RadiusType | null;
}
export function setStorageRadius(value: RadiusType) {
    getLocalStorage().setItem(storageKeyRadius, value);
}
export function isValidRadius(value: unknown): value is RadiusType {
    return Radius.includes(value as RadiusType);
}

/**
 * Create ssr safe storage change listener
 *
 * @param key
 * @param onChangeCallback
 * @returns remove listener function
 */
export function listenStorageChange(key: string, onChangeCallback: (event: StorageEvent) => void) {
    function onChange(event: StorageEvent): void {
        if (event.key === key && event.oldValue !== event.newValue) {
            onChangeCallback(event);
        }
    }
    isBrowser() && addEventListener('storage', onChange);
    return () => {
        if (isBrowser()) {
            removeEventListener('storage', onChange);
        }
    };
}

/**
 * Disable animation
 *
 * @returns calback for enable animation
 */
export function disableAnimation(): () => void {
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
}
