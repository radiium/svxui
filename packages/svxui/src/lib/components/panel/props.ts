import { booleanOptions, colorOptions, radiusOptions, type PropsOptions } from '$lib/shared.options.js';
import type { PanelProps, PanelSize, PanelVariant } from './types.js';

export const defaultPanelProps: PanelProps = {
    elementRef: undefined,
    color: 'neutral',
    size: '3',
    radius: undefined,
    variant: 'solid',
    fullWidth: false
};
export const panelOptions = {
    color: colorOptions,
    size: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] satisfies PanelSize[],
    variant: ['solid', 'soft', 'outline'] satisfies PanelVariant[],
    radius: radiusOptions,
    fullWidth: booleanOptions
} as const satisfies PropsOptions<PanelProps>;
