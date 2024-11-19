<script lang="ts">
    import type { Snippet } from 'svelte';

    interface Props {
        id?: string;
        title?: Snippet;
        children?: Snippet;
    }

    let { id, title, children }: Props = $props();
</script>

<details {id}>
    <summary>
        {@render title?.()}
    </summary>

    <div class="details-content">
        {@render children?.()}
    </div>
</details>

<style lang="scss">
    details {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        width: 100%;

        summary {
            cursor: pointer;
            margin: 0 var(--space-5);

            &::marker {
                font-size: 1.5em;
            }
        }
    }
</style>
