<script>
    /**
     * @typedef {Object} Props
     * @property {import('svelte').Snippet} [children]
     */

    /** @type {Props} */
    let { children } = $props();
</script>

<span class="Code" data-color="primary">
    {@render children?.()}
</span>

<style lang="scss">
    .Code {
        display: inline-block;
        font-family: monospace;
        font-size: calc(1em * 0.95);
        font-style: normal;
        font-weight: inherit;
        line-height: 1.25;
        box-sizing: border-box;
        padding: 0.1em 0.25em;
        height: fit-content;
        color: var(--accent-a11);
        background-color: var(--accent-a3);
        border-radius: var(--radius-2);
    }
</style>
