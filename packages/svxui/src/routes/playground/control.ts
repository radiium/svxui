import type { CheckboxProps, InputNumberProps, SelectOptionType, SelectProps } from '$lib/index.js';

export class Control {
    static text(config: { label: string }) {
        return {
            type: 'text' as const,
            label: config.label
        };
    }

    static button(config: { label: string; onclick: () => void }) {
        return {
            type: 'button' as const,
            label: config.label,
            get props() {
                return {
                    onclick: () => config.onclick()
                };
            }
        };
    }

    static select<T extends SelectOptionType = SelectOptionType>(config: {
        label: string;
        options: T[];
        get: () => T;
        set: (val: T) => void;
        props?: Partial<SelectProps<T>>;
    }) {
        return {
            type: 'select' as const,
            label: config.label,
            get: config.get,
            set: config.set,
            get props(): SelectProps<T> {
                return {
                    ...config.props,
                    options: config.options
                };
            }
        };
    }

    static checkbox(config: {
        label: string;
        get: () => boolean;
        set: (val: boolean) => void;
        props?: Partial<CheckboxProps>;
    }) {
        return {
            type: 'checkbox' as const,
            label: config.label,
            get: config.get,
            set: config.set,
            props: config.props
        };
    }

    static number(config: {
        label: string;
        get: () => number;
        set: (val: number) => void;
        props?: Partial<InputNumberProps>;
    }) {
        return {
            type: 'number' as const,
            label: config.label,
            get: config.get,
            set: config.set,
            props: config.props
        };
    }
}
