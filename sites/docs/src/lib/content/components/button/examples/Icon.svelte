<script lang="ts">
    import { Button } from 'svxui';
</script>

<Button iconOnly variant="solid">{@render Icon()}</Button>
<Button iconOnly variant="soft">{@render Icon()}</Button>
<Button iconOnly variant="outline">{@render Icon()}</Button>
<Button iconOnly variant="clear">{@render Icon()}</Button>

{#snippet Icon()}
    <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 256 256">
        <rect width="256" height="256" fill="none" />
        <circle
            cx="112"
            cy="112"
            r="80"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
        />
        <line
            x1="168.57"
            y1="168.57"
            x2="224"
            y2="224"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
        />
    </svg>
{/snippet}
