<script lang="ts">
    import { PUBLIC_LIB_FOLDER } from '$env/static/public';
    import ArrowSquareOut from '$lib/components/icons/ArrowSquareOut.svelte';
    import { Button, Text, useTheme, type Color, type TextProps } from 'svxui';

    type Props = TextProps<'a'> & {
        text?: string;
        href?: string;
        libFolder?: boolean;
        themeColor?: boolean;
    };
    let { children, href, libFolder, themeColor, ...restProps }: Props = $props();

    const theme = useTheme();
    const color = $derived(themeColor ? (theme.color as Color) : 'neutral');

    let hrefFull = $derived.by(() => {
        return libFolder
            ? PUBLIC_LIB_FOLDER + href //
            : href; //
    });
</script>

<Text
    as="a"
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
</Text>
