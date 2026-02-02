<script lang="ts">
    import SvxuiIcon from '$lib/icons/SvxuiIcon.svelte';
    import { Flexbox } from 'svxui';
</script>

<Flexbox direction="column" justify="center" align="center" class="w-100">
    <SvxuiIcon size="4rem" />
    <p>Svelte 5 UI component library</p>
    <a href="/docs">Get Started</a>
</Flexbox>

<style>
    p {
        font-size: 2rem;
        text-align: center;
    }
    a {
        cursor: default;
        text-decoration: none;
        text-align: center;
        padding: var(--space-4) var(--space-5);
        border-radius: max(var(--radius-3), var(--radius-full));
        font-size: var(--font-size-4);
        line-height: var(--line-height-4);
        letter-spacing: var(--letter-spacing-2);
        color: var(--accent-a12);
        background-color: var(--accent-3);
        box-shadow: inset 0 0 0 1px var(--accent-8);

        &:hover {
            background-color: var(--accent-4);
        }

        &:focus {
            outline: 2px solid var(--accent-8);
            outline-offset: 0px;
        }
    }
</style>
