import { layoutKeys, type LayoutProps } from './layout.props.js';
import { marginKeys, type MarginProps } from './margin.props.js';
import { paddingKeys, type PaddingProps } from './padding.props.js';
type ExtractProps = LayoutProps & MarginProps & PaddingProps;
type ExtractKeys = typeof layoutKeys | typeof marginKeys | typeof paddingKeys;
export declare function extractPropsAlt<T extends ExtractProps>(props: T): ExtractProps & {
    restProps: object;
};
export declare function buildPropsCssClass(props: ExtractProps): string;
export declare function extractProps<T extends ExtractProps>(props: T, keys: ExtractKeys): string;
export declare function cleanProps<T extends ExtractProps>(props: T): T;
export declare function extractLayoutProps<T extends Partial<LayoutProps>>(props: T): string;
export declare function extractMarginProps<T extends Partial<MarginProps>>(props: T): string;
export declare function extractPaddingProps<T extends Partial<PaddingProps>>(props: T): string;
export {};
