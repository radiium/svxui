export const paddingKeys = ['p', 'px', 'py', 'pt', 'pr', 'pb', 'pl'] as const;
export type PaddingKey = (typeof paddingKeys)[number];

export const paddingValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
export type PaddingValue = (typeof paddingValues)[number];

export type PaddingProps = {
    p?: PaddingValue;
    px?: PaddingValue;
    py?: PaddingValue;
    pt?: PaddingValue;
    pr?: PaddingValue;
    pb?: PaddingValue;
    pl?: PaddingValue;
};
