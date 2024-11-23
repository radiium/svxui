<script lang="ts">
    import type { Component } from 'svelte';
    import type { PageData } from './$types.js';

    type Props = {
        data: PageData;
    };

    let { data }: Props = $props();

    let SvelteComponent: Component = $derived(data.component);
</script>

<SvelteComponent />
