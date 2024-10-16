<script lang="ts">
    import { portalAction } from '$lib/actions/portal.action.js';
    import { defaultPortalProps } from './Portal.props.js';
    import type { PortalProps } from './Portal.types.js';

    type $$Props = PortalProps;
    export let target: $$Props['target'] = defaultPortalProps.target;
    export let disabled: $$Props['disabled'] = defaultPortalProps.disabled;
</script>

{#if disabled}
    <slot />
{:else}
    <div style="border: 0;" use:portalAction={target}>
        <slot />
    </div>
{/if}
