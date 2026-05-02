<script lang="ts">
    import { page } from '$app/state';

    let { data } = $props();
    let { Component, ...restProps } = $derived(data);
    let title = $derived(data.frontmatter?.title ? `${data.frontmatter.title} | SVXUI` : 'SVXUI');
    let description = $derived(data.frontmatter?.description ?? '');
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={page.url.href} />
</svelte:head>

<Component {...restProps} />
