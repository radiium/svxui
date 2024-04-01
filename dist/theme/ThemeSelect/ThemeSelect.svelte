<script>import AppWindow from '../../icons/AppWindow.svelte';
import Sun from '../../icons/Sun.svelte';
import Moon from '../../icons/Moon.svelte';
import Popover from '../../components/Popover/Popover.svelte';
import Button from '../../components/Button/Button.svelte';
import Flexbox from '../../components/Flexbox/Flexbox.svelte';
import { useThemeContext } from '../theme.context.js';
import { ThemeStrategy } from '../theme.types.js';
import { defaultThemeSelectProps } from './ThemeSelect.props.js';
export let color = defaultThemeSelectProps.color;
export let size = defaultThemeSelectProps.size;
export let variant = defaultThemeSelectProps.variant;
export let showLabel = defaultThemeSelectProps.showLabel;
export let placement = defaultThemeSelectProps.placement;
const themeContext = useThemeContext();
const { strategy, updateStrategy = () => { } } = themeContext;
const themeOptions = [
    { icon: AppWindow, label: 'system', value: ThemeStrategy.SYSTEM },
    { icon: Sun, label: 'light', value: ThemeStrategy.LIGHT },
    { icon: Moon, label: 'dark', value: ThemeStrategy.DARK }
];
let currentTheme = themeOptions.find((opts) => opts.value === $strategy);
const selectTheme = (option) => {
    currentTheme = option;
    updateStrategy(option.value);
};
</script>

<Popover {placement} offset={10} backdrop>
    <Button
        slot="trigger"
        let:open
        let:isOpen
        on:click={open}
        active={isOpen}
        {color}
        {size}
        {variant}
        iconOnly={!showLabel}
        title="Change theme"
    >
        {#if currentTheme}
            <svelte:component this={currentTheme.icon} />
            {#if showLabel}
                {currentTheme.label}
            {/if}
        {/if}
    </Button>

    <svelte:fragment let:close>
        <Flexbox direction="column" gap="1" class="p-2 m-0" style="position: relative;">
            {#each themeOptions as option}
                <Button
                    size="2"
                    variant="clear"
                    align="start"
                    fullWidth
                    on:click={() => {
                        close();
                        selectTheme(option);
                    }}
                >
                    <svelte:component this={option.icon} />
                    {option.label}
                </Button>
            {/each}
        </Flexbox>
    </svelte:fragment>
</Popover>

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
