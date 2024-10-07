<script lang="ts">
    import type { PageData } from './$types.js';

    export let data: PageData;
    $: component = data.component;
</script>

<svelte:component this={component} />
