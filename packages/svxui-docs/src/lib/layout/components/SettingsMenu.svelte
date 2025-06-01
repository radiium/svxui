<script lang="ts">
    import {
        Button,
        colorOptions,
        Flexbox,
        radiusOptions,
        Text,
        useThemeRootContext,
        type StrategyType
    } from 'svxui';

    const themeRoot = useThemeRootContext();

    const strategies: StrategyType[] = ['system', 'light', 'dark'];
</script>

<Flexbox direction="column" gap="3" class="settings-content">
    <Flexbox gap="2" direction="column" class="w-100">
        <Text size="4" weight="medium">Theme strategy:</Text>
        <Flexbox gap="2" wrap="wrap">
            {#each strategies as item (item)}
                <Button
                    radius="small"
                    variant={themeRoot.strategy === item ? 'solid' : 'outline'}
                    size="2"
                    onclick={() => themeRoot.setStrategy(item)}
                >
                    {item}
                </Button>
            {/each}
        </Flexbox>
    </Flexbox>

    <Flexbox gap="2" direction="column" class="w-100">
        <Text size="4" weight="medium">Radius:</Text>
        <Flexbox gap="2" wrap="wrap">
            {#each radiusOptions as item (item)}
                <Button
                    radius="small"
                    variant={themeRoot.radius === item ? 'solid' : 'outline'}
                    size="2"
                    onclick={() => themeRoot.setRadius(item)}
                >
                    {item}
                </Button>
            {/each}
        </Flexbox>
    </Flexbox>

    <Flexbox gap="2" direction="column">
        <Text size="4" weight="medium">Accent color:</Text>
        <Flexbox gap="2" wrap="wrap">
            {#each colorOptions as item (item)}
                <button
                    aria-label="color"
                    title={item}
                    class="color-btn"
                    class:selected={themeRoot.color === item}
                    data-radius="small"
                    data-color={item}
                    onclick={() => themeRoot.setColor(item)}
                >
                </button>
            {/each}
        </Flexbox>
    </Flexbox>
</Flexbox>

<style lang="scss">
    :global(.settings-content) {
        max-width: 85vw;
    }

    .color-btn {
        border: none;
        border-radius: 50%;
        background-color: var(--accent-9);
        height: 28px;
        width: 28px;
        display: flex;
        align-items: center;
        justify-content: center;

        &.selected {
            outline: 1px solid white;
            outline-offset: 2px;
        }

        &:focus:not(.selected) {
            outline: 2px solid rgba(255, 255, 255, 0.3);
            outline-offset: 2px;
        }
    }
</style>
