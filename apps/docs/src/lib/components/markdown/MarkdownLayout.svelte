<script module>
    import { default as a } from './elements/a.svelte';
    import { default as blockquote } from './elements/blockquote.svelte';
    import { default as code } from './elements/code.svelte';
    import { default as em } from './elements/em.svelte';
    import { default as h1 } from './elements/h1.svelte';
    import { default as h2 } from './elements/h2.svelte';
    import { default as h3 } from './elements/h3.svelte';
    import { default as h4 } from './elements/h4.svelte';
    import { default as hr } from './elements/hr.svelte';
    import { default as li } from './elements/li.svelte';
    import { default as p } from './elements/p.svelte';
    import { default as pre } from './elements/pre.svelte';
    import { default as strong } from './elements/strong.svelte';

    // eslint-disable-next-line no-import-assign
    export { a, blockquote, code, em, h1, h2, h3, h4, hr, li, p, pre, strong };
</script>

<script lang="ts">
    import type { PageContentData } from '$lib/types';
    import { stringToId } from '$lib/utils/functions';
    import type { Snippet } from 'svelte';
    import { Badge, Button, Flex, Panel, Text, useTheme, type Color } from 'svxui';
    import GithubIcon from '../icons/GithubIcon.svelte';
    import PageNavigation from './components/PageNavigation.svelte';

    type Props = Omit<PageContentData, 'Component'> & {
        children?: Snippet;
    };
    let { navigation, slug, slugFull, frontmatter, children }: Props = $props();

    const theme = useTheme();
    const themeColor = $derived(theme.color as Color);

    let sourceLink = $derived(
        frontmatter?.category
            ? `https://github.com/radiium/svxui/tree/main/packages/svxui/src/lib/${frontmatter?.category}/${slug}`
            : undefined
    );
</script>

<Panel size="5" variant="soft" class="mb-6">
    <Flex justify="start" as="header" direction="column" align="start" gap="3" width="100%">
        {#if frontmatter?.category}
            <Badge variant="soft" size="3">{frontmatter.category}</Badge>
        {/if}

        {#if frontmatter?.title}
            <Text
                as="h1"
                id={stringToId(frontmatter.title)}
                class="m-0"
                weight="bold"
                size="9"
                style="display: flex;"
            >
                {frontmatter.title}
            </Text>
        {/if}

        {#if frontmatter?.description}
            <Text as="p" class="m-0" weight="bold" size="5" muted>
                {frontmatter?.description}
            </Text>
        {/if}

        {#if sourceLink}
            <Button
                as="a"
                href={sourceLink}
                target="_blank"
                rel="external"
                title="See the source code on GitHub"
                data-sveltekit-preload-data="tap"
                variant="outline"
                size="2"
                class="mt-3"
                color={themeColor}
            >
                <GithubIcon size="14px" />
                Source
            </Button>
        {/if}
    </Flex>
</Panel>

{@render children?.()}

<footer class="mt-9 w-100">
    <PageNavigation {slugFull} {navigation} />
</footer>

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
