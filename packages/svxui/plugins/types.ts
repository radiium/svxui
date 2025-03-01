// prettier-ignore
export const aliasNames = ['primary', 'gray', 'blue', 'green', 'yellow', 'orange', 'red'] as const;
export type Alias = (typeof aliasNames)[number];

// prettier-ignore
export const accentColors = ['gray', 'gold', 'bronze', 'brown', 'yellow', 'amber', 'orange', 'tomato', 'red', 'ruby', 'crimson', 'pink', 'plum', 'purple', 'violet', 'iris', 'indigo', 'blue', 'cyan', 'teal', 'jade', 'green', 'grass', 'lime', 'mint', 'sky'] as const;
export type AccentColor = (typeof accentColors)[number];

// prettier-ignore
export const grayColors = ['gray', 'mauve', 'slate', 'sage', 'olive', 'sand'] as const;
export type GrayColor = (typeof grayColors)[number];

export type Color = AccentColor | GrayColor;

export type ThemeConfig = Record<Alias, Color>;
