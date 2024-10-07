<script lang="ts">
    import type { ComponentType } from 'svelte';
    import type { PageData } from './$types.js';

    export let data: PageData;

    let component: ComponentType;
    $: component = data.component;
</script>

<svelte:component this={component} />
