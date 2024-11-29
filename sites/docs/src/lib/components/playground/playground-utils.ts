import { SchemaPropType, type SchemaComponent, type SchemaProp } from '$lib/doc.types';
import type {
    AccordionGroupProps,
    AccordionProps,
    BadgeProps,
    BoxProps,
    ButtonIconProps,
    ButtonProps,
    ButtonUnstyledProps,
    CardProps,
    CheckboxProps,
    Colors,
    DialogProps,
    FlexboxProps,
    FloatingProps,
    InputGroupItemProps,
    InputGroupProps,
    InputNumberProps,
    InputProps,
    InputRangeProps,
    LinkProps,
    PanelProps,
    PortalProps,
    RadioProps,
    SelectProps,
    SeparatorProps,
    SwitchProps,
    TabGroupProps,
    TabPanelProps,
    TabTriggerProps,
    TextareaProps,
    TextProps
} from 'svxui';

export type AnyPropsType = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: SchemaProp['name']]: any;
};

type AllPropsTypeTest =
    | AccordionGroupProps
    | AccordionProps
    | BadgeProps
    | BoxProps
    | ButtonProps
    | ButtonIconProps
    | ButtonUnstyledProps
    | CardProps
    | CheckboxProps
    | DialogProps
    | FlexboxProps
    | FloatingProps
    | InputProps
    | InputGroupProps
    | InputGroupItemProps
    | InputNumberProps
    | InputRangeProps
    | LinkProps
    | PanelProps
    | PortalProps
    | RadioProps
    | SelectProps
    | SeparatorProps
    | SwitchProps
    | TabGroupProps
    | TabTriggerProps
    | TabPanelProps
    | TextProps
    | TextareaProps;

/**
 * build component props with default value
 *
 * @param schema
 * @returns
 */
export function buildProps(schema: SchemaComponent): AnyPropsType {
    return (
        schema?.props?.reduce<AnyPropsType>((acc, next) => {
            if (next.default !== undefined) {
                acc[next.name] = next.default;
            }
            return acc;
        }, {}) ?? {}
    );
}

/**
 * Build propsString for code highlighting
 *
 * @param schema
 * @param props
 * @returns
 */
export function buildPropsString(schema: SchemaComponent, props: AnyPropsType): string {
    return schema.props
        .filter((prop) => prop.name !== 'elementRef')
        .map((prop) => {
            const value = props[prop.name];

            if (prop.type === SchemaPropType.boolean) {
                if (value === true) {
                    return prop.name;
                } else if (!value && prop.default === true) {
                    return `${prop.name}={false}`;
                }
            } else if (value !== undefined && value !== prop.default) {
                return `${prop.name}="${value}"`;
            } else {
                return '';
            }
        })
        .filter(Boolean)
        .join(' ');
}

export function castColor(color: (typeof Colors)[number]): (typeof Colors)[number] {
    return color as (typeof Colors)[number];
}
