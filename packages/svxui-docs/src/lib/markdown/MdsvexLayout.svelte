<script module>
    import { default as a } from './elements/a.svelte';
    import { default as code } from './elements/code.svelte';
    import { default as em } from './elements/em.svelte';
    import { default as h1 } from './elements/h1.svelte';
    import { default as h2 } from './elements/h2.svelte';
    import { default as h3 } from './elements/h3.svelte';
    import { default as h4 } from './elements/h4.svelte';
    import { default as li } from './elements/li.svelte';
    import { default as p } from './elements/p.svelte';
    import { default as pre } from './elements/pre.svelte';
    import { default as strong } from './elements/strong.svelte';

    // eslint-disable-next-line no-import-assign
    export { a, code, em, h1, h2, h3, h4, li, p, pre, strong };
</script>

<script lang="ts">
    import ArrowSquareOut from '$lib/icons/ArrowSquareOut.svelte';
    import type { PageContentData } from '$lib/types';
    import { stringToId } from '$lib/utils/string-to-id';
    import type { Snippet } from 'svelte';
    import { Flexbox, Link, Text, useThemeRootContext, type Color } from 'svxui';
    import PageNav from './components/PageNav.svelte';

    type Props = Omit<PageContentData, 'Component'> & {
        children?: Snippet;
    };
    let { slug, slugFull, frontmatter, children }: Props = $props();

    const themeRoot = useThemeRootContext();
    const themeColor = $derived(themeRoot.color as Color);
    const link = $derived(
        `https://github.com/radiium/svxui/tree/main/packages/svxui/src/lib/components/${slug}`
    );
</script>

{#if frontmatter?.title}
    <Text as="h1" id={stringToId(frontmatter.title)} class="mt-7 mb-0" weight="bold" size="9">
        {frontmatter.title}
    </Text>
{/if}

{#if frontmatter?.description}
    <Text as="p" class="mt-3 mb-0" weight="bold" size="5" muted>
        {frontmatter?.description}
    </Text>
{/if}

{#if frontmatter?.category === 'components'}
    <Link color={themeColor} href={link} target="_blank" class="mt-3 inline-block">
        <Flexbox align="center" gap="1">
            View source
            <ArrowSquareOut style="color: var(--neutral-11)" data-color="" />
        </Flexbox>
    </Link>
{/if}

<div class="mb-9"></div>

{@render children?.()}

<PageNav {slugFull} />

<style lang="scss">
    :global(ul) {
        margin-bottom: 0;
    }

    :global(ul li strong em) {
        color: var(--teal-a11);
        padding: calc(var(--space-1) * 0.5) calc(var(--space-1) * 1.5);
        box-shadow: inset 0px 0px 0px 1px var(--teal-a8);
        border-radius: max(var(--radius-1), var(--radius-full));
        font-size: var(--font-size-1);
        line-height: var(--line-height-1);
        letter-spacing: var(--letter-spacing-1);
    }
</style>
