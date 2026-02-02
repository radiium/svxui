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
    import LinkSimple from '$lib/icons/LinkSimple.svelte';
    import type { PageContentData } from '$lib/types';
    import { stringToId } from '$lib/utils/functions';
    import type { Snippet } from 'svelte';
    import { Badge, Flexbox, Text, useThemeRootContext, type Color } from 'svxui';
    import PageNavigation from './components/PageNavigation.svelte';

    type Props = Omit<PageContentData, 'Component'> & {
        children?: Snippet;
    };
    let { navigation, slug, slugFull, frontmatter, children }: Props = $props();

    const themeRoot = useThemeRootContext();
    const themeColor = $derived(themeRoot.color as Color);

    const links: { text: string; href: string; internal?: boolean }[] = $derived.by(() => {
        const items = [];
        if (Array.isArray(frontmatter?.links)) {
            frontmatter.links.forEach((link) => items.push({ ...link, internal: true }));
        }
        if (frontmatter?.category) {
            items.push({
                text: 'View source',
                href: `https://github.com/radiium/svxui/tree/main/packages/svxui/src/lib/${frontmatter?.category}/${slug}`
            });
        }
        return items;
    });
</script>

<Flexbox as="header" direction="column" align="start" gap="3" fullWidth class="mt-7 mb-9">
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

    {#if frontmatter?.category || links.length}
        <Flexbox gap="3" wrap="wrap" fullWidth>
            {#each links as link (link)}
                <Text
                    as="a"
                    href={link.href}
                    target={link.internal ? '' : '_blank'}
                    rel={link.internal ? 'help' : 'external'}
                    data-sveltekit-preload-data={link.internal ? 'hover' : 'tap'}
                    weight="bold"
                    underline="always"
                    color={themeColor}
                    class="inline-block"
                >
                    <Flexbox align="center" gap="1">
                        {link.text}
                        <LinkSimple style="color: var(--neutral-11)" data-color="" />
                    </Flexbox>
                </Text>
            {/each}
        </Flexbox>
    {/if}
</Flexbox>

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
