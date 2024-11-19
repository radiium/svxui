<script>
    /**
     * @typedef {Object} Props
     * @property {import('svelte').Snippet} [children]
     */

    /** @type {Props & { [key: string]: any }} */
    let { children, ...rest } = $props();
</script>

<blockquote class="markdown pl-5 py-3 my-3" data-color="blue" {...rest}>
    {@render children?.()}
</blockquote>

<style lang="scss">
    blockquote {
        border-left: 3px solid var(--accent-a8);
        background-color: var(--accent-a1);
        border-radius: 0px var(--radius-5) var(--radius-5) 0px;

        :global(p:last-of-type) {
            margin: 0 !important;
        }
    }
</style>
