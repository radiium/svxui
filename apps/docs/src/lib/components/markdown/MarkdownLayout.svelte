<script module>
    /* eslint-disable no-import-assign */
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
    import { default as table } from './elements/table.svelte';
    import { default as tbody } from './elements/tbody.svelte';
    import { default as td } from './elements/td.svelte';
    import { default as th } from './elements/th.svelte';
    import { default as thead } from './elements/thead.svelte';
    import { default as tr } from './elements/tr.svelte';

    export {
        a,
        blockquote,
        code,
        em,
        h1,
        h2,
        h3,
        h4,
        hr,
        li,
        p,
        pre,
        strong,
        table,
        tbody,
        td,
        th,
        thead,
        tr
    };
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

<header>
    <Panel p="5" variant="soft" fullWidth>
        <Flex justify="start" direction="column" align="start" gap="3" class="w-full">
            {#if frontmatter?.category}
                <Badge variant="soft" size="3">{frontmatter.category}</Badge>
            {/if}

            {#if frontmatter?.title}
                <Text id={stringToId(frontmatter.title)} as="h1" weight="bold" size="9">
                    {frontmatter.title}
                </Text>
            {/if}

            {#if frontmatter?.description}
                <Text as="p" weight="bold" size="5" muted>
                    {frontmatter?.description}
                </Text>
            {/if}

            {#if sourceLink}
                <div class="action">
                    <Button
                        as="a"
                        href={sourceLink}
                        target="_blank"
                        rel="external"
                        title="See the source code on GitHub"
                        variant="outline"
                        size="2"
                        color={themeColor}
                        data-sveltekit-preload-data="tap"
                    >
                        <GithubIcon size="14px" />
                        Source
                    </Button>
                </div>
            {/if}
        </Flex>
    </Panel>
</header>

{@render children?.()}

<footer>
    <PageNavigation {slugFull} {navigation} />
</footer>

<style lang="scss">
    header {
        width: 100%;
        margin-bottom: var(--space-6);

        .action {
            width: 100%;
            margin-top: var(--space-3);
        }
    }

    footer {
        width: 100%;
        margin-top: var(--space-9);
    }
</style>
