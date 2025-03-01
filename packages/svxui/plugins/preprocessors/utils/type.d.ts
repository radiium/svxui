export type Alias = (typeof aliasNames)[number];
export type AccentColor = (typeof accentColors)[number];
export type GrayColor = (typeof grayColors)[number];
export type Color = AccentColor | GrayColor;
export type ThemeConfig = Record<Alias, Color>;
