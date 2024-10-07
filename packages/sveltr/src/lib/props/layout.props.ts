export const positionValues = ['static', 'relative', 'absolute', 'fixed', 'sticky'] as const;
export type PositionValue = (typeof positionValues)[number];

export const positionEdgeValues = ['auto', '0', '50%', '100%'] as const;
export type PositionEdgeValue = (typeof positionEdgeValues)[number];

// prettier-ignore
export const widthHeightValues = ['auto', 'min-content', 'max-content', '100%', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
export type WidthHeightValue = (typeof widthHeightValues)[number];

export const flexShrinkValues = ['0', '1'] as const;
export type FlexShrinkValue = (typeof flexShrinkValues)[number];

export const flexGrowValues = ['0', '1'] as const;
export type FlexGrowValue = (typeof flexGrowValues)[number];

// prettier-ignore
export const layoutKeys = [ 'position', 'inset', 'top', 'right', 'bottom', 'left', 'width', 'height', 'shrink', 'grow' ] as const;
export type LayoutKey = (typeof layoutKeys)[number];

export type LayoutProps = {
    position?: PositionValue;
    inset?: PositionEdgeValue;
    top?: PositionEdgeValue;
    right?: PositionEdgeValue;
    bottom?: PositionEdgeValue;
    left?: PositionEdgeValue;
    width?: WidthHeightValue;
    height?: WidthHeightValue;
    shrink?: FlexShrinkValue;
    grow?: FlexGrowValue;
};

export function extractLayoutProps<T extends LayoutProps>(props: T) {
    const {
        position, //
        width,
        height,
        inset,
        top,
        bottom,
        left,
        right,
        shrink,
        grow,
        ...rest
    } = props;
    return {
        position,
        width,
        height,
        inset,
        top,
        bottom,
        left,
        right,
        shrink,
        grow,
        rest
    };
}
