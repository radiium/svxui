import type { Radius } from '$lib/shared.types.js';
import {
    ThemeLight,
    ThemeSystem,
    type StrategyType,
    type ThemeChildStateProps,
    type ThemeType
} from '../types.js';
import type { ThemeRootState } from './theme-root-state.svelte.js';
import { ThemeSystemState } from './theme-system-state.svelte.js';

export class ThemeChildState {
    #props: ThemeChildStateProps | undefined = $state();
    #themeRoot!: ThemeRootState;
    #system!: ThemeSystemState;

    #strategy: StrategyType = $derived(this.#props?.strategy ?? this.#themeRoot?.strategy ?? ThemeSystem);
    #radius: Radius = $derived(this.#props?.radius ?? this.#themeRoot?.radius ?? 'medium');
    #color: string = $derived(this.#props?.color ?? this.#themeRoot?.color ?? 'neutral');
    #hasBackground: boolean = $derived(this.#props?.hasBackground ?? true);
    #theme = $derived.by(() => {
        return (
            (this.#strategy === ThemeSystem
                ? this.#system.current //
                : this.#strategy) ?? ThemeLight
        );
    });

    constructor(themeRoot: ThemeRootState, props: ThemeChildStateProps) {
        this.#props = props;
        this.#themeRoot = themeRoot;
        this.#system = new ThemeSystemState();
    }

    get strategy(): StrategyType {
        return this.#strategy;
    }
    get radius(): Radius {
        return this.#radius;
    }
    get color(): string {
        return this.#color;
    }
    get system(): ThemeType | undefined {
        return this.#system.current;
    }
    get theme(): ThemeType {
        return this.#theme;
    }

    get attrs() {
        return {
            class: `svxui ${this.theme}`,
            'data-theme-child': '',
            'data-theme': this.theme,
            'data-radius': this.radius,
            'data-color': this.color,
            'data-has-background': this.#hasBackground === true ? 'true' : undefined
        };
    }
}
