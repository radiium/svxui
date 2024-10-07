<blockquote class="pl-5 py-3 my-3" data-color="blue" {...$$restProps}>
    <slot />
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
