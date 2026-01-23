<script lang="ts">
    import { portal } from '$lib/attachments/portal/index.js';
    import type { PortalProps } from '../types.js';

    let { target = 'body', disabled = false, children }: PortalProps = $props();
</script>

{#if disabled}
    {@render children?.()}
{:else}
    <div {@attach portal({ target })}>
        {@render children?.()}
    </div>
{/if}
