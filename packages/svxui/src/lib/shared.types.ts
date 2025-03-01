/**
 * Colors
 */

export type Color = keyof Svxui.ColorMap;

/**
 * Radius
 */

export type Radius = 'none' | 'small' | 'medium' | 'large' | 'full';

/**
 * Align
 */

export type Align = 'start' | 'center' | 'end';

/**
 * Orientation
 */

export type Orientation = 'horizontal' | 'vertical';

/**
 * Transform
 */

export type TextTransform = 'lowercase' | 'uppercase' | 'capitalize';

/**
 * Placement
 */

export type FloatingPlacement =
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'top-start'
    | 'top-end'
    | 'right-start'
    | 'right-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end';
