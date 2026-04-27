// ─── Spacing ──────────────────────────────────────────────────────────────────

export type SpacingScale = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
export type NegativeSpacing = '-1' | '-2' | '-3' | '-4' | '-5' | '-6' | '-7' | '-8' | '-9';
export type MarginValue = SpacingScale | 'auto' | NegativeSpacing;
export type PaddingValue = SpacingScale;

// ─── Size ─────────────────────────────────────────────────────────────────────

export type SizePercent = '50' | '100';
export type SizeKeyword = 'min' | 'max' | 'fit' | 'auto' | 'screen';
export type SizeValue = SpacingScale | SizePercent | SizeKeyword;

// ─── Flex child ───────────────────────────────────────────────────────────────

export type FlexSelf = 'auto' | 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type FlexGrowShrink = '0' | '1';
export type FlexShorthand = 'auto' | 'initial' | 'none';

// ─── Grid child ───────────────────────────────────────────────────────────────

export type ColSpan = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | 'full';
export type RowSpan = '1' | '2' | '3' | '4' | '5' | '6' | 'full';
// prettier-ignore
export type ColStart = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | 'auto';
export type RowStart = '1' | '2' | '3' | '4' | '5' | '6' | '7' | 'auto';

// ─── CcProps ──────────────────────────────────────────────────────────────────

export type CcProps = {
    // Margin
    m?: MarginValue;
    mt?: MarginValue;
    mb?: MarginValue;
    ml?: MarginValue;
    mr?: MarginValue;
    mx?: MarginValue;
    my?: MarginValue;

    // Padding
    p?: PaddingValue;
    pt?: PaddingValue;
    pb?: PaddingValue;
    pl?: PaddingValue;
    pr?: PaddingValue;
    px?: PaddingValue;
    py?: PaddingValue;

    // Width
    w?: SizeValue;
    minW?: SizeValue;
    maxW?: SizeValue;

    // Height
    h?: SizeValue;
    minH?: SizeValue;
    maxH?: SizeValue;

    // Size (square shorthand)
    size?: SizeValue;

    // Flex child
    flex?: FlexShorthand;
    grow?: FlexGrowShrink;
    shrink?: FlexGrowShrink;
    self?: FlexSelf;

    // Grid child
    colSpan?: ColSpan;
    rowSpan?: RowSpan;
    colStart?: ColStart;
    rowStart?: RowStart;
};
