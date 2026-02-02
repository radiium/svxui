import type { Align, Color, Radius } from '$lib/shared.types.js';
import type { InputGroupProps } from '../input-group/types.js';

export type InputNumberVariant = 'solid' | 'soft' | 'outline' | 'clear';
export type InputNumberSize = '1' | '2' | '3';

/**
 * Extends all the standard HTML attributes of the `<div>` element.
 */
export type InputNumberProps = Omit<InputGroupProps, 'ref' | 'children'> & {
    /**
     * Reference to the rendered DOM element.
     */
    ref?: HTMLInputElement;
    /**
     * Input value
     */
    value?: number | undefined | null;
    /**
     * Increment step
     */
    step?: number | undefined | null;
    /**
     * Min value
     */
    min?: number | undefined | null;
    /**
     * Max value
     */
    max?: number | undefined | null;
    /**
     * InputNumber color
     */
    color?: Color;
    /**
     * InputNumbersize
     */
    size?: InputNumberSize;
    /**
     * InputNumberradius
     */
    radius?: Radius;
    /**
     * InputNumber variant
     */
    variant?: InputNumberVariant;
    /**
     * Text align
     */
    align?: Align;
    /**
     * InputNumber full width
     */
    fullWidth?: boolean;
    /**
     * Disabled state
     */
    disabled?: boolean;
    /**
     * Required state
     */
    required?: boolean;
    /**
     * readonly
     */
    readonly?: boolean;
};
