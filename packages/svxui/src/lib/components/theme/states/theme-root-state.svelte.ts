import type { Color, Mode, Radius, Theme } from '$lib/shared.types.js';
import { PersistedState } from '$lib/utilities/persisted-state/index.js';
import { onDestroy } from 'svelte';
import { MetaThemeColors, ThemeDark, ThemeLight, ThemeSystem } from '../constants.js';
import { withoutTransition } from '../internals/without-transition.js';
import { type ThemeMutableContext, type ThemeRootStateOptions } from '../types.js';

const stringSerializer = {
    serialize: <T>(v: T) => v as string,
    deserialize: <T>(v: string) => v as T
};

/**
 * ThemeRootState
 *
 * @description Manages root theme state — mode, color, radius — and syncs them
 * to `localStorage` and the `<html>` element. Implements {@link ThemeMutableContext}.
 */
export class ThemeRootState implements ThemeMutableContext {
    #props: ThemeRootStateOptions = $state({});
    #system: Theme | undefined = $state(undefined);

    #modeKey: string = $derived(this.#props.storage?.modeKey ?? 'svxui-mode');
    #colorKey: string = $derived(this.#props.storage?.colorKey ?? 'svxui-color');
    #radiusKey: string = $derived(this.#props.storage?.radiusKey ?? 'svxui-radius');

    #persistedMode: PersistedState<Mode>;
    #persistedColor: PersistedState<Color>;
    #persistedRadius: PersistedState<Radius>;

    // ─── ThemeContext ─────────────────────────────────────────────────────────

    get mode(): Mode {
        return this.#persistedMode.current;
    }
    get color(): Color {
        return this.#persistedColor.current;
    }
    get radius(): Radius {
        return this.#persistedRadius.current;
    }
    get system(): Theme | undefined {
        return this.#system;
    }
    get theme(): Theme {
        const m = this.mode;
        return m === ThemeSystem ? (this.#system ?? ThemeLight) : m;
    }

    setMode(value: Mode): void {
        this.#persistedMode.current = value;
    }
    setColor(value: Color): void {
        this.#persistedColor.current = value;
    }
    setRadius(value: Radius): void {
        this.#persistedRadius.current = value;
    }

    // ─── Internal (used by ThemeProvider component) ───────────────────────────

    get modeKey(): string {
        return this.#modeKey;
    }
    get colorKey(): string {
        return this.#colorKey;
    }
    get radiusKey(): string {
        return this.#radiusKey;
    }

    // ─── Constructor ─────────────────────────────────────────────────────────

    constructor(options: ThemeRootStateOptions) {
        this.#props = options;

        this.#persistedMode = new PersistedState<Mode>(
            this.#modeKey, //
            options.mode ?? ThemeSystem,
            { serializer: stringSerializer }
        );
        this.#persistedColor = new PersistedState<Color>(
            this.#colorKey, //
            (options.color ?? 'neutral') as Color,
            { serializer: stringSerializer }
        );
        this.#persistedRadius = new PersistedState<Radius>(
            this.#radiusKey, //
            options.radius ?? 'medium',
            { serializer: stringSerializer }
        );

        onDestroy(
            $effect.root(() => {
                // System preference tracking
                $effect.pre(() => {
                    if (this.#props.systemTracking === false) return;

                    const mq = window.matchMedia('(prefers-color-scheme: light)');
                    const update = () => {
                        this.#system = mq.matches ? ThemeLight : ThemeDark;
                    };
                    update();
                    mq.addEventListener('change', update);
                    return () => mq.removeEventListener('change', update);
                });

                // DOM updates on <html>
                $effect.pre(() => {
                    const apply = () => {
                        const rootEl = document.documentElement;
                        const metaThemeEl = document.querySelector('meta[name="theme-color"]');
                        const colors = this.#props.metaColors ?? MetaThemeColors;

                        rootEl.setAttribute('data-theme-root', '');
                        rootEl.setAttribute('data-theme', this.theme);
                        rootEl.setAttribute('data-color', this.color);
                        rootEl.setAttribute('data-radius', this.radius);

                        if (this.theme === ThemeLight) {
                            rootEl.classList.remove(ThemeDark);
                            rootEl.classList.add(ThemeLight);
                            rootEl.style.colorScheme = ThemeLight;
                            metaThemeEl?.setAttribute('content', colors.light);
                        } else {
                            rootEl.classList.remove(ThemeLight);
                            rootEl.classList.add(ThemeDark);
                            rootEl.style.colorScheme = ThemeDark;
                            metaThemeEl?.setAttribute('content', colors.dark);
                        }
                    };

                    if (this.#props.transitions) {
                        apply();
                    } else {
                        withoutTransition(apply);
                    }
                });
            })
        );
    }
}
