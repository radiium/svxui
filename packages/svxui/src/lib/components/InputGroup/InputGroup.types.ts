import type { HTMLAttributes } from 'svelte/elements';

export type InputGroupProps = HTMLAttributes<HTMLDivElement> & {
    elementRef?: HTMLDivElement;
};
