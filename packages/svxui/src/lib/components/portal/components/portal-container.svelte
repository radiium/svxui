<script lang="ts">
    import { portalAction } from '$lib/actions/portal/index.js';
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
    <div use:portalAction={{ target }}>
        {@render children?.()}
    </div>
{/if}
