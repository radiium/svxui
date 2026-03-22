<script lang="ts">
    import { portal } from '$lib/attachments/portal/index.js';
    import { ROOT_SELECTOR } from '$lib/internals/root-selector.js';
    import type { PortalProps } from '../types.js';

    let { enabled = true, target = ROOT_SELECTOR, children }: PortalProps = $props();
</script>

{#if enabled}
    <div {@attach portal({ enabled: true, target })} style="display: content;">
        {@render children?.()}
    </div>
{:else}
    {@render children?.()}
{/if}
