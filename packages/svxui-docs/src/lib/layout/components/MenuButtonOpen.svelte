<script lang="ts">
    import SidebarSimpleIcon from '$lib/icons/SideBarSimpleIcon.svelte';
    import { Button } from 'svxui';
    import { layout } from '../../utils/layout-state.svelte';
</script>

<Button class="p-2" size="2" variant="clear" iconOnly onclick={layout.toggle}>
    <SidebarSimpleIcon />
</Button>
