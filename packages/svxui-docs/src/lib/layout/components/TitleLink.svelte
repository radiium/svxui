<script lang="ts">
    import SvxuiIcon from '$lib/icons/SvxuiIcon.svelte';
</script>

<a href="/" data-sveltekit-preload-data="tap" title="svxui">
    <SvxuiIcon size="1.4rem" />
</a>

<style>
    a {
        text-decoration: none;
        display: flex;
        align-items: center;
        padding: var(--space-1) var(--space-2);
        border-radius: var(--radius-2);

        &:focus-visible {
            outline: 2px solid var(--accent-8);
            outline-offset: 0px;
        }
    }
</style>
