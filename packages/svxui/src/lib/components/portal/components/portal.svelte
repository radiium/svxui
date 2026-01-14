<script lang="ts">
    import { portal } from '$lib/attachments/portal/attachment.svelte.js';
    import { defaultPortalProps } from '../props.js';
    import type { PortalProps } from '../types.js';

    let {
        target = defaultPortalProps.target,
        disabled = defaultPortalProps.disabled,
        children
    }: PortalProps = $props();
</script>

{#if disabled}
    {@render children?.()}
{:else}
    <div {@attach portal({ target })}>
        {@render children?.()}
    </div>
{/if}
