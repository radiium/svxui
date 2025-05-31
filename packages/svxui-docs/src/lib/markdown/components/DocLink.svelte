<script lang="ts">
    import { PUBLIC_LIB_FOLDER } from '$env/static/public';
    import ArrowSquareOut from '$lib/icons/ArrowSquareOut.svelte';
    import { Button, Link, useThemeRootContext, type Color, type LinkProps } from 'svxui';

    type Props = LinkProps & {
        text?: string;
        href?: string;
        libFolder?: boolean;
        themeColor?: boolean;
    };
    let { children, href, libFolder, themeColor, ...restProps }: Props = $props();

    const themeRoot = useThemeRootContext();
    const color = $derived(themeColor ? (themeRoot.color as Color) : 'neutral');

    let hrefFull = $derived.by(() => {
        return libFolder
            ? PUBLIC_LIB_FOLDER + href //
            : href; //
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
    {color}
    {...restProps}
>
    <Button variant="outline" size="3" {color}>
        {@render children?.()}
        <ArrowSquareOut style="color: var(--neutral-11)" data-color="" />
    </Button>
</Link>
