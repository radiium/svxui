// prettier-ignore
export const marginKeys = ['m', 'mx', 'my', 'mt', 'mr', 'mb', 'ml'] as const;
export type MarginKey = (typeof marginKeys)[number];

// prettier-ignore
export const marginValues = [ 'auto', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-1', '-2', '-3', '-4', '-5', '-6', '-7', '-8', '-9'] as const;
export type MarginValue = (typeof marginValues)[number];

export type MarginProps = {
    m?: MarginValue;
    mx?: MarginValue;
    my?: MarginValue;
    mt?: MarginValue;
    mr?: MarginValue;
    mb?: MarginValue;
    ml?: MarginValue;
};
