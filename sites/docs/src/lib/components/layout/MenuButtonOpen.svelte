<script lang="ts">
    import SidebarSimpleIcon from '$lib/icons/SideBarSimpleIcon.svelte';
    import { layout } from '$lib/utils/layout-state.svelte';
    import { Button } from 'svxui';
</script>

<Button class="p-2" size="2" variant="clear" iconOnly onclick={layout.toggle}>
    <SidebarSimpleIcon />
</Button>
