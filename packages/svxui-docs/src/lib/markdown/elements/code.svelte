<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import Code from '../components/Code.svelte';

    type Props = HTMLAttributes<HTMLElement> & {
        color?: string;
        children?: Snippet<[void]>;
    };

    let { children, ...restProps }: Props = $props();
</script>

<Code {...restProps}>
    {@render children?.()}
</Code>
