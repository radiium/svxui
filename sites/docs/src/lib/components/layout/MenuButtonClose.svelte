<script lang="ts">
    import XIcon from '$lib/icons/XIcon.svelte';
    import { layout } from '$lib/utils/layout-state.svelte';
    import { Button } from 'svxui';
</script>

<Button class="p-2" size="2" variant="solid" iconOnly onclick={layout.close}>
    <XIcon />
</Button>
