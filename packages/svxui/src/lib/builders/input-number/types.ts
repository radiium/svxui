/**
 * Input-number state options
 */
export type InputNumberBuilderOptions = {
    value: number | undefined | null;
    min?: number | undefined | null;
    max?: number | undefined | null;
    step?: number | undefined | null;
    decimals?: number;
    disabled?: boolean;
    onValueChange?: (value: number) => void;
};

/**
 * Input-number Input attributes
 */
export type InputNumberInputAttributes = {
    readonly id: `input-number-input-${string}`;
    readonly type: 'number';
    readonly value: number | undefined | null;
    readonly min: number | undefined | null;
    readonly max: number | undefined | null;
    readonly step: number | undefined | null;
    readonly oninput: (e: Event) => void;
};

/**
 * Input-number decrement button attributes
 */
export type InputNumberDecrementAttributes = {
    readonly id: `input-number-decrement-${string}`;
    readonly type: 'button';
    readonly disabled: boolean;
    readonly 'aria-label': 'Decrement';
    readonly onclick: () => void;
};

/**
 * Input-number increment button attributes
 */
export type InputNumberIncrementAttributes = {
    readonly id: `input-number-increment-${string}`;
    readonly type: 'button';
    readonly disabled: boolean;
    readonly 'aria-label': 'Increment';
    readonly onclick: () => void;
};
