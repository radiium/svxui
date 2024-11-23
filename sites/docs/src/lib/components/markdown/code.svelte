<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';

    type Props = HTMLAttributes<HTMLElement> & {
        children?: Snippet;
    };

    let { children, ...rest }: Props = $props();
</script>

<code {...rest} class="markdown">
    code
    {@render children?.()}
</code>
