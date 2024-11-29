<script lang="ts">
    import { Button } from '$lib/components/button/index.js';
    import { Flexbox } from '$lib/components/flexbox/index.js';
    import { Floating } from '$lib/components/floating/index.js';
    import { ThemeDark, ThemeLight, ThemeSystem } from '$lib/shared.types.js';
    import { generateId } from '$lib/utils/id.js';
    import AppWindow from '../../../icons/AppWindow.svelte';
    import Moon from '../../../icons/Moon.svelte';
    import Sun from '../../../icons/Sun.svelte';
    import { getThemeContext } from '../../theme-provider/context.svelte.js';
    import { defaultThemeSelectProps } from '../props.js';
    import type { ThemeSelectProps } from '../types.js';

    let {
        color = defaultThemeSelectProps.color,
        size = defaultThemeSelectProps.size,
        variant = defaultThemeSelectProps.variant,
        iconOnly = defaultThemeSelectProps.iconOnly,
        placement = defaultThemeSelectProps.placement
    }: ThemeSelectProps = $props();

    const { strategy, setStrategy } = getThemeContext();
    const themeOptions = $state([
        { icon: AppWindow, label: 'system', value: ThemeSystem },
        { icon: Sun, label: 'light', value: ThemeLight },
        { icon: Moon, label: 'dark', value: ThemeDark }
    ]);

    let isOpen = $state(false);
    let currentTheme: (typeof themeOptions)[number] | undefined = $derived(
        themeOptions.find((opts) => opts.value === $strategy)
    );

    function toggle(): void {
        isOpen = !isOpen;
    }

    function selectTheme(option: (typeof themeOptions)[number]): void {
        setStrategy(option.value);
    }
</script>

<Floating
    id={generateId()}
    bind:isOpen
    {color}
    {placement}
    size="0"
    variant="surface"
    offset={10}
    closeOnClickOutside
    closeOnEscape
    closeOnResize
    closeOnScroll
    portal
    autoUpdate
>
    {#snippet trigger()}
        <Button onclick={toggle} active={isOpen} {color} {size} {variant} {iconOnly} title="Change theme">
            {#if currentTheme}
                <currentTheme.icon />
                {#if !iconOnly}
                    {currentTheme.label}
                {/if}
            {/if}
        </Button>
    {/snippet}

    {#snippet content()}
        <Flexbox direction="column" class="p-2 m-0" style="position: relative;">
            {#each themeOptions as option}
                <Button
                    {size}
                    {color}
                    variant="clear"
                    align="start"
                    fullWidth
                    onclick={() => {
                        isOpen = false;
                        selectTheme(option);
                    }}
                >
                    <option.icon />
                    {option.label}
                </Button>
            {/each}
        </Flexbox>
    {/snippet}
</Floating>
