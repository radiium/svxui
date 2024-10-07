<script lang="ts">
    import Button from '$lib/components/Button/Button.svelte';
    import Flexbox from '$lib/components/Flexbox/Flexbox.svelte';
    import Floating from '$lib/components/Floating/Floating.svelte';
    import AppWindow from '../../icons/AppWindow.svelte';
    import Moon from '../../icons/Moon.svelte';
    import Sun from '../../icons/Sun.svelte';
    import { getThemeContext } from '../theme.context.js';
    import { ThemeDark, ThemeLight, ThemeSystem } from '../theme.types.js';
    import { defaultThemeSelectProps } from './ThemeSelect.props.js';
    import type { ThemeSelectProps } from './ThemeSelect.types.js';

    type $$Props = ThemeSelectProps;
    export let color: $$Props['color'] = defaultThemeSelectProps.color;
    export let size: $$Props['size'] = defaultThemeSelectProps.size;
    export let variant: $$Props['variant'] = defaultThemeSelectProps.variant;
    export let iconOnly: $$Props['iconOnly'] = defaultThemeSelectProps.iconOnly;
    export let placement: $$Props['placement'] = defaultThemeSelectProps.placement;

    let isOpen = false;
    const { strategy, setStrategy = () => {} } = getThemeContext();
    const themeOptions = [
        { icon: AppWindow, label: 'system', value: ThemeSystem },
        { icon: Sun, label: 'light', value: ThemeLight },
        { icon: Moon, label: 'dark', value: ThemeDark }
    ];

    $: currentTheme = themeOptions.find((opts) => opts.value === $strategy);
    const selectTheme = (option: (typeof themeOptions)[number]) => {
        currentTheme = option;
        setStrategy(option.value);
    };
</script>

<Floating
    bind:isOpen
    size="0"
    outline
    {placement}
    offset={10}
    closeOnClickOutside
    closeOnEscape
    closeOnResize
    closeOnScroll
>
    <Button
        slot="trigger"
        on:click={() => (isOpen = !isOpen)}
        active={isOpen}
        {color}
        {size}
        {variant}
        {iconOnly}
        title="Change theme"
    >
        {#if currentTheme}
            <svelte:component this={currentTheme.icon} />
            {#if !iconOnly}
                {currentTheme.label}
            {/if}
        {/if}
    </Button>

    <svelte:fragment slot="content">
        <Flexbox direction="column" class="p-2 m-0" style="position: relative;">
            {#each themeOptions as option}
                <Button
                    {size}
                    color={option.value === $strategy ? color : 'gray'}
                    variant="clear"
                    align="start"
                    fullWidth
                    on:click={() => {
                        isOpen = false;
                        selectTheme(option);
                    }}
                >
                    <svelte:component this={option.icon} />
                    {option.label}
                </Button>
            {/each}
        </Flexbox>
    </svelte:fragment>
</Floating>

<!-- <Select
	class={$$restProps.class}
	options={themeOptions}
	value={$themeStore.theme}
	on:input={handleChange}
	on:input
	on:change
	on:focus
	on:blur
/> -->
