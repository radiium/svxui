import type { PortalOptions } from '$lib/attachments/index.js';
import type { Snippet } from 'svelte';

export type PortalProps = PortalOptions & {
    /**
     * Portal content to render
     */
    children?: Snippet<[void]>;
};
