<script lang="ts">
    import type { PageData } from './$types.js';

    type Props = {
        data: PageData;
    };

    let { data }: Props = $props();
    let component = $derived(data.component);

    const SvelteComponent = $derived(component);
</script>

<SvelteComponent />
