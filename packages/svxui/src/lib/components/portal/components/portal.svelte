<script lang="ts">
    import { portal } from '$lib/attachments/portal/index.js';
    import type { PortalProps } from '../types.js';

    let { enabled = true, target = 'body', children }: PortalProps = $props();
</script>

{#if enabled}
    <div {@attach portal({ enabled: true, target })} style="display: content;">
        {@render children?.()}
    </div>
{:else}
    {@render children?.()}
{/if}
