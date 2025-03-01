<script lang="ts">
    import { PUBLIC_LIB_FOLDER } from '$env/static/public';
    import ArrowSquareOut from '$lib/icons/ArrowSquareOut.svelte';
    import { Button, Link, type LinkProps } from 'svxui';

    type Props = LinkProps & {
        text?: string;
        href?: string;
    };
    let { children, href, ...restProps }: Props = $props();

    let hrefFull = $derived.by(() => {
        return href?.startsWith('https://')
            ? href //
            : PUBLIC_LIB_FOLDER + href;
    });
</script>

<Link
    underline="always"
    weight="bold"
    target="_blank"
    class="mt-6 block"
    tabindex={-1}
    title={hrefFull}
    href={hrefFull}
    {...restProps}
>
    <Button variant="outline" size="3">
        {@render children?.()}
        <ArrowSquareOut style="color: var(--neutral-11)" data-color="" />
    </Button>
</Link>
