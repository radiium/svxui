import type { HTMLAttributes } from 'svelte/elements';

export type IconProps = HTMLAttributes<SVGElement> & {
    size?: string;
    color?: string;
    mirrored?: boolean;
};
