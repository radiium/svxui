/**
 * Sizes
 */
export const Size0 = '0' as const;
export const Size1 = '1' as const;
export const Size2 = '2' as const;
export const Size3 = '3' as const;
export const Size4 = '4' as const;
export const Size5 = '5' as const;
export const Size6 = '6' as const;
export const Size7 = '7' as const;
export const Size8 = '8' as const;
export const Size9 = '9' as const;

export const Sizes = [Size0, Size1, Size2, Size3, Size4, Size5, Size6, Size7, Size8, Size9] as const;
export const Sizes0To1 = [Size0, Size1] as const;
export const Sizes1To2 = [Size1, Size2] as const;
export const Sizes1To3 = [Size1, Size2, Size3] as const;
export const Sizes0To4 = [Size0, Size1, Size2, Size3, Size4] as const;
export const Sizes1To4 = [Size1, Size2, Size3, Size4] as const;
export const Sizes0To5 = [Size0, Size1, Size2, Size3, Size4, Size5] as const;
export const Sizes1To9 = [Size1, Size2, Size3, Size4, Size5, Size6, Size7, Size8, Size9] as const;
export const Sizes0To9 = Sizes;

/**
 * Colors
 */
export const ColorGray = 'gray' as const;
export const ColorPrimary = 'primary' as const;
export const ColorBlue = 'blue' as const;
export const ColorGreen = 'green' as const;
export const ColorYellow = 'yellow' as const;
export const ColorOrange = 'orange' as const;
export const ColorRed = 'red' as const;

export const Colors = [
    ColorGray,
    ColorPrimary,
    ColorBlue,
    ColorGreen,
    ColorYellow,
    ColorOrange,
    ColorRed
] as const;

/**
 * Radius
 */
export const RadiusNone = 'none' as const;
export const RadiusSmall = 'small' as const;
export const RadiusMedium = 'medium' as const;
export const RadiusLarge = 'large' as const;
export const RadiusFull = 'full' as const;
export const Radius = [RadiusNone, RadiusSmall, RadiusMedium, RadiusLarge, RadiusFull] as const;

/**
 * Variants
 */
export const VariantSolid = 'solid' as const;
export const VariantSoft = 'soft' as const;
export const VariantSurface = 'surface' as const;
export const VariantOutline = 'outline' as const;
export const VariantClear = 'clear' as const;

export const Variants = [VariantSolid, VariantSoft, VariantSurface, VariantOutline, VariantClear] as const;
export const VariantsCard = [VariantSolid, VariantSoft, VariantSurface, VariantOutline] as const;
export const VariantsCallout = [VariantSoft, VariantSurface, VariantOutline] as const;
export const VariantsBadge = [VariantSolid, VariantSoft, VariantSurface, VariantOutline] as const;

/**
 * Weights
 */
export const WeightLight = 'light' as const;
export const WeightRegular = 'regular' as const;
export const WeightMedium = 'medium' as const;
export const WeightBold = 'bold' as const;

export const Weights = [WeightLight, WeightRegular, WeightMedium, WeightBold] as const;

/**
 * Aligns
 */
export const AlignStart = 'start' as const;
export const AlignCenter = 'center' as const;
export const AlignEnd = 'end' as const;

export const Aligns = [AlignStart, AlignCenter, AlignEnd] as const;

/**
 * Transforms
 */
export const TransformLowercase = 'lowercase' as const;
export const TransformUppercase = 'uppercase' as const;
export const TransformCapitalize = 'capitalize' as const;

export const Transforms = [TransformLowercase, TransformUppercase, TransformCapitalize] as const;

/**
 * Displays
 */
export const DisplayNone = 'none' as const;
export const DisplayInlineFlex = 'inline-flex' as const;
export const DisplayFlex = 'flex' as const;
export const DisplayInline = 'inline' as const;
export const DisplayInlineBlock = 'inline-block' as const;
export const DisplayBlock = 'block' as const;

export const FlexDisplays = [DisplayNone, DisplayInlineFlex, DisplayFlex] as const;
export const BlockDisplays = [DisplayNone, DisplayInline, DisplayInlineBlock, DisplayBlock] as const;

/**
 * Justifys
 */
export const JustifyStart = 'start' as const;
export const JustifyCenter = 'center' as const;
export const JustifyEnd = 'end' as const;
export const JustifyAround = 'around' as const;
export const JustifyBetween = 'between' as const;
export const JustifyEvenly = 'evenly' as const;
export const JustifyNormal = 'normal' as const;

export const Justifys = [
    JustifyStart,
    JustifyCenter,
    JustifyEnd,
    JustifyAround,
    JustifyBetween,
    JustifyEvenly,
    JustifyNormal
] as const;

/**
 * Directions
 */
export const DirectionRow = 'row' as const;
export const DirectionColumn = 'column' as const;
export const DirectionRowReverse = 'row-reverse' as const;
export const DirectionColumnReverse = 'column-reverse' as const;

export const Directions = [
    DirectionRow,
    DirectionColumn,
    DirectionRowReverse,
    DirectionColumnReverse
] as const;

/**
 * AlignItems
 */
export const AlignItemsStart = 'start' as const;
export const AlignItemsCenter = 'center' as const;
export const AlignItemsEnd = 'end' as const;
export const AlignItemsBaseline = 'baseline' as const;
export const AlignItemsStretch = 'stretch' as const;
export const AlignItemsNormal = 'normal' as const;

export const AlignItems = [
    AlignItemsStart,
    AlignItemsCenter,
    AlignItemsEnd,
    AlignItemsBaseline,
    AlignItemsStretch,
    AlignItemsNormal
] as const;

/**
 * Wraps
 */
export const WrapNowrap = 'nowrap' as const;
export const WrapWrap = 'wrap' as const;
export const WrapWrapReverse = 'wrap-reverse' as const;

export const Wraps = [WrapNowrap, WrapWrap, WrapWrapReverse] as const;

/**
 * Gaps
 */
export const Gaps = Sizes;

/**
 * Grows
 */
export const Grows = ['0', '1'] as const;

/**
 * Shrinks
 */
export const Shrinks = ['0', '1'] as const;

/**
 * Orientations
 */
export const OrientationHorizontal = 'horizontal' as const;
export const OrientationVertical = 'vertical' as const;
export const Orientations = [OrientationHorizontal, 'vertical'] as const;

/**
 * TextTags
 */
export const TextTagDiv = 'div' as const;
export const TextTagSpan = 'span' as const;
export const TextTagLabel = 'label' as const;
export const TextTagH1 = 'h1' as const;
export const TextTagH2 = 'h2' as const;
export const TextTagH3 = 'h3' as const;
export const TextTagH4 = 'h4' as const;
export const TextTagH5 = 'h5' as const;
export const TextTagH6 = 'h6' as const;
export const TextTagP = 'p' as const;
export const TextTagAnchor = 'a' as const;

export const TextTags = [
    TextTagDiv,
    TextTagSpan,
    TextTagLabel,
    TextTagH1,
    TextTagH2,
    TextTagH3,
    TextTagH4,
    TextTagH5,
    TextTagH6,
    TextTagP,
    TextTagAnchor
] as const;

/**
 * TextUnderlines
 */
export const TextUnderlineAuto = 'auto' as const;
export const TextUnderlineAlways = 'always' as const;
export const TextUnderlineHover = 'hover' as const;
export const TextUnderlineNone = 'none' as const;

export const TextUnderlines = [
    TextUnderlineAuto,
    TextUnderlineAlways,
    TextUnderlineHover,
    TextUnderlineNone
] as const;

/**
 * TextWraps
 */
export const TextWrapWrap = 'wrap' as const;
export const TextWrapNowrap = 'nowrap' as const;
export const TextWrapPretty = 'pretty' as const;
export const TextWrapBalance = 'balance' as const;

export const TextWraps = [TextWrapWrap, TextWrapNowrap, TextWrapPretty, TextWrapBalance] as const;

/**
 * InputTypes
 */
export const InputTypes = [
    'text',
    'number',
    'search',
    'password',
    'email',
    'tel',
    'url',
    'date',
    'time',
    'datetime-local',
    'month',
    'week'
] as const;

/**
 * Margins
 */
export const Margins = ['m', 'mt', 'mr', 'mb', 'ml', 'mx', 'my'] as const;

/**
 * Paddings
 */
export const Paddings = ['p', 'pt', 'pr', 'pb', 'pl', 'px', 'py'] as const;

/**
 * Floating
 */
export const Placements = [
    'top',
    'right',
    'bottom',
    'left',
    'top-start',
    'top-end',
    'right-start',
    'right-end',
    'bottom-start',
    'bottom-end',
    'left-start',
    'left-end'
] as const;
