import { layoutKeys, type LayoutKey, type LayoutProps } from './layout.props.js';
import { marginKeys, type MarginKey, type MarginProps } from './margin.props.js';
import { paddingKeys, type PaddingKey, type PaddingProps } from './padding.props.js';

// type ExtractProps = Partial<LayoutProps> | Partial<MarginProps> | Partial<PaddingProps>;
type ExtractProps = LayoutProps & MarginProps & PaddingProps;
type ExtractKeys = typeof layoutKeys | typeof marginKeys | typeof paddingKeys;
type ExtractKey = LayoutKey | MarginKey | PaddingKey;

export function extractPropsAlt<T extends ExtractProps>(props: T): ExtractProps & { restProps: object } {
    // prettier-ignore
    const { position, inset, top, right, bottom, left, width, height, shrink, grow, m, mx, my, mt, mr, mb, ml, p, px, py, pt, pr, pb, pl, ...restProps } = props
    // prettier-ignore
    return {position, inset, top, right, bottom, left, width, height, shrink, grow, m, mx, my, mt, mr, mb, ml, p, px, py, pt, pr, pb, pl, restProps}
}

export function buildPropsCssClass(props: ExtractProps): string {
    return Object.entries(props)
        .filter(
            ([key, _]) =>
                layoutKeys.includes(key as LayoutKey) ||
                marginKeys.includes(key as MarginKey) ||
                paddingKeys.includes(key as PaddingKey)
        )
        .filter(([_, value]) => value !== null && value !== undefined)
        .reduce<string[]>((acc, [key, value]) => {
            if (value.substring(0, 1) === '-') {
                acc.push(`-${key}-${value.replace('-', '')}`);
            } else {
                acc.push(`${key}-${props[key as ExtractKey]}`);
            }

            return acc;
        }, [])
        .join(' ');
}

export function extractProps<T extends ExtractProps>(props: T, keys: ExtractKeys): string {
    return keys
        .reduce((acc, key) => {
            if (Object.prototype.hasOwnProperty.call(props, key)) {
                const value = props[key];
                if (value) {
                    if (value.substring(0, 1) === '-') {
                        acc.push(`-${key}-${value.replace('-', '')}`);
                    } else {
                        acc.push(`${key}-${props[key]}`);
                    }
                }

                //delete props[key];
            }
            return acc;
        }, [] as string[])
        .join(' ');
}

export function cleanProps<T extends ExtractProps>(props: T): T {
    const keys = [...layoutKeys, ...marginKeys, ...paddingKeys];

    keys.forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(props, key)) {
            delete props[key];
        }
    });

    return props;
}

export function extractLayoutProps<T extends Partial<LayoutProps>>(props: T): string {
    return extractProps(props, layoutKeys);
}

export function extractMarginProps<T extends Partial<MarginProps>>(props: T): string {
    return extractProps(props, marginKeys);
}

export function extractPaddingProps<T extends Partial<PaddingProps>>(props: T): string {
    return extractProps(props, paddingKeys);
}
