import type { Color, Radius } from '$lib/shared.types.js';
import { PersistedState } from '$lib/utilities/persisted-state/index.js';
import { onDestroy } from 'svelte';
import { withoutTransition } from '../internals/without-transition.js';
import {
    MetaThemeColors,
    ThemeDark,
    ThemeLight,
    ThemeSystem,
    type MetaThemeColorsType,
    type StrategyType,
    type ThemeRootStateProps,
    type ThemeType
} from '../types.js';
import { ThemeSystemState } from './theme-system-state.svelte.js';

/**
 * ThemeRootState
 *
 * @description Manage root theme state
 * Credit: {@link https://github.com/svecosystem/mode-watcher}
 */
export class ThemeRootState {
    #props: ThemeRootStateProps | undefined = $state();

    #system: ThemeSystemState;
    #theme = $derived.by(() => {
        return this.#strategy.current === ThemeSystem
            ? this.#system.current //
            : this.#strategy.current;
    });

    #defaultStrategy: StrategyType = $derived(this.#props?.defaultStrategy ?? ThemeSystem);
    #strategyKey: string = $derived(this.#props?.strategyKey ?? 'svxui-strategy');
    #strategy: PersistedState<StrategyType>;

    #defaultColor: Color = $derived(this.#props?.defaultColor ?? 'neutral');
    #colorKey: string = $derived(this.#props?.colorKey ?? 'svxui-color');
    #color: PersistedState<Color>;

    #defaultRadius: Radius = $derived(this.#props?.defaultRadius ?? 'medium');
    #radiusKey: string = $derived(this.#props?.radiusKey ?? 'svxui-radius');
    #radius: PersistedState<Radius>;

    #contentColors: MetaThemeColorsType = $derived(this.#props?.metaThemeColors ?? MetaThemeColors);
    #disableTransitions: boolean = $derived(this.#props?.disableTransitions ?? true);
    #hasBackground: boolean = $derived(this.#props?.hasBackground ?? true);
    #track: boolean = $derived(this.#props?.track ?? true);

    constructor(props: ThemeRootStateProps) {
        this.#props = props;

        this.#system = new ThemeSystemState();
        this.#system.query();

        const serializer = {
            serialize: <T>(v: T) => v as string,
            deserialize: <T>(v: string) => v as T
        };
        this.#strategy = new PersistedState<StrategyType>(this.#strategyKey, this.#defaultStrategy, {
            serializer
        });
        this.#color = new PersistedState<Color>(this.#colorKey, this.#defaultColor, {
            serializer
        });
        this.#radius = new PersistedState<Radius>(this.#radiusKey, this.#defaultRadius, {
            serializer
        });

        onDestroy(
            $effect.root(() => {
                $effect.pre(() => {
                    if (this.#track !== undefined) {
                        this.#system.tracking(this.#track);
                    }
                });

                $effect.pre(() => {
                    if (this.#disableTransitions) {
                        withoutTransition(this.#update);
                    } else {
                        this.#update();
                    }
                });
            })
        );
    }

    #update = (): void => {
        const htmlEl = document.documentElement;
        const themeColorEl = document.querySelector('meta[name="theme-color"]');

        if (this.theme === ThemeLight) {
            htmlEl.classList.remove(ThemeDark);
            htmlEl.classList.add(ThemeLight);
            htmlEl.style.colorScheme = ThemeLight;
            themeColorEl?.setAttribute('content', this.#contentColors.light);
        } else if (this.theme === ThemeDark) {
            htmlEl.classList.remove(ThemeLight);
            htmlEl.classList.add(ThemeDark);
            htmlEl.style.colorScheme = ThemeDark;
            themeColorEl?.setAttribute('content', this.#contentColors.dark);
        }
    };

    setStrategy = (strategy: StrategyType) => {
        this.#strategy.current = strategy;
    };
    get strategy(): StrategyType {
        return this.#strategy.current;
    }
    get strategyKey(): string {
        return this.#strategyKey;
    }

    setColor = (color?: Color | null | undefined) => {
        if (color) {
            this.#color.current = color;
        }
    };
    get color(): Color {
        return this.#color.current;
    }
    get colorKey(): string {
        return this.#colorKey;
    }

    setRadius = (radius: Radius) => {
        this.#radius.current = radius;
    };
    get radius(): Radius {
        return this.#radius.current;
    }
    get radiusKey(): string {
        return this.#radiusKey;
    }

    get system(): ThemeType | undefined {
        return this.#system.current;
    }

    get theme() {
        return this.#theme;
    }

    get attrs() {
        return {
            class: `svxui ${this.theme}`,
            'data-theme-root': '',
            'data-theme': this.theme,
            'data-radius': this.radius,
            'data-color': this.color,
            'data-has-background': this.#hasBackground === true ? 'true' : undefined
        };
    }
}
