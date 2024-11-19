<script lang="ts">
    import type { Snippet } from 'svelte';

    interface Props {
        head?: Snippet;
        children?: Snippet;
    }

    let { head, children }: Props = $props();
</script>

<table>
    <thead>
        <tr>
            {@render head?.()}
        </tr>
    </thead>
    <tbody>
        {@render children?.()}
    </tbody>
</table>
