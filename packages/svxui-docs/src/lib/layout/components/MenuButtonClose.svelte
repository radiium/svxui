<script lang="ts">
    import XIcon from '$lib/icons/XIcon.svelte';
    import { Button } from 'svxui';
    import { layout } from '../../utils/layout-state.svelte';
</script>

<Button class="p-2" size="2" variant="solid" iconOnly onclick={layout.close}>
    <XIcon />
</Button>
